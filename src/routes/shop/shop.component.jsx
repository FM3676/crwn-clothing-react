import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";
// import {fetchCategoriesAsync, setCategories} from "../../store/categories/category.action";
import { fetchCategoriesStart } from "../../store/categories/category.action";
// import { getCategorieAndDocuments } from "../../utils/firebase/firebase.utils";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import "./shop.styles.scss";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {dispatch(fetchCategoriesStart())}, []);
  // useEffect(() => {dispatch(fetchCategoriesAsync())}, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
export default Shop;
