import React, { Component } from 'react';

class Classes extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="row">
					<div className="col-md-12">
						<div className="text-right mb-10">
							<button className="btn btn-primary"><i className="fa fa-plus"></i> Add New Class</button>
						</div>
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

export default Classes;