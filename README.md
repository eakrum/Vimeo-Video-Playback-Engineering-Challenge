# Vimeo Video Playback Engineering Coding Challenge Summer 2019

Vimeo's coding challenge for the Video Playback Engineering team in Summer 2019. This program was supposed to make a page that has a player and display's "cue" overlays at certain timestamps.
I've decided to take this program a bit further by applying functiontionality that uses the Vimeo API to search for a video and return the top 10 most relevant videos. The user can then navigate to
a "video player" page to benefit from all cue functionality. Along with this project I have also completed two bonuses where persistent storage is used through an API I built, and upon changing videos (via videoId) the application can render all cues associated with that video (through the benefit of the API). I thoroughly enjoyed doing this challenge, and ended up learning a few things along the way. Hope you enjoy!

For a live demo - please click [here](http://www.EakrumAwwal.com:3000)!

### Prerequisites

This project works with node 8.11.3, testing on other versions has not been performed please check your version below.

```
node --version
```

This project also requires you to have MongoDB on your system.

### Installing

Make sure you have node installed on your machine. Then clone this repository, navigate to directory and perform an npm install
For example:

```
Vimeo-Live-Platform-Challenge YOUR-USERNAME$ npm install
```

Please reference MongoDB documentation for installation. I cannot guarantee it will work on your machine but I will make it available on my EC2 instance for a few weeks.

### Running

After installing simply run the following commands

Start:

```
npm start
```

When the program starts, you can proceed to localhost:3000!

### How it works

For this challenge I leveraged 3 main pieces of technology. Node.JS for my backend API logic, Express handlebars for my templating engine, and Vanilla javascript for all front end related logic. Upon starting up the server handles all endpoints and database logic. I have 3 main routes for GET requests. localhost:3000/ renders a home page with a button where the user can see the "full experience" meaning they can query a video, add cues and enjoy. Or they can click a button that just goes to a player with a video I've already chosen with some cues. Upon "/player/:id" the server will recognize if a video has cues associated with it or not and render the appropriate information for our front end to display.

I also have 2 POST end points, these end points are used on the search and player pages respectively. On the search page, when a user makes a query for a video such as "New York" the client will POST to the server where it will contact the VIMEO API to return the 10 most relevant videos related to that query. The front end will then render 10 cards that have endpoints to GET "player/:id" with the respective video Ids. The second POST request is for handling saving CUE functionality. On "/player/:id/". When a user submits a cue it will POST to "/videos/cues" where it will check if this cue has videos already or not. Depending on this condition it will either create a new model or append a new cue. Now that these cues are stored in persistent storage. Cues can be readily available per any videoId that is passed without ever losing any data.

My last end point is for deleting a CUE. When a user clicks any item on the table it will trigger a DELETE request to the server where it will contact the ""/videos/cues" endpoint and delete the appropriate cue. Upon success, the front end will adjust accordingly. Hope this application works on your machine and hope you like it!

### Issues

Due to my responsibilities such as course work as well as it being finals week there are a few issues that I know of but do not necessarily have the time to fix. 

1. When adding a new cue, although posted to database: the page needs to refresh for it to be recognized by the event listener to display the cue on the video.
2. Similarly, if you add a cue you cannot immediately delete it without refreshing the page first. 
3. I wasn't sure if ajax is considered vanilla Javascript but I used it only for my network calls, I did not maniplate any DOM using jquery.
3. CSS can use some work to make the front end more appealing.
    - I am sure I can fix these problems if given the time but my schedule is extremely packed right now so I hope you understand. 

### Remarks

I am extremely interested in a Vimeo opportunity and Vimeo as a company in general given my love for video streaming technologies, API development, and video creation.  I have spent quite some time following Vimeo for potential openings to join given my background in video streaming and live video and would be extremely honored if I get a chance to proceed in the next steps of the interview process. Given the circumstances, I have just been waiting for the right opporunity that can be beneficial to both parties. I apologize if these remarks come off as strong worded or opionated as I do not mean to give off that impression, I am simply passionate about this position and wanted to relay the message to you. I hope to hear back from you and I hope you liked this!

- Regards,
  Eakrum Awwal
