import { internet, seed } from "faker";

export const getFakeUserCreds = (): {
  username: string;
  password: string;
} => {
  seed(Date.now() + Math.random() * 100000);

  return {
    username: internet.userName(),
    password: internet.password(7),
  };
};
