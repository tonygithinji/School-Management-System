import React, { Component } from 'react';
import { NavLink  } from 'react-router-dom';

class Nav extends Component {
	render() {
		return (
			<nav className="navbar navbar-default navbar-fixed-top">
		      <div className="container">
		        <div className="navbar-header">
		          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
		            <span className="sr-only">Toggle navigation</span>
		            <span className="icon-bar"></span>
		            <span className="icon-bar"></span>
		            <span className="icon-bar"></span>
		          </button>
		          <NavLink className="navbar-brand" to="#">Shule Yetu</NavLink>
		        </div>
		        <div id="navbar" className="collapse navbar-collapse">
		          <ul className="nav navbar-nav">
		            <li>
		            	<NavLink activeClassName="active" exact={true} to="/">Dashboard</NavLink>
		            </li>
		            <li>
		            	<NavLink activeClassName="active" to="/students">Students</NavLink>
		            </li>
		            <li>
		            	<NavLink activeClassName="active" to="/teachers">Teachers</NavLink>
		            </li>
		            <li>
		            	<NavLink activeClassName="active" to="/classes">Classes</NavLink>
		            </li>
		          </ul>
		        </div>
		      </div>
		    </nav>
		);
	}
}

export default Nav;