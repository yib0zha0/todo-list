import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { View, StyleSheet, TextInput, Picker, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteTodo, modifyTodo, todoListSelector } from '../TodoList/todoListSlice';

export interface Todo {
    readonly id: string,
    completed: boolean,
    title: string,
    description: string,
    priority: number,
    readonly creationTime: number,
};

const TodoEntry = (props : {todo: Todo, index: number}) => {
    const dispatch = useDispatch();
    return (
        <View 
            style={styles.mainView}
            testID={props.todo.id}
        >
            <View style={styles.header}>
                <CheckBox 
                    testID={`checkbox-${props.todo.id}`}
                    style={styles.checkbox}
                    disabled={false}
                    value={props.todo.completed}
                    onValueChange={(newValue) => dispatch(modifyTodo({todoIndex: props.index, field: 'completed', value: newValue}))}
                />
                <TextInput 
                    style={styles.title}
                    placeholder={'Title'}
                    value={props.todo.title}
                    onChangeText={(text) => dispatch(modifyTodo({todoIndex: props.index, field: 'title', value: text}))}
                />
                <View style={styles.priority}>
                    <Picker
                        selectedValue={props.todo.priority.toString()}
                        onValueChange={(itemValue, itemIndex) => dispatch(modifyTodo({todoIndex: props.index, field: 'priority', value: parseInt(itemValue)}))}>
                        <Picker.Item label="Urgent" value="1" />
                        <Picker.Item label="High" value="2" />
                        <Picker.Item label="Medium" value="3" />
                        <Picker.Item label="Low" value="4" />
                    </Picker>
                </View>
                
                <View style={styles.delete}>
                    <Button 
                        testID={`delete-${props.todo.id}`}
                        title={'X'}
                        onPress={() => dispatch(deleteTodo(props.index))}
                        color={'red'}
                    />
                </View>
            </View>
            <TextInput 
                style={styles.content}
                placeholder={'Description'}
                value={props.todo.description}
                onChangeText={(text) => dispatch(modifyTodo({todoIndex: props.index, field: 'description', value: text}))}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: {
        padding: 5,
        backgroundColor: 'floralwhite',
        borderWidth: 2,
        borderColor: 'lavender',
    },
    header: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 2,
        borderBottomColor: 'lavender',
    },
    checkbox: {
        flex: 0.1,
    },
    title: {
        flex: 0.6,
        fontSize: 20,
    },
    priority: {
        flex: 0.3,
    },
    delete: {
        flex: 0.1,
    },
    content: {
    }
});

export default TodoEntry;