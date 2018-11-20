import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import { API_STATIC_URL } from '../../config';
import { ICamera } from '../constants/interface';

export interface ICameraArchiveSliderProps {
	cameraArchive: ICamera
}

export interface ICameraArchiveSliderState {
	currentSelectedImage: number
}


export const styles = (theme: Theme) => createStyles({
	header: {
		width: "500px",
		// tslint:disable-next-line:object-literal-sort-keys
		height: '50px'
	},
	slider: {
		backgroundColor: 'white',
		boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
		display: 'block',
		margin:' 0 auto',
		maxWidth:'500px',
		position: 'relative',
		zIndex: 2
	},
	// tslint:disable-next-line:object-literal-sort-keys
	"carousel-indicators" : {
		bottom: 'auto',
		top: '375px',
		// tslint:disable-next-line:object-literal-sort-keys
		position: "absolute",
		// tslint:disable-next-line:object-literal-sort-keys
		listStyle: "none",
		display: 'flex',
		left: "35%",
		width: '60%',
		zIndex: 2
	},
	'carousel-inner': {
		borderRadius: '3px',
		height: '375px',
		overflow: 'visible',
		position: 'relative'
	},
	'intro-img': {
		overflow: 'hidden',
		position: 'absolute',
		top: '0%',
		transition: "all .1s ease-in-out",
		width: '100%',
	},
	'intro-img-blank': {
		backgroundColor: 'transparent',
		// tslint:disable-next-line:object-literal-sort-keys
		position: 'relative',
		width: '100%',
		// tslint:disable-next-line:object-literal-sort-keys
		height: '375x',
		zIndex: 1
	},
	img: {
		width: '100%',
		// tslint:disable-next-line:object-literal-sort-keys
		transition: "all .1s ease-in-out"

	},
	"carousel-indicator": {
		width: '10px',
		// tslint:disable-next-line:object-literal-sort-keys
		height: '10px',
		cursor: 'pointer',
		border: '1px solid blue',
		backgroundColor: "transparent",
		borderRadius: '10px',
		margin: '4px'
	},
	"carousel-indicator-blank": {
		width: '10px',
		// tslint:disable-next-line:object-literal-sort-keys
		height: '10px',
		cursor: 'pointer',
		border: '1px solid blue',
		backgroundColor: "transparent",
		borderRadius: '10px',
		margin: '4px'
	},
	title: {
		textAlign: 'center'
	},
	'not-active': {
		opacity: 0
	},
	active: {
		opacity: 1,
		"zIndex": 2,
	}
})

class CameraArchiveSlider extends React.Component<ICameraArchiveSliderProps & WithStyles<typeof styles>, ICameraArchiveSliderState> {

	constructor(props: ICameraArchiveSliderProps & WithStyles<typeof styles>) {
		super(props);
		this.state = {
			currentSelectedImage: 0
		}	
	}

	public toggleImage = (e: React.MouseEvent<HTMLElement>) => {
		this.setState({
			currentSelectedImage: parseInt(e.currentTarget.dataset.slideto, 10)
		})
	}

	public render() {
		const classes = this.props.classes
		const images = [0, 1, 2].map((image, index) => (
			<div key={"intro-img-" + index} className={ `${classes["intro-img"]} ${this.state.currentSelectedImage === index ? classes.active : classes["not-active"]}`}>
				<img className={`${classes.img}`} src={API_STATIC_URL + "/" + this.props.cameraArchive.path + "/" + image + ".png"} />
			</div>
		))
		const carouselIndicator = [0, 1, 2].map((image, index) => (
			<li key={"carousel-indicator-" + index} className= {classes["carousel-indicator"]} data-slideto={image} data-target="#card-slider" onClick={this.toggleImage}/>
		))
		return (
			<div className={classes.slider} id="card-slider">
				<div className={classes.header}>
					header
				</div>
				<div className={classes["carousel-inner"]} role="listbox">
					{/* <div key={"intro-img-blank"} className= {classes["intro-img-blank"]}/> */}
					{
						images
					}
				</div>
				<ul className={classes["carousel-indicators"]}>

					{
						carouselIndicator
					}
				</ul>
				<div className="controller">
					<a className="control left" data-slide="prev" href="#card-slider" role="button"><span /><span /></a>
					<a className="control right" data-slide="next" href="#card-slider" role="button"><span /><span /></a>
				</div>
			</div>
		)
	}
}

export default withStyles(styles)(CameraArchiveSlider);
