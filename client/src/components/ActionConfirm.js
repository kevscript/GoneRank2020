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
          No
        </ConfirmButton>
      </ConfirmContainer>
    </ActionContainer>
  )
}

export default ActionConfirm
