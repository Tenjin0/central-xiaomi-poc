import * as React from 'react';

export interface IHomeProps {
	history: any
}



export default class Home extends React.Component<IHomeProps, any> {


	public handleChangePage = () => {
		this.props.history.push("/hello")
	}

	public render() {
		return (
			<div>
				<h1>Home</h1>
				<p>Welcome home!</p>
				<button onClick={this.handleChangePage}>Go to about page via redux</button>
			</div>
		);
	}
}


