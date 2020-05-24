import React from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'
import 'react-datepicker/dist/react-datepicker.css'
import '../../styles/datepicker.css'

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 25px 0;
`

const FormItem = styled.div``

const Label = styled.label``

const LabelText = styled.span`
  margin-right: 5px;
`

const FormButton = styled.button`
  padding: 5px;
  width: 80px;
`

const Input = styled.input`
  padding: 5px;
  width: 300px;
  max-width: 80%;
`

const Select = styled.select`
  padding: 5px;
`

const Divider = styled.div`
  width: 100%;
  height: 10px;
`

const MatchForm = () => {
  const { register, control, handleSubmit, errors } = useForm()

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
              ref={register({ required: 'You must specify an opponent' })}
            />
          </Label>
        </FormItem>

        <Divider />

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

        <Divider />

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

        <FormButton
          type="submit"
          onClick={handleSubmit((data) => console.log(data))}
        >
          Submit
        </FormButton>
      </Form>
    </div>
  )
}

export default MatchForm
