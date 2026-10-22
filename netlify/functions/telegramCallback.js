exports.handler = async (event) => {
  const BOT_TOKEN = "8570423763:AAHilKg65_KpbYnPkWcKuexnSx_z5rRZPOI";
  const PAYMENT_CHANNEL = "@earn_mini_pay";
  const update = JSON.parse(event.body);
  if(update.callback_query){
    const data = update.callback_query.data;
    const parts = data.split('_');
    const action = parts[0];
    const userId = parts[1];
    const type = parts[2];
    if(action === "accept"){
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body: JSON.stringify({ chat_id: userId, text: type==="task" ? "✅ Task Approved & Live!" : "✅ Withdraw $5+ Approved! USDT Sent!" })});
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body: JSON.stringify({ chat_id: PAYMENT_CHANNEL, text: `💸 ${type==="task" ? "PAID TASK LIVE" : "WITHDRAW PAID $5+"}\n\n${update.callback_query.message.text}\n\n✅ Auto Approved` })});
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({callback_query_id:update.callback_query.id, text:"Approved & Forwarded to Payment Channel!"})});
    } else {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:userId, text:"❌ Rejected by Admin"})});
    }
  }
  return {statusCode:200, body:"ok"};
}
