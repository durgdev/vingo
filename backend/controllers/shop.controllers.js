import Shop from "../models/shop.model.js";
import uploadOnCloundinary from "../utils/cloudinary.js";


export const createEditShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body

    if (!name || !city || !state || !address) {
      return res.status(400).json({
        message: "All fields are required"
      })
    }

    let shop = await Shop.findOne({ owner: req.userId })

    let image = shop?.image || null

    if (req.file) {
     // console.log("Uploading image:", req.file.path)
      image = await uploadOnCloundinary(req.file.path)
    }

    if (!shop) {
      shop = await Shop.create({
        name,
        city,
        state,
        address,
        image,
        owner: req.userId
      })
    } else {
      shop = await Shop.findByIdAndUpdate(
        shop._id,
        { name, city, state, address, image },
        { new: true }
      )
    }

    await shop.populate("owner items")

    return res.status(201).json(shop)

  } catch (error) {
    console.log("CREATE SHOP ERROR:", error)   // ✅ MUST
    return res.status(500).json({
      message: `create shop error ${error.message}`
    })
  }
}


// export const getMyshop=async (req,res)=>{
//     try {
//         const shop = await Shop.findOne({owner:req.userId}).populate("owner items")
//         if(!shop){
        
          
//              return res.status(404).json({ message: "Shop not found" })
           
             
//         }
//         return res.status(200).json(shop)
//     } catch (error) {
//         return res.status(500).json({message:`get my shop error ${error}`})
//     }
// }

export const getMyshop = async (req, res) => {
  try {
    //console.log("USER ID:", req.userId);
    const shop = await Shop.findOne({ owner: req.userId }).populate("owner items");
   // console.log("SHOP FOUND:", shop);

    if (!shop) {
     // console.log(" shop nahi hai");
      return res.status(404).json({ message: "Shop not found" });
    }

    //console.log(" shop mil gaya");
    return res.status(200).json(shop);

  } catch (error) {
    return res.status(500).json({ message: `get my shop error ${error}` });
  }
};


// export const getShopByCity=async (req,res)=>{
//    try {
//        const {city}=req.params
//     const shops=await Shop.find({
//       city:{$regex:new RegExp(`${city}$`,"i")}
//     })
//     if(!shops){
//       return res.status(400).json({message:"shops not found"})
//     }
//     return res.status(200).json(shops)
//    } catch (error) {
//         return res.status(500).json({message:"get shop by city error"})
//    }
// }

export const getShopByCity = async (req, res) => {
  try {
    const { city } = req.params;

    const cleanCity = city.trim(); // ✅ remove spaces

    const shops = await Shop.find({
      city: { $regex: `^${cleanCity}$`, $options: "i" } // ✅ exact match ignore case
    });

    if (shops.length === 0) {
      return res.status(404).json({ message: "No shops found" });
    }

    return res.status(200).json(shops);

  } catch (error) {
    return res.status(500).json({
      message: `get shop by city error: ${error.message}`
    });
  }
};