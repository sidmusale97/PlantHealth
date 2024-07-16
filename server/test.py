import requests

payload = {"humidity":100, "sensor_id":1}
headers = {"Content-Type": "application/json"}
res = requests.post("http://localhost:5000/moisture", json=payload, headers=headers)
print(res.content)