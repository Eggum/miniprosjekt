// @flow


export function changeName(payload : string){
    return { type: 'CHANGE_NAME', payload}
}

export function logIn(){
    return { type: 'SIGN_IN'}
}

export function logOut(){
    return { type: 'SIGN_OUT'}
}

export function changeId(payload : number){
    return { type: 'CHANGE_ID_NUMBER', payload}
}