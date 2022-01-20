const url =
  "https://api.nasa.gov/planetary/apod?api_key=j0HpTSvPb8oAzIAkrYD8YTeHkOGfoceZpRuO39SP"; //this is the api key to my account
let ii = 0; //this will be the idnex used ot follow the like and unlikes
let firstSubmition = true;

function submition() {
  //this function will run when the form is submitted, we will take the v alue from the form and get that ,many images from APOD

  let value = document.getElementById("Snum").value; //select the numbver of pictures to be added
  //console.log("this is the number chosen", value)
  loadMore(value); //run the load function with those pictures
  if (firstSubmition) {
    //if this is the user's first submission, add a button tha will
    document.getElementById("addMore").style.display = "block"; //make it appear
  }
}

//this functon is used to load a certain ammount of images with the nasa API.
function loadMore(index) {
  let doc = document.getElementById("tba"); //we get the div that is to be appended, hence tba
  $.get(
    `https://api.nasa.gov/planetary/apod?api_key=j0HpTSvPb8oAzIAkrYD8YTeHkOGfoceZpRuO39SP&count=${index}`,
    (data, status) => {
      //get request to the nasa apiwith ym key
      console.log(data); //console theb data just to be sure
      for (i = 1; i <= index; i++) {
        //for each images the users wants we will add them to the div grid system
        doc.innerHTML += `<div class="col-sm-12 col-md-6 col-lg-4">
            <div class="container">
                <h3 class="title">${data[i - 1].title}</h3>
                <img class="image" src="${data[i - 1].hdurl}"> <br>
                <span id="${ii}" onclick="heart(${ii})"><i class="far fa-heart"></i></span> 
                <span onclick=" copyURL('${
                  data[i - 1].hdurl
                }', ${ii}) "    ><i class="far fa-share"></i> <span class="share">Copied to Clipboard!</span><span>
                <h6 class="date">${data[i - 1].date}</h6>
                <p class="description"> ${data[i - 1].explanation}</p>
            </div>
            </div>`; //this is the general layout of the posts, easy to modify and improve
        ii++; //increase the global index used to keep trakc of IDs
      }
    }
  );
}

//this function likes and ulieks the hearts, it takes the id of the icon as a param
function heart(index) {
  let heart = document.getElementById(`${index}`); //seelct the heartfrom the html
  if (heart.class == "liked") {
    //if it is already liked, unlike it
    heart.innerHTML = '<i class="far fa-heart"></i>'; //change its class to the unliked icon
    heart.class = ""; //remove the property liked
  } else {
    //other wise we like it
    heart.innerHTML = '<i class="fas fa-heart"></i>'; //fill the icon
    heart.class = "liked"; //give it the property of liked
  }
}

//function that copies the url to the user's clipboard
function copyURL(url, index) {
  let $temp = $("<input>"); //creates a temporary html element that will hold the url to copy
  $("body").append($temp); //appends it to body
  $temp.val(url).select(); //selects it
  document.execCommand("copy"); //copies from the temo to the clipboard
  $temp.remove(); //removes the temporary elemtn now that it is no longer useful
  //console.log('index: ', index);
  //console.log('document.getElementsByClassName(): ', document.getElementsByClassName('share') )
  document.getElementsByClassName("share")[index].className += " shared"; //once copied we let the user know that it has been shared, a message will fade in and out thanks to the shared class
}
