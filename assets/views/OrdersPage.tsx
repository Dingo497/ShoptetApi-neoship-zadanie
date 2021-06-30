import React, { useEffect, useState } from 'react'
import axios from 'axios'

//moje komponenty
import Orders from '../components/table/Orders'
import { GridRowId } from '@material-ui/data-grid'


interface Props {

}

const OrdersPage = (props: Props) => {
  //constant
  const [orders, setOrders] = useState()
  const [checkoutOrdersId, setcheckoutOrdersId] = useState(
    localStorage.getItem('checkoutOrdersId') || ''
  )

  useEffect(() => {
    if(orders == undefined){
      axios.get(
        'http://symfony/api/all-orders'
      ).then(response=>{
        const allOrders = response.data.data.orders
        // uprava pola podla poziadaviek DataGrid
        setOrders(allOrders.map((order: any, index: number) => {
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
    }
  }, [])

  const handleCheckoutOrders = (arr:GridRowId[]) => {
    setcheckoutOrdersId(JSON.stringify(arr))
  }

  useEffect(() => {
    localStorage.setItem('checkoutOrdersId', checkoutOrdersId)
  }, [handleCheckoutOrders])

  return (
    <div>
      <Orders ArrOrders={orders} ArrCheckoutOrders={handleCheckoutOrders}/>
    </div>
  )
}

export default OrdersPage
