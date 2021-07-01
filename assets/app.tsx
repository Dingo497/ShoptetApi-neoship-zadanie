import React, { useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { GridRowId } from '@material-ui/data-grid'

//moje komponenty
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import OrdersPage from './views/OrdersPage'
import CheckoutPage from './views/CheckoutPage'

interface Props {
    
}

const App = (props: Props) => {
  const [checkoutOrdersToHeader, setcheckoutOrdersToHeader] = useState<GridRowId[]>([])

  const handleCheckoutOrdersToHeader = (arr: GridRowId[]) => {
    setcheckoutOrdersToHeader(arr)
  }

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
