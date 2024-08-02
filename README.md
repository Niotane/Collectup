# [COLLECT-UP](https://github.com/Niotane/Collectup)

![main-page](https://user-images.githubusercontent.com/28642011/101401541-7facad80-38f8-11eb-8201-541af644d95f.png)

## Inspiration 🌞
More than 10 million Tones are collected each year in Europe, and while 40 to 50 % of it should be recycled, the reality is different and while governments are trying to improve this, we should not forget, that a big part doesn't even get to be collected.

Who has never stored an unused object for years not knowing what to do with it,

Who has never found themselves with a cumbersome broken object and dreamed of the bulky waste collection day, or had to pay a fee to get rid of it?

So we bring a solution to this - **connecting regular citizens to companies directly to sell their old furniture or other items. Just list your items, simple :)**


## How to use 🔧
The CollectUp Web App serves 2 different clients, namely, community members with large materials to be recycled and the recycling companies or government organisations that collect these materials.

- For our users, we designed CollectUp with the intention of making it intuitive and user-friendly.
- Users who have large materials they intend to recycle like household furniture, electronics, or metals can simply click on the **"Create New Post"** button at the bottom right-hand corner of the screen. This would bring up a pop-up for them to key in their details and submit a photo of the item they intend to recycle.
- Upon submission, this data would be visible on the map, allowing recycling companies and government organisations to know where exactly each individual is located.
- View the **pickup timeline and ETA** of reaching your location.
- And if you are feeling lucky, the ability to give that post some likes and share it with your friends if you think they might be interested in buying some old stuff. Maybe for their secret backyard project? 🤫
- Be able to **track your pickup Trucks live, get timelines, and show relative timings as to when the pickup would arrive at your location**. Ability to schedule your pickup timings using the calendar.
- If you want a more customisable approach and more information for the trip, **head to the driver section and add details to get proper driver instructions and ETAs and rest-stops for the journey**. All visualised in a beautiful graph
- Companies and public organisations have the additional functionality of being able to take advantage of the here-matrix-route technology that Calculates for them the distance from each collectible objects in their region,
  - Plan their day, reaching out to their potential customer, to take care of their non-interesting waste.
  - Contact customers on the platform itself and send messages to discuss the pickup details


## How we built it 🤞🏿
* The project was primarily built with the MERN stack (MongoDB, ExpressJS and ReactJS, and NodeJS).
* Deployed on Google cloud platform, using Google cloud storage and using GCP-atlas no-SQL DB for storage.
* The maps on the front end were built with HERE API. As HERE didn't have a React abstraction, we essentially created an ORM for the same. Hence, just using the official minified js files, we created a wrapper for React (this was the biggest hurdle for us), as the community maintained the library didn't have extensive API support.
* Used various HERE layers - for traffic, satellite view, truck routing, trip ETA, etc
* HERE Features used
  * Interactive Maps and Vector Tile
  * Geocoding and Reverse Geocoding Search
  * Matrix Routing
  * Fleet Telematics - Waypoint sequencing
  * Fleet Telematics - Tour planning 


## Challenges Faced 🚀
It was a challenge for us to finish implementing the different features we had planned in time. Working on creating an ORM for JS SDK for React caused the whole development process to take longer than expected. But this bore fruit at later stages when the component flow was perfect. Working with HERE was a fun experience, the documentation and the customization options are endless!


## Usage Screenshots

![image](https://github.com/user-attachments/assets/7ff3fbf1-610e-447d-86e4-7a1ec7e42a89)
![image](https://github.com/user-attachments/assets/34187f90-6bda-462d-a633-f591fa74ecc8)
![image](https://github.com/user-attachments/assets/7486a51c-3afa-4340-887b-74c22df7825f)
![image](https://github.com/user-attachments/assets/035b7aaa-5e74-4b37-aa30-aea3aedeb00c)


## Setup Development Environment

Run two different Shells for backend (nodeJS) and frontend (react app)

**ReactJs** 

- CWD -> `./frontend`

- Create a `.env` file with (refer sample.env)
```
REACT_API_HERE_KEY=yourKeyHere
...
```

- Install npm packages and start the project (using yarn)
```
yarn install
yarn start
```

**NodeJs**

- CWD -> `./backend`

- Install npm packages and start the project (using yarn)
```
yarn install
yarn start
```
