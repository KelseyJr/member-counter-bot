const router = require("express").Router();
const UserModel = require("../../../mongooseModels/UserModel");
const {
    DISCORD_CLIENT_ID,
    DISCORD_OFFICIAL_SERVER_ID,
    DBL_WH_SECRET,
    DBL_REWARD_ROLE_ID
} = process.env;
const owners = process.env.BOT_OWNERS.split(/,\s?/);

router.post("/dbl", (req, res) => {
    const { authorization } = req.headers;
    const webhook = req.body;
    if (
        authorization === DBL_WH_SECRET &&
        webhook.type === "upvote" &&
        webhook.bot === DISCORD_CLIENT_ID
    ) {
        res.status(200);
        console.log(`[MAIN] [API] User ${webhook.user} upvoted the bot!`);
        UserModel.findOneAndUpdate({ user_id: webhook.user }, { voted_dbl: true }, { upsert: true }).exec().catch(console.error);
        giveUpvoterRole(webhook.user, req.DiscordShardManager);
    } else if (
        authorization === DBL_WH_SECRET &&
        webhook.type === "test" &&
        webhook.bot === DISCORD_CLIENT_ID
    ) {
        res.status(200);
        console.log(
            `[MAIN] [API] DBL webhook test received: ${JSON.stringify(webhook)}`
        );
        if (owners.includes(webhook.user)) {
            giveUpvoterRole(webhook.user, req.DiscordShardManager);
        }
    } else res.status(401);
});

module.exports = router;

const giveUpvoterRole = (user, DiscordShardManager) => {
    DiscordShardManager.broadcastEval(`
        if (this.guilds.get("${DISCORD_OFFICIAL_SERVER_ID}") && this.guilds.get("${DISCORD_OFFICIAL_SERVER_ID}").members.get("${user}")) {
            this.guilds.get("${DISCORD_OFFICIAL_SERVER_ID}")
                .members.get("${user}")
                    .addRole("${DBL_REWARD_ROLE_ID}")
                        .then(() => {
                            console.log("[MAIN] [API] Upvoter Role given successfully to ${user}");
                        })
                        .catch(error => {
                            console.error("[MAIN] [API] Error while trying to give the role to ${user}, Error code: " + error.code);
                        });
        }
    `);
}