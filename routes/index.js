//  require express
const router = require('express').Router();
// require api
const apiRoutes = require('./api');

// use api
router.use('/api', apiRoutes);

// return
router.use((req, res) => {
  return res.send('Wrong route!');
});

// export router
module.exports = router;