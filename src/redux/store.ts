import { configureStore } from '@reduxjs/toolkit';
import inputReducer from './inputSlice';
import questionsReducer from './questionsSlice';

const store = configureStore({
    reducer: {
        input: inputReducer,
        questions: questionsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
