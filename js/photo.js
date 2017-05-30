(function() {
    // ---------------------
    //声明变量和初始化数据
    var data = dataList,
        len = data.length;

    creatPhotos();
    var n = 0;

    //实现交互效果



    $('.shade .start').onclick=function () {
        $('.photo').style.opacity=1;
        addClass($('.shade'),'hide');
        sortImg(n);
        media.play();
        $('#lanren').style.opacity=1;
        var len=$('.photo_warp').length;
        var timer=setInterval(function () {
            if (n==len-1) {
                n=0;
            }
            n=n+1;
            sortImg(n);
        }, 8000);
    };

    $('.nav_warp').forEach(function(item, i) {
        item.onclick = function() {


            turnImg($(`#photo_${i}`));
        };
    });


    // 需求函数化


    //需求一，数据化结构
    function creatPhotos() {
        var photo_html = $('.photo').innerHTML.split('{{split}}')[0].trim(),
            nav_html = $('.nav').innerHTML;
        var photos = [],
            navs = [];
        data.forEach(function(item, i) {
            var template = photo_html.replace(/{{id}}/, i).replace(/{{src}}/, 'src').replace(/{{img}}/, item.src).replace(/{{title}}/, item.title).replace(/{{desc}}/, item.desc),
                tempnav = nav_html.replace(/{{id}}/, i);
            photos.push(template);
            navs.push(tempnav);

        });

        photos.push(`<div class="nav">${navs.join('')}</div>`);
        $('.photo').innerHTML = photos.join('');
    }


    //需求二，对照片排序

    function sortImg(n) {
        var photos = $('.photo_warp');
        recoverPhotos(photos);
        var center = photos.splice(n, 1)[0];

        addClass(center, "center");
        addClass($(`#nav_${n}`), 'active');
        center.onclick = function() {
            turnImg(this);

        };
        photos.sort(function() {
            return 0.5 - Math.random();
        });
        var left = photos.splice(0, Math.floor((len - 1) / 2)),
            right = photos;

        var range = scope();

        left.forEach(function(item, i) {
            item.style.zIndex = rn([0, len]);
            item.style.top = rn(range.L.y) + 'px';
            item.style.left = rn(range.L.x) + 'px';
            item.style.transform = `translate(0,0) scale(0.9) rotate(${rn([-3600,3600])}deg)`;
        });
        right.forEach(function(item, i) {
            item.style.zIndex = rn([0, len])
            item.style.top = rn(range.R.y) + 'px';
            item.style.left = rn(range.R.x) + 'px';
            item.style.transform = `translate(0,0) scale(0.9) rotate(${rn([-3600,3600])}deg)`;
        })
    }

    //需求三，返回某两个数之间的随机整数

    function rn(arr) {
        var max = Math.max.apply(null, arr),
            min = Math.min.apply(null, arr);

        return Math.round(Math.random() * (max - min) + min);


    }

    //需求四，设定左右两侧照片的随机坐标
    function scope() {
        var outter = $('.photo_wall'),
            oneImg = $('#photo_' + rn([0, len - 1]));
        var W = outter.clientWidth,
            H = outter.clientHeight,
            w = oneImg.offsetWidth,
            h = oneImg.offsetHeight;

        var data = {
            L: {
                x: [-w / 3, W / 2 - w / 2 - w],
                y: [-h / 3, H - h * 2 / 3]
            },
            R: {
                x: [W / 2 + w / 2, W - w * 2 / 3],
                y: [-h / 3, H - h * 2 / 3]
            }
        };
        return data;
    }


    //需求五，控制照片的和导航栏的翻转
    function turnImg(ele) {

        var num = ele.id.split('_')[1];
        var nav = $(`#nav_${num}`);
        if (!hasClass(ele, 'center')) {
            sortImg(num);
        } else {
            if (hasClass(ele, 'front')) {
                removeClass(ele, 'front'),
                    addClass(ele, 'back'),
                    addClass(nav, 'back');
            } else {
                removeClass(ele, 'back'),
                    addClass(ele, 'front'),
                    removeClass(nav, 'back');
            }
        }
    }

    // 需求六，重新初始化图片
    function recoverPhotos(eles) {


        eles.forEach(function(item, i) {

            if (hasClass(item, 'center')) {

                removeClass(item, 'back'),
                    removeClass(item, 'front'),
                    removeClass(item, 'center');
                var nav = $(`#nav_${i}`);
                removeClass(nav, 'back'),
                    removeClass(nav, 'active');
            }
            addClass(item, 'front'),
                item.style.zIndex = '',
                item.style.left = '',
                item.style.top = '',
                item.style.transform = '',
                item.onclick = null;
        });
    }

    //需求七，增加音乐播放控件
    var lanren =$('#audio-btn'),
        media=$('#media');

        lanren.onclick=function () {
            if (hasClass(lanren,'on')) {
                removeClass(lanren,'on'),
                addClass(lanren,'off'),
                media.pause();
            } else {
                removeClass(lanren,'off'),
                addClass(lanren,'on'),
                media.play();}
        };













}());
