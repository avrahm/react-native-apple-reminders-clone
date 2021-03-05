//action types
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const MARK_TODO_PENDING = 'MARK_TODO_PENDING';
export const UPDATE_TODO = 'UPDATE_TODO';
export const TOGGLE_SHOWALL_TODOS = 'TOGGLE_SHOWALL_TODOS';
export const TOGGLE_SHOW_SEARCH_RESULTS = 'TOGGLE_SHOW_SEARCH_RESULTS';
export const DELETE_LIST = 'DELETE_LIST';
export const ADD_LIST = 'ADD_LIST';
export const UPDATE_LIST = 'UPDATE_LIST';
export const LOAD_DATA = 'LOAD_DATA';

//useDispatch allows functional components to access the dispatch method 
//to use the dispatch method, simply dispatch the action  type and payload
// const dispatch = useDispatch();
//can't setup dispatch outside of a functional component

//action creators
export const addTodo = newTodo => dispatch => dispatch({ type: ADD_TODO, payload: newTodo });

export const deleteTodo = todo => dispatch => dispatch({ type: DELETE_TODO, payload: todo });

export const completeTodo = todo => dispatch => dispatch({ type: COMPLETE_TODO, payload: todo });

export const markTodoPending = todo => dispatch => dispatch({ type: MARK_TODO_PENDING, payload: todo });

export const updateTodo = todo => dispatch => dispatch({ type: UPDATE_TODO, payload: todo });

export const toggleShowAllTodos = listId => dispatch => dispatch({ type: TOGGLE_SHOWALL_TODOS, payload: listId });

export const toggleShowSearchResults = bool => dispatch => dispatch({ type: TOGGLE_SHOW_SEARCH_RESULTS, payload: bool });

export const deleteList = list => dispatch => dispatch({ type: DELETE_LIST, payload: list });

export const addList = list => dispatch => dispatch({ type: ADD_LIST, payload: list });

export const updateList = list => dispatch => dispatch({ type: UPDATE_LIST, payload: list });

export const loadData = data => dispatch => dispatch({ type: LOAD_DATA, payload: data });