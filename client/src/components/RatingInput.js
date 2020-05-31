import React, { useState, useEffect } from 'react'
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

const IncrementButton = styled.div`
  cursor: pointer;
  width: 25px;
  height: 100%;
  background: #14387f;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f5f5f5;
`

const DecrementButton = styled.div`
  cursor: pointer;
  width: 25px;
  height: 100%;
  background: #da001a;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f5f5f5;
`

const Value = styled.span`
  font-weight: 600;
  color: #14387f;
`

const RatingInput = ({ startingValue = 5, handleRating, playerId }) => {
  const [val, setVal] = useState(parseFloat(startingValue))

  useEffect(() => {
    handleRating(val, playerId)
  }, [val])

  const handleIncrement = () => {
    if (val < 10) {
      setVal((v) => v + 0.5)
    }
  }

  const handleDecrement = () => {
    if (val > 1) setVal((v) => v - 0.5)
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

export default RatingInput
