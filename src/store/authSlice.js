import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    userName: "root",
    password: 'root',
    email: 'root@gmail.com',
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => {
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
        addUserDetails: (state, action) => {
            state.userName = action.payload.userName;
            state.password = action.payload.password;
        }
    },
});

export const {login, logout, addUserDetails} = authSlice.actions;
export default authSlice.reducer;
