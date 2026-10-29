# Game events

The plugin can tell ServerGuardian when a player **spawns**, **edits** or **removes** a vehicle, and when its own **movement checks** look wrong. Each one is kept as a row, so you can see when a player spawned, changed or removed something. You see them in the portal under **Game events**, and can have them sent to a [webhook](/operators/webhooks) (for example into a Discord channel your staff watch).

::: warning Needs the updated plugin, and is off until you turn it on
Set `gameEvents` to on in the plugin's [config file](/guide/settings). Until then the plugin sends nothing and runs no checks.
:::

## What it is, and what it is not

- A **spawn**, an **edit** and a **remove** each say that a player spawned, changed or removed something, with the name of the vehicle or item, such as a vehicle model. They are separate rows, so a player who spawns a vehicle, changes it and then removes it leaves three. In the portal, **Kind** filters the list to spawns, edits, removals or movement flags.
- A **movement flag** comes from checks the plugin runs **on your game server**: movement faster than the game allows, a jump that looks like a teleport (a **teleport or impossible move**), or a sudden change of speed (**acceleration**). Each flag says how serious it looks, `low` or `high`.
- **A flag is a prompt for a person to look. It is never a ban.** Nothing is done to the player by ServerGuardian or by the plugin. Admin teleports, respawns and lag cause false flags, and you know your server better than we do.
- **No positions, no chat.** The plugin sends only the item name or the kind of check, never where the player was, what a vehicle was changed to, or what anyone said. Chat is not a game event and cannot be added to this list.
- **Never used to decide anything about the player.** Game events play no part in whether someone is blocked, and are never seen by another server owner.

## Who the event is about

Every event names the join the plugin already reported for that player, so it belongs to a player without a game account id, address or hardware id being sent again. The plugin also adds an optional **label**, which is whatever your plugin calls the player (normally their in-game name, up to 32 characters). It is shown to you in the portal, and nowhere else.

## How long they are kept

- Always passed to your webhooks, as soon as they happen.
- Kept in the portal only on plans that keep event history. How many days is shown at the top of the page. A plan with none keeps nothing, and the page stays empty.
- **Nothing at all** (not kept, and not sent to webhooks) for a player handled as a likely minor, or on a [youth-oriented](/guide/getting-started) server, or for a player who has asked us to erase their data.
- Deleted when a player asks us to erase their data, and included in the download of their data.

A webhook for an event carries the plugin's references (the id of the event and of the join) and the item or kind of check, never the label. The plugin sends events to ServerGuardian in small groups rather than one request each. The events are `game.spawn`, `game.edit`, `game.remove` and `game.flag`: see [webhooks](/operators/webhooks) for their fields.

## What the plugin checks

Spawns, edits and removals are not checks: the plugin reports them as they happen. Only flags come from checks. The limits the plugin uses (how fast is too fast for each game, how big a jump is a teleport, how often the same player can be flagged: once a minute for the same check) come from ServerGuardian, so we can tune them without a new plugin. They are first guesses. Expect some false flags on a fast game, and tell us what you see.
