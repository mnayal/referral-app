# README

Setup for running application locally:

- Install ruby using rvm or any other method - ruby-3.0.1

- Install rails using command - gem install rails -v 7.0.1

- Install Yarn and run command - yarn install

- Install mysql locally and an query interface of choice like TablePlus

- run command - bin/setup ( This will install all system dependencies and prepare database by running migrations )

- run command - bin/dev ( This will start backend server as well as yarn watcher for UI changes )

- Access the app on your browser at localhost:3000

- Install mailhog ( email testing tool, with a web UI to view outgoing emails )

- Run mailhog using command - mailhog

- Access mailhog UI on your browser at localhost:8025
