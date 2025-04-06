import axios from 'axios';

const API_KEY = 'process.env.OPENAI_API_KEY';
const API_URL = 'process.env.OPENAI_API_KEY';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const retryRequest = async (fn, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (error.response && error.response.status === 429 && i < retries - 1) {
                console.warn(`Rate limit exceeded. Retrying in ${delay}ms...`);
                await sleep(delay);
                delay *= 2;
            } else {
                throw error;
            }
        }
    }
};

export const getChatGPTResponse = async (messages) => {
    return retryRequest(async () => {
        const response = await axios.post(
            API_URL,
            {
                model: 'gpt-3.5-turbo',
                messages: messages,
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    });
};