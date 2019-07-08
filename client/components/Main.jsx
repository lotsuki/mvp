import React, { useState, useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Content from './Content';
import MainContext from './MainContext';

//try wihtout fragments

const Main = ({ groups, groupsID, links }) => {
  const [ showForm, setShowForm, ] = useState(false);
  console.log(showForm, 'MAIN showForm');
  console.log(groups, 'MAIN groups');
  console.log(links, 'MAIN links');
  return (
    <MainContext.Provider value={{showForm, setShowForm}}>
    <div id="container">
      <Navbar links={links} />
      <Content groups={groups} groupsID={groupsID}/>
    </div>
    </MainContext.Provider>
  );
};

export default Main;

Main.propTypes = {
  groups: PropTypes.array,
  groupsID: PropTypes.string,
  links: PropTypes.array
};

