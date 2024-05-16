import { createSlice } from "@reduxjs/toolkit";
const initialState = {
   products :[],
   cartData :[]
}

const product = createSlice({
    name:'product',
    initialState:initialState,
    reducers:{
        createPro:(state,action)=>{
            console.log(action.payload);
          state.products.push(action.payload)
        },
        updatePro:(state,action)=>{
            const {id,...updatedData} = action.payload;
            let findUser = state.products.findIndex((item)=>item.id === id)

            state.products[findUser] = updatedData;
        },
        deletePro:(state,action)=>{
            let id = action.payload;
            let findUser = state.products.findIndex((item)=>item.id === id)
            state.products.splice(findUser,1)
        },
        addToCart:(state,action)=>{
            let id = action.payload.id;
            let findUser = state.cartData.findIndex((item)=>item.id === id)
            console.log(findUser);
            if(findUser != -1){
            alert('Already in cart')
            }else{
                state.cartData.push(action.payload);
            }
        },
        increment:(state,action)=>{
            console.log(action.payload);
            let id = action.payload;
            let findUser = state.cartData.findIndex((item)=>item.id === id)
            console.log(findUser);
            if(state.cartData[findUser]){
                state.cartData[findUser].qnt += 1
            }
        },
        decrement:(state,action)=>{
            let id = action.payload;
            let findUser = state.cartData.findIndex((item)=>item.id === id)
            console.log(findUser);
            if(state.cartData[findUser]){
                if(state.cartData[findUser].qnt >1){
                    state.cartData[findUser].qnt -= 1
                }else{
                    state.cartData.splice(findUser,1)
                }
            }
        },
        removefromCart:(state,action)=>{
            let id = action.payload;
            let findUser = state.cartData.findIndex((item)=>item.id === id)
            state.cartData.splice(findUser,1)
        }
    }
});

export const {createPro,updatePro,deletePro,addToCart,increment,decrement,removefromCart} = product.actions;
export const getAllProduct = state=>state.product.products;
export const getCartProduct = state=>state.product.cartData;
export default product.reducer;