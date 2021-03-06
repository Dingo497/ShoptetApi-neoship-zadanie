import React, { useEffect, useState } from 'react'

// React router
import { NavLink } from 'react-router-dom';

// Materail UI
import { AppBar, Button, createStyles, makeStyles, Theme, Toolbar } from '@material-ui/core';
import { GridRowId } from '@material-ui/data-grid';


// Props
interface Props {
  ArrcheckoutOrdersID: GridRowId[]
  checkoutOrdersIDAfterImport: GridRowId[]
}


// Styles
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
  // Constants
  const classes = useStyles();
  const [ifIsSelected, setifIsSelected] = useState<boolean>(false)
  const checkoutOrdersID = props.ArrcheckoutOrdersID
  const checkoutOrdersIDAfterImport = props.checkoutOrdersIDAfterImport



  // Sledovanie ak sa zmeni selected tak bud disable btn alebo nie
  useEffect(() => {
    if(checkoutOrdersID.length > 0){
      setifIsSelected(false)
    }else {
      setifIsSelected(true)
    }
  }, [checkoutOrdersID])


  // Sledovanie ci sa nekliklo na tlacidlo import v checkout.tsx
  useEffect(() => {
    if(checkoutOrdersIDAfterImport !== undefined) {
      if(checkoutOrdersIDAfterImport !== null) {
        setifIsSelected(false)
      } else {
        setifIsSelected(true)
      }
    }
  }, [checkoutOrdersIDAfterImport])


  // Render
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
