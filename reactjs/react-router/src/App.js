import { Route, Switch, Redirect } from "react-router-dom";

import AllQuotes from './Prectices/Pages/AllQuotes';
import QuoteDetail from './Prectices/Pages/QuoteDetail';
import NewQuote from './Prectices/Pages/NewQuote';
import NotFound from "./Prectices/Pages/NotFound";
import Layout from "./Prectices/Components/layout/Layout";

import Welcome from "./Pages/Welcome";
import Products from "./Pages/Products";
import ProductDetail from "./Pages/ProductDetail";
import MainHeader from "./Components/MainHeader";
import QuoteForm from "./Prectices/Components/quotes/QuoteForm";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Redirect to="/quotes" />
        </Route>
        <Route path='/quotes' exact>          
          <AllQuotes />
        </Route>
        <Route path='/quotes/:quoteId'>
          <QuoteDetail />
        </Route>
        <Route path='/new-quote'>
          <NewQuote />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Layout>

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