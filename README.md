# unq-tip-frontend

[![Build Status](https://travis-ci.org/marchionne-lattenero/unq-tip-frontend.svg?branch=master)](https://travis-ci.org/marchionne-lattenero/unq-tip-frontend)

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1ec6aa52f8f74b2e9f5431301f0c5ef9)](https://www.codacy.com/app/cdmarchionne/unq-tip-frontend?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=marchionne-lattenero/unq-tip-frontend&amp;utm_campaign=Badge_Grade)

[![Heroku]()

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Requirements
Deben ser instalados usando [nvm](https://nodejs.org/en/download/package-manager/)

* Nodejs 4 & npm 3
    $ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
    $ sudo apt-get install -y nodejs

* ruby ~2.2.3
    $ sudo apt-add-repository ppa:brightbox/ruby-ng
    $ sudo apt-get update
    $ sudo apt-get install ruby2.2 ruby2.2-dev

Luego correr:

    $ sudo npm upgrade -g npm
    $ sudo npm install -g grunt-cli bower yo generator-karma generator-angular
    $ sudo gem install compass
    $ npm install
    $ bower install

## Build & development

Correr `grunt` para hacer el build y `grunt serve` para vista previa.

## Testing

Al correr `grunt test` se ejecutan los test unitarios con karma.
