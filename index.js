///////////////////////////////////////////////////////////////
//             THIS CODE HAVE BEEN CREATED BY                //
//                     BurnGemios3643                        //
//    PLEASE MENTION THE AUTHOR AND DO NOT REMOVE CREDITS    //
///////////////////////////////////////////////////////////////

//Vercode: 0.1

process.setMaxListeners(0);

const Discord = require("discord.js");
const fs = require("fs");

let config = {
    token: "DiscordBotToken"
};

readConfigs();

const client = new Discord.Client();

function readConfigs(){
    if(!fs.existsSync('config.json')) {
        fs.writeFileSync('config.json', JSON.stringify(config, null, 4));
        console.log(`
        ######################################
        config file created, please configure!
        ######################################
        `);
        process.exit(1);
    }
    var contents = fs.readFileSync("config.json");
    config = JSON.parse(contents);
    console.log('Config parsed!');
}

client.login(config.token);

client.on(`ready`, () => {
    console.log(`Discord Bot connected!`);
});

client.on(`message`, async (msg) => {
    if(msg.author.id == client.user.id && msg.content.startsWith(`+embed`)){
        const jsonified = JSON.parse(msg.content.substring(7,msg.content.length));
        Object.entries(jsonified).forEach(([key, value]) => {
            if(value.toString().startsWith(`0x`))jsonified[key] = parseInt(value, 16);
            else if(value.toString().match(/^[0-9]+$/g))jsonified[key] = parseInt(value);
        });
        const embed = jsonified
        console.log(embed);
        msg.channel.send(embed);
        msg.delete();
    }
});