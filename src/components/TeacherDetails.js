import React, { Component } from 'react';
import { NavLink  } from 'react-router-dom';

import firebase from '../Firebase';

class TeacherDetails extends Component {

    constructor(){
        super();

        this.state = {
            id: "",
            firstname: "",
            lastname: "",
            gender: "",
            phone_number: "",
            id_number: "",
            dateofbirth: "",
            address: "",
            residential_area: ""
        };

        this.unsubscribe = null;
    }

    componentDidMount(){
        let ref = firebase.firestore().collection("teachers").doc(this.props.match.params.id);

        this.unsubscribe = ref.onSnapshot(snapshot => {
            const { firstname, lastname, gender, dateofbirth, address, residential_area, phone_number, id_number } = snapshot.data();
            const id = snapshot.id;

            this.setState({
                id,
                firstname,
                lastname,
                gender,
                residential_area,
                dateofbirth,
                address,
                phone_number,
                id_number
            })
        })
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
                    <NavLink to="/teachers" className="btn btn-default"><i className="fa fa-chevron-left"></i> All Teachers</NavLink>
                    <h3 className="text-center">Teacher Details</h3>
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
                                    <div style={ styles }><b>Phone Number:</b></div>
                                    <div style={ styles }>{ this.state.phone_number }</div>
                                </div>
                                <div className="col-md-6">
                                    <div style={ styles }><b>ID Number:</b></div>
                                    <div style={ styles }>{ this.state.id_number }</div>
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
                        </div>
                    </div>
                    <div className="text-right">
                        <NavLink to={`/teacher/edit/${this.state.id}`} className="btn btn-primary"><i className="fa fa-edit"></i> Edit</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

export default TeacherDetails;