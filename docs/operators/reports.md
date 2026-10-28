# Player reports

Players can report each other from inside the game. The report goes to your staff, through ServerGuardian, and nowhere else.

::: warning Needs the updated plugin
Reports work with the latest BeamMP, FiveM and Minecraft plugins. They are **off** until you turn them on for a server.
:::

## Turning it on

In the portal, open the server's settings and switch on **Let players report each other in game**. The plugin then offers every player a command:

```
/report <player> <category> [note]
```

The categories are cheating, griefing, harassment, hate or abuse, and something else. The note is optional and at most 200 characters.

The first time a player uses the command they are shown a short notice (it says the report goes to the server's staff, is kept for a limited time, and is not a chat log) and asked to run the command again to confirm. Nothing is sent until they do.

## What is sent, and what is not

Sent: the category, the optional note, and the game account ids of the player making the report and the player reported. Never sent: chat, names, IP addresses or hardware ids. The note has no special handling for chat, so the notice tells players not to paste chat or personal details into it, and addresses and long codes are removed from it before it is stored.

## What you see

Under **Reports** in the portal you see each report with its reference, category, note, the server and when it was made, plus two counts: **how many reports** you have had about the same player and **how many actions** you have already recorded against them. **You never see who the player is.** The reference comes from the plugin, so your staff can recognise it, for example by the time.

For each open report an owner can:

- **Dismiss** it, or
- **Take action**: ban, warn, kick or mute the player the report names, with a reason and (for a ban or mute) an optional length. The action is recorded exactly like one made in game, so a ban applies to your other servers too, and it appears in the ban list.

## How reports are handled

- A report belongs to **one server owner**: the owner of the server it came from. No other owner can see it.
- It is **never used to decide whether someone is blocked**, to score a player, or to match accounts. A player with many reports is treated no differently from any other until an owner acts.
- It is kept for **90 days** (30 for players handled as likely minors, and on youth-oriented servers), then deleted.
- It is included in a player's download of their data, and deleted if they ask us to erase their data, whether they are the player who reported or the player reported.
- Each player can make at most 5 reports an hour and 20 a day, and the same player reporting the same player again within a day counts as the same report.

## Reports in webhooks

A [webhook](/operators/webhooks) can send you `report.created` with the report's reference and category. It never contains the note.
