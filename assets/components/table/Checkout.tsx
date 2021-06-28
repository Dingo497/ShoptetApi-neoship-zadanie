import React from 'react'
import { Link } from 'react-router-dom'

// material UI
import { DataGrid, GridColDef } from '@material-ui/data-grid'
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core'


interface Props {
    checkoutOrders: any[]
}


// styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Link: {
      background:'#e8dccc',
      margin: 5,
    },
  }))


const Checkout = (props: Props) => {
  //constant
  const checkoutOrders = props.checkoutOrders
  const classes = useStyles();

  // zadefinovanie header row
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90, type: 'number'},
    { 
      field: 'name',
      headerName: 'Name',
      width: 150,
      type: 'string',
      editable: true
    },
    {
      field: 'sum',
      headerName: 'Sum',
      type: 'number',
      width: 110,
      editable: true
    },
    {
      field: 'country',
      headerName: 'Country',
      width: 150,
      type: 'string',
      editable: true
    }
  ]

  // render
  if(checkoutOrders == undefined){
    return (
      <div>nacitavam</div>
    )
  }else {
  return (
    <div>
      <div>
        <DataGrid
          autoHeight
          rows={checkoutOrders}
          columns={columns}
          pageSize={10}
        />
      </div>
    <Button component={Link} className={classes.Link} to={'/'} >Import to Neoship</Button>
  </div>
  )
  }
}

export default Checkout
