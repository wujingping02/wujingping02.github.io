/**
 * ITCAST WEB
 * Created by zhousg on 2016/7/12.
 */
/*命名空间  防止命名冲突*/
window.itcast = {};

/*区分模块*/
itcast.transitionEnd  = function(dom,callback){
    /*
     * 1.给谁加过渡结束事件
     * 2.过渡结束之后我们需要去干一件什么事情
     * */

    if(!dom || typeof dom != 'object' ) return false;
    /*基本的判断*/

    dom.addEventListener('transitionEnd',function(){
        /*处理业务*/
        callback && callback();
    });
    dom.addEventListener('webkitTransitionEnd',function(){
        /*处理业务*/
        callback && callback();
    });
}


itcast.tap = function(dom,callback){
    if(!dom || typeof dom != 'object' ) return false;
    /*基本的判断*/
    var startTime = 0;
    var isMove = false;
    dom.addEventListener('touchstart',function(e){
        startTime = Date.now();
    });
    dom.addEventListener('touchmove',function(e){
        isMove = true;
    });
    dom.addEventListener('touchend',function(e){
        if((Date.now()-startTime)<150 && !isMove){
            callback && callback(e);
        }
        /*重置参数*/
        startTime = 0;
        isMove = false;
    });
}
