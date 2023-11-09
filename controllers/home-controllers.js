async function getHome(req, res) {
    console.log(req.session.uid);
    res.render('index');
};

module.exports = {
    getHome: getHome,
}