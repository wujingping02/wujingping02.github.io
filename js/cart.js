/**
 * ITCAST WEB
 * Created by zhousg on 2016/7/15.
 */
window.onload = function(){
    /*删除弹框*/
    popWin();
}
/*删除弹框*/
function popWin(){
    /*
    * 1.点击删除按钮   显示弹出层   block
    * 2.弹出框需要动画显示  add class
    * 3.点击的时候  删除按钮需要动画的打开盖子 加过渡 和 转换
    * 4.点击取消的时候  需要隐藏弹出层弹出框 none
    * 5.让盖子动画的盖回去 默认
    * */

    /*获取dom元素*/
    /*删除按钮*/
    var deleteBtns = document.querySelectorAll('.delete_box');
    /*弹出层*/
    var jdWin = document.querySelector('.jd_win');
    /*弹出框*/
    var jdWinBox = jdWin.querySelector('.jd_win_box');
    /*取消按钮*/
    var cancel = jdWinBox.querySelector('.cancel');

    var up = null;

    for(var i = 0 ; i < deleteBtns.length ; i ++){
        /*1.点击删除按钮 显示弹出层*/
        deleteBtns[i].onclick = function(){
            /*显示弹出层*/
            jdWin.style.display = 'block';
            /*2.弹出框需要动画显示*/
            jdWinBox.classList.add('myBounceInDown');
            /*3.点击的时候  删除按钮需要动画的打开盖子 加过渡 和 转换*/
            /*找到盖子*/
            up = this.querySelector('.delete_up');
            /*加过渡*/
            up.style.webkitTransition = 'all 1s';
            up.style.transition = 'all 1s';

            /*设置旋转原点*/
            up.style.webkitTransformOrigin = "0 5px";
            up.style.transformOrigin = "0 5px";

            /*旋转*/
            up.style.webkitTransform = "rotate(-30deg) translateY(2px)";
            up.style.transform = "rotate(-30deg) translateY(2px)";



        }
    }


    cancel.onclick = function(){
        /*需要隐藏弹出层弹出框 */
        jdWin.style.display = 'none';
        if(up){
            up.style.webkitTransform = "none";
            up.style.transform = "none";
        }
    }


}