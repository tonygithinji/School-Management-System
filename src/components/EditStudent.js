import React, { Component } from 'react';
import { NavLink  } from 'react-router-dom';

import firebase from '../Firebase';

class EditStudent extends Component {
    
    constructor(){
        super();

        this.state = {
            key:"",
            firstname: "",
            lastname: "",
            gender: "",
            residential_area: "",
            parent_name: "",
            parent_phone_number: "",
            dateofbirth: "",
            address: "",
            loading: false,
            classes: [],
            student_class: ""
        }
    }

    componentDidMount(){
        const ref = firebase.firestore().collection('students').doc(this.props.match.params.id);

        ref.get().then((doc) => {
            if (doc.exists) {
                const student = doc.data();
                
                this.setState({
                    key: doc.id,
                    firstname: student.firstname,
                    lastname: student.lastname,
                    gender: student.gender,
                    residential_area: student.residential_area,
                    parent_name: student.parent_name,
                    parent_phone_number: student.parent_phone_number,
                    dateofbirth: student.dateofbirth,
                    address: student.address,
                    student_class: student.classname.id
                });
            } else {
                console.log("No such document!");
            }
        });

        this.fetchClasses();
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        });

        const { firstname, lastname, gender, dateofbirth, address, residential_area, parent_name, parent_phone_number, student_class } = this.state;
        const updateRef = firebase.firestore().collection('students').doc(this.state.key);
        const classRef = firebase.firestore().collection('classes').doc(student_class);

        classRef.get().then(doc => {
            const { name } = doc.data();

            updateRef.update({
                firstname: firstname,
                lastname: lastname,
                gender: gender,
                residential_area: residential_area,
                parent_name: parent_name,
                parent_phone_number: parent_phone_number,
                dateofbirth: dateofbirth,
                address: address,
                classname: {
                    id: doc.id,
                    name: name
                }
            }).then((docRef)=>{
                this.setState({
                    firstname: "",
                    lastname: "",
                    gender: "",
                    residential_area: "",
                    parent_name: "",
                    parent_phone_number: "",
                    dateofbirth: "",
                    address: "",
                    student_class: "",
                    loading: false
                }, () => {
                    this.props.history.push(`/student/${this.state.key}`);
                });
            }).catch((error) => {
                console.error("Error adding document: ", error);
            });
        });
    };

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

	render() {
        const { firstname, lastname, gender, residential_area, parent_name, parent_phone_number, dateofbirth, address, loading, student_class } = this.state;
        let button;

        if(loading === true){
            button = <button type="submit" className="btn btn-success" disabled="disabled"> <i className="fa fa-spinner fa-spin"></i> Updating</button>
        }else{
            button = <button type="submit" className="btn btn-success">Update Student</button>
        }

		return (
			<React.Fragment>
				<div className="row">
					<div className="col-md-12">
                        <div className="clearfix">
                            <NavLink to="/students" className="btn btn-primary"><i className="fa fa-chevron-left"></i> All Students</NavLink>
                            <h3 className="text-center">Update Student</h3>
                        </div>
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
                                        <label>Select a class</label>
                                        <select className="form-control" name="student_class" value={student_class} onChange={this.onChange}>
                                            { this.state.classes.map(_class => 
                                                <option key={ _class.key } value={ _class.key }>{ _class.name }</option>
                                            ) }
                                        </select>
                                    </div>
                                    
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

export default EditStudent;