import { defineStore } from "pinia";

export const downloadStore = defineStore("download", {
  state: () => ({
      desktop: [
        {
          title: "Windows",
          link: "https://download.wireguard.com/windows-client/wireguard-installer.exe",
          icon: "img:/spa/Windows_logo_-_2021.svg",
          iconDownload: "download"
        },
        {
          title: "macOS",
          link: "https://apps.apple.com/us/app/wireguard/id1451685025",
          icon: "img:/spa/Apple_Logo.svg",
          iconDownload: "shop"
        },
      ],
      mobile: [
        {
          title: "Android",
          icon: "android",
          link: "https://play.google.com/store/apps/details?id=com.wireguard.android",
          iconDownload: "shop"
        },
        {
          title: "iOS",
          icon: "img:/spa/Apple_Logo.svg",
          link: "https://itunes.apple.com/us/app/wireguard/id1441195209",
          iconDownload: "shop"
        }
      ],
      linux: [
        {
          title: "Ubuntu",
          icon: "img:/spa/Former_Ubuntu_logo.svg",
          cmd: "sudo apt install wireguard",
          iconDownload: "code"
        },
        {
          title: "Debian",
          icon: "img:/spa/openlogo-nd.svg",
          cmd: "apt install wireguard",
          iconDownload: "code"
        },
        {
          title: "Fedora",
          icon: "img:/spa/Fedora_logo.svg",
          cmd: "sudo dnf install wireguard-tools",
          iconDownload: "code"
        },
        {
          title: "Arch",
          icon: "img:/spa/Archlinux-icon-crystal-64.svg",
          cmd: "sudo pacman -S wireguard-tools",
          iconDownload: "code"
        },
        {
          title: "OpenSUSE/SLE",
          icon: "img:/spa/openSUSE logo.svg",
          cmd: "sudo zypper install wireguard-tools",
          iconDownload: "code"
        },
        {
          title: "Gentoo",
          icon: "img:/spa/Gentoo-logo.svg",
          cmd: "emerge wireguard-tools",
          iconDownload: "code"
        },
        {
          title: "OpenWRT",
          icon: "",
          cmd: "opkg install wireguard",
          iconDownload: "code"
        },
      ],
  }),
  getters: {},
  actions: {},
});
