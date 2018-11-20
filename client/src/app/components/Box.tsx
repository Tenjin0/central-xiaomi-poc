import { tween } from 'popmotion';
import * as React from 'react';
import posed from 'react-pose'

export interface IBoxProps {
}

export interface IBoxState {
	position: string
}

class Box extends React.Component<IBoxProps, IBoxState> {
	constructor(props: IBoxProps) {

		super(props)
		this.state = { position: 'left' }

	}

	public componentDidMount() {
		// setInterval(() => {
		// 	this.setState({
		// 		position: this.state.position === 'left' ? 'center' : 'left'
		// 	});
		// }, 2000);
	}

	public handleMouseEnter = () => this.setState({
		position: this.state.position === 'left' ? 'center' : 'left'
	})

	public render() {

		const PosedComponent = posed.div({
			center: {
				flip: Infinity,
				transition: { duration: 300 },
				x: 'calc(50vw - 50%)',
			},
			left: {
				transition: { duration: 300 },
				x: 0,
			},
		});
		return <PosedComponent className="box" pose={this.state.position} onMouseEnter={this.handleMouseEnter}/>;
	}
}

export default Box;
