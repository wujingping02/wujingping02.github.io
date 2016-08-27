/**
 * ITCAST WEB
 * Created by zhousg on 2016/7/14.
 */
/*ҳ��������*/
window.onload = function(){
    /*����Ч��*/
    search();
    /*�ֲ�ͼ*/
    banner();
    /*����ʱ*/
    downTime();
}

/*����Ч��*/
function search(){
    /*1.Ĭ�ϵ���͸��*/
    /*2.����ҳ���ʱ����ɫ�𽥼�����ǳ*/
    /*3.���»���ҳ���ʱ��һ�������ʱ����ɫ�����ı�  �����ֲ�ͼ*/

    /*��ȡ���dom*/
    /*��������*/
    var search = document.querySelector('.jd_header_box');
    /*�ֲ�ͼ����*/
    var banner = document.querySelector('.jd_banner');
    /*��ȡ�߶�*/
    var height = banner.offsetHeight;
    
    /*����ҳ��Ļ���*/
    window.onscroll = function(){
        /*�������Ƿ񻬶�������banner�ĸ߶�*/

        /*��ȡҳ�����ھ��붥���ĸ߶�*/
        var top = document.body.scrollTop;/*�ȸ��ϵ�д�� ie document.documentElement.scrollTop*/

        /*����Ĭ�ϵ�͸����*/
        var opacity = 0;

        if( top > height ){
            opacity = 0.85;
        }else{
            /*͸���ȵı仯*/
            opacity = 0.85 * (top/height);
        }

        /*����dom*/
        search.style.background = "rgba(201,21,35,"+opacity+")";
    }

}
/*�ֲ�ͼ*/
function banner(){

    /*
    * 1.�Զ��ֲ� �����޷�       ����  ��ʱ
    * 2.����Ҫ����Ӧ�ĸı�      �ı䵱ǰ��ʽ
    * 3.������ָ����������ʱ���ֲ�ͼҲ�����Ż���  ֹͣ�ֲ�      touch  clear
    * 4.������һ���ľ�����Ҫ������ȥ   ����
    * 5.������һ���ľ���  ��Ҫ��ת��һ�Ż���һ��  ����
    * */

    /*��ȡdomԪ��*/
    /*�����*/
    var banner = document.querySelector('.jd_banner');
    /*���ӵĿ��*/
    var width = banner.offsetWidth;
    /*ͼƬ����*/
    var imageBox = banner.querySelector('ul:first-child');
    /*�����*/
    var pointBox = banner.querySelector('ul:nth-child(2)');/*last-child*/
    /*�����ĵ�*/
    var points = pointBox.querySelectorAll('li');

    /*���÷���*/
    /*�ӹ���*/
    var addTransition = function(){
        imageBox.style.webkitTransition = 'all 0.3s';/*������*/
        imageBox.style.transition = 'all 0.3s';
    }
    /*�������*/
    var removeTransition = function(){
        imageBox.style.webkitTransition = 'none';
        imageBox.style.transition = 'none';
    };
    /*��λ*/
    var setTranslateX = function(translateX){
        imageBox.style.webkitTransform = 'translateX('+translateX+'px)';
        imageBox.style.transform = 'translateX('+translateX+'px)';
    }

    /*���ܴ���*/

    /*1.�Զ��ֲ� �����޷� */
    /*Ĭ������*/
    var index = 1;
    /*��ʱ��*/
    var timer = setInterval(function(){
        index ++;

        /*��λͼƬ����  ���ɵ���ʽ����λ*/
        /*�ӹ���*/
        addTransition();
        /*��λ*/
        setTranslateX(-index*width)

        /*��Ҫ�綯������֮���ж�*/

    },1000);

    /*�������ɽ����¼�*/
    itcast.transitionEnd(imageBox,function(){
        /*һֱ������ 0-9 ����*/
        /*�޷����*/
        if(index >= 9){
            index = 1;
            /*�������*/
            removeTransition();
            /*��λ*/
            setTranslateX(-index*width)
        }else if(index <= 0){
            index = 8;
            /*�������*/
            removeTransition();
            /*��λ*/
            setTranslateX(-index*width)
        }

        /*һֱ������ 1-8 ����*/
        setPoint();

    });

    /*2.����Ҫ����Ӧ�ĸı�*/
    var setPoint = function(){
        /*ͨ��index���ж�*/
        /*һֱ������ 1-8 ����*/
        /*�����ǰ��ʽ*/
        for(var i = 0 ; i < points.length ; i ++){
            points[i].classList.remove('now');
            /*points[i].className = " "*/
        }
        /*����Ӧ�ļ�����ʽ*/
        points[index-1].classList.add('now');
    }


    /*3.������ָ����������ʱ���ֲ�ͼҲ�����Ż���  ֹͣ�ֲ� */
    /*��Ҫ��¼һЩ����*/
    var startX = 0;
    var moveX = 0;
    var distanceX = 0;/*�ı�ľ���*/

    var isMove = false;  /*��¼�û��Ƿ񻬶���*/

    imageBox.addEventListener('touchstart',function(e){
        /*��¼��ʼλ�ӵ�����*/
        startX = e.touches[0].clientX;
        /*�����ʱ��*/
        clearInterval(timer);
    });
    imageBox.addEventListener('touchmove',function(e){
        /*��¼������ʱ���x������ ����ʱ�ı�*/
        moveX = e.touches[0].clientX;
        /*���㻬���ľ���  ��ֵ ����Ϊ��Ҳ����Ϊ��*/
        distanceX = moveX - startX;
        /*�ڻ�����ʱ���ֲ�ͼҲ��Ҫ����    ��λ�ķ�ʽ��ʵ�ֵ�*/
        /*�������*/
        removeTransition();
        /*��λ*/
        setTranslateX(-index*width+distanceX);/*��ǰ�Ķ�λ���ϸı�ľ���  ���ǽ�Ҫȥ����λ���Ǹ�λ��*/

        isMove = true;

        console.log(distanceX);

    });
    /*���ʹ��window���������������¼� */
    window.addEventListener('touchend',function(e){
        /*
        * * 4.������һ���ľ�����Ҫ������ȥ   ����
         * 5.������һ���ľ���  ��Ҫ��ת��һ�Ż���һ��  ����
        * */

        if(Math.abs(distanceX) > width/3 && isMove){
            /*������һ���ľ���  ��Ҫ��ת��һ�Ż���һ�� */
            if(distanceX>0){
                index --;/*��һ��*/
            }else{
                index ++;/*��һ��*/
            }
            /*�ӹ���*/
            addTransition();
            /*��λ*/
            setTranslateX(-index*width)
        }else{
            /*������һ���ľ�����Ҫ������ȥ */
            /*�ӹ���*/
            addTransition();
            /*��λ*/
            setTranslateX(-index*width)
        }


        /*���ò���*/
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;

        /*���϶�ʱ��*/
        /*�Ͻ����*/
        clearInterval(timer);/*�ų���ʱ���ۼ�*/
        timer = setInterval(function(){
            index ++;

            /*��λͼƬ����  ���ɵ���ʽ����λ*/
            /*�ӹ���*/
            addTransition();
            /*��λ*/
            setTranslateX(-index*width)
        },1000);
    });

    /*/!*�������ɽ���*!/
    imageBox.addEventListener('transitionEnd',function(){
        console.log('transitionEnd');
        /!*�޷����*!/
        if(index >= 9){
            index = 1;
            /!*�������*!/
            removeTransition();
            /!*��λ*!/
            setTranslateX(-index*width)
        }else if(index <= 0){
            index = 8;
            /!*�������*!/
            removeTransition();
            /!*��λ*!/
            setTranslateX(-index*width)
        }

    });
    imageBox.addEventListener('webkitTransitionEnd',function(){
        console.log('webkitTransitionEnd');
        /!*�޷����*!/
        if(index >= 9){
            index = 1;
            /!*�������*!/
            removeTransition();
            /!*��λ*!/
            setTranslateX(-index*width)
        }else if(index <= 0){
            index = 8;
            /!*�������*!/
            removeTransition();
            /!*��λ*!/
            setTranslateX(-index*width)
        }
    });*/
}
/*����ʱ*/
function downTime(){
    /*
    * 1.��Ҫ����ʱ���¼�  �Ǻ�̨����  ����һ��ʱ��
    * 2.ûһ����ȥ�ı�6�����ӵ�����
    * */

    /*��ȡdomԪ��*/
    /*ʱ�����*/
    var skTime = document.querySelector('.sk_time');
    /*ÿһ��span*/
    var spans = skTime.querySelectorAll('span');

    /*����һ���¼� */
    var time = 4*60*60;

    var timer = setInterval(function(){
        time--;

        /*����ʱ�����0*/
        if(time < 0){
            return false;
        }

        /*��ʽ��ʱ��*/
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = time%60;

        /*����dom*/
        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;

        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;

        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;

    },1000);

}
