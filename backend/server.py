from flask import Flask, request, jsonify
from werkzeug.exceptions import InternalServerError
import os
from firebase_admin import credentials, firestore, initialize_app
from flask_cors import CORS

from match import Entity
from status import StatusCode as Status
from schema import SchemaValidator

class InvalidUsage(Exception):

    def __init__(self, message, status_code=Status.BAD_REQUEST):
        super().__init__(message)
        self.message = message
        self.status_code = status_code

    def to_dict(self):
        return {
            "error": self.message,
            "status": self.status_code,
        }

app = Flask(__name__)
CORS(app)
cred = credentials.Certificate('keys.json')
default_app = initialize_app(cred)
db = firestore.client()
profile_collection = db.collection('profiles')

validator = SchemaValidator("profile", "schema.json")


@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


#@app.errorhandler(InternalServerError)
def handle_internal_error(error):
    original = getattr(error, "original_exception", None)
    status = Status.INTERNAL_SERVER_ERROR
    response = {
        "error": str(original),
        "status": status
    }   
    return response, status


def encapsulate(data):
    return {"data": data}


def success(is_success=True, status=Status.ACCEPTED):
    return {"success": is_success}, status


def profile_exists(username: str) -> bool:
    return profile_collection.document(username).get().exists 


@app.route("/api/profiles", methods=["GET"])
def get_profiles():
    profiles = [doc.to_dict() for doc in profile_collection.stream()]
    return encapsulate(profiles)


@app.route("/api/profiles", methods=["POST"])
def create_profile():
    if not request.is_json:
        raise InvalidUsage("Missing JSON")
    if not validator.is_valid(request.json):
        raise InvalidUsage("JSON structure or values are invalid")
    
    username = request.json["username"]
    data = request.json
    data["saved"] = []
    profile_collection.document(username).set(data)
    return success()


@app.route("/api/profiles/<string:username>", methods=["GET"])
def get_profile(username):
    profile = profile_collection.document(username).get()
    if not profile.exists:
        raise InvalidUsage(f"Profile with username '{username}' does not exist", Status.NOT_FOUND)
    return encapsulate(profile.to_dict())


@app.route("/api/profiles/<string:username>", methods=["DELETE"])
def delete_profile(username):
    reference = profile_collection.document(username)
    if not reference.get().exists:
        raise InvalidUsage(f"Profile with username '{username}' does not exist", Status.NOT_FOUND)        
    reference.delete()
    return success()


@app.route("/api/profiles/<string:username>/matches", methods=["GET"])
def get_matches(username):
    profile = profile_collection.document(username).get()
    if not profile.exists:
        raise InvalidUsage(f"Profile with username '{username}' does not exist", Status.NOT_FOUND)        
    try:
        threshold = float(request.args.get("threshold"))
    except (TypeError, ValueError):
        raise InvalidUsage("Threshold is missing or invalid")
    
    all_profiles = [doc.to_dict() for doc in profile_collection.stream()]

    target_entity = Entity(username, profile.to_dict())
    entities = [Entity(p["username"], p) for p in all_profiles]
    matches = target_entity.get_matches(entities, threshold)

    return encapsulate(matches)


@app.route("/api/profiles/<string:username>/saved", methods=["GET"])
def get_saved(username):
    profile = profile_collection.document(username).get()
    if not profile.exists:
        raise InvalidUsage(f"Profile with username '{username}' does not exist", Status.NOT_FOUND)        
    targets = profile.get("saved")
    profiles = []
    for target in targets:
        profile = profile_collection.document(target).get()
        profiles.append(profile.to_dict())
    return encapsulate(profiles)


@app.route("/api/profiles/<string:username>/saved", methods=["PUT"])
def add_saved(username):
    target = request.args.get("username")
    if not target:
        raise InvalidUsage("Missing 'username' argument")
    if not profile_exists(target):
        raise InvalidUsage(f"Profile with username '{target}' does not exist")
    saved = profile_collection.document(username)
    saved.update({'saved': firestore.ArrayUnion([target])})
    return success()


@app.route("/")
def index():
    return "Welcome to the Cadence API"


port = int(os.environ.get('PORT', 8080))
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=port, debug=True)
