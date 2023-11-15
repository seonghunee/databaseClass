const express = require('express');
const userControllers = require('../controllers/user-controllers');

const router = express.Router();

router.get('/reservation', userControllers.getReservation);
router.get('/designer', userControllers.getDesigner);
router.get('/beauty', userControllers.getBeauty);
router.get('/review', userControllers.getReview);
router.get('/mypage/:id', userControllers.getMyPage);
router.get('/product', userControllers.getProdcut);
router.get('/mypage-edit/:id', userControllers.getMyPageEdit);

module.exports = router;

