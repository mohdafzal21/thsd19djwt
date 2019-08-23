var express = require('express');
var router = express.Router();
const db = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//route /user/signup
//check if email is already exisiting in the db
//hash the password and save the password to db 
//genrate a token based on db.User._id

router.post('/signup',(req,res)=> {
  db.User.findOne({email:req.body.email})
  .then((user)=> {
    if(user){
      res.json({email: "email already exists"})
    }else{
        const newUser = new db.User({
            name: req.body.name,
            email:req.body.email,
            password: req.body.password
          })

          bcrypt.genSalt(10, function(err,salt){
            bcrypt.hash(newUser.password,salt,function(err,hash){
              if(err) throw err
              else{
                newUser.password = hash
                newUser.save((err,user)=>{
                  if(err){
                    console.log(err)
                  } else{
                    //create a token 
                    jwt.sign({_userId: user._id},"hello",  function(err, token) {
                      console.log(token);
                      res.json(token)
                    })
                    
                  }
                })
              }
            })
          })

    }
  })
})




module.exports = router;
