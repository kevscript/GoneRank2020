import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import MoonLoader from 'react-spinners/MoonLoader'

const LoadingContainer = styled.div`
  width: 100%;
  height: calc(100vh - 87px);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Loader = ({ size = 100 }) => {
  return (
    <LoadingContainer>
      <MoonLoader color={'#14387f'} size={size} />
    </LoadingContainer>
  )
}

Loader.propTypes = {
  size: PropTypes.number,
}

export default Loader
