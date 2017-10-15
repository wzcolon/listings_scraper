# Adwerx Cragislist Scraper

## Setup

### Extract or Clone the Repository

If you received a gzipped tarball...
`tar -xzf listings_scraper.tar.gz && cd ./listings_scraper`

Otherwise, clone the repo
`git@github.com:wzcolon/listings_scraper.git`

### Ruby Version

Rails 5 requires Ruby 2.2.2 or higher. This project has a `.ruby-version` file specifying Ruby 2.4.1. Ensure you're running a compatible version before bundling dependencies.

### Bundle up!

`bundle install`

### Create the database

`bundle exec rake db:create db:schema:load`

### Intall JS dependencies

`yarn`

### Start webpacker in dev mode

Note that it is important to specify the host to avoid cross-orgin issues with
Puma config that starts on 0.0.0.0 rather than 127.0.0.1.

`./bin/webpack-dev-server --host 0.0.0.0`

### Start a Rails server

`bundle exec rails s`

### Visit the application

[Adwerx Cragislist Scraper](http://localhost:3000)
