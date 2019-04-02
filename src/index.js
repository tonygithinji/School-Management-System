import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from './layout/Nav';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import Teachers from './components/Teachers';
import Classes from './components/Classes';

ReactDOM.render(
	<Router>
		<React.Fragment>
		<Nav />
		<div className="container main-content">
			<Route exact path="/" component={Dashboard} />
			<Route path="/students" component={Students} />
			<Route path="/teachers" component={Teachers} />
			<Route path="/classes" component={Classes} />
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
