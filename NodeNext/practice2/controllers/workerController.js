const Worker = require('../models/Worker');

const getAllWorkers = async (req, res) => {
  console.log('getAllWorkers');
  const workers = await Worker.find();
  if (!workers) return res.status(204).json({ message: 'No workers found' });
  res.json(workers);
};

const createNewWorker = async (req, res) => {
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
  const { id } = req.params; // Extracting the ID from the URL parameters
  console.log('deleteWorker called with idDDD:', id);
  
  if (!id) return res.status(400).json({ message: 'Worker ID required' }); // Check if ID is provided
  
  try {
    const worker = await Worker.findOne({ _id: id }).exec(); // Find the worker by ID
    if (!worker) {
      return res.status(404).json({ message: `No worker matches ID ${id}` }); // Change to 404
    }
    
    const result = await worker.deleteOne({ _id: id }); // Delete the worker
    res.json(result); // Return the result of the deletion
  } catch (err) {
    console.error(err); // Log the error
    return res.status(500).json({ message: 'Internal Server Error' }); // Send error response
  }
};

const getWorker = async (req, res) => {
  console.log('getWorker called with idDDD:', req.params.id);
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Worker ID required' });
  }
  try {
    const worker = await Worker.findOne({ _id: req.params.id }).exec();
    if (!worker) {
      return res
        .status(204)
        .json({ message: `no worker matches ID ${req.params.id}` });
    }
    res.json(worker);
  } catch (err) {
    console.error(err);
  }

  // if (!req?.params?.id) return res.status(400).json({ "message": 'Worker ID required' });

  //   if(!req?.params?.id) return res.status(400).json({ "message": 'Worker ID required' });
  //   const worker = await Worker.findOne({ _id: req.params.id}).exec()
  //   if (!worker) {
  //       return res.status(204).json({ "message": `no worker matches ID ${req.params.id}` });
  //   }
  //   res.json(worker);
};

module.exports = {
  getAllWorkers,
  createNewWorker,
  updateWorker,
  deleteWorker,
  getWorker,
};
