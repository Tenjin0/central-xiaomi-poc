import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import { ICamera } from '../constants/interface';
import { ICameraArchiveProps } from '../containers/CameraArchiveContainer'
import CameraCard from './CameraCard';


export const styles = (theme: Theme) => createStyles({
	container: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		paddingInlineStart: "30px",
		// tslint:disable-next-line:object-literal-sort-keys
		paddingInlineEnd: "30px",
	},
})

class CameraArchive extends React.PureComponent<ICameraArchiveProps & WithStyles<typeof styles>, null> {

	constructor(props: any) {

		super(props);

	}

	public componentDidMount() {
		
		console.log("componentDidMount")
		this.props.requestCameraArchive(null, this.props.pagination.perPage, this.props.pagination.currentPage)
	}

	public render() {

		const classes = this.props.classes;

		return (

			<ul className={this.props.classes.container}>
				{
					this.props.data.map((aCameraArchive: ICamera) => (
						<li>
							<CameraCard key={"camera-archive-" + aCameraArchive.id} cameraArchive={aCameraArchive} />
						</li>
					))
				}
			</ul>

		);
	}
}

export default withStyles(styles)(CameraArchive)
