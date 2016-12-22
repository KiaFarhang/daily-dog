# Get an adoptable dog in your inbox #

The Daily Dog Email started as a programming challenge. My girlfriend loves dogs - why not find a way to email her one every day? It grew into a full-fledged email newsletter using Node.js, Mailgun and a ton of virtual duct tape.

## How it Works ##

### Step 1: Signing Up ###

If you're not interested in code, this is the only section that matters. Head on over to the [Daily Dog Email website,](http://www.dailydogemail.com) throw your name and email address into the form and hit submit. You'll get your first dog almost instantly, then you'll be signed up to receive daily dog emails. They go out around 8 a.m. Pacific time.

(Submitting that form triggers some email validation. If passed, the form sends the name and email address to my server, which triggers the function in subscription.js to add them to my [Mailgun](http://www.mailgun.com/) mailing list and send them their introductory email.)

### Step 2: Building the Email ###

Where most of the magic happens. Server.js makes a GET request to the [Petfinder](https://www.petfinder.com/) API for a random dog. It passes the XML response to dogparser.js, which (surprise) parses that XML response for all the data to insert into the email. That includes the dog's name, gender, description and photo.

### Step 3: Sending the Email ###

Once the server script gets its parsed dog back, it uses template literals to insert the dog's characteristics into a modified Foundation email template. That template gets stored as a string and passed to the Mailgun Node module, which sends the email out to the list of subscribers. A cron job runs this whole process daily, guaranteeing adorable, adoptable dogs for all.

It's cute. Sign up.
