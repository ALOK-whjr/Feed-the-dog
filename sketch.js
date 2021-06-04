var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed;
var lastFed;
var time = "";
function preload(){
sadDog=loadImage("Dog.png");

happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed=createButton("Feed");
  feed.position(750,95);
  feed.mousePressed(feedDog);
  

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  getLastFed();
  
  
  if(lastFed === 0){
	  time = "12 am";
  } else if(lastFed >= 1&& lastFed <12){
	//lastFed  = lastFed;
		time = lastFed + " am";
	} else if(lastFed > 12){
		time = lastFed % 12 + " pm";
	} else if(lastFed === 12){
		time = "12 pm";
	}
  fill(0);
  textSize("34");
  text("Last fed : "+time,700,95)
  //write code to display text lastFed time here
  
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var hr = new Date().getHours()
  //write code here to update food stock and last fed time
  if(foodS > 0){
	  foodS--;
  }
  database.ref('/').update({
	Food:foodS ,
	feedTime:hr
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function getLastFed(){
  database.ref("feedTime").on("value",function(data){
	  lastFed = data.val();
  });
}