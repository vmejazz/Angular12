import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";

export const setPage = createAction('[INIT] setPage');

export interface PageState {
  showPage: boolean;
}

export const initialPageState: PageState = {
  showPage: false,
}

export const pageReducer = createReducer(
  initialPageState,
  on(setPage, state => ({
    ...state,
    showPage: !state.showPage,
  }))
)

export const pageFeatureSelector = createFeatureSelector<PageState>('showPage');
export const pageShowSelector = createSelector(
  pageFeatureSelector,
  (state) => state.showPage
)