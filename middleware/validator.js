const express = require("express");
const { body, validationResult } = require("express-validator");

const formatErrors = (errorsArray) => {
  const formattedErrors = {};
  errorsArray.forEach((err) => {
    formattedErrors[err.path] = err.msg;
  });
  return { success: false, error: formattedErrors };
};

const sendOtpValidation = [
  body("number")
    .notEmpty()
    .withMessage("The number field is required.")
    .isLength({ min: 10, max: 10 })
    .withMessage("Invalid number length. Must be 10 digits."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(formatErrors(errors.array()));
    }
    next();
  },
];

const verifyOtpValidation = [
  body("otp")
    .notEmpty()
    .withMessage("The OTP field is required.")
    .isInt()
    .withMessage("OTP must be a number.")
    .isLength({ min: 4, max: 4 })
    .withMessage("Invalid OTP length. Must be 4 digits."),

  body("number")
    .notEmpty()
    .withMessage("The number field is required.")
    .isLength({ min: 10, max: 10 })
    .withMessage("Invalid number length. Must be 10 digits."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(formatErrors(errors.array()));
    }
    next();
  },
];

module.exports = { sendOtpValidation, verifyOtpValidation };
