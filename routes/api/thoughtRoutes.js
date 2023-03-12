const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// /api/Thought
router.route('/').get(getThoughts).post(createThought);


router
  .route('/:id')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router
  .route('/thought/:id/reaction')
  .post(createReaction)

//Deletes reaction route /api/thought/:id/reaction

router
  .route('/thought/:id/reaction/:id')
  .delete(deleteReaction)

module.exports = router;