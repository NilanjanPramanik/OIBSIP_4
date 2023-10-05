import { createSlice} from '@reduxjs/toolkit'

export const usersSlice = createSlice({
    name: 'Users',
    initialState: {
        users: [{ username: "admin", password: "123" }]
    },
    reducers: {
        addToDB: (state, action) => {
            state.users.push(action.payload);
        },
    }
})

export const { addToDB } = usersSlice.actions;
export const userReducer = usersSlice.reducer;