import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import Titles from './Titles';
import Subject from './Subject';
import {useTrail, animated} from 'react-spring';


const Subjects = ({ bmarks, category, showConfirm, setShowConfirm, titlesUpdate, showTitles, setShowTitles, setTitles, handleCatClick, setIsOpen, setCategory, colors, isOpen }) => {
  const [ subj, setSubj ] = useState('');
  const [ update, setUpdate ] = useState(false);

  let subjects = [];
  _.forEach(bmarks, (cat, key) => {
    if( category === key) {
      subjects = subjects.concat(cat);
    }
  });

  const titleClasses = ['far fa-trash-alt', 'title', 'title-wrapper', 'titles-sub-container', 'titles-container', 'confirm-button yes-button', 'confirm-button no-button', 'delete-icon'];
  const subjectClasses = ['subject', 'subject-text'];

  const exitTitles = (e) => {
    let className = e.target.className;
    if (!_.contains(titleClasses, className)) {
     setShowTitles(false);
     document.removeEventListener('click', exitTitles);
    }
    if (className === 'app'){
      setIsOpen(false);
      setCategory('');
    }
  };

  const handleSubjClick = (e) => {
    let subject;
    let target = e.target;
    if (!showTitles) {
      setSubj(e.target.innerText);
      document.addEventListener('click', exitTitles);
      fetch(`/titles/${category}/${e.target.innerText}`)
        .then(res => res.json())
        .then(data => {
         setTitles(data);
         setShowTitles(true);
        })
       .catch(err => { console.log('Error at GET', err); });
    } else if (e.target.innerText === subj) {
      setShowTitles(false);
      setTitles([]);
      setSubj('');
    } else if(_.contains(subjectClasses, e.target.className)) {
      if (e.target.className === 'subject-text') {
        subject = e.target.innerText;
      } else if (e.target.className === 'subject') {
        subject = e.target.children[1].innerText;
      }
      setSubj(subject);
      fetch(`/titles/${category}/${subject}`)
        .then(res => res.json())
        .then(data => {
         setTitles(data);
         setShowTitles(true);
        })
    }
  };

  const trail = useTrail(subjects.length, {
    opacity: isOpen ? 1 : 0,
    height: isOpen ? 50 : 0,
    from: {opacity: isOpen ? 0 : 1, height: isOpen ? 0 : 50}},
  );

  return (
    <div className="subject-container">
      {trail.map(({height, opacity}, index) => (
         <div className="subject-wrapper" key={subjects[index]}>
           <div>
             <animated.div
               className="subject"
               onClick={handleSubjClick}
               style={{height, opacity}}
               key={subjects[index]}>
               <Subject clickedSubj={subj} subject={subjects[index]} color={colors[category]}/>
             </animated.div>
           </div>
         </div>
      ))}
    </div>
  )
};



export default Subjects;

Subjects.propTypes = {
  bmarks: PropTypes.object,
  category: PropTypes.string,
  titlesUpdate: PropTypes.array,
  displayConfirm: PropTypes.func
};

Subjects.defaultProps = {
  bmarks: {},
  category: '',
  titlesUpdate: [],
  displayConfirm: () => {}
};

