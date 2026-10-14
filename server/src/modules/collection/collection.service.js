import Collection from "./collection.model.js";

// ==========================================
// CREATE COLLECTION
// ==========================================

export const createCollection = async (collectionData) => {
  const collection = await Collection.create(
    collectionData
  );

  return collection;
};


// ==========================================
// GET ALL COLLECTIONS
// ==========================================

export const getAllCollections = async () => {
  const collections = await Collection.find({
    isActive: true,
  }).sort({
    displayOrder: 1,
  });

  return collections;
};


// ==========================================
// GET ALL COLLECTIONS FOR ADMIN
// ==========================================

export const getAllCollectionsAdmin = async () => {
  const collections = await Collection.find()
    .sort({
      displayOrder: 1,
    });

  return collections;
};


// ==========================================
// GET COLLECTION BY ID
// ==========================================

export const getCollectionById = async (id) => {
  const collection =
    await Collection.findById(id);

  return collection;
};


// ==========================================
// GET COLLECTION BY SLUG
// ==========================================

export const getCollectionBySlug = async (slug) => {
  const collection =
    await Collection.findOne({
      slug: slug,
      isActive: true,
    });

  return collection;
};


// ==========================================
// UPDATE COLLECTION
// ==========================================

export const updateCollection = async (
  id,
  collectionData
) => {
  const collection =
    await Collection.findByIdAndUpdate(
      id,
      collectionData,
      {
        new: true,
        runValidators: true,
      }
    );

  return collection;
};


// ==========================================
// DELETE COLLECTION
// ==========================================

export const deleteCollection = async (id) => {
  const collection =
    await Collection.findByIdAndDelete(id);

  return collection;
};