import React, { Component } from 'react';
import { NavLink  } from 'react-router-dom';

import firebase from '../Firebase';

class EditClass extends Component {
    
    constructor(){
        super();

        this.state = {
            key:"",
            name: "",
            capacity: "",
            loading: false
        }
    }

    componentDidMount(){
        const ref = firebase.firestore().collection('classes').doc(this.props.match.params.id);

        ref.get().then((doc) => {
            if (doc.exists) {
                const _class = doc.data();
                console.log(_class);
                this.setState({
                    key: doc.id,
                    name: _class.name,
                    capacity: _class.capacity
                });
            } else {
                console.log("No such document!");
            }
        });
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
        const updateRef = firebase.firestore().collection('classes').doc(this.state.key);

        updateRef.set({
            name: name,
            capacity: capacity
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
            button = <button type="submit" className="btn btn-success"> <i className="fa fa-spinner fa-spin"></i> Updating</button>
        }else{
            button = <button type="submit" className="btn btn-success">Update Class</button>
        }

		return (
			<React.Fragment>
				<div className="row">
					<div className="col-md-12">
                        <div className="clearfix">
                            <NavLink to="/classes" className="btn btn-primary"><i className="fa fa-chevron-left"></i> All Classes</NavLink>
                            <h3 className="text-center">Update Class</h3>
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

export default EditClass;