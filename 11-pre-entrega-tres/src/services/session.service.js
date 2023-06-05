import { sessionRepository } from "../dao/repositories/session.repository.js";

class SessionService {
  async loginUser(email, password) {
    try {
      const user = await sessionRepository.loginUser(email, password);
      return user;
    } catch (error) {
      throw new Error("There are no products registered");
    }
  }

  
  async  logoutUser(data) {
    try {
      await sessionRepository.logoutUser(data);
    } catch (error) {
      console.log(error); // Log the error for debugging purposes
      throw new Error("An error occurred while logging out.");
    }
  }

  async registerUser(first_name, last_name, email, age, password) {
    try {
      const result = await sessionRepository.registerUser(
        first_name,
        last_name,
        email,
        age,
        password
      );
      return result;
    } catch (error) {
      throw new Error("Internal server error");
    }
  }

  githubAuth() {
  }

  githubCallback(req) {
    return sessionRepository.githubCallback(req);
  }
}

export const sessionService = new SessionService();