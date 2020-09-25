from typing import List, Set, Any, Dict
import json
import random
import pprint

from attributes import Attribute, BinaryAttribute, MultiAttribute

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


class MatchNode:

    def __init__(self, user: User, matches: List["MatchNode"]=None):
        self.user = user
        if matches:
            self.matches = matches
        else:
            self.matches = []

    def add_match(self, match: "MatchNode"):
        if match not in self.matches:
            self.matches.append(match)

    def add_matches(self, matches: List["MatchNode"]):
        for match in matches:
            self.add_match(match)

    def __repr__(self):
        return f"MatchNode(user={self.user.name}, matches={[user.name for user in self.matches]})"

    def __str__(self):
        return self.__repr__()

def generate_match_nodes(matcher):
    nodes = {}
    root = matcher.users[0]

    for user in users:
        if user not in nodes:
            node = MatchNode(user)
            nodes[user] = node
        else:
            node = nodes[user]

        matches = matcher.get_matches(user)
        node.add_matches(matches)
    return nodes

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


def load_users(user_path: str) -> List[User]:
    """Loads User objects from JSON file at the given path.

    Args:
        user_path (str): Path to user JSON file

    Returns:
        List[User]: List of loaded User objects
    """
    with open(user_path, "r") as f:
        data = json.load(f)
    users = []
    for user_data in data:
        user_name = user_data["name"]
        attributes = {}
        for attr_name, category in user_data["attributes"].items():
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


def compute_scores(users) -> Dict[str, Dict[str, float]]:
    """Returns a dictionary of match scores for each pair of users. 

    Args:
        users (List[User]): Users for which match scores will be computed

    Returns:
        Dict[str, Dict[str, float]]: Match scores for each pair of users
    """
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

    users = generate_users("matching/categories.json", 10, seed=1)
    #users = load_users("matching/examples/users1.json")

    print("Computing match scores")    
    matcher = Matcher(users)
    #printer.pprint(users)
    #printer.pprint(matcher.scores)

    print("Generating match nodes")
    nodes = generate_match_nodes(matcher)
    printer.pprint(list(nodes.values()))
    #save_users(users, "matching/examples/users2.json")
    #save_scores(scores, "matching/examples/scores2.json")
