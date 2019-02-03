import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

const Header = () => {
  return (
    <header>
        <Link to='/'>Home</Link>
        <Search />
    </header>
  );
};

export default Header;
