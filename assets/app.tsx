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

  return (
    <div>
      <Header/>

      <main>
        <Switch>
          <Route path="/" exact component={OrdersPage} />
          <Route path="/checkout" exact component={CheckoutPage} />
        </Switch>
      </main>

      <Footer/>
    </div>
  )
}

export default App
