import { createFeature, createReducer, on } from "@ngrx/store";
import { CounterCommands, CounterDocuments } from "./counter.actions";

export type CountByValues = 1 | 3 | 5;

export type CounterState = {
  current: number;
  by: CountByValues;
};

const initialState: CounterState = {
  current: 0,
  by: 1,
};

//
export const CounterFeature = createFeature({
  name: "CounterFeature",
  reducer: createReducer(
    initialState,
    on(CounterDocuments.counterState, (s, a) => a.payload),
    on(CounterCommands.incrementTheCount, (s) => ({
      ...s,
      current: s.current + s.by,
    })),
    on(CounterCommands.decrementTheCount, (s) => ({
      ...s,
      current: s.current - s.by,
    })),
    on(CounterCommands.setCountBy, (s, a) => ({ ...s, by: a.by })),
    on(CounterCommands.resetTheCount, (s) => ({
      ...s,
      current: initialState.current,
    }))
  ),
});
