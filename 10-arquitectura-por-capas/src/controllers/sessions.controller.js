import {sessionRepository} from "../dao/repositories/session.repository.js";



export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await sessionRepository.loginUser(email, password);

    req.session.user = user;

    return res.send({
      status: "success",
      message: "Logged in",
      payload: req.session.user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "error", error: "Internal server error" });
  }
}

export async function logout(req, res) {
  try {
    await sessionRepository.logoutUser();
    res.clearCookie('connect.sid');
    res.redirect('/login');
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "error", error: "Internal server error" });
  }
}

export async function register(req, res) {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    await sessionRepository.registerUser(first_name, last_name, email, age, password);
    return res.send({ status: "success", message: "User registered" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "error", error: "Internal server error" });
  }
}

export function githubAuth(req, res) {
  sessionRepository.githubAuth();
}

export function githubCallback(req, res) {
  req.session.user = sessionRepository.githubCallback(req);
  res.redirect("/");
}