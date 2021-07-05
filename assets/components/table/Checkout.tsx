import React, { useCallback, useState } from 'react'
import axios from 'axios'

// material UI
import { DataGrid, GridColDef } from '@material-ui/data-grid'
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core'

// moje interfaces
import { allOrders } from '../../types'
import { Link } from 'react-router-dom'


interface Props {
    checkoutOrders: allOrders[]
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


const Checkout = (props: Props) => {
  //constant
  const stateCheckoutOrders = props.checkoutOrders
  if(stateCheckoutOrders.length === 0){
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
  const [finnalyResultArr, setFinnalyResultArr] = useState([])
  const classes = useStyles();

  // editacia spojenej bunky
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


  // Odchytenie a spracovanie noveho pola konecneho
  const handleImportOrders = () => {
    const ordersCodes = checkoutOrders.map(order => order.code) 
    console.log(ordersCodes)
    console.log('-----------------------')

    axios.get(
      'http://symfony/api/orders-detail', {
        headers: {
          'Orders-Codes': JSON.stringify(ordersCodes),
        }
      }).then((response) => {

        //@ts-ignore
        const finnalyArr = []
        //@ts-ignore
        response.data.forEach(orderObj => {
          const finnalyResult = {
            reference_number : orderObj.data.order.code,
            receiver_name : orderObj.data.order.fullName,
            receiver_company : orderObj.data.order.billingAddress.company,
            receiver_city : orderObj.data.order.billingAddress.city,
            receiver_street : orderObj.data.order.billingAddress.street,
            receiver_house_number : orderObj.data.order.billingAddress.houseNumber,
            receiver_zip : orderObj.data.order.billingAddress.zip,
            receiver_state_code : orderObj.data.order.billingAddress.countryCode,
            receiver_phone: orderObj.data.order.phone,
            receiver_email : orderObj.data.order.email,
            cod_price : orderObj.data.order.price.toPay,
            insurance : orderObj.data.order.billingAddress.additional,
            cod_reference : 'nwm',
            cod_currency_code : orderObj.data.order.price.currencyCode
          }
          finnalyArr.push(finnalyResult)
        })
        /**
         * treba to uz len dat do Stateu zatial 
         * to len nahrubo vypisujem
         */
        //@ts-ignore
        console.log(finnalyArr)
        //@ts-ignore
        setFinnalyResultArr(finnalyArr)
      })
      console.log(finnalyResultArr)

  }

  // zadefinovanie header row
  const columns: GridColDef[] = [
    { field: 'code', headerName: 'Kód', flex: 0.8 },
    { 
      field: 'fullName',
      headerName: 'Meno',
      flex: 1,
      type: 'string',
      editable: true
    },
    {
      field: 'company',
      headerName: 'Spoločnosť',
      type: 'string',
      editable: true,
      flex: 1
    },
    {
      field: 'phone',
      headerName: 'Kontakt',
      flex: 1,
      sortable: false,
      editable: true
    },
    {
      field: 'creationTime',
      headerName: 'Dátum vytvorenia',
      flex: 1
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
      flex: 0.8,
      editable: true,
      valueGetter: (params) =>
        `${params.getValue(params.id, 'price') || ''} ${
          params.getValue(params.id, 'priceCurrencyCode') || ''
        }`,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.8,
      editable:true
    },
  ]

  // render
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
      {/* onClick={handleImportOrders} */}
    <Button onClick={handleImportOrders} component={Link} className={classes.Link} to={'/'} >Importovať</Button>
  </div>
  )
}

export default Checkout