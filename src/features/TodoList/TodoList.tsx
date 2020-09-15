import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { todoListSelector } from './todoListSlice';
import { View, Button, StyleSheet, Text } from 'react-native';
import { addTodo, sortByPriority, sortByCreationTime } from './todoListSlice';
import TodoEntry from '../TodoEntry/TodoEntry';

const TodoList = () => {
    const todoList = useSelector(todoListSelector);
    const dispath = useDispatch();

    return (
        <View>
            <View style={styles.sortButtonGroup}>
                <Text>Sort By: </Text>
                <View style={styles.sortButton}>
                    <Button 
                        testID={'sortByPriority'}
                        title={'Priority'}
                        onPress={(event) => dispath(sortByPriority())}
                    />
                </View>
                <View style={styles.sortButton}>
                    <Button 
                        testID={'sortByTime'}
                        title={'Time'}
                        onPress={(event) => dispath(sortByCreationTime())}
                    />
                </View>
            </View>
            {
                todoList.todoInProgress.map((todo, index) => <TodoEntry todo={todo} index={index} key={index}/>)
            }
            <Button 
                testID={'newTodo'}
                title={'New Todo'}
                onPress={(event) => dispath(addTodo())}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    sortButtonGroup: {
        flexDirection: 'row',
        paddingVertical: 2,
    },
    sortButton: {
        flex: 0.3,
        paddingHorizontal: 2,
    }
});

export default TodoList;