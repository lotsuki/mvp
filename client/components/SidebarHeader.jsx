import React from 'react';
import PropTypes from 'prop-types';

const SidebarHeader = ({sidebarHeader}) => (
  <div className="sidebarHeaderWrapper">
    <div className="sidebarHeader" >{sidebarHeader}</div>
  </div>
);


export default SidebarHeader;

SidebarHeader.propTypes = {
  sidebarHeader: PropTypes.string
}
SidebarHeader.defaultProps = {
  sidebarHeader: 'Header'
}