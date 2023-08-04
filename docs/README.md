# datarice
datarice is a simple, and easy to install tool for data visualisation.

## Installation
The base project requires NodeJS v18, and it is set up like any other NodeJS projects.

```bash
git clone git@github.com:gohanko/datarice.git
cd datarice
npm ci
```

The application is installed. Now all you need to do is run this command.

```bash
npm run start
```

And then access the interface through a browser.

## Configuration
The ```.env```, ```.env.development```, and ```.env.production``` files are all configuration files setting some default environment variables. For more information please have a look at this [documentation](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#default-environment-variables).

The environment variables for this project are

- ```NODE_ENV``` - Sets the build mode of the project. Available values are ```development``` and ```production```. This affects how the project is built.
- ```DATA_STORE_DIRECTORY``` - Sets the directory on which the application is looking at. Usually point this to the folder where you have data files that you want to visualise.

To override the defaults, you should add a ```.env.local``` file in the root of this project, and set your variables there.

## Screenshots
![Alt text](screenshots/datarice_2023-07-24.png "DataRice Screenshot")

## Contributing

- File bugs, features requests in [Github Issues](https://github.com/gohanko/datarice/issues)
- Create Pull Requests in [Github Pull](https://github.com/gohanko/datarice/pulls)
