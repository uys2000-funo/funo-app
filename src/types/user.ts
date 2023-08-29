import { FirebaseDocument } from "./firebase";

export class IndividualUser {
  general: {
    name: string;
    surname: string;
    phone: string;
    birthdate: number;
    gender: boolean;
    photoUrl: string;
  };
  account: {
    name: string;
    mail: string;
  };
  interests: {
    main: string[];
    side: string[];
  };
  firebase: FirebaseDocument;

  constructor() {
    this.general = {
      name: "",
      surname: "",
      phone: "",
      birthdate: 0,
      gender: true,
      photoUrl: "",
    };
    this.account = {
      name: "",
      mail: "",
    };
    this.interests = {
      main: [""],
      side: [""],
    };
    this.firebase = {
      ctimestamp: 0,
      utimestamp: 0,
      dtimestamp: 0,

      requestCount: 0,
      updateCount: 0,

      creatorId: "",
      ownerId: "",
    };
  }
}
export class EnterpriseUser {
  general: {
    name: string;
    taxNumber: string;
    phone: string;
    address: string;
    photoUrl: string;
    isVerified: boolean;
  };
  account: {
    name: string;
    mail: string;
  };
  interests: {
    main: string[];
    side: string[];
  };
  firebase: FirebaseDocument;

  constructor() {
    this.general = {
      name: "",
      taxNumber: "",
      phone: "",
      address: "",
      photoUrl: "",
      isVerified: false,
    };
    this.account = {
      name: "",
      mail: "",
    };
    this.interests = {
      main: [""],
      side: [""],
    };
    this.firebase = {
      ctimestamp: 0,
      utimestamp: 0,
      dtimestamp: 0,

      requestCount: 0,
      updateCount: 0,

      creatorId: "",
      ownerId: "",
    };
  }
}

export type UserData = IndividualUser | EnterpriseUser;
