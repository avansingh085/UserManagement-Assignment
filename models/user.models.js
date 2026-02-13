import mongoose from "mongoose";
const geoSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  }
}, { _id: false });

const addressSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true
  },
  zipcode: {
    type: String,
    required: true
  },
  geo: {
    type: geoSchema,
    required: true
  }
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  address: {
    type: addressSchema,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model("User", userSchema);
