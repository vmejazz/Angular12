import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";

export const setRickCharacter = createAction('[GROUP] setRickCharacter', rick => ({ payload: rick }));
export const setMortyCharacter = createAction('[GROUP] setMortyCharacter', morty => ({ payload: morty }));

interface ICharacter {
  name: String
  id?: string | number;
  status?: String
  species?: String
  type?: String
  gender?: String
  origin?: Location
  location?: Location
  image?: String
  created?: String
}

export const initialRickState: ICharacter = {
  name: "",
}

export const initialMortyState: ICharacter = {
  name: "",
}


export const rickReducer = createReducer(
  initialRickState,
  on(setRickCharacter, (_, action) => (action.payload))
)

export const mortyReducer = createReducer(
  initialMortyState,
  on(setMortyCharacter, (_, action) => (action.payload))
)

export const rickFeatureSelector = createFeatureSelector<ICharacter>('rick');
export const rickSelector = createSelector(
  rickFeatureSelector,
  (rick) => rick
)
export const mortyFeatureSelector = createFeatureSelector<ICharacter>('morty');
export const mortySelector = createSelector(
  mortyFeatureSelector,
  (morty) => morty
)