import { authService } from "../services/auth/auth.service";

export const authController = {
  register: authService.register,
  login: authService.login,
  // profile: authService.profile,
  // findUsers: authService.findUsers,
};
