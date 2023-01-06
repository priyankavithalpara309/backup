import { Route, Switch, Redirect } from "react-router-dom";

import AllQuotes from './Prectices/Pages/AllQuotes';
import QuoteDetail from './Prectices/Pages/QuoteDetail';
import NewQuote from './Prectices/Pages/NewQuote';

import Welcome from "./Pages/Welcome";
import Products from "./Pages/Products";
import ProductDetail from "./Pages/ProductDetail";
import MainHeader from "./Components/MainHeader";
import QuoteForm from "./Prectices/Components/quotes/QuoteForm";

function App() {
  return (

    <Switch>
      <Route path='/' exact>
        <Redirect to="/quotes" />
      </Route>
      <Route path='/quotes' exact>
        <QuoteForm />
        {/* <AllQuotes /> */}
      </Route>
      <Route path='/quotes/:quotesId' exact>
        <QuoteDetail />
      </Route>
      <Route path='/new-quotes' exact>
        <NewQuote />
      </Route>
    </Switch>


    // <div>
    //   <MainHeader />
    //   <main>
    //     <Switch>
    //       {/* redirect defualt page */}
    //       <Route path="/" exact>
    //         <Redirect to="welcome" />
    //       </Route>
    //       <Route path="/welcome">
    //         <Welcome />
    //       </Route>          
    //       <Route path="/product" exact> {/*it match exact name */}
    //         <Products />
    //       </Route>
    //       <Route path="/product/:productId">
    //         <ProductDetail />
    //       </Route>
    //     </Switch>
    //   </main>
    // </div>

    // <div>
    //   <MainHeader />      
    //   <main>
    //     <Route path="/welcome">
    //       <Welcome />
    //     </Route>
    //     <Route path="/product">
    //       <Products />
    //     </Route>
    //     <Route path="/product-detail/:productId">
    //       <ProductDetail />
    //     </Route>
    //   </main>
    // </div>
  );
}

export default App;