var newExplosion = function(x,y,tx,ty,s,color,n){
    var Widget = require("wdg");
    var time = 4;
    var random = 1;
    var v = 0;
    var colorset = [["rgba(229,179,24,1);rgba(150,35,38,1);rgba(150,35,38,0)","rgba(216,140,28,1);rgba(119,35,40,1);rgba(119,35,40,0)"],["rgba(50,50,50,1);rgba(0,0,0,1);rgba(0,0,0,0)","rgba(255,255,255,1);rgba(200,200,200,1);rgba(200,200,200,0)"]];

    var square = new Widget({id: "square"});

    var h = Widget.svg({
        preserveAspectRatio: 'xMidYMid',
        width: s,
        height: s,
        viewBox: "0 0 100 100"
    });
    h.addClass("nuage");

    h.append(
        Widget.svg('g',{
            stroke: "none",
            "stroke-width": 0.1,
            opacity: 1,
            transform: "rotate(360, 50, 50)"
        }).append(
            Widget.svg('animateTransform', {
                attributeName: "transform",
                attributeType: "XML",
                type: "rotate",
                values: "0,50,50;-"+rnd(3)+3+",50,50",
                dur: time,
                repeatCount: "1"
            }), 
            Widget.svg('path', {
                d: "M50,20C60,10,100,30,85,50C100,60,80,100,45,80C40,87,-5,80,10,50C-10,30,30,0,50,20",
                fill: "rgba(229,179,24,0)"
            }).append(
                Widget.svg('animate', {
                    attributeName: "fill",
                    dur: time,
                    repeatCount: "1",
                    values: colorset[color][0]
                }),
                Widget.svg('animate', {
                    attributeName: "d",
                    dur: time,
                    repeatCount: "1",
                    values: "M50,20C60,10,100,30,85,50C100,60,80,100,45,80C40,87,-5,80,10,50C-10,30,30,0,50,20;M40,17C50,0,90,20,75,49C84,77,66,83,46,71C40,87,-5,80,10,50C-10,30,30,0,40,17;M40,17C50,0,90,20,75,49C84,77,66,83,46,71C40,87,-5,80,10,50C-10,30,30,0,40,17"
                })) ,
            Widget.svg('path', {
                d: "M70,40C63,48,45,30,53,22C60,12,98,32,80,52C100,60,70,98,44,77C40,82,3,80,13,50C-5,30,25,5,50,20C40,30,60,47,70,40",
                fill: "rgba(216,140,28,0)"
            }).append(
                Widget.svg('animate', {
                    attributeName: "fill",
                    dur: time,
                    repeatCount: "1",
                    values: colorset[color][1]
                }),
                Widget.svg('animate', {
                    attributeName: "d",
                    dur: time,
                    repeatCount: "1",
                    values: "M70,40C63,48,45,30,53,22C60,12,98,32,80,52C100,60,70,98,46,76C40,82,3,80,13,50C-5,30,25,5,50,20C40,30,60,47,70,40C70,40,70,40,70,40;M60,30C67,48,35,29,43,21C50,2,88,22,70,48C77,70,60,78,46,66C40,82,3,80,13,50C-5,30,20,8,40,17C30,27,60,47,63,37C64,33,61,31,60,30;M60,30C67,48,35,29,43,21C50,2,88,22,70,48C77,70,60,78,46,66C40,82,3,80,13,50C-5,30,20,8,40,17C30,27,60,47,63,37C64,33,61,31,60,30"
                }))
        )
    ).css({
        position: "absolute",
        left: x,
        top: y
    });
    h.rect();
    window.setTimeout(function () {
        h.css({
            left: tx,
            top: ty
        });
    });
    console.info("[nuage] h.css('left')=...", h.css('left'));
    var timeOut = window.setTimeout(function(){
        h.detach();
    },time * 1000);
    square.append(h);
}
