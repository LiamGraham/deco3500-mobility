from typing import List, Set, Any, Dict
import json
import random
import pprint
from attributes import Attribute, BinaryAttribute, MultiAttribute
import json

with open("attributes.json", "r") as f:
    ATTRIBUTES = json.load(f)

class MatchError(Exception):
    pass

class Entity:

    def __init__(self, name, values):
        self.name = name
        self.values = values
        self.attributes = {}
        for name, info in ATTRIBUTES.items():
            same = info["same"]
            value = self.values[name]
            if info["type"] == "binary": 
                self.attributes[name] = BinaryAttribute(name, value, same)
            else:
                self.attributes[name] = MultiAttribute(name, set(value), same)

    def compare(self, other: "Entity") -> float:
        """
        Returns a value (match score) corresponding to how similar the given user is
        to this user.

        Args:
            other ([Entity]): Entity to which this user will be compared

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
    
    def get_matches(self, entities: List["Entity"], threshold: float):
        matches = []
        for entity in entities:
            if entity.name == self.name:
                continue
            score = self.compare(entity)
            if score >= threshold:
                matches.append(entity.name)
        return matches

    def __repr__(self):
        return f"Entity(name={self.name}, attributes={self.attributes})"

    def __str__(self):
        return self.__repr__()


class Matcher:

    def __init__(self, entities):
        self.entities = entities
        self.scores = {}
        self._threshold = 0
        self.match_all()

    def match_all(self):
        self.scores = {user:{} for user in self.entities}
        for i in range(len(self.entities)):
            user1 = self.entities[i]
            for j in range(len(self.entities)):
                if i == j:
                    continue
                user2 = self.entities[j]
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

    def get_score(self, user1: Entity, user2: Entity) -> float:
        """Returns match score for user1 and user2 if a score exists, otherwise 0.

        Args:
            user1 (Entity): First user 
            user2 (Entity): Second user

        Returns:
            float: Match score for user1 and user2 if a score exists, otherwise 0
        """
        if user1 not in self.scores:
            return 0
        return self.scores[user1].get(user2, 0)


def generate_profiles(attr_path: str, size: int, seed: bool=None) -> List[Entity]:
    """Generates a list of random entities of the given size. 

    Args:
        attr_path (str): Path to JSON file storing attribute information
        size (int): Number of entities to be generated
        seed (bool, optional): Seed for random generation.

    Returns:
        List[Entity]: List of random entities
    """
    with open(attr_path, "r") as f:
        categories = json.load(f)
    if seed:
        random.seed(seed)
    entities = []
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
        entities.append(Entity(f"user{i + 1}", attributes))
    return entities
