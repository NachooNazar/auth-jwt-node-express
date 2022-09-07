import User from '../models/User';

export const findUsers = async (req, res, next) => {
  try {
    const count = await User.estimatedDocumentCount();
    if (count == 0) return res.status(400).json({ message: 'No users found' });

    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const findUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    user
      ? res.status(200).json(user)
      : res.status(400).json({ message: 'No user found' });
  } catch (error) {
    res.status(400).json({ error });
  }
};
