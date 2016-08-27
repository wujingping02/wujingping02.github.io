/**
 * ITCAST WEB
 * Created by zhousg on 2016/7/14.
 */
/*页面加载完成*/
window.onload = function(){
    /*搜索效果*/
    search();
    /*轮播图*/
    banner();
    /*倒计时*/
    downTime();
}

/*搜索效果*/
function search(){
    /*1.默认的是透明*/
    /*2.滑动页面的时候颜色逐渐加深或变浅*/
    /*3.往下滑动页面的时候到一定距离的时候颜色不做改变  过了轮播图*/

    /*获取相关dom*/
    /*搜索盒子*/
    var search = document.querySelector('.jd_header_box');
    /*轮播图盒子*/
    var banner = document.querySelector('.jd_banner');
    /*获取高度*/
    var height = banner.offsetHeight;
    
    /*监听页面的滑动*/
    window.onscroll = function(){
        /*监听你是否滑动超过了banner的高度*/

        /*获取页面现在距离顶部的高度*/
        var top = document.body.scrollTop;/*谷歌上的写法 ie document.documentElement.scrollTop*/

        /*定义默认的透明度*/
        var opacity = 0;

        if( top > height ){
            opacity = 0.85;
        }else{
            /*透明度的变化*/
            opacity = 0.85 * (top/height);
        }

        /*操作dom*/
        search.style.background = "rgba(201,21,35,"+opacity+")";
    }

}
/*轮播图*/
function banner(){

    /*
    * 1.自动轮播 且是无缝       过渡  定时
    * 2.点需要做对应的改变      改变当前样式
    * 3.滑动手指触摸滑动的时候轮播图也能随着滑动  停止轮播      touch  clear
    * 4.不超过一定的距离需要吸附回去   过渡
    * 5.超过了一定的距离  需要跳转上一张或下一张  过渡
    * */

    /*获取dom元素*/
    /*大盒子*/
    var banner = document.querySelector('.jd_banner');
    /*盒子的宽度*/
    var width = banner.offsetWidth;
    /*图片盒子*/
    var imageBox = banner.querySelector('ul:first-child');
    /*点盒子*/
    var pointBox = banner.querySelector('ul:nth-child(2)');/*last-child*/
    /*索引的点*/
    var points = pointBox.querySelectorAll('li');

    /*公用方法*/
    /*加过渡*/
    var addTransition = function(){
        imageBox.style.webkitTransition = 'all 0.3s';/*兼容性*/
        imageBox.style.transition = 'all 0.3s';
    }
    /*清除过渡*/
    var removeTransition = function(){
        imageBox.style.webkitTransition = 'none';
        imageBox.style.transition = 'none';
    };
    /*定位*/
    var setTranslateX = function(translateX){
        imageBox.style.webkitTransform = 'translateX('+translateX+'px)';
        imageBox.style.transform = 'translateX('+translateX+'px)';
    }

    /*功能代码*/

    /*1.自动轮播 且是无缝 */
    /*默认索引*/
    var index = 1;
    /*定时器*/
    var timer = setInterval(function(){
        index ++;

        /*定位图片盒子  过渡的形式来定位*/
        /*加过渡*/
        addTransition();
        /*定位*/
        setTranslateX(-index*width)

        /*需要早动画结束之后判断*/

    },1000);

    /*监听过渡结束事件*/
    itcast.transitionEnd(imageBox,function(){
        /*一直保持在 0-9 索引*/
        /*无缝滚动*/
        if(index >= 9){
            index = 1;
            /*清除过渡*/
            removeTransition();
            /*定位*/
            setTranslateX(-index*width)
        }else if(index <= 0){
            index = 8;
            /*清除过渡*/
            removeTransition();
            /*定位*/
            setTranslateX(-index*width)
        }

        /*一直保持在 1-8 索引*/
        setPoint();

    });

    /*2.点需要做对应的改变*/
    var setPoint = function(){
        /*通过index来判断*/
        /*一直保持在 1-8 索引*/
        /*清除当前样式*/
        for(var i = 0 ; i < points.length ; i ++){
            points[i].classList.remove('now');
            /*points[i].className = " "*/
        }
        /*给对应的加上样式*/
        points[index-1].classList.add('now');
    }


    /*3.滑动手指触摸滑动的时候轮播图也能随着滑动  停止轮播 */
    /*需要记录一些东西*/
    var startX = 0;
    var moveX = 0;
    var distanceX = 0;/*改变的距离*/

    var isMove = false;  /*记录用户是否滑动过*/

    imageBox.addEventListener('touchstart',function(e){
        /*记录开始位子的坐标*/
        startX = e.touches[0].clientX;
        /*清除定时器*/
        clearInterval(timer);
    });
    imageBox.addEventListener('touchmove',function(e){
        /*记录滑动的时候的x的坐标 会随时改变*/
        moveX = e.touches[0].clientX;
        /*计算滑动的距离  数值 可以为负也可以为正*/
        distanceX = moveX - startX;
        /*在滑动的时候轮播图也需要滑动    定位的方式来实现的*/
        /*清除过渡*/
        removeTransition();
        /*定位*/
        setTranslateX(-index*width+distanceX);/*当前的定位加上改变的距离  就是将要去做定位的那个位置*/

        isMove = true;

        console.log(distanceX);

    });
    /*最好使用window来监听触摸结束事件 */
    window.addEventListener('touchend',function(e){
        /*
        * * 4.不超过一定的距离需要吸附回去   过渡
         * 5.超过了一定的距离  需要跳转上一张或下一张  过渡
        * */

        if(Math.abs(distanceX) > width/3 && isMove){
            /*超过了一定的距离  需要跳转上一张或下一张 */
            if(distanceX>0){
                index --;/*上一张*/
            }else{
                index ++;/*下一张*/
            }
            /*加过渡*/
            addTransition();
            /*定位*/
            setTranslateX(-index*width)
        }else{
            /*不超过一定的距离需要吸附回去 */
            /*加过渡*/
            addTransition();
            /*定位*/
            setTranslateX(-index*width)
        }


        /*重置参数*/
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;

        /*加上定时器*/
        /*严谨起见*/
        clearInterval(timer);/*排除定时器累加*/
        timer = setInterval(function(){
            index ++;

            /*定位图片盒子  过渡的形式来定位*/
            /*加过渡*/
            addTransition();
            /*定位*/
            setTranslateX(-index*width)
        },1000);
    });

    /*/!*监听过渡结束*!/
    imageBox.addEventListener('transitionEnd',function(){
        console.log('transitionEnd');
        /!*无缝滚动*!/
        if(index >= 9){
            index = 1;
            /!*清除过渡*!/
            removeTransition();
            /!*定位*!/
            setTranslateX(-index*width)
        }else if(index <= 0){
            index = 8;
            /!*清除过渡*!/
            removeTransition();
            /!*定位*!/
            setTranslateX(-index*width)
        }

    });
    imageBox.addEventListener('webkitTransitionEnd',function(){
        console.log('webkitTransitionEnd');
        /!*无缝滚动*!/
        if(index >= 9){
            index = 1;
            /!*清除过渡*!/
            removeTransition();
            /!*定位*!/
            setTranslateX(-index*width)
        }else if(index <= 0){
            index = 8;
            /!*清除过渡*!/
            removeTransition();
            /!*定位*!/
            setTranslateX(-index*width)
        }
    });*/
}
/*倒计时*/
function downTime(){
    /*
    * 1.需要倒计时的事件  是后台给你  假设一个时间
    * 2.没一秒钟去改变6个盒子的内容
    * */

    /*获取dom元素*/
    /*时间盒子*/
    var skTime = document.querySelector('.sk_time');
    /*每一个span*/
    var spans = skTime.querySelectorAll('span');

    /*假设一个事件 */
    var time = 4*60*60;

    var timer = setInterval(function(){
        time--;

        /*必须时间大于0*/
        if(time < 0){
            return false;
        }

        /*格式化时间*/
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = time%60;

        /*操作dom*/
        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;

        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;

        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;

    },1000);

}
