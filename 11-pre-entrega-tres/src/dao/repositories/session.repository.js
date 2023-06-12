import { sessionMongo } from "../mongo/session.mongo.js";

class SessionRepository {


  async loginUser(email, password) {
    try {
      const user = await sessionMongo.findOneByEmail(email);

      if (!user || user.password !== password) {
        throw new Error("Incorrect credentials");
      }

      await sessionMongo.updateUserByEmail(email, { $set: { rol: user.rol } });

      const result = {
        first_name: user.first_name, 
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        rol: user.rol,
      };
      this.currentUser = result
      return result
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error");
    }
  }

  async logoutUser(data) {
    try {
      data.user = null;
      data.loggedIn = false;
      return "Logout successful";
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred while logging out.");
    }
  }

  async registerUser(first_name, last_name, email, age, password) {
    try {
      const userExists = await sessionMongo.findOneByEmail(email);
      if (userExists) {
        throw new Error("User already exists");
      }

      const user = {
        first_name,
        last_name,
        email,
        age,
        password,
        rol: '',
      };
      await sessionMongo.createUser(user);
      return { message: "User registered" };
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error");
    }
  }

  githubAuth() {
    // Implement GitHub authentication logic here
  }

  githubCallback(req) {
    return req.user;
  }
}

export const sessionRepository = new SessionRepository();