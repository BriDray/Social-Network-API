// require all the things
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// use all the things
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// exporting
module.exports = router;