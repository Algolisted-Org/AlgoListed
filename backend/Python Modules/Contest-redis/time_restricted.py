from flask import Flask
from datetime import datetime

app = Flask(__name__)

def is_contest_time():
    # Get the current time in Coordinated Universal Time (UTC)
    current_time_in_utc = datetime.utcnow()

    # Check if it's Sunday and between 2:30 AM and 4:00 AM UTC
    if current_time_in_utc.weekday() == 6:  # Sunday is represented as 6 in Python
        if (current_time_in_utc.hour == 13 and current_time_in_utc.minute >= 30) or \
           (current_time_in_utc.hour == 14) or \
           (current_time_in_utc.hour == 15 and current_time_in_utc.minute == 0):
            return True

    return False

@app.route('/')
def contest_status():
    if is_contest_time():
        return "Contest is running."
    else:
        return "Contest is not running."

if __name__ == '__main__':
    app.run()
