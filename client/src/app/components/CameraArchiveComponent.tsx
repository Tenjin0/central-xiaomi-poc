import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import { ICamera } from '../constants/interface';
import { ICameraArchiveProps } from '../containers/CameraArchiveContainer'
import CameraCard from './CameraCard';
import CardContainer from './CardContainer'

export const styles = (theme: Theme) => createStyles({
	"card-container": {
		display: 'flex',
		justifyContent: "center",
		position: 'relative',
		width: "20%",
	},
	"card-list-container": {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		paddingInlineStart: "0px",
		// tslint:disable-next-line:object-literal-sort-keys
		paddingInlineEnd: "0px",
		listStyle: "none"
	},
})

class CameraArchive extends React.PureComponent<ICameraArchiveProps & WithStyles<typeof styles>, null> {

	constructor(props: any) {

		super(props);

		window.onscroll = () => {
			const hasScroll = window.innerHeight < document.documentElement.scrollHeight
			console.log(hasScroll, window.innerHeight, document.documentElement.scrollHeight)
			if (
				hasScroll && window.innerHeight + document.documentElement.scrollTop
				=== document.documentElement.offsetHeight
			) {
				alert("I will call api")
			}
		};
		// window.onload = function () { alert("It's loaded!") }
		// document.on(function(){alert("Loaded.")});
		// console.log(this.props.pagination)

	}

	// public componentDidUpdate(prevProps: ICameraArchiveProps, prevState: any) {
	// 	console.log("componentDidUpdate")
	// 	const hasScroll = window.innerHeight > document.documentElement.scrollHeight
	// 	// console.log(window.innerHeight, document.documentElement.scrollHeight)
	// 	console.log(prevProps.data.length !== this.props.data.length, !hasScroll, this.props.data.length < this.props.pagination.totalDatas)
	// 	// console.log(this.props.pagination.totalDatas, this.props.data.length)
	// 	if (prevProps.data.length !== this.props.data.length && !hasScroll &&  this.props.data.length < this.props.pagination.totalDatas)  {
	// 		console.log("fetch new data")
	// 		this.props.requestCameraArchive(null, 1, this.props.pagination.nextPage, true).then(() => {
	// 			// console.log(window.innerHeight, document.documentElement.scrollHeight)
	// 			// console.log(hasScroll)
	// 		})
	// 	}
	// }

	public componentDidMount() {
		// console.log(this.props.pagination.currentPage)
		
		this.props.requestCameraArchive(null, 10, this.props.pagination.currentPage, false).then(() => {
			// 		// console.log(window.innerHeight, document.documentElement.scrollHeight)
			// 		// console.log(hasScroll)
			setTimeout(() => {
				const hasScroll = window.innerHeight < document.documentElement.scrollHeight
				console.log(hasScroll, window.innerHeight,  document.documentElement.scrollHeight)
				if (!hasScroll &&  this.props.data.length < this.props.pagination.totalDatas)  {
					// console.log("fetch new data")
					// console.log(this.props.pagination)
					this.props.requestCameraArchive(null, this.props.pagination.perPage, this.props.pagination.currentPage + 1, true).then(() => {
						// console.log(window.innerHeight, document.documentElement.scrollHeight)
						// console.log(hasScroll)
					})
				}
			}, 0)
		})
	}

	public render() {
		const classes = this.props.classes;

		return (

			<ul className={classes["card-list-container"]}>
				{
					this.props.data.map((aCameraArchive: ICamera) => (
						<li key={"camera-archive-" + aCameraArchive.id} className={classes["card-container"]}>
							<CameraCard cameraArchive={aCameraArchive} />
						</li>
					))
				}
			</ul>
		);
	}
}

export default withStyles(styles)(CameraArchive)
