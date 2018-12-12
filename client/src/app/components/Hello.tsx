import * as React from 'react';
import { ICameraArchive } from '../constants/interface';
import ButtonToModal from './ButtonToModal'
import CameraArchiveSlider from './CameraArchiveSlider';

// export interface IHelloProps {
// }

export default class Hello extends React.PureComponent<{}, any> {

	public render() {

		const cameraArchive: ICameraArchive = {
			id: 24,
			path: "camera/1540564406059",
			// tslint:disable-next-line:object-literal-sort-keys
			"created_at": "2018-11-02T17:05:43.156Z"
		}

		return (
			<div>
				<ButtonToModal >
					<CameraArchiveSlider cameraArchive={cameraArchive} />
				</ButtonToModal>
			</div>
		);
	}
}
