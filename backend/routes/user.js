// library imports
const express = require( 'express' );
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

//local imports
const { signup, signin, updateUser } = require('../zodparse');
const { User, Account } = require('../db');
const userRouter = express.Router();
const connectionString = require('../con.json');
const { authMiddleware } = require('../middleware');

// secret key is
// {
//    SECRET_TOKEN: "<secret_token>"
// }

userRouter.post('/signup', async function (req, res) {
 
  try {
    const uploadedPayload = req.body;
    const parsedPayload = signup.safeParse(uploadedPayload);

    if (!parsedPayload.success) {
      res.status(411).json({
        msg: "Incorrect inputs"
      })
      return;
    }
    // if block for checking duplicate emails
    const matchResult = await User.findOne({ username: uploadedPayload.username })

    if (matchResult) {
      res.status(411).json({
        msg: "username already taken"
      })
      return;
    }

    const createResult = await User.create({
      username: uploadedPayload.username,
      password: uploadedPayload.password,
      firstName: uploadedPayload.firstName,
      lastName: uploadedPayload.lastName
    });

    const userId = createResult._id;
    const userBalance = Math.floor((Math.random() * 10000) + 1);

    const balanceCreateResult = await Account.create({
      userId: userId,
      balance: userBalance
    })

    res.status(200).json({
      msg: "New User created Successfully",
      userId: jwt.sign({ userId }, connectionString.SECRET_TOKEN) 
    })
  } catch(err) {
    console.log("Error in signup route");

    res.status(403).json({
      msg: "Error while creating new user"
    })


  }
})

userRouter.post('/signin', async function(req, res) {

  try {
    const uploadedPayload = req.body;
    const parsedPayload = signin.safeParse(uploadedPayload);

    //console.log(req.headers);

    if(!parsedPayload.success) {
      res.status(411).json({
        msg: "Incorrect Inputs"
      })
      return;
    }

    const registeredUser = await User.findOne({
      username: uploadedPayload.username,
      password: uploadedPayload.password
    })

    if(!registeredUser) {
      res.status(411).json({
        msg: "Wrong username and/or password"
      })
      return;
    }

    const userId = registeredUser._id;
    res.status(200).json({
      token: jwt.sign({ userId }, connectionString.SECRET_TOKEN )
    })

  } catch(err) {
    console.log("Error in signin route");
  }
})

userRouter.put('/', authMiddleware, async function(req, res) {

  try {

    const parsedPayload = updateUser.safeParse(req.body);
    if (!parsedPayload.success) {
      res.status(411).json({
        msg: "Incorrect Inputs"
      })
      return;
    }

    const updateResult = await User.updateOne(
      { _id: new mongoose.Types.ObjectId(req.userId)},
      req.body
    )

    res.status(200).json({
      msg: "Updated Successfully",
      updateResult // debug
    })

  } catch(err) {
    console.log("Error in home route")
  }
})

userRouter.get('/bulk', authMiddleware, async function(req, res) {

  try {

    const filter = req.query.filter || "";
    const searchResult = await User.find({
      $or: [
        { firstName: { "$regex": filter } },
        { lastName: { "$regex": filter } }
      ]
    })

    if (!searchResult) {
      return;
    }

    res.status(200).json(searchResult);

  } catch(err) {
    console.log("Error in bulk route");
  }
}) 

module.exports = {
  userRouter
};

