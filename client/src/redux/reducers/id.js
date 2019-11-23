// @flow

/**
 * The reducer that alters the id state.
 *
 * from redux.js.org:
 * Reducers specify how the application's state changes in response to actions sent to the store.
 * The reducer is a pure function that takes the previous state and an action, and returns the next state.
 */

type Action = {
    +type: string,
    payload: number
};

/*
ID is set to 1, because 1 is the "Anonym" user in the database.
The "Anonym" user is used to post comments as "Anonym" when user is not logged in.
 */

const idReducer = (state: number = 1, action: Action) => {
    switch (action.type) {
        case 'CHANGE_ID_NUMBER':
            return (state = action.payload);
        default:
            return state;
    }
};

export default idReducer;
