import { OnlineAddress, PhysicalAddress } from "./address";
import { FirebaseDocument } from "./firebase";

export type EventMainTag =
  | "sport"
  | "education"
  | "art"
  | "meet"
  | "music"
  | "tech";

export class EventUsers {
  //Last Joined Users Photos (10 Photos)
  userPhotoUrls!: string[] | null;
  userCount!: number | null;
}
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
    this.photoUrl = "https://avatars.githubusercontent.com/u/55789855?s=40&v=4";
    this.email = "mehmetuysal2000@gm.com";
    this.phone = "+9055163983619";
    this.isApproved = false;
  }
}
export class EventData {
  eID?: string;
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

  users!: EventUsers;

  owners!: EventOwner[];
  firebase!: FirebaseDocument;

  constructor(isOnline = false, isExample = false) {
    this.eID = "testEventID";
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
      photoUrls: [],
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
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem aliquid veniam, esse consequuntur laborum saepe. Cum voluptatem maiores est sunt incidunt laudantium, cumque mollitia nobis quo rerum, aliquid animi repudiandae nostrum perspiciatis praesentium modi, aut eum veniam id molestiae soluta reiciendis at sed! At, quasi quod? Dolorem distinctio, culpa voluptas exercitationem asperiores ipsam nostrum molestiae. Consectetur inventore, quas excepturi iste aspernatur, modi aliquam nesciunt, dolore commodi nostrum hic quae non voluptate dicta fugit laboriosam sed dolor eligendi. Minima, placeat a ratione eius asperiores ipsam, fugiat aliquam exercitationem nesciunt fuga explicabo dicta nulla recusandae ducimus sit vel, temporibus deleniti. Vitae, neque?",
        date: { start: Date.now(), end: Date.now() + 10000000 },
        location: {
          text: "İzmir, Muğla, Sıdacık, 9200 sokak, No 5",
          description: "Sağa Dön Solda",
          city: "İzmir",
          place: "Tiyatro Salanu, Sabah Akşam Buluşalık Diyarı",
          district: "Muğla",
          country: "Türkiye",
          coordinate: {
            latitude: 41.009339,
            longitude: 28.965892,
          },
        },
        tags: {
          main: "art",
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
        this.general.photoUrls?.reverse();
      }
    }
  }
}
