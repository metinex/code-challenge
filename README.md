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
3. http://localhost (or whatever host/port specified)

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

## Test
Go to https://code-exercise.firebaseapp.com/test depending on your installation (Apache installation may not work properly

##Notes
- Some Object Design Patterns are self identified with @OOP tag in the comments
- The following commands can be used in Chrome or Firefox console to understand the app
```javascript
// SIGNUP USER
// go to http://localhost/signup
var instances = require('util/shared-instance')();
moment = require('moment');
instances.addView.render();
instances.addView.model.set({
                username : 'not_email',
                fullName : 'test user',
                password : 'password',
                repeatPassword : 'password',
                birthday : moment()
              });
instances.addView.model.isValid()=== false;
instances.addView.model.set({
                username : 'a@b.com',
                fullName : 'test user',
                password : 'password',
                repeatPassword : 'password',
                birthday : moment().subtract(20,'years')
              });
instances.addView.model.isValid()=== true;              
instances.addView.onSubmit();
```
- Playing with FILTERING and SORTING for buddy list
```javascript
// go to http://localhost/buddies
var instances = require('util/shared-instance')();
instances.buddyControlsView.model.set({sortBy: "defaultOrder", filterText: "am", filterPriority: false});
instances.buddyControlsView.render();
instances.buddyControlsView.model.set({sortBy: "defaultOrder", filterText: "am", filterPriority: true});
instances.buddyControlsView.render();
instances.buddyControlsView.model.set({sortBy: "defaultOrder", filterText: "am", filterPriority: false});
instances.buddyControlsView.render();
instances.buddyControlsView.model.set({sortBy: "defaultOrder", filterText: "", filterPriority: false});
instances.buddyControlsView.render();
instances.buddyControlsView.model.set({sortBy: "username", filterText: "", filterPriority: false});
instances.buddyControlsView.render();
instances.buddyControlsView.model.set({sortBy: "status", filterText: "", filterPriority: false});
instances.buddyControlsView.render();
```
