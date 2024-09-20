const { Client, GatewayIntentBits, Partials } = require('discord.js');
const express = require('express');
const app = express();

// متغيرات البيئة
const token = process.env['DISCORD_TOKEN'];
const prefix = '+';
const blacklistRoleName = 'BLACKLISTED🐕‍🦺';
const blacklistChannelName = 'blacklist-channel';
const blacklistVoiceChannelName = 'Blacklist Voice';

// إعداد keep alive
app.get('/', (req, res) => {
  res.send('Bot is alive!');
});

function keepAlive() {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

keepAlive();

// تعريف البوت
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

// عند تسجيل الدخول بنجاح
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// إنشاء الرتبة والقنوات عند الأمر
client.on('messageCreate', async message => {
  if (message.content.startsWith(`${prefix}blacklist`)) {
    const args = message.content.split(' ').slice(1);
    const memberId = args[0];
    const guild = message.guild;

    if (!memberId) {
      return message.reply('7DED KHONA.');
    }

    const member = guild.members.cache.get(memberId);
    if (!member) {
      return message.reply('MAKAYNCH FSERVER.');
    }
let role = guild.roles.cache.find(r => r.name === blacklistRoleName);
    if (!role) {
      role = await guild.roles.create({
        name: blacklistRoleName,
        color: 'BLACK',
        permissions: []
      });
    }

    // إعطاء الرتبة للمستخدم
    await member.roles.add(role);

    // إعداد الصلاحيات
    guild.channels.cache.forEach(channel => {
      if (channel.type === 'GUILD_TEXT' || channel.type === 'GUILD_VOICE') {
        channel.permissionOverwrites.edit(role, {
          VIEW_CHANNEL: false
        });
      }
    });

    // إنشاء القنوات الخاصة
    let textChannel = guild.channels.cache.find(c => c.name === blacklistChannelName && c.type === 'GUILD_TEXT');
    if (!textChannel) {
      textChannel = await guild.channels.create(blacklistChannelName, {
        type: 'GUILD_TEXT',
        permissionOverwrites: [
          {
            id: guild.id,
            deny: ['VIEW_CHANNEL']
          },
          {
            id: role.id,
            allow: ['VIEW_CHANNEL']
          }
        ]
      });
    }

    let voiceChannel = guild.channels.cache.find(c => c.name === blacklistVoiceChannelName && c.type === 'GUILD_VOICE');
    if (!voiceChannel) {
      voiceChannel = await guild.channels.create(blacklistVoiceChannelName, {
        type: 'GUILD_VOICE',
        permissionOverwrites: [
          {
            id: guild.id,
            deny: ['VIEW_CHANNEL']
          },
          {
            id: role.id,
            allow: ['VIEW_CHANNEL']
          }
        ]
      });
    }

    message.reply(DONE ${member.user.tag});

    // إرسال رسالة كل ساعة
    setInterval(() => {
      textChannel.send(<@${member.id}> KOLO AW9 https://tenor.com/view/im-not-a-hotdog-i-want-to-eat-a-hot-not-be-a-hot-dog-i-want-to-eat-hot-i-dont-want-to-be-a-hotdog-hotdog-sandwich-gif-16996810);
    }, 3600000); // كل ساعة
  }
});

// تسجيل الدخول
client.login(token);
