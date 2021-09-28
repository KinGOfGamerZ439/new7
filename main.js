img="";
status ="";
objects=[];
function preload()
{
    img=loadImage('123.jpg');
}
function setup()
{
    canvas=createCanvas(640, 420);
    canvas.center();
    objectdetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";
}
function draw()
{
    image(img, 0, 0, 640, 420);
    if(status != "")
    {
        for(i=0;i<objects.length; i++)
        {
            document.getElementById("status").innerHTML="status: objects detected";
            fill("#0000ff");
            percent= floor(objects[i].confidence*100);
            text(objects[i].label+""+ percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#0000ff");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    
} 

function modelLoaded()
{
    console.log("model Is Loaded");
    status=true;
    objectdetector.detect(img, gotresult);
}
function gotresult(error, results)
{
   if(error)
   {
       console.log(error);
   }
    console.log(results);
    objects = results;
}