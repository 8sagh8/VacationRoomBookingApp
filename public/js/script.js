
/***********  PICTURES BANNER ************/
const image1  = document.querySelector("#slideshow1");
const image2  = document.querySelector("#slideshow2");
const image3  = document.querySelector("#slideshow3");
const image4  = document.querySelector("#slideshow4");
const image5  = document.querySelector("#slideshow5");
const image6  = document.querySelector("#slideshow6");

const SIZE = 6; // size of Array => total number of pics for banner
const filePathsArray = [];

for (let i = 1; i <= SIZE; ++i) //to create file paths
  filePathsArray.push(`img/banner/imgBanner`+i+`.jpg`);

let count1=0;
let count2=1;
let count3=2;
let count4=3;
let count5=4;
let count6=5;

const changePic = ()=>
{
    // to run function of changing pics, defining new index to image position
    image1.src=filePathsArray[count1];
    image2.src=filePathsArray[count2];
    image3.src=filePathsArray[count3];
    image4.src=filePathsArray[count4];
    image5.src=filePathsArray[count5];
    image6.src=filePathsArray[count6];

    // postincrement in indexes

    count1++;
    count2++;
    count3++;
    count4++;
    count5++;
    count6++;

    
    if(count1==filePathsArray.length)
    {
      count1=0;
    }

    if(count2==filePathsArray.length)
    {
      count2=0;
    }

    if(count3==filePathsArray.length)
    {
      count3=0;
    }

    if(count4==filePathsArray.length)
    {
      count4=0;
    }

    if(count5==filePathsArray.length)
    {
      count5=0;
    }

    if(count6==filePathsArray.length)
    {
      count6=0;
    }
}


setInterval(changePic, 800);

/*************** BUTTON TO HIDE VIDEO **************/

const divPara = document.querySelector(`#login`);

const functClose =()=>{
    const showVideo = document.querySelector(`#videoID`);
    const showLogin = document.querySelector(`#loginForm`);

    if (showVideo.style.display != "none"){
      showVideo.style.display = "none";
      showLogin.style.display = "block";
    } 

    else {}
}

divPara.addEventListener(`click`, functClose);