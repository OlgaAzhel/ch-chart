const express = require('express');
const router = express.Router();
const commentsCtrl = require('../../controllers/api/comments');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/show', commentsCtrl.show);
router.post('/', ensureLoggedIn, commentsCtrl.create);
router.post('/delete', ensureLoggedIn, commentsCtrl.delete);
router.post('/edit', ensureLoggedIn, commentsCtrl.edit);

module.exports = router;