/**
 * ITCAST WEB
 * Created by zhousg on 2016/7/15.
 */
window.onload = function(){
    /*ɾ������*/
    popWin();
}
/*ɾ������*/
function popWin(){
    /*
    * 1.���ɾ����ť   ��ʾ������   block
    * 2.��������Ҫ������ʾ  add class
    * 3.�����ʱ��  ɾ����ť��Ҫ�����Ĵ򿪸��� �ӹ��� �� ת��
    * 4.���ȡ����ʱ��  ��Ҫ���ص����㵯���� none
    * 5.�ø��Ӷ����ĸǻ�ȥ Ĭ��
    * */

    /*��ȡdomԪ��*/
    /*ɾ����ť*/
    var deleteBtns = document.querySelectorAll('.delete_box');
    /*������*/
    var jdWin = document.querySelector('.jd_win');
    /*������*/
    var jdWinBox = jdWin.querySelector('.jd_win_box');
    /*ȡ����ť*/
    var cancel = jdWinBox.querySelector('.cancel');

    var up = null;

    for(var i = 0 ; i < deleteBtns.length ; i ++){
        /*1.���ɾ����ť ��ʾ������*/
        deleteBtns[i].onclick = function(){
            /*��ʾ������*/
            jdWin.style.display = 'block';
            /*2.��������Ҫ������ʾ*/
            jdWinBox.classList.add('myBounceInDown');
            /*3.�����ʱ��  ɾ����ť��Ҫ�����Ĵ򿪸��� �ӹ��� �� ת��*/
            /*�ҵ�����*/
            up = this.querySelector('.delete_up');
            /*�ӹ���*/
            up.style.webkitTransition = 'all 1s';
            up.style.transition = 'all 1s';

            /*������תԭ��*/
            up.style.webkitTransformOrigin = "0 5px";
            up.style.transformOrigin = "0 5px";

            /*��ת*/
            up.style.webkitTransform = "rotate(-30deg) translateY(2px)";
            up.style.transform = "rotate(-30deg) translateY(2px)";



        }
    }


    cancel.onclick = function(){
        /*��Ҫ���ص����㵯���� */
        jdWin.style.display = 'none';
        if(up){
            up.style.webkitTransform = "none";
            up.style.transform = "none";
        }
    }


}