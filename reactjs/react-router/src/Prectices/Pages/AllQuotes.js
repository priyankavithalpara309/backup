import { useEffect } from "react";

import QuoteList from "../Components/quotes/QuoteList";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import NoQuotesFound from "../Components/quotes/NoQuotesFound";
import useHttp from "../hooks/use-http";
import {getAllQuotes} from '../lib/api';

// const DUMMY_QUOTES = [
//   {id:'q1', author:'Max', text: 'Learning React  is fun!'},
//   {id:'q2', author:'Maximilian', text: 'Learning React is great!'},
// ]; 

const AllQuotes = () => {
    // return(
    //   <QuoteList quotes={DUMMY_QUOTES} />
    // )

    const {sendRequest, status, data:loadedQuote, error} = useHttp(getAllQuotes,true);

    useEffect(() => {
      sendRequest();
    },[sendRequest]);

    if(status==='pending'){
      return(
        <div className="centered">
          <LoadingSpinner />
        </div>
      )
    }

    if(error){
      return <p className='centered focused'>{error}</p>;
    }

    if(status === 'completed' && (!loadedQuote || loadedQuote.length===0)){
      return <NoQuotesFound/>
    } 

    return <QuoteList quotes={loadedQuote} />;
  };
  
  export default AllQuotes;
  