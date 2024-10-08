import time

# Import SPI library (for hardware SPI) and MCP3008 library.
import Adafruit_GPIO.SPI as SPI
import Adafruit_MCP3008
import requests

# Hardware SPI configuration:
SPI_PORT   = 0
SPI_DEVICE = 0
mcp = Adafruit_MCP3008.MCP3008(spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE))

host = 'https://plants-6hne5hahua-ue.a.run.app'
headers = {"Content-Type":"application/json"}

VALID_MCP_INPUTS = [0,2,3,5,7]

# Read all the ADC channel values in a list.
values = [0]*8
for i in range(8):
    # The read_adc function will get the value of the specified channel (0-7).
    if (i in VALID_MCP_INPUTS):
        values[i] = mcp.read_adc(i)
        payload = {"humidity":values[i], "sensor_id": i+1 }
        url = f"{host}/moisture"
        res = requests.post(url, json=payload, headers=headers)

# Print the ADC value
print('| {0:>4} | {1:>4} | {2:>4} | {3:>4} | {4:>4} | {5:>4} | {6:>4} | {7:>4} |'.format(*values))