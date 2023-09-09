import { OnlineAddress, PhysicalAddress } from "./address";
import { FirebaseDocument } from "./firebase";

export type EventMainTag = "Sport" | "Education" | "Art" | "Meet" | "Music";

export class EventOwner {
  uID!: string;
  name!: string;
  photoUrl!: string;
  email!: string;
  phone!: string;
  isApproved!: boolean;

  constructor() {
    this.uID = "000";
    this.name = "Mehmet";
    this.photoUrl = "";
    this.email = "mehmetuysal2000@gm.com";
    this.phone = "+9055163983619";
    this.isApproved = false;
  }
}
export class EventData {
  general!: {
    name: string;
    description: string | null;

    date: { start: number; end: number };
    location: PhysicalAddress | OnlineAddress;
    tags: { main: EventMainTag | null; side: string[] | null };

    photoUrls: string[] | null;
  };

  conditions!: {
    needsApproval: boolean;
    userLimit: number | null;
    ageLimit: [number, number] | null;
    price: number | null;
  };

  users!: {
    //Last Joined Users Photos (10 Photos)
    userPhotoUrls: string[] | null;
    userCount: number | null;
  };

  owners!: EventOwner[];
  firebase!: FirebaseDocument;

  constructor(isOnline = false, isExample = false) {
    this.general = {
      name: "",
      description: "",
      date: { start: Date.now(), end: Date.now() },
      location: {
        text: "",
        description: "",
        city: "",
        place: "",
        district: "",
        country: "",
        coordinate: {
          latitude: 0,
          longitude: 0,
        },
      },
      tags: {
        main: null,
        side: [],
      },
      photoUrls: [
        "https://i.dugun.com/gallery/87269/preview_first-step-wedding-event_w5T7vfjQ.jpeg",
        "https://i.dugun.com/gallery/65413/preview_swiss-event_Y67eZCCS.jpg",
      ],
    };
    this.conditions = {
      needsApproval: false,
      userLimit: null,
      ageLimit: null,
      price: null,
    };
    this.users = {
      userPhotoUrls: [],
      userCount: null,
    };
    this.owners = [new EventOwner()];
    if (isOnline) {
      this.general.location = {
        app: "",
        url: "",
        description: "",
      };
    }
    if (isExample) {
      this.general = {
        name: "Etkinlik İsmir",
        description: "Etkinlik Açıklaması",
        date: { start: Date.now(), end: Date.now() + 10000000 },
        location: {
          text: "İzmir, Muğla, Sıdacık, 9200 sokak, No 5",
          description: "Sağa Dön Solda",
          city: "İzmir",
          place: "Tiyatro Salanu",
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
        userPhotoUrls: [
          "https://i.dugun.com/gallery/65413/preview_swiss-event_Y67eZCCS.jpg",
          "https://i.dugun.com/gallery/87269/preview_first-step-wedding-event_w5T7vfjQ.jpeg",
          "https://i.dugun.com/gallery/65413/preview_swiss-event_Y67eZCCS.jpg",
          "https://i.dugun.com/gallery/87269/preview_first-step-wedding-event_w5T7vfjQ.jpeg",
          "https://i.dugun.com/gallery/65413/preview_swiss-event_Y67eZCCS.jpg",
          "https://i.dugun.com/gallery/87269/preview_first-step-wedding-event_w5T7vfjQ.jpeg",
          "https://i.dugun.com/gallery/65413/preview_swiss-event_Y67eZCCS.jpg",
        ],
        userCount: 102,
      };
      this.owners = [new EventOwner()];
      if (isOnline) {
        this.general.location = {
          app: "Facebook",
          url: "mehmetuysal.dev",
          description: "Uygulamayı sitemizden yükelyebilirsiniz",
        };
        this.conditions.price = null;
        this.owners[0].isApproved = true;
      }
    }
  }
}
