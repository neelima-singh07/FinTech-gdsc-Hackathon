import requests
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta

load_dotenv()
FINNHUB_API_KEY = os.getenv("FINNHUB_API_KEY")

def get_stock_quote(symbol):
    url = f"https://finnhub.io/api/v1/quote?symbol={symbol}&token={FINNHUB_API_KEY}"
    res = requests.get(url)
    if res.status_code == 200:
        data = res.json()
        return (
            f"The current stock price of {symbol.upper()} is ${data['c']}. "
            f"It opened at ${data['pc']}, reached a high of ${data['h']} and a low of ${data['l']} today."
        )
    else:
        raise Exception("Finnhub API error")
