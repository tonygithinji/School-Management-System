import React, { Component } from 'react';
import '../app.css';

class Dashboard extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="row">
					<div className="col-lg-4 col-md-4">
						<div className="panel panel-default">
							<div className="panel-body text-center">
								<i className="fa fa-graduation-cap fa-2x"></i>
								<h3>5422</h3>
								<h4>Students</h4>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-md-4">
						<div className="panel panel-default">
							<div className="panel-body text-center">
								<i className="fa fa-users fa-2x"></i>
								<h3>202</h3>
								<h4>Teachers</h4>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-md-4">
						<div className="panel panel-default">
							<div className="panel-body text-center">
								<i className="fa fa-building fa-2x"></i>
								<h3>114</h3>
								<h4>Classes</h4>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<h3>Latest Students</h3>
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
									 </tr>
								  </thead>
								  <tbody>
								  	<tr>
								  		<td colspan="7" className="text-center">No data available</td>
								  	</tr>
								  </tbody>
								</table>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<h3>Latest Teachers</h3>
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
									 </tr>
								  </thead>
								  <tbody>
								  	<tr>
								  		<td colspan="7" className="text-center">No data available</td>
								  	</tr>
								  </tbody>
								</table>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<h3>Latest Classes</h3>
						<div className="panel panel-default">
							<div className="panel-body">
								<table className="table table-striped">
								  <thead>
								  	<tr>
									  	<th>#</th>
									  	<th>Name</th>
									  	<th>Students</th>
									  	<th>Teachers</th>
									  	<th>Capacity</th>
									  	<th>Status</th>
									 </tr>
								  </thead>
								  <tbody>
								  	<tr>
								  		<td colspan="6" className="text-center">No data available</td>
								  	</tr>
								  </tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Dashboard;