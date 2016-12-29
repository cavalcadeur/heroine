var W,H;
var ctx,canvas;
var X = 0;
var Y = 0;
var Widget;
var square;
var etoiles = [];
var load = {masque:"masque",texte0:"texte0",texte1:"texte1",texte2:"texte2",texte3:"texte3"};
var lettres = [];
var constellations = [];
var slide = 0;
var event = 0;
var position = [0,0];
var texte = [["texte1",-300,0,0,1],["texte2",-500,0,0,1]];
var bru = 2;
var numbers = [];
var n = 0;

// programme

function rnd(max){
    return Math.floor(Math.floor(Math.random()*max));
}

function resize(){
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.setAttribute("width",W);
    canvas.setAttribute("height",H);
}

function chargement(){
    var list = ["masque","texte0","texte1","texte2","texte3"];
    var n = list.length;
    list.forEach(
        function (e){
            var IHateSalson = "images/" + load[e] + ".png";
            load[e] = new Image();
            load[e].src = IHateSalson;
            load[e].onload = function(){
                n -= 1;
                if (n == 0) slideA();
            };
        }
    );
}

function start(){
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    W = canvas.width;
    H = canvas.height;
    resize();
    Widget = require("wdg");
    square = new Widget({id: "square"});
    document.addEventListener(
        "mouseup",
        function (event){
            touching();
            
        }
    );
    document.addEventListener(
        "keyup",
        function (event){
            resize();            
        }
    );
    console.log(W);
    console.log(H);
//    alert("Bienvenue dans cette exposé dédié à l'astronomie. Pour ajuster la taille de l'écran, appuyer sur n'importe quel touche. Pour passer à la diapositive suivante, cliquez.");
    chargement();
}

function touching(x,y){
    if (slide == 0){
        event = 1;
        n = 0;
        position = [0,H/2];
    }
    else if (slide == 1){
        disalert();
        position = [100,0];
        event = 2;
    }
    else if (slide == 2){
        if (event == 2){
            position = [0,0];
            event = 3;
        }
        else if (event == 4){
            event = 5;
        }
        else if (event == 5){
            event = 6;
            position = [0,0];
        }
        else if (event == 7){
            slide = 3;
        }
    }
    else if (slide == 3){
        if (event == 7){
            event += 1;
            position = [-100,-200,-300,-400,-500];
        }
        else if (event == 8){
            event += 1;
            position = [100];

        }
        else if (event == 9){
            slide += 1;
        }
    }
    else if (slide == 4){
        slide = 5;
    }
    else if (slide == 5){
        if (event == 9){
            event = 10;
            position[2] = 0;
            alert("L'école d'Athènes");
        }
        else if (event == 10){
            event = 11;
            alert("L'école d'Alexandrie");
        }
        else if (event == 11){
            slide = 6;
        }
    }
    else if (slide == 6){
        if (event == 11){
            disalert();
            event = 12;
        }
        else if (event == 12){
            slide = 7;
        }

    }
    else if (slide == 7){
        if (event == 12){
            disalert();
            slide = 8;
        }
    }
    else if (slide == 8){
        if (event == 12){
            disalert();
            event = 13;
        }
    }
}

function slideA(){
    n = 0;
    var f = function(t) {
        drawA(t);
        if (slide == 1) slideB();
        else window.requestAnimationFrame(f);
    };
    window.requestAnimationFrame(f);
}

function drawA(t) {
    drawFond();
    if (event == 0){
        var nTr = 3;
        for (var i = 0;i<4;i++){
            for (var j = 0;j<nTr;j++){
                ctx.globalAlpha = 1 - j/nTr;
                ctx.drawImage(load[("texte"+i)],ligne(n-j*6,i)-200,(H/5)*(i+1)-100);
            }
        }
    }
    else {
        var nTr = 3;
        for (var i = 0;i<4;i++){
            for (var j = 0;j<nTr;j++){
                ctx.globalAlpha = 1 - j/nTr;
                ctx.drawImage(load[("texte"+i)],courbeX(n-j*3,i)-200,(H/5)*(i+1) + courbeY(n-j*3,i)-100);
            }
        }
    }
    ctx.globalAlpha = 1;
    n += 1;
}

