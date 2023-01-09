import { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";

import HighlightedQuote from "../Components/quotes/HighlightedQuote";
import Comments from "../Components/comments/Comments";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import NoQuotesFound from "../Components/quotes/NoQuotesFound";

// const DUMMY_QUOTES = [
//   { id: 'q1', author: 'Max', text: 'Learning React  is fun!' },
//   { id: 'q2', author: 'Maximilian', text: 'Learning React is great!' },
// ];

const QuoteDetail = () => {

  const match = useRouteMatch();
  const params = useParams();

  // const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

  const {quoteId} = params;

  const {sendRequest, status, data:loadedQuote, error} = useHttp(getSingleQuote,true);
  
  useEffect(() => {
    sendRequest(quoteId);
  },[sendRequest,quoteId]);

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

  if(!loadedQuote.text){
    return <p>No quote found!</p>;
  }  

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link to={`${match.url}/comments`} className='btn--flat'>
            Load Comment
          </Link>          
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
