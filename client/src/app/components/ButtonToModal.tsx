import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
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
		transition: '1s all',
	},
	'modal-button': {
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
		transform: 'translate(90%, 50%)',
		top: '5%',
    	left: '93%',
	},
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
			<div className={`${this.props.classes.modal} ${this.state.open ? 'show-modal' : ''}`}>
				<Button className={`${this.props.classes["modal-button"]} ${this.state.open ? this.props.classes["modal-button-open"] : ''}`} variant="fab" color="primary" aria-label="Add" onClick={this.onClickHandler}>
					<AddIcon className={`${this.props.classes.icon} ${this.state.open ? this.props.classes["add-icon-to-close"] : ''}`} />
				</Button>
				{this.state.open &&
					<div className="modal-content">
						{this.props.children}
					</div>
				}
			</div>
		);
	}
}

export default withStyles(styles)(ButtonToModal);
