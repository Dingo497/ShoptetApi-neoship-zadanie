import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

// Material UI
import { DataGrid, GridColDef, GridResizeParams, GridRowId, GridSelectionModelChangeParams } from '@material-ui/data-grid';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';

// Moje interfaces
import { allOrders } from '../../types'


// Props
interface Props {
  ArrOrders:allOrders[],
  ArrcheckoutOrdersID: (arr: GridRowId[]) => void
  checkoutOrdersIDBackToOrders: GridRowId[]
}


// Styles
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
  // Constants
  const orders = props.ArrOrders
  // Loading
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
  const [ifIsSelected, setIfIsSelected] = useState(true)
  const [rememberSelectedRows, setRememberSelectedRows] = useState<GridRowId[]>()
  const ArrcheckoutOrdersID = props.ArrcheckoutOrdersID
  const checkoutOrdersIDBackToOrders = props.checkoutOrdersIDBackToOrders
  const classes = useStyles();


  // Zadefinovanie header row
  const [columns, setcolumns] = useState<GridColDef[]>(
    [
      { field: 'code', headerName: 'Kód', flex: 0.8 },
      { 
        field: 'fullName',
        headerName: 'Meno',
        flex: 1,
        type: 'string',
        sortable: false,
      },
      {
        field: 'company',
        headerName: 'Spoločnosť',
        type: 'string',
        flex: 1,
        sortable: false,
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
        sortable: false,
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


  // Odchytenie objednavok do sekcie kontroly
  const handleSelectedRows = (data:GridSelectionModelChangeParams) => {
    ArrcheckoutOrdersID(data.selectionModel)
    if( data.selectionModel.length === 0 ){
      setIfIsSelected(true)
    }else{
      setIfIsSelected(false)
    }
  }


  // Sluzi na ulozenie selected objednavky
  useEffect(() => {
    if(checkoutOrdersIDBackToOrders !== null){
      if(checkoutOrdersIDBackToOrders !== undefined){
        if(checkoutOrdersIDBackToOrders.length > 0){
          setRememberSelectedRows(checkoutOrdersIDBackToOrders)
        }else{
          setRememberSelectedRows([])
        }
      }
    }else{
      setRememberSelectedRows([])
    }
  }, [])

  

  // Render
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
          // onResize={checkWidth}
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
