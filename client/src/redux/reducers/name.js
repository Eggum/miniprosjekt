// @flow

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
