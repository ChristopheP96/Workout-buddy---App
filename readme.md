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
- see other users profile.

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
- GET /signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST/signup
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
  - redirect to /user/home
- GET/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST/login
  - redirects to / if user logged in
  - body:
    - username
    - password
  - validation
    - fields not empty
    - user exists
    - passdword matches
  - store user in session
  - redirect to /user/home
- POST/logout
  - body: (empty)
  - redirect to /

- GET /user/home

  1.If no profile set
  - renders the sport list + the update profile(mandatory)

  2.If profile
    - renders the sport list  
  
- GET /user/myprofile
  - renders view of the user's profile content

- GET /user/myprofile/:id/update
  - render view to update information
- POST/user/myprofile/:id/update
    - picture:
    - name:
    - favourite sports:
    - who am I:
  - redirect to /user/myprofile 

- GET /user/myprofile/:id/delete
- POST /user/myprofile/:id/delete
  - redirect to /

- GET /user/Sports
    - renders list of sports available in the app  

- GET /user/workouts 
    - renders list of workouts created by the user.  

- GET /user/workouts/create
  - renders view with form.
- POST /user/workouts/create 
    - activity:
    - meeting point :
    - date:
    - timeframe:
    - difficulty:
    - comment:
  - redirect to /user/workouts 

- GET /user/workouts/:id/update
- POST /user/workouts/:id/update
    - activity:
    - meeting point :
    - date:
    - timeframe:
    - difficulty:
    - comment:
  - redirect to /user/workouts 

- GET /user/workouts/:id/delete
- POST /user/workouts/:id/delete
  - redirect to user/workouts


- GET /user/Sports/workouts
  - renders view of all created workouts in that sport

## Models

User model

All these fields are required

```
username: String
password: String
```

Workout model

All these fields are required

```
owner: ObjectId<User>
activity: String
meeting point: String
date: Date
time frame: Number
creator: [ObjectId<User>]
attendees: [ObjectId<User>]
sport: SportId<Sport>
``` 
User profile model

All these fields are required

```
owner: ObjectId<User>
picture: String
name: String
description: String
favourite sport: String

``` 
Sport model
```
name: String
```

## Links

### Trello

[Link to your trello board](https://trello.com) 

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)