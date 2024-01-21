import { httpRequest, serverUrl } from ".";

export const authenticationApiUrl = serverUrl + "mail/";

export const getUserMail = async function (uname: string) {
  const body = { uname };
  const reuqest = await httpRequest.pLogger(authenticationApiUrl, "POST", body);
  console.log("reuqest", reuqest);
  return await reuqest.json();
};
