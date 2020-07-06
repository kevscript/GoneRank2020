import React from 'react'
import { render, fireEvent, screen, debug } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PlayersList from '../components/PlayersList'
import { filterPlayersList } from '../utils/filterPlayersList'

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
          matches: [
            {
              id: 'm1',
              opponent: 'aaa',
              date: '01/01/2020',
              lineup: [
                {
                  playerId: '1',
                  average: 7,
                },
              ],
            },
          ],
          globalAverage: 7,
          isActive: true,
        },
        {
          _id: '2',
          firstName: 'Nabil',
          lastName: 'Fekir',
          matchesPlayed: [{ matchId: 'm2' }],
          matches: [
            {
              id: 'm2',
              opponent: 'aaa',
              date: '01/01/2020',
              lineup: [
                {
                  playerId: '2',
                  average: 6,
                },
              ],
            },
          ],
          globalAverage: 6,
          isActive: true,
        },
        {
          _id: '3',
          firstName: 'Rayan',
          lastName: 'Cherki',
          matchesPlayed: [{ matchId: 'm3' }],
          matches: [
            {
              id: 'm3',
              opponent: 'aaa',
              date: '01/01/2020',
              lineup: [
                {
                  playerId: '3',
                  average: 8,
                },
              ],
            },
          ],
          globalAverage: 8,
          isActive: false,
        },
      ],
    }
    render(<PlayersList {...props} />, { wrapper: MemoryRouter })
  })

  test('renders a player item for each displayed player', () => {
    const items = screen.getAllByTestId('player-item')
    // filtered players list as expected in component
    const players = filterPlayersList(props.players, props.editMode)
    expect(items).toHaveLength(players.length)
  })

  test('render correct information about the player', () => {
    const items = screen.getAllByTestId('player-item')
    // filtered players list as expected in component
    const expectedPlayers = filterPlayersList(props.players, props.editMode)
    // check names
    const renderedNames = items.map((item) => {
      return item.querySelector("[data-testid='player-name']").textContent
    })
    const expectedNames = expectedPlayers.map(
      (p) => `${p.firstName} ${p.lastName}`
    )
    expect(renderedNames).toEqual(expectedNames)

    // check averages
    const renderedAvgs = items.map((item) => {
      return parseFloat(
        item.querySelector("[data-testid='player-rating']").textContent
      )
    })
    const expectedAvgs = expectedPlayers.map((p) => p.globalAverage)
    expect(renderedAvgs).toEqual(expectedAvgs)
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
          matches: [
            {
              id: 'm1',
              opponent: 'aaa',
              date: '01/01/2020',
              lineup: [
                {
                  playerId: '1',
                  average: 7,
                },
              ],
            },
          ],
          globalAverage: 7,
          isActive: true,
        },
        {
          _id: '2',
          firstName: 'Nabil',
          lastName: 'Fekir',
          matchesPlayed: [{ matchId: 'm2' }],
          matches: [
            {
              id: 'm2',
              opponent: 'aaa',
              date: '01/01/2020',
              lineup: [
                {
                  playerId: '2',
                  average: 6,
                },
              ],
            },
          ],
          globalAverage: 6,
          isActive: true,
        },
        {
          _id: '3',
          firstName: 'Rayan',
          lastName: 'Cherki',
          matchesPlayed: [{ matchId: 'm3' }],
          matches: [
            {
              id: 'm3',
              opponent: 'aaa',
              date: '01/01/2020',
              lineup: [
                {
                  playerId: '3',
                  average: 8,
                },
              ],
            },
          ],
          globalAverage: 8,
          isActive: false,
        },
      ],
    }
    render(<PlayersList {...props} />, { wrapper: MemoryRouter })
  })

  test('renders a player item for each displayed waplayer', () => {
    const items = screen.getAllByTestId('player-item')
    // filtered players list as expected in component
    const players = filterPlayersList(props.players, props.editMode)
    expect(items).toHaveLength(players.length)
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
