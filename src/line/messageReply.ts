interface LineEvent {
  replyToken: string;
}

interface TextMessage {
  type: string;
  text: string;
}

/**
 * LINE Messaging APIを使用してメッセージに返信する
 * @param event LINEイベントで、返信トークンを含む
 * @param accessToken LINE APIとの認証に使用するアクセストークン
 * @param text 送信されるテキストメッセージ
 */
const messageReply = async (event: LineEvent, accessToken: string, text: string | string[]): Promise<void> => {
  const { replyToken } = event;
  const normalizedTexts = typeof text === 'string' ? [text] : text;
  const messages: TextMessage[] = normalizedTexts.map(text => ({ type: "text", text }));

  try {
    const apiResponse = await fetch("https://api.line.me/v2/bot/message/reply", {
      body: JSON.stringify({
        replyToken,
        messages,
      }),
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log(`メッセージ送信成功: ${apiResponse.statusText}`);

    if (!apiResponse.ok) {
      console.error(`メッセージ送信失敗: ${apiResponse.statusText}`);
      return;
    }

  } catch (error) {
    console.error(`メッセージ送信エラー: ${error}`);
  }
};

export default messageReply;