from flask import Flask, render_template, current_app, jsonify
from helpers import load_json


app = Flask(__name__)
app.dataset = load_json('germany.json')


@app.route('/api/get_delta/<aggregation>/<metric_left>/<metric_right>', methods=['GET'])
def get_delta(aggregation, metric_left, metric_right):
    df = current_app.dataset

    # groupby aggregation metric
    df = df.groupby(aggregation, sort=True)[[
        metric_left, metric_right]].sum().reset_index()

    # calculate total of metrics
    df['total'] = df[metric_left] + df[metric_right]

    # calculate top N values
    df = df.nlargest(10, columns=['total'])

    # calculate delta
    df['delta'] = df[metric_left] - df[metric_right]

    # sort by delta
    df = df.sort_values('delta', ascending=False)

    # clean text
    df[aggregation] = df[aggregation].str[:20]

    d = df.to_json(orient='records')
    return jsonify(d)


@app.route('/api/<aggregation>/<metric>', methods=['GET'])
def get_data(aggregation, metric):
    df = current_app.dataset

    df = df.groupby(aggregation, sort=True)[
        metric].sum().nlargest(10).reset_index(name=metric)

    d = df.to_json(orient='records')
    return jsonify(d)


@app.route('/api/timeseries', methods=['GET'])
def get_timeseries():

    df = current_app.dataset

    df = df.groupby(['country', 'year'], sort=True)[[
        'import_tusd', 'export_tusd']].sum().reset_index()

    print(df.country.unique().tolist())

    d = df.to_json(orient='records')
    return jsonify(d)


@app.route('/')
def index():
    return render_template('index.jinja')


if __name__ == '__main__':
    app.run(debug=True)
