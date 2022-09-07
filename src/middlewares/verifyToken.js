import jwt from 'jsonwebtoken';
import User from '../models/User';
import Role from '../models/Role';
import config from '../config';
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];

    if (!token) return res.status(400).json({ message: 'No token' });

    const decoded = jwt.verify(token, config.SECRET);

    req.userId = decoded.id;
    const userExists = await User.findById(req.userId);

    userExists ? next() : res.status(403).json({ message: 'no user found' });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const id = req.userId;

    const userExists = await User.findById(id);

    if (!userExists)
      return res.status(400).json({ message: 'User does not exist' });

    const rolesFound = (
      await Role.find({ _id: { $in: userExists.roles } })
    ).map((rol) => rol.name);

    if (!rolesFound.includes('admin'))
      return res.status(401).json({ message: 'Unauthorized' });

    next();
  } catch (error) {
    res.status(400).json(error);
  }
};
