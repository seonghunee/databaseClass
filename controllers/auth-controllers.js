const authUtil = require('../util/authentication');
const sessionFlash = require('../util/session-flash');
const validation = require('../util/validation');
const User = require('../models/user-model');

function getLogin(req, res) {
    let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      id: '',
      password: '',
    };
  }
    res.render('login', {inputData: sessionData});
}

function getRegist(req, res) {
    let sessionData = sessionFlash.getSessionData(req);

    if (!sessionData) {
        sessionData = {
            name: '',
            id: '',
            email: '',
            phoneNumber: '',
        }
    }
    res.render('regist', {inputData: sessionData});
}

async function regist(req, res) {
    const enteredData = {
        name: req.body.name,
        id: req.body.id,
        password: req.body.password,
        confirmEmail: req.body.confirmPassword,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
      };
    
    if (!validation.userDetailsAreValid(
        req.body.name,
        req.body.id,
        req.body.password,
        req.body.email,
        req.body.phoneNumber,
    )) {
        sessionFlash.flashDataToSession(
            req,
            { 
                errorMessage: '입력란을 모두 확인하여주세요. 비밀번호는 6자 이상입니다. ',
                ...enteredData,
            }, function(){res.redirect('/regist')});
        return;
    }

    const user = new User(enteredData.name, enteredData.id, enteredData.password, enteredData.email, enteredData.phoneNumber, 'general');
    
    try {
        const existingUser = await user.existsAlready();
        
        if (existingUser) {
            sessionFlash.flashDataToSession(
                req,
                { 
                    errorMessage: '아이디가 이미 존재합니다.',
                    ...enteredData,
                }, function(){res.redirect('/regist')});
            return;
        }
    } catch(error) {
        next(error);
        return;
    }

    if (!validation.passwordIsConfirmed(req.body.password, req.body.confirmPassword)) {
        sessionFlash.flashDataToSession(
            req,
            { 
                errorMessage: '입력한 비밀번호가 서로 다릅니다.',
                ...enteredData,
            }, function(){res.redirect('/regist')});
        return;
    }

    await user.regist();

    res.redirect('/login');
}

async function login(req, res) {
    const enteredId = req.body.id;
    const enteredPassword = req.body.password;

    const user = new User(null, enteredId, enteredPassword);

    let existingUser;
    try {
        existingUser = await user.getUserWithSameId();
    } catch (error) {
        next(error);
        return;
    }

    const sessionErrorData = {
        errorMessage:
            '아이디 또는 비밀번호가 틀렸습니다! 다시 입력해주세요.',
        id: user.id,
        password: user.password,
    };

    if (!existingUser) {
        sessionFlash.flashDataToSession(req, sessionErrorData, function () {
            res.redirect('/login');
        });
        return;
    } else if (existingUser.password != enteredPassword) {
        sessionFlash.flashDataToSession(req, sessionErrorData, function () {
            res.redirect('/login');
        });
        return;
    }

    authUtil.createUserSession(req, existingUser, function () {
        res.redirect('/');
    });
}

function logout(req, res) {
    authUtil.destroyUserAuthSession(req);
    res.redirect('/');
  }

module.exports = {
    getLogin: getLogin,
    getRegist: getRegist,
    login: login,
    regist: regist,
    logout: logout,
}