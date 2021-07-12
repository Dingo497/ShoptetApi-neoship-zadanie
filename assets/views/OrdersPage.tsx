import React, { useEffect, useState } from 'react'

// Material UI
import { GridRowId } from '@material-ui/data-grid'

// Axios
import axios from 'axios'

// Moje komponenty
import Orders from '../components/table/Orders'
import DateSlider from '../components/dateSlider/DateSlider'

// Moje interfaces
import { allOrders } from '../types'


// Props
interface Props {
  ArrCheckoutOrders: (arr: GridRowId[]) => void
  handleDateOrders: (dateOrders: any[]) => void
  dateOrdersBackToOrders: any[]
}



const OrdersPage = (props: Props) => {
  // Constants
  const [orders, setOrders] = useState<allOrders[]>([])
  const [checkoutOrdersId, setcheckoutOrdersId] = useState(
    localStorage.getItem('checkoutOrdersId') || ''
  )
  const [beginDate, setBeginDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()
  const [dates, setDates] = useState<string[]>([])
  const [ifOrdersChange, setIfOrdersChange] = useState<boolean>()
  const checkoutOrders = props.ArrCheckoutOrders
  const handleDateOrders = props.handleDateOrders
  const dateOrdersBackToOrders = props.dateOrdersBackToOrders


  // Odchytenie filtracnych datumov
  const handleDates = (beginDate:Date, endDate:Date) => {
    setBeginDate(beginDate.toISOString())
    setEndDate(endDate.toISOString())
  }


  // Zistenie zmeny jednotlivych datumov
  useEffect(() => {
    if(beginDate && endDate){
      setDates([beginDate, endDate])
    }
  }, [beginDate, endDate])


  // Zavolanie objednavok podla datumu po prvy krat
  useEffect(() => {
    if(dates.length > 0){
      axios.get(
        'http://symfony/api/all-orders', {
          headers: {
            'Dates' : JSON.stringify(dates)
          }
        })
        .then((response) => {
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
  }, [dates])


  // Sledovanie ci mam kvazi zapametane (poslane naspat) objednavky
  // z predosleho hladania
  useEffect(() => {
    if(dateOrdersBackToOrders.length > 0){
      setOrders(dateOrdersBackToOrders)
      //setIfOrdersChange(true)
    }
  }, [dateOrdersBackToOrders] )


  // Sledovanie zmeny objednavok a poslanie ich do app
  useEffect(() => {
    handleDateOrders(orders)
  }, [orders])


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
      <DateSlider filterByDates={handleDates} datesAfterRerenderPage={dates} /*ifOrdersChange={ifOrdersChange}*/ />
      {/* Ak je nastaveny date tak sprav render a posli date */}
      {orders.length > 0 &&
        <Orders 
          ArrOrders={orders} 
          ArrCheckoutOrders={handleCheckoutOrders}
        />
      }
    </div>
  )
}

export default OrdersPage
