import { defineStore } from "pinia";

export const manualStore = defineStore("manual", {
  state: () => [
    {
      title: "Настройка приложений на компьютерах и ноутбуках",
      items: [
        {
          title: "Windows",
          icon: "img:Windows_logo_-_2021.svg",
          video: "https://www.youtube.com/embed/7kKpxhQPSjU",
          text: "WindowsManual",
        },
        {
          title: "macOS",
          icon: "img:Apple_Logo.svg",
          video: "https://www.youtube.com/embed/U98Sjwdj12Y",
          text: "MacosManual",
        },
       {
          title: "Linux",
          icon: "",
          video: "https://www.youtube.com/embed/l2DS2Ap1d7g",
          text: "LinuxManual",
        },
      ],
    },
    {
      title: "Настройка приложений на телефонах и планшетах",
      items: [
        {
          title: "Android",
          icon: "android",
          video: "https://www.youtube.com/embed/W924ZLTAo98",
          text: "AndroidManual",
        },
        {
          title: "iOS",
          icon: "img:Apple_Logo.svg",
          video: "https://www.youtube.com/embed/Xn9IAgnVnAU",
          text: "IosManual",
        },
      ],
    },
  ],
  getters: {},
  actions: {},
});
