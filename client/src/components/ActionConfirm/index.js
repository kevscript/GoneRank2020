import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  ActionContainer,
  Button,
  ConfirmContainer,
  ConfirmButton,
} from './styles'

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

ActionConfirm.propTypes = {
  label: PropTypes.string,
  action: PropTypes.func,
  btnStyle: PropTypes.object,
  direction: PropTypes.string,
}

export default ActionConfirm
