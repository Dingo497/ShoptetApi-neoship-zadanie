import React, { useEffect, useState } from 'react'

// Axios
import axios from 'axios'

// Moje komponenty
import Checkout from '../components/table/Checkout'

// Moje interfaces
import { ordersDetail } from '../types'


interface Props {

}



const CheckoutPage = (props: Props) => {
  // Constants
  const [allOrdersWithId, setallOrdersWithId] = useState([])
  const [checkoutOrdersid, setcheckoutOrdersid] = useState([])
  const [finnalyOrdersDetails, setfinnalyOrdersDetails] = useState([])


  // Ak existuje localStorage parsnem a setnem si ho do stateu
  useEffect(() => {
    if(localStorage.getItem('checkoutOrdersId')){
      setcheckoutOrdersid(JSON.parse(localStorage.getItem('checkoutOrdersId')))
    }
  }, [localStorage.getItem('checkoutOrdersId')])


  // Getnem vsetky objednavky a setnem im svoje id ktore potrebujem
  // na DataGrid tabulku
  useEffect(() => {
    axios.get(
      'http://symfony/api/all-orders'
    ).then(response=>{
      const allOrders = response.data.data.orders
      // Uprava pola podla poziadaviek DataGrid
      setallOrdersWithId(allOrders.map((order: any, index: number) => {
        order.id = index + 1
        return order
      }))
    })
    
    }, [])


  // Getnem si detaily objednavok na zaklade Id ktore som ziskal
  // z localStorage potom vdaka Id ziskam code objednavok ktore
  // mam getnut a vytvorim si svoje pole detailov
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
        <Checkout checkoutOrders={finnalyOrdersDetails} />
    </div>
  )
}

export default CheckoutPage
