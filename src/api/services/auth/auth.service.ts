import express, { Response } from "express";
import { AccountModel } from "../../schema/accounts.schema";
import { UserModel } from "../../schema/users.schema";
import { RoleModel } from "../../schema/roles.schema";
import { hash, compare } from "../../helpers/bcrypt";
import { Status, TypeUser } from "../../constants/enum";
import Jwt from "jsonwebtoken";

export const authService = {
  async register(
    req: express.Request,
    res: express.Response
  ): Promise<{ access_token: string; refresh_token: string } | Response> {
    try {
      const { email, username, password } = req.body;

      if (!email || !password || !username) {
        return res.status(400).send("missing data field");
      }

      const existingUser = await AccountModel.findOne({
        email,
      });

      if (existingUser) {
        return res.status(400).send("Account already exists");
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

      const payload = {
        account: account._id,
        username: username,
        role: roleId,
        status: Status.ACTIVE,
      };

      const refresh_token = Jwt.sign(
        {
          data: payload,
        },
        process.env.JWT_KEY,
        { expiresIn: "15d" }
      );

      const user = await UserModel.create({
        ...payload,
        refresh_token,
      }).then((data) => data.toObject());

      const access_token = Jwt.sign(
        {
          data: user,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );

      const result = {
        access_token,
        refresh_token,
      };

      return res.status(200).json(result).end();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  },

  async login(
    req: express.Request,
    res: express.Response
  ): Promise<{ access_token: string } | Response> {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("missing data field");
    }

    const isEmail = await AccountModel.findOne({ email });

    if (!isEmail) {
      return res.status(400).send("Email does not exist");
    }

    const isMath = compare(password, isEmail.password);

    if (!isMath) {
      return res.status(400).send("password does not match");
    }

    const user = await UserModel.findOne({ account: isEmail._id }).then(
      (data) => data.toObject()
    );

    const token = Jwt.sign(user, process.env.JWT_KEY, { expiresIn: "1h" });

    return res.json({ access_token: token }).end();
  },
};
