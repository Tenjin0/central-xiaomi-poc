import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import * as React from 'react';


const styles = (theme: Theme) =>
	createStyles({
		root: {
			marginBottom: '5em',
			width: '100%',
		},
		// tslint:disable-next-line:object-literal-sort-keys
		grow: {
			flexGrow: 1,
		},
		menuButton: {
			marginLeft: -12,
			marginRight: 20,
		},
		title: {
			display: 'none',
			[theme.breakpoints.up('sm')]: {
				display: 'block',
			},
		},
	})
interface ICentralNavBar {
	history: any
}
	
class CentralNavBar extends React.PureComponent<ICentralNavBar & WithStyles<typeof styles>, {}> {

	public handleChange = (e: React.MouseEvent<HTMLInputElement>) => {
		this.props.history.push(e.currentTarget.dataset.location)
	}
	public render() {
		const classes = this.props.classes
		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
							<MenuIcon />
						</IconButton>
						<Typography className={classes.title} variant="h6" color="inherit" noWrap={true}>
							Central security
						</Typography>
						<div className={classes.grow} />
						<div>
							<IconButton color="inherit" data-location={"/camera/archive"} onClick={this.handleChange}>
								<PhotoCameraIcon/>
							</IconButton>
							<IconButton color="inherit" data-location={"/user/1"} onClick={this.handleChange}>
							<AccountCircleIcon />
							</IconButton>
							<IconButton color="inherit" data-location={"/users"} onClick={this.handleChange}>
								<SupervisedUserCircleIcon />
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}
export default withStyles(styles)(CentralNavBar)

