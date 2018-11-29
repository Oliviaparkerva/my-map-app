#FEND REACT MAPS PROJECT

##Overview

Single page responsive app created using React, Google Maps API(map display), and FourSquare API(location info). Allows user to search through restaurants located near the city center of state capitol Annapolis,MD 

##App functionality

After loading the map user is able to use input box to filter through a list of 20 restaurants available in the area by either name or category(seafood, cafe, bodega ...). User is able to click on restaurants listed to show information attached to map marker. Clicking on the map marker will also show additional information provided via FourSquare about each location. To close an info window either click a different marker or anywhere on the map

###Running the App
Clone this repositories master branch https://github.com/Oliviaparkerva/my-map-app.git
Run npm install
Run npm start

###Additional information

make sure to put payment information into maps platform so that it runs without limiting your request up to $300 worth of credit in the free trial. it will not charge without persmission after the trial is up

https://is.gd/dFnkGO FourSquare Developer API
https://is.gd/8mARKL axios documentation used to handle request for my venues
https://is.gd/t8B8B5 making google maps responsive

####Tutorials
https://is.gd/7wbk7E Playlist of walkthrough resources:
-Udacity Walkthrough Doug Brown
-Elharony Walkthrough without using external components explains running script wonderfully
-Emam Mohammed great explanation of linking list and markers
-Ryan Waite LONG walkthrough of project


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
