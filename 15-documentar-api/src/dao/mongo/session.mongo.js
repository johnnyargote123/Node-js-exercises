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

  
}

export const sessionMongo = new Session();