function ligne(n,i){
    if (n > 50){
        return W/2;
    }
    else {
        var N = (i%2)*2-1;
        return (W/2 - N*(W/2+200)) + (N*(W/2+200))/50*n;
    }
}

function courbeX(n,i){
    var N = (i%2)*2-1;
    return W/2 + N*n*5;
}

function courbeY(n,i){
    var Y = n*n+-20*n;
    return Y;
}

function slideB(){
    var f = function(t) {
        drawB(t);
        if (slide == 2) slideC();
        else window.requestAnimationFrame(f);
    };
    window.requestAnimationFrame(f);
}

function drawB(){
    drawFond();
    texte.forEach(
        function (e,i){
            ctx.drawImage(load[e[0]],W/2-400,e[1]-200);
            if (e[4] == 1){
                e[1] += e[2];
                e[2] += 1;
                if (e[1] >= e[3]) {
                    e[2] = (e[2]/2)*-1;
                    if (e[2] > -1) {
                        e[4] = 0;
                        bru -= 1;
                        if (bru == 0) alert("Comment l'astronomie a bouleversé la vision du monde dans l'antiquité ???");
                    }
                }
            }
            else if (event == 2){
                e[1] += e[2];
                e[2] += 1;
                position[0] -= i;
                if (position[0] == 0){
                    disalert();
                    slide = 2;
                }
            }
        }
    );
}

function slideC(){
    var f = function(t) {
        drawC(t);
        if (slide == 3) slideD();
        else window.requestAnimationFrame(f);
    };
    window.requestAnimationFrame(f);
}

function drawC(){
    drawFond();
    if (event == 2) ctx.drawImage(load.astro,W/2-400,H/3-100);
    else if (event == 3){
        ctx.drawImage(load.astro,W/2-400,H/3-100);
        ctx.globalAlpha = position[0];
        ctx.drawImage(load.etyA,W/2-400 - position[1]*2,H/3-100+position[1]);
        ctx.drawImage(load.etyB,W/2-400 + position[1]*2,H/3-100+position[1]);
        position[0] += 0.01;
        position[1] += 1;
        if (position[0] >= 1) {
            event = 4;
        }
        ctx.globalAlpha = 1;
    }
    else if (event == 4){
        ctx.drawImage(load.astro,W/2-400,H/3-100);
        ctx.drawImage(load.etyA,W/2-400 - position[1]*2,H/3-100+position[1]);
        ctx.drawImage(load.etyB,W/2-400 + position[1]*2,H/3-100+position[1]);
    }
    else if (event == 5){
        ctx.drawImage(load.astro,W/2-400,H/3-100);
        ctx.drawImage(load.etyD,W/2-400,H/2-100);
        ctx.drawImage(load.etyC,W/2-400,H/3*2-100);
    }
    else if (event == 6){
        ctx.save();
        ctx.translate(W/2,H/2);
        ctx.scale(1-position[0]/30,1);
        ctx.drawImage(load.astro,-400,H/3-100-H/2);
        ctx.drawImage(load.etyD,-400,-100);
        ctx.drawImage(load.etyC,-400,H/3*2-100-H/2);
        ctx.restore();
        position[0] += 1;
        if (position[0] == 31) event = 7;
    }
    else if (event == 7){
        ctx.save();
        ctx.translate(W/2,H/2);
        ctx.scale(1-position[0]/30,1);
        ctx.drawImage(load.t1,-400,H/3-100-H/2);
        ctx.drawImage(load.t2,-400,-100);
        ctx.drawImage(load.t3,-400,H/3*2-100-H/2);
        ctx.restore();
        position[0] -= 1;
        if (position[0] == -1) position[0] = 0;
    }
}

function slideD(){
    position[2] = 0;
    position[3] = 0;
    position[4] = 0;
    var f = function(t) {
        drawD(t);
        if (slide == 4) slideE();
        else window.requestAnimationFrame(f);
    };
    window.requestAnimationFrame(f);
}

