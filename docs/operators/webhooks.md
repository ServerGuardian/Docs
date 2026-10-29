# Webhooks

A webhook sends an event to an address you choose, for example a Discord relay or your own bot, when something happens on your servers. Set them up under **Webhooks** in the portal. Only owners can create or change them.

## Events

| Event            | When                                                                                      |
| ---------------- | ----------------------------------------------------------------------------------------- |
| `player.join`    | A player joined. If the join was checked, it also says `pass` or `block`.                 |
| `player.leave`   | A player left a server that reported their join.                                          |
| `action.created` | A ban, warning, kick or mute was recorded, by the plugin or in the portal.                |
| `action.lifted`  | You ended a ban or mute early.                                                            |
| `appeal.created` | A player appealed one of your actions.                                                    |
| `appeal.decided` | An appeal ended, or you or staff answered it.                                             |
| `report.created` | A player reported another in game.                                                        |
| `game.spawn`     | The plugin saw a player spawn something ([game events](/operators/game-events)).          |
| `game.edit`      | The plugin saw a player change something they had spawned.                                |
| `game.remove`    | The plugin saw a player remove something.                                                 |
| `game.flag`      | One of the plugin's movement checks looked wrong ([game events](/operators/game-events)). |

Each endpoint chooses the events it wants and, optionally, a single server. There is also a `ping` event, sent only when you press **Send test**.

## What a delivery looks like

Every delivery is an HTTPS `POST` with a JSON body:

```json
{
  "id": "0192f1c0-7a52-7d2e-9c3f-1c6f0b0a6d11",
  "type": "player.join",
  "createdAt": "2026-10-28T20:15:03.120Z",
  "serverId": "0192f1b9-3f0e-7a11-8c51-5d0a4e0e7a20",
  "data": {
    "reference": "join-8841",
    "occurredAt": "2026-10-28T20:15:02.900Z",
    "checked": true,
    "result": "block"
  }
}
```

`data` by event:

| Event            | `data`                                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------ |
| `player.join`    | `reference`, `occurredAt`, `checked`, and `result` (`pass` or `block`) when `checked` is true          |
| `player.leave`   | `reference`, `occurredAt`                                                                              |
| `action.created` | `id`, `reference`, `type` (`ban`, `warn`, `kick`, `mute`), `expiresAt` (or `null`)                     |
| `action.lifted`  | `id`, `reference`                                                                                      |
| `appeal.created` | `id`, `actionId`, `reference`                                                                          |
| `appeal.decided` | `id`, `actionId`, `reference`, `outcome` (`overturned`, `upheld`, `withdrawn`, `rejected_by_operator`) |
| `report.created` | `id`, `reference`, `category`, `hasNote`                                                               |
| `game.spawn`     | `reference`, `playerReference` (the join), `occurredAt`, `item`                                        |
| `game.edit`      | `reference`, `playerReference`, `occurredAt`, `item`                                                   |
| `game.remove`    | `reference`, `playerReference`, `occurredAt`, `item`                                                   |
| `game.flag`      | `reference`, `playerReference`, `occurredAt`, `check`, `severity`                                      |

`item` is the name of the vehicle or item, and a game event carries no positions or chat. `reference` is the id **your own plugin** gave the join, action or report, so you can match it to what your server knows. That is how you recognise the player: **a delivery never contains a game account id, an IP address or a hardware id.** It also never says why a join was blocked (you only get the same `pass` or `block` the plugin gets), never contains an appeal statement, and never contains the note of a report. The reason you wrote for an action is not sent either: you already have it, so look it up by `id`.

## Verify every delivery

Each request carries these headers:

| Header         | Value                                          |
| -------------- | ---------------------------------------------- |
| `SG-Signature` | `t=<unix seconds>,v1=<hex>`                    |
| `SG-Event`     | The event type                                 |
| `SG-Delivery`  | The delivery id (the same as `id` in the body) |

The signature is an HMAC-SHA-256, with your endpoint's signing secret (it starts `whsec_`), of the timestamp, a full stop and the **raw request body**. Check it before you trust anything, compare it in constant time, and reject a timestamp more than five minutes old.

```js
import { createHmac, timingSafeEqual } from "node:crypto";

export function verify(secret, header, rawBody) {
  const parts = Object.fromEntries(header.split(",").map((part) => part.split("=")));
  if (Math.abs(Date.now() / 1000 - Number(parts.t)) > 300) return false;
  const expected = createHmac("sha256", secret).update(`${parts.t}.${rawBody}`).digest();
  const given = Buffer.from(parts.v1 ?? "", "hex");
  return given.length === expected.length && timingSafeEqual(given, expected);
}
```

```python
import hashlib, hmac, time

def verify(secret: str, header: str, raw_body: bytes) -> bool:
    parts = dict(p.split("=", 1) for p in header.split(","))
    if abs(time.time() - int(parts["t"])) > 300:
        return False
    expected = hmac.new(secret.encode(), parts["t"].encode() + b"." + raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, parts.get("v1", ""))
```

The secret is shown **once**, when you create the endpoint or rotate it. Rotating takes effect at once for new deliveries.

## Delivery rules

- **Answer with a 2xx within 8 seconds.** Anything else, or no answer, counts as a failure. Redirects are not followed.
- **At least once.** A delivery can arrive more than once, and out of order. Use `id` to ignore repeats.
- **Retries.** A failed delivery is tried again after 1 minute, 5 minutes, 30 minutes, 2 hours and 6 hours, then given up on. You can see the last 7 days under the endpoint's deliveries and send one again.
- **Switched off for you.** If five deliveries in a row run out of attempts, the endpoint is switched off and we email the owners. Turn it back on once the receiver works. While an endpoint is failing, `player.join` and `player.leave` are not queued for it, so a broken receiver is not buried in joins.
- **Where we will call.** Addresses must be `https`, a name rather than a number, and public: addresses inside a network (`localhost`, `10.x.x.x`, `192.168.x.x`, cloud metadata addresses and the like) are refused when you save them and again every time we connect. Use port 443 or a port from 1024 up.
- **Limits.** The number of endpoints depends on your plan; the page shows yours.
- Events are queued the moment they are recorded and sent within a few seconds. A slow or broken receiver never slows your game server or the join check.
