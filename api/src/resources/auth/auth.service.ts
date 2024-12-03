import jwt from "jsonwebtoken";
import { AppDataSource } from "./../../config/ormconfig";
import { User } from "../../entities/users";
import { validatePasswordStrength } from "../../utils/validatePassword";
import { Request, Response } from "express";
import { hashPassword, isValidPassword } from "../../utils/bcrypt.util";
import dotenv from "dotenv";

dotenv.config();

class AuthService {
  public async createUser(
    req: Request,
    res: Response
  ): Promise<Response | void> {
    const userRepository = AppDataSource.getRepository(User);
    try {
      // On récupère les données envoyées dans le body de la requête
      const { username, email, password } = req.body;

      // Validation basique
      if (!username || !email || !password) {
        return res
          .status(400)
          .json({ message: "Tous les champs sont requis." });
      }

      //Strong password
      const passwordError = validatePasswordStrength(password);
      if (passwordError) {
        return res.status(400).json({ message: passwordError });
      }

      const existingUser = await userRepository.findOne({
        where: { email },
      });
      if (existingUser) {
        return res.status(409).json({ message: "Email déjà utilisé." });
      }
      // Créer un nouvel utilisateur via UserService
      const passhash = await hashPassword(password);
      const newUser = userRepository.create({
        username,
        email,
        password: passhash,
      });
      await userRepository.save(newUser);

      // Retourner une réponse de succès
      return res
        .status(201)
        .json({ message: "Utilisateur créé avec succès", user: newUser });
    } catch (error: unknown) {
      // En cas d'erreur, on renvoie une réponse avec le code d'erreur 500
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return res
        .status(500)
        .json({
          message: "Erreur lors de la création de l'utilisateur",
          error: errorMessage,
        });
    }
  }

  public async login(req: Request, res: Response): Promise<Response | void> {
    const userRepository = AppDataSource.getRepository(User);
    try {
      const { email, password } = req.body;

      // Validation basique
      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }

      // Vérifier si l'utilisateur existe
      const user = await userRepository.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Invalid email" });
      }

      // Comparer le mot de passe avec le hash stocké
      const isPasswordValid = await isValidPassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password." });
      }

      // Générer un JWT si les identifiants sont valides
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
      }
      const token = jwt.sign({ userId: user.id, email: user.email }, secret, {
        expiresIn: "365d",
      });

      // Répondre avec le token
      return res.status(200).json({ message: "Login successful", token });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return res.json({ message: "Error creating user", error: errorMessage });
    }
  }
}

export default AuthService;
