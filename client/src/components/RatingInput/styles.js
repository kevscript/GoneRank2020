import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100px;
  height: 100%;
`

export const ValueContainer = styled.div`
  height: 100%;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const IncrementButton = styled.button`
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

export const DecrementButton = styled.button`
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

export const Value = styled.span`
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 600;
  color: #14387f;
`
