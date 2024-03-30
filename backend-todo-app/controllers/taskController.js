const TaskModel = require('../models/taskModel');

class TaskController {
  static async createTask(req, res) {
    const { userId, title } = req.body;

    try {
      const task = await TaskModel.createTask(userId, title);
      res.status(201).send({ message: 'Task created successfully', task });
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }

  static async getTasksByUser(req, res) {
    const { userId } = req.query;

    try {
      const tasks = await TaskModel.getTasksByUserId(userId);
      res.status(200).send(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }

  static async deleteTask(req, res) {
    const { taskId, userId } = req.body;

    try {
      const deletedTask = await TaskModel.deleteTask(taskId, userId);
      if (deletedTask) {
        res.status(200).send({ message: 'Task deleted successfully', deletedTask });
      } else {
        res.status(404).send({ error: 'Task not found' });
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }

  static async editTask(req, res) {
    const { taskId, newTitle, userId } = req.body;

    try {
      const updatedTask = await TaskModel.editTask(taskId, newTitle, userId);
      
      if (updatedTask) {
        res.status(200).send({ message: 'Task edited successfully', updatedTask });
      } else {
        res.status(404).send({ error: 'Task not found' });
      }
    } catch (error) {
      console.error('Error editing task:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
}

module.exports = TaskController;
