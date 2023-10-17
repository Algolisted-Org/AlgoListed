import redis
from flask import Flask, request, jsonify
import requests
import json
# Make Redis
redis_cache = redis.Redis(host='localhost', port=6379, db=0)

# Make Flask app
app = Flask(__name__)

@app.route('/get-prediction', methods=['GET'])
def get_prediction():
    weekly_contest = request.args.get('weekly_contest', 'weekly-contest-367')
    username = request.args.get('username', 'sahapriyam')
    
    
    cache_key = f'{weekly_contest}-{username}'
    
   
    cached_data = redis_cache.get(cache_key)
    
    if cached_data:
        
        cached_data = json.loads(cached_data)
        return jsonify({'source': 'Redis', 'data': cached_data})
    else:
        api_url = f'https://lccn.lbao.site/api/v1/contest-records/user?contest_name={weekly_contest}&username={username}&archived=false'

        response = requests.get(api_url)

        if response.status_code == 200:
            data = response.json()
            redis_cache.setex(cache_key, 3600, json.dumps(data))
            return jsonify({'source': 'API', 'data': data})
        else:
            return jsonify({'source': 'Error', 'error': 'Failed to fetch data from the API'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
