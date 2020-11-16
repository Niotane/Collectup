# [CollectUp.io](https://github.com/Niotane/Collectup)

![app.gif](https://user-images.githubusercontent.com/28642011/99198128-90b44400-27bc-11eb-9368-1fb3091cbbcc.gif)

## Inspiration 🌞
More than 10 million of Tones are collected each year in Europe, and while 40 to 50 % of it should be recycled, the reality is different and while governments are trying to improve this, we should not forget, that a big part doesn't even get to be collected. 

Who has never stored an unused object for years not knowing what to do with it,

Who has never found themselves with a cumbersome broken object and dreamed of the bulky waste collection day, or had to pay a fee to get rid of it? 

Well, did you know that some communities, and regular citizens, are spending hours to find an object like yours! They scrutinize the street and spend unnecessary gas, some are willing to give a second life to old objects, others want to earn a bit of money by selling the worthy components and materials. This is how, one day, I thought about this mattress that is taking place in my small apartment, knowing that I relucted for months to pay the extra fee to get rid of it, and was willing to be able to give it to one of whom it will interest, without putting in front of my building as if it was a place for it.

## What It Does 🎯
CollectUp.io connects the regular citizens that are dreaming to get rid of their usable but worthless(for them) objects, or even broken ones, with those who could seek benefit from it, from a family trying to get more furniture for their household, to companies trying to expand their customer target proficiency and reach, by proposing their services.

## How to use 🔧
The CollectUp Web App serves 2 different clients, namely, community members with large materials to be recycled and the recycling companies or government organisations that collect these materials.

- For our users, we designed CollectUp with the intention of making it intuitive and user-friendly. 
- Users who have large materials they intend to recycle like household furniture, electronics, or metals can simply click on the "Create New Post" button at the bottom right-hand corner of the screen. This would bring up a pop-up for them to key in their details and submit a photo of the item they intend to recycle. 
- Upon submission, this data would be visible on the map, allowing recycling companies and government organisations to know where exactly each individual is located.
- And if you are feeling lucky, the ability to give that post some likes and share it with your friends if you think they might be interested in buying some old stuff. Maybe for their secret backyard project? :shhh:
- Be able to track your pickup truck live, getting timelines, and showing relative timings as to when the pickup would arrive at your location. Ability to schedule your pickup timings using the calendar.
- Companies and public organisations have the additional functionality of being able to take advantage of the here-matrix-route technology that
  - Calculates for them the distance from each collectible objects in their region, 
  - Plan their day, reaching out to their potential customer, to take care of their non-interesting waste. 

## How we built it 🤞🏿
The project was primary built with the MERN stack (MongoDB, ExpressJS and ReactJS, and NodeJS). The maps on the front end were built with HERE API. As HERE didn't have a React abstraction, we essentially created an ORM for the same. Hence, just using the official minified js files, we created a wrapper for React (this was the biggest hurdle for us), as the community maintained the library didn't have extensive API support.


## Challenges Faced 🚀
It was a challenge for us to finish implementing the different features we had planned in time. Unexpected errors caused the whole development process to take longer than expected. Additionally, none of us had prior experience working with HERE Technologies which meant that we had to spend some time reading through the documentation to know how to develop the features we had in mind.

## What we have learned 📖
This was the best thing about us. Everyone learned something new and helped each other out at every step. Even though we were in different timezones, this was remarkable. From the basics of React, and Node optimising the component rendering using Refs and accessing DOM elements to map HEREJs functions, this was surely a rollercoaster.

## Possible Areas of Expansion 🛣️
If we have sufficient users, we might consider implementing filters so that recycling companies and government organizations can more easily identify the items they should collect. We might also, in a near future, look at improving the UI to make it more visually appealing.

Finally, to scale the project and create a real company out of it, we could modify some features, to make it a second-hand market, where users take advantage of this catalog of objects ( the feed ) where they could have a potential interest in objects, they could then track their's in exchange, or propose money to get priority. Thus, the project could naturally expand in a second-hand trade market, if the objects turn out to be valuable...The more users would join, the more likely it could turn out like this.

## Setup Development Environment

Run two different Shells for backend (nodeJS) and frontend (react app)

**ReactJs** 

- CWD -> `./frontend`

- Create a `.env` file with 
```
REACT_API_HERE_KEY=yourKeyHere
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
