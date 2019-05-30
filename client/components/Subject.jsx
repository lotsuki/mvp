import React from 'react';
import PropTypes from 'prop-types';

const Subject = ({ clickedSubj, subject }) => {
  return (
    <div className="subject-wrapper">
    {
      clickedSubj === subject
      ? (
        <div
          className="subject"
          style={{ background:'#DBDBDA' }}>
          <span className="leftSide">{subject}</span>
          <i className="fas fa-chevron-down"></i>
        </div>
        )
      : (
        <div className="subject">
          <span className="leftSide">{subject}</span>
          <i className="fas fa-chevron-down"></i>
        </div>
        )
    }
    </div>
  );
};

export default Subject;


Subject.propTypes = {
  clickedSubj: PropTypes.string,
  subject: PropTypes.string
};

Subject.defaultProps = {
  clickedSubj: '',
  subject: ''
};