import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'

//moje komponenty
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import OrdersPage from './views/OrdersPage'
import CheckoutPage from './views/CheckoutPage'

interface Props {
    
}

const App = (props: Props) => {
  //useState
  const [checkoutOrders, setCheckoutOrders] = useState([])

  const handleCheckoutOrders = (arr:[]) => {
    setCheckoutOrders(arr)
  }

  return (
    <div>
      <Header/>

      <main>
        <Switch>
          <Route path="/" exact 
            render={ () => <OrdersPage checkoutOrders={handleCheckoutOrders} /> }>
          </Route>
          <Route path="/checkout" exact 
            render={ () => <CheckoutPage sendCheckoutID={checkoutOrders} /> }>
          </Route>
        </Switch>
      </main>

      <Footer/>
    </div>
  )
}

export default App
