const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

class UserController {
  static async registerUser(req, res) {
    const { userName, password, userEmail  } = req.body;

    try {
      const emailExist = await UserModel.getUserByEmail(userEmail);

      if (emailExist) {
        res.status(403).send({ error: 'Email already exists' });
        return;
      }

      const newUser = await UserModel.createUser(userName, password, userEmail);

      res.status(201).send({ message: 'User registered successfully', newUser });

    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }

  static async loginUser(req, res) {
    const { userEmail, password } = req.body;
    try {
      const user = await UserModel.getUserByEmail(userEmail);

      if (!user || user.password !== password) {
        res.status(401).send({ error: 'Wrong e-mail or password, please try again' });
        return;
      }

      const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).send({ message: 'Login successful', token });
    } catch (error) {
      //TODO: handle error
      console.error('Error logging in:', error.message);
      res.status(500).send({ error: error.message });
    }
  }
}

module.exports = UserController;
