# Virtual Kiosk (unq-tip-frontend)

[![Build Status](https://travis-ci.org/marchionne-lattenero/unq-tip-frontend.svg?branch=master)](https://travis-ci.org/marchionne-lattenero/unq-tip-frontend)

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1ec6aa52f8f74b2e9f5431301f0c5ef9)](https://www.codacy.com/app/cdmarchionne/unq-tip-frontend?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=marchionne-lattenero/unq-tip-frontend&amp;utm_campaign=Badge_Grade)

[![Heroku]()

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
versión 0.15.1.

## Requirements
Deben ser instalados usando [nvm](https://nodejs.org/en/download/package-manager/)

Nodejs 4 & npm 3:

    $ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
    $ sudo apt-get install -y nodejs

[ruby ~2.3.1]

    $ sudo apt-get update
    $ sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev  $ sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev

    $ cd
    $ git clone https://github.com/rbenv/rbenv.git ~/.rbenv
    $ echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
    $ echo 'eval "$(rbenv init -)"' >> ~/.bashrc
    $ exec $SHEL

    $ git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
    $ echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
    $ exec $SHELL

    $ git clone https://github.com/rbenv/rbenv-gem-rehash.git ~/.rbenv/plugins/rbenv-gem-rehash

    $ rbenv install 2.3.1
    $ rbenv global 2.3.1
    $ ruby -v

Luego correr:

    $ npm upgrade -g npm
    $ npm install -g grunt-cli bower yo generator-karma generator-angular
    $ gem install compass
    $ npm install
    $ bower install

## Build & development

Correr `grunt` para hacer el build y `grunt serve` para vista previa.

## Testing

Al correr `grunt test` se ejecutan los test unitarios con karma.


