import { AppDataSource } from "./../../config/ormconfig";
import { User } from "../../entities/users";
import { validatePasswordStrength } from "../../utils/validatePassword";
import { Request, Response } from "express";
import { hashPassword } from "../../utils/bcrypt.util";

class AuthService {
  public async createUser(
    req: Request,
    res: Response,
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
      return res.status(201).json({
        message: "Utilisateur créé avec succès",
        user: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
        },
      });
    } catch (error: unknown) {
      // En cas d'erreur, on renvoie une réponse avec le code d'erreur 500
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      console.error("Error creating user:", error);
      return res.status(500).json({
        message: "Erreur lors de la création de l'utilisateur",
        error: errorMessage,
      });
    }
  }
}

export default AuthService;
