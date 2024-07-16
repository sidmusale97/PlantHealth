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
THRESHOLD = 300

EVENT_TYPES = {"FEEDING": 1, "WATERING": 2}

class Service:

    def __init__(self):
        self.database = PlantsDB()
                    
    def process_moisture_data(self, humidity, sensor_id):
        try:
            key = MOISTURE_KEY_FORMAT % sensor_id
            now = datetime.now()
            delta = timedelta(minutes=30)
            past = now - delta
            member =  "%d:%d" % (humidity,now.timestamp()) 
            redis.zadd(key, {member:now.timestamp()})
            redis.zremrangebyscore(key, 0, past.timestamp())
            recent_moistures = [float(x.split(':')[0]) for x in redis.zrange(key, 0, -1)]
            avg_moisture = fmean(recent_moistures)
            if (avg_moisture < THRESHOLD):
                self.alert()

        except Exception as e:
            logging.error(e)
    
    def get_latest_moisture(self, sensor_id):
        try:
            key = MOISTURE_KEY_FORMAT % sensor_id
            latest_moisture, timestamp = redis.zrange(key, -1, -1)[0].split(':')
            
            return latest_moisture, timestamp
        except RuntimeError as e:
            logging.error(e)

    def save_event(self,sensor_id, type):
        event_type = EVENT_TYPES[type]
        self.database.save_event(sensor_id, event_type)

    def get_latest_watering(self, sensor_id):
        return self.database.get_latest_watering(sensor_id)

    def get_latest_feeding(self, sensor_id):
        return self.database.get_latest_feeding(sensor_id)
    

    def alert(self):
        #play beeping
        pass