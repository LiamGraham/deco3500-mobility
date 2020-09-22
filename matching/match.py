from typing import List, Set, Any, Dict
import json
import random
import pprint

from attributes import Attribute, BinaryAttribute, MultiAttribute


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

    def to_dict(self):
        attributes = {name:attr.to_dict() for name, attr in self.attributes.items()}
        return {
            "name": self.name,
            "attributes": attributes
        }

    def __repr__(self):
        return f"User(name={self.name}, attributes={self.attributes})"

    def __str__(self):
        return self.__repr__()

def generate_users(attr_path, size, seed=None):
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


def load_users(user_path):
    with open(user_path, "r") as f:
        data = json.load(f)
    users = []
    for user_name, values in data.items():
        attributes = {}
        for attr_name, category in values.items():
            same = category["same"]
            if category["type"] == "multi":
                value = set(category["value"])
                attribute = MultiAttribute(attr_name, value, same=same)
            else:
                value = category["value"]
                attribute = BinaryAttribute(attr_name, value, same=same)
            attributes[attr_name] = attribute
        users.append(User(user_name, attributes))
    return users


def compute_scores(users):
    scores = {user.name:{} for user in users}
    for i in range(len(users)):
        user1 = users[i]
        for j in range(len(users)):
            if i == j:
                continue
            user2 = users[j]
            score = user1.compare(user2)
            scores[user1.name][user2.name] = score
    return scores


def compute_threshold(scores):
    seen = {}
    total = count = 0
    for name1, values in scores.items():
        for name2, value in values:
            if name2 in seen:
                continue
            total += value
            count += 1
        seen.add(name1)
    mean = total / count
    return mean


def save_users(users, path):
    user_json = []
    for user in users:
        user_json.append(user.to_dict())

    with open(path, "w") as f:
        json.dump(user_json, f, indent=2, separators=(",", ": "))

def save_scores(scores, path):
    with open(path, "w") as f:
        json.dump(scores, f, indent=2, separators=(",", ": "))

if __name__ == "__main__":
    printer = pprint.PrettyPrinter()

    users = generate_users("matching/categories.json", 100, seed=1)
    scores = compute_scores(users)

    save_users(users, "matching/examples/users2.json")
    save_scores(scores, "matching/examples/scores2.json")
