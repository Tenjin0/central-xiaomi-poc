import * as React from 'react';
import { Flipped, Flipper } from 'react-flip-toolkit';

export interface IHomeProps {
	history: any
	fullScreen: boolean
}



export default class Home extends React.PureComponent<IHomeProps, any> {

	public constructor(props: IHomeProps) {
		super(props);
		this.state = {
			fullScreen: false
		}
	}
	public handleChangePage = () => {

		this.props.history.push("/hello")
	}


	public toggleFullScreen = () => {
		this.state = {
			fullScreen: !this.state.fullScreen
		}
		this.setState(this.state);
	};

	public render() {
		return (
			<Flipper flipKey={this.state.fullScreen}>
				<Flipped flipId="square">
					<div
						className={this.state.fullScreen ? "full-screen-square" : "square"}
						onClick={this.toggleFullScreen}
					/>
				</Flipped>
			</Flipper>
		);
	}
}


