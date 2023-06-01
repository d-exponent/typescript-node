import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface MyJwtPayload extends JwtPayload {
  id: string;
}

export interface OperationalError extends Error {
  status: number;
  isOperational: boolean;
}

interface BirthDay {
  day: number;
  month: number;
  year: number;
}

interface Address {
  addressLineOne: string;
  addressLineTwo: string;
  town: string;
  county: string;
  postcode: string;
}

export interface DbUser {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  birthDay: BirthDay;
  currentAddress: Address;
  previousAddress: Address | undefined;
  role: string;
  active: boolean;
  createdAt: Date;
  hashPassword: (plainpassword: string) => Promise<void>;
  validatePassword: (plainPassword: string) => Promise<boolean>;
}

export interface IGotAuthUser extends Request {
  user: DbUser;
}
