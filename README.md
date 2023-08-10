# FirstCallQA Test Assessment Frontend

This is a frontend test assessment for a fullstack web developer assigned by FirstCallQA. In this code, we have defined the frontend using React, NextJS, Redux, and TailwindCSS for the CSS.

## How to run the code
To run the code, make sure you have cloned the BE version from here: https://github.com/khumam/FirstCallQA-BE, and then run the service. Details on how to run the BE service are already provided in the readme file within the repository.

Next, inside this repository, you can run the following command to install the required packages:

```
npm install
```

The final step is to run the development server using the following command:

```
npm run dev
```

This will make the frontend listen on port 3000. Open your browser and go to http://localhost:3000 to see the result.

IMPORTANT: I have set the default port for the backend as 3080, so ensure that when you run the backend service, it's also using port 3080.

### Project structure
- All project files are stored in the `src` folder.
- The `interfaces` folder is for defining the interface type for each variable.
- The `layouts` folder is for defining the base layout for the pages.
- The `pages` folder is for defining page-based routes using Next.js.
- The `redux` folder is for defining the Redux configuration.
- The `service` folder is for defining the API connection configuration.
- The `styles` folder is for defining the `global.css` file, styled using TailwindCSS.