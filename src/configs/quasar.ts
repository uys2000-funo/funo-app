import "@/styles/quasar.scss";
import lang from "quasar/lang/tr-TR.js";
import "@quasar/extras/material-icons/material-icons.css";
import { Notify } from "quasar";

export default {
  plugins: {
    Notify,
  },
  animations: "all",
  lang: lang,
};
