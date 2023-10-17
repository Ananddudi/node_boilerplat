const mongoose = require("mongoose");

const getemp = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  age: {
    type: String,
    default: 20,
    min: 15,
    max: 100,
  },
  status: {
    type: String,
    enum: ["active", "deactive", "terminate", "performance issue"],
  },
  pvtDta: [
    {
      type: mongoose.Types.ObjectId,
      ref: "PrivateEnp",
      required: true,
    },
  ],
  company: String,
  identity: Number,
});

const getprivatedata = new mongoose.Schema(
  {
    salary: {
      type: Number,
      default: 20000,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

getprivatedata.virtual("empdata", {
  ref: "Empdata",
  localField: "_id",
  foreignField: "pvtDta",
  justOne: false,
  // match: {
  //   age: 19,
  // },
});

const loginregisterschema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: String,
  name: String,
  token: String,
});

const getdatamodel = mongoose.model("Empdata", getemp);
const getprivatemodel = mongoose.model("PrivateEnp", getprivatedata);
const loginregistermodel = mongoose.model("login", loginregisterschema);

module.exports = {
  getprivatemodel,
  getdatamodel,
  loginregistermodel,
};
