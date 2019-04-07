import React, { Component } from 'react';
import { NavLink  } from 'react-router-dom';

import firebase from '../Firebase';

class Teachers extends Component {
	
	constructor(){
		super();
		
		this.state = {
			teachers: []
		};

		this.unsubsribe = null;
		this.ref = firebase.firestore().collection("teachers");
	}

	onTeachersUpdate = (snapshot) =>{
		const teachers = [];

		snapshot.forEach(doc => {
			const { firstname, lastname, gender, dateofbirth, address, residential_area, phone_number, id_number } = doc.data();

			teachers.push({
				key: doc.id,
				firstname: firstname,
                lastname: lastname,
                gender: gender,
                dateofbirth: dateofbirth,
                address: address,
                residential_area: residential_area,
                phone_number: phone_number,
                id_number: id_number
			});
		});

		this.setState({
			teachers: teachers
		});
	}

	componentDidMount(){
		this.unsubsribe = this.ref.onSnapshot(this.onTeachersUpdate);
	}

	componentWillUnmount(){
		this.unsubsribe();
	}

	render() {
		let i = 1;
		let rows = "";

		if(this.state.teachers.length > 0){
			rows = this.state.teachers.map(teacher => 
					<tr key={ teacher.key }>
						<td>{ i++ }</td>
						<td>{ teacher.firstname }</td>
						<td>{ teacher.lastname }</td>
						<td>{ teacher.phone_number }</td>
						<td>{ teacher.id_number }</td>
						<td>{ teacher.dateofbirth }</td>
						<td>{ teacher.residential_area }</td>
						<td><NavLink to={`/teacher/${teacher.key}`}><i className="fa fa-eye"></i></NavLink></td>
					</tr>
				)
		}else{
			rows = <tr>
				  		<td colSpan="8" className="text-center">No teachers available</td>
				  	</tr>
		}

		return (
			<React.Fragment>
				<div className="row">
					<div className="col-md-12">
						<div className="clearfix mb-10">
							<div className="pull-left">
								<h3>Teachers</h3>
							</div>
							<div className="pull-right">
								<NavLink to="/teachers/add" className="btn btn-primary" style={{marginTop:20}}><i className="fa fa-plus"></i> Add New Teacher</NavLink>
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
									  	<th>Phone</th>
									  	<th>ID Number</th>
									  	<th>Date of Birth</th>
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

export default Teachers;