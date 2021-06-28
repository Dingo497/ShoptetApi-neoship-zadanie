import React, { useEffect, useState } from 'react'
import axios from 'axios'

//moje komponenty
import Orders from '../components/table/Orders'


interface Props {
  checkoutOrders: (arr: []) => void
}

const OrdersPage = (props: Props) => {
  //constant
  const [orders, setOrders] = useState()
  const sendCheckoutOrders = props.checkoutOrders

  useEffect(() => {
    axios.get(
      'http://symfony/api/users'
    ).then(response=>{
      setOrders(response.data)
    })
  }, [])


  const handleCheckoutOrders = (arr:[]) => {
    sendCheckoutOrders(arr)
  }


  return (
    <div>
      <Orders ArrOrders={orders} ArrCheckoutOrders={handleCheckoutOrders}/>
    </div>
  )
}

export default OrdersPage
