import React, { useEffect, useState } from 'react'
import axios from 'axios'

//moje komponenty
import Orders from '../components/table/Orders'
import { GridRowId } from '@material-ui/data-grid'


interface Props {
  checkoutOrders: (arr: GridRowId[]) => void
}

const OrdersPage = (props: Props) => {
  //constant
  const [orders, setOrders] = useState()
  const sendCheckoutOrders = props.checkoutOrders

  useEffect(() => {
    axios.get(
      'http://symfony/api/all-orders'
    ).then(response=>{
      setOrders(response.data.data.orders)
    })
  }, [])


  const handleCheckoutOrders = (arr:GridRowId[]) => {
    sendCheckoutOrders(arr)
  }


  return (
    <div>
      <Orders ArrOrders={orders} ArrCheckoutOrders={handleCheckoutOrders}/>
    </div>
  )
}

export default OrdersPage
