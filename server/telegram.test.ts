import { describe, it, expect } from "vitest";
import { sendTelegramNotification } from "./telegram";

describe("Telegram Bot Integration (@phienoBOT)", () => {
  it("should check env variables", () => {
    expect(process.env.TELEGRAM_BOT_TOKEN).toBeDefined();
    expect(process.env.TELEGRAM_CHAT_ID).toBeDefined();
  });

  it("should handle notification call gracefully", async () => {
    const res = await sendTelegramNotification("🧪 Test da contatore-pianti-bboz con @phienoBOT");
    expect(typeof res).toBe("boolean");
  });
});
