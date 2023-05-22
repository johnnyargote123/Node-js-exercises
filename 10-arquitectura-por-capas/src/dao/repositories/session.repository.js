import userModel from "../../dao/models/user.model.js";

class SessionRepository {
  async loginUser(email, password) {
    try {
      const user = await userModel.findOne({ email, password });

      if (!user) {
        throw new Error("Incorrect credentials");
      }

      await userModel.updateOne({ email }, { $set: { rol: user.rol } });

      return {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        rol: user.rol,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error");
    }
  }

  async logoutUser() {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
          reject(new Error("Internal server error"));
        } else {
          resolve();
        }
      });
    });
  }

  async registerUser(first_name, last_name, email, age, password) {
    try {
      const userExists = await userModel.findOne({ email });
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
      await userModel.create(user);
      return { message: "User registered" };
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error");
    }
  }

  githubAuth() {
    // Puedes personalizar esta función según tus necesidades
  }

  githubCallback(req) {
    return req.user;
  }
}


export const sessionRepository = new SessionRepository()