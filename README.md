# About this Project

ExCarmina is a MP3 library organizer and player, built with electron technology, using Angular, targeting linux systems. 

I miss a player so well designed as apple iTunes, with the same functionalities. So, I decided to write one.

## Status

I'm just starting it. ;)

# Dev Details

## Environment (Warning!!)

To identify the development environment, the app is started with the script `ELECTRON_ENV=dev electron .` (you can find this in `package.json` electron:serve script). With this solution is possible to have a "production" version installed in your machine while you run a development version, whithout touch in the "production" version configuration files and database.

If the node environment `ELECTRON_ENV` variable is not set, or if it is set with a value different from `dev` (lowercases only), the environment will be considered "production", and the database and configuration files of a possible "production" version installed in your machine can be touched and, possibly, broken.

So, please, be carefull with this and, case you have a "production" version installed, do a backup before start development, just in case. ;)

The environment verification can be made via `EnvironmentService` class. An instance of this class can be accessed via the const `envService`.

When in development environment, the database and configuration files will be generated into and 
read from the `/dev_env` folder, in the root of the project folder.