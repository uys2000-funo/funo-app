const url = process.env.VUE_APP_FIREBASE_SERVER_URL;

export const httpRequest = function (
  path: string,
  method: "POST",
  body: Record<string, unknown>
) {
  return fetch(url + path, {
    method: method,
    body: JSON.stringify(body),
  });
};
