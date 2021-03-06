[Premise](#premise "premise") - [Brief](#brief "brief") - [Approach](#approach "approach") - [Technologies](#technologies-used "technologies") - [Features](#features "features") - [Challenges](#challenges "challenges") - [Successes](#successes "successes") - [Improvements](#improvements "improvements") - [Diveboard](https://dive-board.herokuapp.com/ "Diveboard")
# GA WDI Project 4 - Diveboard
<img src="https://i.imgur.com/dIWTVDp.jpg" alt="diveboard landing page">

## Premise
Diveboard is a solution to the problem of recruitment in the dive industry.  The currently dominant job sites for divers have few features and poor UX, Diveboard offers instructors and dive centers a better altnernative by enabling them to limit their job searches/applicants to only those that are suitable for them.

## Brief
The final WDI project our brief was to create a MERN stack app.  Requirements included RESTful web architecture, user authentication and a test suite.

## Approach
<img src="https://i.imgur.com/lRxwVxD.jpg" alt="diveboard trello and wireframes">

My approach to working on Diveboard was highly structured.  Initially I commited significant time to developing a comprehensive Trello board and wireframes that provided clear objectives and direction for the project.

Working on the back end I practiced TDD, producing a suite of 61 API tests using Mocha and Chai.  Once the full API was built and all tests were passing then I moved on to the React app.

On the front end I built out the structure and styling simultaneously.  I focused on individual pathways though the app one at a time as outlined in the Trello board and attempted to be as reductive as possible with each component to best make use of React.  Specific pathways were also design mobile-first, in line with their most likely use-case.

## Technologies used
* HTML5
* CSS, **Bootstrap**, SCSS, Styled-Components
* JavaScript, **React**, Express, **Node.JS**, **Mongoose ODM**, **bcrypt**, **Mocha**, **Chai**
* Other: MondoDB, Webpack, Yarn

## Features

<img src="https://i.imgur.com/QkM0jnM.png" alt="diveboard mobile pages">
Diveboard's features include a GoogleMaps component with contextual markers, numerous data filtering options, two types of user accounts with different permissions, a direct messaging system between instructors and centers (accessible only through open jobs), a large quantity of referenced data use, Facebook OAuth and responsive design.

## Challenges
Some of the key challenges with Diveboard stemmed from managing the different user account types.  Initially I was conflicted over whether to employ a single or multiple models to allow for the different account types, I opted for a single account type to ensure users did not require seperate log in forms however this led to other complications.

One of the challenges that arose from this was managing the different access levels to the app, my solution to this was to create a closure in the back-end which would distinguish between the different kinds of secure route in the app.
```
function userRoute(bool) {

  return function secureRoute(req, res, next) {
    if(!req.headers.authorization) return res.unauthorized();

    const token = req.headers.authorization.replace('Bearer ', '');

    jwt.verifyAsync(token, secret)
      .then((payload) => {
        return User.findById(payload.userId);
      })
      .then((user) => {
        if(!user) return res.unauthorized();
        req.currentUser = user;
        if(!bool) if(!user.center) return res.unauthorized();
        return next();
      })
      .catch(next);
  };

}
```

This was complimented by a Higher Order Component in the React app to ensure routes were fully protected from unauthorized users.
```
const ProtectedRoute = ({ center, component: Component, ...other }) => {
  return (
    <Route {...other} render={props => {
      if (!center && Auth.isAuthenticated()) {
        return <Component {...props}/>;
      } else if (center && Auth.getCurrentUser() && Auth.getCurrentUser().center) {
        return <Component {...props}/>;
      } else {
        return <Redirect to="/" />;
      }
    }}/>
  );
};
```

Another specific challenge of the project came from the registration of Dive Center accounts as these required a large ammount of location data which could not all be obtained from GoogleMap/Places.  My solution to this issue involved making an additional request to rest countries API on form submission, this presented challenges it relied upon correct managing a chain of promises where the API new request was dependent on the response data of the previous request.  [Ultimately I managed to refactor this into a functional and readable solution however it was quite a challenge](https://github.com/jdLYNC/wdi-project-4/blob/master/src/components/auth/Register.js "register component file").

Other key challenges with Diveboard, included managing the vast usage of referenced data (especially when seeding data for the test suite) and ensuring that users signing up with Facebook OAuth would have the correct access.

## Successes

In addition to the success of the secure routing outlined above, another success with Diveboard was the [direct messaging system](https://github.com/jdLYNC/wdi-project-4/blob/master/src/components/messages/Messages.js "messages component file").  This was a vast improvement over the direct messaging system I implemented in project 2.  This upgraded messaging system featured a more streamlined user experienced with a simple conversation selector, partially RESTful messages, an intuitive display that defaults to the conversation with the most recent activity on page load, and unread message notifications.

<img src="https://i.imgur.com/QCropWB.png" alt="diveboard messaging">

Other successes include the effective implementation of Styled Components within the project and the comprehensive test suite built for the API.

## Improvements

Having concluded Diveboard there are a number of changes I would like to make.  Some are small technical bug fixes, others are larger additional features for a new release.

### Technical Changes & Bug Fixes
* Fix bug for users logging in through OAuth sometimes having issues viewing/applying for jobs.
* Improve the mechanism by which unread messages notifications operate, to better reflect best practice.

### Feature Changes
* User profile pages
* Fully RESTful user accounts
* Increased user information such as speciality certifications which can be used to further refine filtering.
* Increased information in job model on seperate filterable requirements.
* User settings to enable custom default filtering options.
* Time limited job adverts.
* A user homepage with new jobs and current application status information.

I thoroughly enjoyed working on Diveboard and fully intend to pursue production of a second version of the site incorporatig the changes outlines above.

## Link ##
[Visit Diveboard on Heroku](https://dive-board.herokuapp.com/ "Diveboard")
