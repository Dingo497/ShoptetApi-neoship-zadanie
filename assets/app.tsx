import React, { useState } from 'react'

// Router
import { Redirect, Route, Switch } from 'react-router-dom'

// Material UI
import { GridRowId } from '@material-ui/data-grid'

// Moje komponenty
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import OrdersPage from './views/OrdersPage'
import CheckoutPage from './views/CheckoutPage'



const App = () => {
  // Constants
  const [checkoutOrdersToHeader, setcheckoutOrdersToHeader] = useState<GridRowId[]>([])


  // Odchytenie a setnutie pole s ID selectnutych objednavok
  const handleCheckoutOrdersToHeader = (arr: GridRowId[]) => {
    setcheckoutOrdersToHeader(arr)
  }


  // Render
  return (
    <div>

      <Header ArrCheckoutOrders={checkoutOrdersToHeader} />

      <main>
        <Switch>ArrCheckoutOrders
          <Route path="/" exact render={() => <OrdersPage ArrCheckoutOrders={handleCheckoutOrdersToHeader} /> } />
          {/* Ak je nieco selected pusti na stranku inak nie */}
          {checkoutOrdersToHeader.length > 0 ? (
            <Route path="/checkout" exact component={CheckoutPage} />
          ) : (
            <Redirect to="/" />
          )}
        </Switch>
      </main>

      <Footer/>
      
    </div>
  )
}

export default App
