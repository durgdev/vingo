import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";
import uploadOnCloundinary from "../utils/cloudinary.js";

export const addItem=async(req , res)=>{
      try {
        const {name,category,foodType,price}=req.body
        let image=null;
        if(req.file){
            image=await uploadOnCloundinary(req.file.path)
        }
   
        const shop= await Shop.findOne({owner:req.userId})
             if(!shop){
            return res.status(400).json({message:"shop not found"})
        }
       const item =await Item.create({
        name,category,foodType,price,image,shop:shop._id
       })
       shop.items.push(item._id)
       await shop.save()
       await shop.populate("items owner")
      return res.status(201).json(shop);
      } catch (error) {
        console.log("ADD ITEM ERROR:", error) 
        return res.status(500).json({message:` add item error ${error}`})
      }
}



// export const editItem = async (req, res) => {
//   try {
//      const itemId=req.params.itemId
//       const {name,category,foodType,price}=req.body
//       const item = await Item.findById(itemId)
//     let image = item.image
//       if(req.file){
//         image=await uploadOnCloundinary(req.file.path)
//       }
//       const item=await Item.findByIdAndUpdate(itemId,{
//         name,category,foodType,price,image
//       },{new:true})
//       if(!item){
//        return res.status(400).json({message:"item not found"})
//       }
//      return res.status(200).json(item)
//   } catch (error) {
//     return res.status(500).json({message:`edit item error ${error}`})
//   }

export const getItembyId=async (req,res)=>{
   try {
        const itemId=req.params.itemId
        const item=await Item.findById(itemId)
        if(!item){
          return res.status(400).json({message: "item not found"})
        }
        return res.status(200).json(item)
   } catch (error) {
       return res.status(500).json({message:`get item by Id error ${error}`})
   }
}

export const editItem = async (req, res) => {
  try {
    const itemId = req.params.itemId
    const { name, category, foodType, price } = req.body

    // ✅ get existing item
    const item = await Item.findById(itemId)

    if (!item) {
      return res.status(400).json({ message: "item not found" })
    }

    // ✅ keep old image
    let image = item.image

    if (req.file) {
      image = await uploadOnCloundinary(req.file.path)
    }

    // ✅ CHANGE VARIABLE NAME HERE
    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      {
        name,
        category,
        foodType,
        price,
        image
      },
      { new: true }
    )

    return res.status(200).json(updatedItem)

  } catch (error) {
    console.log("EDIT ITEM ERROR:", error)
    return res.status(500).json({ message: `edit item error ${error}` })
  }
}

// export const deleteItem=async(req,res)=>{
//   try {
//     const itemId=req.params.itemId
//     const item=await Item.findByIdAndDelete(itemId)
//      if(!item){
//           return res.status(400).json({message: "item not found"})
//         }
//         const shop=await Shop.findOne({owner:req.userId})
//         shop.items=shop.items.filter(i=>i._id!==item._id)
//         await shop.save()
//         await shop.populate("items")
//         return res.status(200).json(shop)
//   } catch (error) {
//        return res.status(500).json({ message: `delete item error ${error}` })
//   }
// }
export const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    const item = await Item.findByIdAndDelete(itemId);

    if (!item) {
      return res.status(400).json({ message: "item not found" });
    }

    const shop = await Shop.findOne({ owner: req.userId });

    shop.items = shop.items.filter(
      i => i.toString() !== item._id.toString()
    );

    await shop.save();
    await shop.populate("items owner");

    return res.status(200).json(shop);

  } catch (error) {
    return res.status(500).json({ message: `delete item error ${error}` });
  }
};

// export const getItemByCity=async(req,res)=>{
//   try {
//     const {city}=req.params
//     if(!city){
//       return res.status(400).json({message:"city is required"})
      
//           const shops = await Shop.find({
//             city: { $regex: `^${cleanCity}$`, $options: "i" } // ✅ exact match ignore case
//           });
      
//           if (shops.length === 0) {
//             return res.status(404).json({ message: "No shops found" });
//           }
//       const shopIds=shops.map((shop)=>shop._id)
//       const items=await.find({shop:{$in:shopIds}})
//       return res.status(200).json({message:`delete item error ${error}`})
//     }

//   } catch (error) {
//      return res.status(500).json({ message: `get item error by city ${error}` });
//   }
// }
export const getItemByCity = async (req, res) => {
  try {
    const { city } = req.params;

    if (!city) {
      return res.status(400).json({ message: "city is required" });
    }

    // ✅ clean city (optional but good)
    const cleanCity = city.trim();

    // ✅ find shops in that city
    const shops = await Shop.find({
      city: { $regex: `^${cleanCity}$`, $options: "i" } // ignore case
    });

    if (shops.length === 0) {
      return res.status(404).json({ message: "No shops found" });
    }

    // ✅ get shop ids
    const shopIds = shops.map((shop) => shop._id);

    // ✅ find items of those shops
    const items = await Item.find({
      shop: { $in: shopIds }
    });

    return res.status(200).json(items);

  } catch (error) {
    console.log("GET ITEM BY CITY ERROR:", error);
    return res.status(500).json({
      message: `get item by city error ${error.message}`
    });
  }
};