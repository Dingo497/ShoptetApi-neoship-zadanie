import React from 'react'
import { Link } from 'react-router-dom';

// material UI
import { DataGrid, GridColDef, GridRowId, GridSelectionModelChangeParams } from '@material-ui/data-grid';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';

// moje interfaces
import { ArrayOfOrders } from '../../types'

interface Props {
  ArrOrders:ArrayOfOrders[],
  ArrCheckoutOrders: (arr: GridRowId[]) => void
}

// styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Link: {
      background:'#e8dccc',
      margin: 5,
    },
  }))


const Orders = (props: Props) => {

  // constant
  const orders = props.ArrOrders
  const checkoutOrders = props.ArrCheckoutOrders
  const classes = useStyles();

  // zadefinovanie header row
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90, type: 'number'},
    { 
      field: 'name',
      headerName: 'Name',
      width: 150,
      type: 'string',
    },
    {
      field: 'sum',
      headerName: 'Sum',
      type: 'number',
      width: 110,
    },
    {
      field: 'country',
      headerName: 'Country',
      width: 150,
      type: 'string',
    }
  ]

  // odchytenie objednavok do checkout
  const handleSelectedRows = (data:GridSelectionModelChangeParams) => {
    checkoutOrders(data.selectionModel)
  }

  // render
  if(orders == undefined){
    return (
      <div>nacitavam</div>
    )
  }else {
  return (
    <div>
      <div>
        <DataGrid
          autoHeight
          rows={orders}
          columns={columns}
          pageSize={10}
          checkboxSelection
          onSelectionModelChange={handleSelectedRows}
          disableSelectionOnClick
        />
      </div>
    <Button component={Link} className={classes.Link} to={'/checkout'} >Checkout</Button>
  </div>
  )
  }

}

export default Orders
