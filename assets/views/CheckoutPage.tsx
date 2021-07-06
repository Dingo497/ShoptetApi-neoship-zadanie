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
  const [finnalyOrdersDetails, setfinnalyOrdersDetails] = useState([])

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
        return order
      }))
    })
    
    }, [])

    useEffect(() => {
      const filtered = allOrdersWithId.filter(order => checkoutOrdersid.includes(order.id))
      const ordersCodes = filtered.map(order => order.code) 
      axios.get(
        'http://symfony/api/orders-detail', {
          headers: {
            'Orders-Codes': JSON.stringify(ordersCodes),
          }
        }).then((response) => {
          //@ts-ignore
          const finnalyArr = []
          //@ts-ignore
          response.data.forEach((orderObj, index) => {
            const path = orderObj.data.order
            let time = path.creationTime.split('T')
            time['0'] = time['0'].split('-').reverse().join('-')
            time['1'] = time['1'].split('+0', 1)[0]
            time = time.join(' / ')
            time = time.replaceAll('-', '.')
            
            const finnalyResult = {
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
          //@ts-ignore
          setfinnalyOrdersDetails(finnalyArr)
        })
    }, [allOrdersWithId])
  return (
    <div>
        <Checkout checkoutOrders={finnalyOrdersDetails} />
    </div>
  )
}

export default CheckoutPage
