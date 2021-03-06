const setChannelName = require("./functions/setChannelName");

module.exports = (client, guildSettings) => {
    const {
        guild_id,
        channelNameCounter,
        channelNameCounter_types
    } = guildSettings;
    
    if (client.guilds.has(guild_id) && client.guilds.get(guild_id).available) {
        let count = 0; 
        client.guilds.get(guild_id).channels.forEach(channel => {
            if (channel.type === "voice") count += channel.members.size;
        });
        channelNameCounter.forEach((channel_name, channel_id) => {
            if (channelNameCounter_types.has(channel_id) && (channelNameCounter_types.get(channel_id) === "connectedusers"))
                setChannelName({ client, channelId: channel_id, channelName: channel_name, count, guildSettings });
        });
    }
};
