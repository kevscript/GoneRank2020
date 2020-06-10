import React from 'react'
import { render, fireEvent, screen, debug } from '@testing-library/react'
import PlayersList from '../components/PlayersList'

describe('PlayersList component / Edit Mode OFF', () => {
  let props

  beforeEach(() => {
    props = {
      editMode: false,
      handleRemovePlayer: jest.fn(),
      players: [
        {
          _id: '1',
          firstName: 'Leo',
          lastName: 'Messi',
          matchesPlayed: [{ matchId: 'm1' }],
          globalAverage: 7,
        },
        {
          _id: '2',
          firstName: 'Nabil',
          lastName: 'Fekir',
          matchesPlayed: [{ matchId: 'm1' }],
          globalAverage: 6,
        },
        {
          _id: '3',
          firstName: 'Rayan',
          lastName: 'Cherki',
          matchesPlayed: [{ matchId: 'm2' }],
          globalAverage: 8,
        },
      ],
    }
    render(<PlayersList {...props} />)
  })

  test('renders a player item for each player', () => {
    const items = screen.getAllByTestId('player-item')
    expect(items).toHaveLength(props.players.length)
  })

  test('render correct information about the player', () => {
    const items = screen.getAllByTestId('player-item')

    // check names
    const renderedNames = items.map((item) => {
      return item.querySelector("[data-testid='player-name']").textContent
    })
    const passedNames = props.players.map((p) => `${p.firstName} ${p.lastName}`)
    expect(renderedNames).toEqual(passedNames)

    // check rankings
    const renderedRankings = items.map((item) => {
      return item.querySelector("[data-testid='player-ranking']").textContent
    })
    const passedRankings = props.players.map((p, i) => `#${i + 1}`)
    expect(renderedRankings).toEqual(passedRankings)

    // check averages
    const renderedAvgs = items.map((item) => {
      return parseFloat(
        item.querySelector("[data-testid='player-rating']").textContent
      )
    })
    const passedAvgs = props.players.map((p) => p.globalAverage)
    expect(renderedAvgs).toEqual(passedAvgs)
  })
})

describe('PlayersList component / Edit Mode ON', () => {
  let props

  beforeEach(() => {
    props = {
      editMode: true,
      handleRemovePlayer: jest.fn(),
      players: [
        {
          _id: '1',
          firstName: 'Leo',
          lastName: 'Messi',
          matchesPlayed: [{ matchId: 'm1' }],
          globalAverage: 7,
        },
        {
          _id: '2',
          firstName: 'Nabil',
          lastName: 'Fekir',
          matchesPlayed: [{ matchId: 'm1' }],
          globalAverage: 6,
        },
        {
          _id: '3',
          firstName: 'Rayan',
          lastName: 'Cherki',
          matchesPlayed: [{ matchId: 'm2' }],
          globalAverage: 8,
        },
      ],
    }
    render(<PlayersList {...props} />)
  })

  test('renders a remove button for each player', () => {
    const buttons = screen.getAllByTestId('remove-button')
    expect(buttons.length).toEqual(props.players.length)
  })

  test('clicking remove button opens confirmation buttons', () => {
    const button = screen.getAllByTestId('remove-button')[0]
    fireEvent.click(button)
    const yesButton = screen.getByTestId('confirmYes')
    const noButton = screen.getByTestId('confirmNo')
    expect(yesButton).toBeInTheDocument()
    expect(noButton).toBeInTheDocument()
  })

  test('clicking yes button calls the action handle handleRemovePlayer', () => {
    const button = screen.getAllByTestId('remove-button')[0]
    fireEvent.click(button)
    const yesButton = screen.getByTestId('confirmYes')
    fireEvent.click(yesButton)
    expect(props.handleRemovePlayer).toHaveBeenCalled()
  })

  test('clicking no button makes confirmation buttons dissapear and doesnt call handleRemovePlayer', () => {
    const button = screen.getAllByTestId('remove-button')[0]
    fireEvent.click(button)
    const yesButton = screen.getByTestId('confirmYes')
    const noButton = screen.getByTestId('confirmNo')
    fireEvent.click(noButton)
    expect(yesButton).not.toBeInTheDocument()
    expect(noButton).not.toBeInTheDocument()
    expect(props.handleRemovePlayer).not.toHaveBeenCalled()
  })
})
