// @flow

/**
 * The reducer that alters state that indicates if the user is logged in or not.
 * By default the state is false, user is not logged in.
 *
 * from redux.js.org:
 * Reducers specify how the application's state changes in response to actions sent to the store.
 * The reducer is a pure function that takes the previous state and an action, and returns the next state.
 */

type Action = {
    +type: string
};

const loggedReducer = (state: boolean = false, action: Action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return (state = true);
        case 'SIGN_OUT':
            return (state = false);
        default:
            return state;
    }
};

export default loggedReducer;
