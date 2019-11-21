// @flow

export type ErrorResponse = {
    response: { status: number },
    message: string
};

export type UserResponse = {
    jwt: string,
    id: number
};
