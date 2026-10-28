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

## Good to know

- Players with a **BeamMP guest** session have no account id, so they cannot be checked. They are let in and nothing is sent.
- BeamMP cannot read a hardware id, so matching uses the account id and IP address.
- The notice is shown in chat after the player joins, so a blocked player is removed a moment after joining.
- If ServerGuardian cannot be reached, the plugin applies your fail mode (default: let players in).
- Not yet checked on Windows.
