# Dashboards

The portal has a **dashboard for your account** and one **for each server**. Both show how your servers are doing at a glance, in numbers and charts.

## What you see on every plan

- **Servers online**, and how many players are on right now.
- **Joins, blocks and the block rate** (how many of the checks turned a player away), for the last seven days, with a chart of joins against blocks for each day.
- **Actions recorded** (bans, warnings, kicks, mutes) and a chart of them per day.
- **Needs attention:** appeals waiting for you and player reports still open.
- **This month's join checks** against your plan's allowance, with a warning as you near it and the date it resets.

## What the Pro plan adds

Some panels are shown greyed out, with a lock, on plans that do not include them. They are placeholders: the numbers behind them are **not sent to your browser** until your plan includes them.

- **Longer ranges:** 30 and 90 days instead of 7.
- **Different players per day**, and the **peak number of players** at once.
- **Uptime**, from the plugin's once-a-minute heartbeat: a percentage, and a strip of days showing when the server was up (per server), or a bar for each server (account).
- **Activity by hour of the week** (per server): a heat map of when players join, to plan staffing and restarts.
- **Breakdowns:** actions by type, reports and game events per day, and your busiest servers.

Which plan has which is shown on the plan page. These are first guesses and may change.

## Good to know

- **Counts only.** The dashboards hold numbers: no player, address or identifier. They are built every five minutes from the plugin's join checks, your recorded actions and reports, and its heartbeats, so a chart can be a few minutes behind. The [live view](/operators/live) is the moment-by-moment one.
- **Days are UTC.** Today is partial.
- **They outlast the records.** The counts are kept for 91 days, longer than the join records they are built from, so a chart stays whole after individual joins have expired. The raw joins are not shown anywhere.
- **Uptime and players need the updated plugin,** which sends its heartbeat. Without it a server shows as offline and has no uptime.
