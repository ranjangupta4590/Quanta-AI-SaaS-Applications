import {Configuration ,OpenAI} from 'openai'

const configuration = new Configuration({
    apikey :process.env.OPENAI_API_KEY,
});

const openai=new  OpenAI(configuration);