import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import MatchsList from '../components/MatchsList'
import { sortMatchesByDate } from '../utils/sortMatchesByDate'

describe('MatchsList component / Edit Mode OFF', () => {
  let props

  beforeEach(() => {
    props = {
      editMode: false,
      handleMatchActivation: jest.fn(),
      matches: [
        {
          id: '1',
          location: 'home',
          date: '01/02/2020',
          opponent: 'PSG',
          average: 7,
          active: false,
        },
        {
          id: '2',
          location: 'away',
          date: '02/02/2020',
          opponent: 'Lille',
          average: 6,
          active: false,
        },
        {
          id: '3',
          location: 'home',
          date: '03/02/2020',
          opponent: 'Real',
          average: 8,
          active: true,
        },
      ],
    }
    render(<MatchsList {...props} />, { wrapper: MemoryRouter })
  })

  test('renders an item for each match', () => {
    const matchItems = screen.getAllByTestId('match-item')
    expect(matchItems).toHaveLength(props.matches.length)
  })

  test('renders correct location for each match', () => {
    const matchItems = screen.getAllByTestId('match-item')
    const sortedMatches = sortMatchesByDate(props.matches, 'DESC')

    const expectedLocations = sortedMatches.map((match) => {
      return match.location === 'home' ? 'Dom.' : 'Ext.'
    })
    const renderedLocations = matchItems.map((item) => {
      return item.querySelector("[data-testid='match-location']").textContent
    })
    expect(renderedLocations).toEqual(expectedLocations)
  })

  test('renders correct date for each match', () => {
    const matchItems = screen.getAllByTestId('match-item')
    const sortedMatches = sortMatchesByDate(props.matches, 'DESC')

    const expectedDates = sortedMatches.map((match) => match.date.slice(0, 5))
    const renderedDates = matchItems.map((item) => {
      return item.querySelector("[data-testid='match-date']").textContent
    })
    expect(renderedDates).toEqual(expectedDates)
  })

  test('renders correct opponent for each match', () => {
    const matchItems = screen.getAllByTestId('match-item')
    const sortedMatches = sortMatchesByDate(props.matches, 'DESC')

    const expectedOpponents = sortedMatches.map((match) => match.opponent)
    const renderedOpponents = matchItems.map((item) => {
      return item.querySelector("[data-testid='match-opponent']").textContent
    })
    expect(renderedOpponents).toEqual(expectedOpponents)
  })

  test('renders correct averages for each match', () => {
    const matchItems = screen.getAllByTestId('match-item')
    const sortedMatches = sortMatchesByDate(props.matches, 'DESC')

    const expectedAvgs = sortedMatches.map((match) => {
      return match.average ? `${match.average}` : '-'
    })
    const renderedAvgs = matchItems.map((item) => {
      // averages are displayed as string and are toFixed(2), so we have to revert the logic
      // "7.00" -> 7 -> "7"
      return `${parseFloat(
        item.querySelector("[data-testid='match-average']").textContent
      )}`
    })
    expect(renderedAvgs).toEqual(expectedAvgs)
  })
})

describe('MatchsList component / Edit Mode ON', () => {
  let props

  beforeEach(() => {
    props = {
      editMode: true,
      handleMatchActivation: jest.fn(),
      matches: [
        {
          id: '1',
          location: 'home',
          date: '01/02/2020',
          opponent: 'PSG',
          average: 7,
          active: false,
        },
        {
          id: '2',
          location: 'away',
          date: '02/02/2020',
          opponent: 'Lille',
          average: 6,
          active: false,
        },
        {
          id: '3',
          location: 'home',
          date: '03/02/2020',
          opponent: 'Real',
          average: 8,
          active: true,
        },
      ],
    }
    render(<MatchsList {...props} />, { wrapper: MemoryRouter })
  })

  test('shows a button for match activation', () => {
    const activationButtons = screen.getAllByTestId('activation-button')
    const inactiveMatches = props.matches.filter((m) => m.active !== true)
    expect(activationButtons).toHaveLength(inactiveMatches.length)
  })

  test('clicking on an activation button and confirming action -> calls handleMatchActivation', () => {
    const activationButton = screen.getAllByTestId('activation-button')[0]
    fireEvent.click(activationButton)
    const yesButton = screen.getByTestId('confirmYes')
    fireEvent.click(yesButton)
    expect(props.handleMatchActivation).toHaveBeenCalled()
  })
})
