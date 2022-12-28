const express = require('express');
const router = express.Router();

const coursesHandler = require('./handler/courses');

const verifyToken = require('../middleware/verifyToken');
const mid = require('../middleware/permission');

router.get('/', coursesHandler.getAll);
router.get('/:id', coursesHandler.get);

router.post('/', verifyToken, mid('admin'), coursesHandler.create);
router.put('/:id', verifyToken, mid('admin'), coursesHandler.update);
router.delete('/:id', verifyToken, mid('admin'), coursesHandler.destroy);

module.exports = router;
