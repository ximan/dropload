/**
 * dropload
 * 西门
 * 20141024 v0.1.0
 */

;(function($){
    'use strict';
    var args = {
            loadClass : 'dropload-box',                                     // 下拉容器class
            refreshDOM : '<div class="dropload-refresh">↓下拉刷新</div>',    // 下拉DOM
            updateDOM : '<div class="dropload-update">↑释放更新</div>',      // 更新DOM
            loadDOM : '<div class="dropload-load">○加载中...</div>',         // 加载DOM
            direction : 'up',                                               // 加载内容方向
            distance : 50                                                   // 下拉距离
        },
        _startY = 0,
        _moveY = 0,
        _curY = 0,
        _offsetY = 0,
        _loadHeight = 0,
        _childrenHeight = 0,
        _scrollTop = 0,
        insertDOM = false,
        loading = false,
        loadName = '';
    $.fn.dropload = function(options){
        new MyDropLoad(this, options);
        return this;
    };
    var MyDropLoad = function(element, options){
        var me = this;
        me.$element = $(element);
        me.init(element, options);
    };

    // 初始化
    MyDropLoad.prototype.init = function(element, options){
        var me = this;
        me.options = $.extend({}, args, options);
        loadName = '.'+me.options.loadClass;
        // 绑定触摸
        me.$element.on('touchstart',function(e){
            if(loading){
                return;
            }
            me.fnTouches(e);
            me.fnTouchstart(e);
        });
        me.$element.on('touchmove',function(e){
            if(loading){
                return;
            }
            me.fnTouches(e);
            me.fnTouchmove(e);
        });
        me.$element.on('touchend',function(){
            if(loading){
                return;
            }
            me.fnTouchend();
        });
    };

    // touches
    MyDropLoad.prototype.fnTouches = function(e){
        if(!e.touches){
            e.touches = e.originalEvent.touches;
        }
    };

    // touchstart
    MyDropLoad.prototype.fnTouchstart = function(e){
        var me = this;
        _startY = e.touches[0].pageY;
        _loadHeight = me.$element.height();
        _childrenHeight = me.$element.children().height();
        _scrollTop = me.$element.scrollTop();
    };

    // touchmove
    MyDropLoad.prototype.fnTouchmove = function(e){
        _curY = e.touches[0].pageY;
        _moveY = _curY - _startY;
        var me = this,
            _absMoveY = Math.abs(_moveY);
        // 加载上放
        if(me.options.direction == 'up' && _scrollTop <= 0 && _moveY > 0){
            e.preventDefault();
            if(!insertDOM){
                me.$element.prepend('<div class="'+me.options.loadClass+'"></div>');
                insertDOM = true;
            }
            fnTransition($(loadName),0);
            // 下拉
            if(_absMoveY <= me.options.distance){
                _offsetY = _absMoveY;
                $(loadName).html('').append(me.options.refreshDOM);
            // 指定距离 < 下拉距离 < 指定距离*2
            }else if(_absMoveY > me.options.distance && _absMoveY <= me.options.distance*2){
                _offsetY = me.options.distance+(_absMoveY-me.options.distance)*0.5;
                $(loadName).html('').append(me.options.updateDOM);
            // 下拉距离 > 指定距离*2
            }else{
                _offsetY = me.options.distance+me.options.distance*0.5+(_absMoveY-me.options.distance*2)*0.2;
            }
            $(loadName).css({'height': _offsetY});
        }
        // 加载下方
        if(me.options.direction == 'down' && _childrenHeight <= (_loadHeight+_scrollTop) && _moveY < 0){
            e.preventDefault();
            if(!insertDOM){
                me.$element.append('<div class="'+me.options.loadClass+'"></div>');
                insertDOM = true;
            }
            fnTransition($(loadName),0);
            // 下拉
            if(_absMoveY <= me.options.distance){
                _offsetY = _absMoveY;
                $(loadName).html('').append(me.options.refreshDOM);
            // 指定距离 < 下拉距离 < 指定距离*2
            }else if(_absMoveY > me.options.distance && _absMoveY <= me.options.distance*2){
                _offsetY = me.options.distance+(_absMoveY-me.options.distance)*0.5;
                $(loadName).html('').append(me.options.updateDOM);
            // 下拉距离 > 指定距离*2
            }else{
                _offsetY = me.options.distance+me.options.distance*0.5+(_absMoveY-me.options.distance*2)*0.2;
            }
            $(loadName).css({'height': _offsetY});
            me.$element.scrollTop(_offsetY+_scrollTop);
        }
    };

    // touchend
    MyDropLoad.prototype.fnTouchend = function(){
        var me = this,
            _absMoveY = Math.abs(_moveY);
        if(insertDOM){
            fnTransition($(loadName),300);
            if(_absMoveY > me.options.distance){
                $(loadName).css({'height':$(loadName).children().height()});
                $(loadName).html('').append(me.options.loadDOM);
                me.fnCallback();
            }else{
                $(loadName).css({'height':'0'}).on('webkitTransitionEnd',function(){
                    insertDOM = false;
                    $(this).remove();
                });
            }
            _moveY = 0;
        }
    };

    // 回调
    MyDropLoad.prototype.fnCallback = function(){
        var me = this;
        loading = true;
        me.$element.trigger('dropload',me);
    };

    // 重置
    MyDropLoad.prototype.resetload = function(){
        var me = this;
        if($(loadName)){
            $(loadName).css({'height':'0'}).on('webkitTransitionEnd',function(){
                loading = false;
                insertDOM = false;
                $(this).remove();
            });
        }
    };

    // css过渡
    function fnTransition(dom,num){
        dom.css({
            '-webkit-transition':'all '+num+'ms',
            'transition':'all '+num+'ms'
        });
    }
})(window.Zepto || window.jQuery);