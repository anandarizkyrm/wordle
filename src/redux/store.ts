import {
    PreloadedState,
    combineReducers,
    configureStore,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import wordleReducer from "./slice/wordle";
import alertReducer from "./slice/alert";

const rootReducer = combineReducers({
    wordle: wordleReducer,
    alert: alertReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
    configureStore({
        reducer: rootReducer,
        preloadedState,
    });

export const store = setupStore();

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
