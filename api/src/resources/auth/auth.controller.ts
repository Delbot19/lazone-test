import { Router } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import AuthService from "./auth.service";

class AuthController implements Controller {
  public path = "/api";
  public router = Router();
  private readonly AuthService = new AuthService();

  constructor() {
    this.router.post(`${this.path}/register`, this.AuthService.createUser);
    this.router.post(`${this.path}/login`, this.AuthService.login);
  }
}

export default AuthController;
