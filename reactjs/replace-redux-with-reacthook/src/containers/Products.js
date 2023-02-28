import React, {useContext} from 'react';
import { useSelector } from 'react-redux';

import ProductItem from '../components/Products/ProductItem';
// import { ProductContext } from '../context/products-context';
import { useStore } from '../hooks-store/store';
import './Products.css';

const Products = props => {
    // const productList = useContext(ProductContext).products;
//   const productList = useSelector(state => state.shop.products);
const state = useStore()[0];
  return (
    <ul className="products-list">
      {/* {productList.map(prod => ( */}
      {state.products.map(prod => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;