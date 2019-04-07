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
		let rows = "";

		if(this.state.students.length > 0){
			rows = this.state.students.map(student => 
					  <tr key={ student.key }>
					  	  <td>{ i++ }</td>
						  <td>{ student.firstname }</td>
						  <td>{ student.lastname }</td>
						  <td>{ student.gender }</td>
						  <td>{ student.parent_name }</td>
						  <td>{ student.parent_phone_number }</td>
						  <td>{ student.residential_area }</td>
						  <td><NavLink to={`/student/${student.key}`}><i className="fa fa-eye"></i></NavLink></td>
					  </tr>
				  )
		}else{
			rows = <tr>
				  		<td colSpan="8" className="text-center">No students available</td>
				  	</tr>
		}

		return (
			<React.Fragment>
				<div className="row">
					<div className="col-md-12">
						<div className="clearfix mb-10">
							<div className="pull-left">
								<h3>Students</h3>
							</div>
							<div className="pull-right">
								<NavLink to="/students/add" className="btn btn-primary" style={{marginTop:20}}><i className="fa fa-plus"></i> Add New Student</NavLink>
							</div>
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
										<th></th>
									 </tr>
								  </thead>
								  <tbody>
									  { rows }
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