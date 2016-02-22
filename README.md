# Code Challenge

## Picked challenges:

- Challenge 1 - Sign Up Form
- Challenge 2 - Buddies List

## Running Application
Visit https://code-exercise.firebaseapp.com

## Local Installation / Running

1. npm install in this project directory
2. npm start in this project directory
3. http://localhost:3000


## Local Apache Installation
1. Enable Rewrite module
```
 LoadModule rewrite_module modules/mod_rewrite.so
```
2. Add the following directive under default <Directory> directory of your httpd.conf file:
```
	IndexIgnore */*
	# Turn on the RewriteEngine
	RewriteEngine On
	#  Rules
	RewriteCond %{REQUEST_FILENAME} !-f
	RewriteCond %{REQUEST_FILENAME} !-d
	RewriteRule . index.html
```
3. http://localhost (whatever host/port specified)

## Deploying to Firebase
- Crate an account from [Firebase](https://www.firebase.com)
- Create an app with a 'ExampleName' and edit [firebase.json](./firebase.json) app name as your 'ExampleName'
- And then:
```bash
npm install -g firebase-tools
npm login
firebase deploy
firebase open
```
