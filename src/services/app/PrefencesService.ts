import { setPrefance, getPrefence } from "@/services/capacitor/preferences";

export const setLastPrefences = function (key: string, data: object) {
  getPrefence("last" + key).then((d) => {
    setPrefance("latest" + key, d ? d : "{}");
    setPrefance("last" + key, JSON.stringify(data));
  });
};

export const getLastPrefences = async function (key: string) {
  const latest = await getPrefence("latest" + key);
  const last = await getPrefence("last" + key);
  return {
    latest: JSON.parse(latest ? latest : "{}"),
    last: JSON.parse(last ? last : "{}"),
  };
};
