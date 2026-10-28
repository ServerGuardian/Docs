# BeamMP

::: warning Not yet tried on a live server
The plugin passes its automated tests against a simulated BeamMP server. It has not run on a real one.
:::

The plugin is in the [BeamMP_Plugin](https://github.com/ServerGuardian/BeamMP_Plugin) repository.

## Install

1. Copy `main.lua`, `sg_core.lua` and `config.example.json` into `Resources/Server/ServerGuardian/` on your BeamMP server.
2. Copy `config.example.json` to `config.json`, and set `apiBase` and `apiKey` (the key you made in the portal). Keep `config.json` readable only by the server's user.
3. Make sure **`curl`** is installed on the host. BeamMP's Lua cannot make web requests itself, so the plugin calls `curl`.
4. Restart the server.

## Recording bans

BeamMP has no ban system of its own, so ServerGuardian only knows about bans you record. The plugin adds console commands for this:

- `sgban <player> [reason]` removes the player and records a permanent ban.
- `sgtempban <player> <hours> [reason]` does the same for a set number of hours.
- `sgunban <ban id>` ends a ban early (the id is printed when you record the ban).

A recorded ban applies to all of your servers. The player is told only a fixed message with the appeal link, never your reason, but **the reason you type is shown to the player in their portal**, so keep it factual. Guests have no account, so they cannot be banned this way; use BeamMP's own `kick`. Bans made with other plugins are not seen.

To also record the built-in `kick`, set `"recordKicks": true` in `config.json`. A kick never blocks anyone.

## Good to know

- Players with a **BeamMP guest** session have no account id, so they cannot be checked or banned. They are let in and nothing is sent. Because of that, guests are a way around any ban. To refuse them, set `AllowGuests = false` under `[General]` in your server's `ServerConfig.toml` (or set the environment variable `BEAMMP_ALLOW_GUESTS=false`). That is BeamMP's own setting, so whether to use it is up to you.
- BeamMP cannot read a hardware id, so matching uses the account id and IP address.
- The notice is shown in chat after the player joins, so a blocked player is removed a moment after joining.
- If ServerGuardian cannot be reached, the plugin applies your fail mode (default: let players in).
- Not yet checked on Windows.
