const url = "http://localhost:3000/api/";

// eslint-disable-next-line
export const prepeareRequest = function (body: Record<string, any>) {
  if (!body.firebase)
    body.firebase = {
      ctimestamp: Date.now(),
      utimestamp: 0,
      dtimestamp: 0,
      updateCount: 0,
      requestCount: 0,
      ownerId: "anonymous",
      creatorId: "anonymous",
    };
  else {
    if (!body.firebase.ctimestamp) body.firebase.ctimestamp = Date.now();
    if (!body.firebase.utimestamp) body.firebase.utimestamp = 0;
    if (!body.firebase.dtimestamp) body.firebase.dtimestamp = 0;
    if (!body.firebase.updateCount) body.firebase.updateCount = 0;
    if (!body.firebase.requestCount) body.firebase.requestCount = 0;
    if (!body.firebase.ownerId) body.firebase.ownerId = "anonymous";
    if (!body.firebase.creatorId) body.firebase.creatorId = "anonymous";
  }
  return body;
};

export const httpRequest = function (
  path: string,
  method: "POST",
  // eslint-disable-next-line
  body: Record<string, any>
) {
  return fetch(url + path, {
    method: method,
    body: JSON.stringify(body),
  });
};
