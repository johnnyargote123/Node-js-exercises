import userModel from "../../dao/mongo/models/user.model.js";

class Session {
  async findOneByEmail(email) {
    try {
      return await userModel.findOne({ email });
    } catch (error) {
      req.logger.error(error);
      throw new Error("Internal server error");
    }
  }

  async createUser(user) {
    try {
      return await userModel.create(user);
    } catch (error) {
      req.logger.error(error);
      throw new Error("Internal server error");
    }
  }

  async updateUserByEmail(email, update) {
    try {
      return await userModel.updateOne({ email }, update);
    } catch (error) {
      req.logger.error(error);
      throw new Error("Internal server error");
    }
  }

  async deleteUserByName(email) {
    try {
      const result = await userModel.deleteOne({ email });
      console.log(result, 'mongo')
      if (result.deletedCount === 1) {
        return "Usuario eliminado correctamente.";
      } else {
        return "El usuario no fue encontrado.";
      }
    } catch (error) {
      req.logger.error(error);
      throw new Error("Error al eliminar el usuario");
    }
  }

  
}

export const sessionMongo = new Session();