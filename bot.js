const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});

console.log('🤖 Бот запускається...');

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 
    '🎲 Бот-рандомайзер готовий до роботи!\n\n' +
    'Доступні команди:\n' +
    '/random - Випадкове число 1-100\n' +
    '/coin - Підкинути монетку\n' +
    '/dice - Кости (1-6)\n' +
    '/random10 - Число 1-10\n' +
    '/custom - Ваш діапазон (наприклад: /custom 50-200)'
  );
});

bot.onText(/\/random/, (msg) => {
  const chatId = msg.chat.id;
  const randomNum = Math.floor(Math.random() * 100) + 1;
  bot.sendMessage(chatId, `🎲 Ваше випадкове число: **${randomNum}**`, {parse_mode: 'Markdown'});
});

bot.onText(/\/random10/, (msg) => {
  const chatId = msg.chat.id;
  const randomNum = Math.floor(Math.random() * 10) + 1;
  bot.sendMessage(chatId, `🔢 Число від 1 до 10: **${randomNum}**`, {parse_mode: 'Markdown'});
});

bot.onText(/\/coin/, (msg) => {
  const chatId = msg.chat.id;
  const result = Math.random() > 0.5 ? 'Орел 🦅' : 'Решка 🪙';
  bot.sendMessage(chatId, `💰 Монетка: **${result}**`, {parse_mode: 'Markdown'});
});

bot.onText(/\/dice/, (msg) => {
  const chatId = msg.chat.id;
  const dice = Math.floor(Math.random() * 6) + 1;
  bot.sendMessage(chatId, `🎯 Кость: **${dice}**`, {parse_mode: 'Markdown'});
});

bot.onText(/\/custom (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const range = match[1];
  
  try {
    const [min, max] = range.split('-').map(Number);
    if (min >= max) {
      bot.sendMessage(chatId, '❌ Мінімальне число має бути менше за максимальне');
      return;
    }
    
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    bot.sendMessage(chatId, `🎲 Число від ${min} до ${max}: **${randomNum}**`, {parse_mode: 'Markdown'});
  } catch (error) {
    bot.sendMessage(chatId, '❌ Використовуйте формат: /custom 10-50');
  }
});

bot.on('polling_error', (error) => {
  console.log('Polling error:', error);
});

console.log('✅ Бот успішно запущений!');
