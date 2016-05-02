Browser SU
==========

#### What is Browser SU?
It's like the new w3c permission api but with suger on top

#### Why is Browser SU needed?
Today we have too many diffrent permission request API. Geolocation, Desktop notification, Media devices and so on, but they are all inconsistent and broken in some ways. Some of them even lacks useful infromations such as "was the permission dissmissed, denied or granted?", "Do I already have access?" among other things. That's why w3 have started to introduce a new model for permissions in browsers which is cool. But they don't cover all the stuff you can query/request permission for and it dosen't work in all browsers.

Browser SU tries to solves three main issues

 1. Querying and keeping track of permission
 2. Requesting with one simple syntax
 3. Added feature detecting

#### Why didn't I write this a polyfill? Why make your own invention?
The Permission API is a living standard and keeps changing. They don't cover all the permissions. The request is not finilised yet. And you get more useful information with this then what you would get with the standard API

I try to stay consistent as much as possible with the permission API. But doing some neat trade-off.

#### Hello World

```javascript
// Querying 
su.query({name: 'description', ...opts }).then(resolve, reject)

// Requesting
su.request({name: 'description', ...opts }).then(resolve, reject)
```

Documentation
-------------
https://github.com/jimmywarting/browser-su/wiki/


Build
-----
```
npm install
npm run build
```
