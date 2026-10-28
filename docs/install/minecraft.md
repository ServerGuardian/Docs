# Minecraft (Paper)

::: warning Built, not yet tested
The plugin compiles, but it has no tests and has not run on a real Paper server.
:::

The plugin is in the [Minecraft_Plugin](https://github.com/ServerGuardian/Minecraft_Plugin) repository. It needs JDK 21 to build.

## Install

1. Build the plugin with `gradle build`. The jar is in `build/libs/`.
2. Copy the jar into the server's `plugins/` folder, and start the server once.
3. Edit `plugins/ServerGuardian/config.yml` (your API key and address), then restart.

## Good to know

- A Minecraft server cannot read a hardware id, so none is collected and no hardware prompt is shown. Matching uses the player's UUID and IP address.
- The Minecraft UUID is only trustworthy when the server runs in **online mode**.
- The notice is shown in chat after the player joins. The check runs off the main thread and waits up to a time limit you can set.
- A blocked player is removed with a fixed message that links to the appeal page. It never says why.
