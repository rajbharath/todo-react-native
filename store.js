const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    console.log('Adding todo');
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }

  const subscribe = (listener) => {
    console.log('Subscribed');
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }

  dispatch({});

  return {getState, dispatch, subscribe};
}


todos = (state = [{ id: 1, text: 'Learn React', completed: false }], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return state.concat(action.item);
    default:
      return state;
  }
}

module.exports = createStore(todos);
