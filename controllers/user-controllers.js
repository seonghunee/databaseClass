const db = require("../data/database");
const User = require('../models/user-model');

function getReservation(req, res) {
    res.render('user/reservation');
}

function getDesigner(req, res) {
    res.render('user/designer');
}

async function getBeauty(req, res) {
    const query = `select * from beauty`;
    const [beautyList] = await db.query(query);

    res.render('user/beauty', {beautyList: beautyList});
}

async function getReview(req, res) {
    const query = `select * from review`;
    const [reviewList] = await db.query(query);
    res.render('user/review', {reviewList: reviewList});
}

function getMyPage(req, res) {
    res.render('mypage');
}

async function getProduct(req, res) {
    const query = `select * from product`;
    const [productList] = await db.query(query);

    res.render('user/product', {productList: productList});
}

async function getMyPageEdit(req, res) {
    const userId = req.session.uid ;
    console.log(userId);
    const user = new User(null, userId);
    const myPageUser = await user.getUserWithSameId();

    res.render('mypage-edit', {inputData: myPageUser});
}

module.exports = {
    getReservation: getReservation,
    getDesigner: getDesigner,
    getBeauty: getBeauty,
    getReview: getReview,
    getMyPage: getMyPage,
    getProdcut: getProduct,
    getMyPageEdit: getMyPageEdit,
}