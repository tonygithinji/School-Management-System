import React, { Component } from 'react';
import { NavLink  } from 'react-router-dom';

import firebase from '../Firebase';

class Students extends Component {

	constructor(){
		super();

		this.state = {
			students: []
		};

		this.unsubsribe = null;
		this.ref = firebase.firestore().collection("students");
	}

	onStudentsUpdate = (snapshot) =>{
		const students = [];

		snapshot.forEach(doc => {
			const { firstname, lastname, gender, residential_area, parent_name, parent_phone_number } = doc.data();

			students.push({
				key: doc.id,
				firstname: firstname,
				lastname: lastname,
				gender: gender,
				residential_area: residential_area,
				parent_name: parent_name,
				parent_phone_number: parent_phone_number
			});
		});

		this.setState({
			students: students
		});
	}

	componentDidMount(){
		this.unsubsribe = this.ref.onSnapshot(this.onStudentsUpdate);
	}

	componentWillUnmount(){
		this.unsubsribe();
	}

	render() {
		let i = 1;

		return (
			<React.Fragment>
				<div className="row">
					<div className="col-md-12">
						<div className="text-right mb-10">
							<NavLink to="/students/add" className="btn btn-primary"><i className="fa fa-plus"></i> Add New Student</NavLink>
						</div>
						<div className="panel panel-default">
							<div className="panel-body">
								<table className="table table-striped">
								  <thead>
								  	<tr>
									  	<th>#</th>
									  	<th>First Name</th>
									  	<th>Last Name</th>
									  	<th>Sex</th>
									  	<th>Parent Name</th>
									  	<th>Parent Phone Number</th>
									  	<th>Residence</th>
									 </tr>
								  </thead>
								  <tbody>
									  { this.state.students.map(student => 
										  <tr key={ student.key }>
										  	  <td>{ i++ }</td>
											  <td>{ student.firstname }</td>
											  <td>{ student.lastname }</td>
											  <td>{ student.gender }</td>
											  <td>{ student.parent_name }</td>
											  <td>{ student.parent_phone_number }</td>
											  <td>{ student.residential_area }</td>
										  </tr>
									  )}
								  	{/* <tr>
								  		<td colSpan="7" className="text-center">No data available</td>
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

export default Students;