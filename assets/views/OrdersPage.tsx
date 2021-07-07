import React, { useEffect, useState } from 'react'

// Material UI
import { GridRowId } from '@material-ui/data-grid'

// Axios
import axios from 'axios'

// Moje komponenty
import Orders from '../components/table/Orders'

// Moje interfaces
import { allOrders } from '../types'


// Props
interface Props {
  ArrCheckoutOrders: (arr: GridRowId[]) => void
}



const OrdersPage = (props: Props) => {
  // Constants
  const [orders, setOrders] = useState<allOrders[]>()
  const [checkoutOrdersId, setcheckoutOrdersId] = useState(
    localStorage.getItem('checkoutOrdersId') || ''
  )
  const checkoutOrders = props.ArrCheckoutOrders


  // Zavola vsetky objednavky a zmenim si pole podla seba
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
          let creationTime  = order.creationTime.split('T')
          creationTime['0'] = creationTime['0'].split('-').reverse().join('-')
          creationTime['1'] = creationTime['1'].split('+0', 1)[0]
          creationTime = creationTime.join(' / ')
          order.creationTime = creationTime.replaceAll('-', '.')
          return order
        }))
      })
    }
  }, [])


  // Odchitenie zaskrtnutych objednavok
  const handleCheckoutOrders = (arr:GridRowId[]) => {
    setcheckoutOrdersId(JSON.stringify(arr))
    checkoutOrders(arr)
  }


  // Nastavenie localStorage
  useEffect(() => {
    localStorage.setItem('checkoutOrdersId', checkoutOrdersId)
  }, [handleCheckoutOrders])


  // Render
  return (
    <div>
      <Orders ArrOrders={orders} ArrCheckoutOrders={handleCheckoutOrders}/>
    </div>
  )
}

export default OrdersPage
