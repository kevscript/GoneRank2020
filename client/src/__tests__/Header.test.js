import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from '../components/Header'

describe('Header component', () => {
  test('it has Players and Matches navigation links', () => {
    const props = {
      user: { id: '1', token: 'abc', roles: ['USER'] },
      handleLogout: jest.fn(),
    }
    render(<Header {...props} />, { wrapper: MemoryRouter })

    expect(screen.getByText(/players/i)).toBeInTheDocument()
    expect(screen.getByText(/matches/i)).toBeInTheDocument()
  })

  test('it has a button to logout user', () => {
    const props = {
      user: { id: '1', token: 'abc', roles: ['USER'] },
      handleLogout: jest.fn(),
    }
    render(<Header {...props} />, { wrapper: MemoryRouter })

    expect(screen.getByAltText(/logout/i)).toBeInTheDocument()
    const logoutButton = screen.getByRole('button')
    fireEvent.click(logoutButton)
    expect(props.handleLogout).toHaveBeenCalled()
  })

  test('it has an edit button when user is ADMIN', () => {
    const props = {
      user: { id: '1', token: 'abc', roles: ['USER', 'ADMIN'] },
      handleLogout: jest.fn(),
      handleEditMode: jest.fn(),
    }
    render(<Header {...props} />, { wrapper: MemoryRouter })

    expect(screen.getByAltText(/edit/i)).toBeInTheDocument()
    const editButton = screen.getAllByRole('button')[0]
    fireEvent.click(editButton)
    expect(props.handleEditMode).toHaveBeenCalled()
  })
})
