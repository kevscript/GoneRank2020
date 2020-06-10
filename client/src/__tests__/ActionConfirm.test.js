import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ActionConfirm from '../components/ActionConfirm'

describe('ActionConfirm component', () => {
  let props
  beforeEach(() => {
    props = {
      children: 'Click Me',
      btnStyle: {
        color: 'red',
      },
      action: jest.fn(),
    }
    render(<ActionConfirm {...props} />)
  })

  test('render with correct styling props', () => {
    const mainButton = screen.getByRole('button')

    expect(mainButton).toBeInTheDocument()
    expect(mainButton).toHaveStyle(`color: ${props.btnStyle.color}`)
    expect(mainButton.textContent).toBe(props.children)
  })

  test('clicking main button makes it dissapear shows confirmation buttons', () => {
    const mainButton = screen.getByRole('button')
    fireEvent.click(mainButton)
    const yesButton = screen.getByTestId('confirmYes')
    const noButton = screen.getByTestId('confirmNo')

    expect(mainButton).not.toBeInTheDocument()
    expect(yesButton).toBeInTheDocument()
    expect(noButton).toBeInTheDocument()
  })

  test('clicking YES button calls the action handler', () => {
    const mainButton = screen.getByRole('button')
    fireEvent.click(mainButton)
    const yesButton = screen.getByTestId('confirmYes')
    fireEvent.click(yesButton)

    expect(props.action).toHaveBeenCalled()
  })

  test('clicking NO button make confirmation buttons dissapear and shows main button', () => {
    const mainButton = screen.getByRole('button')
    fireEvent.click(mainButton)
    const yesButton = screen.getByTestId('confirmYes')
    const noButton = screen.getByTestId('confirmNo')
    fireEvent.click(noButton)

    const mainButtonBack = screen.getByRole('button')
    expect(mainButtonBack).toBeInTheDocument()
    expect(yesButton).not.toBeInTheDocument()
    expect(noButton).not.toBeInTheDocument()
    expect(props.action).not.toHaveBeenCalled()
  })
})
