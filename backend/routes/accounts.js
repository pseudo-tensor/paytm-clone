const express = require('express');
const mongoose = require('mongoose');
const { Account } = require('../db');
const { transfer } = require('../zodparse')
const { authMiddleware } = require('../middleware')

accountRouter = express.Router();

accountRouter.get('/balance', authMiddleware, async function(req, res) {

  try {
    const userId = req.userId;
    const balanceQuery = await Account.findOne(
      { userId: new mongoose.Types.ObjectId(userId) }
    )

    res.status(200).json({
      balance: balanceQuery.balance
    })

  } catch(err) {
    console.log("Error in /balance route");
  }
})

accountRouter.post('/transfer', authMiddleware, async function(req, res) {

  try {
    const { amount, to } = req.body;
    const accountSearch = await Account.findOne({
      userId: new mongoose.Types.ObjectId(to)
    })

    // check for account
    if (!accountSearch) {
      res.status(400).json({
        msg: "Recipient Account is invalid"
      })
      return;
    }

    // check for sufficient balance
    const balanceQuery = await Account.findOne(
      { userId: new mongoose.Types.ObjectId(req.userId) }
    ) 

    if (amount > balanceQuery.balance) {
      res.status(400).json({
        msg: "Insufficient Balance"
      })
      return;
    }

    // do the transaction 
    const senderUpdate = await Account.updateOne(
      {
        userId: new mongoose.Types.ObjectId(req.userId)
      },
      {
        $inc: {
          balance: -amount
        }
      }
    )

    const recieverUpdate = await Account.updateOne(
      {
        userId: new mongoose.Types.ObjectId(to)
      },
      {
        $inc: {
          balance: amount
        }
      }
    )

    res.status(200).json({
      msg: "Transfer successful"
    })

  } catch(err) {
    console.log("Error in transfer Router");
  }
})


module.exports = {
  accountRouter
}
