import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null,
        city:null,
        shopInMyCity:null,
        itemsInMyCity:null
    },
    reducers:{
        setUserData:(state,action)=>{
         state.userData=action.payload
        },
        setCity:(state,action)=>{
            state.city=action.payload
        },
         setShopInMyCity:(state,action)=>{
            state.shopInMyCity=action.payload
        },
         setItemsInMyCity:(state,action)=>{
            state.itemsInMyCity=action.payload
        }
    }
})
export const {setUserData,setCity,setShopInMyCity,setItemsInMyCity}=userSlice.actions
export default userSlice.reducer