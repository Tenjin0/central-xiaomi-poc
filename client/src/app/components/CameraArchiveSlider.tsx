import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import { API_STATIC_URL } from '../../config';
import { ICamera } from '../constants/interface';
import zIndex from '@material-ui/core/styles/zIndex';

export interface ICameraArchiveSliderProps {
	cameraArchive: ICamera
}

export interface ICameraArchiveSliderState {
	currentSelectedImage: number
}


export const styles = (theme: Theme) => createStyles({
	carousel: {

	},
	header: {
		width: "100%",
		// tslint:disable-next-line:object-literal-sort-keys
		height: '50px'
	},
	slider: {
		backgroundColor: 'white',
		boxShadow: '0px 4px 6px fade-out(black, 0.8)',
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
		overflow: 'visible',
		position: 'relative'
	},
	'intro-img': {
		// maxHeight: '250px',
		overflow: 'hidden',
		// tslint:disable-next-line:object-literal-sort-keys
		position: 'absolute',
		transition: "all .4s ease-in-out",
		width: '100%'
	},
	img: {
		width: '100%',
		// tslint:disable-next-line:object-literal-sort-keys
		transition: "all .4s ease-in-out"

	},
	"carousel-indicator": {
		width: '12px',
		// tslint:disable-next-line:object-literal-sort-keys
		height: '12px',
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
		"zIndex": 1,
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

export default withStyles(styles)(CameraArchiveSlider)
;
