import {Enviroment} from "@Src/utils";

export const getEnvironment = (): Enviroment => {
  const env = process.env.NODE_ENV;

  if (env === "production") {
    return "production";
  } else if (env === "development") {
    return "development";
  } else if (env === "local") {
    return "local";
  } else {
    throw new Error(
      'No environment configured. Please set NODE_ENV to "production", "development", or "local".',
    );
  }
};