function drawD(){
    drawFond();
    drawCons();
    if (event == 7){
        position[0] += 1;
        if (position[0] == 50 && numbers.length > 10){
            position[4] += rnd(2)+1;
            var hh = rnd(numbers.length);
            position[2] = numbers[hh];
            var distance = W/6;
            while (Math.hypot(etoiles[position[1]].x - etoiles[position[2]].x,etoiles[position[1]].y - etoiles[position[2]].y) > distance || position[1] == position[2]){
                var hh = rnd(numbers.length);
                position[2] = numbers[hh];
                distance += 15;
            }
            numbers.splice(hh,1);
            if (position[4] > 4){
                position[2] = position[3];                

            }
            constellations.push({depart:position[1],fin:position[2],ach:0});
            position[0] = -150;
            position[1] = position[2] + 0;
            if (position[4] > 5){
                var hh = rnd(numbers.length);
                position[1] = numbers[hh];
                numbers.splice(hh,1);
                position[3] = position[1];
                position[4] = 0;
            }
        }
    }
    else if (event == 8){
        ctx.globalAlpha = 1;
        position.forEach(
            function(e,i){
                if (e < H/2){
                    position[i] += 3;
                }
                ctx.drawImage(load["plan" + i],W/6 * (i+1) - 100,e-load["plan" + i].height / 2);

            }
        );
    }
    else if (event == 9){
        position[0] -= 1;
        if (position[0] == -1) position[0] = 0;
        ctx.globalAlpha = position[0]/100;
        for (var i = 0;i<5;i++){
            ctx.drawImage(load["plan" + i],W/6 * (i+1) - 100,H/2-load["plan" + i].height / 2 + 2);
        }
        ctx.globalAlpha = 1 - position[0]/100;
        ctx.drawImage(load.sunMoon,W/2 - 300,H/2 - 225);
    }
}

function slideE(){
    alert("L'école ionienne");
    position = [];
    for (var i = 0;i<50;i++){
        var hh = rnd(600)+W/2-300;
        var gg = rnd(300);
        position.push([hh,H/2 -50 + gg,rnd(300)/100,gg]);
    }
    var f = function(t) {
        drawE(t);
        if (slide == 5) slideF();
        else window.requestAnimationFrame(f);
    };
    window.requestAnimationFrame(f);
}

function drawE(t){
    drawFond();
    position.forEach(
        function(e,i){
            ctx.globalAlpha = 1 - e[3]/300;
            ctx.save();
            ctx.translate(e[0],e[1]);
            ctx.rotate(e[2]);
            ctx.drawImage(load.fum,-75,-75);
            ctx.restore();
            e[1] += 0.8;
            e[2] += 0.02;
            e[3] += 1;
            e[0] -= (W/2 - e[0])/500;
            if (e[3] == 300) {
                var hh = rnd(600)+W/2-300;
                position[i] = [hh,H/2 - 50 + rnd(200) + (hh-W/2)/10,rnd(300)/100,0];
            }
        }
    );
    ctx.globalAlpha = 1;
    ctx.drawImage(load.plan,W/2-300,H/2-175 + Math.sin(t/1000)*8 - 4);
}

function slideF(){
    alert("L'école pythagoricienne");
    position = [W/2,-1];
    var f = function(t) {
        drawF(t);
        if (slide == 6) slideG();
        else window.requestAnimationFrame(f);
    };
    window.requestAnimationFrame(f);
}

function drawF(){
    drawFond();
    var size = ((W/2 - W/5) - Math.abs(W/2-position[0]))/1500;
    if (position[1] == 1) {
        ctx.save();
        ctx.translate(position[0],H/2);
        if (event >= 10) {
            ctx.rotate(position[2]);
            position[2] += 0.05;
        }
        ctx.scale(1-size,1-size);
        ctx.drawImage(load.terre,-100,-100);
        ctx.restore();
    }
    ctx.drawImage(load.sun,W/2-200,H/2-200);
    if (position[1] == -1) {
        ctx.save();
        ctx.translate(position[0],H/2);
        if (event >= 10) {
            ctx.rotate(position[2]);
            position[2] += 0.05;
        }
        ctx.scale(1+size,1+size);
        ctx.drawImage(load.terre,-100,-100);
        ctx.restore();
    }
    position[0] += position[1]*(15-(Math.abs(W/2 - position[0])/(W/2 - W/5))*8);
    if (position[0] >= W/5 * 4) position[1] = -1;
    else if (position[0] <= W/5) position[1] = 1;
    //console.log(position[0]);
}

