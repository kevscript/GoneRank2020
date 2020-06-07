import React from 'react'
import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom'
import EditIcon from '../assets/edit.svg'
import UserIcon from '../assets/user.svg'

const HeaderContainer = styled.div`
  width: 100%;
`

const Menu = styled.div`
  width: 100%;
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

const IconContainer = styled.div`
  width: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const Icon = styled.img`
  display: block;
  width: 100%;
  height: auto;
`

const Navigation = styled.div`
  width: 100%;
  display: flex;
  padding-top: 0.75rem;
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
`

const Header = ({ user, handleEditMode, handleLogout }) => {
  return (
    <HeaderContainer>
      <Menu>
        {user.roles.includes('ADMIN') && (
          <IconContainer onClick={handleEditMode}>
            <Icon src={EditIcon} alt="edit mode button" />
          </IconContainer>
        )}
        <MenuLink to="/home">gonerank</MenuLink>
        <IconContainer onClick={handleLogout}>
          <Icon src={UserIcon} alt="logout button" />
        </IconContainer>
      </Menu>
      <Navigation>
        <NaviLink
          to="/home/ranking"
          activeStyle={{
            color: '#333',
            borderBottom: '2px solid #14387f',
          }}
        >
          Players
        </NaviLink>
        <NaviLink
          to="/home/matchs"
          activeStyle={{
            color: '#333',
            borderBottom: '2px solid #14387f',
          }}
        >
          Matches
        </NaviLink>
      </Navigation>
    </HeaderContainer>
  )
}

export default Header
