# Simple CRUD with NodeJS

https://travis-ci.org/ayyaa/simple-nodejs-crud.svg?branch=master

## About

a simple Web Informatin Student, 

1. CSS Bootstrap 4.0
2. HTML 5 
3. Tempalte Engine by `.pug`
4. NodeJS web FrameWork by `Express js` 
5. Chart by Library `Chart Js`
6. Email Delivery Service by `sendGrid`

## Whats's inside ?
there 3 pages before login :
1. page login 
2. page forgot password
3. page confirm password

there 6 pages after login : 
1. page Home 
decsribe about this Web information Student
2. page statistic 
describe about gender frekeunsi and student frekuensi by month 
3. page Student List 
describe all student and can `Edit`, `delete` and `search`
4. page add Student 
form for add a student. if you add date of birth more today, is invalid input.
5. page user list 
describe all user who can access this system
6. modal Add User 
form for add user for login

## What's in the Download ?
The download includes :
```
Skeleton/
├── README.md
├── apps.js
├── .gitignore
├── package.json
├── wonderlabs_db.sql
├── bin
│   └── www
├── public
|   ├── javascripts
|   |    └── scripts.js
│   └── styleheets
|       └── style.css
├── routes
|   ├── admin_list.js
|   ├── delete_student.js
|   ├── forgot_password.js
|   ├── index.js
|   ├── login.js
|   ├── reset_password.js
|   ├── statistic.js
|   ├── student_list.js
|   ├── update_student.js
│   └── users.js
└── views
    ├── form.pug
    ├── index.pug
    ├── statistic.pug
    ├── update.pug
    ├── layout.pug
    ├── admin_list.pug
    ├── login.pug
    ├── reset.pug
    ├── forgot_password.pug
    └── home.pug
```

## How To Run 

1. Make sure you have installed `npm` in your PC
2. Install Express Js, with command :
  ```
    npm install express --save
  ``` 
3. Install Chart js 
  ```
    npm install chart.js --save
  ```
4. Clone This Repo 
  ```
    git clone https://github.com/ayyaa/simple-crud-nodejs
  ```
5. install dependency 
  ```
    npm install
  ```
6. this system by email delivery service `sendGrid` for send token recovery password, for using can register and get API keys
  ```
    www.sendgrid.com
  ```
7. running in CLI with command 
  ```
    npm start
  ```
8. Open in your browser with url `localhost:3000`
