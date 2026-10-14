// import { Router } from "express";
// import Property from "./property.model.js";

// export const createProperty = async (propertyData) => {
//   const property = await Property.create(propertyData);

//   return property;
// };

// export const getAllProperties = async (propertyData) => {
//   // const properties = await Property.find().populate("owner", "name email");
//     const properties = await Property.find();
//     return properties
// };

// export const updateProperty = async (propertyId, updateData) => {
//   const property = await Property.findByIdAndUpadate(
//     propertyId, 
//     updateData,
//     {
//         new:true,
//         runValidators:true

//     }
//   );
//   return property
// };


// export const deleteProperty = async(propertyId)=>{
//     const property = await Property.findByIdAndDelete(
//         propertyId
//     )
//     return property;

// }


import Property from "./property.model.js";


// ==========================================
// CREATE PROPERTY
// ==========================================

export const createProperty = async (propertyData) => {

  const property =
    await Property.create(propertyData);

  return property;
};


// ==========================================
// GET ALL PROPERTIES
// ==========================================

export const getAllProperties = async () => {

  const properties =
    await Property.find()
      // .populate("owner", "fullName email");

  return properties;
};


// ==========================================
// GET PROPERTY BY ID
// ==========================================

export const getPropertiyById = async (id) => {
  const property =
    await Property.findById(id)
      .populate("owner", "fullName email");

  return property;
};

export const getPropertyById = getPropertiyById;


// ==========================================
// UPDATE PROPERTY
// ==========================================

export const updateProperty = async (
  id,
  propertyData
) => {

  const property =
    await Property.findByIdAndUpdate(
      id,
      propertyData,
      {
        new: true,
        runValidators: true,
      }
    );

  return property;
};


// ==========================================
// DELETE PROPERTY
// ==========================================

export const deleteProperty = async (id) => {

  const property =
    await Property.findByIdAndDelete(id);

  return property;
};