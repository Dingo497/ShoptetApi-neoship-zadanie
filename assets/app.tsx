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
  const [checkoutOrdersID, setcheckoutOrdersID] = useState<GridRowId[]>([])
  const [checkoutOrdersIDBackToOrders, setCheckoutOrdersIDBackToOrders] = useState<GridRowId[]>()
  const [dateOrders, setdateOrders] = useState([])
  const [dateOrdersBackToOrders, setdateOrdersBackToOrders] = useState([])
  const [dates, setDates] = useState<string[]>()
  const [getBackDates, setGetBackDates] = useState<string[]>()


  // Odchytenie a setnutie pole s ID selectnutych objednavok
  const handlecheckoutOrdersID = (arr: GridRowId[]) => {
    setcheckoutOrdersID(arr)
  }


  // Odchytenie checkoutOrdersID ktore ide nazad do orders
  const handleCheckoutOrdersIDBackToOrders = (arr:GridRowId[]) => {
    setCheckoutOrdersIDBackToOrders(arr)
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

      <Header ArrcheckoutOrdersID={checkoutOrdersID} />

      <main>
        <Switch>ArrcheckoutOrdersID
          <Route path="/" exact render={() => 
            <OrdersPage 
              ArrcheckoutOrdersID={handlecheckoutOrdersID} 
              handleDateOrders={handleDateOrders}
              dateOrdersBackToOrders={dateOrdersBackToOrders}
              selectedDates={handleSelectedDates}
              getBackDates={getBackDates}
              checkoutOrdersIDBackToOrders={checkoutOrdersIDBackToOrders}
            /> } />
          {/* Ak je nieco selected pusti na stranku inak nie */}
          {checkoutOrdersID.length > 0 ? (
            <Route path="/checkout" exact render={() => 
              <CheckoutPage 
                checkoutOrdersID={checkoutOrdersID}
                dates={dates}
                getBackDates={handleGetBackDates}
                dateOrders={dateOrders}
                handleDateOrdersBackToOrders={handleDateOrdersBackToOrders}
                checkoutOrdersIDBackToOrders={handleCheckoutOrdersIDBackToOrders}
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
