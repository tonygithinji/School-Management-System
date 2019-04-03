import React, { Component } from 'react';
import { NavLink  } from 'react-router-dom';

import firebase from '../Firebase';

class AddStudent extends Component {

    constructor(){
        super();

        this.state = {
            firstname : "",
            lastname : "",
            gender : "",
            dateofbirth : "",
            address : "",
            residential_area : "",
            parent_name : "",
            parent_phone_number : "",
            loading : false
        }
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    render(){
        const { firstname, lastname, gender, dateofbirth, address, residential_area, parent_name, parent_phone_number, loading } = this.state;
        let button;

        if(loading === true){
            button = <button type="submit" className="btn btn-success"> <i className="fa fa-spinner fa-spin"></i> Adding</button>
        }else{
            button = <button type="submit" className="btn btn-success">Add Class</button>
        }

        return (
            <React.Fragment>
				<div className="row">
					<div className="col-md-12">
                        <NavLink to="/students" className="btn btn-default"><i className="fa fa-chevron-left"></i> All Students</NavLink>
                        <h3 className="text-center">Add Student</h3>
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