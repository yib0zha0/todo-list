/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';
import { initialState } from '../src/features/TodoList/todoListSlice';
import { buildStore } from '../src/app/store';
import todoListReducer from '../src/features/TodoList/todoListSlice';
import { Provider } from 'react-redux';
import { Button, Picker } from 'react-native';
import { render, cleanup, fireEvent } from '@testing-library/react-native';

afterEach(cleanup);

describe('', () => {

  it('snapshot test', () => {
    const store = buildStore();
    const rendered = render(<Provider store={store}><App /></Provider>);
    const newTodoButton = rendered.getByTestId('newTodo');
    fireEvent.press(newTodoButton);
    const snapshot = rendered.toJSON();
    expect(snapshot).toMatchSnapshot();
    console.log()
  });

  it('add todo', () => {
    const store = buildStore();
    const rendered = render(<Provider store={store}><App /></Provider>);
    const newTodoButton = rendered.getByTestId('newTodo');
    fireEvent.press(newTodoButton);
    const todoList = store.getState().todoList;
    console.log(store.getState());
    expect(todoList.todoInProgress).toHaveLength(1);
    const todoEntry = todoList.todoInProgress[0];
    expect(todoEntry.id).toBeDefined();
    expect(todoEntry.completed).toBeFalsy();
    expect(todoEntry.priority).toBe(1);
    expect(todoEntry.creationTime).toBeDefined();
    expect(todoEntry.title).toHaveLength(0);
    expect(todoEntry.description).toHaveLength(0);
  })

  it('edit todo', () => {
    const store = buildStore();
    const rendered = render(<Provider store={store}><App /></Provider>);
    const title = 'New title';
    const description = 'New description';

    const newTodoButton = rendered.getByTestId('newTodo');
    fireEvent.press(newTodoButton);
    const titleInput = rendered.getByPlaceholderText('Title');
    fireEvent.changeText(titleInput, title);
    const descriptionInput = rendered.getByPlaceholderText('Description');
    fireEvent.changeText(descriptionInput, description);
    const checkbox = rendered.getByTestId('checkbox-todo-0');

    const todoList = store.getState().todoList;
    expect(todoList.todoInProgress).toHaveLength(1);
    const todoEntry = todoList.todoInProgress[0];
    expect(todoEntry.title).toBe(title);
    expect(todoEntry.description).toBe(description);
    expect(todoEntry.completed).toBeFalsy();
  })

  it('delete todo', () => {
    const store = buildStore();
    const rendered = render(<Provider store={store}><App /></Provider>);

    const newTodoButton = rendered.getByTestId('newTodo');
    fireEvent.press(newTodoButton);
    expect(store.getState().todoList.todoInProgress).toHaveLength(1);

    const deleteButton = rendered.getByTestId('delete-todo-0');
    fireEvent.press(deleteButton);
    expect(store.getState().todoList.todoInProgress).toHaveLength(0);
  });
});


