export const USER_ACTION_TYPE = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {
const {type, payload} = action

    switch(type){
        case 'SET_CURRENT_USER':
        return{
            currentUser: payload
        }
        default:
        throw new Error(`Unhandled type ${type} in userReducer`)
    }

}
