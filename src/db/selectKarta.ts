import { Context } from "hono";

export const selectKartaByHiragana = async (hiragana: string, context: Context) => {

  return await context.env.DB.prepare(
    `select karta_content, karta_description from karta where karta_char = ?`
  )
  .bind(hiragana)
  .all();

};

// カルタテーブルの全てのデータを取得する
export const selectKartaAll = async (context: Context) => {

  return await context.env.DB.prepare(
    `select karta_char, karta_content, karta_description from karta`
  )
  .all();

};