import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import { Flipped, Flipper } from 'react-flip-toolkit';
import posed from "react-pose";
import { ICamera } from '../constants/interface';

// export interface IButtonToModalProps {
// 	// content: React.Component
// }

export interface IButtonToModalState {
	open: boolean
}

export const styles = (theme: Theme) => createStyles({
	'add-icon-to-close': {
		transform: 'rotate(45deg) scale(1.2)',

	},
	icon: {
		fontSize: "20px",
		transition: '1s all',
	},
	modal: {
		position: 'absolute',
		width: '25px',
		// tslint:disable-next-line:object-literal-sort-keys
		height: '25px',
		backgroundColor: 'rgba(0, 0, 0, 0.5) transparent'
	},
	'modal-button': {
		position: 'absolute',
		width: '25px',
		// tslint:disable-next-line:object-literal-sort-keys
		height: '25px',
		minHeight: '25px',
		marginRight: '5px'
	},
	'modal-button-open': {
		width: '56px !important',
		// tslint:disable-next-line:object-literal-sort-keys
		height: '56px !important',
		top: '0%',
		right: '0%',
		position: 'fixed'
	},
	'show-modal': {
		position: 'fixed',
		top: '0%',
		// tslint:disable-next-line:object-literal-sort-keys
		left: '0%',
		width: '100%',
		height: '100%',
		zIndex: 1100,
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},
	"modal-content": {
		marginTop: "25vh"
	},
	"modal-content-open": {
		// transform: translate(-50%);
		padding: "10px",
		width: "500px",
		height: "500px",
		left: "50%",
		top: "20%",
	}
})


// const Modal = posed.div({
// 	left: { x: -100 },
// 	right: { x: 100 }
// })

class ButtonToModal extends React.Component<WithStyles<typeof styles>, IButtonToModalState> {

	constructor(props: WithStyles<typeof styles>) {

		super(props);
		this.state = {
			open: false
		}
	}

	public onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
		this.setState({
			open: !this.state.open
		})
	}

	public render() {

		const cameraArchive: ICamera = {
			"id": 24,
			"path": "camera/1541178343156",
			// tslint:disable-next-line:object-literal-sort-keys
			"created_at": "2018-11-02T17:05:43.156Z"
		}

		return (

			<Flipper flipKey={this.state.open} >
				<Flipped flipId={"camera-archive" + cameraArchive.id}>
					<div className={`${this.props.classes.modal} ${this.state.open ? this.props.classes["show-modal"] : ''}`}>
						<Flipped
							inverseFlipId={"camera-archive" + cameraArchive.id}
							transformOrigin="0 0">
								<Button className={`${this.props.classes["modal-button"]} ${this.state.open ? this.props.classes["modal-button-open"] : ''}`} variant="fab" color="primary" aria-label="Add" onClick={this.onClickHandler}>
									<AddIcon className={`${this.props.classes.icon} ${this.state.open ? this.props.classes["add-icon-to-close"] : ''}`} />
								</Button>
						</Flipped>
						{this.state.open &&
							<div className={this.props.classes["modal-content"]}>
								{this.props.children}
							</div>
						}
					</div>
				</Flipped>
			</Flipper>
		);
	}
}

export default withStyles(styles)(ButtonToModal);
