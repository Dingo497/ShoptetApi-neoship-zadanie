import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

// material UI
import { DataGrid, getRowEl, GridColDef } from '@material-ui/data-grid'
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core'

// moje interfaces
import { allOrders } from '../../types'


interface Props {
    checkoutOrders: allOrders[]
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
  const stateCheckoutOrders = props.checkoutOrders
  if(stateCheckoutOrders.length === 0){
    return (
      <div>nacitavam</div>
    )
  }
  const [checkoutOrders, setCheckoutOrders] = useState(stateCheckoutOrders)
  const classes = useStyles();

  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, props }) => {
      if (field === "fullPrice") {
        const data = props; // Fix eslint value is missing in prop-types for JS files
        const [price, priceCurrencyCode] = data.value.toString().split(" ");
        const updatedRows = checkoutOrders.map((order) => {
          if (order.id === id) {
            return { ...order, price, priceCurrencyCode };
          }
          return order
        });
        setCheckoutOrders(updatedRows)
      }
    },
    [checkoutOrders]
  );

  // zadefinovanie header row
  const columns: GridColDef[] = [
    { field: 'code', headerName: 'Kód', width: 150 },
    { 
      field: 'fullName',
      headerName: 'Meno',
      width: 170,
      type: 'string',
      editable: true
    },
    {
      field: 'company',
      headerName: 'Spoločnosť',
      type: 'string',
      width: 170,
      editable: true
    },
    {
      field: 'phone',
      headerName: 'Kontakt',
      width: 170,
      sortable: false,
      editable: true
    },
    {
      field: 'creationTime',
      headerName: 'Dátum vytvorenia',
      width: 170,
      type: 'datetime',
    },
    {
      field: 'price',
      hide: true,
      editable: true
    },
    {
      field: 'priceCurrencyCode',
      hide: true,
      editable: true
    },
    {
      field: 'fullPrice',
      headerName: 'Suma s DPH',
      width: 170,
      editable: true,
      valueGetter: (params) =>
        `${params.getValue(params.id, 'price') || ''} ${
          params.getValue(params.id, 'priceCurrencyCode') || ''
        }`,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable:true
    },
  ]

  // render
  return (
    <div>
      <div>
        <DataGrid
          autoHeight
          rows={checkoutOrders}
          columns={columns}
          pageSize={30}
          onEditCellChangeCommitted={handleEditCellChangeCommitted}
        />
      </div>
    <Button component={Link} className={classes.Link} to={'/'} >Importovať</Button>
  </div>
  )
}

export default Checkout
