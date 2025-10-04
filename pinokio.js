const path = require('path');

module.exports = {
  version: "1.0",
  title: "Roop-Floyd",
  description: "Next-generation face-swapping and enhancement (Codeberg fork of Roop). Easy GUI for images & videos.",
  icon: "icon.png",

  menu: async (kernel, info) => {
    let installed = info.exists("app/env");
    let running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      update: info.running("update.js"),
      reset: info.running("reset.js"),
      link: info.running("link.js")
    };

    if (running.install) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }];
    } else if (installed) {
      if (running.start) {
        const localURL = "http://127.0.0.1:7860";
        return [{
          default: true,
          icon: "fa-solid fa-rocket",
          text: "Open Web UI",
          href: localURL,
        }, {
          icon: 'fa-solid fa-terminal',
          text: "Terminal",
          href: "start.js",
        }];
      } else if (running.update) {
        return [{
          default: true,
          icon: 'fa-solid fa-circle-up',
          text: "Updating",
          href: "update.js",
        }];
      } else if (running.reset) {
        return [{
          default: true,
          icon: 'fa-solid fa-rotate-left',
          text: "Resetting",
          href: "reset.js",
        }];
      } else if (running.link) {
        return [{
          default: true,
          icon: 'fa-solid fa-link',
          text: "Deduplicating",
          href: "link.js",
        }];
      } else {
        // Default menu when installed but nothing running
        return [{
          default: true,
          icon: "fa-solid fa-power-off",
          text: "Start",
          href: "start.js",
        }, {
          icon: "fa-solid fa-circle-up",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Reinstall",
          href: "install.js",
        }, {
          icon: "fa-solid fa-file-zipper",
          text: "<div><strong>Save Disk Space</strong><div>Deduplicates redundant library files</div></div>",
          href: "link.js",
        }, {
          icon: "fa-regular fa-circle-xmark",
          text: "<div><strong>Reset</strong><div>Revert to pre-install state</div></div>",
          href: "reset.js",
          confirm: "Are you sure you wish to reset the app?"
        }];
      }
    } else {
      // App not installed
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }];
    }
  }
};
