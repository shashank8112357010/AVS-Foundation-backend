const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt')


const userSchema = Schema({
  phone: {
    unique: [true, "Phone number already taken"],
    required: [true, "Phone number is required "],
    type: Number,
  },
  password: {
    type: String,
    required: [true, "Password is required "],
  },
  referral: {
    type: String,
    required: true
  },
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });



userSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

module.exports = userModel = mongoose.model('user', userSchema);