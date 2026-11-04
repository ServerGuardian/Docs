# Chat moderation

::: warning Off by default, and still being tested
Chat checking is **off** unless you turn it on for a server, and it is not available to everyone yet. When it is on, the join notice tells your players that chat is checked by software. Do not turn it on for players you have not told.
:::

Chat moderation looks at what players type in game chat and flags lines that break rules **you** choose: hate and racism, bullying and harassment, sexual content, swearing, and spam. A flag is a prompt for your staff to look. **Nothing is done to a player automatically**: no mute, kick or ban.

## What happens to a chat line

1. The plugin sends each chat line to ServerGuardian in the background. Commands (anything starting with `/`) are never sent, and chat is never slowed down or changed.
2. ServerGuardian reads the line **in memory** and checks it against your rules.
3. If it breaks a rule, the line is kept, with the rule it broke, for **30 days** (14 days for servers marked youth-oriented). **Every other line is forgotten as soon as it has been checked.** It is never written to a log, a database or a queue.
4. Flagged lines appear under **Chat moderation** in the portal, where you mark them reviewed or dismiss them. A `chat.flagged` [webhook](/operators/webhooks) can tell your own tools that something was flagged; it carries the category and severity, never the line.

There is no artificial intelligence in the checking. It is word lists, patterns and your own keywords, so it is predictable, and it **will** get things wrong: it can flag a joke or a quotation, and miss new slang. That is why a flag goes to a person.

## Turning it on

Two things, both needed:

1. In the plugin's config file, turn on `chatModeration` for the server (see the table below). It is off by default.
2. In the portal, open **Chat moderation**, pick the server, and choose how strict each check should be.

| Game              | Where                                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| BeamMP            | `config.json`, in `settings`: `"chatModeration": true`                                                                 |
| FiveM             | `config.lua`: `Config.settings.chatModeration = true`, or in `server.cfg`: `set serverguardian_chat_moderation "true"` |
| Minecraft (Paper) | `plugins/ServerGuardian/config.yml`, in `settings`: `chat-moderation: true`                                            |

Restart the server (or wait for the plugin's next refresh, up to ten minutes). While it is on, players see a different join notice that says chat is checked.

## What to look for

Each check has three levels:

- **Off**: not checked.
- **Standard**: clear and severe cases only.
- **Strict**: also mild and unclear cases. Expect more wrong flags.

| Check              | Looks for                                                                                        | Starts at |
| ------------------ | ------------------------------------------------------------------------------------------------ | --------- |
| **Hate**           | Racism and other hatred of a group of people: slurs and dehumanising talk.                       | Standard  |
| **Harassment**     | Bullying and abuse aimed at a person, threats, telling someone to harm themselves, doxxing talk. | Standard  |
| **Sexual content** | Sexual talk and sexual harassment.                                                               | Off       |
| **Swearing**       | Swearing that is not aimed at anyone. Many servers allow it, so it starts off.                   | Off       |
| **Spam**           | Flooding, the same line repeated, shouting in capitals, invite links and adverts.                | Standard  |

The checks notice common tricks such as `l33t` spellings, look-alike letters, and letters spaced out or separated by dots. They also keep a short, in-memory count per player to spot flooding and players who keep breaking rules: three flagged lines within ten minutes raises one extra "persistent" flag. That count holds numbers, not text, and is dropped after ten quiet minutes.

## Your own keywords

Add words and phrases that matter to your community, such as another server's name or a slur in your own language. Use `*` as a wildcard (`free*skins`). Choose a category, how serious it is (mild, clear or severe), whether it must be a whole word, and whether it applies to one server or all of yours. Regular expressions are not supported, and a keyword needs at least two letters or digits. Your keywords always apply, whatever levels you chose.

## Try a message

**Try a message** shows what a line would be flagged for with a server's current settings and keywords. Nothing you type there is stored.

## Limits

- English only for now.
- The word lists need ongoing care. Tell us what they miss.
- With more than one ServerGuardian copy running, the "chat as a whole" counts are per copy.
