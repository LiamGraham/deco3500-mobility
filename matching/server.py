from typing import List, Set, Any, Dict
import json
import random
import pprint
from flask import Flask
from flask_restful import Resource, Api, reqparse
from tinydb import TinyDB, Query

from attributes import Attribute, BinaryAttribute, MultiAttribute

app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('task')

db = TinyDB("db.json")
profiles = db.table("profiles")
matches = db.table("matches")

class MatchError(Exception):
    pass

class User:

    def __init__(self, name, attributes: Dict[str, Attribute]):
        self.name = name
        self.attributes = attributes

    def compare(self, other: "User") -> float:
        """
        Returns a value (match score) corresponding to how similar the given user is
        to this user.

        Args:
            other ([User]): User to which this user will be compared

        Returns:
            float: Match score value between 0 and 1
        """
        if len(self.attributes) != len(other.attributes):
            raise ValueError("Lengths of attributes lists differ")
        total = 0
        for name, attr in self.attributes.items():
            other_attr = other.attributes.get(name)
            if not other_attr:
                raise ValueError(f"{name} is not an attribute of the given user")
            total += attr.compare(other.attributes[name])
        score = total / len(self.attributes) 
        return score

    def __repr__(self):
        return f"User(name={self.name}, attributes={self.attributes})"

    def __str__(self):
        return self.__repr__()


class Matcher:

    def __init__(self, users):
        self.users = users
        self.scores = {}
        self._threshold = 0
        self.match_all()

    def match_all(self):
        self.scores = {user:{} for user in users}
        for i in range(len(users)):
            user1 = users[i]
            for j in range(len(users)):
                if i == j:
                    continue
                user2 = users[j]
                score = user1.compare(user2)
                self.scores[user1][user2] = score
        self._compute_threshold()

    def _compute_threshold(self):
        all_values = []
        seen = set()
        for user1, values in self.scores.items():
            for user2, value in values.items():
                if user2 in seen:
                    continue
                all_values.append(value)
            seen.add(user1)
        all_values.sort(reverse=True)
        upper = all_values[:len(all_values) // 2]
        self._threshold = upper[len(upper) // 2]

    def get_matches(self, user):
        if user not in self.scores:
            return []
        matches = []
        scores = self.scores[user]
        for candidate, score in scores.items():
            if score > self._threshold:
                matches.append(candidate)
        return matches

    def get_score(self, user1: User, user2: User) -> float:
        """Returns match score for user1 and user2 if a score exists, otherwise 0.

        Args:
            user1 (User): First user 
            user2 (User): Second user

        Returns:
            float: Match score for user1 and user2 if a score exists, otherwise 0
        """
        if user1 not in self.scores:
            return 0
        return self.scores[user1].get(user2, 0)

class Profile(Resource):
    
    def get(self, profile_id):
        return {"test":"test"}

    def post(self, profile_id):
        pass

    def put(self, profile_id):
        pass

class ProfileList(Resource):
    
    def get(self):
        pass

class MatchList(Resource):
    
    def get(self, profile_id):
        pass


def generate_users(attr_path: str, size: int, seed: bool=None) -> List[User]:
    """Generates a list of random users of the given size. 

    Args:
        attr_path (str): Path to JSON file storing attribute information
        size (int): Number of users to be generated
        seed (bool, optional): Seed for random generation.

    Returns:
        List[User]: List of random users
    """
    with open(attr_path, "r") as f:
        categories = json.load(f)
    if seed:
        random.seed(seed)
    users = []
    for i in range(size):
        attributes = {}
        for name, category in categories.items():
            candidates = category["values"]
            same = category["same"]
            if category["type"] == "multi":
                size = random.randrange(1, (len(candidates) // 2) + 1)
                value = set(random.sample(candidates, size))
                attribute = MultiAttribute(name, value, same=same)
            else:
                value = random.choice(candidates)
                attribute = BinaryAttribute(name, value, same=same)
            attributes[name] = attribute
        users.append(User(f"user{i + 1}", attributes))
    return users


api.add_resource(ProfileList, '/profiles')
api.add_resource(Profile, '/profiles/<string:profile_id>')
api.add_resource(MatchList, '/profiles/<string:profile_id>/matches')

if __name__ == '__main__':
    app.run(debug=True)