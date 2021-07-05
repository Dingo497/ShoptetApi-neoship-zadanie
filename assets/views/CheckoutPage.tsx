import { GridRowId } from '@material-ui/data-grid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

//moje komponenty
import Checkout from '../components/table/Checkout'


interface Props {

}

const CheckoutPage = (props: Props) => {
  //constant
  const [allOrdersWithId, setallOrdersWithId] = useState([])
  const [checkoutOrdersid, setcheckoutOrdersid] = useState([])
  const [filteredOrders, setfilteredOrders] = useState([])

  useEffect(() => {
    if(localStorage.getItem('checkoutOrdersId')){
      setcheckoutOrdersid(JSON.parse(localStorage.getItem('checkoutOrdersId')))
    }
  }, [localStorage.getItem('checkoutOrdersId')])

  useEffect(() => {
    axios.get(
      'http://symfony/api/all-orders'
    ).then(response=>{
      const allOrders = response.data.data.orders
      // uprava pola podla poziadaviek DataGrid
      setallOrdersWithId(allOrders.map((order: any, index: number) => {
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
      }))
    })
    }, [])

    useEffect(() => {
      const filtered = allOrdersWithId.filter(order => checkoutOrdersid.includes(order.id))
      setfilteredOrders(filtered)
    }, [allOrdersWithId])

  return (
    <div>
        <Checkout checkoutOrders={filteredOrders} />
    </div>
  )
}

export default CheckoutPage
