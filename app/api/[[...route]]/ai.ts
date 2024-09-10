import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import { openAi } from "@/lib/openai";

const app = new Hono().post(
  "/generate-image",
  zValidator(
    "json",
    z.object({
      prompt: z.string().min(3).max(1000),
    })
  ),
  async ({ req, json }) => {
    const { prompt } = req.valid("json");

    const response = await openAi.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
    });
    const imageUrl = response.data[0].url;
    if (imageUrl) {
      const imageResponse = await fetch(imageUrl);
      const imageBuffer = await imageResponse.arrayBuffer();

      // Return the image data as base64
      const base64Image = Buffer.from(imageBuffer).toString("base64");
      const dataUrl = `data:${imageResponse.headers.get(
        "content-type"
      )};base64,${base64Image}`;

      return json({ data: dataUrl });
    }
    // Fetch the image
    return json({ data: "" });
  }
);

export default app;
