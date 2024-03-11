# Watch Better Films

films.jthaw.club is a website to help you decide what to watch. There are thousands of 'greatest ever' films out there, and this site tries to playfully bully you into making that decision. Choose by genre or even by director and get given 3 options. The site then makes it annoying on purpose to do that process again, so that you really think about your 3.

## Running

Install with `npm install` and then run with `npm run dev`

## Data

The data is all stored in an sqlite database [here](functions/main.sqlite). You'll notice in that file too there are 2 json files that populate the filter page, this is so that I don't need to make any needless queries on the DB. In fact if you believe there to be problems with querying a DB anyway, please get in touch to tell me what to do differently.

The data needs to be rebuilt locally, so I set a calendar reminder to run [this file](tools/buildDb.js) every month, to get new releases. Very old school I know, but I deploy the site on netlify and it just felt the easiest option for me (as the file directory is rightfully a little weird when deploying a static site with functions etc.)

### Info

This is 2.0 built on top of sveltekit, as part of my spring cleaning of old sites.
