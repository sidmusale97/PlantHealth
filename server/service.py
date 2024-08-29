from redis import Redis
import logging
from db import PlantsDB
from datetime import datetime, timedelta
import threading
import time
from statistics import fmean
from enum import Enum

logger = logging.getLogger(__name__)
redis = Redis(
  host='redis-18401.c91.us-east-1-3.ec2.redns.redis-cloud.com',
  port=18401,
  password='zYPyG5QVcTxOUZDKcig02aex4V1Kobu3', decode_responses=True)

MOSITURE_DATA_TOPIC = "moistures"
MOISTURE_KEY_FORMAT = "moisture_data_%d"

LATEST_WATERING_KEY = "latest_watering_%s"
LATEST_FEEDING_KEY = "latest_feeding_%s"

WET = 300
DRY = 550

def normalize_moisture(moisture : int) -> float:
    if (int(moisture) < WET):
        return 0
    latest_humidity = round(1 - (int(moisture) - WET)/(DRY-WET),2)
    return latest_humidity

EVENT_TYPES = {"FEEDING": 1, "WATERING": 2}

class Service:

    def __init__(self):
        self.database = PlantsDB()
                    
    def process_moisture_data(self, humidity, sensor_id):
        try:
            key = MOISTURE_KEY_FORMAT % sensor_id
            now = datetime.now()
            delta = timedelta(weeks=7)
            past = now - delta
            member =  "%d:%d" % (humidity,now.timestamp()) 
            redis.zadd(key, {member:now.timestamp()})
            redis.zremrangebyscore(key, 0, past.timestamp())
            #recent_moistures = [float(x.split(':')[0]) for x in redis.zrange(key, 0, -1)]
            #avg_moisture = fmean(recent_moistures)

        except Exception as e:
            logging.error(e)
    
    def get_latest_moisture(self, sensor_id):
        try:
            latest_humidity, timestamp = -1,0 
            key = MOISTURE_KEY_FORMAT % sensor_id

            moistures = redis.zrange(key, -1, -1)

            if (moistures):
                latest_moisture, timestamp = moistures[0].split(':')
                latest_humidity = normalize_moisture(latest_moisture)
                
            return latest_humidity, timestamp
        except RuntimeError as e:
            logging.error(e)
            raise e
        
    def get_moisture(self, sensor_id, fromDate, toDate):
        try:
            key = key = MOISTURE_KEY_FORMAT % sensor_id
            moistures = redis.zrangebyscore(key, fromDate, toDate)

            x,y = [],[]

            for m in moistures:
                moisture, timestamp = m.split(':')
                x.append(timestamp)
                y.append(normalize_moisture(moisture))

            return {"timestamps": x, "humidities": y}
        except Exception as e:
            logging.error(e)
            raise e


    def save_event(self,sensor_id, etype):
        #event_type = EVENT_TYPES[type]
        #self.database.save_event(sensor_id, event_type)
        print(etype == "WATERING")
        try:
            key = LATEST_WATERING_KEY % sensor_id if "WATERING" == etype else LATEST_FEEDING_KEY % sensor_id
            redis.set(key, int(datetime.now().timestamp()))
        except Exception as e:
            logging.error(e)
            raise e
            

    def get_latest_watering(self, sensor_id):
        try:
            print(sensor_id)
            key = LATEST_WATERING_KEY % sensor_id
            return redis.get(key)
        except Exception as e:
            logging.error(e)
            raise e

        #return self.database.get_latest_watering(sensor_id)

    def get_latest_feeding(self, sensor_id):
        #return self.database.get_latest_feeding(sensor_id)
        try:
            key = LATEST_FEEDING_KEY % sensor_id
            return redis.get(key)
        except Exception as e:
            logging.error(e)
        
       
    def alert(self):
        #play beeping
        pass