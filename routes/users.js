var express = require('express');
var router = express.Router();

const {createHash, generatePassword} = require('../utils');
const User = require("../models/User");
const Event = require("../models/Event");


router.post("/login", (req, res) => {
    if(!req.body.login || !req.body.password){
        return res.json({ status: "error", code: "BAD_INPUT", descr:"login/phone and password are required"});
    }

    User.findOne({
        login: req.body.login,
        password: createHash(req.body.password)
    })
    .then(user => {
        if (!user){
            return res.json({ status: 'error', code: 'WRONG_LOGIN'});
        }

        const jwt_token = user.getJwtToken()

        res.cookie('jwt_token', jwt_token, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true });
	console.log(req.cookies.jwt_token)
        res.json({
            status:"ok",
            user,
            //cookie: req.cookies.jwt_token
        });
    })
});

router.post("/logout", (req, res) => {
    res.clearCookie('jwt_token')
    console.log(res.cookies)
    res.json({
        status: "logout",
        user: null
    })
});


router.post("/", async (req,res)=>{
    if(!req.body.login){
        return res.json({status:"error", code:"BAD_INPUT", descr:"email required"})
    }
    if(!req.body.password){
        return res.json({status:"error", code:"BAD_INPUT", descr:"password required"})
    }

    let user = await User.findOne({ login: req.body.login}).exec();
    if(user){
        return res.json({ status: "error", code: "ALREADY_REGISTERED"});
    }
    user = new User({
        login: req.body.login,
        password: createHash(req.body.password),
    });


    user.save( (err,user) => {
        const jwt_token = user.getJwtToken()

        if(err || !user){
            return res.json({ status: "error", code: "DATABASE_ERROR" });
        }

        res.cookie('jwt_token', jwt_token, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true });

        res.json({ status: "ok", user });
    })
});


router.use(User.checkAuth({block: true}))


router.get('/me', (req, res) => {
    User.findOne({
        _id: req.user._id,
    })
    .then(me => res.json({
        status: 'ok',
        me,
    }))
});

router.post('/note/:event_id',async (req,res) => {
    let user = await User.findOne({ _id: req.user._id }).exec();
    let user_note = user.notes.find(note => note.event == req.params.event_id);
    
    if (user_note){
        user_note.note = req.body.note;
    } else {
        user_note = { event: req.params.event_id, note: req.body.note}
        user.notes.push(user_note);
    }

    user.save((err, user) => {
        res.json({ status: "ok", user });
    })
});

module.exports = router;
