import React, {Component} from 'react';
import  {
  View,
  AppRegistry
} from 'react-native';

import store from '../store';
import AddTodo from './addTodo';
import TodoList from './todoList';
import Filter from './filter';
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


  toggleTodo = (todo) => {
    store.dispatch({
      type: actionTypes.TOGGLE_TODO,
      todo: todo
    });
  }

  showAll = () => {
    store.dispatch({
      type: actionTypes.SHOW_ALL
    })
  }

  completed = () => {
    store.dispatch({
      type: actionTypes.COMPLETED
    })
  }

  inComplete = () => {
    store.dispatch({
      type: actionTypes.IN_COMPLETE
    })
  }

  render () {
    const showAll = {text: 'All', handler: this.showAll };
    const completed={text: 'Done', handler: this.completed };
    const inComplete={text: 'Pending', handler: this.inComplete };

    return (
            <View>
              <TodoList
                todos = {this.state.todos}
                toggleTodo = {this.toggleTodo}
              ></TodoList>
              <Filter
                showAll={showAll}
                completed={completed}
                inComplete={inComplete}
              ></Filter>
            </View>
          );
  }
}
