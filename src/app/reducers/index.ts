import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { rickReducer, mortyReducer, initialRickState, initialMortyState } from './group';
import { PageState, pageReducer } from './page';
import { SearchField, searchFieldReducer } from './search';

export interface State {
  showPage: PageState;
  searchField: SearchField;
  rick: typeof initialRickState;
  morty: typeof initialMortyState;
}

export const reducers: ActionReducerMap<State> = {
  showPage: pageReducer,
  searchField: searchFieldReducer,
  rick: rickReducer,
  morty: mortyReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
