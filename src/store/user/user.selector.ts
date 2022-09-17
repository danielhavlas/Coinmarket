import { RootState } from "../store.ts"
import { UserState } from "./user.reducer.ts"
export const selectorCurrentUser = (state: RootState): UserState => state.user.currentUser