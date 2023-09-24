import { UserData } from "@/types/user";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return { userData: {} as UserData };
  },
});
