import sqlite3
import time
import logging


logger = logging.getLogger(__name__)

class PlantsDB:
    def __init__(self) -> None:
        pass
    
    def save_event(self, sensor_id, type):
        with sqlite3.connect("plants.db") as connection:
            cursor = connection.cursor()
            timestamp = time.time()
            query = f'insert into events values ({timestamp},{sensor_id},{type})'
            try:
                cursor.execute(query)
                connection.commit()
            except Exception as e:
                logger.error(e)
    
    def get_latest_watering(self, sensor_id):
        with sqlite3.connect("plants.db") as connection:
            cursor = connection.cursor()
            query = f"select timestamp from events where sensor_id = {sensor_id} and type = 1 order by timestamp desc limit 1" 
            try:
                cursor.execute(query)
                row = cursor.fetchone()
                return row
            except Exception as e:
                logger.error(e)

    def get_latest_feeding(self, sensor_id):
        with sqlite3.connect("plants.db") as connection:
            cursor = connection.cursor()
            query = f"select timestamp from events where sensor_id = {sensor_id} and type = 2 order by timestamp desc limit 1" 
            try:
                cursor.execute(query)
                row = cursor.fetchone()
                return row
            except Exception as e:
                logger.error(e)