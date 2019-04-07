import React, { Component } from 'react';
import { NavLink  } from 'react-router-dom';
import '../app.css';

import firebase from '../Firebase';

class Dashboard extends Component {

	constructor(){
		super();

		this.state = {
			students_num: 0,
			teachers_num: 0,
			classes_num: 0,
			students: [],
			teachers: [],
			classes: []
		};

		this.students_unsubscribe = null;
		this.teachers_unsubscribe = null;
		this.classes_unsubscribe = null;
	}

	fetchStudents = (snapshot) => {
		const _students = [];
		snapshot.forEach(doc => {
			const { firstname, lastname, gender, parent_name, parent_phone_number, residential_area } = doc.data();
			_students.push({
				key: doc.id,
				firstname,
				lastname,
				gender,
				parent_name,
				parent_phone_number,
				residential_area
			});
		});

		this.setState({
			students: _students
		});
	}

	fetchTeachers = (snapshot) => {
		const _teachers = [];
		snapshot.forEach(doc => {
			const { firstname, lastname, phone_number, id_number, dateofbirth, residential_area } = doc.data();
			_teachers.push({
				key: doc.id,
				firstname,
				lastname,
				phone_number,
				id_number,
				dateofbirth,
				residential_area
			});
		});

		this.setState({
			teachers: _teachers
		})
	}

	fetchClasses = (snapshot) => {
		const _classes = [];
		snapshot.forEach(doc => {
			const { name, students_num, teachers_num, capacity } = doc.data();
			_classes.push({
				key: doc.id,
				name,
				students_num,
				teachers_num,
				capacity
			});
		});

		this.setState({
			classes: _classes
		});
	}

	getCounters = () => {
		firebase.firestore().collection("students").get().then(snapshot => {
			this.setState({
				students_num: snapshot.size
			});
		});

		firebase.firestore().collection("teachers").get().then(snapshot => {
			this.setState({
				teachers_num: snapshot.size
			});
		});

		firebase.firestore().collection("classes").get().then(snapshot => {
			this.setState({
				classes_num: snapshot.size
			});
		});
	}

	componentDidMount(){
		this.students_unsubscribe = firebase.firestore().collection("students").limit(10).onSnapshot(this.fetchStudents);
		this.teachers_unsubscribe = firebase.firestore().collection("teachers").limit(10).onSnapshot(this.fetchTeachers);
		this.classes_unsubscribe = firebase.firestore().collection("classes").limit(10).onSnapshot(this.fetchClasses);
		this.getCounters();
	}

	render() {
		let students_rows = "";
		let i = 1;
		if(this.state.students.length > 0){
			students_rows = this.state.students.map(student => 
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
			students_rows = <tr>
				  		<td colSpan="8" className="text-center">No students available</td>
				  	</tr>
		}

		let teachers_rows = "";
		let k = 1;
		if(this.state.teachers.length > 0){
			teachers_rows = this.state.teachers.map(teacher => 
					  <tr key={ teacher.key }>
					  	  <td>{ k++ }</td>
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
			teachers_rows = <tr>
				  		<td colSpan="8" className="text-center">No teachers available</td>
				  	</tr>
		}

		let classes_rows = "";
		let z = 1;
		if(this.state.classes.length > 0){
			classes_rows = this.state.classes.map(_class => 
							  	<tr key={_class.key}>
									<td>{ z++ }</td>
									<td><NavLink to={`/class/${_class.key}`}>{_class.name}</NavLink></td>
									<td>{ _class.students_num }</td>
									<td>{ _class.teachers_num }</td>
									<td>{ _class.capacity }</td>
									<td>{ _class.students_num == _class.capacity ? <label className="badge badge-warning">Full</label> :  <label className="badge badge-success">Available</label> }</td>
								</tr>
						  )
		}else{
			classes_rows = <tr>
							 <td colSpan="6" className="text-center">No classes available</td>
						   </tr>
		}

		return (
			<React.Fragment>
				<div className="row">
					<div className="col-lg-4 col-md-4">
						<div className="panel panel-default">
							<div className="panel-body text-center">
								<i className="fa fa-graduation-cap fa-2x"></i>
								<h3>{ this.state.students_num }</h3>
								<h4>Students</h4>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-md-4">
						<div className="panel panel-default">
							<div className="panel-body text-center">
								<i className="fa fa-users fa-2x"></i>
								<h3>{ this.state.teachers_num }</h3>
								<h4>Teachers</h4>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-md-4">
						<div className="panel panel-default">
							<div className="panel-body text-center">
								<i className="fa fa-building fa-2x"></i>
								<h3>{ this.state.classes_num }</h3>
								<h4>Classes</h4>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<h3>Latest Students</h3>
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
								  	{ students_rows }
								  </tbody>
								</table>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<h3>Latest Teachers</h3>
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
									 </tr>
								  </thead>
								  <tbody>
								  	{ teachers_rows }
								  </tbody>
								</table>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<h3>Latest Classes</h3>
						<div className="panel panel-default">
							<div className="panel-body">
								<table className="table table-striped">
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
								  	{ classes_rows }
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

export default Dashboard;