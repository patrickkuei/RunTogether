import { NextApiResponse, NextApiRequest } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.ENV_LOCAL_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: _req.body.prompt,
    temperature: 0.6,
    max_tokens: 1500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
  });

  return res.status(200).json(response.data.choices[0].text || "");
}
