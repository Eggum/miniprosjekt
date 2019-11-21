// @flow

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
