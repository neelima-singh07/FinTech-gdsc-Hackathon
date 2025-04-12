import requests
import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

# Load environment variables from .env file
load_dotenv()

# Hugging Face API Setup
HF_API_URL = "https://api-inference.huggingface.co/models/TinyLlama/TinyLlama-1.1B-Chat-v1.0"
HF_HEADERS = {
    "Authorization": f"Bearer {os.getenv('HF_API_TOKEN')}"
}

def query_huggingface_model(user_query):
    system_prompt = (
        "You are FinBuddy, a fun and friendly finance expert. "
        "Always answer questions with financial context and make them engaging and fun with examples. "
        "Explain concepts like you're talking to a curious teen/college student .\n\n"
        "User: " + user_query + "\nFinBuddy:"
    )
    payload = {
        "inputs": system_prompt,
        "parameters": {
            "temperature": 0.7,
            "max_new_tokens": 300
        }
    }

    try:
        response = requests.post(HF_API_URL, headers=HF_HEADERS, json=payload)
        response.raise_for_status()
        result = response.json()
        return result[0]["generated_text"].split("FinBuddy:")[-1].strip()
    except Exception as e:
        print(f"[Hugging Face Error] {e}")
        return ""

# Gemini API Setup
def query_gemini_model(user_query):
    try:
        google_api_key = os.getenv("GOOGLE_API_KEY")
        model = ChatGoogleGenerativeAI(model='gemini-1.5-pro', google_api_key=google_api_key)
        result=model.invoke(user_query)
        return result.content.strip()
    except Exception as e:
        print(f"[Gemini Error] {e}")
        return ""
