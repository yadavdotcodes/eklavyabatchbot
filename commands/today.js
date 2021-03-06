const fetch = require("cross-fetch");
const moment = require("moment-timezone");
const client = require("../modules/postgresql");
const mode = {parse_mode : "HTML"};
const date = moment().tz("Asia/Kolkata").format("DD");
const fulldate = moment().tz("Asia/Kolkata").format("MMMM Do YYYY");
// Exporting Today Command
module.exports = async (ctx) => {
  ctx.telegram.sendChatAction(ctx.chat.id, "typing");
  client.query(`SELECT * FROM "schedule" WHERE "date" = ${date};`, (err, res) => {
    if(!err){
      if(res.rows.length == "0"){
        ctx.reply(`<b>ā No Mock Tests Today!</b>\n\nšØš»āš Go And Revise Chapters!\nš„ You Will Be Topper!`, mode);
      } else {
        ctx.reply(`<b>ā Today's Mock Test Details</b>

š Date - ${fulldate}
š Subject - ${res.rows[0].subject}
š Chapter - ${res.rows[0].chapter}`, mode);
      }
    } else {
      ctx.reply(`<b>š½ Some Error Happened In Database!</b>\nš§š» Contact Admin Please!`, mode);
    }
  })
}
