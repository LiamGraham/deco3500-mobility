from typing import List, Set, Any, Dict
from collections.abc import Iterable

class Attribute:

    def __init__(self, name: str, value: Any, same: bool=True):
        """
        Args:
            name (str): Name of attribute
            value: [description]: Value of attribute (of arbitrary type)
            same (bool, optional): [description]. Defaults to True.
        """
        self.name = name
        self.value = value
        self.same = same

    def _equal(self, condition: bool) -> bool:
        """
        Returns true if the condition is True and self.same is True, or the condition is
        False and self.same is False. Otherwise returns False.

        Args:
            condition ([bool]): Condition to be evaluated

        Returns:
            [bool]: Result of evaluation 
        """
        return not(condition ^ self.same)

    def compare(self, other: "Attribute") -> float:
        """
        Returns a value (match score) corresponding to how similar the given attribute is
        to this attribute.

        Args:
            other ([type]): Attribute to which this attribute will be compared

        Returns:
            float: Match score value between 0 and 1
        """
        raise NotImplementedError()

    def to_dict(self):
        return {
            "name": self.name,
            "same": self.same,
            "value": self.value
        }

    def __repr__(self):
        return f"Attribute(name={self.name}, value={self.value}, same={self.same})"

    def __str__(self):
        return self.__repr__()

class BinaryAttribute(Attribute):
    """
    Attribute which stores a single value. Pairs of attributes are either equal (score
    of 1) or not equal (score of 0).
    """

    def __init__(self, name: str, value: Any, same: bool=True):
        super().__init__(name, value, same=same)
    
    def compare(self, other: Attribute) -> float:
        """
        Returns 1 if self.same is True and the value of this attribute and the given attribute
        are equal, or self.same is False and the value of the two attributes differ.
        Otherwise returns 0.

        Args:
            other (Attribute): Attribute to which this attribute will be compared

        Returns:
            float: Match score between 0 and 1
        """
        return int(self._equal(self.value == other.value))


class MultiAttribute(Attribute):
    """
    Attribute which stores a set of value. 

    Args:
        Attribute ([type]): [description]
    """

    def __init__(self, name: str, value: Set[Any], same: bool=True):
        super().__init__(name, value, same=same)

    def compare(self, other: "MultiAttribute"):
        """
        If self.same is True, the match score is determined by how many elements are
        shared between this attribute and the given attribute (e.g. if all elements are
        shared, score is 1). If self.same is False, the match score is determined by
        how many elements are not shared between the attributes.

        Args:
            other ([MultiAttribute]): MultiAttribute to which this attribute will be compared

        Returns:
            float: Match score between 0 and 1
        """
        if self.same:
            count = len(self.value.union(other.value))
        else:
            count = len(self.value.symmetric_difference(other.value))
        
        score = count / (len(self.value) + len(other.value))
        return score  
    
    def to_dict(self):
        return {
            "name": self.name,
            "same": self.same,
            "value": list(self.value)
        }