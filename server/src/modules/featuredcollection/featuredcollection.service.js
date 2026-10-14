import FeaturedCollection from "./featuredcollection.model.js";


// ==========================================
// CREATE FEATURED COLLECTION
// ==========================================

export const createFeaturedCollection = async (
  collectionData
) => {
  const collection =
    await FeaturedCollection.create(
      collectionData
    );

  return collection;
};


// ==========================================
// GET ALL ACTIVE FEATURED COLLECTIONS
// ==========================================

export const getAllFeaturedCollections =
  async () => {

    const collections =
      await FeaturedCollection.find({
        isActive: true,
      }).sort({
        displayOrder: 1,
      });

    return collections;
  };


// ==========================================
// GET ALL FEATURED COLLECTIONS
// ADMIN
// ==========================================

export const getAllFeaturedCollectionsAdmin =
  async () => {

    const collections =
      await FeaturedCollection.find()
        .sort({
          displayOrder: 1,
        });

    return collections;
  };


// ==========================================
// GET FEATURED COLLECTION BY ID
// ==========================================

export const getFeaturedCollectionById =
  async (id) => {

    const collection =
      await FeaturedCollection.findById(id);

    return collection;
  };


// ==========================================
// UPDATE FEATURED COLLECTION
// ==========================================

export const updateFeaturedCollection =
  async (
    id,
    collectionData
  ) => {

    const collection =
      await FeaturedCollection.findByIdAndUpdate(
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
// DELETE FEATURED COLLECTION
// ==========================================

export const deleteFeaturedCollection =
  async (id) => {

    const collection =
      await FeaturedCollection.findByIdAndDelete(
        id
      );

    return collection;
  };