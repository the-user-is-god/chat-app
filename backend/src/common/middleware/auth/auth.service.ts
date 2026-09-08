import { ITokenService } from "@common/interfaces/token-service.interface.js";
import { AppError } from "@common/utils/appError.js";
import { Errors } from "@common/utils/errors.js";
import { CryptoJwtTokenService } from "@infrastructure/security/crypto-jwt.service.js";
import { AuthRepository } from "@modules/auth/repositories/auth.repository.js";
import { UserEntity } from "@modules/users/domain/user.entity.js";

export const makeAuthenticateUser = (
  tokenService: ITokenService,
  authRepository: AuthRepository,
) => {
  return async (token: string): Promise<UserEntity> => {
    try {
      const decoded = tokenService.verifyAccessToken(token);

      const user = await authRepository.findById(decoded.id);

      if (!user) {
        throw Errors.notFound("User not found");
      }

      if (user.isBanned) {
        throw Errors.forbidden("Your account has been banned. Access Denied");
      }

      return user;
    } catch (error) {
      // Don't turn your own authorization errors into
      // "Invalid or expired token".
      if (error instanceof AppError) {
        throw error;
      }
      throw Errors.unauthorized("Invalid or expired token");
    }
  };
};

const defaultTokenService = new CryptoJwtTokenService();
const defaultAuthRepository = new AuthRepository();

export const authenticateUser = makeAuthenticateUser(defaultTokenService, defaultAuthRepository);
