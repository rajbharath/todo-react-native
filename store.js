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


todos = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return state.concat(action.todo);
    default:
      return state;
  }
}

module.exports = createStore(todos);
