import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

// material UI
import { DataGrid, GridColDef, GridResizeParams, GridRowId, GridSelectionModelChangeParams } from '@material-ui/data-grid';
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
      fontSize: 17
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
    const loading = {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '5%'
    }
    return (
        <img src={require('../../img/Spin-1s-120px.gif')} 
            alt="Loading" style={loading} />
    )
  }
  // konstanty
  const [ifIsSelected, setIfIsSelected] = useState(true)
  const [rememberSelectedRows, setRememberSelectedRows] = useState([])
  const checkoutOrders = props.ArrCheckoutOrders
  const classes = useStyles();
  // zadefinovanie header row
  const [columns, setcolumns] = useState<GridColDef[]>(
    [
      { field: 'code', headerName: 'Kód', flex: 0.8 },
      { 
        field: 'fullName',
        headerName: 'Meno',
        flex: 1,
        type: 'string',
      },
      {
        field: 'company',
        headerName: 'Spoločnosť',
        type: 'string',
        flex: 1,
      },
      {
        field: 'phone',
        headerName: 'Kontakt',
        flex: 1,
        sortable: false,
      },
      {
        field: 'creationTime',
        headerName: 'Dátum vytvorenia',
        flex: 1,
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
        flex: 0.8,
        valueGetter: (params) =>
          `${params.getValue(params.id, 'price') || ''} ${
            params.getValue(params.id, 'priceCurrencyCode') || ''
          }`,
      },
      {
        field: 'status',
        headerName: 'Status',
        flex: 0.8
      },
    ]
  )

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

  // sluzi na sledovanie sirky obrazovky a ked dosiahne 1000px
  // tabulka sa zmeni z flex na posuvnu
  // nedokoncene
  const checkWidth = (param: GridResizeParams) => {
    if(param.containerSize.width <= 1000){
      columns.map((column) => {
        delete(column.flex)
        column.width = 120
        return column
      })
      setcolumns(columns)
      // console.log(columns)
    }
  }

  // useEffect(() => {
  //   console.log('zmenil soms a')
  // }, [columns])



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
          disableColumnMenu={true}
          onSelectionModelChange={handleSelectedRows}
          density={'comfortable'}
          rowHeight={70}
          onResize={checkWidth}
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
