import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';

const styles = (theme: Theme) =>
	createStyles({
		root: {
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
		search: {
			'&:hover': {
				backgroundColor: fade(theme.palette.common.white, 0.25),
			},
			backgroundColor: fade(theme.palette.common.white, 0.15),
			borderRadius: theme.shape.borderRadius,
			marginLeft: 0,
			position: 'relative',
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				marginLeft: theme.spacing.unit,
				width: 'auto',
			},
		},
		searchIcon: {
			alignItems: 'center',
			display: 'flex',
			height: '100%',
			justifyContent: 'center',
			pointerEvents: 'none',
			position: 'absolute',
			width: theme.spacing.unit * 9,
		},
		inputRoot: {
			color: 'inherit',
			width: '100%',
		},
		inputInput: {
			paddingTop: theme.spacing.unit,
			// tslint:disable-next-line:object-literal-sort-keys
			paddingBottom: theme.spacing.unit,
			paddingLeft: theme.spacing.unit * 10,
			paddingRight: theme.spacing.unit,
			transition: theme.transitions.create('width'),
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				'&:focus': {
					width: 200,
				},
				width: 120,
			},
		},
	})

	class CentralNavBar extends React.Component<WithStyles<typeof styles>, {}> {	


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
							Material-UI
			</Typography>
						<div className={classes.grow} />
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="Search…"
								classes={{
									input: classes.inputInput,
									root: classes.inputRoot,
								}}
							/>
						</div>
					</Toolbar>
				</AppBar>
			</div>
		);
		}
}

export default withStyles(styles)(CentralNavBar);
