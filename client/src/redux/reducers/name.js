// @flow

/**
 * The reducer that alters the username state.
 *
 * From redux.js.org:
 * Reducers specify how the application's state changes in response to actions sent to the store.
 * The reducer is a pure function that takes the previous state and an action, and returns the next state.
 */

type Action = {
    +type: string,
    payload: string
};

const nameReducer = (state: string = 'no name', action: Action) => {
    switch (action.type) {
        case 'CHANGE_NAME':
            return (state = action.payload);
        default:
            return state;
    }
};

export default nameReducer;
