import AccountModel from "../../schema/accounts.schema";
import UserModel from "../../schema/users.schema";
import RoleModel from "../../schema/roles.schema";
import { hash, compare } from "../../helpers/bcrypt";
import { Status, TypeUser } from "../../constants/enum";
import Jwt from "jsonwebtoken";
import { CreateAccount } from "./types/create-auth.type";
import { LoginAuth } from "./types/login-auth.type";
import createError from "http-errors";

export const authService = {
  async register(data: CreateAccount) {
    try {
      const { email, username, password } = data;

      if (!email || !password || !username) {
        throw createError.BadRequest("Missing data field");
      }

      const existingUser = await AccountModel.findOne({
        email,
      });

      if (existingUser) {
        throw createError.Conflict(`${email} is ready been registered`);
      }

      const hashPassword = hash(password);

      const roleId = await RoleModel.findOne({
        name: TypeUser.ADMIN,
      }).then((role) => role._id);

      const account = await AccountModel.create({
        email,
        password: hashPassword,
        status: Status.ACTIVE,
      });

      const user = await UserModel.create({
        account: account._id,
        username: username,
        role: roleId,
        status: Status.ACTIVE,
      }).then((data) => data.toObject());

      const refresh_token = Jwt.sign(
        {
          data: { accountId: account._id },
        },
        process.env.JWT_KEY,
        { expiresIn: "30d" }
      );

      await AccountModel.findOneAndUpdate(
        { _id: account._id },
        { refresh_token }
      );

      const access_token = Jwt.sign(
        {
          data: { accountId: account._id, users: [user._id] },
        },
        process.env.JWT_KEY,
        { expiresIn: 600 }
      );

      const result = {
        access_token,
        refresh_token,
      };

      return { status: 200, data: result };
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  async login(data: LoginAuth) {
    try {
      const { email, password } = data;

      if (!email || !password) {
        throw createError.BadRequest("Missing data field");
      }

      const isEmail = await AccountModel.findOne({ email });

      if (!isEmail) {
        throw createError.BadRequest(`${email} is not exist`);
      }

      const isMath = compare(password, isEmail.password);

      if (!isMath) {
        throw createError.BadRequest("Password does not match");
      }

      const users = await UserModel.find({
        account: isEmail._id,
      });

      const dataAccount = {
        accountId: isEmail._id,
        users: users.map((user) => user._id),
      };

      const token = Jwt.sign({ data: dataAccount }, process.env.JWT_KEY, {
        expiresIn: 600,
      });

      const result = {
        access_token: token,
        refresh_token: isEmail.refresh_token,
      };

      return { status: 200, data: result };
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  async getNewAccessToken(refresh_token: string) {
    try {
      const account: any = Jwt.verify(refresh_token, process.env.JWT_KEY);

      if (!account) {
        throw createError.BadRequest("Not found token or token expired");
      }

      const users = await UserModel.find({ account: account.data.accountId });

      const token = Jwt.sign(
        {
          data: {
            ...account.data,
            users: users.map((user) => user._id),
          },
        },
        process.env.JWT_KEY,
        {
          expiresIn: 600,
        }
      );

      return {
        status: 200,
        data: {
          access_token: token,
        },
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  async getAllUserByAccount(account: any) {
    try {
      const accountId = account.data.accountId;

      const users = await UserModel.find({ account: accountId }).populate(
        "role",
        "name"
      );

      if (!users) throw createError.BadRequest(`Not found user`);

      return { status: 200, data: users };
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  async getMainUserAccount(account: any, userId: string) {
    try {
      const main = await UserModel.findOne({ _id: userId })
        .populate("role", "name")
        .then((data) => data.toObject());

      if (!main) throw createError.BadRequest(`User is not exist`);

      const userElse = await UserModel.find({
        account: account.data.accountId,
        _id: { $ne: userId },
      }).populate("role", "name");

      if (!userElse) throw createError.BadRequest();

      const result = {
        ...main,
        users: userElse,
      };

      return { status: 200, data: result };
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};
