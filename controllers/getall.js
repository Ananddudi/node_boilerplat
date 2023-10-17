const {
  getprivatemodel,
  getdatamodel,
  loginregistermodel,
} = require("../models/models");

const getallemp = async (req, res) => {
  try {
    const data = await getdatamodel.find({}).populate({
      path: "pvtDta",
      match: {
        salary: {
          $gt: 5000,
        },
      },
    });
    if (data.length === 0) {
      return res.status(401).json({ message: "No data" });
    }
    res.status(200).json(data);
  } catch (e) {
    console.log(e.message);
  }
};

const getAllPvt = async (req, res) => {
  try {
    const data = await getprivatemodel.find({}).populate("empdata");
    if (data.length === 0) {
      return res.status(401).json({ message: "No data" });
    }
    res.status(200).json(data);
  } catch (e) {
    console.log(e.message);
  }
};

const postemp = async (req, res) => {
  try {
    const data = await getdatamodel.create({
      pvtData: [req.body.pvtData],
      ...req.body,
    });
    if (!data) {
      return res.status(401).json({ message: "Data is not created" });
    }
    res.status(200).json(data);
  } catch (e) {
    console.log(e.message);
    res.status(401).json({ Error: e.message });
  }
};

const createEmp = async (req, res) => {
  try {
    const data = await getdatamodel.create(req.body);
    if (!data) {
      return res.status(401).json({ message: "Data is not created" });
    }
    res.status(200).json(data);
  } catch (e) {
    console.log(e.message);
    res.status(401).json({ Error: e.message });
  }
};

const createPvt = async (req, res) => {
  try {
    const data = await getprivatemodel.create(req.body);
    if (!data) {
      return res.status(401).json({ message: "Data is not created" });
    }
    res.status(200).json(data);
  } catch (e) {
    console.log(e.message);
    res.status(401).json({ Error: e.message });
  }
};

const getemp = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id", id);
    const data = await getdatamodel.find({ identity: id });
    if (data.length > 0) {
      return res.status(200).json(data);
    }
    res.status(400).json({ message: "no data found" });
  } catch (e) {
    res.status(400).json({ Error: e.message });
  }
};

module.exports = {
  getemp,
  getAllPvt,
  postemp,
  getallemp,
  createEmp,
  createPvt,
};
