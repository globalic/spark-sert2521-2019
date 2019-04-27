import createStyles from '@material-ui/core/es/styles/createStyles';
import classNames from 'classnames';
import { Theme } from '@material-ui/core';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import React, { createElement, useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import { Switch } from 'react-router';

const drawerWidth = 240;

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex'
    },
    title: {
        flexGrow: 1,
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    drawer: {
        height: '100vh'
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        overflow: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        overflow: 'hidden',
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
        display: 'flex',
        flexFlow: 'column',
    },
    appBarSpacer: {
        ...theme.mixins.toolbar,
        flex: '0 1 auto'
    },
});

const Main = ({ classes }: WithStyles<typeof styles>) => {
    const [ drawerOpened, setDrawerOpened ] = useState(true);
    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                classes={{
                    paper: classNames(classes.drawerPaper, !drawerOpened && classes.drawerPaperClose)
                }}
                open={drawerOpened}
                onClose={() => setDrawerOpened(false)}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={() => setDrawerOpened(false)}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
            </Drawer>
            <AppBar className={classNames(classes.appBar, drawerOpened && classes.appBarShift)}>
                <Toolbar disableGutters={!drawerOpened} className={classes.toolbar}>
                    <IconButton
                        aria-label="Open drawer"
                        color="inherit"
                        onClick={() => setDrawerOpened(true)}
                        className={classNames(
                            classes.menuButton,
                            drawerOpened && classes.menuButtonHidden,
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="title"
                        color="inherit"
                        component="h1"
                        noWrap
                        className={classes.title}
                    >
                        Spark
                    </Typography>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Switch>
                    {/* Routes go here */}
                </Switch>
            </main>
        </div>
    );
};

export default withStyles(styles)(Main);