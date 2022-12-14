import { createSelector } from "reselect";
import { RootState } from "../store";
import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";
// Using Memorization (the process in which you cache the previous value of something so that if input hasn't changed, just return back the same output.)
// 'createSelector' does that with selectors, it memorizes them, assuming that as long as the inputs have ont changed, then output should always be the same.
// The way it works is that we should create a input selector(give us the parameters that we need in order to determine what our output should be) and output selector
const selectCategoryReducer = (state:RootState): CategoriesState => state.categories;

// Now this selector is a memorization selector
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories // Only run if categoriesSlice that we get back from 'selectCategoryReducer' is different.
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);
// (state) =>
// state.categories.categories.reduce((acc, category) => {
//   const { title, items } = category;
//   acc[title.toLowerCase()] = items;
//   return acc;
// }, {});

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
