import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  ValueContainer,
  IncrementButton,
  DecrementButton,
  Value,
} from './styles'

const RatingInput = ({
  step = 0.5,
  minValue = 1,
  maxValue = 10,
  startingValue = 5,
  handleRating,
  playerId,
}) => {
  const [val, setVal] = useState(parseFloat(startingValue))

  useEffect(() => {
    handleRating(val, playerId)
  }, [val, playerId, handleRating])

  const handleIncrement = () => {
    if (val < maxValue) {
      setVal((v) => v + step)
    }
  }

  const handleDecrement = () => {
    if (val > minValue) setVal((v) => v - step)
  }

  return (
    <Container>
      <DecrementButton onClick={handleDecrement}>-</DecrementButton>
      <ValueContainer>
        <Value>{val}</Value>
      </ValueContainer>
      <IncrementButton onClick={handleIncrement}>+</IncrementButton>
    </Container>
  )
}

RatingInput.propTypes = {
  step: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  startingValue: PropTypes.number,
  handleRating: PropTypes.func,
  playerId: PropTypes.string,
}

export default RatingInput
