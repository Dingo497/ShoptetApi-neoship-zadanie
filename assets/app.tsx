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
  const [dateOrders, setdateOrders] = useState([])
  const [dateOrdersBackToOrders, setdateOrdersBackToOrders] = useState([])
  const [dates, setDates] = useState<string[]>()
  const [getBackDates, setGetBackDates] = useState<string[]>()


  // Odchytenie a setnutie pole s ID selectnutych objednavok
  const handleCheckoutOrdersToHeader = (arr: GridRowId[]) => {
    setcheckoutOrdersToHeader(arr)
  }


  // Odchytenie objednavok z OrdersPage na zaklade datumov
  const handleDateOrders = (arr:any[]) => {
    setdateOrders(arr)
  }


  // Odchytenie objednavok z CheckoutPage na zaklade datumov (poslanie naspat)
  const handleDateOrdersBackToOrders = (arr:any[]) => {
    setdateOrdersBackToOrders(arr)
  }


  // Odchytenie datumu z DateSlider
  const handleSelectedDates = (arr:string[]) => {
    setDates(arr)
  }


  // Odchytenie selected datumov nazad do orders page
  const handleGetBackDates = (arr:string[]) => {
    setGetBackDates(arr)
  }



  // Render
  return (
    <div>

      <Header ArrCheckoutOrders={checkoutOrdersToHeader} />

      <main>
        <Switch>ArrCheckoutOrders
          <Route path="/" exact render={() => 
            <OrdersPage 
              ArrCheckoutOrders={handleCheckoutOrdersToHeader} 
              handleDateOrders={handleDateOrders}
              dateOrdersBackToOrders={dateOrdersBackToOrders}
              selectedDates={handleSelectedDates}
              getBackDates={getBackDates}
            /> } />
          {/* Ak je nieco selected pusti na stranku inak nie */}
          {checkoutOrdersToHeader.length > 0 ? (
            <Route path="/checkout" exact render={() => 
              <CheckoutPage 
                dates={dates}
                getBackDates={handleGetBackDates}
                dateOrders={dateOrders}
                handleDateOrdersBackToOrders={handleDateOrdersBackToOrders}
              /> } />
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
