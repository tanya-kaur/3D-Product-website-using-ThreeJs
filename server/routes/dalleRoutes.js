import express from "express";
import * as dotenv from "dotenv";
import { OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAIApi({
  apiKey: "",
  apiBase: "",
  apiVersion: "2023-06-01-preview",
});


router.route("/").get((req, res) => {
  res.status(200).json({ messsage: "Hello from DALL.E ROUTES" });
});

router.route("/").post(async (req, res) => {

  const { prompt } = req.body;

  openai
    .createImage({
      prompt,
      size: "1024x1024",
      n: 1,
      response_format: "b64_json",
    })
    .then((response) => {
      console.log(response);
      const imageUrl = response.data[0].b64_json;
      console.log(imageUrl);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

export default router;
