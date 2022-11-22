const ResourcesModel = require('../models/resourcesModel');
const mongoose = require('mongoose');
const asyncHandler = require('../Middleware/asyncHandler');
exports.getResources = asyncHandler(async (req, res) => {
  try {
    const resources = await ResourcesModel.find();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.createResource = asyncHandler(async (req, res) => {
  const resource = req.body;
  const newResource = new ResourcesModel(resource);
  try {
    await newResource.save();
    res.status(201).json({
      message: 'Resource created successfully',
      resource: newResource,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

exports.updateResource = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const resource = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No resource with id: ${id}`);
  const updatedResource = await ResourcesModel.findByIdAndUpdate(
    id,
    { ...resource, id },
    { new: true }
  );
  res.json(updatedResource);
});

exports.deleteResource = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No resource with id: ${id}`);
  await ResourcesModel.findByIdAndRemove(id);
  res.json({ message: 'Resource deleted successfully.' });
});
