$(document).ready(function () {
  loadTweets();
 
});


  // Renders article element for each tweet, placed in tweet-container
  function createTweetElement(tweet) {

    const { name, handle } = tweet.user;
    const avatar = tweet.user.avatars.small;
    const tweetMessage = tweet.content.text;
    const dateCreated = tweet.created_at;

    const $tweetArticle = 
      `
    <article class="tweet">
      <header>
        <div>
          <img class="avatar" src=${avatar}>
          <h3>${name}</h3>
        </div>
        <h4>${handle}</h4>
      </header>
      <main> 
        <p>${escape(tweetMessage)}</p>
      </main>
      <footer>
        ${dateCreated}
        <div class="icons">
        <i class="far fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="far fa-heart"></i>
        </div>
      </footer> 
    </article>      
    `
    

    return $tweetArticle;
  }
  
  // Loops through tweet array append to tweets-container
  function renderTweets(tweets) {
    tweets.forEach((entry) => {
      let $tweet = createTweetElement(entry);
      $('#tweets-container').prepend($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    })
  }

  // Get Request to retrieve tweet array from DB
  function loadTweets() {
    $.ajax({
      type: 'GET',
      url: `/tweets`,
      dataType: 'JSON'
    })
    .done( (tweetDB) => {
      renderTweets(tweetDB);
    });
  }


  // Escape function to protect against xss
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

   

  