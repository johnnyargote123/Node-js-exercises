import { sessionMongo } from "../mongo/session.mongo.js";

export class UserRepository {
  async updateUserRole(uid, newRole) {
    const user = await sessionMongo.findOneByEmail(uid);

    if (!user) {
      throw new Error("User not found");
    }

    user.rol = newRole;
    await sessionMongo.updateUserByEmail(uid, { rol: user.rol });

    return user.rol;
  }
}

export const userRepository = new UserRepository()