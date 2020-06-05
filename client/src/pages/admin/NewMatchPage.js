import React from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useForm, Controller } from 'react-hook-form'
import { GET_PLAYERS } from '../../graphql/queries/player'
import { CREATE_MATCH, GET_MATCHES } from '../../graphql/queries/match'
import 'react-datepicker/dist/react-datepicker.css'
import '../../styles/datepicker.css'

const Container = styled.div`
  width: 100%;
`

const Form = styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 25px auto;
`

const FormItem = styled.div`
  margin: 15px 0 0 0;
`

const FormError = styled.span`
  color: red;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
`

const LabelText = styled.span`
  margin-bottom: 5px;
`

const FormButton = styled.button`
  padding: 5px;
  width: 80px;
`

const Input = styled.input`
  padding: 5px;
  width: 300px;
  max-width: 100%;
`

const Select = styled.select`
  padding: 5px;
  width: 300px;
  max-width: 100%;
`

const Checker = styled.input`
  margin-right: 10px;
  opacity: 1;
  &:checked + span {
    color: red;
    font-weight: 700;
  }
`

const Divider = styled.div`
  width: 100%;
  height: 25px;
`

const PlayerItem = styled.label`
  display: flex;
  align-items: center;
  margin: 10px 10px 0 0;
  padding: 5px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);
  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
`

const PlayersList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  max-width: 100%;
`

const NewMatchPage = () => {
  const history = useHistory()
  const { register, control, handleSubmit, errors } = useForm()
  const { loading, error, data: { players } = {} } = useQuery(GET_PLAYERS)

  const [createMatch] = useMutation(CREATE_MATCH, {
    update: (cache, { data: { createMatch } }) => {
      try {
        const { matches } = cache.readQuery({ query: GET_MATCHES })
        cache.writeQuery({
          query: GET_MATCHES,
          data: { matches: [...matches, createMatch] },
        })
      } catch (err) {
        console.log(error)
      }
    },
  })

  const handleMatchCreation = (data) => {
    createMatch({
      variables: {
        date: data.date.toLocaleDateString(),
        opponent: data.opponent,
        location: data.location,
        playerIds: data.playerIds,
      },
    })
    history.push('/home/admin/fixtures')
  }

  if (loading) return <h1>Loading...</h1>
  if (error) return <p>{error.message}</p>

  return (
    <Container>
      <h3>New Match</h3>
      <Form onSubmit={(e) => e.preventDefault()} autoComplete="off">
        <FormItem>
          <Label htmlFor="opponent">
            <LabelText>Opponent:</LabelText>
            <Input
              type="text"
              name="opponent"
              ref={register({
                required: 'You must specify an opponent',
                validate: (val) => val.trim() !== '',
              })}
            />
          </Label>
          {errors.opponent && <FormError>{errors.opponent.message}</FormError>}
        </FormItem>

        <FormItem>
          <Label htmlFor="location">
            <LabelText>Location:</LabelText>
            <Select
              name="location"
              ref={register({ required: 'Location is required' })}
            >
              <option value="home">Home</option>
              <option value="away">Away</option>
              <option value="other">Other</option>
            </Select>
          </Label>
          {errors.location && <FormError>{errors.location.message}</FormError>}
        </FormItem>

        <FormItem>
          <Label htmlFor="date">
            <LabelText>Date:</LabelText>
            <Controller
              as={<DatePicker dateFormat="dd/MM/yyyy" />}
              name="date"
              valueName="selected"
              onChange={([selected]) => selected}
              control={control}
              rules={{ required: 'Date is required' }}
            />
          </Label>
          {errors.date && <FormError>{errors.date.message}</FormError>}
        </FormItem>

        <Divider />

        <FormItem>
          <span>Lineup:</span>
          <PlayersList>
            {players.map((p) => (
              <PlayerItem key={p._id}>
                <Checker
                  name="playerIds"
                  type="checkbox"
                  value={p._id}
                  ref={register({
                    required: 'You need at least 3 players',
                    validate: (value) => value.length > 2,
                  })}
                />
                <span>
                  {p.firstName} {p.lastName}
                </span>
              </PlayerItem>
            ))}
          </PlayersList>
          {errors.playerIds && (
            <FormError>{errors.playerIds.message}</FormError>
          )}
        </FormItem>

        <Divider />

        <FormButton type="submit" onClick={handleSubmit(handleMatchCreation)}>
          Submit
        </FormButton>
      </Form>
    </Container>
  )
}

export default NewMatchPage