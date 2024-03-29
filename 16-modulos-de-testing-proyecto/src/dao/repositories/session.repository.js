import { sessionMongo } from "../mongo/session.mongo.js";

class SessionRepository {
  async loginUser(email, password, rol) {
    try {
      const user = await sessionMongo.findOneByEmail(email);

      if (!user || user.password !== password) {
        throw new Error("Incorrect credentials");
      }
/* 
      if (user.rol == "") {
        user.rol = rol
      }
      await sessionMongo.updateUserByEmail(email, { $set: { rol: user.rol } }); */
      console.log(user.rol, 'rol')
      const result = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        rol: user.rol,
      };
      this.currentUser = result;
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error");
    }
  }

  async resetPassUser(email, password, token) {
    const user = await sessionMongo.findOneByEmail(email);
    try {
      console.log(password, user.password);
      if (password == user.password) {
        throw new Error("You can not change password with the last password");
      }
      if (password !== user.password) {
        await sessionMongo.updateUserByEmail(email, {
          $set: { password: password },
        });
        return user.password;
      }
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

  async registerUser(first_name, last_name, email, age, password, rol) {
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
        rol  
      };
      await sessionMongo.createUser(user);
      return { message: "User registered" };
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error");
    }
  }

  async forgotPasswordUser(email) {
    try {
      const user = await sessionMongo.findOneByEmail(email);

      if (!user) {
        throw new Error("User not found");
      }
      return { message: "User find" };
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

  async deleteUserByName(email) {
    try {
      const result = await sessionMongo.deleteUserByName(email);
      console.log(result, "respository");
      if (result.deletedCount === 1) {
        return "Usuario eliminado correctamente.";
      } else {
        return "El usuario no fue encontrado.";
      }
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error");
    }
  }
}

export const sessionRepository = new SessionRepository();
