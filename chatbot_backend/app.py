from flask import Flask, request, jsonify
from flask_cors import CORS 
from utils import handle_chat

app = Flask(__name__)
CORS(app)  

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_query = data.get("message", "")
    
    if not user_query.strip():
        return jsonify({"response": "Please enter a valid query."}), 400

    response = handle_chat(user_query)
    return jsonify({"response": response})

@app.route("/test", methods=["GET"])
def test():
    return jsonify({"status": "working"})

if __name__ == "__main__":
    app.run(host="localhost", port=5001, debug=True)
