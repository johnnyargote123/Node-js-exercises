import {sessionService} from "../services/session.service.js";



export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await sessionService.loginUser(email, password);

    req.session.user = user;
    req.logger.debug('User logged in successfully')
    return res.send({
      status: "success",
      message: "Logged in",
      payload: req.session.user,
    });
  } catch (error) {
    req.logger.error('Error occurred during login');
    return res.status(500).send({ status: "error", error: "Internal server error" });
  }
}




export async function logout(req, res) {
  try {
    const logoutData = req.session;
    await sessionService.logoutUser(logoutData); 
    req.logger.debug('User logged out successfully')
    res.clearCookie('connect.sid');
    res.redirect('/login');
  } catch (error) {
    req.logger.error('Error occurred during logout');
    return res.status(500).send({ status: "error", error: "Internal server error" });
  }
}

export async function register(req, res) {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    await sessionService.registerUser(first_name, last_name, email, age, password);
    req.logger.debug('User registered successfully')
    return res.send({ status: "success", message: "User registered" });
  } catch (error) {
    req.logger.error('Error occurred during user registration: ' + error);
    return res.status(500).send({ status: "error", error: "Internal server error" });
  }
}

export function githubAuth(req, res) {
  sessionService.githubAuth();
  req.logger.warning('GitHub authentication initiated')
}

export function githubCallback(req, res) {
  req.session.user = sessionService.githubCallback(req);
  res.redirect("/");
}