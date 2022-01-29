import { Error } from "../types/base";

export const error = (errors: string, type: string): Error => {
  return { errors, type };
};
