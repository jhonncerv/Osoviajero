
$(function () {
    var alto = window.innerHeight;
    var $cap1 = $('#capitulo__1'),
        $cap2 = $('#capitulo__2'),
        $cap3 = $('#capitulo__3');

    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onLeave'
        }
    });
    var controllerEn = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onEnter'
        }
    });
    var controllerLa = new ScrollMagic.Controller();
    var control;

    var $sceneL = [], $sceneN = [], $sceneG = [];
    var $letra = $('.letra');

    function animaciones() {
        control  = new ScrollMagic.Controller({
            globalSceneOptions: {
                triggerHook: 'onLeave'
            }
        });
        $letra.each(function (i,e) {
            $(this).css('transition', 'none');
            $sceneL[i] = new ScrollMagic.Scene({
                triggerElement: '#capitulo__' + Math.ceil((i+1)/2),
                duration: $(this).parents('.capitulo').height()
            })
                .addIndicators({ name: 'letra' + i + ' (duration: ' + $(this).parents('.capitulo').height() + ')' })
                .setTween($(this), { top : '-=10%' })
                .addTo(control);
        });
        $('.nube').each(function (i,e) {
            $(this).css('transition', 'none');
            $sceneN[i] = new ScrollMagic.Scene({
                triggerElement: '#capitulo__1',
                duration: $(this).parents('.capitulo').height()-100
            })
                .setTween($(this), { left : '-='+ (2 + ((i+1) * 4)) +'%' })
                .addTo(control);
        });
        $('.globo').each(function (i,e) {
            $(this).css('transition', 'none');
            $sceneG[i] = new ScrollMagic.Scene({
                triggerElement: '#capitulo__1',
                duration: $(this).parents('.capitulo').height()-100
            })
                .setTween($(this), { top : '+=10%' })
                .addTo(control);
        });
        $('.abre').each(function (i, e) {
            $(this).css('transition', 'none');
            new ScrollMagic.Scene({
                triggerElement: '#capitulo__2',
                duration: $(this).parents('.capitulo').height()-100
            })
            .setTween($(this), { left : (i==1?'-':'+')+'=10%', top: (i==1?'-':'+')+'=5%' })
            .addTo(control);
        })
    }

    $(document).ready(function () {
        var scene = new ScrollMagic.Scene({
            triggerElement: '#capitulo__1',
            duration: $cap1.find('.capitulo__wrap').innerHeight() - alto
        })
            .setPin('#capitulo__1 .capitulo__wrapGrph')
            .addIndicators({ name: '1 pin (duration: 300)' })
            .addTo(controller),

        scene2 = new ScrollMagic.Scene({
            triggerElement: '#capitulo__2',
            duration: $cap2.find('.capitulo__wrap').innerHeight() - alto
        })
            .setPin('#capitulo__2 .capitulo__wrapGrph')
            .addIndicators({ name: '2 pin (duration: 300)' })
            .addTo(controller),

        scene3 = new ScrollMagic.Scene({
            triggerElement: '#capitulo__3',
            duration: $cap3.find('.capitulo__wrap').innerHeight() - alto
        })
            .setPin('#capitulo__3 .capitulo__wrapGrph')
            .addIndicators({ name: '3 pin (duration: 300)' })
            .addTo(controller);
        for(var i = 1; i < 4; i++) {
            new ScrollMagic.Scene({
                triggerElement: '#capitulo__'+i,
                duration: $('#capitulo__' + i ).find('.capitulo__wrap').innerHeight() - (i<3?alto/2:200)
            })
            .setClassToggle('.animx_'+i, 'active')
            .addIndicators()
            .on('enter leave', function (e) {
                //console.log(e.type == "enter" ? "inside" : "outside");
                if (e.type == 'enter'){
                    $('.letra, .nube, .globo, .abre').css('transition', '.5s all ease-out .5s');
                    setTimeout( animaciones, 1200 );
                } else {
                    control.destroy(true);
                    control = null;
                    $sceneL = $sceneN = $sceneG = [];
                    $('.letra, .nube, .globo, .abre').css('transition', '.5s all ease-out');
                }
            })
            .addTo((controllerLa));
            new ScrollMagic.Scene({
                triggerElement: '#capitulo__'+i,
                duration: $('#capitulo__' + i ).find('.capitulo__wrap').innerHeight() - (i<3?alto/2:200)
            })
            .setClassToggle('#capitulo__'+i, 'hover')
            .addIndicators()
            .addTo((i==1?controller:controllerLa));
        }

        TweenMax.set('.capitulo__texto p, .capitulo__texto blockquote', { y : '+=20%', opacity:0 });
        var $tex = $('.capitulo__texto p, .capitulo__texto blockquote');
        $tex.each(function (e) {
            new ScrollMagic.Scene({ triggerElement: this, duration: alto/2 })
                .setTween(this, { y:'-=20%',  opacity: 1 })
                .addTo(controllerEn);
        });

        TweenMax.set('.capitulo__ilustracion img:first-child', { x : '-=40%', opacity:0 });
        TweenMax.set('.capitulo__ilustracion img:last-child', { x : '+=40%', opacity:0 });
        $('.capitulo__ilustracion img').each(function (e) {
            new ScrollMagic.Scene({ triggerElement: this, duration: alto/2 })
                .setTween(this, { x:'0%',  opacity: 1 })
                .addTo(controllerEn);
        });

        TweenMax.set('.capitulo__pleca', { x : '-=20%', opacity : 0 });
        $('.capitulo__pleca').each(function (e) {
            new ScrollMagic.Scene({ triggerElement: this, duration: alto/2 })
                .setTween(this, { x : '0%',  opacity: 1 })
                .addTo(controllerEn);
        });

        TweenMax.set('.capitulo__letra', { x : '-=70%', opacity : 0 });
        $('.capitulo__letra').each(function (e) {
            new ScrollMagic.Scene({ triggerElement: this, duration: alto/2 })
                .setTween(this, { x : '0%',  opacity: 1 })
                .addTo(controllerEn);
        });
        TweenMax.set('.capitulo__globo', { y : '-=60%', opacity : 0 });
        $('.capitulo__globo').each(function (e) {
            new ScrollMagic.Scene({ triggerElement: this, duration: alto })
                .setTween(this, { y : '+=120%',  opacity: 1 })
                .addTo(controllerEn);
        });

    });

});