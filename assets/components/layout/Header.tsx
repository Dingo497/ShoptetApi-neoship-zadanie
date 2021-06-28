import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';

interface Props {
    
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    logo: {
      maxWidth: 120,
      margin: 10,
    },
    NavLinks: {
      "&.active": {
        background:'#e8dccc',
      },
      margin: 5,
    }
  }),
);

const Header = (props: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <img src="https://info.neoship.sk/assets/img/logo-intro.png" 
          alt="logo" className={classes.logo} />
          <nav>
            <Button className={classes.NavLinks} color="inherit" component={NavLink} exact to={"/"}>Orders</Button>
            <Button className={classes.NavLinks} color="inherit" component={NavLink} to={"/checkout"}>Checkout</Button>
          </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header
