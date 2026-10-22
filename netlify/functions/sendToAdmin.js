exports.handler = async (event) => {
  const BOT_TOKEN = "8570423763:AAHilKg65_KpbYnPkWcKuexnSx_z5rRZPOI";
  const ADMIN_CHAT_ID = "8886499198";
  const body = JSON.parse(event.body);
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      chat_id: ADMIN_CHAT_ID,
      text: body.text,
      reply_markup: { inline_keyboard: [[{text:"✅ Accept", callback_data:`accept_${body.userId}_${body.type}`}, {text:"❌ Reject", callback_data:`reject_${body.userId}_${body.type}`}]] }
    })
  });
  return { statusCode:200, body:"sent" };
}
