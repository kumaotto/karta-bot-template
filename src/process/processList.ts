import { Context } from "hono";
import { selectKartaAll } from "../db/selectKarta";
import { formatStringForList } from "../util/formatText";
import messageReply from "../line/messageReply";

/**
 * カルタテーブルの全データを取得し、LINE経由でリストとして返答する
 * @param c Honoのコンテキスト
 * @param event LINEのメッセージイベント
 * @param accessToken LINE APIのアクセストークン
 */
export async function processList(c: Context, event: any, accessToken: string): Promise<void> {
  // カルタテーブルの全てのデータを取得
  const results = await selectKartaAll(c);

  // ライン出力用に整形
  const text = formatStringForList(results.results);

  // LINEのAPIを使って返答する
  await messageReply(event, accessToken, text);
}