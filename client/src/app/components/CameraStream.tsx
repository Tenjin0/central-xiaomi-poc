import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';

export interface ICameraStreamProps {
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
	},
	"camera-stream-top": {
		position: 'relative',
	},
	// tslint:disable-next-line:object-literal-sort-keys
	"camera-stream-status": {
		background: "linear-gradient(195deg,rgba(0,0,0,.8) 0,rgba(0,0,0,.35) 30%,transparent)",
		display: 'flex',
		position: 'absolute',
		right: "7px",
	},
	"camera-stream-status-light": {
		'backgroundColor': "red",
		"width": "10px",
		// tslint:disable-next-line:object-literal-sort-keys
		"height": "10px",
		"borderRadius": "10px",
		"marginRight": "5px",
		"marginTop": "7px"
	},
	// tslint:disable-next-line:object-literal-sort-keys
	"camera-stream-status-label": {
		marginRight: "5px"
	}
})

class CameraStream extends React.Component<ICameraStreamProps & WithStyles<typeof styles>, any> {
	public render() {
		return (
			<div className={this.props.classes["camera-container-" + this.props.position]}>
				<div className={this.props.classes["camera-stream-top"]}>
					<div className={this.props.classes["camera-stream-status"]}>
						<div className={this.props.classes["camera-stream-status-light"]} />
						<span className={this.props.classes["camera-stream-status-label"]} >OFFLINE</span>
					</div>
					<img width={this.props.width} height={this.props.height} src="http://localhost:3001/static/camera/1540568846816/0.png" alt="" />
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(CameraStream);
