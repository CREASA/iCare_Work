from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

from mxu_er import predict_er
from rbe_ex import predict_ex
from lf_ip import predict_ip
from gpt3 import gpt3
from get_sp import sp

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route('/get_scores', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_scores():
    """
    Get scores for the given data.
    """
    data = request.json

    prompt = f"""Seeker post: {data['sp']}<> Response post: {data['rp']}"""

    er = predict_er(prompt)
    ex = predict_ex(prompt)
    ip = predict_ip(prompt)

    reply = generate_response(er, ex, ip, data['sp'], data['rp'])
    response = {'er': er, 'ex': ex, 'ip': ip, 'reply': reply}

    print()
    print(response)
    print()

    return jsonify(response)


@app.route('/get_sp', methods=['POST'])
def get_sp_route():
    """
    Get sp value for the given data.
    """
    data = request.json
    return jsonify({'sp': sp(data['n'])})


def generate_response(er, ex, ip, rp, sp):
    """
    Generate response based on the scores.
    """
    response = gpt3(er, ex, ip, rp, sp)

    return response


if __name__ == '__main__':
    app.run()
