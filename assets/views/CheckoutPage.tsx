import { GridRowId } from '@material-ui/data-grid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

//moje komponenty
import Checkout from '../components/table/Checkout'

interface Props {
  sendCheckoutID: GridRowId[]
}

const CheckoutPage = (props: Props) => {
  //constant
  const [checkoutOrdersID, setCheckoutOrdersID] = useState([])
  const [allOrders, setAllOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])

  useEffect(() => {
    const sendcheckoutID = props.sendCheckoutID
    setCheckoutOrdersID(sendcheckoutID)
    console.log(checkoutOrdersID)
    axios.get(
      'http://symfony/api/all-orders'
    ).then(response=>{
      setAllOrders(response.data.data.orders)
    })
    // setFilteredOrders(allOrders.filter( row => checkoutOrdersID.includes(Number(row.id)) ))

  }, [props.sendCheckoutID])

  // console.log("-----------ALLORDERS------------")
  // console.log(allOrders)
  // console.log("-----------ID------------")
  // console.log(checkoutOrdersID)
  // console.log("-----------FILTEREDORDERS------------")
  // console.log(filteredOrders)
  // console.log("-----------IDrozlozene------------")
  // console.log(checkoutOrdersID)

//allOrders.filter( row => checkoutOrdersID.includes(Number(row.id)) )
  return (
    <div>
        <Checkout checkoutOrders={allOrders} />
    </div>
  )
}

export default CheckoutPage
