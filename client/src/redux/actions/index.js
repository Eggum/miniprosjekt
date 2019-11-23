// @flow

/**
 * The actions the application can use to send data to the store.
 *
 * Info from redux.js.org:
 * Actions are payloads of information that send data from your application to your store. They are the only source of information for the store.
 * Actions are plain JavaScript objects. Actions must have a type property that indicates the type of action being performed.
 * Remember that actions only describe what happened, but don't describe how the application's state changes.
 */

export function changeName(payload: string) {
    return { type: 'CHANGE_NAME', payload };
}

export function logIn() {
    return { type: 'SIGN_IN' };
}

export function logOut() {
    return { type: 'SIGN_OUT' };
}

export function changeId(payload: number) {
    return { type: 'CHANGE_ID_NUMBER', payload };
}
