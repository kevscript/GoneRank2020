import React from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import { GET_PLAYERS, ADD_PLAYER } from '../../graphql/queries/player'
import Loader from '../../components/Loader'

const PlayersList = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
`

const PlayerItem = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  background: #eff4ff;
  margin-bottom: 5px;
`

const PlayerInfo = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 0 0 1rem;
`

const PlayerRanking = styled.div`
  display: flex;
  justify-content: center;
  font-size: 10px;
  align-items: center;
  width: 40px;
  height: 100%;
  background: #14387f;
  color: #fff;
`

const PlayerName = styled.span`
  color: #14387f;
`

const PlayerDeleteButton = styled.button`
  cursor: pointer;
  width: 100%;
  height: 100%;
  background: #da001a;
  color: #fff;
  border: none;
  outline: none;
`

const PlayerButtonContainer = styled.div`
  width: 60px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const PlayerForm = styled.form`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  background: #eff4ff;
  border-bottom: 1px solid #14387f;
`

const FormInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #14387f;
  outline-color: #14387f;
  margin: 5px 0;
  color: #14387f;
`

const FormButton = styled.button`
  padding: 0.5rem;
  margin: 5px 0;
  background: #fff;
  border: 1px solid #14387f;
  color: #14387f;
`

const FormError = styled.span`
  font-size: 12px;
  color: #da001a;
`

const PlayersPage = () => {
  const { register, handleSubmit, reset, errors } = useForm()

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

  const handleAddPlayer = (data) => {
    if (data.firstName.trim().length > 0 && data.lastName.trim().length > 0) {
      addPlayer({
        variables: { firstName: data.firstName, lastName: data.lastName },
      })
    }
  }

  const handleRemovePlayer = (e) => {
    console.log(e.currentTarget.getAttribute('data-id'))
  }

  if (loading) return <Loader />
  if (error) return <p>{error.message}</p>

  return (
    <div>
      <PlayerForm onSubmit={(e) => e.preventDefault()}>
        <FormInput
          autocomplete="off"
          type="text"
          name="firstName"
          placeholder="Prénom du joueur"
          ref={register({
            required: true,
            validate: (value) => value.trim().length > 0 || 'Prénom non valide',
          })}
        />
        {errors.firstName && <FormError>{errors.firstName.message}</FormError>}
        <FormInput
          autocomplete="off"
          type="text"
          name="lastName"
          placeholder="Nom du joueur"
          ref={register({
            required: true,
            validate: (value) => value.trim().length > 0 || 'Nom non valide',
          })}
        />
        {errors.lastName && <FormError>{errors.lastName.message}</FormError>}
        <FormButton type="submit" onClick={handleSubmit(handleAddPlayer)}>
          Add Player
        </FormButton>
      </PlayerForm>
      <PlayersList>
        {players &&
          players.map((player, i) => (
            <PlayerItem key={player._id}>
              <PlayerRanking>{i + 1}</PlayerRanking>
              <PlayerInfo>
                <PlayerName>
                  {player.firstName} {player.lastName}
                </PlayerName>
                <PlayerButtonContainer>
                  <PlayerDeleteButton
                    data-id={player._id}
                    onClick={handleRemovePlayer}
                  >
                    X
                  </PlayerDeleteButton>
                </PlayerButtonContainer>
              </PlayerInfo>
            </PlayerItem>
          ))}
      </PlayersList>
    </div>
  )
}

export default PlayersPage
