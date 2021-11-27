const mongo = require("./mongoose")
const TelegramBot = require("node-telegram-bot-api");
const model = require("./model");

let TOKEN = '2131911696:AAFjkVCLuFdhrl90qw0S5AuRDWKyyryd3nc';

const bot = new TelegramBot(TOKEN, {
    polling: true,
});

// // bot.on("message", async(message) => {
// //     const userId = message.from.id;
// //     const dice = message?.dice?.value;
// //     const messagId = message.message_id;

// //     console.log(message)

// //     if(message.dice){
// //         let myDice = await bot.sendDice(userId, {
// //             dice: "🎲"
// //         });

// //         if(myDice.dice.value > dice){
// //             await bot.sendMessage(userId,`<b>Men yutdim</b>\n \n Sizning balingiz: ${dice} \n Meni balim: ${myDice.dice.value}`, {
// //                 parse_mode: "HTML"
// //             });
// //         }else{
// //             await bot.sendMessage(userId,`<b>Siz yutdingiz</b>\n \n Sizning balingiz: ${dice} \n Meni balim: ${myDice.dice.value}`, {
// //                 parse_mode: "HTML"
// //             });
// //         }
// //     }else{
// //         bot.sendMessage(userId, "Iltimos dice yuboring")
// //     }
// // })

// bot.on("message", async(message) => {
//     try{

//         if(message.text === "Primiere Pro"){
//             await bot.sendMessage(message.from.id, "Primiere Pro tugmasi bosildi")
//             return;
//         }
//         // let keyboard = {
//         //     keyboard: [
//         //         [
//         //             {
//         //                 text: "Primiere Pro"
//         //             },
//         //             {
//         //                 text: "Adobe Illustrator"
//         //             },
//         //         ],
//         //         [
//         //             {
//         //                 text: "Adobe Photoshop"
//         //             },
//         //         ]
//         //     ],
//         //     resize_keyboard: true,
//         // }

//         //second type keyboard
//         let keyboard = {
//             inline_keyboard: [
//                 [
//                     {
//                         text: "Premiere Pro",
//                         callback_data: "premiere_pro"
//                     }
//                 ]
//             ]
//         }

//         await bot.sendMessage(message.from.id, `Assalomu alykum ${message.from.first_name} \n Quyidagi menyulardan birini tanlang`,{
//             reply_markup: keyboard
//         })
//     }catch(e){
//         await bot.sendMessage(message.from.id, e + "");
//     }
// })

mongo()

// bot.on("message" ,async(message) => {
//     console.log(message.photo)
// })
bot.on("message", async(message) => {
    try{
        const userId = message.from.id;


        let user = await model.findOne({
            user_id: userId
        });

        if(!user){
            user = await model.create({
                user_id: userId,
                step: "name"
            })
            
            await bot.sendMessage(userId, "Ismingizni kiriting:");
        }else if(user.step == "name"){
                await model.findOneAndUpdate({
                    user_id: userId,
                },{
                    step: "phone_number",
                    name: message.text,
                })

                await bot.sendMessage(userId, "salom " + message.text + ", Telefon raqamingizni kiriting:",{
                    reply_markup: {
                        keyboard: [
                            [
                                {
                                    text:'Kontakt yuborish',
                                    request_contact: true
                                }
                            ]
                        ],
                        resize_keyboard: true
                    }
                })
        } else if(user.step == "phone_number" && message.contact){
            await model.findOneAndUpdate({
                user_id: userId,
            },{
                step: "full",
                phone_number: message.contact.phone_number
                
            })

            await bot.sendMessage(userId, "Ro`yxatdan o`tdingiz")

            if(message.contact.phone_number == "998995002831"){
                let photo = 'AgACAgIAAxkBAANjYaInC_ISkWbywy7oPsshMbQ6ryoAAuG3MRvrOxlJLaBf1EBUclABAAMCAAN4AAMiBA';
                console.log("joqqi")
                await bot.sendPhoto(userId, photo,{

                    caption: "ishladimi?",
                })
            }
            if(message.contact.phone_number == "998332647167"){
                let photo = 'https://images.pexels.com/photos/10305718/pexels-photo-10305718.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
                console.log("humans")
            
                await bot.sendPhoto(userId, photo,{

                    caption: "Ishladimi?",
                })
            }
            
        }else if(user.step == "full"){
            
        }



    }catch(e){
        console.log(e)
    }
})

// bot.on("message", async(message) => {
//     console.log(message.photo);
// })