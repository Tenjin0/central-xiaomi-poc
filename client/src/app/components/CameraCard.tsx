import { createStyles, Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { API_STATIC_URL } from '../../config';
import { ICamera } from '../constants/interface';

export interface ICameraCardProps {
	cameraArchive: ICamera
}

export const styles = (theme: Theme) =>
	createStyles({
		bullet: {
			display: 'inline-block',
			margin: '0 2px',
			transform: 'scale(0.8)',
		},
		card: {
			margin: '0px 10px 20px',
			maxWidth: 300,
		},
		media: {
			height: 0,
			paddingTop: '56.25%', // 16:9
		},
	})

class CameraCard extends React.Component<ICameraCardProps & WithStyles<typeof styles>, any> {

	public render() {

		const classes = this.props.classes;
		const cameraArchive = this.props.cameraArchive;
		console.log(cameraArchive)
		return (
			<Card className={classes.card}>
				<CardHeader
					title="Shrimp and Chorizo Paella"
					subheader="September 14, 2016"
				/>
				<CardMedia
					className={classes.media}
					image={API_STATIC_URL + "/" + cameraArchive.path + "/1.png"}
					title="Paella dish"
				/>
			</Card>
		);
	}
}


export default withStyles(styles)(CameraCard);
