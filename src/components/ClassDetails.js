import React, { Component } from 'react';
import { NavLink  } from 'react-router-dom';

import firebase from '../Firebase';

class ClassDetails extends Component {

    constructor(){
        super();

        this.state = {
            id: "",
            name: "",
            capacity: "",
            teachers_num: 0,
            students_num: 0,
            students: [],
            teachers: []
        };

        this.unsubscribe = null;
    }

    componentDidMount(){
        let ref = firebase.firestore().collection("classes").doc(this.props.match.params.id);
        let studentsRef = firebase.firestore().collection("classes").doc(this.props.match.params.id).collection("students");
        let teachersRef = firebase.firestore().collection("classes").doc(this.props.match.params.id).collection("teachers");

        this.unsubscribe = ref.onSnapshot(snapshot => {
            const { name, capacity, students_num, teachers_num } = snapshot.data();
            const id = snapshot.id;

            this.setState({
                id,
                name,
                capacity,
                students_num,
                teachers_num
            });
        });

        studentsRef.onSnapshot(snapshot => {
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
        });

        teachersRef.onSnapshot(snapshot => {
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
        let i = 1;
        let k = 1;

        return (
            <div className="row">
                <div className="col-md-12">
                    <NavLink to="/classes" className="btn btn-default"><i className="fa fa-chevron-left"></i> All Classes</NavLink>
                    <h3 className="text-center">Class Details</h3>
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <div className="row" style={{ padding:10 }}>
                                <div className="col-md-6">
                                    <div style={ styles }><b>Name:</b></div>
                                    <div style={ styles }>{ this.state.name }</div>
                                </div>
                                <div className="col-md-6">
                                    <div style={ styles }><b>Capacity:</b></div>
                                    <div style={ styles }>{ this.state.capacity }</div>
                                </div>
                            </div>

                            <div className="row" style={{ padding:10 }}>
                                <div className="col-md-6">
                                    <div style={ styles }><b>Students:</b></div>
                                    <div style={ styles }>{ this.state.students_num }</div>
                                </div>
                                <div className="col-md-6">
                                    <div style={ styles }><b>Teachers:</b></div>
                                    <div style={ styles }>{ this.state.teachers_num }</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <NavLink to={`/class/edit/${this.state.id}`} className="btn btn-primary"><i className="fa fa-edit"></i> Edit</NavLink>
                    </div>

                    <h3 className="text-center">Students</h3>
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
                                  { this.state.students.map(student => 
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
                                  )}
                                {/* <tr>
                                    <td colSpan="7" className="text-center">No data available</td>
                                </tr> */}
                              </tbody>
                            </table>
                        </div>
                    </div>

                    <h3 className="text-center">Teachers</h3>
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
                                  {this.state.teachers.map(teacher => 
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
                                    )}
                                {/* <tr>
                                    <td colSpan="7" className="text-center">No data available</td>
                                </tr> */}
                              </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ClassDetails;