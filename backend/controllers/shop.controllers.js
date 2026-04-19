import Shop from "../models/shop.model.js";
import uploadOnCloundinary from "../utils/cloudinary.js";

// export const createEditShop = async (req, res) => {
//     try {
        
//         const { name, city, state, address } = req.body
//         if (!name || !city || !state || !address) {
//             return res.status(400).json({
//                 message: "All fields are required"
//             })
//         }
    
//         let image = null;
//         if (req.file) {
//             image = await uploadOnCloundinary(req.file.path)
//         }
//         console.log("FILE RECEIVED:", req.file)
        
//         let shop=await Shop.findOne({owner:req.userId})
//         if(!shop){
//             shop=await Shop.create({
//             name, city, state, address, image, owner: req.userId
//         })
//         }else {
//              shop=await Shop.findByIdAndUpdate({
//             name, city, state, address, image, owner: req.userId},{new:true})
//         }
        
//         await shop.populate("owner")
//         return res.status(201).json(shop)
        
//     } catch (error) {
//         return res.status(500).json({ message: `create shop error ${error}` })
//     }
// }

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


export const getMyshop=async (req,res)=>{
    try {
        const shop = await Shop.findOne({owner:req.userId}).populate("owner items")
        if(!shop){
             return res.status(404).json({ message: "Shop not found" })
        }
        return res.status(200).json(shop)
    } catch (error) {
        return res.status(500).json({message:`get my shop error ${error}`})
    }
}