import mongoose from "mongoose";
import User from "../models/user.models.js";
import { sendResponse } from "../utils/sendResponse.js";
import { userUpdateSchema, userValidationSchema } from "../utils/validateUser.js";


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return sendResponse(res, 200, true, "Users fetched successfully", users);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};


export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, "Invalid ID format");
    }

    const user = await User.findById(id);

    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }

    return sendResponse(res, 200, true, "User fetched successfully", user);

  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};


export const createUser = async (req, res) => {
  try {
    const { error, value } = userValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return sendResponse(
        res,
        400,
        false,
        "Validation failed",
        error.details.map(err => err.message)
      );
    }

    const user = await User.create(value);

    return sendResponse(res, 201, true, "User created successfully", user);

  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, "Invalid ID format");
    }

    const { error, value } = userUpdateSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return sendResponse(
        res,
        400,
        false,
        "Validation failed",
        error.details.map(err => err.message)
      );
    }

    const user = await User.findByIdAndUpdate(
      id,
      value,
      { new: true, runValidators: true }
    );

    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }

    return sendResponse(res, 200, true, "User updated successfully", user);

  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, "Invalid ID format");
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }

    return sendResponse(res, 200, true, "User deleted successfully", null);

  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};
