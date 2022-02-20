# React, Typescript & Node.js project: "Foreca_weather_app".

## Short Description:
* Front-end part: get needed locations and type of needed weather.
* Back-end part: post searched locations and current weather. 

### Detailed description:
* On page load input and button are displayed.
* Input is validated this way:
    - HTML: `required`, `maximum length`.
    - JS: checking word length, maximum word length and by testing if the word only contains spaces and letters.
* Input validation errors are displayed below the input.
* Search can be done with either `mouse click` or `enter`.
* All of the searched strings are displayed to the terminal console with string & timestamp, using `express`.
* While data is being fetched, a spinning element is displayed:
    - Once data is fetched or if there wasn't a location found, element is hidden.
* For app state `userReducer` is used to store different types of data.
* Once is data is fetched, a list of places are displayed:
    - List is rendered by `custom pagination component`.
    - Component lists maximum of 5 items per page,
    - List can be "searched/changed" by using `buttons` or `right & left keyboard arrows`.
* List item has 2 buttons:
    - Current weather button.
    - "Future weather" (7 day weather) button.
* Clicking on a button hides the list and shows either:
    - Current weather: current weather information list
        - Pressing current weather button: location name, weather and timestamp is displayed to terminal console.
    - Future weather: future weather table.
    - Either item can be closed using `close` button, which hides the item and shows the list.
* Pagination page order (list page number) is maintained after closing item weather information.
* If user searches for new location, all of the previous data is set to `default`.
________________________________________________________________________________________________________________

* For styling purposes SASS (`.scss`) is used for custom styles.
* MaterialUI Table is used to displayed future weather information.

________________________________________________________________________________________________________________

* Project can be run by: `cd Foreca_weather_app` ---> `npm run dev`.
* Before running project API Key is needed: `Foreca_weather_app/weather/src/utils/getWeather.ts`.
