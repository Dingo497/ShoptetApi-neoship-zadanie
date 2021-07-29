import React, { useEffect, useState } from 'react'

// Axios
import axios from 'axios'

// Moje komponenty
import Checkout from '../components/table/Checkout'

// Moje interfaces
import { ordersDetail } from '../types'

// Material UI
import { GridRowId } from '@material-ui/data-grid'


// Props
interface Props {
  dateOrders: any[]
  handleDateOrdersBackToOrders: (arr: any[]) => void
  dates: string[]
  getBackDates: (arr: string[]) => void
  checkoutOrdersID: GridRowId[]
  checkoutOrdersIDBackToOrders: (arr: GridRowId[]) => void
}



const CheckoutPage = (props: Props) => {
  // Constants
  const [allOrdersWithId, setallOrdersWithId] = useState([])
  const [checkoutOrdersid, setcheckoutOrdersid] = useState<GridRowId[]>()
  const [finnalyOrdersDetails, setfinnalyOrdersDetails] = useState([])
  const dateOrders = props.dateOrders
  const dateOrdersBackToOrders = props.handleDateOrdersBackToOrders
  const dates = props.dates
  const getBackDates = props.getBackDates
  const checkoutOrdersID = props.checkoutOrdersID
  const checkoutOrdersIDBackToOrders = props.checkoutOrdersIDBackToOrders

  // Ak existuje localStorage parsnem a setnem si ho do stateu
  useEffect(() => {
    if(checkoutOrdersID.length > 0){
      setcheckoutOrdersid(checkoutOrdersID)
      checkoutOrdersIDBackToOrders(checkoutOrdersID)
    }
  }, [checkoutOrdersID])


  // Ak su setnute orders tak ich vykresli a posli znovu do ordersPage
  useEffect(() => {
    setallOrdersWithId(dateOrders) 
    dateOrdersBackToOrders(dateOrders)
    getBackDates(dates)
  }, [dateOrders])


  // Odchytenie ci som vymazal checkoutOrdersID v checkout.tsx
  // po stlaceni import
  const handleDeleteCheckoutOrdersID = (arr:null) => {
    checkoutOrdersIDBackToOrders(arr)
  }


  // Getnem si detaily objednavok na zaklade Id kt. mam z localStorage
  // da sa este zjednodusit (pretoze som spravil refactoring kodu
  // a pridal som novu funkcionalitu)
  useEffect(() => {
    const filtered = allOrdersWithId.filter(order => checkoutOrdersid.includes(order.id))
    const ordersCodes = filtered.map(order => order.code) 
    axios.get(
      'http://symfony/api/orders-detail', {
        headers: {
          'Orders-Codes': JSON.stringify(ordersCodes),
        }
      }).then((response) => {
        const finnalyArr:ordersDetail[] = []
        response.data.forEach((orderObj: { data: { order: any } }, index: number) => {
          const path = orderObj.data.order
          let time = path.creationTime.split('T')
          time['0'] = time['0'].split('-').reverse().join('-')
          time['1'] = time['1'].split('+0', 1)[0]
          time = time.join(' / ')
          time = time.replaceAll('-', '.')
          
          const finnalyResult:ordersDetail = {
            id : index + 1,
            creationTime : time,
            reference_number : path.code,
            receiver_name : path.billingAddress.fullName,
            receiver_company : path.billingAddress.company,
            receiver_city : path.billingAddress.city,
            receiver_street : path.billingAddress.street,
            receiver_house_number : path.billingAddress.zip,
            receiver_zip : path.billingAddress.zip,
            receiver_state_code : path.billingAddress.countryCode,
            receiver_phone: path.phone,
            receiver_email : path.email,
            cod_price : path.price.toPay,
            insurance : path.billingAddress.additional,
            cod_reference : 'nwm',
            cod_currency_code : path.price.currencyCode
          }
          finnalyArr.push(finnalyResult)
        })
        setfinnalyOrdersDetails(finnalyArr)
      })
  }, [allOrdersWithId])


  // Render
  return (
    <div>
        <Checkout checkoutOrders={finnalyOrdersDetails} deleteCheckoutOrdersID={handleDeleteCheckoutOrdersID} />
    </div>
  )
}

export default CheckoutPage
