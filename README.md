# Adorable Turtles API 🐢

Welcome to the Adorable Turtles API! This API provides access to a collection of data about adorable turtles, including their characteristics, habitats, abilities, and more. It's perfect for educational projects, games, or any application that needs data about these fascinating reptiles.

## Table of Contents

* [Base API URL](#base-api-url)
* [Available Endpoints](#available-endpoints)
    * [GET /turtles](#get-turtles)
    * [GET /turtles/:id](#get-turtlesid)
    * [Filters](#filters)
* [Example Turtle Object](#example-turtle-object)
* [Deployment](#deployment)
* [Contributions](#contributions)
* [License](#license)

---

## Base API URL

The base URL for all requests is:

`https://adorable-turtles-api.onrender.com`

## Available Endpoints

### GET /turtles

* **Description:** Retrieves a list of all available turtles.
* **URL:** `/turtles`
* **Method:** `GET`
* **Example Request:**
    ```
    GET [https://adorable-turtles-api.onrender.com/turtles](https://adorable-turtles-api.onrender.com/turtles)
    ```
* **Example Response (JSON Format):**
    ```json
    [
      {
        "turtleId": 1,
        "name": "Coralia",
        "nickname": "Cora",
        "species": "Sea Turtle",
        "ageYears": 150,
        "personalityTraits": ["Wise", "Patient", "Protective"],
        "specialAbility": "Coral Growth",
        "realm": "Deep Sea Kingdom",
        "image_url": "[https://res.cloudinary.com/drfnsvdqm/image/upload/adorable-turtles-api/turtle-01-cora.jpg](https://res.cloudinary.com/drfnsvdqm/image/upload/adorable-turtles-api/turtle-01-cora.jpg)",
        "createdAt": "2023-07-21T01:00:00.000Z",
        "updatedAt": "2023-07-21T01:00:00.000Z",
        "__v": 0
      },
      // ... more turtle objects
    ]
    ```

### GET /turtles/:id

* **Description:** Retrieves the details of a specific turtle by its `turtleId`.
* **URL:** `/turtles/:id` (replace `:id` with the actual `turtleId`)
* **Method:** `GET`
* **Example Request:**
    ```
    GET [https://adorable-turtles-api.onrender.com/turtles/5](https://adorable-turtles-api.onrender.com/turtles/5)
    ```
* **Example Response (JSON Format for a single turtle):**
    ```json
    {
      "turtleId": 5,
      "name": "Aero",
      "nickname": "Cloud-Walker",
      "species": "Sky Turtle",
      "ageYears": 90,
      "personalityTraits": ["Dreamy", "Free-spirited", "Optimistic"],
      "specialAbility": "Flight (via shell manipulation)",
      "realm": "Golden Sky",
      "image_url": "[https://res.cloudinary.com/drfnsvdqm/image/upload/adorable-turtles-api/turtle-05-cloud-walker.jpg](https://res.cloudinary.com/drfnsvdqm/image/upload/adorable-turtles-api/turtle-05-cloud-walker.jpg)",
      "createdAt": "2023-07-21T01:00:00.000Z",
      "updatedAt": "2023-07-21T01:00:00.000Z",
      "__v": 0
    }
    ```
    * **Errors:** If the `id` is not found, the API will return a `404 Not Found` status and an error message.

### Filters

You can apply various filters to the `GET /turtles` route to refine your results. Separate multiple values for the same parameter with commas (`,`).

* **By Name (`name`):** Searches for turtles by a partial or complete name.
    * Example: `GET https://adorable-turtles-api.onrender.com/turtles?name=Coralia`
    * Example: `GET https://adorable-turtles-api.onrender.com/turtles?name=shell` (will search for "SparkleShell", "Brightshell", etc.)

* **By Species (`species`):** Filters by the exact species of the turtle.
    * Example: `GET https://adorable-turtles-api.onrender.com/turtles?species=Sea Turtle`

* **By Realm (`realm`):** Filters by the realm or habitat.
    * Example: `GET https://adorable-turtles-api.onrender.com/turtles?realm=Forest Canopy`

* **By Age Range (`ageYears[gte]`, `ageYears[lte]`):** Filters by minimum (`gte`) and/