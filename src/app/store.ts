import { configureStore } from '@reduxjs/toolkit';
import todoListReducer from '../features/TodoList/todoListSlice';

export default configureStore({
    reducer: {
        todoList: todoListReducer,
    }
});

export const buildStore = () => configureStore({
    reducer: {
        todoList: todoListReducer,
    }
});
