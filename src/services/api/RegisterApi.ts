import { FunoUser } from "@/types/user";
import { httpRequest } from ".";

export const sendRegisterRequest = async function (
  user: FunoUser,
  password: string,
  photoUrl: string
) {
  const body = { password: password, photoUrl, user };
  const reuqest = await httpRequest.pLogger("user/", "POST", body);
  console.log(reuqest);
  return await reuqest.json();
};
