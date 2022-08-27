const router = require('express').Router();
const tricksController = require('../controllers/tricksController');

router.route('/').get(tricksController.index);
router.route('/:id').get(tricksController.singleTrick);
router.route('/:id').put(tricksController.updateTrick);
module.exports = router;