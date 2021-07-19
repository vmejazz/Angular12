import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";

export const setSeachField = createAction('[SEARCH] setSeachField', search => ({ payload: search }));

export interface SearchField {
  searchField: string | number;
}

export const initialSearchField: SearchField = {
  searchField: '',
}

export const searchFieldReducer = createReducer(
  initialSearchField,
  on(setSeachField, (state, action) => ({
    ...state,
    searchField: action.payload,
  }))
)

export const searchFeatureSelector = createFeatureSelector<SearchField>('searchField');
export const searchFieldSelector = createSelector(
  searchFeatureSelector,
  (state) => state.searchField
)