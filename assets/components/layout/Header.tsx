import React, { useEffect, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { GridRowId } from '@material-ui/data-grid';

interface Props {
  ArrCheckoutOrders: GridRowId[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    logo: {
      maxWidth: 170,
      margin: 10,
    },
    NavLinks: {
      "&.active": {
        background:'#e8dccc',
      },
      margin: 5,
      fontSize: 17
    }
  }),
);

const Header = (props: Props) => {
  const classes = useStyles();
  const [ifIsSelected, setifIsSelected] = useState<boolean>(false)
  const checkoutOrders = props.ArrCheckoutOrders

  // Sledovanie ak sa zmeni selected tak bud disable btn alebo nie
  useEffect(() => {
    if(checkoutOrders.length > 0){
      setifIsSelected(false)
    }else {
      setifIsSelected(true)
    }
  }, [checkoutOrders])

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <img src={require('../../img/logo-intro.png')} 
          alt="logo" className={classes.logo} />
          <nav>
            <Button 
              className={classes.NavLinks} 
              color="inherit" 
              component={NavLink} 
              exact 
              to={"/"}>Objednávky
              </Button>
            <Button 
              className={classes.NavLinks} 
              color="inherit" 
              component={NavLink} 
              to={"/checkout"}
              disabled={ ifIsSelected }>Kontrola
              </Button>
          </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header
