import { TextMessage } from '@line/bot-sdk';
import { Context } from 'hono';
import { selectKartaByHiragana } from '../db/selectKarta';
import messageReply from '../line/messageReply';

/**
 * ひらがなで始まるメッセージに応じて、ランダムな応答をLINE経由で返却する
 * @param c Honoのコンテキスト
 * @param event LINEのメッセージイベント
 * @param accessToken LINE APIのアクセストークン
 */
export async function processHiraganaStart(c: Context, event: any, accessToken: string): Promise<void> {
  const firstChar = event.message.text.substring(0, 1);
  console.log(`First char: ${firstChar}`);

  // 最初の文字がひらがなでない場合は何もしない
  if (!/^[ぁ-ん]+$/.test(firstChar)) {
    return;
  }

  // D1からデータを取得
  const results = await selectKartaByHiragana(firstChar, c);

  // カルタの札にデータがない場合は何もしない(説明だけのパターンは考慮しない)
  if (results.results.length === 1 && results.results[0].karta_content === "") {
    await messageReply(event, accessToken, ["まだ登録されていません"])
    return;
  }

  // 複数ある場合のために、ランダムで1つ取得
  const randomIndex = Math.floor(Math.random() * results.results.length);
  const resultContent = results.results[randomIndex].karta_content;
  const resultDescription = results.results[randomIndex].karta_description;

  // LINEのAPIを使って返答する ※descriptionがある場合は2つのメッセージを返す
  if (resultDescription) {
    await messageReply(event, accessToken, [resultContent, resultDescription])
  } else {
    await messageReply(event, accessToken, [resultContent])
  };
}
