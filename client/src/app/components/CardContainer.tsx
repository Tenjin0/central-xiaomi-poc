import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import { ICamera } from '../constants/interface';

export interface ICardContainerProps {
	cameraArchive: ICamera
}

export const styles = (theme: Theme) => createStyles({
	'full-screen-container' :  {
		position: "fixed",
		top: "0",
		// tslint:disable-next-line:object-literal-sort-keys
		left: "0",
		width: "100%",
		height: "100%",

	},
	'invisible-container': {
		cursor: "pointer",
		position: "absolute",
		width: "100%",
		// tslint:disable-next-line:object-literal-sort-keys
		height: "100%"
	}
})

class CardContainer extends React.Component<ICardContainerProps & WithStyles<typeof styles>, any> {
	
  public render() {
	return (
		<div className={this.props.classes["invisible-container"]}/>
	
	);
  }
}

export default withStyles(styles)(CardContainer)
