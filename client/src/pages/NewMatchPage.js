import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useForm, Controller } from 'react-hook-form'
import { GET_ACTIVE_PLAYERS } from '../graphql/queries/player'
import { CREATE_MATCH, GET_MATCHES } from '../graphql/queries/match'
import Loader from '../components/Loader'
import { TransitionWrapper } from '../components/TransitionWrapper'
import 'react-datepicker/dist/react-datepicker.css'
import '../styles/datepicker.css'

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
`

const Title = styled.span`
  color: #14387f;
`

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FormItem = styled.div`
  margin: 0.5rem 0;
  width: 100%;
`

const FormError = styled.span`
  color: red;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
`

const LabelText = styled.span`
  margin: 0 0 5px 0.5rem;
`

const FormButton = styled.button`
  height: 45px;
  width: 100%;
  text-transform: uppercase;
  background: #1d3557;
  color: #fff;
  font-weight: 600;
  outline: 0;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
`

const Input = styled.input`
  line-height: 45px;
  width: 100%;
  padding: 0 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  outline: 0;

  &:focus {
    border: 1px solid #1d3557;
  }
`

const Select = styled.select`
  height: 45px;
  width: 100%;
  padding: 0 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  outline: 0;

  &:focus {
    border: 1px solid #1d3557;
  }
`

const Divider = styled.div`
  width: 100%;
  height: 25px;
`

const PlayerItem = styled.span`
  display: flex;
  align-items: center;
  margin: 10px 10px 0 0;
  padding: 5px;
  cursor: pointer;
  border: 1px solid #dbdbdb;
  font-weight: 600;

  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
`

const PlayersList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`

const NewMatchPage = () => {
  const history = useHistory()
  const { register, control, handleSubmit, errors } = useForm()
  const [lineup, setLineup] = useState([])
  const { loading, error, data: { activePlayers } = {} } = useQuery(
    GET_ACTIVE_PLAYERS
  )

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

  const handleSelectPlayer = (e) => {
    if (e.target.value !== '') {
      const newLineup = [...lineup, e.target.value]
      setLineup(newLineup)
    }
  }

  const handleRemovePlayer = (e) => {
    const playerId = e.currentTarget.getAttribute('data-id')
    const newLineup = lineup.filter((id) => id !== playerId)
    setLineup(newLineup)
  }

  const handleMatchCreation = (data) => {
    if (lineup.length > 1) {
      createMatch({
        variables: {
          date: data.date.toLocaleDateString(),
          opponent: data.opponent,
          location: data.location,
          playerIds: lineup,
        },
      })
    }

    history.push('/home/matchs')
  }

  if (loading) return <Loader />
  if (error) return <p>{error.message}</p>

  return (
    <TransitionWrapper>
      <Container>
        <Title>Create Match</Title>
        <Form onSubmit={(e) => e.preventDefault()} autoComplete="off">
          <FormItem>
            <Label htmlFor="opponent">
              <LabelText>Opponent :</LabelText>
              <Input
                type="text"
                name="opponent"
                ref={register({
                  required: 'You must specify an opponent',
                  validate: (val) => val.trim() !== '',
                })}
              />
            </Label>
            {errors.opponent && (
              <FormError>{errors.opponent.message}</FormError>
            )}
          </FormItem>

          <FormItem>
            <Label htmlFor="location">
              <LabelText>Location :</LabelText>
              <Select
                name="location"
                ref={register({ required: 'Location is required' })}
              >
                <option value="home">Home</option>
                <option value="away">Away</option>
                <option value="other">Other</option>
              </Select>
            </Label>
            {errors.location && (
              <FormError>{errors.location.message}</FormError>
            )}
          </FormItem>

          <FormItem>
            <Label htmlFor="date">
              <LabelText>Date :</LabelText>
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

          <FormItem>
            <Label htmlFor="lineup">
              <LabelText>Line up :</LabelText>
              <Select name="lineup" onChange={handleSelectPlayer}>
                <option value=""></option>
                {activePlayers
                  .filter((p) => !lineup.some((id) => id === p._id))
                  .map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.firstName} {p.lastName}
                    </option>
                  ))}
              </Select>
            </Label>
            <PlayersList>
              {lineup &&
                lineup.map((id) => {
                  const player = activePlayers.find((p) => p._id === id)
                  return (
                    <PlayerItem
                      key={id}
                      onClick={handleRemovePlayer}
                      data-id={id}
                    >
                      {player.firstName} {player.lastName}
                    </PlayerItem>
                  )
                })}
            </PlayersList>
          </FormItem>

          <Divider />

          <FormButton type="submit" onClick={handleSubmit(handleMatchCreation)}>
            Ajouter Match
          </FormButton>
        </Form>
      </Container>
    </TransitionWrapper>
  )
}

export default NewMatchPage
