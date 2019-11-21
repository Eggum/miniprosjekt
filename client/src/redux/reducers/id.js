// @flow

type Action = {
    +type: string,
    payload: number
};

// ID is set to 1, because 1 is the Anonym user in the database.
const idReducer = (state: number = 1, action: Action) => {
    switch (action.type) {
        case 'CHANGE_ID_NUMBER':
            return (state = action.payload);
        default:
            return state;
    }
};

export default idReducer;
