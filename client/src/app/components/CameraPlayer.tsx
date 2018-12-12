import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';

export interface ICameraPlayerProps {
	width: number,
	height: number
	position?: string
}


export const styles = (theme: Theme) => createStyles({
	"camera-container-center": {
		display: 'flex',
		justifyContent: "center",
	},
	"camera-container-fixed": {
		position: 'fixed',
		right: '12px',
		// tslint:disable-next-line:object-literal-sort-keys
		bottom: '-1%',
		overflow: "hidden",
		boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 3px 6px 0 rgba(0,0,0,0.20)',
		zIndex: 120
	}
})

class CameraPlayer extends React.Component<ICameraPlayerProps & WithStyles<typeof styles>, any> {
	public render() {
		return (
			<div className={this.props.classes["camera-container-" + this.props.position]}>
				<img width={this.props.width} height={this.props.height} src="http://localhost:3001/static/camera/1540568846816/0.png" alt="" />
			</div>
		);
	}
}

export default withStyles(styles)(CameraPlayer);
