# The live view

**Live** in the portal shows, as it happens, whether each of your servers is online and what is going on: players joining and being let in or turned away, bans and reports, and any game events. It needs nothing switched on, only the updated plugin.

## Online or offline

Each server has a status light:

- **Online**: the plugin has been heard from in the last three minutes. The number of players on the server is shown next to it.
- **Offline**: it has not. The page says how long ago it was last heard from.
- **Waiting for the plugin**: it has never connected, for example before you have installed the plugin or set its key.

The plugin says it is there about **once a minute**, and every call it makes counts too. The only thing it sends for this is **how many players are on**, as a plain number: no names, no ids.

## Events as they come in

Under the server cards, a feed shows new events as they arrive: a player joined and was let in or turned away, a ban or kick was recorded or lifted, an appeal came in or was decided, a player reported someone, the plugin flagged some movement, a vehicle was spawned, a server went online or offline.

- It is the **same stream of events your [webhooks](/operators/webhooks) get**: your own references and the plain facts, never a game account id, an address, why a join was blocked, or what a player wrote.
- Nothing is stored for the live view. It shows what happens while you have the page open, and a refresh starts from now.
- You can pause the feed (new events keep arriving and wait behind a counter), filter it by kind, and see a small chart of activity per server for the last fifteen minutes.
- You can have up to five pages open at a time. A page reconnects by itself if the connection drops.

## Accessibility

Status is always written as well as coloured, the lights only pulse if your device allows motion, and a screen reader hears a short summary of the latest event rather than every one.
