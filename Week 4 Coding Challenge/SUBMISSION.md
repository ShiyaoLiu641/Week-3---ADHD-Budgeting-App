# Week 4 Coding Challenge — Submission

## Links

1. GitHub repository: https://github.com/ShiyaoLiu641/Week-3---ADHD-Budgeting-App
2. Live Vercel app: https://week-3-adhd-budgeting-app-three.vercel.app/
3. Database diagram: https://github.com/ShiyaoLiu641/Week-3---ADHD-Budgeting-App/blob/main/docs/erd.md

## Documents

1. Notion document links: <!-- paste any Notion links here, e.g. your Week 2 specs -->
2. Other document links:
   - ADRs: https://github.com/ShiyaoLiu641/Week-3---ADHD-Budgeting-App/tree/main/docs/adr

## What I Did

I made an app that is called Park and Revisit. This is a budgeting app for people
with ADHD, but I'm just focusing on the first stage, which is helping people with
ADHD to decide on the shopping items that they really need. Instead of focusing on
whether they have the budget to do it, I focus more on whether the items are really
worth buying. Even though the users have the budget, if it's not worth it or if
they're going to regret it later, that's not worth it. It's not doing a good job for
their habit of buying things and going shopping.

I would like people to not only pause but also reflect before they purchase certain
items. Of course, it doesn't have to be all the items they buy online, but it has to
be something that users will log and select as haunting them or something they have
difficulties buying. This app is just to sign up or log in, and then log something
they want. After that, they're going to revisit the list to either buy it, let go,
or still decide.

I use Next.js and Material UI for the interface so that I don't need to create
buttons and icons from scratch. I use Supabase for logging in and for the data
repository, and I use Vercel to host and deploy the app online. To make sure
everyone is only seeing data from themselves, in Supabase there is Row Level
Security so that each person can only see their own data. Mostly, Claude guided me
one by one, so I don't really know everything that is happening under the hood. What
I know is that I filled in the requirement specifications and set the environment
variables to make sure the data and keys are safe. Then I put the code on GitHub,
registered for Vercel, and connected it with GitHub so that it launches.

## What I Learned

To be honest, at first I felt I didn't learn the details. I only knew that Supabase
is to store data, GitHub is like a place for me to store my code (my "recipes") so
that next time it will still have things like the requirement specifications to make
another app, and Vercel is used to launch an app so it will be published online, in
public, and everyone can use it.

But I also learned that hashing and Row Level Security are talking about different
things. Hashing is just a method to chop down the original password into a long
passkey. It is like there is a space where the system cannot see what exactly the
password is, but it can still determine whether the password is correct. Row Level
Security is a rule that only the person with their own account can access the data of
this person, not everyone else, and this person's data will not be shared to other
accounts.

I also reinforced my learning of dogfooding everything, as Morgan told us. Because I
keep telling Claude when I don't understand something — explain it to me, guide me
step by step, break it down — now I feel that I am able to catch up every time with
everything. I feel that at the beginning, Claude didn't know me that much, and it
sometimes gave me words that I didn't understand or steps that were too complicated
to follow. I use both Chinese and English to communicate: Chinese more for reading
fast and expressing something that I cannot in English, and English more for the
formal homework record, the MD files, the homework details, and for the sake of
learning some specific terms like Row Level Security.

## Before You Submit — Checklist

- [ ] Open the Vercel link in a private window; sign up as a new person — it works
- [ ] Every MVP #1 feature works on the live app
- [ ] Every screen, button, link, and form works — nothing broken or fake
- [ ] Add an item live, log out, log back in — it is still there; row shows in Supabase Table Editor
- [ ] If the app stopped working, Resume the Supabase project
- [ ] No secret keys are in the GitHub repository
