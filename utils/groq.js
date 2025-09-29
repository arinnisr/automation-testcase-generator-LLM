import Groq from 'groq-sdk';
import dotenv from 'dotenv';
import { parse } from 'marked';

dotenv.config();

// Initialize the Groq SDK with the API key
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const getGroqChatCompletion = async (messageContent) => {
  try {
    const model = process.env.GROQ_MODEL
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a software testing assistant responsible for generating test cases based on scraped data. The generated test cases must match the manual test cases in both format and writing style.
          ### **Important Instructions:**
          1. **Test case JSON format to follow:**
            {
              **Feature**: The name of the feature being tested.,
              **Description**: A brief description of the test case's objective and the expected result.,
              **Scenario**: The user's steps in the context of a web application make sure the steps is detail and can simulat e user activity in real cases.,
              **Expected Results**: The expected outcome of the scenario.,
            }
          2. **Consistency with manual test cases:**
            - Use language similar to the manual test cases.
            - Avoid technical terms such as "inspect" or "click" and focus more on user interactions.
            - Ensure that the test cases emphasize the user actual process rather than UI element inspection.
          3. **Output structure:**
            - Each test case should be separated by ---TEST CASE---.
            - After all test cases are created, generate an appropriate Cypress automation script.
            - The script should be displayed in a separate section, starting with ---SCRIPT--- and ending with ---SCRIPT---.
            `,
        },
        {
            role: 'user',
            content: messageContent
        }
      ],
      model: model
    });

    const message = response.choices[0]?.message?.content || 'No response from the model.'
    // console.log(message)
    const result = {
        message: parse(message),
        model: model
    }
    return result
  } catch (error) {
    console.error('Error communicating with Groq API:', error.message);
    throw new Error('Failed to get response from Groq API.');
  }
};
