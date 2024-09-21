import axios from 'axios';
import Order from '../models/order';
import log from './log';
import PlaceAndDiscord from "../models/placeAndDiscord";

const sendOrderToDiscordApi = async (order: Order) => {
    const token = process.env.DISCORD_API_PRIVATE_KEY;
    log.info('Sending order to discord...');

    const items = `- ${  order.orderItems
        .map(orderItem => orderItem.item.name)
        .join('\n- ')}`;

    try {
        const discordId: string | null = (await PlaceAndDiscord.findByPk(order.place))?.discordId;
        if (!discordId) {
            log.info('No discord id found for this place, aborting');
            return;
        }
        log.info(`Discord id found : ${discordId}`);
        const res = await axios.post(
            `https://discord.com/api/users/@me/channels`,
            { recipient_id: discordId },
            {
                headers: {
                    Authorization: `Bot ${token}`,
                },
            },
        );
        const { id: dmId }: { id: string } = res.data;
        const content = `Ta commande est prête, viens la chercher !\n\nDétail de la commande :\n${items}\n\nNuméro de commande : **${order.place}**`;
        await axios.post(
            `https://discord.com/api/channels/${dmId}/messages`,
            { content },
            { headers: { Authorization: `Bot ${token}` } }
        );
        log.info(`Discord message sent to : ${discordId}`);
    } catch (error) {
        log.warn(`Discord message error : ${error}`);
    }
};

export default sendOrderToDiscordApi;