import React from 'react'
import PropTypes from 'prop-types'
import EditIcon from '../../assets/edit.svg'
import LogoutIcon from '../../assets/logout.svg'
import {
  HeaderContainer,
  Menu,
  MenuLink,
  IconButton,
  Icon,
  Navigation,
  NaviLink,
} from './styles'

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
          <Icon src={LogoutIcon} alt="logout button" />
        </IconButton>
      </Menu>
      <Navigation>
        <NaviLink
          to="/home/players"
          activeStyle={{
            color: '#14387f',
          }}
        >
          Joueurs
        </NaviLink>
        <NaviLink
          to="/home/matchs"
          activeStyle={{
            color: '#14387f',
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
