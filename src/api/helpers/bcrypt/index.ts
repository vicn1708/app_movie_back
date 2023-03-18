import * as bcrypt from "bcrypt";

export const hash = (value: string): string => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(value, salt);
};

export const compare = (value: string, hash: string): boolean => {
  return bcrypt.compareSync(value, hash);
};
