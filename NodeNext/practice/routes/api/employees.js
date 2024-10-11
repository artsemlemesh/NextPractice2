const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesC');



router.route('/')
    .get(employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee);

router.route('/:id')
    .get(employeesController.getAllEmployee)

module.exports = router;