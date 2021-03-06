var W,H;
var ctx,canvas;
var X = 0;
var Y = 0;
var Widget;
var square;
var etoiles = [];
var load = {masque:"masque",texte0:"texte0",texte1:"texte1",texte2:"texte2",texte3:"texte3",titre0:"titre0",titre1:"titre1",didon:"didon",achille:"achille",agamemnon:"agamemnon",amazone:"amazone",andromaque:"andromaque",antigone:"antigone",antiochus:"antiochus",ariane:"ariane",astyanax:"astyanax",berenice:"berenice",creon:"creon",didonImg:"didonImg",enee:"enee",hector:"hector",hemon:"hemon",hermione:"hermione",hyppolite:"hyppolite",jocaste:"jocaste",minos:"minos",oedipe:"oedipe",oreste:"oreste",pasiphae:"pasiphae",phedre:"phedre",pygmalion:"pygmalion",pyrrhus:"pyrrhus",roiTyr:"roiTyr",thesee:"thesee",titus:"titus",helene:"helene"};
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
    var list = ["masque","texte0","texte1","texte2","texte3","titre0","titre1","achille","agamemnon","ariane","astyanax","amazone","andromaque","antiochus","antigone","berenice","creon","didon","enee","didonImg","hector","hemon","hermione","hyppolite","jocaste","minos","oedipe","oreste","pasiphae","phedre","pygmalion","pyrrhus","roiTyr","thesee","titus","helene"];
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
            if (event.keyCode == 32) alert("Merci Mallory pour ton commentaire !");
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
        slide = 2;
    }
    else if (slide == 2){
         slide = 3;
        position = [[W/3,H/3,W/4,H/3*2,0],[W/3,H/3,W/2,H/3*2,0],[W/2,H/3*2,W/4*3,H/3*2,-100]];
    }
    else if (slide == 3){
        slide = 4;
    }
    else if (slide == 4){
        slide = 5;
        position = [[100,H/4,100,H/2,0],[W/4+50,H/2,W/4+50,H/4,-200],[W/2,H/2,W/2,H/4,-300],[100,H/2,W/4+50,H/2,-100],[W/4+50,H/2,W/2,H/2,-200],[W/2,H/2,W/4*3-50,H/2,-300],[W/4*3-50,H/2,W-100,H/2,-400],[W/4*3 + W/8 - 75,H/2,W/4*3 + W/8 - 75,H/4*3,-450],[W/4-50,H/2,W/4-70,H/2-20,-550],[W/4-50,H/2,W/4-70,H/2+20,-550],[W/2-100,H/2,W/2-120,H/2-20,-550],[W/2-100,H/2,W/2-120,H/2+20,-550],[W/4*3-150,H/2,W/4*3-170,H/2-20,-550],[W/4*3-150,H/2,W/4*3-170,H/2+20,-550]];
    }
    else if (slide == 5){
        slide = 6;
        position = [[W/4,H/2,W/2,H/2,0],[W/4*3,H/2,W/2,H/2,0]];
    }
    else if (slide == 6){
        slide = 7;
    }
    else if (slide == 7){
        slide = 8;
        position = [[W/4,H/4,W/2,H/4,0],[W/2,H/4,W/4,H/4,0],[W/8*3,H/4,W/2,H/2,-50],[W/8*3,H/4,W/4,H/2,-50],[W/2,H/2,W/4*3,H/2,-150]];
    }
    else if (slide == 8){
        slide = 9;
        position = [[W/4,H/4,W/2,H/4,100],[W/8*3,H/4,W/2,H/2,100],[W/8*3,H/4,W/4,H/2,100],[W/2,H/2,W/4*3,H/2,0],[W/4*3,H/2,W,H/2,-100],[W/8*7,H/2,W/8*7,H/4*3,-150],[W/2,H/2,W/8*7,H/4*3,-250],[W/8*7-100,H/4*3-43,W/8*7-150,H/4*3-43,-350],[W/8*7-100,H/4*3-43,W/8*7-100,H/4*3-93,-350]];
    }
    else if (slide == 9){
        slide = 10;
    }
    else if (slide == 10){
        slide = 11;
        position = [[100,H/4,100,H/2,0],[W/4+50,H/2,W/4+50,H/4,-200],[W/2,H/2,W/2,H/4,-300],[100,H/2,W/4+50,H/2,-100],[W/4+50,H/2,W/2,H/2,-200],[W/2,H/2,W/4*3-50,H/2,-300],[W/4*3-50,H/2,W-100,H/2,-400],[W/4*3 + W/8 - 75,H/2,W/4*3 + W/8 - 75,H/4*3,-450],[W/4-50,H/2,W/4-70,H/2-20,-550],[W/4-50,H/2,W/4-70,H/2+20,-550],[W/2-100,H/2,W/2-120,H/2-20,-550],[W/2-100,H/2,W/2-120,H/2+20,-550],[W/4*3-150,H/2,W/4*3-170,H/2-20,-550],[W/4*3-150,H/2,W/4*3-170,H/2+20,-550]];
    }
    
    else if (slide == 11){
        slide = 12;
        position = [[W/4,H/3,W/2,H/3,0],[W/2,H/3,W/4,H/3,0],[W/8*3,H/3,W/8*3,H/3*2,-50],[W/4*3,H/3,W/4*3,H/3*2,-100]];
    }
    else if (slide == 12){
        slide = 13;
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
        if (n >= 60){
            slide = 1;
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
    var Y = n*n+-25*n;
    return Y;
}

function slideB(){
    alert("Comment faire une bonne heroïne tragique de la mythologie ???");
    var f = function(t) {
        drawB(t);
        if (slide == 2) slideC();
        else window.requestAnimationFrame(f);
    };
    window.requestAnimationFrame(f);
}

function drawB(){
    drawFond();
    ctx.drawImage(load.titre0,W/2-250,H/2-80);
    ctx.drawImage(load.titre1,W/2-250,H/4*3-80);
}

function slideC(){
    alert("Une femme de lignée royale");
    var f = function(t) {
        drawC(t);
        if (slide == 3) slideD();
        else window.requestAnimationFrame(f);
    };
    window.requestAnimationFrame(f);
}

function drawC(){
    drawFond();
    ctx.globalAlpha = position[1]/100;
    ctx.drawImage(load.didonImg,W/2-200,H/2-200,400,400);
    ctx.globalAlpha = 1;
    if (position[1] < 100)position[1] += 2;
}

function slideD(){
    alert("Didon");
    var f = function(t) {
        drawD(t);
        if (slide == 4) slideE();
        else window.requestAnimationFrame(f);
    };
    window.requestAnimationFrame(f);
}

function drawD(){
    drawFond();
    drawGenea();
ctx.drawImage(load.roiTyr,W/3-125,H/3-50,250,100);
ctx.drawImage(load.pygmalion,W/4-125,H/3*2-50,250,100);
ctx.drawImage(load.enee,W/4*3-125,H/3*2-50,250,100);
    ctx.drawImage(load.didon,W/2-125,H/3*2-50,250,100);
}  

function drawGenea(){
    position.forEach(
        function (e){
            if (e[4] >= 0){
                ctx.strokeStyle  = "rgb(255,255,255)";
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(e[0],e[1]);
                ctx.lineTo(e[0] + (e[2]-e[0])*e[4]/100,e[1] + (e[3]-e[1])*e[4]/100);
                ctx.stroke();
            }
        if (e[4] <= 100) e[4] += 2;
       }
   );
}

function slideE(){
    alert("Une femme vertueuse");
    var f = function(t) {
        drawE(t);
        if (slide == 5) slideF();
        else window.requestAnimationFrame(f);
    };
    window.requestAnimationFrame(f);
}

function drawE(t){
    drawFond();
}

function slideF(){
    alert("Andromaque");
    var f = function(t) {
        drawF(t);
        if (slide == 6) slideG();
        else window.requestAnimationFrame(f);
    };
    window.requestAnimationFrame(f);
}

function drawF(){
    drawFond();
    drawGenea();
    ctx.drawImage(load.agamemnon,0,H/4-50,200,100);
    ctx.drawImage(load.helene,W/4-50,H/4-50,200,100);
    ctx.drawImage(load.achille,W/2-100,H/4-50,200,100);
    ctx.drawImage(load.oreste,0,H/2-50,200,100);
    ctx.drawImage(load.hermione,W/4-50,H/2-50,200,100);
    ctx.drawImage(load.pyrrhus,W/2-100,H/2-50,200,100);
    ctx.drawImage(load.andromaque,W/4*3-150,H/2-50,200,100);
    ctx.drawImage(load.hector,W-200,H/2-50,200,100);
    ctx.drawImage(load.astyanax,W/4*3 + W/8 - 175,H/4*3-50,200,100);
}

function slideG(){
    alert("Berenice");
    var f = function(t) {
        drawG(t);
        if (slide == 7) slideH();
        else window.requestAnimationFrame(f);
    };
    window.requestAnimationFrame(f);
}

function drawG(){
    drawFond();
    drawGenea();
    ctx.drawImage(load.antiochus,W/4-100,H/2-50,200,100);
    ctx.drawImage(load.berenice,W/2-100,H/2-50,200,100);
    ctx.drawImage(load.titus,W/4*3-100,H/2-50,200,100);
}

function slideH(){
    alert("Un amour inconditionnel");
    var f = function(t) {
        drawH(t);
        if (slide == 8) slideI();
        else window.requestAnimationFrame(f);
    };
    window.requestAnimationFrame(f);
}

function drawH(){
    drawFond();
}


function slideI(){
    alert("Ariane");
    var f = function(t) {
        drawI(t);
        if (slide == 9) slideJ();
        else window.requestAnimationFrame(f);
    };
    window.requestAnimationFrame(f);
}

function drawI(){
    drawFond();
    drawGenea();
    ctx.drawImage(load.phedre,W/4-100,H/2-50,200,100);
    ctx.drawImage(load.ariane,W/2-100,H/2-50,200,100);
    ctx.drawImage(load.thesee,W/4*3-100,H/2-50,200,100);
    ctx.drawImage(load.minos,W/2-100,H/4-50,200,100);
    ctx.drawImage(load.pasiphae,W/4-100,H/4-50,200,100);
}

function slideJ(){
    alert("Phedre");
    var f = function(t) {
        drawJ(t);
        if (slide == 10) slideK();
        else window.requestAnimationFrame(f);
    };
    window.requestAnimationFrame(f);
}

function drawJ(){
    drawFond();
    drawGenea();
    ctx.drawImage(load.ariane,W/4-100,H/2-50,200,100);
    ctx.drawImage(load.phedre,W/2-100,H/2-50,200,100);
    ctx.drawImage(load.thesee,W/4*3-100,H/2-50,200,100);
    ctx.drawImage(load.hyppolite,W/8*7-100,H/4*3-50,200,100);
    ctx.drawImage(load.minos,W/2-100,H/4-50,200,100);
    ctx.drawImage(load.pasiphae,W/4-100,H/4-50,200,100);
}

function slideK(){
    alert("La mort");
    var f = function(t) {
        drawK(t);
        if (slide == 11) slideL();
        else window.requestAnimationFrame(f);
    };
    window.requestAnimationFrame(f);
}

function drawK(){
    drawFond();
}

function slideL(){
    alert("Hermione");
    var f = function(t) {
        drawL(t);
        if (slide == 12) slideM();
        else window.requestAnimationFrame(f);
    };
    window.requestAnimationFrame(f);
}

function drawL(){
    drawFond();
    drawGenea();
    drawGenea();
    ctx.drawImage(load.agamemnon,0,H/4-50,200,100);
    ctx.drawImage(load.helene,W/4-50,H/4-50,200,100);
    ctx.drawImage(load.achille,W/2-100,H/4-50,200,100);
    ctx.drawImage(load.oreste,0,H/2-50,200,100);
    ctx.drawImage(load.hermione,W/4-50,H/2-50,200,100);
    ctx.drawImage(load.pyrrhus,W/2-100,H/2-50,200,100);
    ctx.drawImage(load.andromaque,W/4*3-150,H/2-50,200,100);
    ctx.drawImage(load.hector,W-200,H/2-50,200,100);
    ctx.drawImage(load.astyanax,W/4*3 + W/8 - 175,H/4*3-50,200,100);
}


function slideM(){
    alert("Antigone");
    var f = function(t) {
        drawM(t);
        if (slide == 13) slideM();
        else window.requestAnimationFrame(f);
    };
    window.requestAnimationFrame(f);
}

function drawM(){
    drawFond();
    drawGenea();
    ctx.drawImage(load.oedipe,W/4-100,H/3-50,200,100);
    ctx.drawImage(load.jocaste,W/2-100,H/3-50,200,100);
    ctx.drawImage(load.creon,W/4*3-100,H/3-50,200,100);
    ctx.drawImage(load.antigone,W/8*3-100,H/3*2-50,200,100);
    ctx.drawImage(load.hemon,W/4*3-100,H/3*2-50,200,100);
}

function drawFond() {
    ctx.fillStyle = "rgb(0,34,52)";
    ctx.fillRect(0,0,W,H);
}
