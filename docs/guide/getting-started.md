# Getting started

::: warning Not open yet
Accounts for server owners open at launch. This is the planned path.
:::

Setting up takes five steps, in this order. **Players are only checked once every step is done.**

1. **Create an account and confirm your email address.** We send you a link, and you cannot create API keys until you have followed it. If it does not arrive, the portal can send it again. Forgotten your password? The sign-in page can email you a link to choose a new one.
2. **Turn on two-step sign-in.** You need an authenticator app. Keys cannot be created without it, and we ask for your password again when you turn it on.
3. **Accept the Data Processing Agreement.** ServerGuardian processes player data on your behalf, so this is required.
4. **Add a server.** Give it a name and choose its game (BeamMP, FiveM or Minecraft). How it behaves, such as what happens if ServerGuardian cannot be reached, whether it is youth-oriented, and whether players can report each other, is set in the plugin's config file: see [server settings](/guide/settings).
5. **Create an API key** for the server. In the portal open **API keys**, choose the server, leave the three permissions ticked (most plugins need all three) and press **Create**. The key is shown **once**: copy it straight into the plugin's config file, and keep it like a password. If you lose it, revoke it and make another.

Then install the plugin for your game ([BeamMP](/install/beammp), [FiveM](/install/fivem) or [Minecraft](/install/minecraft)): the **Install the plugin** card on your server's page in the portal has the download and the steps and set your [rules](/guide/rules). New accounts start with a 14-day trial of the Pro plan.

## Removing a server

You can remove a server from its Settings tab. Its API keys stop working straight away and it stops counting towards your plan. What it recorded is kept until it expires, because those bans still protect other servers.

## Your team

You can add moderators, admins and viewers, each with their own sign-in and only the access they need: see [your team](/operators/team).

## Appeals

Players can appeal a block or a ban you recorded. You have **14 days** to answer; after that the ServerGuardian team takes over. You will see appeals about your own servers under **Appeals** in the portal. You never see who the player is.
