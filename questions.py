import csv
import json
import os.path

import random
from flask import Flask
from flask_cors import CORS

USED_FILENAME = "used.json"

app = Flask(__name__)
CORS(app)


def load_questions():
    with open("questions.csv") as csvfile:
        reader = csv.DictReader(csvfile)
        questions = list(reader)
        for i, q in enumerate(questions):
            questions[i]["id"] = i
        return questions


def load_used():
    return json.load(open(USED_FILENAME))


def mark_used(i):
    used = load_used()
    used.append(i)
    json.dump(used, open(USED_FILENAME, "w"))


def filter_used(questions):
    used = set(load_used())
    return [i for i in questions if i["id"] not in used]


@app.route("/question", methods=["GET"])
def question():
    if not os.path.exists(USED_FILENAME):
        json.dump([], open(USED_FILENAME, "w"))

    questions = filter_used(load_questions())
    print(f"questions left {len(questions)}")
    random.shuffle(questions)
    q = questions.pop(0)
    mark_used(q["id"])
    return json.dumps({"question": q["question"], "answer": q["answer"]})
