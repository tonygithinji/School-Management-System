import React, { Component } from 'react';
import { NavLink  } from 'react-router-dom';
import { MultiSelect } from 'react-selectize';

import firebase from '../Firebase';
import '../../node_modules/react-selectize/themes/index.css'

class EditTeacher extends Component {
    
    constructor(){
        super();

        this.state = {
            key:"",
            firstname: "",
            lastname: "",
            gender: "",
            phone_number: "",
            id_number: "",
            dateofbirth: "",
            address: "",
            residential_area: "",
            classes: [],
            teacher_classes: [],
            loading: false
        }
    }

    componentDidMount(){
        const ref = firebase.firestore().collection('teachers').doc(this.props.match.params.id);

        ref.get().then((doc) => {
            if (doc.exists) {
                const teacher = doc.data();
                
                this.setState({
                    key: doc.id,
                    firstname: teacher.firstname,
                    lastname: teacher.lastname,
                    gender: teacher.gender,
                    residential_area: teacher.residential_area,
                    id_number: teacher.id_number,
                    phone_number: teacher.phone_number,
                    dateofbirth: teacher.dateofbirth,
                    address: teacher.address
                });
            } else {
                console.log("No such document!");
            }

            let unsubscribe = ref.collection('classes').onSnapshot(snapshot => {
                const _teacher_classes = [];
                
                snapshot.forEach(doc => {
                    const { id, name } = doc.data();
                     _teacher_classes.push({
                        id: id,
                        name: name
                    });
                });

                this.setState({
                    teacher_classes: _teacher_classes
                });

                console.log("df", _teacher_classes);

                unsubscribe();
            });
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

        const { firstname, lastname, gender, dateofbirth, address, residential_area, id_number, phone_number, teacher_classes } = this.state;
        const updateRef = firebase.firestore().collection('teachers').doc(this.state.key);

        updateRef.update({
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            residential_area: residential_area,
            id_number: id_number,
            phone_number: phone_number,
            dateofbirth: dateofbirth,
            address: address
        }).then((docRef)=>{
            updateRef.collection('classes').get().then((snapshot) => {
                snapshot.forEach(doc => {
                    console.log(doc);
                    doc.ref.delete();
                });
            }).then(() => {
                teacher_classes.map(_class => {
                    updateRef.collection('classes').add({
                        name: _class.name,
                        id: _class.id
                    });
                });
            })

            this.setState({
                firstname: "",
                lastname: "",
                gender: "",
                residential_area: "",
                id_number: "",
                phone_number: "",
                dateofbirth: "",
                address: "",
                loading: false
            }, () => {
                this.props.history.push(`/teacher/${this.state.key}`);
            });
        }).catch((error) => {
            console.error("Error adding document: ", error);
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

    onValuesChange = (data) => {
        const _class = [];
        data.forEach((val) => {
            _class.push({
                id: val.value,
                name: val.label
            })
        });

        this.setState({
            teacher_classes: _class
        });
        console.log(_class)
    }

	render() {
        const { firstname, lastname, gender, residential_area, id_number, phone_number, dateofbirth, address, loading } = this.state;
        let button;

        if(loading === true){
            button = <button type="submit" className="btn btn-success" disabled="disabled"> <i className="fa fa-spinner fa-spin"></i> Updating</button>
        }else{
            button = <button type="submit" className="btn btn-success">Update Teacher</button>
        }

        const options = this.state.classes.map((_class) => {
            return { label: _class.name, value:  _class.key}
        });

        const tags = this.state.teacher_classes.map((_class) => {
            return { label: _class.name, value:  _class.id}
        });
        console.log("tags", tags);

		return (
			<React.Fragment>
				<div className="row">
					<div className="col-md-12">
                        <div className="clearfix">
                            <NavLink to="/teachers" className="btn btn-primary"><i className="fa fa-chevron-left"></i> All Teachers</NavLink>
                            <h3 className="text-center">Update Teacher</h3>
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
                                        <label>ID Number</label>
                                        <input type="text" className="form-control" name="id_number" value={id_number} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input type="text" className="form-control" name="phone_number" value={phone_number} onChange={this.onChange} />
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
                                        <label>Select a class</label>
                                        <MultiSelect 
                                            values = {tags} 
                                            options = {options} 
                                            placeholder = "Select a class" 
                                            onValuesChange = {this.onValuesChange}
                                            ></MultiSelect>
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

export default EditTeacher;