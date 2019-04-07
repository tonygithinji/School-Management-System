import React, { Component } from 'react';
import { NavLink  } from 'react-router-dom';
import { MultiSelect } from 'react-selectize';
import DatePicker from "react-datepicker";
import moment from 'moment';

import firebase from '../Firebase';
import '../../node_modules/react-selectize/themes/index.css';
import "react-datepicker/dist/react-datepicker.css";

class AddTeacher extends Component {

    constructor(){
        super();

        this.state = {
            firstname: "",
            lastname: "",
            gender: "male",
            phone_number: "",
            id_number: "",
            dateofbirth:  new Date(),
            address: "",
            residential_area: "",
            loading: false,
            link_class: true,
            teacher_class: [],
            classes: [],
            error: "",
            formatted_date: "",
        }

        this.ref = firebase.firestore().collection("teachers");
        this.unsubsribe = null;
        this.phone_number_re = new RegExp("^[0]{1}[7]{1}[0-9]{8}$");
        this.idnumber_re = new RegExp("^[0-9]{8}$");
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

        const { firstname, lastname, gender, formatted_date, address, residential_area, phone_number, id_number, link_class, teacher_class } = this.state;

        if(this.phone_number_re.test(phone_number)){
            // do nothing
        }else{
            this.setState({
                error: "phone_number",
                loading: false
            });

            return;
        }

        if(this.idnumber_re.test(id_number)){
            // do nothing
        }else{
            this.setState({
                error: "id_number",
                loading: false
            });

            return;
        }
        
        const teacher = {
            firstname,
            lastname,
            gender,
            dateofbirth: formatted_date,
            address,
            residential_area,
            phone_number,
            id_number
        }

        if(link_class){
            // Update the class collection
            // this.state.teacher_class.map((_class) => {
            //     let promises = [];

            //     promises.push(this.addTeacherWithClass(_class, teacher));

            //     Promise.all(promises).then(() => {
            //         this.setState({
            //             firstname: "",
            //             lastname: "",
            //             gender: "",
            //             phone_number: "",
            //             id_number: "",
            //             dateofbirth: "",
            //             address: "",
            //             residential_area: "",
            //             loading: false,
            //             link_class: false,
            //             teacher_class: "",
            //             classes: []
            //         }, () => {
            //             this.props.history.push("/teachers");
            //         });
            //     })
            // })
            this.addTeacherWithClass(teacher_class, teacher).then(() => {
                this.setState({
                    firstname: "",
                    lastname: "",
                    gender: "",
                    phone_number: "",
                    id_number: "",
                    formatted_date: "",
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
            this.addTeacherWithoutClass(teacher).then(() => {
                this.setState({
                    firstname: "",
                    lastname: "",
                    gender: "",
                    phone_number: "",
                    id_number: "",
                    formatted_date: "",
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

    addTeacherWithClass = (classes, teacher) => {
        return this.ref.add({
            firstname: teacher.firstname,
            lastname: teacher.lastname,
            gender: teacher.gender,
            dateofbirth: teacher.dateofbirth,
            address: teacher.address,
            residential_area: teacher.residential_area,
            phone_number: teacher.phone_number,
            id_number: teacher.id_number,
            // class: {
            //     id: doc.id,
            //     name: name
            // }
        }).then((teacherRef) => {
            classes.map(_class => {
                let classRef = firebase.firestore().collection("classes").doc(_class.id);

                teacherRef.collection('classes').add({
                    name: _class.name,
                    id: _class.id
                }).then(() => {
                    classRef.collection('teachers').add({
                        // id: teacher.id,
                        firstname: teacher.firstname,
                        lastname: teacher.lastname,
                        gender: teacher.gender,
                        dateofbirth: teacher.dateofbirth,
                        address: teacher.address,
                        residential_area: teacher.residential_area,
                        phone_number: teacher.phone_number,
                        id_number: teacher.id_number,
                    }).then(() => {
                        return classRef.update({
                            teachers_num: firebase.firestore.FieldValue.increment(1)
                        })
                    });
                });
            });
        });

        // return Promise.all(promises);
    }

    addTeacherWithoutClass = (teacher) => {
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

    onValuesChange = (data) => {
        const _class = [];
        data.forEach((val) => {
            _class.push({
                id: val.value,
                name: val.label
            })
        });

        this.setState({
            teacher_class: _class
        });
    }

    handleChange = (date) => {
        let d = moment(date);
        this.setState({
            formatted_date: d.format("DD/MM/YYYY"),
            dateofbirth: date
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
        let error_phonenumber = "form-control";
        let error_idnumber = "form-control";

        if(loading === true){
            button = <button type="submit" className="btn btn-success" disabled="disabled"> <i className="fa fa-spinner fa-spin"></i> Adding</button>
        }else{
            button = <button type="submit" className="btn btn-success">Add Teacher</button>
        }

        if(link_class === true){
            this.fetchClasses();

            const options = this.state.classes.map((_class) => {
                return { label: _class.name, value:  _class.key}
            });

            select_class = <div className="form-group">
                                <label>Select a class</label>
                                <MultiSelect options = {options} placeholder = "Select a class" onValuesChange = {this.onValuesChange}></MultiSelect>
                                {/*<MultiSelect options = {options} placeholder = "Select a class" onValuesChange = {value => console.log(value)}></MultiSelect>*/}
                            </div>
        }

        if(this.state.error == "phone_number"){
            error_phonenumber = "form-control error";
        }else if(this.state.error == "id_number"){
            error_idnumber = "form-control error";
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
                                        <DatePicker selected={this.state.dateofbirth} onChange={this.handleChange} className="form-control" placeholderText="Select a date" peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input type="text" className={ error_phonenumber } name="phone_number" value={phone_number} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>ID Number</label>
                                        <input type="text" className={ error_idnumber } name="id_number" value={id_number} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Address</label>
                                        <input type="text" className="form-control" name="address" value={address} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Residential Area</label>
                                        <input type="text" className="form-control" name="residential_area" value={residential_area} onChange={this.onChange} />
                                    </div>
                                    {/*<div className="form-group">
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" name="link_class" checked={link_class} onChange={this.onChange} /> Add to class
                                            </label>
                                        </div>
                                    </div>*/}
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