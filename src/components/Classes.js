import React, { Component } from 'react';
import { NavLink  } from 'react-router-dom';

import firebase from '../Firebase';

class Classes extends Component {

	constructor(){
		super();

		this.state = {
			classes: []
		}

		this.ref = firebase.firestore().collection('classes');
		this.subscribe = null;
	}

	onClassesUpdate = (snapshot) => {
		const classes = [];

		snapshot.forEach((doc) => {
			const { name, capacity } = doc.data();
			classes.push({
				key: doc.id,
				name: name,
				capacity: capacity,
				students_num: 0,
				teachers_num: 0
			});
		});

		this.setState({
			classes: classes
		})
	}

	componentDidMount(){
		this.subscribe = this.ref.onSnapshot(this.onClassesUpdate);
	}

	componentWillUnmount(){
		this.subscribe();
	}

	render() {
		let i = 1;

		return (
			<React.Fragment>
				<div className="row">
					<div className="col-md-12">
						<div className="text-right mb-10">
							<NavLink to="/classes/add" className="btn btn-primary"><i className="fa fa-plus"></i> Add New Class</NavLink>
						</div>
						<div className="panel panel-default">
							<div className="panel-body">
								<table className="table table-striped no-margin">
								  <thead>
								  	<tr>
									  	<th>#</th>
									  	<th>Name</th>
									  	<th>Students</th>
									  	<th>Teachers</th>
									  	<th>Capacity</th>
									  	<th>Status</th>
									 </tr>
								  </thead>
								  <tbody>
									  {this.state.classes.map(_class => 
										  	<tr key={_class.key}>
												<td>{ i++ }</td>
												<td><NavLink to={`/classes/edit/${_class.key}`}>{_class.name}</NavLink></td>
												<td>{ _class.students_num }</td>
												<td>{ _class.teachers_num }</td>
												<td>{ _class.capacity }</td>
												<td>{ _class.full === 1 ? <label className="badge badge-warning">Full</label> :  <label className="badge badge-success">Available</label> }</td>
											</tr>
									  )}


								  	{/* <tr>
								  		<td colSpan="6" className="text-center">No data available</td>
								  	</tr> */}
								  </tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Classes;