# Onset Roleplay Admin Panel
![](https://img.shields.io/github/stars/skrilax91/Onset-Roleplay-Admin-Panel?style=pandao) ![](https://img.shields.io/github/forks/skrilax91/Onset-Roleplay-Admin-Panel) ![](https://img.shields.io/github/tag/skrilax91/Onset-Roleplay-Admin-Panel) ![](https://img.shields.io/github/release/skrilax91/Onset-Roleplay-Admin-Panel) ![](https://img.shields.io/github/issues/skrilax91/Onset-Roleplay-Admin-Panel)

ORAP is a fully JS panel for the game Onset with onsetrp package, it have many fonctionnality to help you in your admin job.

## Features
- Players List
- Players Profiles (ability to modifie users informations)
- Ban List (ability to add and remove bans)
- Items List
- Items Manager (ability to add, remove and modify items)
- Shops List
- Shop Manager (ability to add, remove and modify Shops)
- Logs
- Whitelist manager (ability to add and remove someone of the whitelist)


## Requirements
- NodeJS with pm2
- Web server must allow UDP connections

## Installation
1.Install NodeJS
The easiest way to install the most recent LTS version of Node 10.x is to use the package manager to get it from the Ubuntu binary distributions repository. This can be done very simply by running the following two commands on your terminal:
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash - 
sudo apt-get install -y nodejs
```
2.Install PM2 Product Process Manager in Linux
The latest stable version of PM2 is available to install via NPM as shown.
```shell
sudo npm i -g pm2 
```
3.Install panel
In order to use the panel you need to clone the repository, go to your panel foder and run this command :
```shell
git clone 
```
4.Install dependency
Next you need to install dependency like this :
```shell
npm install
```
5.Configure the DB
Now you have to configure your database, you need to set an onsetrp database, next you have to import the table.sql file in this database.

6.config the panel
Next you need to configure your panel, you have two files :

*config.json :*
- name : the name of your panel
- port : the port where your panel will run

*secret.json*
- mysql : enter here your onsetrp DB information
- steam : replace 127.0.0.1 with your panel adress and give an api key

7.launch it
to launch your panel you just have to run this command :
```shell
pm2 start app.js
```
