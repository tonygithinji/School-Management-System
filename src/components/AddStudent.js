import React, { Component } from 'react';
import { NavLink  } from 'react-router-dom';

import firebase from '../Firebase';

class AddStudent extends Component {

    constructor(){
        super();

        this.ref = firebase.firestore().collection('students');
        this.unsubsribe = null;

        this.state = {
            firstname : "",
            lastname : "",
            gender : "male",
            dateofbirth : "",
            address : "",
            residential_area : "",
            parent_name : "",
            parent_phone_number : "",
            link_class: false,
            loading : false,
            student_class: "",
            classes: []
        }
    }

    onChange = (e) => {
        const state = this.state;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        state[e.target.name] = value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        });

        const { firstname, lastname, gender, dateofbirth, address, residential_area, parent_name, parent_phone_number, link_class, student_class } = this.state;

        const student = {
            firstname,
            lastname,
            gender,
            dateofbirth,
            address,
            residential_area,
            parent_name,
            parent_phone_number
        }

        if(link_class){
            // Update the class collection
            this.addStudentWithClass(student_class, student).then(() => {
                this.setState({
                    firstname: "",
                    lastname: "",
                    gender: "",
                    dateofbirth: "",
                    address: "",
                    residential_area: "",
                    parent_name: "",
                    parent_phone_number: "",
                    link_class: false,
                    loading: false,
                    classes: []
                }, () => {
                    this.props.history.push("/students");
                });
            })
        }else{
            this.addStudentWithoutClass(student).then(() => {
                this.setState({
                    firstname: "",
                    lastname: "",
                    gender: "",
                    dateofbirth: "",
                    address: "",
                    residential_area: "",
                    parent_name: "",
                    parent_phone_number: "",
                    link_class: false,
                    loading: false,
                    classes: []
                }, () => {
                    this.props.history.push("/students");
                });
            })
        }
    }

    fetchClasses = () => {
        let ref = firebase.firestore().collection('classes');
        let classes = [];

        this.unsubsribe = ref.onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                const { name } = doc.data();

                classes.push({
                    key: doc.id,
                    name: name
                })
            });

            this.setState({
                classes: classes
            });

            this.unsubsribe();
        });
    }

    addStudentWithClass = (class_id, student) => {
        let classRef = firebase.firestore().collection('classes').doc(class_id);
        let _class = {};

        return classRef.get().then(doc => {
            const { name } = doc.data();

            this.ref.add({
                firstname: student.firstname,
                lastname: student.lastname,
                gender: student.gender,
                dateofbirth: student.dateofbirth,
                address: student.address,
                residential_area: student.residential_area,
                parent_name: student.parent_name,
                parent_phone_number: student.parent_phone_number,
                class: {
                    id: doc.id,
                    name: name
                }
            }).then(() => {

                return classRef.collection('students').add({
                    // id: student.id,
                    firstname: student.firstname,
                    lastname: student.lastname,
                    gender: student.gender,
                    dateofbirth: student.dateofbirth,
                    address: student.address,
                    residential_area: student.residential_area,
                    parent_name: student.parent_name,
                    parent_phone_number: student.parent_phone_number
                });
            })
        })
    }

    addStudentWithoutClass = (student) => {
        return this.ref.add({
            firstname: student.firstname,
            lastname: student.lastname,
            gender: student.gender,
            dateofbirth: student.dateofbirth,
            address: student.address,
            residential_area: student.residential_area,
            parent_name: student.parent_name,
            parent_phone_number: student.parent_phone_number
        });
    }

    componentWillUnmount(){
        if(this.unsubsribe){
            this.unsubsribe();
        }
    }

    render(){
        const { firstname, lastname, gender, dateofbirth, address, residential_area, parent_name, parent_phone_number, link_class, student_class, loading } = this.state;
        let button;
        let select_class;

        if(loading === true){
            button = <button type="submit" className="btn btn-success" disabled="disabled"> <i className="fa fa-spinner fa-spin"></i> Adding</button>
        }else{
            button = <button type="submit" className="btn btn-success">Add Student</button>
        }

        if(link_class === true){
            this.fetchClasses();

            select_class = <div className="form-group">
                                <label>Select a class</label>
                                <select className="form-control" name="student_class" value={student_class} onChange={this.onChange}>
                                    { this.state.classes.map(_class => 
                                        <option key={ _class.key } value={ _class.key }>{ _class.name }</option>
                                    ) }
                                </select>
                            </div>
        }

        return (
            <React.Fragment>
				<div className="row">
					<div className="col-md-12">
                        <NavLink to="/students" className="btn btn-default"><i className="fa fa-chevron-left"></i> All Students</NavLink>
                        <h3 className="text-center">Add a Student</h3>
						<div className="panel panel-default">
                            <div className="panel-body">
                                <form className="form" onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input type="text" className="form-control" name="firstname" value={firstname} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input type="text" className="form-control" name="lastname" value={lastname} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <select className="form-control" name="gender" value={gender} onChange={this.onChange}>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Date of Birth</label>
                                        <input type="text" className="form-control" name="dateofbirth" value={dateofbirth} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Address</label>
                                        <input type="text" className="form-control" name="address" value={address} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Residential Area</label>
                                        <input type="text" className="form-control" name="residential_area" value={residential_area} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Parent's Name</label>
                                        <input type="text" className="form-control" name="parent_name" value={parent_name} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Parent's Phone Number</label>
                                        <input type="text" className="form-control" name="parent_phone_number" value={parent_phone_number} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" name="link_class" checked={link_class} onChange={this.onChange} /> Add to class
                                            </label>
                                        </div>
                                    </div>
                                    { select_class }
                                    <div className="text-right">
                                        { button }
                                    </div> 
                                </form>
                            </div>
                        </div>
					</div>
				</div>
			</React.Fragment>
        );
    }
}

export default AddStudent;