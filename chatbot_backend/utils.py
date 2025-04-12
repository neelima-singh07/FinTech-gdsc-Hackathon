# import re
# from llm_response import query_huggingface_model, query_gemini_model  # 👈 Add Gemini here
# from finnhub_data import get_stock_quote

# def extract_ticker(text):
#     tickers = re.findall(r'\b[A-Z]{1,5}\b', text.upper())
#     blacklist = [
#         "STOCK", "STOCKS", "PRICE", "NEWS", "ABOUT", "SHARE", "SHARES", "INFO",
#         "DETAILS", "GIVE", "SHOW", "PLEASE", "WHAT", "TELL", "US", "ME", "UPDATE",
#         "THE", "OF", "TODAY", "VALUE", "REPORT", "LATEST", "IN", "ON", "FOR",
#         "AND", "COMPANY", "SYMBOL", "MARKET", "DATA", "HIGH", "LOW", "OPEN", "CLOSE",
#         "CURRENT", "TECH", "FINANCE", "INVESTMENT", "PREDICTION", "PERCENT",
#         "DOLLARS", "HOW", "MUCH", "DO", "YOU", "KNOW", "IS", "IT"
#     ]
#     return [t for t in tickers if t not in blacklist]

# def handle_chat(user_query):
#     if not user_query.strip():
#         return "Please enter a valid financial question."

#     user_query = user_query.lower()

#     try:
#         # 📈 Stock Price / Quote
#         if any(x in user_query for x in ["stock", "price", "quote", "market"]):
#             tickers = extract_ticker(user_query)
#             if tickers:
#                 stock_data = get_stock_quote(tickers[0])
#                 return stock_data
#             else:
#                 return "❗ Sorry, I couldn't identify any stock symbol."

#         # 🤖 Use Hugging Face LLM
#         model_response = query_huggingface_model(user_query)
#         if len(model_response.strip()) < 50 or "i don't know" in model_response.lower():
#             raise ValueError("Model response not helpful")

#         return model_response

#     except Exception as e:
#         print(f"[Fallback triggered] {e}")
#         gemini_response = query_gemini_model(user_query)
#         if gemini_response:
#             return f"{gemini_response}"
#         else:
#             return "❗ Sorry, I couldn't get a valid answer at the moment."

import re
from llm_response import query_huggingface_model, query_gemini_model
from finnhub_data import get_stock_quote

def extract_ticker(text):
    tickers = re.findall(r'\b[A-Z]{1,5}\b', text.upper())
    blacklist = [
        "STOCK", "STOCKS", "PRICE", "NEWS", "ABOUT", "SHARE", "SHARES", "INFO",
        "DETAILS", "GIVE", "SHOW", "PLEASE", "WHAT", "TELL", "US", "ME", "UPDATE",
        "THE", "OF", "TODAY", "VALUE", "REPORT", "LATEST", "IN", "ON", "FOR",
        "AND", "COMPANY", "SYMBOL", "MARKET", "DATA", "HIGH", "LOW", "OPEN", "CLOSE",
        "CURRENT", "TECH", "FINANCE", "INVESTMENT", "PREDICTION", "PERCENT",
        "DOLLARS", "HOW", "MUCH", "DO", "YOU", "KNOW", "IS", "IT"
    ]
    return [t for t in tickers if t not in blacklist]

def handle_chat(user_query):
    if not user_query.strip():
        return "Please enter a valid financial question."

    user_query = user_query.lower()

    try:
        # 📊 Stock Price Query
        if any(x in user_query for x in ["stock", "price", "quote", "market"]):
            tickers = extract_ticker(user_query)
            if tickers:
                return get_stock_quote(tickers[0])
            else:
                return "❗ Sorry, I couldn't identify any stock symbol."

        # 📰 Route news/current/recent type queries to Gemini directly
        if any(x in user_query for x in ["news", "recent", "current", "updates", "latest"]):
            gemini_response = query_gemini_model(user_query+" In 150 words")
            return gemini_response or "❗ Gemini couldn't fetch the latest update."

        # 🤖 Try Hugging Face LLM first
        model_response = query_huggingface_model(user_query)
        if len(model_response.strip()) < 50 or "i don't know" in model_response.lower():
            raise ValueError("Model response not helpful")
        return model_response

    except Exception as e:
            print(f"[Fallback triggered] {e}")
            gemini_response = query_gemini_model(user_query+" In 150 words")
            return gemini_response or "❗ Sorry, I couldn't get a valid answer at the moment."