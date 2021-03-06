SISE-CWEB Project Group 1
==========================

## Project Assignment Main Steps 

In this project it is possible to perform the login with any doctor present in the doctors.json. In case of error a message is displayed. 

On the second page it is possible to see in the left side the waiting patients (which is a clickable table to select the desired patient) and on the right side the status of the requests performed by the doctor that is logged in. It is important to mention that the panels are collapsed, and to check what it is inside them, the user must click on the [+] symbol. Afterwards, by clicking in the desired patient, the third page is displayed.

On the third page it is possible to see in the left side more information about the selected patient and in the ride side it is possible to see the acts of that patient. It is possible to add a new act for that patient by clicking in plus, and delete by clicking in the minus sign (-). After performing all the disered actions, the user must click on submit to perform all the changes in the database. By clicking on submit the user will return to the second page. In case the user desires to delete/add/check another act for that patient, the user must click again on that patient (left side of the page) and in the third page it is possible to check the updated acts and to perform the desired actions.

After making any change regarding the acts (for example, adding a new one in the third page), when the user returns to the second page, the changes can be checked by clicking on the refresh button located bellow the Insurance Requests title.

Finally, whenever the user desires, it is possible to return to the log in page by clicking in the InSurance Health Service button at the top right of the page.

## PROJECT MAIN FOLDER

This project template you offers you with a foundation on how to structure your code for the SISE-CWEB Project.

The template is organized by 3 main goals:

```
$ tree -L 1
.
├── LICENSE
├── README.md # The README that you are currently reading
├── api # RESTful API
├── app # Client side application
├── bl  # Business Logic
└── data # Data set for your application
```

### Business logic

This folder is the destination of the business logic of your application, essentially, where the manipulation the data (in this case a raw JSON object, but in a typicall production app, it would be a Database).
The path do write the files reports.json and request.json are the ones where the files are located. For example, to uptade the reports.json the path that is used in inde.js is: /home/sise-cweb/Desktop/project-template/bl/src/reports.json . It's important to change this path to adapt to the location where these files are.

Folder structure:

```bash
$ tree
.
├── package.json
├── src
│   ├── acts2.json
│   ├── acts.json
│   ├── acts-rmb.json
│   ├── acts-rmb-verbose.json
│   ├── data-gen.js
│   ├── doctors.json
│   ├── index.js
│   ├── mediators.json
│   ├── package.json
│   ├── patients.json
│   ├── reports2.json
│   ├── reports.json
│   ├── requests2.json
│   ├── requests.json
│   └── requests-verbose.json
└── tests
    └── bl-test.js


```


### RESTful API

Here you can find the foundation for your RESTful API. This template presents two routes, one with GET and one with POST, using the example business logic available on the `bl` folder.

Folder structure:

```bash
$ tree
.
├── package.json
├── src
│   ├── index.js
│   ├── resources
│   │   ├── hello.js
│   │   └── index.js
│   └── routes
│       └── hello.js
└── tests
    └── api-test.js

```

### Client side application

Finally, in this folder there is the static server and a template for the client side application.
Folder structure

```bash
$ tree
.
├── package.json
└── src
|   ├── css
│   ├── bootstrap.min.css
│   ├── bootstrap-theme.css
│   ├── jumbotron-narrow.css
│   └── panel-header.css
├── fonts
│   ├── glyphicons-halflings-regular.eot
│   ├── glyphicons-halflings-regular.svg
│   ├── glyphicons-halflings-regular.ttf
│   ├── glyphicons-halflings-regular.woff
│   └── glyphicons-halflings-regular.woff2
├── img
│   ├── favicon.ico
│   ├── insure.jpg
│   ├── insureLogo.jpg
│   └── user-alt-128.png
├── index.html
└── js
    ├── app.js
    ├── bl.js
    └── cwData.js

```
