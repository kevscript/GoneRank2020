import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100px;
  height: 100%;
`

const ValueContainer = styled.div`
  height: 100%;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const IncrementButton = styled.button`
  cursor: pointer;
  width: 25px;
  height: 100%;
  background: #1d3557;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f5f5f5;
  outline: 0;
  border: 0;
`

const DecrementButton = styled.button`
  cursor: pointer;
  width: 25px;
  height: 100%;
  background: #e63946;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f5f5f5;
  outline: 0;
  border: 0;
`

const Value = styled.span`
  font-weight: 600;
  color: #14387f;
`

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
