var pet,petimg,petimg2;
var database,foodS;
var lastFed;
function preload()
{
  petimg = loadImage("dogImg.png");
  petimg2 = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 500);
  pet = createSprite(900,300,5,5);
  pet.addImage(petimg);
  pet.scale =0.25;

  feed=createButton("feed dog")
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("add food")
  addFood.position(820,95);
  addFood.mousePressed(addFood);

  timeRef=database.ref("fedTime");
  timeRef.on("value",function(data){
    lastFed=data.val()
});

  food=new Food();
  food.getFoodStock();
}


function draw() {  
background("green");

food.display();

  drawSprites();

fill("white");
text("note:Press UP_ARROW key to feed Drago Milk",100,50);
text("food remaining:"+foodS,150,100);

if(lastFed>=12){
  text("Last fed at: "+lastFed%12+" p.m.",750,50);
}
else if(lastFed===0){
  text("Last fed at: 12 a.m.",750,50);
}
else{
  text("Last fed at: "+lastFed+" a.m.",750,50);
}

}

  function feedDog(){
    pet.addImage(petimg2);
    pet.x=850;
    if(foodS>=1){
      foodS=foodS-1;
    }
    food.updateStock(foodS);
    updateHour(hour());
  }

  function addFood(){
    pet.addImage(petimg);
    pet.x=850;
    if(foodS<20){
      foodS=foodS+1;
    }
    food.updateStock(foodS);
  }

  function updateHour(time){
    database.ref("/").update({
      fedTime:time
    })
  }