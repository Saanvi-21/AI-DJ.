song = "";
leftY = "";
leftX = "";
rightY = "";
rightX = "";

scoreLeftWrist = "0";
scoreRightWrist = "0";

function preload() { 
    song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide()

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses)
}
function draw(){
    image(video,0,0,600,500);

    fill("#F8024C");
    stroke("#F8024C");

    if (scoreLeftWrist > 0.2){ 
    circle(leftX, leftY, 20);
    NumberleftY = Number(leftY);
    remove_decimals = floor(NumberleftY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = "+ volume;
    song.setVolume(volume);
    }

    if (scoreRightWrist > 0.2){

        circle(rightX ,rightY ,20);

        if(rightY >0 && rightY <= 100)
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        if(rightY >100 && rightY <= 200)
        {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        if(rightY >200 && rightY <= 300)
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        if(rightY >300 && rightY <= 400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        if(rightY >400 && rightY <= 500)
        {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1); 
}
function modelLoaded(){
    console.log("PoseNet is Intialized")
}
function gotPoses(results){
    if (results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("score of leftWrist = "+ scoreLeftWrist + "score of RightWrist = "+ scoreRightWrist);
        
        leftX = results[0].pose.leftWrist.x;
        leftY = results[0].pose.leftWrist.y;
        console.log("left wrist X = " + leftX + " left wrist Y = " + leftY);

        rightX = results[0].pose.rightWrist.x;
        rightY = results[0].pose.rightWrist.y;
        console.log("right wrist X = " + rightX + " right wrist Y = " + rightY);

    }
}