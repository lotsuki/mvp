import React from 'react';

//TODO: default props
const FormInputs = ({ setCategory, subjectChange, titleChange, urlChange, handleSubmit}) => (
  <div className="formContainer">
    <input type="text" className="inputList" placeholder="List category" onChange={setCategory}/>
    <input type="text" className="inputSubject" placeholder="Subject" onChange={subjectChange}/>
    <input type="text" className="inputTitle" placeholder="Title" onChange={titleChange}/>
    <input type="text" className="inputURL" placeholder="URL" onChange={urlChange}/>
    <input type="submit" value="Add" onClick={handleSubmit}/>
  </div>
);

export default FormInputs;