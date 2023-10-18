const express = require('express');
const router = express.Router();


//mongoodb user model
const User = require("../../models/User")


//Signup
router.post('/signup', (req,res)=>{
    let {name, email, password, dateOfBirth} = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();

    if(name == ''|| email=='' || password ==''|| dateOfBirth=='')
    {
        res.json({
        status:"FAILED",
        message: "Empty Input Faileds!" 
        });
    } 
    else if(!/^[a-zA-Z ]*$/.test(name)) {
        res.json({
            status: "FAILED",
            message: "Invalid name entered"
        });
    }
    else if(!/^[\w-z\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
    {
        res.json({
            status: "FAILED",
            message: "Invalid email entered"
        });
    }
    else if(!new Date(dateOfBirth).getTime())
    {
        res.json({
            status: "FAILED",
            message: "Invalid date of Birth entered"
        })
    }
    else if(password.length < 8)
    {
        res.json({
            status: "FAILED",
            message: "Password is too Short!"
        })
    }
    else {
        //Checking if user already exists or not
        User.find({email}).then(result=>{
            if(result.length){
                //A USer already Exists
                res.json ({
                    status: "FAILED",
                    message: "User With the provided email already exists"
                })
            }
            else {
                //Try to create new user 
                const newUser = new User({
                    name,
                    email,
                    password,
                    dateOfBirth
                });
                newUser.save().then(result=>{
                    res.json({
                        status: "SUCCESS",
                        message: "Signup successfull",
                        data: result,
                    })
                })
                .catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "An error occured while saving user account!"
                    })
                })
            }

        }).catch(err => {
            console.log(err);
            res.json({
                staus: "FAILED",
                message: "An error occurred while checking for existing user!"
            })
        })
    }
})


// Signin
router.post('/signin', (req, res) => {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if (email === "" || password === "") {
        res.json({
            status: "FAILED",
            message: "Empty credentials supplied"
        });
    } else {
        // Check if user exists 
        User.findOne({ email }) // Use findOne instead of find to get a single user
            .then(user => {
                if (user) {
                    // Check if the password matches
                    if (user.password === password) {
                        res.json({
                            status: "SUCCESS",
                            message: "Signin Successfully",
                            data: user // Send user data in the response
                        });
                    } else {
                        res.json({
                            status: "FAILED",
                            message: "Invalid password Entered!"
                        });
                    }
                } else {
                    res.json({
                        status: "FAILED",
                        message: "Invalid Credentials"
                    });
                }
            })
            .catch(err => {
                console.error(err);
                res.json({
                    status: "FAILED",
                    message: "An error occurred while checking for existing user"
                });
            });
    }
});




module.exports = router;
