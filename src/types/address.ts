export type PhysicalAddress = {
  text: string;
  description: string;

  city: string;
  district: string;
  country: string;

  coordinate: {
    latitude: number;
    longitude: number;
  };
};

export type OnlineAddress = {
  app: string;
  url: string;
  description: string;
};
