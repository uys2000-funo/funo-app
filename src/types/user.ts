import { FirebaseDocument } from "./firebase";

export class User {
  general!: {
    name: string;
    phone: string;
    photoUrl: string;
  };
  account!: {
    name: string;
    mail: string;
  };
  counts?: {
    followers?: number;
    following?: number;
    posints?: number;
    posts?: number;
    comments?: number;
    likes?: number;
    events?: number;
    participating?: number;
  };
  settings?: {
    privacy?: {
      showMail?: boolean;
    };
  };
  interests?: {
    main?: string[];
    side?: string[];
  };
  firebase?: FirebaseDocument;
}
export class IndividualUser extends User {
  general: {
    name: string;
    surname: string;
    phone: string;
    birthdate: number;
    gender: boolean;
    photoUrl: string;
  };
  constructor() {
    super();
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
    this.counts = {};
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
export class EnterpriseUser extends User {
  general: {
    name: string;
    taxNumber: string;
    phone: string;
    address: string;
    photoUrl: string;
    isVerified: boolean;
  };
  constructor() {
    super();
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
