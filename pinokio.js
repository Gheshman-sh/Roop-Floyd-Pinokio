const path = require("path");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
  version: "1.0",
  title: "Roop-Floyd",
  description:
    "Next-generation face-swapping and enhancement (Codeberg fork of Roop). Easy GUI for images & videos.",
  icon: "icon.png",

  menu: async (kernel, info) => {
    const installed = info.exists("app/env");
    const running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      update: info.running("update.js"),
      reset: info.running("reset.js"),
      link: info.running("link.js"),
    };

    // --- Installing ---
    if (running.install) {
      return [
        {
          default: true,
          icon: "fa-solid fa-plug",
          text: "Installing...",
          href: "install.js",
        },
      ];
    }

    // --- Installed ---
    else if (installed) {
      // When app is running
      if (running.start) {
        kernel.log("⏳ Waiting 10 seconds for Web UI to initialize...");
        await delay(10000);
        const localURL = "http://127.0.0.1:7860";

        return [
          {
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: localURL,
          },
          {
            icon: "fa-solid fa-terminal",
            text: "Terminal",
            href: "start.js",
          },
        ];
      }

      // --- Other states ---
      if (running.update) {
        return [
          {
            default: true,
            icon: "fa-solid fa-circle-up",
            text: "Updating...",
            href: "update.js",
          },
        ];
      }

      if (running.reset) {
        return [
          {
            default: true,
            icon: "fa-solid fa-rotate-left",
            text: "Resetting...",
            href: "reset.js",
          },
        ];
      }

      if (running.link) {
        return [
          {
            default: true,
            icon: "fa-solid fa-link",
            text: "Deduplicating...",
            href: "link.js",
          },
        ];
      }

      // --- Idle (nothing running) ---
      return [
        {
          default: true,
          icon: "fa-solid fa-power-off",
          text: "Start",
          href: "start.js",
        },
        {
          icon: "fa-solid fa-circle-up",
          text: "Update",
          href: "update.js",
        },
        {
          icon: "fa-solid fa-plug",
          text: "Reinstall",
          href: "install.js",
        },
        {
          icon: "fa-solid fa-file-zipper",
          text:
            "<div><strong>Save Disk Space</strong><div>Deduplicates redundant library files</div></div>",
          href: "link.js",
        },
        {
          icon: "fa-regular fa-circle-xmark",
          text:
            "<div><strong>Reset</strong><div>Revert to pre-install state</div></div>",
          href: "reset.js",
          confirm: "Are you sure you wish to reset the app?",
        },
      ];
    }

    // --- Not installed ---
    else {
      return [
        {
          default: true,
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        },
      ];
    }
  },
};

