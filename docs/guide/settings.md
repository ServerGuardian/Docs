# Server settings

A server's behaviour is set in **its plugin's config file**, next to its API key, not in the portal. The portal shows what each server is currently set to, read-only, with when the plugin last reported it.

| Setting            | Values                           | Default        | What it does                                                                                                                                                                                              |
| ------------------ | -------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Fail mode**      | let players in, or keep them out | let players in | What happens when ServerGuardian cannot be reached. Letting players in is safer for your community; keeping them out is stricter. It applies from the file even if ServerGuardian has never been reached. |
| **Game events**    | on or off                        | off            | The plugin sends when a player spawns, changes or removes a vehicle, and runs its movement checks, sending only a flag. No chat or positions. See [game events](/operators/game-events).                  |
| **Player reports** | on or off                        | off            | Players can report each other with `/report`. See [player reports](/operators/reports).                                                                                                                   |
| **Share bans**     | on or off                        | on             | Use bans recorded on your other servers here too, and share this server's bans with them. Turn it off for a server that should keep its own list. See the [ban list](/operators/ban-list).                |
| **Youth-oriented** | yes or no                        | no             | This server or event is for players under 18. Their data is handled more strictly: no hardware check, shorter records, and game events are neither kept nor sent on.                                      |

## Where to set them

| Game              | Where                                                                        | Names                                                                                                                                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BeamMP            | `config.json`, in the `settings` object                                      | `failMode` (`"open"` or `"closed"`), `gameEvents`, `reports`, `shareBans`, `youthOriented` (`true` or `false`)                                                                                                         |
| FiveM             | `config.lua` (`Config.settings`), or convars in `server.cfg` (a convar wins) | `failMode`, `gameEvents`, `reports`, `shareBans`, `youthOriented`, or `serverguardian_fail_mode`, `serverguardian_game_events`, `serverguardian_reports`, `serverguardian_share_bans`, `serverguardian_youth_oriented` |
| Minecraft (Paper) | `config.yml`, under `settings:`                                              | `fail-mode`, `game-events`, `reports`, `share-bans`, `youth-oriented`                                                                                                                                                  |

## How they take effect

- The plugin tells ServerGuardian its settings **when it starts and about every ten minutes**. A change in the file applies after a restart, or at the next refresh.
- **A setting you leave out keeps the value the server already had.** Updating the plugin, or an older config file, never resets anything, in particular the youth-oriented protection.
- A value that is not valid is ignored, and the plugin logs a line that names the setting but not what you wrote.
- A server can change its settings at most **10 times an hour**. If the limit is reached the plugin carries on with what its file says.
- Every change is recorded in the audit log.

## Join rules are still in the portal

Which signals turn a player away (your own bans, other owners' bans, accounts that look like a banned player's, the standing needed) are your [rules](/guide/rules), set per server under **Rules** in the portal.
