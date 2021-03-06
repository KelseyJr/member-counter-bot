const setChannelName = require("./functions/setChannelName");

module.exports = (client, guildSettings) => {
    const {
        guild_id,
        channelNameCounter,
        channelNameCounter_types
    } = guildSettings;
    
    if (client.guilds.has(guild_id) && client.guilds.get(guild_id).available) {
        const count = client.guilds.get(guild_id).channels.filter(channel => channel.type !== "category").size; //exclude categories
        channelNameCounter.forEach((channel_name, channel_id) => {
            if (channelNameCounter_types.has(channel_id) && (channelNameCounter_types.get(channel_id) === "channels"))
                setChannelName({ client, channelId: channel_id, channelName: channel_name, count, guildSettings });
        });
    }
};
