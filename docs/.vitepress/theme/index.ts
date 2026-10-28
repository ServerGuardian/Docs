import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
// Fonts are self-hosted packages, never a CDN: a font request would send visitors' IP addresses to
// another company (docs/brand-guide.md in the Internal repository).
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./brand.css";
import "./style.css";

export default { extends: DefaultTheme } satisfies Theme;
