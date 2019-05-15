import React from 'react';
import SidebarHeader from './SidebarHeader.jsx';
import SidebarCategories from './SidebarCategories.jsx';
import Dropdown from './Dropdown.jsx';

class Quicklinks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    }
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(e) {
    e.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render() {
    return(
      <div className="quicklinksContainer">
        <SidebarHeader sidebarHeader="Quick links" />
        <SidebarCategories categories={this.props.quicklinks} />
        <Dropdown menu={this.props.quicklinks}/>
      </div>
    );
  }
};

export default Quicklinks;
