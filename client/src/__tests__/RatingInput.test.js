import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import RatingInput from '../components/RatingInput'

describe('RatingInput component', () => {
  let props

  beforeEach(() => {
    props = {
      minValue: 1,
      maxValue: 10,
      step: 1,
      startingValue: 7,
      handleRating: jest.fn(),
      playerId: '1',
    }

    render(<RatingInput {...props} />)
  })

  test('initializes with the chosen startingValue', () => {
    expect(screen.getByText(/7/)).toBeInTheDocument()
  })

  test('has buttons to increment and decrement the value', () => {
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
    expect(screen.getByText(/-/)).toBeInTheDocument()
    expect(screen.getByText(/\+/)).toBeInTheDocument()
  })

  test('handleRating is called when value is changed', () => {
    const button = screen.getAllByRole('button')[0]
    fireEvent.click(button)
    expect(props.handleRating).toHaveBeenCalled()
  })

  test('decrement button decrements the value', () => {
    const decrementButton = screen.getAllByRole('button')[0]
    fireEvent.click(decrementButton)
    expect(screen.getByText(/6/)).toBeInTheDocument()
  })

  test('increment button increments the value', () => {
    const incrementButton = screen.getAllByRole('button')[1]
    fireEvent.click(incrementButton)
    expect(screen.getByText(/8/)).toBeInTheDocument()
  })
})
