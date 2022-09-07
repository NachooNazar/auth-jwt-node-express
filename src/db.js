import mongoose from 'mongoose';

mongoose
  .connect(`mongodb://localhost/authTest`)
  .then(() => console.log('Db connected successfully'))
  .catch((err) => console.error(err));
