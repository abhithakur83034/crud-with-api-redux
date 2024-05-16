import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user:[]
}

const user = createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        createUser:(state,action)=>{
            state.user.push(action.payload)
        },
        updateUser:(state,action)=>{
            console.log(action.payload);
            const {id,...updatedData} = action.payload;
            let findUser = state.user.findIndex((item)=>item.id === id)

            state.user[findUser] = updatedData;
        },
        deleteUser:(state,action)=>{
            let id = action.payload;
            let findUser = state.user.findIndex((item)=>item.id === id)

            state.user.splice(findUser,1)
        }
    }
});

export const {createUser,updateUser,deleteUser} = user.actions
export const getUsers = state=>state.user.user;
export default user.reducer;