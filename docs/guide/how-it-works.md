# How it works

When a player joins your server, the ServerGuardian plugin asks one question: **may this player stay?** The answer is `pass` or `block`. That is all your server ever receives. It never learns who the player is, which other server banned them, or why.

## What the plugin sends

- The player's **game account id** (a BeamMP account, a Cfx.re licence and Steam id, or a Minecraft UUID) and **IP address**.
- On FiveM only, and only if the player says yes to an optional prompt, **hardware tokens** the game supplies. BeamMP and Minecraft servers cannot read a hardware id at all.
- Nothing else. **No chat**, no player names, no screenshots. The service refuses any extra field.

Before sending anything, the plugin shows the player a notice that ServerGuardian is in use (on BeamMP and Minecraft this has to be in chat, right after joining).

## What is kept

IP addresses, hardware tokens and account ids are stored only as **keyed hashes**: a one-way scramble that uses a secret key we hold, so the database does not contain a readable address or id. Matching works by comparing hashes. Records expire on a schedule, and expire sooner for players flagged as likely minors. Servers you mark as **youth-oriented** get extra protections for their players.

## How a block is decided

You choose the [rules](/guide/rules). In short, you can turn away:

- players banned on **your own** servers,
- players banned by **several other server owners**,
- accounts that look like a banned player's, because they share a computer or network.

Sharing a computer or network can cause mistakes, for example a family PC or a school. That is why every player can [appeal](/players/), and why a ban from a single other server owner is weighed less than bans from several.

## Who can be trusted

Server owners are the source of what ServerGuardian knows, and anyone can sign up, so what an owner reports is trusted in steps. An owner has to confirm their email address before they can create a key. Bans recorded by a new owner protect that owner's own servers straight away, and only start to count towards other owners' servers after a settling-in period. This stops a handful of new accounts from getting a stranger blocked.

## If ServerGuardian is down

By default the plugin **lets players in** when it cannot reach ServerGuardian, because a moderation tool must not stop your server accepting players. You can choose to keep players out instead. When a service limit is reached on our side (your plan, or too many requests), players are always let in.
