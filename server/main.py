from flask import Flask, request, jsonify
from service import Service
from flask_cors import CORS
import sys
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)
service = Service()

@app.route("/moisture", methods=['POST', 'GET'])
def moisture():
    if (request.method == "POST"):
        body = request.json
        service.process_moisture_data(body["humidity"], body["sensor_id"])
        return ("ok", 200)
    else:
        fromDate = request.args.get('fromDate', type=int, default=(datetime.now() - timedelta(weeks=1)).timestamp())
        toDate = request.args.get('toDate', type=int, default=datetime.now().timestamp())
        sensor_id = request.args.get("sensor_id", type=int)     
        moistures = service.get_moisture(sensor_id, fromDate, toDate)
        return jsonify(moistures), 200

@app.route("/latest-watering/<sensor_id>", methods=["GET"])
def get_latest_watering(sensor_id):
    latest_watering = service.get_latest_watering(sensor_id)
    return jsonify(latest_watering), 200

@app.route("/latest-feeding/<sensor_id>", methods=["GET"])
def get_latest_feeding(sensor_id):
    latest_feeding = service.get_latest_feeding(sensor_id)
    return jsonify(latest_feeding), 200

@app.route('/latest-moisture/<sensor_id>', methods=["GET"])
def get_latest_moisture(sensor_id):
    latest_moisture,timestamp = service.get_latest_moisture(int(sensor_id))
    d = {"moisture": latest_moisture, 'timestamp': timestamp}
    return jsonify(d), 200

@app.route("/event", methods=["POST"])
def save_event():
    body = request.json
    service.save_event(body["id"], body['type'])
    return "ok", 200


@app.route("/health")
def health():
    return "healthly", 200
 
if __name__ == '__main__':
    args = sys.argv[1:]
    
    if (args and "--debug" in args):
        app.run(debug=True)

    app.run()