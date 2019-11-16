const Discord = require('discord.js');
var bot = new Discord.Client();
bot.login(process.env.TOKEN) 
var prefix = "!"



    
    bot.on('ready', () => console.log('Coucou je suis démarré !'));
bot.on('ready', function(){
   bot.user.setActivity('boires des bières🍺!')
})

bot.on('message', message => {
    
    if (message.content.startsWith(prefix + "sondage")) {
            let args = message.content.split(" ").slice(1);
            let thingToEcho = args.join(" ")
            var embed = new Discord.RichEmbed()
                .setDescription("Sondage")
                .addField(thingToEcho, "Répondre :one: ( :white_check_mark: ) ou :two: ( :x: ) ou :three: ( :thinking: )")
                .setColor("0xB40404")
            message.channel.sendEmbed(embed)
            .then(function (message) {
                message.react("1️⃣")
                message.react("2️⃣")
                message.react("3️⃣")
            }).catch(function() {
            });
            }else{
    }})

bot.on('guildMemberAdd', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':tada: ' + member.user.username + ' à rejoint ! ' + member.guild.name)
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('640613799967195136').sendMessage(embed)
});

bot.on('guildMemberRemove', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(' ❌**' + member.user.username + '** a quitté ' + member.guild.name)
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('640614445961445397').sendMessage(embed)
 
});

bot.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let count = parseInt(args[1])
        if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
        if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
        message.channel.bulkDelete(count + 1, true)
    }
 
    if (args[0].toLowerCase() === prefix + "mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Membre introuvable")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre")
        if (!member.manageable) return message.channel.send("Je ne peux pas mute ce membre")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.addRole(muterole)
            message.channel.send(member + ' a été mute :white_check_mark:')
        }
        else {
            message.guild.createRole({name: 'Muted', permissions: 0}).then(function (role) {
                message.guild.channels.filter(channel => channel.type === 'text').forEach(function (channel) {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send(member + ' a été mute :white_check_mark:')
            })
        }
    }
})

/*Kick*/
bot.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + 'kick') {
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:")
       if (!member.kickable) return message.channel.send("Je ne peux pas exclure cet utilisateur :sunglass:")
       member.kick()
       message.channel.send('**' + member.user.username + '** a été exclu :white_check_mark:')
    }
})
 
/*Ban*/
bot.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'ban') {
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
       if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur :sunglass:")
       message.guild.ban(member, {days: 7})
       message.channel.send('**' + member.user.username + '** a été banni :white_check_mark:')
    }
})

bot.on("message", function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    //unmute
    if (args[0].toLowerCase() === prefix + "unmute") {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
        let member = message.mentions.members.first()
        if(!member) return message.channel.send("Membre introuvable")
        if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas unmute ce membre.")
        if(!member.manageable) return message.channel.send("Je ne pas unmute ce membre.")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if(muterole && member.roles.has(muterole.id)) member.removeRole(muterole)
        message.channel.send(member + ' a été unmute :white_check_mark:')
    }
 
    //unwarn
    if (args[0].toLowerCase() === prefix + "unwarn") {
        let member = message.mentions.members.first()
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
        if(!member) return message.channel.send("Membre introuvable")
        if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas unwarn ce membre.")
        if(!member.manageable) return message.channel.send("Je ne pas unwarn ce membre.")
        if(!warns[member.id] || !warns[member.id].length) return message.channel.send("Ce membre n'a actuellement aucun warns.")
        warns[member.id].shift()
        fs.writeFileSync('./warns.json', JSON.stringify(warns))
    message.channel.send("Le dernier warn de " + member + " a été retiré :white_check_mark:")
    }
})

bot.on('message', message => {
    if(message.content[0] === prefix) {
        if(message.content === prefix + 'nouveau membre') {
            //on cherche le rôle sur le serveur
            let role = message.guild.roles.find('name', 'nouveau membre')

            //on le supprime ou on l'ajoute
            if(message.member.roles.find('name', 'nouveau membre')) {
                message.member.removeRole(role)
                message.reply(`Voilà ! Vous n'avez plus le rôle n°1`)
            }
            else {
                message.member.addRole(role)
                message.reply('Voila ! Vous avez le rôle n°1.')
            }
        } 
    }
})







bot.on('message', message => {

    if(message.content === "Bonjour!"){
        message.reply("(°-°)┬─┬")
        message.reply(":Bienvenue dans mon bureau et dans le serveur tu est venu pour parlé et joué dans le serveur c'est sa(réponder par) (oui! ou non! )? (non c'est la salle de ban) ")
        
    }
})

bot.on('message', message => {
    if(message.content === "oui!"){
        message.reply("(°-°)┬─┬")
        message.reply("super")
        message.reply("ok super bienvenue dans notre serveur d'abord il faut que tu lis les régles ok (ok!) ")
        
    }
})

bot.on('message', message => {
    if(message.content === "ok!"){
        message.reply("(°-°)┬─┬")
        message.reply("voici les régle")
        message.reply("-ne pas insulter (1 avertissement)")
        message.reply("-ne pas spam (1 avertissement)")
        message.reply("-et surtout poser les questions ou problèmes que vous avez")
        message.reply("Au bout de 3 avertissement ban 2 jours (peut être modifié)et Au bout de 4 ban se sera un ban définitif")
        message.reply("Règle provisoire instoré par :@gusto_35#8606 ") 
        message.reply("role!")
    }
})

bot.on('message', message => {
    if(message.content === "role!"){
        message.reply("voila mon travaille s'arrête ici avant que tu parte fais cette commande pour rentrer dans le serveur")
        message.reply("==================")
        message.reply("!nouveau membre")
    }
})

bot.on('message', message => {
    if(message.content === "!nouveau membre"){
        message.reply('super maintenant tu peut aller sur les autres channels ')
        message.reply('donc salut a la prochaine dans mon bureau')
    }
})

bot.on('message', message => {
    if(message.content === "non!"){
        message.reply("(╯°□°)╯  ︵  ┻━┻")
        message.reply("d'accord alors que fait là tu la sort de se serveur")
        message.reply("metter le en salle de ban s'il vous plait")
    }
})

bot.on('message', message => {
    if(message.content === "infograde"){
        message.reply("(°-°)")
        message.reply("AFK Arena///war thunder///Minecraft///héro zero///")
        message.reply("cs go///roblox///[modérateur]///[[les créateurs]]")
        message.reply("voila :)")
    }
})
