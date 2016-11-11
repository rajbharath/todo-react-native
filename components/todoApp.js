import React, {Component} from 'react';
import  {
  View,
  AppRegistry
} from 'react-native';

import store from '../store';
import AddTodo from './addTodo';
import TodoList from './todoList';
import actionTypes from '../action/actionTypes';

export default class TodoApp extends Component {
  constructor () {
    super();

    this.state = {
      todos: store.getState()
    };

    store.subscribe(() => {
      this.setState({
        todos: store.getState()
      });
    });

  }

  addTodo = (todo) => {
    store.dispatch({
      type: actionTypes.ADD_TODO,
      todo: todo
    });
  }

  render () {
    return (
            <View>
              <TodoList
                todos = {this.state.todos}
              ></TodoList>
              <AddTodo
              onSubmitEditing={(todo) => { this.addTodo(todo); }}
              ></AddTodo>
            </View>
          );
  }
}
