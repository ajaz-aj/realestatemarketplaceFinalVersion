// import * as propertyService from "./property.service.js";

// export const createProperty = async (req, res) => {
//   try {
//     const propertyData = req.body;
//     const property = await propertyService.createProperty(propertyData);
//     res.status(201).json({
//       success: true,
//       message: "Property created successfully",
//       data: property,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const getProperties = async (req, res) => {
//   try {
//     const properties = await propertyService.getAllProperties();

//     res.status(200).json({
//       success: true,
//       data: properties,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const getProperty = async (req, res) => {
//   try {
//     const property = await propertyService.getPropertiyById(req.params.id);
//     if (!property) {
//       return res.status(404).json({
//         success: true,
//         message: "property not found",
//       });
//     }
//     res.status(200).json({
//       success: true,
//       data: property,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }

// }
// export const updateProperty = async (req, res) => {
//   try {

//     const property =
//       await propertyService.updateProperty(
//         req.params.id,
//         req.body
//       );

//     if (!property) {
//       return res.status(404).json({
//         success: false,
//         message: "Property not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Property updated successfully",
//       data: property
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message
//     });

//   }
// };

// export const deleteProperty = async (req, res) => {
//   try {
//     const property = await propertyService.deleteProperty(req.params.id);

//     if (!property) {
//       return res.status(404).json({
//         success: false,
//         message: "Property not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Property deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };



import * as propertyService from "./property.service.js";

// ==========================================
// CREATE PROPERTY
// ==========================================

export const createProperty = async (req, res) => {
  try {
    const propertyData = {
      ...req.body,
    };

    // Format location if received as individual fields
    if (!propertyData.location || typeof propertyData.location !== "object") {
      propertyData.location = {
        address: propertyData.address || "",
        city: propertyData.city || "",
        state: propertyData.state || "",
        country: propertyData.country || "",
      };
    }

    // Keep listingType and listenType in sync
    if (propertyData.listingType && !propertyData.listenType) {
      propertyData.listenType = propertyData.listingType;
    } else if (propertyData.listenType && !propertyData.listingType) {
      propertyData.listingType = propertyData.listenType;
    }

    // Attach owner if logged in
    if (req.user && req.user.id) {
      propertyData.owner = req.user.id;
    }

    // Get uploaded images
    const imagePaths = req.files
      ? req.files.map(
          (file) => `/uploads/${file.filename}`
        )
      : [];

    if (imagePaths.length > 0) {
      propertyData.images = imagePaths;
      propertyData.image = imagePaths;
    }

    // Convert numbers if strings
    if (propertyData.price) propertyData.price = Number(propertyData.price);
    if (propertyData.bedrooms) propertyData.bedrooms = Number(propertyData.bedrooms);
    if (propertyData.bathrooms) propertyData.bathrooms = Number(propertyData.bathrooms);
    if (propertyData.area) propertyData.area = Number(propertyData.area);

    const property = await propertyService.createProperty(propertyData);

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: property,
    });
  } catch (error) {
    console.error("Create property error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// GET ALL PROPERTIES
// ==========================================

export const getProperties = async (req, res) => {
  try {

    const properties =
      await propertyService.getAllProperties();

    res.status(200).json({
      success: true,
      data: properties,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ==========================================
// GET SINGLE PROPERTY
// ==========================================

export const getProperty = async (req, res) => {
  try {

    const property =
      await propertyService.getPropertiyById(
        req.params.id
      );

    if (!property) {

      return res.status(404).json({
        success: false,
        message: "Property not found",
      });

    }

    res.status(200).json({
      success: true,
      data: property,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ==========================================
// UPDATE PROPERTY
// ==========================================

export const updateProperty = async (req, res) => {
  try {

    const property =
      await propertyService.updateProperty(
        req.params.id,
        req.body
      );

    if (!property) {

      return res.status(404).json({
        success: false,
        message: "Property not found",
      });

    }

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: property,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ==========================================
// DELETE PROPERTY
// ==========================================

export const deleteProperty = async (req, res) => {
  try {

    const property =
      await propertyService.deleteProperty(
        req.params.id
      );

    if (!property) {

      return res.status(404).json({
        success: false,
        message: "Property not found",
      });

    }

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};