import { FunoUser } from "@/types/user";
import { httpRequest, serverUrl } from ".";

export const registerApiUrl = serverUrl + "user/";

export const sendRegisterRequest = async function (
  user: FunoUser,
  password: string,
  photoUrl: string
) {
  const body = { password: password, photoUrl, user };
  const request = await httpRequest.pLogger(registerApiUrl, "POST", body);
  console.log(request);
  return await request.json();
};
