import mongoose from 'mongoose';

import encryptPassword from '../utils/encrypt-password';
import PointSchema from './point';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imageUrl: { type: String },
  nameCoords: { 
    x: { type: Number },
    y: { type: Number }
  },
  imageCoords: { 
    x: { type: Number },
    y: { type: Number }
  }
});

userSchema.pre('save', function (next) {
  var currentDate = new Date();
  this.password = encryptPassword(this.password);

  this.updated_at = currentDate;

  if (!this.created_at) {
    this.created_at = currentDate;
  }

  next();
});

const User = mongoose.model('User', userSchema);

export default User;
