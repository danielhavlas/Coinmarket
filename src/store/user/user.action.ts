import { User } from "firebase/auth";
import { createAction, ActionTypeWithPayload, withMatcher } from "../../utils/reducer.utils.ts";
import { USER_ACTION_TYPES } from "./user.types.ts";

export type SetCurrentUser = ActionTypeWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, User>

export const setCurrentUser = withMatcher((user: User): SetCurrentUser => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))