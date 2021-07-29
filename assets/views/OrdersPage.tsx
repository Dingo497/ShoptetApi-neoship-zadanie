import React, { useEffect, useState } from 'react'

// Material UI
import { GridRowId } from '@material-ui/data-grid'
import { createStyles, makeStyles } from '@material-ui/core'

// Axios
import axios from 'axios'

// Moje komponenty
import Orders from '../components/table/Orders'
import DateSlider from '../components/dateSlider/DateSlider'

// Moje interfaces
import { allOrders } from '../types'


// Props
interface Props {
  ArrcheckoutOrdersID: (arr: GridRowId[]) => void
  checkoutOrdersIDBackToOrders: GridRowId[]
  handleDateOrders: (dateOrders: any[]) => void
  dateOrdersBackToOrders: any[]
  selectedDates: (arr: string[]) => void
  getBackDates: string[]
}


// Styles
const useStyles = makeStyles(() =>
  createStyles({
    loading: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '5%'
    }
  }))

  

const OrdersPage = (props: Props) => {
  // Constants
  const [orders, setOrders] = useState<allOrders[]>([])
  const [beginDate, setBeginDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()
  const [dates, setDates] = useState<string[]>([])
  const ArrcheckoutOrdersID = props.ArrcheckoutOrdersID
  const checkoutOrdersIDBackToOrders = props.checkoutOrdersIDBackToOrders
  const handleDateOrders = props.handleDateOrders
  const dateOrdersBackToOrders = props.dateOrdersBackToOrders
  const selectedDates = props.selectedDates
  const getBackDates = props.getBackDates
  const [loading, setLoading] = useState<boolean>(false)
  const classes = useStyles();


  // Odchytenie filtracnych datumov
  const handleDates = (beginDate:Date, endDate:Date) => {
    setBeginDate(beginDate.toISOString())
    setEndDate(endDate.toISOString())
    setLoading(true)
  }


  // Zistenie zmeny jednotlivych datumov
  useEffect(() => {
    if(beginDate && endDate){
      setDates([beginDate, endDate])
    }
  }, [beginDate, endDate])


  // Zistenie zmeny dates a ak sa zmenil posli datumy app.tsx
  useEffect(() => {
    selectedDates(dates)
  }, [dates])


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
    }
  }, [dateOrdersBackToOrders] )


  // Sledovanie zmeny objednavok a poslanie ich do app
  useEffect(() => {
    handleDateOrders(orders)
  }, [orders])


  // Odchitenie zaskrtnutych objednavok
  const handleArrcheckoutOrdersID = (arr:GridRowId[]) => {
    ArrcheckoutOrdersID(arr)
  }


  // Sledovanie ak mam nacitany orders tak zastav loading
  useEffect(() => {
    if(orders.length > 0){
      setLoading(false)
    }
  }, [orders])



  // Render
  return (
    <div>
      <DateSlider filterByDates={handleDates} getBackDates={getBackDates} />
      {/* Ak je nastaveny date tak sprav render a posli date */}
      {loading === true && 
        <img src={require('../img/Spin-1s-120px.gif')} 
        alt="Loading" className={classes.loading}/>
      }
      {orders.length > 0 &&
        <Orders 
          ArrOrders={orders} 
          ArrcheckoutOrdersID={handleArrcheckoutOrdersID}
          checkoutOrdersIDBackToOrders={checkoutOrdersIDBackToOrders}
        />
      }
    </div>
  )
}

export default OrdersPage


/**
 * TODO
 * - Treba opravit bug s datumom ktory po prvom rerender na ordersPage
 * funguje a hodi tam povodny zadany datum, ale po druhuom rerender
 * mi tam napise zly format datumu treba opravit
 * - Treba potom otestovat appku a upravit pridat komentare
 */
