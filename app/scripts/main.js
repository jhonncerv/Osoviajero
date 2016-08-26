
$(function () {

    window.scrollTo(0,0);
    var alto = window.innerHeight;
    var control;

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

    var $sceneL = [], $sceneN = [], $sceneG = [];

    var app = {
        init: function () {
            this.cache();
            this.descktop();
        },
        cache: function () {
            $('.capitulo__texto p, .capitulo__texto blockquote').each(function (e) {
                new ScrollMagic.Scene({ triggerElement: this, duration: alto/2 })
                    .setTween(this, { y:'-=20%',  opacity: 1 })
                    .addTo(controllerEn);
            });
            $('.capitulo__ilustracion img').each(function (e) {
                new ScrollMagic.Scene({ triggerElement: this, duration: alto/2 })
                    .setTween(this, { x:'0%',  opacity: 1 })
                    .addTo(controllerEn);
            });

            $('.capitulo__pleca').each(function (e) {
                new ScrollMagic.Scene({ triggerElement: this, duration: alto/2 })
                    .setTween(this, { x : '0%',  opacity: 1 })
                    .addTo(controllerEn);
            });

            $('.capitulo__letra').each(function (e) {
                new ScrollMagic.Scene({ triggerElement: this, duration: alto/2 })
                    .setTween(this, { x : '0%',  opacity: 1 })
                    .addTo(controllerEn);
            });
            $('.capitulo__globo').each(function (e) {
                new ScrollMagic.Scene({ triggerElement: this, duration: alto })
                    .setTween(this, { y : '+=120%',  opacity: 1 })
                    .addTo(controllerEn);
            });
        },
        animaciones: function (dur) {
            control  = new ScrollMagic.Controller({
                globalSceneOptions: {
                    triggerHook: 'onLeave'
                }
            });
            $('.letra').each(function (i,e) {
                $(this).css('transition', 'none');
                $sceneL[i] = new ScrollMagic.Scene({
                    triggerElement: '#capitulo__' + Math.ceil((i+1)/2),
                    duration: $(this).parents('.capitulo').height() - dur
                })
                    .addIndicators({ name: 'letra' + i + ' (duration: ' + $(this).parents('.capitulo').height() + ')' })
                    .setTween($(this), { top : '-=10%' })
                    .addTo(control);
            });
            $('.nube').each(function (i,e) {
                $(this).css('transition', 'none');
                $sceneN[i] = new ScrollMagic.Scene({
                    triggerElement: '#capitulo__1',
                    duration: $(this).parents('.capitulo').height() - dur
                })
                    .setTween($(this), { left : '-='+ (2 + ((i+1) * 4)) +'%' })
                    .addTo(control);
            });
            $('.globo').each(function (i,e) {
                $(this).css('transition', 'none');
                $sceneG[i] = new ScrollMagic.Scene({
                    triggerElement: '#capitulo__1',
                    duration: $(this).parents('.capitulo').height() - dur
                })
                    .setTween($(this), { top : '+=10%' })
                    .addTo(control);
            });
            $('.abre').each(function (i, e) {
                $(this).css('transition', 'none');
                new ScrollMagic.Scene({
                    triggerElement: '#capitulo__2',
                    duration: $(this).parents('.capitulo').height() - dur
                })
                    .setTween($(this), { left : (i==1?'-':'+')+'=10%', top: (i==1?'-':'+')+'=5%' })
                    .addTo(control);
            });
        },
        descktop: function () {
            var $cap, $app = this;

            var scene = [], dur;
            for(var i = 1; i < 4; i++) {
                dur = (i<3?alto/2:200);
                $cap = $('#capitulo__' + i );
                scene[i-1] = new ScrollMagic.Scene({
                    triggerElement: '#capitulo__' + i,
                    duration: $cap.find('.capitulo__wrap').innerHeight() - alto
                })
                    .setPin('#capitulo__' + i + ' .capitulo__wrapGrph')
                    .addIndicators({ name: i + ' pin (duration: 300)' })
                    .addTo(controller);

                new ScrollMagic.Scene({
                    triggerElement: '#capitulo__'+i,
                    duration: $cap.find('.capitulo__wrap').innerHeight() - dur
                })
                    .setClassToggle('.animx_'+i, 'active')
                    .addIndicators()
                    .on('enter leave', function (e) {
                        console.log(e.type == "enter" ? "inside" : "outside");
                        if (e.type == 'enter'){
                            $('.letra, .nube, .globo, .abre').css('transition', '.5s all ease-out .5s');
                            setTimeout( function () {
                                $app.animaciones(dur);
                            }, 1200 );
                        } else {
                            console.log(control);
                            if(typeof control != 'undefined' && control != null && undefined != control ){
                                control.destroy(true);
                                console.log('destruido');
                            }
                            control = null;
                            console.log(control);
                            $($sceneL).each(function () {
                                this.destroy(true);
                            });
                            $sceneL = $sceneN = $sceneG = null;
                            $sceneL = $sceneN = $sceneG = [];
                            $('.letra, .nube, .globo, .abre').css('transition', '.5s all ease-out');
                        }
                    })
                    .addTo((controllerLa));
                new ScrollMagic.Scene({
                    triggerElement: '#capitulo__'+i,
                    duration: $cap.find('.capitulo__wrap').innerHeight() - (i<3?alto/2:200)
                })
                    .setClassToggle('#capitulo__'+i, 'hover')
                    .addIndicators()
                    .addTo((i==1?controller:controllerLa));
            }
        }

    };

    TweenMax.set('.capitulo__wrap', { opacity : 0, x : '-=100%' });
    TweenMax.set('.capitulo__globo', { y : '-=60%', opacity : 0 });
    TweenMax.set('.capitulo__letra', { x : '-=70%', opacity : 0 });
    TweenMax.set('.capitulo__pleca', { x : '-=20%', opacity : 0 });
    TweenMax.set('.capitulo h1', { y : '-=20%', opacity : 0 });
    TweenMax.set('.capitulo__ilustracion img:first-child', { x : '-=40%', opacity: 0 });
    TweenMax.set('.capitulo__ilustracion img:last-child', { x : '+=40%', opacity: 0 });
    TweenMax.set('.capitulo__texto p, .capitulo__texto blockquote', { y : '+=20%', opacity: 0 });

    $(document).ready(function () {

        var tlIntro = new TimelineMax({ onComplete: $.proxy( app.init, app ) })
            .to('.capitulo__wrap', 2, { opacity: 1, x : '+=100%'}, '+=.5s')
            .to('#capitulo__1 .capitulo__pleca', 1, { x : '0%',  opacity: 1 }, '-=.5')
            .to('#capitulo__1 .capitulo__letra', 1, { x : '0%',  opacity: 1 }, '-=.5')
            .to('#capitulo__1 h1', 1, { y : '0%',  opacity: 1 }, '-=.5')
            .to('#capitulo__1 .capitulo__texto p, #capitulo__1 .capitulo__texto blockquote', 1, { opacity: 1 }, '-=.5');

    });

});