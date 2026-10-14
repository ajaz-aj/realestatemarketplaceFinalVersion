import Content from "./content.model.js";

export const getContentByKey = async (req, res, next) => {
  try {
    const content = await Content.findOne({ key: req.params.key });
    if (!content) {
      return res.status(200).json({ success: true, data: { key: req.params.key, items: [] } });
    }
    res.status(200).json({ success: true, data: content });
  } catch (error) {
    next(error);
  }
};

export const updateContentByKey = async (req, res, next) => {
  try {
    const updated = await Content.findOneAndUpdate(
      { key: req.params.key },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.status(200).json({ success: true, message: "Content updated successfully", data: updated });
  } catch (error) {
    next(error);
  }
};
