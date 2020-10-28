import json

class SchemaValidator:
    TYPES = {
        "string": str, 
        "int": int, 
        "list": list,
    }

    def __init__(self, name: str, path: str):
        with open(path, "r") as f:
            self.schema = json.load(f)[name]

    def _is_valid_type(self, value: str, category: str):
        return isinstance(value, self.TYPES[category])

    def is_valid(self, obj: dict) -> bool:
        for attr, info in self.schema.items():
            # Check if any required attributes are missing
            if info["required"] and attr not in obj:
                print(attr, "is missing")
                return False
            # Check if type is valid
            if not self._is_valid_type(obj[attr], info["type"]):
                print(f"Type of {attr} is invalid")
                return False
        for attr in obj:
            # Check if any invalid attributes are present
            if attr not in self.schema:
                print(f"Invalid attr {attr} is present")
                return False
        return True