// import axios from 'axios'
// import React from 'react'
// import { useEffect } from 'react'
// import { serverUrl } from '../App'
// import { useDispatch, useSelector } from 'react-redux'
// import { setUserData,setCity } from '../redux/userSlice'

// const useGetCity = () => {
//   const dispatch=useDispatch()
//   const apikey=import.meta.env.VITE_GEOAPIKEY
//   const {userData}=useSelector(state=>state.user)
//   useEffect(()=>{
//   navigator.geolocation.getCurrentPosition( async(position)=>{
//       console.log(position);
//     const latitude=position.coords.latitude
//     const longitude=position.coords.longitude
//     const result= await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`)
//      console.log(result.data.results[0].city);
    
//     dispatch(setCity(result?.data?.results[0].city))
//   })
//   },[userData])
   

// }

// export default useGetCity


import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCity } from "../redux/userSlice";

const useGetCity = () => {
  const dispatch = useDispatch();
  const apiKey = import.meta.env.VITE_GEOAPIKEY;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const result = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
          );

          //   check
          if (!result?.data?.results?.length) return;

          const data = result.data.results[0];

          // city fallback
          const cityName =
            data.city ||
            data.town ||
            data.village ||
            data.state ||
            "Unknown";

          console.log("CITY:", cityName);

          dispatch(setCity(cityName));
        } catch (error) {
          console.log("Geo error:", error);
        }
      },
      (error) => {
        console.log("Location permission denied:", error);
      }
    );
  }, []); 
};

export default useGetCity;