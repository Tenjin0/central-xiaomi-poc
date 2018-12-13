import * as React from 'react';
import CameraStream from './CameraStream';

export interface IHomeProps {
	history: any
	fullScreen: boolean
}

export interface IHomeState {
	width: number,
	height: number
}

export default class Home extends React.PureComponent<IHomeProps, IHomeState> {

	public constructor(props: IHomeProps) {
		super(props);
		this.state = {
			width: 500,
			// tslint:disable-next-line:object-literal-sort-keys
			height: 400,
			// image: false
		}
	}

	public render() {

		return (
			<React.Fragment>
				<CameraStream position={"center"} width={this.state.width} height={this.state.height}/>
			</React.Fragment>
		);
	}
}


