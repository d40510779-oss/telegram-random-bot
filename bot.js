const TelegramBot = require('node-telegram-bot-api');

console.log('🔧 Початок запуску бота...');

const token = process.env.BOT_TOKEN;

if (!token) {
    console.log('❌ ПОМИЛКА: BOT_TOKEN не знайдено!');
    console.log('Перевірте змінну середовища BOT_TOKEN у Render');
    process.exit(1);
}

console.log('✅ Токен знайдено, запускаємо бота...');

try {
    const bot = new TelegramBot(token, {polling: true});
    
    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, '🎉 Бот працює! Тест успішний!');
    });

    console.log('🤖 Бот успішно запущений!');
    
    bot.on('polling_error', (error) => {
        console.log('⚠️ Помилка polling:', error);
    });
    
} catch (error) {
    console.log('❌ Критична помилка:', error);
    process.exit(1);
}
