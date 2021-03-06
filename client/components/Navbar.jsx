import React from 'react';
import Searchbar from './Searchbar';
import Logo from './Logo';
import NavbarIcons from './NavbarIcons';

const Navbar = () => (
  <nav className="navbar">
    <Logo />
    <Searchbar />
    <NavbarIcons />
  </nav>
);


export default Navbar;

