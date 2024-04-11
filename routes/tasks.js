const express = require('express')
const router = express.Router()
const Task = require('../models/Task.js')
const TaskController = require('../controllers/TaskController.js')

router.post("/create", TaskController.create)
router.get('/', TaskController.getAll )
router.get('/ssr', TaskController.getAllSSR )
router.get('/id/:_id', TaskController.getByID)
router.put("/markascompleted/:_id", TaskController.updateCompleted)
router.put('/id/:_id', TaskController.updateByName) 
router.delete('/id/:_id', TaskController.deleteTask )

module.exports = router