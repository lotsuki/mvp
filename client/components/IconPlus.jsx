import React, { useContext } from 'react';
import MainContext from './MainContext';

const IconPlus = () => {
  const { showForm, setShowForm } = useContext(MainContext);

  //exit form when click outside
  const hideForm = (e) => {
    let className = e.target.className;
    if (showForm && e.target.name !== 'form' || className === 'app' || className === 'sidebar-container' || className === 'navbar' || className === 'logo-wrapper') {
      setShowForm(false);
      document.removeEventListener('click', hideForm);
    }
  };

  //display form
  const displayForm = () => {
    if (!showForm) {
      setShowForm(true);
      document.addEventListener('click', hideForm);
    }
  };

  return (
    <div className="plus-icon" data-testid="plus-icon" onClick={displayForm}>
      <svg className="icon-plus" xmlns="http://www.w3.org/2000/svg" width="70" height="50" viewBox="-30 -25 85 85" fill="#4a51d6" style={{cursor: "pointer"}}>
        <title>plus</title>
        <path d="M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z"></path>
      </svg>
    </div>
  )
};

export default IconPlus;