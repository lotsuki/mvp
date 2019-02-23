import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import moment from 'moment';
import Subjects from './Subjects.jsx';
import Title from './Title.jsx';
import Site from './Site.jsx';
import AddSubjects from './AddSubjects.jsx';
import Header from './Header.jsx';
import Board from './Board.jsx';
import RestyledApp from './RestyledApp.jsx';


class App extends React.Component {
    constructor(props, context) {
    super(props, context);

    this.state = {
      data: [],
      subjects: [],
      title: '',
      url: '',
      subject: '',
      subjectToAdd: '',
      isLoading: true
    };
    this.titleChange = this.titleChange.bind(this);
    this.urlChange = this.urlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.subjectToAddChange = this.subjectToAddChange.bind(this);
    this.subjectChange = this.subjectChange.bind(this);
    this.addSubject = this.addSubject.bind(this);
    this.deleteSubject = this.deleteSubject.bind(this);
    this.toggle = this.toggle.bind(this);

  }

  componentDidMount() {
    fetch ('/docs')
    .then(res => res.json())
    .then(results => {this.setState({
      data: results,
      isLoading: true
    })})
    .catch(err => { console.log('Error at GET', err) });

    var storageStr = localStorage.getItem('subjects');

    if (storageStr) {
      var storage = JSON.parse(storageStr);
      this.setState({
        subjects: storage
      })
    }
  }

  titleChange(e) {
    this.setState({ title: e.target.value });
  }

  urlChange(e) {
    this.setState({ url: e.target.value })
  }
  subjectToAddChange(e) {
    this.setState({ subjectToAdd: e.target.value})
  }
  subjectChange(e) {
    this.setState({ subject: e.target.value})
  }

  addSubject(e) {
    e.preventDefault();
    var storage = this.state.subjects;

    storage.push(this.state.subjectToAdd);
    localStorage.setItem('subjects', JSON.stringify(storage));

    this.setState({
      subjects: storage
    })
    location.reload();
  }

  deleteSubject(e) {
    //TODO: refactor, minify
    e.preventDefault();
    var storage = localStorage.getItem('subjects');
    var parsed = JSON.parse(storage);
    var subject = this.state.subjectToAdd;

    fetch(`/subject/${subject}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(result => {
      console.log(result, 'RESULT')
    })

    new Promise((resolve, reject) => {
      resolve('ok')
    })
    .then(() => {
      for (var i = 0; i < parsed.length; i++) {
        if (subject === parsed[i]) {
          parsed.splice(i, 1);
        }
      }
        return parsed;
    })
    .then(result => {
      console.log(result, 'deleted')
      localStorage.setItem('subjects', JSON.stringify(result));
      this.setState({
        subjects: result
      })
    })
    .catch(err => { console.log('Cannot delete subject', err) })

    location.reload();
  }

  handleSubmit(e) {
    var data = {
      subject: this.state.subject,
      sites: [{
        title: this.state.title,
        url: this.state.url,
        date: moment().format('MM-DD-YYYY')
      }]
    };

    fetch('/', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then( res => res.json())
    .then(results => {
      this.setState({
        data: results
      })
    })
    .catch(err => { console.log('Could not post document', err); })
  }
  toggle() {
    console.log('fuck')
  }

  render() {
    if (!this.state.isLoading) {
      return <div>Loading...</div>
    }
    return (
      <div className="container">
        <Header />
        <div className="formContainer">
          <div className="formWrapper">
            <form className="form" onSubmit={(e) => this.handleSubmit(e)}>
              <Title title={this.state.title} titleChange={this.titleChange}/>
              <Site url={this.state.url} urlChange={this.urlChange}/>
              <Subjects subjects={this.state.subjects} handleChange={this.subjectChange}/>
              <div className="submitWrapper">
                <input className="submit" type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
        <Board data={this.state.data} title={this.state.title} subjects={this.state.subjects} subjectToAdd={this.state.subjectToAdd} subjectToAddChange={this.subjectToAddChange} addSubject={this.addSubject} deleteSubject={this.deleteSubject} toggle={this.toggle}/>
        <RestyledApp />
      </div>
    );
  }
};

export default App;