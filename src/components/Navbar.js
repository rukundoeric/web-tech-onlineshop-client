import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import logo from '../logo.svg';
import styled from 'styled-components';
import {ButtonContainer} from './Button';

export default class Navbar extends Component {
    render() {
        return (
            <NavWrapper className="navbar nav-bar-expand-sm navbar-dark px-sm-5">
               <Link to='/'>
                  <ButtonContainer>
                       <b><span>WEB/TECH</span></b>
                  </ButtonContainer>

               </Link>
               <ul className="navbar-nav align-items-center">
                 <li className="nav-item ml-5">
                    <Link to="/" className="nav-link">
                       Products
                    </Link>
                 </li>
               </ul>
               <Link to="/cart" className="ml-auto">
                  <ButtonContainer>
                      <i className="fas fa-cart-plus"></i>
                  </ButtonContainer>
               </Link>
               <div>
                   <Link to="/product/create" className="ml-auto">
                       <ButtonContainer>
                           Add new products
                       </ButtonContainer>
                   </Link>
               <Link to="/login" className="ml-auto">
                  <ButtonContainer>
                      Login
                  </ButtonContainer>
               </Link>
               <Link to="/signup" className="ml-auto">
                  <ButtonContainer>
                      Signup
                  </ButtonContainer>
               </Link>
               </div>
            </NavWrapper>
        )
    }
}
const NavWrapper = styled.nav`
background:var(--mainBlue);
.nav-link{
    color:var(--mainWhite) !important;
    font-size:1.3 rem;
    text-transform:capitalize;
}
`;
