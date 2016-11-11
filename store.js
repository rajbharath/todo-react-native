import UUID from 'react-native-uuid';
import Realm from 'realm';

const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }

  dispatch({});

  return {getState, dispatch, subscribe};
}


todos = (state, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      action.todo.key = UUID.v1();
      action.todo.completed = false;
      realm.write(() => {
        let todo = realm.create('Todo', action.todo)
      });
      return realm.objects('Todo');
    default:
      return realm.objects('Todo');
  }
}

const Todo = {
  name: 'Todo',
  primaryKey: 'key',
  properties: {
    key: 'string',
    text: 'string',
    completed: 'bool'
  }
};

const realm = new Realm({schema: [Todo]});

module.exports = createStore(todos);
