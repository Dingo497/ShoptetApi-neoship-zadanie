import React, { useCallback, useState } from 'react'

// Material UI
import { DataGrid, GridColDef, GridRowId } from '@material-ui/data-grid'
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core'

// Moje interfaces
import { ordersDetail } from '../../types'
import { Link } from 'react-router-dom'


// Props
interface Props {
    checkoutOrders: ordersDetail[]
    deleteCheckoutOrdersID: (arr: null) => void
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

  

const Checkout = (props: Props) => {
  // Constants
  const stateCheckoutOrders = props.checkoutOrders
  const deleteCheckoutOrdersID = props.deleteCheckoutOrdersID
  if(stateCheckoutOrders.length === 0){
    // Loading
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
  const [checkoutOrders, setCheckoutOrders] = useState(stateCheckoutOrders)
  const classes = useStyles();


  // Editacia spojenej bunky a ostatnych buniek
  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, props }) => {
      if (field === "fullPrice") {
        const data = props 
        const [cod_price, cod_currency_code] = data.value.toString().split(" ");
        const updatedRows = checkoutOrders.map((order) => {
          if (order.id === id) {
            return { ...order, cod_price, cod_currency_code };
          }
          return order
        });
        setCheckoutOrders(updatedRows)
      } else {
        const data:string = props.value.toString()
        const updatedRows = checkoutOrders.map((order) => {
          if(order.id === id){
            const key = Object.keys(order).find(key => key === field)
            return { ...order, [key]:data}
          }
          return order
        })
        setCheckoutOrders(updatedRows)
      }
    },
    [checkoutOrders]
  );


  // Odchytenie a vypisanie upraveneho alebo neupraveneho pola
  const handleImportOrders = () => {
    console.log('HOTOVY RESULT:')
    console.log(checkoutOrders)
    console.log('----------------------')
    deleteCheckoutOrdersID(null)
    setCheckoutOrders(null)
  }


  // Zadefinovanie header row
  const columns: GridColDef[] = [
    { field: 'reference_number', headerName: 'Kód', flex: 0.8 },
    { 
      field: 'receiver_name',
      headerName: 'Meno',
      flex: 1,
      type: 'string',
      editable: true
    },
    {
      field: 'receiver_company',
      headerName: 'Spoločnosť',
      type: 'string',
      editable: true,
      flex: 0.8,
    },
    {
      field: 'receiver_city',
      headerName: 'Mesto',
      flex: 0.8,
      editable: true
    },
    {
      field: 'receiver_email',
      headerName: 'Email',
      flex: 0.8,
      editable: true
    },
    {
      field: 'receiver_house_number',
      headerName: 'Cislo Domu',
      flex: 0.8,
      editable: true
    },
    {
      field: 'receiver_street',
      headerName: 'Ulica',
      flex: 0.8,
      editable: true
    },
    {
      field: 'cod_price',
      hide: true,
      editable: true
    },
    {
      field: 'cod_currency_code',
      hide: true,
      editable: true
    },
    {
      field: 'fullPrice',
      headerName: 'Suma s DPH',
      flex: 0.7,
      editable: true,
      valueGetter: (params) =>
        `${params.getValue(params.id, 'cod_price') || ''} ${
          params.getValue(params.id, 'cod_currency_code') || ''
        }`,
    },
    {
      field: 'creationTime',
      headerName: 'Dátum vytvorenia',
      type: 'dateTime',
      flex: 1
    },
  ]

  
  // Render
  return (
    <div>
      <div>
        <DataGrid
          className={classes.root}
          autoHeight
          rows={checkoutOrders}
          columns={columns}
          pageSize={30}
          disableColumnMenu={true}
          onEditCellChangeCommitted={handleEditCellChangeCommitted}
          rowHeight={70}
          density={'comfortable'}
        />
      </div>
    <Button onClick={handleImportOrders} component={Link} className={classes.Link} to={'/'} >Importovať</Button>
  </div>
  )
}

export default Checkout