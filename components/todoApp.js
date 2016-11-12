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
import filterTypes from '../action/filter/filterTypes';

const showAll={text: 'All', type: filterTypes.SHOW_ALL};
const completed={text: 'Done', type: filterTypes.COMPLETED};
const inComplete={text: 'Pending', type: filterTypes.IN_COMPLETE};

export default class TodoApp extends Component {

  constructor () {
    super();

    this.state = {
      todos: Array.from(store.getState()),
      filter: showAll
    };

    store.subscribe(() => {
      this.setState({
        todos: Array.from(store.getState())
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

  onFilter = (filter) => {
    if (filter !== this.state.filter) {
      this.setState({filter: filter})
    }
  }

  render () {
    let todos = this.state.todos.filter((todo) => {
      if (this.state.filter.type === filterTypes.COMPLETED) {
        return todo.completed;
      }

      if (this.state.filter.type === filterTypes.IN_COMPLETE) {
        return !todo.completed;
      }

      return true;
    });
    return (
            <View>
              <AddTodo
                onSubmitEditing={(todo) => { this.addTodo(todo); }}
              ></AddTodo>
              <TodoList
                todos = {todos}
                toggleTodo = {this.toggleTodo}
              ></TodoList>
              <Filter
                style={{flex: 1}}
                showAll={showAll}
                completed={completed}
                inComplete={inComplete}
                activeFilter={this.state.filter}
                onFilter={this.onFilter}
              ></Filter>
            </View>
          );
  }
}
