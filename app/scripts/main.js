$(function () {
    console.log('\'Allo \'Allo!');
    var alto = window.innerHeight;
    var $cap1 = $('#capitulo__1'),
        $cap2 = $('#capitulo__2'),
        $cap3 = $('#capitulo__3');

    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onLeave'
        }
    });

    $(document).ready(function () {
        var scene = new ScrollMagic.Scene({
            triggerElement: "#capitulo__1",
            duration: $cap1.find('.capitulo__wrap').innerHeight() - alto
        })
            .setPin("#capitulo__1 .capitulo__wrapGrph")
            .addIndicators({name: "1 pin (duration: 300)"})
            .addTo(controller),

        scene2 = new ScrollMagic.Scene({
            triggerElement: "#capitulo__2",
            duration: $cap2.find('.capitulo__wrap').innerHeight() - alto
        })
            .setPin("#capitulo__2 .capitulo__wrapGrph")
            .addIndicators({name: "2 pin (duration: 300)"})
            .addTo(controller),

        scene3 = new ScrollMagic.Scene({
            triggerElement: "#capitulo__3",
            duration: $cap3.find('.capitulo__wrap').innerHeight() - alto
        })
            .setPin("#capitulo__3 .capitulo__wrapGrph")
            .addIndicators({name: "3 pin (duration: 300)"})
            .addTo(controller);


        new ScrollMagic.Scene({triggerElement: "#sec1"})
            .setClassToggle("#capitulo__1", "active") // add class toggle
            .addIndicators() // add indicators (requires plugin)
            .addTo(controller);
    });

});