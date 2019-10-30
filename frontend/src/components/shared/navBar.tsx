import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Menu, MenuItem, withStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import {styles} from "../../../static/wikiwar-style";


interface INavBarProps {
    classes: any,
}

function NavBar(props: INavBarProps) {
    const {classes} = props;

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" onClick={handleClick}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        Wikiwar
                    </Typography>
                </Toolbar>
            </AppBar>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}><Link className={classes.wwar_menuItem} to="/">Home</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link className={classes.wwar_menuItem} to="/wikiwar">Wikiwar</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link className={classes.wwar_menuItem} to="/settings">Settings</Link></MenuItem>
            </Menu>
        </div>

    );
}

export default withStyles(styles)(NavBar);