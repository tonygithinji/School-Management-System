import React, { Component } from 'react';
import { NavLink  } from 'react-router-dom';

import firebase from '../Firebase';

class StudentDetails extends Component {

    constructor(){
        super();

        this.state = {
            id: "",
            firstname: "",
            lastname: "",
            gender: "",
            residential_area: "",
            parent_name: "",
            parent_phone_number: "",
            dateofbirth: "",
            address: "",
            classname: ""
        };

        this.unsubscribe = null;
    }

    componentDidMount(){
        let ref = firebase.firestore().collection("students").doc(this.props.match.params.id);

        this.unsubscribe = ref.onSnapshot(snapshot => {
            const { firstname, lastname, gender, residential_area, parent_name, parent_phone_number, dateofbirth, address, classname } = snapshot.data();
            const id = snapshot.id;

            this.setState({
                id,
                firstname,
                lastname,
                gender,
                residential_area,
                parent_name,
                parent_phone_number,
                dateofbirth,
                address,
                classname: classname
            });
        });
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render(){
        let styles = {
            width: "50%",
            display: "inline-block"
        }

        return (
            <div className="row">
                <div className="col-md-12">
                    <NavLink to="/students" className="btn btn-default"><i className="fa fa-chevron-left"></i> All Students</NavLink>
                    <h3 className="text-center">Student Details</h3>
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <div className="row" style={{ padding:10 }}>
                                <div className="col-md-6">
                                    <div style={ styles }><b>First Name:</b></div>
                                    <div style={ styles }>{ this.state.firstname }</div>
                                </div>
                                <div className="col-md-6">
                                    <div style={ styles }><b>Last Name:</b></div>
                                    <div style={ styles }>{ this.state.lastname }</div>
                                </div>
                            </div>

                            <div className="row" style={{ padding:10 }}>
                                <div className="col-md-6">
                                    <div style={ styles }><b>Gender:</b></div>
                                    <div style={ styles }>{ this.state.gender }</div>
                                </div>
                                <div className="col-md-6">
                                    <div style={ styles }><b>Residential Area:</b></div>
                                    <div style={ styles }>{ this.state.residential_area }</div>
                                </div>
                            </div>

                            <div className="row" style={{ padding:10 }}>
                                <div className="col-md-6">
                                    <div style={ styles }><b>Date of Birth:</b></div>
                                    <div style={ styles }>{ this.state.dateofbirth }</div>
                                </div>
                                <div className="col-md-6">
                                    <div style={ styles }><b>Address:</b></div>
                                    <div style={ styles }>{ this.state.address }</div>
                                </div>
                            </div>

                            <div className="row" style={{ padding:10 }}>
                                <div className="col-md-6">
                                    <div style={ styles }><b>Parent's Name:</b></div>
                                    <div style={ styles }>{ this.state.parent_name }</div>
                                </div>
                                <div className="col-md-6">
                                    <div style={ styles }><b>Parent's Phone Number:</b></div>
                                    <div style={ styles }>{ this.state.parent_phone_number }</div>
                                </div>
                            </div>
                             <div className="row" style={{ padding:10 }}>
                                <div className="col-md-6">
                                    <div style={ styles }><b>Class:</b></div>
                                    <div style={ styles }><span className="badge badge-info">{ this.state.classname.name }</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <NavLink to={`/student/edit/${this.state.id}`} className="btn btn-primary"><i className="fa fa-edit"></i> Edit</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentDetails;