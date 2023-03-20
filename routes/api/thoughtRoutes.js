const router = require('express').Router();
const {
  getThought,
  getSingleThought,
  createThought,
//   updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');


router.route('/').get(getThought).post(createThought);


router
  .route('/:id')
  .get(getSingleThought)
  // .put(updateThought)
  .delete(deleteThought);

router
  .route('/:id/reaction')
  .post(createReaction)



router
  .route('/:id/reaction')
  .delete(deleteReaction)

module.exports = router;