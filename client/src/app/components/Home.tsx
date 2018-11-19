import * as React from 'react';
import { Flipped, Flipper } from 'react-flip-toolkit';
import { ICamera } from '../constants/interface';
import CameraArchiveSlider from './CameraArchiveSlider';

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

		const cameraArchive: ICamera = {
			id: 24,
			path: "camera/1540564406059",
			// tslint:disable-next-line:object-literal-sort-keys
			"created_at": "2018-11-02T17:05:43.156Z"
		}
		return (
			<CameraArchiveSlider cameraArchive={cameraArchive} />
		);
	}
}


