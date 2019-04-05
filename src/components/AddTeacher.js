import React, { Component } from 'react';
import { NavLink  } from 'react-router-dom';

import firebase from '../Firebase';

class AddTeacher extends Component {

    constructor(){
        super();

        this.state = {
            firstname: "",
            lastname: "",
            gender: "male",
            phone_number: "",
            id_number: "",
            dateofbirth: "",
            address: "",
            residential_area: "",
            loading: false,
            link_class: false,
            teacher_class: "",
            classes: []
        }

        this.ref = firebase.firestore().collection("teachers");
        this.unsubsribe = null;
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

        const { firstname, lastname, gender, dateofbirth, address, residential_area, phone_number, id_number, link_class, teacher_class } = this.state;

        const teacher = {
            firstname,
            lastname,
            gender,
            dateofbirth,
            address,
            residential_area,
            phone_number,
            id_number
        }

        if(link_class){
            // Update the class collection
            this.addStudentWithClass(teacher_class, teacher).then(() => {
                this.setState({
                    firstname: "",
                    lastname: "",
                    gender: "",
                    phone_number: "",
                    id_number: "",
                    dateofbirth: "",
                    address: "",
                    residential_area: "",
                    loading: false,
                    link_class: false,
                    teacher_class: "",
                    classes: []
                }, () => {
                    this.props.history.push("/teachers");
                });
            })
        }else{
            this.addStudentWithoutClass(teacher).then(() => {
                this.setState({
                    firstname: "",
                    lastname: "",
                    gender: "",
                    phone_number: "",
                    id_number: "",
                    dateofbirth: "",
                    address: "",
                    residential_area: "",
                    link_class: false,
                    loading: false,
                    classes: []
                }, () => {
                    this.props.history.push("/teachers");
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

    addStudentWithClass = (class_id, teacher) => {
        let classRef = firebase.firestore().collection('classes').doc(class_id);

        return classRef.get().then(doc => {
            const { name } = doc.data();

            this.ref.add({
                firstname: teacher.firstname,
                lastname: teacher.lastname,
                gender: teacher.gender,
                dateofbirth: teacher.dateofbirth,
                address: teacher.address,
                residential_area: teacher.residential_area,
                phone_number: teacher.phone_number,
                id_number: teacher.id_number,
                class: {
                    id: doc.id,
                    name: name
                }
            }).then(() => {

                return classRef.collection('teachers').add({
                    // id: teacher.id,
                    firstname: teacher.firstname,
                    lastname: teacher.lastname,
                    gender: teacher.gender,
                    dateofbirth: teacher.dateofbirth,
                    address: teacher.address,
                    residential_area: teacher.residential_area,
                    phone_number: teacher.phone_number,
                    id_number: teacher.id_number,
                });
            })
        })
    }

    addStudentWithoutClass = (teacher) => {
        return this.ref.add({
            firstname: teacher.firstname,
            lastname: teacher.lastname,
            gender: teacher.gender,
            dateofbirth: teacher.dateofbirth,
            address: teacher.address,
            residential_area: teacher.residential_area,
            phone_number: teacher.phone_number,
            id_number: teacher.id_number,
        });
    }

    componentWillUnmount(){
        if(this.unsubsribe){
            this.unsubsribe();
        }
    }

    render(){
        const { firstname, lastname, gender, dateofbirth, address, residential_area, phone_number, id_number, link_class, teacher_class, loading } = this.state;
        let button;
        let select_class;

        if(loading === true){
            button = <button type="submit" className="btn btn-success" disabled="disabled"> <i className="fa fa-spinner fa-spin"></i> Adding</button>
        }else{
            button = <button type="submit" className="btn btn-success">Add Teacher</button>
        }

        if(link_class === true){
            this.fetchClasses();

            select_class = <div className="form-group">
                                <label>Select a class</label>
                                <select className="form-control" name="teacher_class" value={teacher_class} onChange={this.onChange}>
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
                        <NavLink to="/teachers" className="btn btn-default"><i className="fa fa-chevron-left"></i> All Teachers</NavLink>
                        <h3 className="text-center">Add a Teacher</h3>
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
                                        <label>Phone Number</label>
                                        <input type="text" className="form-control" name="phone_number" value={phone_number} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>ID Number</label>
                                        <input type="text" className="form-control" name="id_number" value={id_number} onChange={this.onChange} />
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

export default AddTeacher;