const express = require('express');
const router = express.Router();
const {
  createResource,
  deleteResource,
  getResources,
  updateResource,
} = require('../Controllers/resourcesController');

router.route('/').get(getResources).post(createResource);
router.route('/:id').patch(updateResource).delete(deleteResource);

module.exports = router;
