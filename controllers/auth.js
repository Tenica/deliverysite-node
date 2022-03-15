const mongoose = require("mongoose");
const Tracker = require("../models/tracker");
const Admin = require("../models/Admin");

exports.getLogin = (req, res, next) => {
//  const isLoggedIn = req.get('Cookie')
//  .trim()
//  .split('=')[1]
console.log(req.session.isLoggedIn)
  res.status(200).render("admin/login", {
    pageTitle: "Login",
    title: "Admin Login",
    path: "/Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect("/admin/dashboard");
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err)
      res.redirect('/')
    })
   
  };

  exports.getSignup = (req, res, next) => {
    res.status(200).render("admin/login", {
        pageTitle: "Register",
        title: "Admin Register",
        path: "/Signup",
        isAuthenticated: false,
      });
    };
  

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password  = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  

  Admin.findOne({email: email}).then(userDoc => {
     if (userDoc) {
         return res.redirect('/signup')
     } 
     const admin = new Admin({
         email: email,
         password: password,
        
     });
      return admin.save();
     }). then(result => {
        res.redirect('admin/login')
    
  }).catch(err => {
      console.log(err)
  })
}