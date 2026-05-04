import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setItemsInMyCity, setShopInMyCity, setUserData } from '../redux/userSlice'

const useGetItemByCity = () => {
     const dispatch=useDispatch()
     const {city}=useSelector(state=>state.user)
      useEffect(()=>{
        const fetchitems=async ()=>{
            try {
                const result= await axios.get(`${serverUrl}/api/item/get-by-city/${city}`,{withCredentials:true})
              dispatch(setItemsInMyCity(result.data))
              console.log(result.data);
              
            
            } catch (error) {
                console.log(error);
                
            }
            
        }
             fetchitems()

      },[city])
}

export default useGetItemByCity