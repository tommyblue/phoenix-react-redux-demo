# Phoenix + React/Redux demo app

![Phoenix + React/Redux demo app](https://raw.githubusercontent.com/tommyblue/phoenix-react-redux-demo/master/app-screenshot.png)

This is a small app I wrote while learning the basics of [Elixir](http://elixir-lang.org),
[Phoenix](http://www.phoenixframework.org), [React](https://facebook.github.io/react/) and
[Redux](http://redux.js.org/).

It also uses [Webpack2](https://webpack.github.io/) to compile assets and
[Yarn](https://yarnpkg.com/en/) for to manage frontend dependencies.

Just to test Webpack features I also included [Bulma](http://bulma.io/) CSS framework.

## Server app

It's a simple CRUD API to manage "documents". The document object only has the title and a
dynamically created ID (using UUIDv4).

Instead of Ecto, it uses Elixir GenServer as database, as explained in the elixir guide:
http://elixir-lang.org/getting-started/mix-otp/introduction-to-mix.html

## GUI

The frontend is built using React + Redux.
Webpack is the tool used to transpile JS and CSS (Sass).

## Requirements

* Elixir: http://elixir-lang.org/install.html
* Phoenix: http://www.phoenixframework.org/docs/installation
* npm and yarn

## Run the app

To start the app:

  * Install Phoenix dependencies with `mix deps.get`
  * Install frontend dependencies with `yarn install`
  * Start Phoenix endpoint with `mix phoenix.server`. This also runs webpack.

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.
