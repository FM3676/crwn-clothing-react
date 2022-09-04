import { createContext, useEffect, useState } from "react";
import SHOP_DATA from "../shop-data.js";
import {
  addCollectionAndDocuments,
  getCategorieAndDocuments,
} from "../utils/firebase/firebase.utils.js";

export const ProductsContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategorieAndDocuments();
      console.log(categoryMap);
    };
    getCategoriesMap();
  }, []);

  /*  useEffect(() => {
    addCollectionAndDocuments("categories", SHOP_DATA);
  }, []); */

  const value = { products };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
