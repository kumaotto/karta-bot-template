import {
	WebhookEvent,
} from "@line/bot-sdk";
import { Context, Hono } from "hono";
import { BlankEnv, BlankInput } from "hono/types";
import { processHiraganaStart } from "./process/processHiraganaStart";
import { processList } from "./process/processList";

const app = new Hono();

app.post("/api/webhook", async (c: Context<BlankEnv, "/api/webhook", BlankInput>): Promise<Response | undefined> => {
	
	const data = await c.req.json();
	const events: WebhookEvent[] = (data as any).events;
	const accessToken: string = (c.env as Record<string, string>).CHANNEL_ACCESS_TOKEN;

	// イベント内容チェック
  const event = events
    .map((event: WebhookEvent) => {
      if (event.type != "message" || event.message.type != "text") {
        return;
      }
      return event;
    })
    .filter((event) => event)[0];

	// イベントがない場合は何もしない
  if (!event) {
    console.log(`No event: ${events}`);
    return c.json({ message: "ok" });
  }

	try {

		// 「リスト」または「list」と入力された場合
		if (event.message.type === "text" && event.message.text == "リスト") {
			await processList(c, event, accessToken);
			return c.json({ message: "ok" });
		}		
		
		// それ以外の場合は、最初の文字を取得して返答する
		if (event.message.type === "text") {
			await processHiraganaStart(c, event, accessToken);
			return c.json({ message: "ok" });
		}

	} catch (e: unknown) {
		console.error(e);
	}
});

export default app;
