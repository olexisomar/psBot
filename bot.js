const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Read the token from the environment variable
const token = process.env.TELEGRAM_BOT_TOKEN;
// Check if the token is defined
if (!token) {
    console.error('Telegram bot token is not defined. Make sure to set the TELEGRAM_BOT_TOKEN environment variable.');
    process.exit(1); // Exit the process if the token is not defined
}
const bot = new TelegramBot(token, { polling: true });

const headerImage = 'https://www.pointspreads.com/wp-content/uploads/2023/12/app-features-1574x376-1.webp';
const websiteButtons = [
    ['🏈  SPORTS  🏈', 'https://t.me/pointspreads_bot/sports'],
    ['🧮  ODDS  🧮', 'https://t.me/pointspreads_bot/odds'],
    ['📰  NEWS  📰', 'https://t.me/pointspreads_bot/news'],
    ['📟  BETTING ACADEMY  📟', 'https://t.me/pointspreads_bot/guides']
];

function sendWelcomeMessage(chatId, userName) {
    try {
        // Sending welcome message with photo and inline keyboard buttons
        bot.sendPhoto(chatId, headerImage, {
            caption: `👋 <b>*Hi, ${userName} Welcome to Point Spreads Telegram App Menu!* </b> 👋 \n\nThis bot provides quick access to pointspreads.com most relevant content related to <b><i>SPORTS, ODDS, NEWS, and Much More</i></b> 💰💸🎉. Simply click or tap on any button below to open the respective page within the Telegram app. You can choose from the following options: 🎉`,
            parse_mode: 'HTML'
        });

        const keyboardMarkup = websiteButtons.map(button => [{
            text: button[0],
            url: button[1]
        }]);

        bot.sendMessage(chatId, 'Click one of the buttons below to open a website:', {
            reply_markup: {
                inline_keyboard: keyboardMarkup,
                resize_keyboard: false
            }
        });

        console.log(`Welcome message sent to chat ID ${chatId}`);
    } catch (error) {
        console.error(`Error sending welcome message: ${error}`);
        bot.sendMessage(chatId, 'An error occurred while sending the welcome message. Please try again later.');
    }
}

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userName = msg.from.first_name; // Get user's first name
    sendWelcomeMessage(chatId, userName);
});