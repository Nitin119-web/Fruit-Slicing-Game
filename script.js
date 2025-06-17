let playing = false;
let score;
let trialleft;
let fruits = ["apple","banana","berry","cherries","grapes","mango","orange","peach","pear","pineapple","watermelon"];
let action;
let steps;

$(()=>{
    $("#startreset").click(()=>{
        if(playing){
            location.reload();
            playing=false;
        }
        else{
            $("#gameover").hide();
            $("#startreset").text("Reset Game");
            playing=true;
            score=0;
            $("#scorevalue").text(score);
            $("#trialleft").show();
            trialleft=3;
            addHearts();
            startAction();
        }
    });
    function addHearts(){
    $("#trialleft").empty();
    for(i=0;i<trialleft;i++){
        $("#trialleft").append('<img src="Image/heart.png" class="heart"></img>');
    }
    }
    function startAction(){
        $("#fruit").show();
        chooseFruit();
        $("#fruit").css({"left":Math.round(650*Math.random()),"top":-70});
        steps=3+Math.round(Math.random()*4);
        // $("#fruit").addClass("spin");

        action=setInterval(()=>{
            $("#fruit").css("top",$("#fruit").position().top+steps);
            if($("#fruit").position().top>$("#fruitcontainer").height()){
                if(trialleft>1){
                    $("#fruit").show();
                chooseFruit();
                $("#fruit").css({"left":Math.round(650*Math.random()),"top":-30});
                trialleft--;
                addHearts();
                }
                else{
                    playing=false;
                    $("#startreset").text("Start Game");
                    $("#gameover").show();
                    $("#gameover").html("<p>Game Over!!!</p><p>Your Score is "+score+"</p>")
                    $("#trialleft").hide();
                    stopAction();
                }
            }
        },10)
    }
    function chooseFruit(){
        let rand = fruits[Math.round(fruits.length*Math.random())];
        // console.log(rand);
        $("#fruit").attr('src','Image/'+rand+'.png');
    }
    function stopAction(){
        clearInterval(action);
        $("#fruit").hide();
        // $("#fruit").removeClass("spin");

    }
    $("#fruit").off("mouseover").on("mouseover", function () {
    if (!playing) return;

    score++;
    $("#scorevalue").html(score);
    $("#slicesound")[0].play();

    clearInterval(action);

    // Animate bounce + explode + restart
    $(this).stop(true).animate({ top: "-=30" }, 100, function () {
        $(this).hide("explode", 200, function () {
            setTimeout(startAction, 400);
        });
    });
});

})
