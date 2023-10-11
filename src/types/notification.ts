import { FirebaseDocument, FirabasePagination } from "./firebase";

const titles = [
  "Merve Aksu",
  "Oğuz Özçelik",
  "Çağatay Suna",
  "Özge Pekdinç",
  "Alara Okyay",
  "Aksel Nagaşoğlu",
];
const contents = [
  "Resim ergisi etkinliğinden atmosfer paylaş",
  "Etkinliği değerlendirin",
  "Ali Acar bir mesaj gönderdi",
  "Yaptığınız değerlendirme sonucu olumlu dönüş olmuş bulunmakttadır lütfen bu bildirim yolu ile bize uylaşınız",
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
const reciveTimes = [
  Date.now(),
  Date.now() - 10000,
  Date.now() - 25000,
  Date.now() - 100000,
  Date.now() + 10000,
  Date.now() + 25000,
  Date.now() + 100000,
];

export class NotificationData {
  title!: string;
  content!: string;
  photoUrl!: string;
  reciveTime!: number;
  isReaded!: boolean;
  constructor(isExample = false) {
    this.title = "";
    this.content = "";
    this.photoUrl = "";
    this.reciveTime = Date.now();
    this.isReaded = false;
    if (isExample) {
      this.title = titles[Math.floor(Math.random() * titles.length)];
      this.content = contents[Math.floor(Math.random() * contents.length)];
      this.photoUrl = photoUrls[Math.floor(Math.random() * photoUrls.length)];
      this.reciveTime =
        reciveTimes[Math.floor(Math.random() * reciveTimes.length)];
      this.isReaded = Math.random() < 0.5;
    }
  }
}

export class FunoNotification {
  nID?: string;
  data!: NotificationData;
  firebaseDocument!: FirebaseDocument;
  constructor(isExample = false) {
    this.nID = "";
    this.data = new NotificationData(isExample);
    this.firebaseDocument = new FirebaseDocument(isExample);
    if (isExample) this.nID = "-nID";
  }
}

export class FunoNotifications {
  data!: FunoNotification[];
  firabasePagination!: FirabasePagination;
  constructor(isExample = false) {
    this.data = [];
    this.firabasePagination = new FirabasePagination(isExample);
    if (isExample) {
      const add = (isFirstTime = true) => {
        if (Math.random() < 0.9 || isFirstTime) {
          this.data.push(new FunoNotification(true));
          add(false);
        }
      };
      add();
    }
  }
}
