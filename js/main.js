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
    
    $('#sync1').owlCarousel({
        loop: true,
        nav: true,
        touchDrag: false,
        navText: [
            '<span style="background-color: rgba(31,41,55,.3);border-radius: 9999px;" class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"><svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"></path></svg><span class="sr-only">Previous</span></span>',
            '<span style="background-color: rgba(31,41,55,.3);border-radius: 9999px;" class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"><svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"></path></svg><span class="sr-only">Next</span></span>'
        ],
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 1
          },
          1000: {
            items: 1
          }
        }
    })

    $('#sync2').owlCarousel({
        loop: true,
        nav: true,
        navText: [  ],
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 1
          },
          1000: {
            items: 1
          }
        }
    })
}(jQuery));