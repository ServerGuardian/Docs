# Minecraft (Paper)

::: warning Not yet tried on a live server
The plugin compiles and has unit tests for its plain logic, but it has not run on a real Paper server.
:::

The plugin is in the [Minecraft_Plugin](https://github.com/ServerGuardian/Minecraft_Plugin) repository. It needs JDK 21 to build.

## Install

1. Build the plugin with `gradle build`. The jar is in `build/libs/`.
2. Copy the jar into the server's `plugins/` folder, and start the server once.
3. Edit `plugins/ServerGuardian/config.yml` (your API key and address), then restart.

## Recording bans

ServerGuardian can only match players against bans it has been told about. Paper has no ban event, so the plugin reads the server's ban list every 30 seconds. A new ban (vanilla `/ban`, or any plugin that uses the server's ban list) is recorded, with its length if it is temporary, and then applies to all of your servers. A `/pardon` ends it in ServerGuardian too. Use `/ban` and `/pardon` as usual; there are no ServerGuardian commands to learn.

Bans that already exist the first time the plugin runs are not imported. A ban can reach ServerGuardian up to 30 seconds late. IP bans, and bans kept in a plugin's own database (for example LiteBans or AdvancedBan), are not seen.

**The reason you give a ban is shown to the player in their portal**, so keep it factual. Set `record-kicks: true` in `config.yml` to record `/kick` as well; a kick never blocks anyone. Set `record-bans: false` to record nothing.

## Player reports

Once you switch on [player reports](/operators/reports) for the server in the portal, players can type `/report <player> <category> [note]`. The first use shows a notice and asks them to repeat the command to confirm. Nothing but the category, an optional short note and the account ids of the two players is sent.

## Settings

How this server behaves is set in the plugin's config file, next to the API key, not in the portal. In `config.yml`, under `settings:`: `fail-mode`, `game-events`, `reports`, `share-bans` and `youth-oriented`. Each setting, its default and what it does are on the [server settings](/guide/settings) page. Settings you leave out keep the value the server already had, so updating the plugin never resets them.

## Good to know

- A Minecraft server cannot read a hardware id, so none is collected and no hardware prompt is shown. Matching uses the player's UUID and IP address.
- The Minecraft UUID is only trustworthy when the server runs in **online mode**.
- The notice is shown in chat after the player joins. The check runs off the main thread and waits up to a time limit you can set.
- A blocked player is removed with a fixed message that links to the appeal page. It never says why.