function slideG(){
    alert("II) Le cas des comètes.");
    position = [W/2,H/2,0,0,0];
    constellations = [];
    var f = function(t) {
        drawG(t);
        if (slide == 7) slideH();
        else window.requestAnimationFrame(f);
    };
    window.requestAnimationFrame(f);
}

function drawG(){
    drawFond();
    constellations.forEach(
        function(e,i){
            if (e.t == 0){
                constellations.splice(i,1);
            }
            else{
                ctx.globalAlpha = e.t / 40;
                ctx.save();
                ctx.translate(e.x,e.y);
                ctx.rotate(e.r);
                ctx.drawImage(load.com,-20,-20);
                ctx.restore();
                constellations[i].r += 0.3;
                constellations[i].t -= 1;
            }
        }
    );
    ctx.save();
    ctx.translate(position[0],position[1]);
    ctx.rotate(position[2]);
    ctx.drawImage(load.comete,-52,-52);
    ctx.restore();
    position[3] += rnd(3) - 1;
    if (position[3] > 5) position[3] = 5;
    if (position[3] < -5) position[3] = -5;
    position[2] += position[3]/40;
    position[0] += Math.cos(position[2])*10;
    position[1] += Math.sin(position[2])*10;
    if (position[1] > H+52){
        position[3] = 0;
        position[2] = -Math.PI/2;
    }
    if (position[1] < 0){
        position[3] = 0;
        position[2] = Math.PI/2;
    }
    if (position[0] > W+52){
        position[3] = 0;
        position[2] = Math.PI;
    }
    if (position[0] < 0){
        position[3] = 0;
        position[2] = 0;
    }
    position[4] += 1;
    if (position[4]%2 == 0) {
        constellations.push({x:position[0],y:position[1],r:rnd(10)/10,t:40});
    }
}

function slideH(){
    position = [W/2,H/2,0,0,0];
    constellations = [];
    var f = function(t) {
        drawH(t);
        if (slide == 8) slideI();
        else window.requestAnimationFrame(f);
    };
    window.requestAnimationFrame(f);
}

function drawH(){
    drawFond();
    ctx.drawImage(load.aristote,W/2-45,H/2-290);
    ctx.drawImage(load.terre,W/2 - 100,H/2 - 100);
}


function slideI(){
    alert("Conclusion");
    position = [];
    constellations = [];
    var f = function(t) {
        drawI(t);
        window.requestAnimationFrame(f);
    };
    window.requestAnimationFrame(f);
}

function drawI(){
    drawFond();
    if (event == 13){
        ctx.drawImage(load.final,0,0,W,H);
    }
}

function drawCons(){
    ctx.strokeStyle = "rgb(255,255,250)";
    ctx.globalAlpha = 0.6;
    constellations.forEach(
        function (e){
            if (event == 7){
                if (e.ach < 100)e.ach += 0.5;
            }
            else {
                if (e.ach > 0)e.ach -= 1;
                if (e.ach < 0) e.ach = 0;
            }
            ctx.beginPath();
            ctx.moveTo(etoiles[e.depart].x,etoiles[e.depart].y);
            ctx.lineTo(etoiles[e.depart].x + (etoiles[e.fin].x - etoiles[e.depart].x)*(e.ach/100),etoiles[e.depart].y + (etoiles[e.fin].y - etoiles[e.depart].y)*(e.ach/100));
            ctx.closePath();
            ctx.stroke();
        }
    );

}

function drawFond() {
    ctx.fillStyle = "rgb(0,34,52)";
    ctx.fillRect(0,0,W,H);
}
