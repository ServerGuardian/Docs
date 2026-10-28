# FiveM

::: warning Not yet tried on a live server
The resource passes its automated tests against a simulated FiveM server. It has not run on a real one.
:::

The resource is in the [FiveM_Plugin](https://github.com/ServerGuardian/FiveM_Plugin) repository.

## Install

1. Put the repository's contents in a resource folder named `serverguardian` (the folder name is the resource name).
2. Add this to `server.cfg`:

```
set serverguardian_api_base "https://api.serverguardian.example"
set serverguardian_api_key  "sg_xxxxxxxx_your-key-here"
ensure serverguardian
```

Use `set`, not `setr`: a replicated variable would be sent to every player. Other options (fail mode, timeout, the optional hardware check) are in `config.lua`.

## Good to know

- A joining player is held on the connection card, which shows the ServerGuardian notice before anything is sent. This is the one platform where the notice comes **before** the player is in.
- FiveM supplies several hardware-derived tokens per player. They are sent only if the player agrees to an optional prompt. Closing the prompt, or not answering in time, counts as **no**.
- A player with no Cfx.re licence cannot be identified, so they are let in and nothing is sent.
- Players can type `/sgconsent` to clear their hardware-check choice.
