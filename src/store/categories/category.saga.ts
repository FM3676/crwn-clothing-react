// import { takeLatest, all, call, put } from "redux-saga/effects";
import { takeLatest, all, call, put } from "typed-redux-saga/macro";
import { getCategorieAndDocuments } from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from "./category.action";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield* call(getCategorieAndDocuments); // Pass the call() a callable method, and it's arguments are the last parameters
    yield* put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield* put(fetchCategoriesFailed(error as Error));
  }
}

export function* onFetchCategories() {
  yield* takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield* all([call(onFetchCategories)]); // all() is essentially an effect that sats, run everything inside and only complete when all of it's done.
}
