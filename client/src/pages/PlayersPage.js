import React from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import { GET_PLAYERS, ADD_PLAYER } from '../graphql/queries/player'

const Container = styled.div``

const PlayersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 15px;
  padding: 15px;
`

const PlayersGridItem = styled.div`
  border: 2px solid rgba(20, 56, 127, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 125px;
  text-decoration: none;
  color: rgba(20, 56, 127, 1);
  font-weight: 600;
`

const PlayersGridForm = styled.form`
  border: 2px solid rgba(20, 56, 127, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 125px;
  text-decoration: none;
  color: rgba(20, 56, 127, 1);
`

const FormInput = styled.input`
  width: 80%;
  padding: 5px;
  margin-bottom: 5px;
`

const FormButton = styled.button`
  width: 80%;
  padding: 5px 0;
`

const PlayersPage = () => {
  const { register, handleSubmit, reset } = useForm()

  const { loading, error, data: { players } = {} } = useQuery(GET_PLAYERS, {
    onCompleted: (res) => console.log(res),
  })

  const [addPlayer] = useMutation(ADD_PLAYER, {
    onCompleted: () => reset(),
    update: (cache, { data: { addPlayer } }) => {
      try {
        const { players } = cache.readQuery({ query: GET_PLAYERS })
        cache.writeQuery({
          query: GET_PLAYERS,
          data: { players: [...players, addPlayer] },
        })
      } catch (err) {
        console.log(err)
      }
    },
  })

  const handleForm = (data) => {
    if (data.firstName.trim() && data.lastName.trim()) {
      addPlayer({
        variables: { firstName: data.firstName, lastName: data.lastName },
      })
    }
  }

  if (loading) return <h1>Loading...</h1>
  if (error) return <p>{error.message}</p>

  return (
    <Container>
      <PlayersGrid>
        <PlayersGridForm onSubmit={(e) => e.preventDefault()}>
          <FormInput
            type="text"
            name="firstName"
            placeholder="first name"
            ref={register({ required: true })}
          />
          <FormInput
            type="text"
            name="lastName"
            placeholder="last name"
            ref={register({ required: true })}
          />
          <FormButton type="submit" onClick={handleSubmit(handleForm)}>
            Add Player
          </FormButton>
        </PlayersGridForm>
        {players.map((p) => (
          <PlayersGridItem key={p._id}>
            <p>{p.firstName}</p>
            <p>{p.lastName}</p>
          </PlayersGridItem>
        ))}
      </PlayersGrid>
    </Container>
  )
}

export default PlayersPage
