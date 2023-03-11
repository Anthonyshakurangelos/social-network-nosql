const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/courseController.js');


router.route('/').get(getThoughts).post(createThought);


router
  .route('/:courseId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;