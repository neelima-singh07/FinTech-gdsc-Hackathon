import requests
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables from .env file
load_dotenv()

# Hugging Face API Setup
HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1"
HF_HEADERS = {
    "Authorization": f"Bearer {os.getenv('HF_API_TOKEN')}"
}

def query_huggingface_model(user_query):
    system_prompt = (
        "You are FinBuddy, a fun and friendly finance expert. "
        "Always answer questions with financial context and make them engaging with examples such that a teenager or college student would understand. "
        "Explain concepts like you're talking to a curious student using examples, analogies, and clear breakdowns.\n\n"
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
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

def query_gemini_model(user_query):
    try:
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(user_query)
        return response.text.strip()
    except Exception as e:
        print(f"[Gemini Error] {e}")
        return ""
