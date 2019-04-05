import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from './layout/Nav';
import Dashboard from './components/Dashboard';

import Students from './components/Students';
import AddStudent from './components/AddStudent';
import StudentDetails from './components/StudentDetails';
import EditStudent from './components/EditStudent';

import Classes from './components/Classes';
import AddClass from './components/AddClass';
import EditClass from './components/EditClass';

import Teachers from './components/Teachers';
import AddTeacher from './components/AddTeacher';
import TeacherDetails from './components/TeacherDetails';

ReactDOM.render(
	<Router>
		<React.Fragment>
		<Nav />
		<div className="container main-content">
			<Route exact path="/" component={Dashboard} />

			<Route exact path="/students" component={Students} />
			<Route path="/students/add" component={AddStudent} />
			<Route exact path="/student/:id" component={StudentDetails} />
			<Route path="/student/edit/:id" component={EditStudent} />

			<Route exact path="/teachers" component={Teachers} />
			<Route path="/teachers/add" component={AddTeacher} />
			<Route exact path="/teacher/:id" component={TeacherDetails} />

			<Route exact path="/classes" component={Classes} />
			<Route path="/classes/add" component={AddClass} />
			<Route path='/classes/edit/:id' component={EditClass} />
		</div>
		</React.Fragment>
	</Router>
	, 
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
