import { FirebaseDocument, FirabasePagination } from "./firebase";
const names = [
  "Merve Aksu",
  "Oğuz Özçelik",
  "Çağatay Suna",
  "Özge Pekdinç",
  "Alara Okyay",
  "Aksel Nagaşoğlu",
];
const messages = [
  "Yarın akşam 8 gibi buluşup gideriz o zaman?",
  "Olur saat kaçta başlayacak ona göre hazır olurum",
  "Tamamdır o zaman akşam görüşürüz",
  "İyi günler etkinlik ücretli mi ?",
  "Evet etkinliğimiz ücretlidir.",
  "Ücret ne kadar?",
  "45 tl efendim",
];
const photoUrls = [
  "https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg",
  "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8",
  "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
  "https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.webp?b=1&s=170667a&w=0&k=20&c=ahypUC_KTc95VOsBkzLFZiCQ0VJwewfrSV43BOrLETM=",
  "https://leadership.ng/wp-content/uploads/2023/03/davido.png",
];
export class MessageData {
  uID!: string;
  photoUrl!: string;
  message!: string;
  hasAccess!: string[];
  /**
   * MessageData Object
   * @param {boolean} isExample - Creates a example MessageData
   */
  constructor(isExample = false) {
    this.message = "";
    this.photoUrl = "";
    this.hasAccess = [];
    if (isExample) {
      this.uID = Math.random() < 0.5 ? "-uID" : "-euID";
      this.photoUrl = photoUrls[Math.floor(Math.random() * photoUrls.length)];
      this.message = messages[Math.floor(Math.random() * messages.length)];
      this.hasAccess = ["-uID", "-euID"];
    }
  }
}

export class Message {
  mID?: string;
  data!: MessageData;
  firebaseDocument?: FirebaseDocument;
  /**
   * Message Object
   * @param {boolean} isExample - Creates a example Message
   */
  constructor(isExample = false) {
    this.mID = "";
    this.data = new MessageData(isExample);
    this.firebaseDocument = new FirebaseDocument(isExample);
    if (isExample) this.mID = "-mID";
  }
}

export class MessageSummaryData {
  chatName!: string;
  participants!: string[];
  participantsPhotoUrls!: string[];
  messages?: Message[];
  /**
   * MessageSummaryData Object
   * @param {boolean} isExample - Creates a example MessageSummaryData
   */
  constructor(isExample = false) {
    this.chatName = "";
    this.participants = [];
    this.participantsPhotoUrls = [];
    this.messages = [];
    if (isExample) {
      this.chatName = names[Math.floor(Math.random() * names.length)];
      this.participants = ["-uID", "-euID"];
      this.participantsPhotoUrls.push(
        photoUrls[Math.floor(Math.random() * photoUrls.length)]
      );
      this.participantsPhotoUrls.push(
        photoUrls[Math.floor(Math.random() * photoUrls.length)]
      );
      this.messages = [new Message(true)];
    }
  }
}
export class MessageSummary {
  mcID?: string;
  data!: MessageSummaryData;
  firebaseDocument!: FirebaseDocument;
  /**
   * MessageSummary Object
   * @param {boolean} isExample - Creates a example MessageSummary
   */
  constructor(isExample = false) {
    this.mcID = "";
    this.data = new MessageSummaryData(isExample);
    this.firebaseDocument = new FirebaseDocument(isExample);
    if (isExample) this.mcID = "-mcID";
  }
}

export class MessageList {
  mcID?: string;
  data!: Message[];
  firabasePagination?: FirabasePagination;
  firebaseDocument?: FirebaseDocument;
  /**
   * MessageList Object
   * @param {boolean} isExample - Creates a example MessageList
   */
  constructor(isExample = false) {
    this.mcID = "";
    this.data = [];
    this.firabasePagination = new FirabasePagination(isExample);
    this.firebaseDocument = new FirebaseDocument(isExample);
    if (isExample) {
      this.mcID = "-mcID";
      for (let i = 0; i < 20; i++) this.data.push(new Message(true));
    }
  }
}
// eslint-disable-next-line
if (false) {
  ("Stracture of Messages in DB");

  const ExampleDataBaseStracture = {
    // Collection Name
    _Messages: {
      // Custom mID for Chats
      mID: {
        // uIDs of users in chat
        chatName: "",
        participants: ["uID"],
        participantsPhotoUrls: ["uID"],
        // SubCollection
        messages: {
          // Message
          mID: {
            data: {
              message: "",
              // users whic are able to see
              hasAccess: ["uID"],
            },
            firebase: new FirebaseDocument(),
          },
        },
        firebase: new FirebaseDocument(),
      },
    },
  };
  ExampleDataBaseStracture;
}
