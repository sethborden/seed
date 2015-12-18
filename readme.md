# Seed: Generate User and Group data randomly

Seed is a very simple module that lets you quickly generate lots of mock users
for your application (either for testing, or to make everyone think they're not
living in a ghost town)

## Usage

Require seed someone in your app:

`let seed = require(./seed)`

Then call seed passing in the number of groups and users that you want to have:

`const userData = seed(20, 500) //This generates 20 groups and 500 users.` 

Seed will return a ES6 style promise which resolves to an object:

```javascript
users: [{ 
  name: 'Alexander Rogers',
  email: 'smartgeek278@yahoo.com',
  password: '$2a$10$rel0lHDtMJTUH5VffUa/3eq/8krVsPXDqLTLNSSJt.MPfCvjWuvFa',
  ownerOf: [],
  adminOf: [],
  memberOf: [],
  creatorOf: [],
  profile:
   { 
     displayName: 'SmartGeek',
     userLocation: 'Fort Wayne, Indiana',
     userCompany: 'Cumberland Gulf Group',
     userAvatar: 'http://41.media.tumblr.com/c5ffd11c9217f2bdb51053c36ab8e571/tumblr_n6i9xtIDlm1rpwm80o1_250.jpg' 
   }
}, ...],

groups: [{
  name: 'Cromwellian Labour Council',
  owner: { email: 'arussell@outlook.com', index: 463 },
  creator: { email: 'arussell@outlook.com', index: 463 },
  admins:
   [ { email: 'mcooper@aol.com', index: 356 },
     { email: 'angeltwins172@mail.ru', index: 397 } ],
  members:
   [ { email: 'adrian.green@outlook.com', index: 212 },
     { email: 'muffinhead230@outlook.com', index: 453 },
     { email: 'ndiaz@yahoo.com', index: 9 },
     { email: 'jcarter@mail.ru', index: 369 } ],
  description: 'At vero eos et accusamus ...',
  authorizationSettings: { 
    whoCanAdd: 'admin', 
    canRequestInvite: true 
  }
}, ...]
```

By default, all users have their password set to `password` and is
bcrypted/salted.  If you're passing the password into a DB that has it's own
hash/salt function, pass in a raw string instead of the generated password and
let your DB handle the salting/hashing. 

See the `/demo` directory for an example of how to use this thing for realsies. 

## Liscense
MIT
