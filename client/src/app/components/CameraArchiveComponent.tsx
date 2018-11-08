 import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import * as React from 'react';
import { API_STATIC_URL } from "../../config";
import { ICamera } from '../constants/interface';
import { ICameraArchiveProps } from '../containers/CameraArchiveContainer'

export default class CameraArchive extends React.PureComponent<ICameraArchiveProps, null> {

	constructor(props: any) {

		super(props);

	}

	public componentDidMount() {
		this.props.requestCameraArchive(null, this.props.pagination.perPage, this.props.pagination.currentPage)
	}

	public render() {
		return (

			<ul>
				{
					this.props.data.map((aCamera: ICamera) => (
						<Card key={"archive-" + aCamera.id}>
							<CardHeader>
								{ aCamera.created_at }
							</CardHeader>
							<CardContent>
								{aCamera.path}
								<img src={API_STATIC_URL + "/" + aCamera.path + "/1.png"} alt=""/>
							</CardContent>
						</Card>
					))
				}
			</ul>
			
		);
	}
}
