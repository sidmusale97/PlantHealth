from flask import Flask, request, jsonify
from service import Service

app = Flask(__name__)
service = Service()

@app.route("/moisture", methods=['POST'])
def moisture():
    body = request.json
    service.process_moisture_data(body["humidity"], body["sensor_id"])
    return ("ok", 200)

@app.route("/latest-watering/<sensor_id>", methods=["GET"])
def get_latest_watering(sensor_id):
    latest_watering = service.get_latest_watering(sensor_id)
    return jsonify(latest_watering), 200

@app.route("/latest-feeding/<sensor_id>", methods=["GET"])
def get_latest_feeding(sensor_id):
    latest_feeding = service.get_latest_feeding(sensor_id)
    return jsonify(latest_feeding), 200

@app.route("/event", methods=["POST"])
def save_event():
    body = request.json
    service.save_event(body["sensor_id"], body['type'])
    return "ok", 200