// define our application state for the links stuff.

import { createEntityAdapter } from "@ngrx/entity";
import { createFeature, createReducer, on } from "@ngrx/store";
import { LinksCommands } from "./links.actions";

export type LinksEntity = {
  id: string;
  href: string;
  description: string;
};

const adapter = createEntityAdapter<LinksEntity>();
const initialState = adapter.getInitialState();

export const LinksFeature = createFeature({
  name: "LinksFeature",
  reducer: createReducer(
    initialState,
    on(LinksCommands.addLink, (s, a) => adapter.addOne(a.payload, s))
  ),
  extraSelectors: ({ selectLinksFeatureState }) => ({
    getAllLinks: adapter.getSelectors(selectLinksFeatureState).selectAll,
  }),
});
