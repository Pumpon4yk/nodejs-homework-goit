const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const {nanoid} = require("nanoid");

const User = require("../models/user");

const {HttpError, controlWrapper, verifyEmailLeter, sendEmail} = require("../helpers");

const {SECRET_KEY} = process.env;

const avtDir = path.join(__dirname, "../", "public", "avatars");


const register = async (req, res) => {
  const {email, password, name} = req.body;
  const user = await User.findOne({email})
  const verificationToken = nanoid();

  if (user) {
    throw new HttpError(409, "Email in use");
  }

  const hashPass = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({...req.body, password: hashPass, avatarURL, verificationToken})
  
  const veryfyEmail = {
    to: email,
    subject: "Verify your email",
    html: verifyEmailLeter(name, verificationToken)
  }

  await sendEmail(veryfyEmail)

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription
    }
  });
};

const veryfyEmail = async (req, res) => {
  const {verificationToken} = req.params;
  const user = await User.findOne({verificationToken});

  if(!user) {
    throw new HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: null});

  res.json({
    massage: "Verification successful"
  })
};

const resendVerifyEmail = async(req, res)=> {
  const {email} = req.body;
  const user = await User.findOne({email});

  if(!user) {
      throw new HttpError(404, "User not found");
  }
  if(user.verify) {
      throw new HttpError(400, "Verification has already been passed");
  }

  const veryfyEmail = {
    to: email,
    subject: "Verify your email",
    html: verifyEmailLeter(user.name, user.verificationToken)
  }

  await sendEmail(veryfyEmail)

  res.json({
      message: "Verification email sent"
  })
};

const login = async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email});

  if (!user) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
}

  const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "12h"});
  await User.findByIdAndUpdate(user._id, {token});

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription
    }
  });
}

const logout = async (req, res) => {
  const {_id} = req.user;
  await User.findByIdAndUpdate(_id, {token: ""});

  res.status(204).end();
}

const current = async (req, res) => {
  const {email, subscription} = req.user;

  res.json({email, subscription});
};

const subscription = async (req, res) => {
  const {_id} = req.user;

  const user = await User.findByIdAndUpdate(_id, req.body, {new: true});

  res.json(user);
};

const changeAvatar = async (req, res) => {
  const {_id} = req.user;
  const {path: tmpUpload, originalname} = req.file;
  const fileName = `${_id}_250w_${originalname}`;
  const resultUpload = path.join(avtDir, fileName);
  
  const img = await Jimp.read(tmpUpload);

  img.resize(250, 250);
  await img.writeAsync(tmpUpload);
  
  await fs.rename(tmpUpload, resultUpload);

  const avatarURL = path.join("avatars", fileName);

  await User.findByIdAndUpdate(_id, {avatarURL});

  res.json({avatarURL});

}

module.exports = {
  register: controlWrapper(register),
  login: controlWrapper(login),
  logout: controlWrapper(logout),
  current: controlWrapper(current),
  subscription: controlWrapper(subscription),
  changeAvatar: controlWrapper(changeAvatar),
  veryfyEmail: controlWrapper(veryfyEmail),
  resendVerifyEmail: controlWrapper(resendVerifyEmail)
}