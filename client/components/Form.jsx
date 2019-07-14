import React, { useState, useContext } from 'react';
import ContentContext from './ContentContext';
import MainContext from './MainContext';
import moment from 'moment';
import utils from '../lib/utils';
import axios from 'axios';
import { Spring } from 'react-spring/renderprops';

const Form = () => {
  const [ category, setCategory ] = useState('');
  const [ subject, setSubject ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ url, setUrl ] = useState('');
  const [ color, setColor ] = useState('#D00000');
  const [ selectCat, setSelectCat ] = useState(false);
  const [ selectSub, setSelectSub ] = useState(false);
  const { groups, groupsID, updatePage } = useContext(ContentContext);
  const { showForm, setShowForm, links } = useContext(MainContext);

  //update indices of categories or subjects in groups array after deletion
  const updateGroups = (_groups, _hasCat, _hasSubj, _catID, _subject) => {
    if (!_hasCat && !_hasSubj) {
      _groups.push({id: groups.length, category, color, subjects: [{id: 0, subject:_subject}]});
      return _groups;
    } else if (!_hasSubj) {
      let _subjects = _groups[_catID].subjects;
      _subjects.push({id: _subjects.length, subject:_subject});
      return _groups;
    }
  };

  //submit bookmark
  const submitForm = (e) => {
    e.preventDefault();
    const hasCat = utils.hasCategory(groups, category);
    const catID = utils.findCategoryID(groups, category);
    let hasSubj;
    let subjectL;

    if (catID >= 0) {
      hasSubj = utils.hasSubject(groups, subject, catID);
      subjectL = groups[catID].subjects.length;
    }
    if (category && subject && title && url) {
      axios.post('/form', {
        groupsID,
        categoryL: groups.length,
        category,
        subject,
        title,
        url,
        date: moment().format('MM-DD-YYYY'),
        hasCat,
        hasSubj,
        catID,
        subjectL,
        foldColor: catID >= 0 ? groups[catID].color : color
        })
        .then(res => {
          console.log(res, 'res in post')
          //updated groups array with correct indices
          let updatedArr = updateGroups(groups, hasCat, hasSubj, catID, subject);
          //update page with new groups array
          updatePage(updatedArr);
          console.log('POST request successful');
        })
        .catch(err => { console.log('Error at POST request', err); });
      setShowForm(false);
    } else {
      alert('All fields must be filled out')
    }
  };

  return(
    <Spring
      config={{duration: 2000}}
      from={{ height: 0 }}
      to={{ height: 240}}>
      {props =>
        <div id="form-container">
          <form className="form"
              data-testid="form"
              name="form"
              autoComplete="off"
              onSubmit={submitForm}>
          <div className="form-category-container">
            <div className="cat-input-wrapper">
              <input
                name="form"
                type="text"
                value={category}
                className="form-input category-input"
                data-testid="category-input"
                placeholder="Category"
                onChange={e => setCategory(e.target.value)}
                />
              <input name="form" type="color" defaultValue="#D00000" className="color" onChange={e => setColor(e.target.value)}/>
            </div>
            <div className="form-dropdown-wrapper">
            {
              selectCat &&
              (<ul>
                { categories.map(category => (
                  <li>{category}</li>
                ))}
              </ul>)
            }
            </div>
          </div>
          <div className="sub-input-wrapper">
            <input
              name="form"
              type="text"
              value={subject}
              className="form-input subject-input"
              data-testid="subject-input"
              placeholder="Subject"
              onChange={e => {
                setSubject(e.target.value);
              }}/>
          </div>
          <input
            name="form"
            type="text"
            value={title}
            className="form-inputs"
            data-testid="title-input"
            placeholder="Title"
            onChange={e=> setTitle(e.target.value)}/>
          <input
            name="form"
            type="text"
            value={url}
            className="form-inputs"
            data-testid="url-input"
            placeholder="URL"
            onChange={e => setUrl(e.target.value)}/>
          <input
            name="form"
            type="submit"
            className="form-inputs"
            data-testid="submit"
            value="Submit"/>
        </form>
        </div>}
    </Spring>
  );
};


export default Form;


  // const displaySelectMenu = (className) => {
  //   console.log(className)
  //   if (className === 'category-input') {
  //     setSelectCat(true);
  //   } else if (className === 'subject-input') {
  //     setSelectSub(true);
  //   }
  // };
//onFocus={e => displaySelectMenu(e.target.className)}


