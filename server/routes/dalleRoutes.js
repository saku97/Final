import express from "express";
import * as dotenv from "dotenv";
import OpenAIApi from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAIApi({ apiKey: process.env.OPENAI_API_KEY });
router.route("/").get((req, res) => {
  res.send("Hello from DALL.E!");
});
router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      // response_format: "b64_json",
    });
    console.log("");
    // const image = aiResponse.data.data[0].b64_json;
    console.log(aiResponse.data);
    const image_url = aiResponse.data[0].url;

    res.status(200).json({ photo: image_url });
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.response?.data?.error?.message);
  }
});
export default router;
