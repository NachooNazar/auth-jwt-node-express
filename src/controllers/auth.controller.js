import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';
export const register = async (req, res, next) => {
  try {
    const { name, lastname, username, password, roles } = req.body;
    if (!name || !lastname || !username || !password)
      return res.status(400).json({ message: 'empty credentials' });

    const passwordHashed = await User.hashPassword(password);

    const newUser = new User({
      name,
      lastname,
      username,
      password: passwordHashed,
    });

    if (roles) {
      const rolId = await Role.find({ name: { $in: roles } });
      newUser.roles = rolId.map((rol) => rol._id);
    } else {
      const rolId = await Role.findOne({ name: 'user' });
      newUser.roles = [rolId._id];
    }

    await newUser.save();
    res.status(200).json({ message: 'Register successfully' });
  } catch (error) {
    console.log('Error en auth-controller/register', error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: 'empty credentials' });

    const userExists = await User.findOne({ username }).populate('roles');

    if (!userExists)
      return res.status(403).json({ message: 'User does not exist' });

    const match = await User.comparePassword(userExists.password, password);
    if (!match) return res.status(400).json({ message: 'bad credentials' });

    const token = jwt.sign({ id: userExists._id }, config.SECRET, {
      expiresIn: 86400,
    });

    //Guardar token en headers o localstorage
    res.status(200).json({ token });
  } catch (error) {
    console.log('Error en auth-controller/login', error);
  }
};
