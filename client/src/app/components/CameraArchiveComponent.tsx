import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import { ICamera } from '../constants/interface';
import { ICameraArchiveProps } from '../containers/CameraArchiveContainer'
import CameraCard from './CameraCard';
import CardContainer from './CardContainer'

export const styles = (theme: Theme) => createStyles({
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
	// tslint:disable-next-line:object-literal-sort-keys
	"card-container": {
		display: 'flex',
		justifyContent: "center",
		position: 'relative',
		width: "20%",
	},
})

class CameraArchive extends React.PureComponent<ICameraArchiveProps & WithStyles<typeof styles>, null> {

	constructor(props: any) {

		super(props);

		window.onscroll = () => {
			const hasScroll = window.innerHeight > document.documentElement.scrollHeight
			if (
			  window.innerHeight + document.documentElement.scrollTop
			  === document.documentElement.offsetHeight
			) {
				alert("I will call api")
			}
		  };

	}

	public componentDidMount() {
		
		this.props.requestCameraArchive(null, this.props.pagination.perPage, this.props.pagination.currentPage)
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
