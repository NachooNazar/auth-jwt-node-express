import Role from '../models/Role';

export const createRoles = async () => {
  const userRole = 'user';
  const adminRole = 'admin';

  const count = await Role.estimatedDocumentCount();

  if (count > 0) return;

  await new Role({ name: userRole }).save();
  await new Role({ name: adminRole }).save();
};
