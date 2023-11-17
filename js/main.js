// /*============================
//    js index
// ==============================

// ==========================================*/

(function ($) {
    var audio = new Audio('mp3/NgayDauTien-DucPhuc.mp3?raw=true');
    const app = document.getElementById('app');
    const preloadercls = document.getElementById('preloadercls');
    const content = document.getElementById('content');
    const ivitationcards = document.getElementById('ivitationcards');
    const thiepcuoi3 = document.getElementById('thiepcuoi3');
    const canvas = document.getElementById('fallingLeavesCanvas');
    const ctx = canvas.getContext('2d');
    const bntnmute =document.getElementById('bntnmute');
    const bntmute =document.getElementById('bntmute');

    // Set the canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create an array to store individual leaves
    const leaves = [];
    const leafImage = new Image();
    leafImage.src = 'image/laphong.png'; 
    // leafImage.src = 'image/kimtuyen.png'; 
    var isMute = false;
    var db;
    /*================================
    Window Load
    ==================================*/
    $(window).on('load', function () {
        smoothScrolling($(".main-menu nav ul li a[href^='#']"), headerHeight);
        smoothScrolling($(".scrollup a[href^='#']"), 0);
        smoothScrolling($(".welcome-content .btn a[href^='#']"), 0);
        $('.slider-two').addClass('scontent_loaded');
        $('.slider-parallax').addClass('scontent_loaded');
        sliderLoadedAddClass();
        preloader();
        animateLeaves();
    })
    
    const cardElement = document.getElementById('cardElement');
    if (cardElement) {
        cardElement.addEventListener('click', function () {
            playAudio(true);
            flipCard(this);
            moveImageUp();
        });
    }

    const btnloichuc = document.getElementById('btnloichuc');
    if (btnloichuc) {
        btnloichuc.addEventListener('mouseup', function () {
            const loichuc = document.getElementById('loichuc');
            loichuc.classList.remove('deactive');
            loichuc.classList.add('active');
        });
    }

    const closeloichuc = document.getElementById('closeloichuc');
    if (closeloichuc) {
        closeloichuc.addEventListener('mouseup', function () {
            const loichuc = document.getElementById('loichuc');
            loichuc.classList.remove('active');
            loichuc.classList.add('deactive');
        });
    }

    const btnqr = document.getElementById('btnqr');
    if (btnqr) {
        btnqr.addEventListener('mouseup', function () {
            const maqr = document.getElementById('maqr');
            maqr.classList.remove('deactive');
            maqr.classList.add('active');
        });
    }

    const closeqr = document.getElementById('closeqr');
    if (closeqr) {
        closeqr.addEventListener('mouseup', function () {
            const maqr = document.getElementById('maqr');
            maqr.classList.remove('active');
            maqr.classList.add('deactive');
        });
    }


    const mute =document.getElementById('mute');
    if (mute) {
        mute.addEventListener('mouseup', function () {
            playAudio(!isMute);
        });
    }
    
    // Leaf class
    class Leaf {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * (20 - 10) + 10; // Kích thước ngẫu nhiên trong khoảng từ 10 đến 20
          this.speed = Math.random() * (5 - 2) + 2; // Tốc độ ngẫu nhiên trong khoảng từ 2 đến 5
          this.angle = Math.random() * 360; // Hướng ngẫu nhiên (góc quay)
        }
      
        update() {
            this.x += this.speed; // Cập nhật tọa độ x để lá cây di chuyển từ trái qua phải
            this.y += 0.5 * Math.sin(this.angle);
        
            if (this.x > canvas.width + this.size) {
              this.x = 0;
              this.y = Math.random() * canvas.height;
            }
        
            this.angle += Math.random() * 2 - 1; // Thay đổi hướng ngẫu nhiên
        }
      
        draw() {
          ctx.drawImage(leafImage, this.x, this.y, this.size, this.size);
        }
    }

    let leavesToCreate = 5;
      
    function animateLeaves() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    leaves.forEach((leaf) => {
        leaf.update();
        leaf.draw();
    });
    
    if (leavesToCreate > 0 && Math.random() < 0.01) {
        createLeaves(Math.min(leavesToCreate, 5)); // Tạo tối đa 5 lá cây mỗi lần
        leavesToCreate -= 5;
        }
        requestAnimationFrame(animateLeaves);
    }

    function createLeaves(count) {
        for (let i = 0; i < count; i++) {
          const leaf = new Leaf();
          leaves.push(leaf);
        }
    }

    function flipCard(element) {
        const shadowleft = document.getElementById('shadowleft');
        const shadowright = document.getElementById('shadowright');
        element.removeChild(thiepcuoi3);
        if (shadowleft && !shadowleft.classList.contains('shadowhiden')) {
            shadowleft.classList.add('shadowhiden');
        }
        if (shadowright && !shadowright.classList.contains('shadowhiden')) {
            shadowright.classList.add('shadowhiden');
        }
        const cardInner = element.querySelector('.card');
        if (cardInner && !cardInner.classList.contains('flipped')) {
            cardInner.classList.add('flipped');
        }
    }

    function moveImageUp() {
        const image = document.getElementById('movingImage');
        image.style.top = '-130px'; /* Di chuyển ảnh lên đến vị trí ban đầu */
        setTimeout(function() {
            if(app && ivitationcards && content)
            {
                app.removeChild(ivitationcards);
                app.appendChild(content);
            }
        }, 6000); // 10 giây
    }

    /*================================
    Preloader
    ==================================*/
    /*------------------------------------------
      = HIDE PRELOADER
  -------------------------------------------*/
    function preloader() {
        if ($('.preloader').length) {
            if(app && content)
                app.removeChild(content);
            $('.preloader').delay(200).fadeOut(500, function () {
                if(app && preloadercls)
                    app.removeChild(preloadercls);
            });
        }
    }

    /*================================
    slider-area content effect
    ==================================*/
    function sliderLoadedAddClass() {
        $('.slider-two').addClass('scontent_loaded');
        $('.slider-parallax').addClass('scontent_loaded');
    }

    /*================================
     Variable Initialize
    ==================================*/
    var headerHeight = $('.header-area').innerHeight();


    //. smooth scrolling 
    function smoothScrolling($links, $topGap) {
        var links = $links;
        var topGap = $topGap;

        links.on("click", function () {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
                if (target.length) {
                    $("html, body").animate({
                        scrollTop: target.offset().top - topGap
                    }, 1000, "easeInOutExpo");
                    return false;
                }
            }
            return false;
        });
    }

    function playAudio(play) {
        if (audio.paused) {
            if (bntnmute && bntmute) {
                bntnmute.style.display = 'block'
                bntmute.style.display = 'none'
            }
            audio.loop = true;
            audio.play();
        } else if (!play) {
            if (bntnmute && bntmute) {
                bntnmute.style.display = 'none'
                bntmute.style.display = 'block'
            }
            audio.pause();
        }
        isMute = play;
    }

    var sync1 = $("#sync1");
    var sync2 = $("#sync2");
    var sync3 = $("#sync3");
    var sync4 = $("#sync4");
    var slidesPerPage = 4;
    var syncedSecondary = true;
    
    sync1.owlCarousel({
        items: 1,
        slideSpeed: 1000,
        nav: true,
        autoplay: true,
        dots: true,
        loop: true,
        responsiveRefreshRate: 200,
        animateOut: 'slideOutUp',
        touchDrag: false,
        navText: [
            '<span style="background-color: rgba(31,41,55,.3);border-radius: 9999px;" class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"><svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"></path></svg><span class="sr-only">Previous</span></span>',
            '<span style="background-color: rgba(31,41,55,.3);border-radius: 9999px;" class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"><svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"></path></svg><span class="sr-only">Next</span></span>'
        ],
    }).on('changed.owl.carousel', syncPosition);
    
    sync3.owlCarousel({
        items: 1,
        slideSpeed: 1000,
        nav: true,
        autoplay: true,
        dots: true,
        loop: true,
        navText: '',
        responsiveRefreshRate: 200,
    }).on('changed.owl.carousel', syncPosition3);

    sync2
        .on('initialized.owl.carousel', function () {
        sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
        items : slidesPerPage,
        dots: true,
        nav: true,
        smartSpeed: 200,
        slideSpeed : 500,
        slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
        responsiveRefreshRate : 100
    }).on('changed.owl.carousel', syncPosition2);

    sync4
        .on('initialized.owl.carousel', function () {
        sync4.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
        items : slidesPerPage,
        dots: true,
        nav: true,
        smartSpeed: 200,
        slideSpeed : 500,
        slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
        responsiveRefreshRate : 100
    }).on('changed.owl.carousel', syncPosition4);
    
    function syncPosition(el) {
        var count = el.item.count-1;
        var current = Math.round(el.item.index - (el.item.count/2) - .5);
        
        if(current < 0) {
        current = count;
        }
        if(current > count) {
        current = 0;
        }
    
        sync2
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();
        
        if (current > end) {
        sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
        sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition3(el) {
        var count = el.item.count-1;
        var current = Math.round(el.item.index - (el.item.count/2) - .5);
        
        if(current < 0) {
        current = count;
        }
        if(current > count) {
        current = 0;
        }
        
        //end block
    
        sync4
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
        var onscreen = sync4.find('.owl-item.active').length - 1;
        var start = sync4.find('.owl-item.active').first().index();
        var end = sync4.find('.owl-item.active').last().index();
        
        if (current > end) {
        sync4.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
        sync4.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }
    
    function syncPosition2(el) {
        if(syncedSecondary) {
        var number = el.item.index;
        sync1.data('owl.carousel').to(number, 100, true);
        }
    }

    function syncPosition4(el) {
        if(syncedSecondary) {
        var number = el.item.index;
        sync3.data('owl.carousel').to(number, 100, true);
        }
    }    
}(jQuery));