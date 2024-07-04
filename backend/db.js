const mongoose = require("mongoose")
const connectionString = require("./con.json") //mongodb connection string in con.json:

/*
 *
 * {
 *  "connector": "mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]"
 * }
 *
 * */

try {
  mongoose.connect(connectionString.connector)
} catch(err) {
  console.log("couldnt establish connection to mongodb server");
}

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  } 
})

const User = mongoose.model('users', userSchema);

const accountSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  balance: {
    type: Number, 
    required: true
  }
})

const Account = mongoose.model('account', accountSchema);

module.exports = {
  User,
  Account
}
