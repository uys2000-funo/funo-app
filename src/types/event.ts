import { OnlineAddress, PhysicalAddress } from "./address";
import { FirebaseDocument } from "./firebase";

const urls = [
  "https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg",
  "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8",
  "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
  "https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.webp?b=1&s=170667a&w=0&k=20&c=ahypUC_KTc95VOsBkzLFZiCQ0VJwewfrSV43BOrLETM=",
  "https://leadership.ng/wp-content/uploads/2023/03/davido.png",
];

export type EventMainTag =
  | "sport"
  | "education"
  | "art"
  | "meet"
  | "music"
  | "tech";

export class EventGeneralDateData {
  start!: number;
  end!: number;

  constructor(isExample = false) {
    this.start = Date.now();
    this.end = Date.now();
    if (isExample) this.end += 1000000;
  }
}

export class EventConditionData {
  needsApproval!: boolean;
  userLimit!: number;
  ageLimit!: [number, number];
  price!: number;
  constructor(isExample = false) {
    this.needsApproval = false;
    this.userLimit = 0;
    this.ageLimit = [0, 0];
    this.price = 0;
    if (isExample) {
      this.needsApproval = Math.random() < 0.5 ? true : false;
      this.userLimit = Math.random() < 0.5 ? 22 : 0;
      this.ageLimit = Math.random() ? [0, 18] : [0, 0];
      this.price = Math.random() ? 100 : 0;
    }
  }
}
export class EventGeneralTagsData {
  main!: EventMainTag;
  side!: string[];

  constructor(isExample = false) {
    this.main = "art";
    this.side = [];
    if (isExample) {
      const tags: EventMainTag[] = [
        "sport",
        "education",
        "art",
        "meet",
        "music",
        "tech",
      ];
      const index = Math.floor(Math.random() * 6) + 1 - 1;
      this.main = tags[index];
      this.side.push("sTag");
    }
  }
}
export class EventGeneralData {
  name!: string;
  description!: string;
  date!: EventGeneralDateData;
  location!: PhysicalAddress | OnlineAddress;
  tags!: { main: EventMainTag; side: string[] };
  photoUrls!: string[];

  constructor(isOnline = false, isExample = false) {
    this.name = "";
    this.description = "";
    this.date = { start: 0, end: 0 };
    this.location = !isOnline ? new PhysicalAddress() : new OnlineAddress();
    this.tags = new EventGeneralTagsData(isExample);
    this.photoUrls = [];
    if (isExample) {
      this.name = "Example Name";
      this.description = "Example Description";
      this.date = { start: Date.now(), end: Date.now() + 100000 };
      this.location = !isOnline
        ? new PhysicalAddress(true)
        : new OnlineAddress(true);
      this.photoUrls = [];
    }
  }
}
export class EventUsersData {
  //Last Joined Users Photos (10 Photos)
  userPhotoUrls!: string[];
  userCount!: number;
  constructor(isExample = false) {
    this.userPhotoUrls = [];
    this.userCount = 0;
    if (isExample) {
      const addPerson = () => {
        if (Math.random() < 0.8) {
          this.userPhotoUrls.push(
            urls[Math.floor(Math.random() * urls.length)]
          );
          this.userCount++;
          addPerson();
        }
      };
      addPerson();
    }
  }
}
export class EventOwnerData {
  uID!: string;
  name!: string;
  photoUrl!: string;
  email!: string;
  phone!: string;
  isApproved!: boolean;

  constructor(example = false) {
    this.uID = "";
    this.name = "";
    this.photoUrl = "";
    this.email = "";
    this.phone = "";
    this.isApproved = false;
    if (example) {
      this.uID = Math.random() < 0.5 ? "-uID" : "-euID";
      this.name = Math.random() < 0.5 ? "Mehmet" : "Funo";
      this.photoUrl = urls[Math.floor(Math.random() * urls.length)];
      this.email = "example@mail.com";
      this.phone = "+9055163983619";
      this.isApproved = Math.random() < 0.5 ? true : false;
    }
  }
}
export class EventData {
  general!: EventGeneralData;
  conditions!: EventConditionData;
  users!: EventUsersData;
  owners!: EventOwnerData[];
  constructor(isOnline = false, isExample = false) {
    this.general = new EventGeneralData(isOnline, isExample);
    this.conditions = new EventConditionData(isExample);
    this.users = new EventUsersData(isExample);
    this.owners = [];
    if (isExample) this.owners.push(new EventOwnerData(true));
  }
}

export class FunoEvent {
  eID?: string;
  data!: EventData;
  firebaseDocument!: FirebaseDocument;
  constructor(isOnline = false, isExample = false) {
    this.eID = "";
    this.data = new EventData(isOnline, isExample);
    this.firebaseDocument = new FirebaseDocument(isExample);
    if (isExample) {
      this.eID = "-eID";
    }
    if (isExample && isOnline) this.eID = "-oeID";
  }
}
