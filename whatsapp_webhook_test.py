from flask import Flask, request
import requests

app = Flask(__name__)

VERIFY_TOKEN = "speedpack_test_123"

ACCESS_TOKEN = "EAAYhqoD4ED8BRmcrlQFgLSoRvVDwYXQmhCiuoO6OU5sItaEvZBFqlvvhZCIcNo0GJPG6BCb2YqSZAkSRZCZCcWFU7BDDlJ01xxRzAPuRRNxfliNBT3sqWIdxSbgq8eAYBh2aSYrGauqtXiS0vBjZC4au7iKMxjXGuLZBAjZA8d49HPUnhgCJp7H2BcZAqcflvIzJIyIKTEhZAvNcaFMpHFCvZBojxzXcnjQyGXEDswM7ne5fmgwZADFFtozsSgQjwTUiq1X6s70EEcOIxTqUZC9UZBzlQz"
PHONE_NUMBER_ID = "1105848945952680"


def send_whatsapp_message(to_number, message):
    url = f"https://graph.facebook.com/v25.0/{PHONE_NUMBER_ID}/messages"

    headers = {
        "Authorization": f"Bearer {ACCESS_TOKEN}",
        "Content-Type": "application/json",
    }

    payload = {
        "messaging_product": "whatsapp",
        "to": to_number,
        "type": "text",
        "text": {
            "body": message
        }
    }

    response = requests.post(url, headers=headers, json=payload)
    print("Send status:", response.status_code)
    print("Send response:", response.text)


@app.route("/webhook", methods=["GET"])
def verify_webhook():
    mode = request.args.get("hub.mode")
    token = request.args.get("hub.verify_token")
    challenge = request.args.get("hub.challenge")

    if mode == "subscribe" and token == VERIFY_TOKEN:
        print("Webhook verified")
        return challenge, 200

    return "Verification failed", 403


@app.route("/webhook", methods=["POST"])
def receive_message():
    data = request.get_json()
    print("Incoming webhook:")
    print(data)

    try:
        value = data["entry"][0]["changes"][0]["value"]

        if "messages" not in value:
            return "No message", 200

        message = value["messages"][0]
        from_number = message["from"]

        text = message.get("text", {}).get("body", "").strip().lower()

        print("From:", from_number)
        print("Text:", text)

        if text == "accept":
            send_whatsapp_message(
                from_number,
                "✅ Job TEST123 accepted.\n\nPlease reply with your ETA to pickup. Example: ETA 30"
            )

        elif text == "deny":
            send_whatsapp_message(
                from_number,
                "❌ Job TEST123 denied. Dispatcher has been notified."
            )

        elif text.startswith("eta"):
            send_whatsapp_message(
                from_number,
                f"🕒 ETA received: {text.upper()}\n\nNext step: pickup photo will be required."
            )

        else:
            send_whatsapp_message(
                from_number,
                "Reply ACCEPT, DENY, or ETA 30."
            )

    except Exception as e:
        print("Error handling webhook:", e)

    return "OK", 200


if __name__ == "__main__":
    app.run(port=5000, debug=True)