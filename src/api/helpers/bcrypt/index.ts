import * as bcrypt from "bcrypt";

export const hash = (value: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(value, salt);
};

export const compare = (value: string, hash: string): boolean => {
  return bcrypt.compareSync(value, hash);
};
