import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  protected service = new AuthService();

  async login(req: Request, res: Response) {
    const { token } = await this.service.login(req.body);
    res.status(200).json({ success: true, token });
  }
}
