// // // import axios from 'axios'
// // // import React from 'react'
// // // import { useEffect } from 'react'
// // // import { serverUrl } from '../App'
// // // import { useDispatch, useSelector } from 'react-redux'
// // // import { setUserData,setCity } from '../redux/userSlice'

// // // const useGetCity = () => {
// // //   const dispatch=useDispatch()
// // //   const apikey=import.meta.env.VITE_GEOAPIKEY
// // //   const {userData}=useSelector(state=>state.user)
// // //   useEffect(()=>{
// // //   navigator.geolocation.getCurrentPosition( async(position)=>{
// // //       console.log(position);
// // //     const latitude=position.coords.latitude
// // //     const longitude=position.coords.longitude
// // //     const result= await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`)
// // //      console.log(result.data.results[0].city);
    
// // //     dispatch(setCity(result?.data?.results[0].city))
// // //   })
// // //   },[userData])
   

// // // }

// // // export default useGetCity


// // import axios from "axios";
// // import { useEffect } from "react";
// // import { useDispatch } from "react-redux";
// // import { setCity } from "../redux/userSlice";

// // const useGetCity = () => {
// //   const dispatch = useDispatch();
// //   const apiKey = import.meta.env.VITE_GEOAPIKEY;

// //   useEffect(() => {
// //     navigator.geolocation.getCurrentPosition(
// //       async (position) => {
// //         try {
// //           const latitude = position.coords.latitude;
// //           const longitude = position.coords.longitude;

// //           const result = await axios.get(
// //             `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
// //           );

// //           //   check
// //           if (!result?.data?.results?.length) return;

// //           const data = result.data.results[0];

// //           // city fallback
// //           const cityName =
// //             data.city ||
// //             data.town ||
// //             data.village ||
// //             data.state ||
// //             "Unknown";

// //           console.log("CITY:", cityName);

// //           dispatch(setCity(cityName));
// //         } catch (error) {
// //           console.log("Geo error:", error);
// //         }
// //       },
// //       (error) => {
// //         console.log("Location permission denied:", error);
// //       }
// //     );
// //   }, []); 
// // };

// // export default useGetCity;
// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { setCity } from "../redux/userSlice";

// const useGetCity = () => {
//   const dispatch = useDispatch();
//   const apiKey = import.meta.env.VITE_GEOAPIKEY;

//   useEffect(() => {

//     // ✅ CHECK 1 - API Key check
//     console.log("🔑 API Key:", apiKey);
//     console.log("🔑 API Key defined?", apiKey ? "YES ✅" : "NO ❌ - KEY MISSING!");

//     // ✅ CHECK 2 - Geolocation supported?
//     if (!navigator.geolocation) {
//       console.log("❌ Geolocation not supported by browser!");
//       return;
//     } else {
//       console.log("✅ Geolocation is supported");
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {

//         // ✅ CHECK 3 - Location mila?
//         const latitude = position.coords.latitude;
//         const longitude = position.coords.longitude;
//         console.log("📍 Location found ✅");
//         console.log("📍 Latitude:", latitude);
//         console.log("📍 Longitude:", longitude);

//         try {
         
//            const url=`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${VITE_GEOAPIKEY}`
//           // ✅ CHECK 4 - URL check
//           console.log("🌐 Calling URL:", url);

//           const result = await axios.get(url);

//           // ✅ CHECK 5 - API response
//           console.log("📦 API Response status:", result.status);
//           console.log("📦 API Response data:", result.data);

//           if (!result?.data?.results?.length) {
//             console.log("❌ No results in API response!");
//             return;
//           }

//           const data = result.data.results[0];
//           console.log("📦 First result:", data);

//           const cityName =
//             data.city ||
//             data.town ||
//             data.village ||
//             data.state ||
//             "Unknown";

//           // ✅ CHECK 6 - City name
//           console.log("🏙️ City found:", cityName);

//           dispatch(setCity(cityName));
//           console.log("✅ City dispatched to Redux:", cityName);

//         } catch (error) {
//           // ✅ CHECK 7 - Error details
//           console.log("❌ Geo error:", error.message);
//           console.log("❌ Error status:", error.response?.status);
//           console.log("❌ Error details:", error.response?.data);
//         }
//       },
//       (error) => {
//         // ✅ CHECK 8 - Location permission
//         console.log("❌ Location permission denied!");
//         console.log("❌ Error code:", error.code);
//         console.log("❌ Error message:", error.message);
//       }
//     );
//   }, []);
// };

// export default useGetCity;


import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCity } from "../redux/userSlice";

const useGetCity = () => {
  const dispatch = useDispatch();
  const apiKey = import.meta.env.VITE_GEOAPIKEY;

  useEffect(() => {
    if (!apiKey) {
      console.log("API key missing");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const url =
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`;

          const result = await axios.get(url);

          if (!result?.data?.results?.length) return;

          const data = result.data.results[0];

          const cityName =
            data.city ||
            data.town ||
            data.village ||
            data.state ||
            "Unknown";

          dispatch(setCity(cityName));
        } catch (error) {
          console.log("Geo error:", error.message);
        }
      },
      (error) => {
        console.log("Location error:", error.message);
      }
    );
  }, [apiKey, dispatch]);
};

export default useGetCity;