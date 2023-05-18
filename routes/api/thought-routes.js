// requiring
const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller');

// route thoughts
router.route('/').get(getThoughts).post(createThought);

// route thought id
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// route reactions
router.route('/:thoughtId/reactions').post(addReaction);

// route reaction id
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

// export
module.exports = router;