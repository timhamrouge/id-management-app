# simple-login

TODO:



Depends on what you mean by “effective”. In terms of development and cost, it certainly is not “effective”. It probably would double the cost (it’s more complicated to build HTML application which connect to backend via API; and it most likely requires at least 2 different team to develop (debugging frontend application is another monster to backend application.

In term of technicality, I’d say it’s preferable to split the development of these two. It’s clearer because I could know which part is misbehaving: the data (backend), or the presentation (frontend).

Also, in term of performance, I’d say it’s also preferable to split the development. Separating the servers would help the performance too (although it is NOT mandatory). The frontend “server” will only serve static files, so the presentation/UI will arrive faster and appear more responsive to end-users. And it will ease the backend “server” too by serving less data.



{ "username": "new", "payload": {"username": "tim", "password": "pass", "email": "email@email"} }

work on displaying the bad_auth, bad_user and bad_pass in line with their form fields. Form should only POST if the fields validate correctly, i.e. are not empty. 

when accessing the login page with a GET, it needs to set 

user can see a login screen as standard. They are prompted to login. 
If they enter the wrong credentials, it validates this. if they attempt to
manually naviagte to a page that they have to be signed in to see, it handles this. 

If a user does not have an account, they are taken to an account creation screen, they need to enter their name, email, and a password (whcih they need to confirm) to register. There will also be a checkbox that gives permission for me to store their data. 

Once they have registered, they are able to log in. in an ideal world, they will force confirm their email to verify it. After this, they can log in.

Once they are logged in, they are able to view, change, and update their details, including change their password. They can also delete their account. This is delete their info from the database.  

They can then log out, and their session will be destroyed. 

add account creation screen

maybe something with cookies?
it needs a database. probably mongodb.
make the mustache templaes pretty
add 2fa, reCAPTCHA?, email webhook? sms webhook?
store ips, 2fa on different ip/device - allowlist for devices for account - send email when logged in from new device
force email verification on creation of account
encrypt data in database
hash passwords
