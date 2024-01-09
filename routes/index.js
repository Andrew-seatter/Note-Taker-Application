const router = require('express').Router();

// Import our modular routers for /tips and /feedback
const notesRouter = require('./notesRoute');

router.use('/notes', notesRouter);

module.exports = router;
