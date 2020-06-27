import styled from 'styled-components'

export const ActionContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${(props) => (props.direction ? props.direction : 'row')};
`

export const Button = styled.button`
  cursor: pointer;
`

export const ConfirmContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ConfirmButton = styled.button`
  cursor: pointer;
  border: 0;
  outline: 0;
  height: 100%;
  color: #fff;
  &:first-child {
    background: #e63946;
    width: 35%;
  }
  &:last-child {
    background: #1d3557;
    width: 65%;
  }
`
