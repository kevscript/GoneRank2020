import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/react-hooks'
import { ADD_PLAYER, GET_PLAYERS } from '../graphql/queries/player'

const Form = styled.form`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`

const InputsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const PlayerInput = styled.input`
  flex: 1;
  padding: 0 1rem;
  line-height: 30px;
  margin: 3px 0;
  border: 1px solid #dbdbdb;

  &:focus {
    outline: 1px solid #14387f;
  }

  ::placeholder {
    color: #dbdbdb;
  }
`

const FormButton = styled.button`
  height: 30px;
  width: 100%;
  margin: 3px 0;
  text-transform: uppercase;
  border: 1px solid #dbdbdb;
  background: #f5f5f5;
  color: #14387f;
  font-weight: 600;
`

const FormError = styled.span`
  font-size: 12px;
  color: #da001a;
`

const PlayerForm = () => {
  const { register, handleSubmit, reset, errors } = useForm()

  const [addPlayer] = useMutation(ADD_PLAYER, {
    onCompleted: () => reset(),
    onError: (err) => console.log(err),
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

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <InputsContainer>
        <PlayerInput
          autoComplete="off"
          name="firstName"
          type="text"
          placeholder="First name"
          ref={register({
            required: true,
            validate: (value) =>
              value.trim().length > 0 || 'First Name not valid',
          })}
        />
        {errors.firstName && <FormError>{errors.firstName.message}</FormError>}
        <PlayerInput
          autoComplete="off"
          type="text"
          name="lastName"
          placeholder="Last name"
          ref={register({
            required: true,
            validate: (value) =>
              value.trim().length > 0 || 'Last Name not valid',
          })}
        />
        {errors.lastName && <FormError>{errors.lastName.message}</FormError>}
      </InputsContainer>
      <FormButton type="submit" onClick={handleSubmit(handleAddPlayer)}>
        Add Player
      </FormButton>
    </Form>
  )
}

export default PlayerForm
