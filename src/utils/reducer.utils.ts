import { AnyAction } from "redux";

export type ActionTypeWithPayload<T, P> = {
    type: T;
    payload: P;
}

export type Action<T> = {
    type: T;
}

export function createAction<T extends string, P>(type: T, payload: P): ActionTypeWithPayload<T, P>;

export function createAction<T extends string, P>(type: T, payload: void): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
    return { type, payload }
}
