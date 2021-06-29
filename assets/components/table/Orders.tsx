import React from 'react'
import { Link } from 'react-router-dom';

// material UI
import { DataGrid, GridColDef, GridRowId, GridSelectionModelChangeParams } from '@material-ui/data-grid';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';

// moje interfaces
// import { ArrayOfOrders } from '../../types'

interface Props {
  ArrOrders:any[],
  ArrCheckoutOrders: (arr: GridRowId[]) => void
}

// styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Link: {
      background:'#e8dccc',
      margin: 5,
    },
    root: {
      '& .MuiDataGrid-row.Mui-even:not(:hover)': {
        backgroundColor: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.04)' : '#e8dccc',
      },
    }
  }))


const Orders = (props: Props) => {

  // constant
  const orders = props.ArrOrders
  if (orders == undefined){
    return (
      <div>nacitavam</div>
    )
  }
  // uprava pola podla poziadaviek DataGrid
  const ordersWithID = orders.map((order, index) => {
    order.id = index + 1
    order.priceWithVat = order.price.withVat
    order.priceWithoutVat = order.price.withoutVat
    order.priceVat = order.price.vat
    order.priceCurrencyCode = order.price.currencyCode
    order.priceExchangeRate = order.price.exchangeRate
    order.price = order.price.toPay
    order.statusId = order.status.id
    order.status = order.status.name
    let creationTime  = order.creationTime.replaceAll('-', '.')
    creationTime = creationTime.split('+0', 1)[0]
    order.creationTime = creationTime.replaceAll('T', ' / ')
    return order
  })
  const checkoutOrders = props.ArrCheckoutOrders
  const classes = useStyles();

  // zadefinovanie header row
  const columns: GridColDef[] = [
    { field: 'code', headerName: 'Kód', width: 150 },
    { 
      field: 'fullName',
      headerName: 'Meno',
      width: 170,
      type: 'string',
    },
    {
      field: 'company',
      headerName: 'Spoločnosť',
      type: 'string',
      width: 170,
    },
    {
      field: 'phone',
      headerName: 'Kontakt',
      width: 170,
      sortable: false,
    },
    {
      field: 'creationTime',
      headerName: 'Dátum vytvorenia',
      width: 170,
      type: 'datetime',
    },
    {
      field: 'price',
      hide: true
    },
    {
      field: 'priceCurrencyCode',
      hide: true
    },
    {
      field: 'fullPrice',
      headerName: 'Suma s DPH',
      width: 170,
      valueGetter: (params) =>
        `${params.getValue(params.id, 'price') || ''} ${
          params.getValue(params.id, 'priceCurrencyCode') || ''
        }`,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
    },
  ]




/**
 * TODO
 * - upravit vykreslenie datumu (OK)
 * - opravit selected v orders
 * - vypisat selected do checkout
 * - vypisanie do checkout cez filter by ID
 * - farby zmenit v kazdom druhom riadku
 */






  // odchytenie objednavok do checkout
  const handleSelectedRows = (data:GridSelectionModelChangeParams) => {
    checkoutOrders(data.selectionModel)
  }

  // render
  return (
    <div>
      <div>
        <DataGrid
          className={classes.root}
          autoHeight
          rows={ordersWithID}
          columns={columns}
          pageSize={30}
          checkboxSelection
          onSelectionModelChange={handleSelectedRows}
          disableSelectionOnClick
        />
      </div>
    <Button component={Link} className={classes.Link} to={'/checkout'} >Checkout</Button>
  </div>
  )
}

export default Orders
