import express from "express";
import * as dotenv from "dotenv";
import { OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();
//const apiKey = "224bd38682ec4e888382257d14da0337";
// const azureConfig = {
//   apiKey: "fc80d77e0cf440cd840529518802ae5c",
//   endpoint:
//     "https://openai-rq75033025.openai.azure.com/openai/images/generations:submit?api-version=2023-06-01-preview",
//   apiVersion: "2023-06-01-preview",
// };

const openai = new OpenAIApi({
  apiKey: "",
  apiBase: "",
  apiVersion: "2023-06-01-preview",
});

// const openai = new OpenAIApi(new Configuration({ apiKey, azure: azureConfig }));

// const DEFAULT_PARAMS = {
//   model: "iCETS-MSCoE-text-davinci-003",
//   temperature: 0.3,
//   max_tokens: 800,
//   top_p: 1,
//   frequency_penalty: 0,
//   presence_penalty: 0,
// };
// const params = { ...DEFAULT_PARAMS, prompt: prompt, stop: "\n" };

// const azureOpenAIKey = "fc80d77e0cf440cd840529518802ae5c";
// const requestOptions = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "api-key": azureOpenAIKey,
//     "User-Agent": "cloud-team-automation",
//   },
//   body: JSON.stringify(params),
// };

// fetch(
//   "https://openai-rq75033025.openai.azure.com/openai/images/generations:submit?api-version=2023-06-01-preview",
//   requestOptions
// )
//   .then((response) => {
//     if (!response.ok) {
//       switch (response.status) {
//         case 401: // 401: Unauthorized: API key is wrong
//           throw new Error("Please double-check your API key.");
//         case 429: // 429: Too Many Requests: Need to pay
//           throw new Error(
//             "You exceeded your current quota, please check your plan and billing details."
//           );
//         default:
//           throw new Error(
//             "Something went wrong with the request, please check the Network log"
//           );
//       }
//     }
//     return response.json();
//   })
//   .then((response) => {
//     console.log("My response from AZ OpenAI came as...", response);
//     const { choices } = response;
//     const text = choices[0].text;
//     console.log(text);
//   })
//   .catch((error) => {
//     console.log(error);
//     alert(error);
//   });
router.route("/").get((req, res) => {
  res.status(200).json({ messsage: "Hello from DALL.E ROUTES" });
});

router.route("/").post(async (req, res) => {
  // try {
  //   const { prompt } = req.body;
  //   const response = await openai.createImage({
  //     prompt,
  //     n: 1,
  //     size: "1024x1024",
  //     response_format: "b64_json",
  //   });
  //     const image = response.data.data[0].b64_json;
  //     res.status(200).json({ photo: image });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ messsage: "Something went wrong" });
  //   }
  const { prompt } = req.body;
  // openai.Image.create({
  //   prompt,
  //   size: "1024x1024",
  //   n: 1,
  // })
  //   .then((response) => {
  //     const imageUrl = response.data[0].url;
  //     console.log(imageUrl);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
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
