import JWT from 'jsonwebtoken';
import { prismaClient } from "../lib/db";
import { createHmac, randomBytes } from 'node:crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'wdwd';

export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface GetUserTokenPayload {
  email: string;
  password: string;
}

class UserService {
  public static generateHash(salt: string, password: string) {
    return createHmac('sha256', salt).update(password).digest('hex');
  }

  public static grtUserById(id:string) {
    return prismaClient.user.findUnique({ where:{id}});
}

  public static createUser(payload: CreateUserPayload) {
    const { firstName, lastName, email, password } = payload;
    const salt = randomBytes(32).toString('hex');
    const hashPassword = this.generateHash(salt, password);
    return prismaClient.user.create({
      data: {
        firstName,
        lastName: lastName ?? '',
        email,
        password: hashPassword,
        salt: salt,
      },
    });
  }

  public static getUserByEmail(email: string) {
    return prismaClient.user.findUnique({ where: { email } });
  }

  public static async getUserToken(payload: GetUserTokenPayload) {
    const { email, password } = payload;
    const user = await UserService.getUserByEmail(email);
    if (!user) throw new Error('user not found');
    const userhashpassword = this.generateHash(user.salt, password);
    if (userhashpassword !== user.password) throw new Error('incorrect password');
    const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);
    return token;
  }

  public static decodeJWToken(token:string) {
    return JWT.verify(token, JWT_SECRET);
  }
}

export default UserService;