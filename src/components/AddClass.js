import React, { Component } from 'react';
import { NavLink  } from 'react-router-dom';

import firebase from '../Firebase';

class Classes extends Component {
    
    constructor(){
        super();

        this.ref = firebase.firestore().collection('classes');

        this.state = {
            name: "",
            capacity: "",
            loading: false
        }
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

        const { name, capacity } = this.state;

        this.ref.add({
            name,
            capacity: parseInt(capacity),
            students_num: 0,
            teachers_num: 0
        }).then((docRef)=>{
            this.setState({
                name: "",
                capacity: "",
                loading: false
            }, () => {
                this.props.history.push("/classes");
            });
        }).catch((error) => {
            console.error("Error adding document: ", error);
        });
    };

	render() {
        const { name, capacity, loading } = this.state;
        let button;

        if(loading === true){
            button = <button type="submit" className="btn btn-success"  disabled="disabled"> <i className="fa fa-spinner fa-spin"></i> Adding</button>
        }else{
            button = <button type="submit" className="btn btn-success">Add Class</button>
        }

		return (
			<React.Fragment>
				<div className="row">
					<div className="col-md-12">
                        <div className="clearfix">
                            <NavLink to="/classes" className="btn btn-default"><i className="fa fa-chevron-left"></i> All Classes</NavLink>
                            <h3 className="text-center">Add a New Class</h3>
                        </div>
						<div className="panel panel-default">
                            <div className="panel-body">
                                <form className="form" onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" className="form-control" name="name" value={name} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Capacity</label>
                                        <input type="text" className="form-control" name="capacity" value={capacity} onChange={this.onChange} />
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

export default Classes;