import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

// material UI
import { DataGrid, GridColDef, GridRowId, GridSelectionModelChangeParams } from '@material-ui/data-grid';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';

// moje interfaces
import { allOrders } from '../../types'

interface Props {
  ArrOrders:allOrders[],
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

  // konstanty
  const orders = props.ArrOrders
  // nacitavanie
  if (orders == undefined){
    return (
      <div>nacitavam</div>
    )
  }
  // konstanty
  const [ifIsSelected, setIfIsSelected] = useState(true)
  const [rememberSelectedRows, setRememberSelectedRows] = useState([])
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

  // odchytenie objednavok do checkout
  const handleSelectedRows = (data:GridSelectionModelChangeParams) => {
    checkoutOrders(data.selectionModel)
    if( data.selectionModel.length === 0 ){
      setIfIsSelected(true)
    }else{
      setIfIsSelected(false)
    }
  }

  // sluzi na zapametanie selected objednavky
  useEffect(() => {
    if(localStorage.getItem('checkoutOrdersId').length >= 3){
      setRememberSelectedRows(JSON.parse(localStorage.getItem('checkoutOrdersId')))
    }else{
      setRememberSelectedRows([])
    }
  }, [])

  // render
  return (
    <div>
      <div>
        <DataGrid
          className={classes.root}
          autoHeight
          rows={orders}
          columns={columns}
          pageSize={30}
          selectionModel={ rememberSelectedRows }
          checkboxSelection
          onSelectionModelChange={handleSelectedRows}
          
        />
      </div>
    <Button 
      component={Link} 
      className={classes.Link} 
      to={'/checkout'}  
      disabled={ ifIsSelected }
      >Skontrolovať / Zmeniť</Button>
  </div>
  )
}

export default Orders
