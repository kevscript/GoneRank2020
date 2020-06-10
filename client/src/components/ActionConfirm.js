import React, { useState } from 'react'
import styled from 'styled-components'

const ActionContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${(props) => (props.direction ? props.direction : 'row')};
`

const Button = styled.button`
  cursor: pointer;
`

const ConfirmContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ConfirmButton = styled.button`
  cursor: pointer;
  height: 100%;
  border: 1px solid #dbdbdb;
  color: #fff;
  &:first-child {
    background: #14387f;
    width: 40%;
  }
  &:last-child {
    background: #da001a;
    width: 60%;
  }
`

const ActionConfirm = ({
  label,
  action,
  btnStyle,
  direction,
  children = 'Action',
  ...props
}) => {
  const [open, setOpen] = useState(false)

  if (!open) {
    return (
      <Button style={btnStyle} onClick={() => setOpen(true)} {...props}>
        {children}
      </Button>
    )
  }

  return (
    <ActionContainer direction={direction}>
      {label && <span>{label}?</span>}
      <ConfirmContainer>
        <ConfirmButton onClick={action} {...props} data-testid="confirmYes">
          Y
        </ConfirmButton>
        <ConfirmButton onClick={() => setOpen(false)} data-testid="confirmNo">
          N
        </ConfirmButton>
      </ConfirmContainer>
    </ActionContainer>
  )
}

export default ActionConfirm
