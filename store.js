import UUID from 'react-native-uuid';
import Realm from 'realm';
import actionTypes from './action/actionTypes';

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
    case actionTypes.ADD_TODO:
      action.todo.key = UUID.v1();
      action.todo.completed = false;
      action.todo.createdAt = new Date();
      action.todo.lastUpdatedAt = new Date();
      realm.write(() => {
        let todo = realm.create('Todo', action.todo)
      });
      return realm.objects('Todo').sorted('createdAt', true);
    case actionTypes.TOGGLE_TODO:
      realm.write(() => {
        action.todo.lastUpdatedAt = new Date();
        action.todo.completed = !action.todo.completed;
      });
      return realm.objects('Todo').sorted('createdAt', true);
    default:
      return realm.objects('Todo').sorted('createdAt', true);
  }
}

// Migrations
let Todo1 = {
  name: 'Todo',
  primaryKey: 'key',
  properties: {
    key: 'string',
    text: 'string',
    completed: 'bool'
  }
};

let Todo2 = {
  name: 'Todo',
  primaryKey: 'key',
  properties: {
    key: 'string',
    text: 'string',
    completed: 'bool',
    createdAt: 'date',
    lastUpdatedAt: 'date'
  }
};

let todo2Migration = function (oldRealm, newRealm) {
  if (oldRealm.schemaVersion < 1) {
    var oldObjects = oldRealm.objects('Todo');
    var newObjects = newRealm.objects('Todo');

    for (var i = 0; i < oldObjects.length; i++) {
      newObjects[i].createdAt = new Date();
      newObjects[i].lastUpdatedAt = new Date();
    }
  }
}

let todoSchemas = [
  { schema: [Todo1], schemaVersion: 0},
  { schema: [Todo2], schemaVersion: 1, migration: todo2Migration}
];

var nextSchemaIndex = Realm.schemaVersion(Realm.defaultPath);
while (nextSchemaIndex < todoSchemas.length) {
  var migratedRealm = new Realm(todoSchemas[nextSchemaIndex++]);
  migratedRealm.close();
}

let realm = new Realm(todoSchemas[todoSchemas.length-1]);

module.exports = createStore(todos);
