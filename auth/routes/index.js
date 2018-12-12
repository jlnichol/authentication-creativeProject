/*global mongoose*/
var express = require('express');
var router = express.Router();
var expressSession = require('express-session');
var Present = require('../controllers/presents_controller');
var users = require('../controllers/users_controller');
console.log("before / Route");
router.get('/', function(req, res){
    console.log("/ Route");
//    console.log(req);
    console.log(req.session);
    if (req.session.user) {
      console.log("/ Route if user");
      res.render('index', {username: req.session.username,
                           msg:req.session.msg,
                           color:req.session.color,
                            animal:req.session.animal
      });
    } else {
      console.log("/ Route else user");
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
});
router.get('/user', function(req, res){
    console.log("/user Route");
    if (req.session.user) {
      res.render('user', {msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
});
router.get('/signup', function(req, res){
    console.log("/signup Route");
    if(req.session.user){
      res.redirect('/');
    }
    res.render('signup', {msg:req.session.msg});
});
router.get('/login',  function(req, res){
    console.log("/login Route");
    if(req.session.user){
      res.redirect('/');
    }
    res.render('login', {msg:req.session.msg});
});
router.get('/logout', function(req, res){
    console.log("/logout Route");
    req.session.destroy(function(){
      res.redirect('/login');
    });
  });
router.post('/signup', users.signup);
router.post('/user/update', users.updateUser);
router.post('/user/delete', users.deleteUser);
router.post('/login', users.login);
router.get('/user/profile', users.getUserProfile);



router.get('/presents', function(req, res, next) {
  Present.find(function(err, presents){
    if(err){ return next(err); }
    res.json(presents);
  });
});

router.post('/presents', function(req, res, next) {
  var present = new Present(req.body);
  present.save(function(err, present){
    if(err){ return next(err); }
    res.json(present);
  });
});

router.param('present', function(req, res, next, id) {
  var query = Present.findById(id);
  query.exec(function (err, present){
    if (err) { return next(err); }
    if (!present) { return next(new Error("can't find present")); }
    req.present = present;
    return next();
  });
});

router.get('/presents/:present', function(req, res) {
  res.json(req.present);
});

router.delete('/presents/:present', function(req, res) {
  console.log("in Delete");
  req.present.remove();
  res.sendStatus(200);
});

module.exports = router;