const Worker = require('../models/Worker');

const getAllWrokers = async (req, res) => {
  const workers = await Worker.find();
  if (!workers) return res.status(204).json({ message: 'No workers found' });
  res.json(workers);
};

const createNewWroker = async (req, res) => {
  if (
    !req?.body?.name ||
    !req?.body?.age ||
    !req?.body?.position ||
    !req?.body?.salary
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const result = await Worker.create({
      name: req.body.name,
      age: req.body.age,
      position: req.body.position,
      salary: req.body.salary,
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateWorker = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'ID parameter is required.' });
  }

  const worker = await Worker.findOne({ _id: req.body.id }).exec();
  if (!worker) {
    return res
      .status(204)
      .json({ message: `no worker matches ID ${req.body.id}` });
  }
  if (req.body?.name) worker.name = req.body.name;
  if (req.body?.age) worker.age = req.body.age;
  if (req.body?.position) worker.position = req.body.position;
  if (req.body?.salary) worker.salary = req.body.salary;
  const result = await worker.save();
  res.json(result);
};

const deleteWorker = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ message: 'Worker ID required' });
    const worker = await Worker.findOne({ _id: req.body.id}).exec()
    if (!worker) {
        return res.status(204).json({ "message": `no worker matches ID ${req.body.id}` });
    }
    const result = await worker.deleteOne({_id: req.body.id})
    res.json(result);
}


const getWorker = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({ "message": 'Worker ID required' });
    const worker = await Worker.findOne({ _id: req.params.id}).exec()
    if (!worker) {
        return res.status(204).json({ "message": `no worker matches ID ${req.params.id}` });
    }
}

module.exports = {
  getAllWrokers,
  createNewWroker,
  updateWorker,
  deleteWorker,
  getWorker,
}