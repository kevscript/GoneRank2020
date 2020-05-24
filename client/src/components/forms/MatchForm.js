import React from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import { useQuery } from '@apollo/react-hooks'
import { useForm, Controller } from 'react-hook-form'
import { GET_PLAYERS } from '../../graphql/queries/player'
import 'react-datepicker/dist/react-datepicker.css'
import '../../styles/datepicker.css'

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 25px 0;
`

const FormItem = styled.div`
  margin: 15px 0 0 0;
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
  width: 500px;
  max-width: 100%;
`

const MatchForm = ({ handleMatchCreation }) => {
  const { register, control, handleSubmit, errors } = useForm()
  const { loading, error, data: { players } = {} } = useQuery(GET_PLAYERS)

  if (loading) return <h1>Loading...</h1>
  if (error) return <p>{error.message}</p>

  return (
    <div>
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
        </FormItem>

        <FormItem>
          <Label htmlFor="location">
            <LabelText>Location:</LabelText>
            <Select
              name="location"
              ref={register({ required: 'You must specify an opponent' })}
            >
              <option value="home">Home</option>
              <option value="away">Away</option>
              <option value="other">Other</option>
            </Select>
          </Label>
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
              rules={{ required: true }}
            />
          </Label>
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
                    required: 'You must select players',
                    validate: (value) => value.length > 2,
                  })}
                />
                <span>
                  {p.firstName} {p.lastName}
                </span>
              </PlayerItem>
            ))}
          </PlayersList>
        </FormItem>

        <Divider />

        <FormButton type="submit" onClick={handleSubmit(handleMatchCreation)}>
          Submit
        </FormButton>
      </Form>
    </div>
  )
}

export default MatchForm
