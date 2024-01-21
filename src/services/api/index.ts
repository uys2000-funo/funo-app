type Methods = "POST" | "GET" | "PUT" | "DELETE" | "PATCH";

console.log(process.env.VUE_APP_USE_SERVER_URL);
export const serverUrl =
  process.env.VUE_APP_USE_SERVER_URL == "TRUE"
    ? process.env.VUE_APP_FIREBASE_SERVER_URL
    : "http://localhost:3000/api/";

console.log(serverUrl);
/**
 * Main http request handler for the application
 * @constructor
 * @param {string} path does not include https://localhost/api part to url
 * @param {Methods} method
 * @param {object} body
 * @returns {Response}
 */
export const httpRequest = function (
  url: string,
  method: Methods,
  body: object
) {
  const requestInit = { method: method } as RequestInit;
  if (method != "GET") requestInit.body = JSON.stringify(body);
  return fetch(url, requestInit);
};
