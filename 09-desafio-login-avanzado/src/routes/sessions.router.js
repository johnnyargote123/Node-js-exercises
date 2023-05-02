import { Router } from "express";
import userModel from "../models/user.model.js";
import updateUserRoleMiddleware from "../middlewares/rol.js"
const router = Router();

router.post("/login", updateUserRoleMiddleware, async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email, password });
  
      if (!user) {
        return res
          .status(400)
          .res({ status: "error", error: "Incorrect credentials" });
      }
  
      await userModel.updateOne(
        { email },
        { $set: { rol: req.body.rol } }
      );
  
      req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        rol: req.body.rol,
      };
  
      return res.send({
        status: "success",
        message: "Logged in",
        payload: req.session.user,
      });
      
    } catch (error) {
      console.log(error);
    }
  });

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.clearCookie('connect.sid');
        res.redirect('/login');
      }
    });
  });

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .send({ status: "error", error: "User already exists" });
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
    return res.send({ status: "sucess", message: "user registered" });
  } catch (error) {
    console.log(error);
  }
});

export default router;
