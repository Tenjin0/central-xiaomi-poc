import { createStyles, Theme } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as moment from "moment";
import * as React from 'react';
import { API_STATIC_URL } from '../../config';
import { ICamera } from '../constants/interface';
import ButtonToModal from './ButtonToModal';
import CameraArchiveSlider from './CameraArchiveSlider';
export interface ICameraCardProps {
	cameraArchive: ICamera
}

export interface ICameraCardState {
	open: boolean
}


export const styles = (theme: Theme) =>
	createStyles({
		action: {
			margin: "-3px 15px auto"
		},
		avatar: {
			backgroundColor: "red",
		},
		card: {
			margin: '0px 10px 20px',
			width: '100%;'
		},
		expandOpen: {
			transform: 'rotate(180deg)',
		},
		media: {
			height: 0,
			paddingTop: '56.25%',
		},
		title: {
			fontSize: '1rem'
		},
	})

class CameraCard extends React.Component<ICameraCardProps & WithStyles<typeof styles>, ICameraCardState> {

	public constructor(props: ICameraCardProps & WithStyles<typeof styles>) {
		super(props);
		this.state = {
			open: false
		}
	}

	public openModal = (e: React.MouseEvent<HTMLElement>) => {
		this.setState({
			open: !this.state.open
		})
	}
	public render() {

		const classes = this.props.classes;
		const cameraArchive = this.props.cameraArchive;
		const dateToDisplay = moment(cameraArchive.created_at).format('MMMM Do YYYY, HH:mm:ss');
		const ButtonToModalWrapper = () => (
			<ButtonToModal >
				<CameraArchiveSlider cameraArchive={cameraArchive} />
			</ButtonToModal>
		  )
		return (
			<Card className={classes.card}>
				<CardHeader
					action={
						<ButtonToModalWrapper />
					}
					classes={{
						action: classes.action,
						title : classes.title,
					}}
					title={dateToDisplay}
				/>
				<CardMedia
					className={classes.media}
					image={API_STATIC_URL + "/" + cameraArchive.path + "/1.png"}
					title="Paella dish"
					onClick={this.openModal}
				/>
			</Card>
		);
	}
}


export default withStyles(styles)(CameraCard);
