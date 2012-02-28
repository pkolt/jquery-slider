/*!
 * Media Slider - jQuery Plugin
 * version: 0.2.1 (17/02/2012)
 * @requires jQuery v1.7 or later
 *
 * Examples at http://github.com/pkolt/jquery-slider
 * License: GPL 2.0
 *
 * Copyright 2012 Pavel Koltyshev - pkolt@mail.ru
 *
 */
(function($){
    var S = $.slider = function(){};

    $.extend(S, {
        version: '0.2.1',

        defaults: {
            autoPlay: false,
            showTitle: false,
            buttonPrev: null,
            buttonNext: null,
            speedIn: 500,
            speedOut: 500,
            interval: 3000,
            source: null
        },

        options: {

        },

        tmpl: {
            img: '<div style="visibility:hidden;"><img><span></span></div>',
            nav: '<ul style="display:none"></ul>',
            navItem: '<li><a href="#"></a></li>'
        },

        sel: {
            slider: '.md-slider',
            source: '.md-slider-source',
            nav: '.md-slider-nav',
            img: '.md-slider-img'
        },

        autoload: function(options){
            $(S.sel.slider).slider(options);
        },

        play: function(sl){
            sl.delay(sl.options.interval).queue(function(){
                S.next(sl);
                $(this).dequeue();
            }).queue(function(){
                    S.play(sl);
                    $(this).dequeue();
                });
        },

        stop: function(sl){
            sl.clearQueue();
            sl.stop();
        },

        next: function(sl){
            var index = S._getImgIndex(sl);
            if (index < S._getImgs(sl).size()){
                S.jumpto(sl, index + 1);
            } else {
                S.first(sl);
            }
        },

        prev: function(sl){
            var index = S._getImgIndex(sl);
            if (index > 0) {
                S.jumpto(sl, index - 1)
            } else {
                S.last(sl);
            }
        },

        first: function(sl){
            S.jumpto(sl, 1);
        },

        last: function(sl){
            S.jumpto(sl, S._getImgs(sl).size());
        },

        jumpto: function(sl, index){
            var cur = sl.find(S.sel.img).eq(index - 1);
            sl.find(S.sel.img + '.show').removeClass('show').fadeOut(sl.options.speedOut);
            cur.addClass('show').fadeIn(sl.options.speedIn);
            S._changeNavItem(sl);
        },

        _init: function(sl, options){
            options = options || {};
            options = sl.options = $.extend(S.defaults, options);
            var source = options.source;
            if (!$.isArray(source)){
                if (!source) source = S.sel.source;
                source = S._parseSource(sl, source);
            }
            if (source) {
                S._preload(sl, source);
                S._createNav(sl, source);
            }
        },

        _parseSource: function(sl, sel){
            var source = sl.find(sel).first();
            if (source.size()) {
                source.hide();
                return $.map(source.find('li'), function(val, i){
                    var a = $(val).find('a:first'),
                        url = $.trim(a.attr('href')),
                        title = $.trim(a.attr('title')),
                        html = $.trim(a.html());
                    return url ? {url: url, title: title, html: html} : null;
                });
            }
            return false;
        },

        _createNav: function(sl, source){
            var nav = $(S.tmpl.nav);
            var navClsName = S.sel.nav.slice(1, S.sel.nav.length);
            nav.addClass(navClsName);
            $.each(source, function(index, val){
                var navItem = $(S.tmpl.navItem);
                navItem.click({sl: sl}, function(event){
                    S.stop(sl);
                    S.jumpto(event.data.sl, index + 1);
                    return false;
                });
                nav.append(navItem);
            });
            sl.append(nav);
        },

        _changeNavItem: function(sl){
            var nav = sl.find(S.sel.nav);
            var index = S._getImgIndex(sl) - 1;
            nav.find('a').removeClass('hole');
            nav.find('li:eq(' + index + ')').find('a').addClass('hole');
        },

        _preload: function(sl, source){
            var width = sl.width(),
                height = sl.height(),
                imgClsName = S.sel.img.slice(1, S.sel.img.length);
            $.each(source, function(index, val){
                var imgCont = $(S.tmpl.img),
                    imgAttr = {width: width, height:height, src:val.url};
                imgCont.css({width: width, height:height}).attr('class', imgClsName);
                if (val.html && sl.options.showTitle) imgCont.find('span').html(val.html);
                if (val.title) $.extend(imgAttr, {title: val.title});
                imgCont.find('img').attr(imgAttr).load({sl: sl}, function(event){
                    S._eventPreloadFinish(event.data.sl, event);
                });
                sl.append(imgCont);
            });
        },

        _eventPreloadFinish: function(sl, event){
            var imgCont = $(event.target).parent();
            imgCont.css('visibility', 'visible').hide().addClass('finished');
            if (imgCont.index() == 1) {
                S.jumpto(sl, 1);
            } else if (S._isFinishedPreload(sl)) {
                S._eventPreloadAllFinish(sl);
            }
        },

        _eventPreloadAllFinish: function(sl){
            if (sl.options.buttonPrev) {
                $(sl.options.buttonPrev).click({sl: sl}, function(event){
                    S.stop(sl);
                    S.prev(event.data.sl);
                    return false;
                }).show();
            }
            if (sl.options.buttonNext) {
                $(sl.options.buttonNext).click({sl: sl}, function(event){
                    S.stop(sl);
                    S.next(event.data.sl);
                    return false;
                }).show();
            }
            $(S.sel.img + '.show').live('click', {sl: sl}, function(event){
                S.stop(sl);
                S.next(event.data.sl);
                return false;
            });

            sl.find(S.sel.nav).show();
            if(sl.options.autoPlay) S.play(sl);
        },

        _isFinishedPreload: function(sl){
            var all = S._getImgs(sl);
            var fin = all.filter('.finished');
            return all.size() - fin.size() == 0;
        },

        _getImgs: function(sl){
            return sl.find(S.sel.img);
        },

        _getImgIndex: function(sl){
            return sl.find(S.sel.img + '.show').first().index();
        }

    });

    $.fn.slider = function (options) {
        S._init(this, options);
        return this;
    }

})(jQuery);