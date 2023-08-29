import { OnlineAddress, PhysicalAddress } from "./address";
import { FirebaseDocument } from "./firebase";

export type EventMainTag = "Sport" | "Education" | "Art" | "Meet" | "Music";

export class EventOwner {
  uID!: string;
  name!: string;
  photoUrl!: string;
  email!: string;
  phone!: string;

  constructor() {
    this.uID = "";
    this.name = "";
    this.photoUrl = "";
    this.email = "";
    this.phone = "";
  }
}
export class EventData {
  general!: {
    name: string;
    description: string | undefined;

    date: { start: number; end: number };
    location: PhysicalAddress | OnlineAddress;
    tags: { main: EventMainTag; side: string[] | undefined };

    photoUrls: string[];
  };

  conditions!: {
    needsApproval: boolean;
    userLimit: number | undefined;
    ageLimit: [number, number] | undefined;
    price: number | undefined;
  };

  users!: {
    //Last Joined Users Photos (10 Photos)
    userPhotoUrls: string[];
    userCount: number;
  };

  owners!: EventOwner[];
  firebase!: FirebaseDocument;

  constructor(isOnline = false) {
    this.general = {
      name: "Etkinlik İsmir",
      description: "Etkinlik Açıklaması",
      date: { start: Date.now(), end: Date.now() + 1000 },
      location: {
        text: "İzmir, Muğla, Sıdacık, 9200 sokak, No 5",
        description: "Sağa Dön Solda",
        city: "İzmir",
        district: "Muğla",
        country: "Türkiye",
        coordinate: {
          latitude: 0,
          longitude: 0,
        },
      },
      tags: {
        main: "Sport",
        side: ["FRP"],
      },
      photoUrls: [
        "https://i.dugun.com/gallery/87269/preview_first-step-wedding-event_w5T7vfjQ.jpeg",
        "https://i.dugun.com/gallery/65413/preview_swiss-event_Y67eZCCS.jpg",
      ],
    };
    this.conditions = {
      needsApproval: false,
      userLimit: 10,
      ageLimit: [18, 27],
      price: 1000,
    };
    this.users = {
      userPhotoUrls: [],
      userCount: 0,
    };
    this.owners = [new EventOwner()];
    if (isOnline)
      this.general.location = {
        app: "Facebook",
        url: "mehmetuysal.dev",
        description: "Uygulamayı sitemizden yükelyebilirsiniz",
      };
  }
}
