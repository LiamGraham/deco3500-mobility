# Cadence API

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