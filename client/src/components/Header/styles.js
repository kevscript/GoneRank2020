import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom'

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
`

export const Menu = styled.div`
  width: 100%;
  max-width: 800px;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
`

export const MenuLink = styled(Link)`
  text-decoration: none;
  color: #14387f;
  text-transform: uppercase;
  font-weight: 600;
`

export const IconButton = styled.button`
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 0;
  outline: 0;
  background: transparent;
`

export const Icon = styled.img`
  display: block;
  width: 15px;
  height: auto;
`

export const Navigation = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  height: 45px;
  background: #fff;
`

export const NaviLink = styled(NavLink)`
  text-decoration: none;
  color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding: 0.75rem 0;
  transition: all 0.2s ease-in-out;
  font-weight: 600;

  &:not(:last-child) {
    border-right: 1px solid #f5f5f5;
  }
`
