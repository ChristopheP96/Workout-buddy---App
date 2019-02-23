# Workout buddy

## Description

Share your passion for sports with other users and get to know other people like you
 
## User Stories

- **Front page** - As a user I want to be able to access the frontpage so that I see what the app is about and login and sign up.


- **Sign up** - As a user I want to sign up on the web page so that I can see all the events that I could attend and once sign up the user will get an email notification.

- **Login** - As a user I want to be able to log in on the web page so that I can have access to my profile.


- **Homepage** - Here the user will get a welcome message, available nav bar, list of sports and the user can edit his profile and add his preferences.

- **User profile** - As a user you will have a profile with:

  1. Profile picture
  2. Brief description
  3. List of favorit sports
  4. List of workouts created by the user
  5. List workouts the user is attending

- **Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account

- **Activity list** - As a user I want to see all the events available so that I can choose which ones I want to attend

- **Events create** - As a user I want to be able to create a workout event so that I can let other people join the event.

- **Events detail** - As a user I want to see the workout details and attendee list of one event so that I can decide if I want to attend

  1. Sport
  2. Meeting point.
  3. Date.
  4. Time frame.
  5. Difficulty level.
  6. General comments.
  7. Creator.
  8. Current attendees.
 
- **Attend work** - As a user I want to be able join to workouts so that the organizers can count me in.

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.

- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.

## Backlog

Event confirmation
- When an user applied to an event, the event is put on hold
- The creator of the vent has 2 hours to confirm or deny access to the attendee.
- Confirmation/cancellation/denied/amendments email to the attendees.

Geo Location
- add geo-location to events when creating
- show event in a map in event detail page
- show all events in a map in the event list page

- Add workouts to Google calendar.

Profiles:
- see other users profile

Homepage:
- ...

## ROUTES:  Ejemplo de tabla de cómo debe quedar

| Method      | Description | Test Text     |
| :---        |    :----:   |          :---:|
| GET         | /           | Renders the homepage   |
| GET         | /auth/signup|redirects to / if user logged in 
| POST        | /auth/signup|redirects to / if user logged in|

- GET / 
  - renders the homepage
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password
  - validation
    - fields not empty
    - user not exists
  - create user with encrypted password
  - store user in session
  - redirect to /events
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password
  - validation
    - fields not empty
    - user exists
    - passdword matches
  - store user in session
  - redirect to /events
- POST /auth/logout
  - body: (empty)
  - redirect to /events

- GET /events
  - renders the event list + the create form
- POST /events/create 
  - redirects to / if user is anonymous
  - body: 
    - name
    - date
    - location
    - description
  - validation
    - fields not empty
  - create event
  - redirect to event details
- GET /events/:id
  - validation
    - id is valid (next to 404)
    - id exists (next to 404)
  - renders the event detail page
  - includes the list of attendees
  - attend button if user not attending yet
- POST /events/:id/attend 
  - redirects to / if user is anonymous
  - validation
    - id is valid (next to 404)
    - id exists (next to 404)
  - body: (empty - the user is already stored in the session)
  - store in attendees if not there yet
  - redirect to event details

## Models

User model
 
```
username: String
password: String
```

Event model

```
owner: ObjectId<User>
name: String
description: String
date: Date
location: String
attendees: [ObjectId<User>]
``` 

## Links

### Trello

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)