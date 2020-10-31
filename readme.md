# Cadence

Cadence is a novel musical collaboration platform which intelligently guides users towards music collaborations in a digital, asynchronous setting.

## Contents

This repository contains the frontend and backend directory folders for each of the respective files for the prototype.

## Prototype Website

Automatic deployments have been set up, so whenever you push to master branch it will automatically deploy to [production](https://deco3500-cadence.web.app).

Alternatively you can manually deploy with (in the frontend or backend repositories)

1. ```firebase deploy```

The [deployed website](http://deco3500-cadence.web.app/) along with [the api documentation](https://www.notion.so/Cadence-API-Documentation-d4b7c3722dc346c68ac99edd8ffb0870) and [api base url](https://cadence-ycbhlxrlga-uc.a.run.app/) are hosted on Firebase and notion respectively.

## Refer to the readme's in the frontend and backend repositories for more details

# Cadence Frontend

## File structure

- src
    - components: contains main components for building the app
    - views: contains the pages in the website, which use components
    - graph: contains widgets used for displaying the explore graph
    - App.js/index.js: the top level component containing the entire website. index.js renders App.js
    - App.css/index.css: top level css files for styling
- public: contains files such as images, and txt files for displaying on the website
    - index.html: the websites main index file
- cloudbuild.yaml
    - steps for automatic deployment
- firebase.json/.firebase.rc: config files for connecting to deployment
- package.json/package-lock.json: project dependencies
- README.md: frontend readme details
- node_modules: generated after running ```npm install```
- build: production build files generated after running ```npm run build```

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs the project dependencies into a folder called node_modules and updates the package-lock.json file.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### Deployment

Automatic deployments have been set up, so whenever you push to master branch it will automatically deploy to [production](https://deco3500-cadence.web.app).

Alternatively you can manually deploy with

1. ```npm run build```
2. ```firebase deploy```

# Cadence Backend API

The Cadence API is implemented using:

- Flask 
- Flask CORS
- Firestore

server.py implements each of the endpoints of the API using Flask. match.py implements to computation of the match scores, in combination with attributes.py. 

## `GET` /api/profiles

Returns all profiles.

## Body

None

## Arguments

None

## Example

`GET https://cadence-ycbhlxrlga-uc.a.run.app/api/profiles`

```json
{
    "data": [
        {
            "bio": "Feelin kinda blue",
            "experience": "Expert",
            "firstName": "Miles",
            "genres": [
                "jazz"
            ],
            "lastName": "Davis",
            "saved": [
                "mosesboyd"
            ],
            "skills": [
                "trumpet"
            ],
            "username": "milesdavis"
        },
        {
            "bio": "Music",
            "experience": "Expert",
            "firstName": "Moses",
            "genres": [
                "jazz",
                "hip hop"
            ],
            "lastName": "Boyd",
            "saved": [],
            "skills": [
                "drums",
                "production"
            ],
            "username": "mosesboyd"
        }
    ]
}
```

## `POST` /api/profiles

Creates a new user profile.

## Body

- `username`: Username identifying the user
- `firstName`: First name of user
- `lastName`: Last name of user
- `bio`: Short description of user
- `experience`: Level of experience of user
- `genres`: List of genres in which user makes music
- `skills`: List of musical skills of user

## Arguments

None

## Example

`POST https://cadence-ycbhlxrlga-uc.a.run.app/api/profiles`

```json
{
    "success": true 
}
```

## `GET` /api/profiles/<username>

Creates the profile information for the given username.

## Body

None

## Arguments

- `username`: Username of user for which profile will be retrieved

## Example

`GET https://cadence-ycbhlxrlga-uc.a.run.app/api/profiles/milesdavis`

```json
{
    "data": {
        "bio": "Feelin kinda blue",
        "experience": "Expert",
        "firstName": "Miles",
        "genres": [
            "jazz"
        ],
        "lastName": "Davis",
        "saved": [
            "mosesboyd"
        ],
        "skills": [
            "trumpet"
        ],
        "username": "milesdavis"
    }
}
```

## `DELETE` /api/profiles/<username>

Deletes the profile with the given username.

## Body

None

## Arguments

- `username`: Username of user for which profile will be retrieved

## Example

`DELETE https://cadence-ycbhlxrlga-uc.a.run.app/api/profiles/milesdavis`

```json
{
    "success": true 
}
```

## `GET` /api/profiles/<username>/saved

Returns the profiles saved by the user with the given username.

## Body

None

## Arguments

- `username`: Username of user for which saved profiles will be retrieved

## Example

`GET https://cadence-ycbhlxrlga-uc.a.run.app/api/profiles/milesdavis/saved`

```json
{
    "data": [
        {
            "bio": "Music",
            "experience": "Expert",
            "firstName": "Moses",
            "genres": [
                "jazz",
                "hip hop"
            ],
            "lastName": "Boyd",
            "saved": [],
            "skills": [
                "drums",
                "production"
            ],
            "username": "mosesboyd"
        }
    ]
}
```

## `PUT` /api/profiles/<username>/saved

Adds a new saved profile to the user with the given username.

## Body

- `username`: Username of profile to be saved

## Arguments

- `username`: Username of user for which save is being made

## Example

`GET https://cadence-ycbhlxrlga-uc.a.run.app/api/profiles/milesdavis/saved`

```json
{
    "success": true
}
```

## `GET` /api/profiles/<username>/matches

Returns the usernames of matches for the given profile that exceed the specified threshold.

## Body

None

## Arguments

- `username`: Username of user for which matches will be retrieved
- `threshold`: Threshold for matches

## Example

`GET https://cadence-ycbhlxrlga-uc.a.run.app/api/profiles/milesdavis/matches?threshold=0.5` 

```json
{
    "data": [
        "mosesboyd"
    ]
}
```

## Deployment

The [deployed website](http://deco3500-cadence.web.app/) and [API](https://cadence-ycbhlxrlga-uc.a.run.app/) are hosted on Firebase. 

## API

The API documentation is available in the backend README.md. 
