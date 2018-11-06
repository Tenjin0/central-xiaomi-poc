import * as React from 'react';
import { Flipped, Flipper } from 'react-flip-toolkit';
// import "../styles/main.scss"

export interface ICameraArchiveProps {
}

export interface ICameraArchiveState {
	fullScreen: boolean
}


export default class CameraArchive extends React.PureComponent<{}, ICameraArchiveState> {

	constructor(props: any) {

		super(props);
		this.state = {
			fullScreen: false
		}
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
