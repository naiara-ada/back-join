const Task = require('../models/Task')

const TaskController = {
  async create (req, res) {
    try {
        const task = await Task.create({...req.body, completed: false})
        res.status(201).send(task)
    } catch (error) {
      console.log(error)
    }
  },
  async getAll (req, res) {
    try {
        const task = await Task.find();
        res.json(task);
    } catch (error) {
        console.log(error)
    }
  },
  // Esta es para ver el renderizado en SSR
  async getAllSSR (req, res) {
    try {
        const task = await Task.find();
        res.send(`<h1>Tareas</h1>
          ${task.map(task => {
            return (
              `<div>
                <h2>Nombre de la tarea: ${task.title}</h2>
                <p>Task completed: ${task.completed}</p>
              </div>`
            )
          } ).join('')}
        </div>`);
    } catch (error) {
        console.log(error)
    }
  },
  async getByID (req, res) {
    try {
      const id = req.params._id;
      const task = await Task.findById(id);
      res.json(task)
    } catch (error) {
        console.log(error)
    }
  },
  async updateCompleted(req, res) {
    try {
      const id = req.params._id;
      const udpatedTask = await Task.findByIdAndUpdate(
        id, {
          completed: true
        }, {new: true}
      )
      if(!udpatedTask) {
        return res.status(404).json({mensaje: 'Task id not found'})
      } 
      res.json(udpatedTask)
    } catch (error) {
      console.log(error)
    }
  },
  async updateByName(req, res) {
    try {
      const id = req.params._id
      const title = req.body.title
      const updateTitleTask = await Task.findByIdAndUpdate(
        id, {
          title
        }, {new: true}
      )
      res.json(updateTitleTask)
    } catch (error) {
      console.log(error)
    }
  },
  async deleteTask (req, res) {
    try {
      const id = req.params._id
      const deletedTask = await Task.findByIdAndDelete(id)
      if (!deletedTask) {
        return res.status(404).json({message: "Task with that id not found"})
      }  
      res.json({message: "Task deleted successfully", deletedTask})
    } catch (error) {
        console.log(error)
    }
}

}

module.exports = TaskController