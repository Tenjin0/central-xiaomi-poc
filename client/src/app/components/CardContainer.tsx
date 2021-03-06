import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import { ICameraArchive } from '../constants/interface';

export interface ICardContainerProps {
	cameraArchive: ICameraArchive
}

export const styles = (theme: Theme) => createStyles({
	'card-container' : {
		position:'relative',
		transition: 'all 1s ease-out',
	},
	'full-screen-container': {
		top: "0",
		// tslint:disable-next-line:object-literal-sort-keys
		left: "0",
		width: "100%",
		height: "100%",
		backgroundColor: '#7971ea',
		position: "fixed",

	},
	'invisible-container': {
		cursor: "pointer",
		width: "50%",
		// tslint:disable-next-line:object-literal-sort-keys
		height: "100%",
	},
})

class CardContainer extends React.Component<ICardContainerProps & WithStyles<typeof styles>, any> {
	public constructor(props: ICardContainerProps & WithStyles<typeof styles>) {
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

		const classes = this.props.classes

		return (
			<div
				className={ `${classes["card-container"]} ${ this.state.fullScreen ? classes["full-screen-container"]:  classes["invisible-container"]}`}
				onClick={this.toggleFullScreen}
			/>
			// <div className={this.props.classes["invisible-container"]}/>

		);
	}
}

export default withStyles(styles)(CardContainer)
