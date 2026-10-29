import { defineConfig } from "vitepress";

// The public ServerGuardian documentation. No analytics, no third-party fonts or scripts: search is
// built in and runs in the browser, and the fonts are packages (see theme/index.ts).
export default defineConfig({
  title: "ServerGuardian Docs",
  description:
    "How ServerGuardian works for game-server owners and for players: setup, the plugins, the rules, and appeals.",
  lang: "en-GB",
  // "/" on a custom domain. Set DOCS_BASE=/Docs/ to serve from https://serverguardian.github.io/Docs/.
  base: process.env.DOCS_BASE ?? "/",
  cleanUrls: true,
  lastUpdated: true,
  head: [["link", { rel: "icon", href: "/logo.svg", type: "image/svg+xml" }]],
  themeConfig: {
    logo: "/logo.svg",
    siteTitle: "ServerGuardian Docs",
    nav: [
      {
        text: "Server owners",
        link: "/guide/getting-started",
        activeMatch: "/guide/|/install/|/operators/",
      },
      { text: "Players", link: "/players/", activeMatch: "/players/" },
      { text: "Hosting companies", link: "/partners/", activeMatch: "/partners/" },
    ],
    sidebar: [
      {
        text: "For server owners",
        items: [
          { text: "How it works", link: "/guide/how-it-works" },
          { text: "Getting started", link: "/guide/getting-started" },
          { text: "Server settings", link: "/guide/settings" },
          { text: "Rules", link: "/guide/rules" },
        ],
      },
      {
        text: "Tools for your servers",
        items: [
          { text: "Your team", link: "/operators/team" },
          { text: "Dashboards", link: "/operators/dashboards" },
          { text: "Live view", link: "/operators/live" },
          { text: "Ban list", link: "/operators/ban-list" },
          { text: "Player reports", link: "/operators/reports" },
          { text: "Game events", link: "/operators/game-events" },
          { text: "Webhooks", link: "/operators/webhooks" },
        ],
      },
      {
        text: "Install the plugin",
        items: [
          { text: "BeamMP", link: "/install/beammp" },
          { text: "FiveM", link: "/install/fivem" },
          { text: "Minecraft (Paper)", link: "/install/minecraft" },
        ],
      },
      {
        text: "For hosting companies",
        items: [
          { text: "Selling ServerGuardian", link: "/partners/" },
          { text: "The partner API", link: "/partners/api" },
        ],
      },
      {
        text: "For players",
        items: [{ text: "What we hold, and how to appeal", link: "/players/" }],
      },
    ],
    search: { provider: "local" },
    outline: { level: [2, 3] },
    docFooter: { prev: "Previous", next: "Next" },
    footer: { message: "ServerGuardian is not open to the public yet.", copyright: "BeamMP Ltd" },
  },
});
