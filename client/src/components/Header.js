import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'
import EditIcon from '../assets/edit.svg'
import UserIcon from '../assets/user.svg'

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  border-bottom: 2px solid #dbdbdb;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f5f5f5;
`

const Menu = styled.div`
  width: 100%;
  max-width: 800px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
`

const MenuLink = styled(Link)`
  text-decoration: none;
  color: #14387f;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 600;
`

const IconButton = styled.button`
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 0;
  outline: 0;
  background: transparent;
`

const Icon = styled.img`
  display: block;
  width: 15px;
  height: auto;
`

const Navigation = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  height: 35px;
`

const NaviLink = styled(NavLink)`
  text-decoration: none;
  color: #dbdbdb;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  font-weight: 600;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #dbdbdb;
  margin-bottom: -2px;

  &:hover {
    transition: all 0.2s ease-in;
    color: #333;
    border-bottom: 2px solid #dbdbdb;
  }
`

const Header = ({ user, handleEditMode, handleLogout }) => {
  return (
    <HeaderContainer>
      <Menu>
        {user.roles.includes('ADMIN') && (
          <IconButton onClick={handleEditMode}>
            <Icon src={EditIcon} alt="edit mode button" />
          </IconButton>
        )}
        <MenuLink to="/home">gonerank</MenuLink>
        <IconButton onClick={handleLogout}>
          <Icon src={UserIcon} alt="logout button" />
        </IconButton>
      </Menu>
      <Navigation>
        <NaviLink
          to="/home/ranking"
          activeStyle={{
            color: '#333',
            borderBottom: '2px solid #14387f',
          }}
        >
          Joueurs
        </NaviLink>
        <NaviLink
          to="/home/matchs"
          activeStyle={{
            color: '#333',
            borderBottom: '2px solid #14387f',
          }}
        >
          Matchs
        </NaviLink>
      </Navigation>
    </HeaderContainer>
  )
}

Header.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    roles: PropTypes.array.isRequired,
  }).isRequired,
  handleEditMode: PropTypes.func,
  handleLogout: PropTypes.func,
}

export default Header
