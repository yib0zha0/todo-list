import { Todo } from '../TodoEntry/TodoEntry';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TodoListState {
    sortByCreationTime: boolean;
    sortByPriority: boolean;
    todoInProgress: Todo[];
}

export const initialState: TodoListState = {
    sortByCreationTime: true,
    sortByPriority: false,
    todoInProgress: [],
}

export interface TodoModifyPayload {
    todoIndex: number,
    field: string,
    value: any,
}

const todoListSlice = createSlice({
    name: 'todoList',
    initialState: initialState,
    reducers: {
        addTodo: (state) => {
            const newTodo = {
                id: `todo-0`, 
                completed: false, 
                title: '', 
                description: '', 
                priority: 1, 
                creationTime: new Date().getTime(),
            };
            state.todoInProgress.push(newTodo);
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            const newTodos = state.todoInProgress.filter((value, index) => index != action.payload);
            state.todoInProgress = newTodos;
        },
        modifyTodo: (state, action: PayloadAction<TodoModifyPayload>) => {
            const todo = state.todoInProgress[action.payload.todoIndex];
            const field = action.payload.field;
            if ('completed' === field) {
                todo.completed = action.payload.value;
            } else if ('title' === field) {
                todo.title = action.payload.value;
            } else if ('description' === field) {
                todo.description = action.payload.value;
            } else if ('priority' === field) {
                todo.priority = action.payload.value;
            }
        },
        sortByCreationTime: (state) => {
            state.sortByCreationTime = true;
            state.sortByPriority = false;
            state.todoInProgress.sort((todo1, todo2) => todo1.creationTime - todo2.creationTime);
        },
        sortByPriority: (state) => {
            state.sortByCreationTime = false;
            state.sortByPriority = true;
            state.todoInProgress.sort((todo1, todo2) => todo1.priority - todo2.priority);
        }
    },
});

export const { addTodo, deleteTodo, modifyTodo, sortByCreationTime, sortByPriority } = todoListSlice.actions;

export const todoListSelector = (state: {todoList: TodoListState}) => state.todoList;

export default todoListSlice.reducer;