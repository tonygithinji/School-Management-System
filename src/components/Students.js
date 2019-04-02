import React, { Component } from 'react';

class Students extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="row">
					<div className="col-md-12">
						<div className="text-right mb-10">
							<button className="btn btn-primary"><i className="fa fa-plus"></i> Add New Student</button>
						</div>
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
			</React.Fragment>
		);
	}
}

export default Students;