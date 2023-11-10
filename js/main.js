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

    var isMute = false;
    var swiper = new Swiper('.swiper-container', {
        loop: true,
        speed: 4000,
        autoplay: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });

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
        cardElement.addEventListener('mouseup', function () {
            playAudio(true);
            flipCard(this);
            setTimeout(function() {
                moveImageUp();
            }, 500); // 10 giây
        });
    }

    const mute =document.getElementById('mute');
    if (mute) {
        mute.addEventListener('mouseup', function () {
            playAudio(!isMute);
        });
    }

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
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
    function createLeaf() {
        const leaf = new Leaf();
        leaves.push(leaf);
      }
      
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

//     /*================================
//      sticky-header
//      ==================================*/
//     $(window).scroll(function () {

//         if ($(window).scrollTop() > 10) {
//             $('.sticky-header').addClass('sticky'),
//                 $('.scrollup').addClass('show_hide');
//         } else {
//             $('.sticky-header').removeClass('sticky'),
//                 $('.scrollup').removeClass('show_hide');
//         }

//     });


//     /*================================
//         slicknav
//         ==================================*/

//     $('#nav_mobile_menu').slicknav({
//         label: '',
//         duration: 1000,
//         easingOpen: "easeOutBounce", //available with jQuery UI
//         prependTo: '#mobile_menu'
//     });
    
    /*================================
    slider-area content effect
    ==================================*/
    function sliderLoadedAddClass() {
        $('.slider-two').addClass('scontent_loaded');
        $('.slider-parallax').addClass('scontent_loaded');
    }


//     /*================================
//       Isotope Portfolio
//      ==================================*/
//     $('.grid').imagesLoaded(function () {

//         // filter items on button click
//         $('.gallery-menu').on('click', 'button', function () {
//             var filterValue = $(this).attr('data-filter');
//             $grid.isotope({
//                 filter: filterValue
//             });
//         });

//         // init Isotope
//         var $grid = $('.grid').isotope({
//             itemSelector: '.grid-item',
//             percentPosition: true,
//             masonry: {
//                 // use outer width of grid-sizer for columnWidth
//                 columnWidth: '.grid-item',
//             }
//         });



//     });

//     $('.gallery-menu button').on('click', function () {
//         $('.gallery-menu button').removeClass('active');
//         $(this).addClass('active');
//     });


//     /*------------------------------------------
//         = COUNTDOWN CLOCK
//     -------------------------------------------*/
//     if ($("#clock").length) {
//         $('#clock').countdown('2023/05/13', function (event) {
//             var $this = $(this).html(event.strftime('' +
//                 '<div class="box"><div class="date">%D</div> <span>Days</span> </div>' +
//                 '<div class="box"><div class="date">%H</div> <span>Hours</span> </div>' +
//                 '<div class="box"><div class="date">%M</div> <span>Mins</span> </div>' +
//                 '<div class="box"><div class="date">%S</div> <span>Secs</span> </div>'));
//         });
//     }

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

//     /*------------------------------------------
//         = BACK TO TOP
//     -------------------------------------------*/
//     if ($(".scrollup").length) {
//         $(".scrollup").on("click", function () {
//             $("html,body").animate({
//                 scrollTop: 0
//             }, 1000, "easeInOutExpo");
//             return false;
//         })
//     }


//     /*================================
//     Magnific Popup
//     ==================================*/
//     if ($(".expand-img").length) {
//         $('.expand-img').magnificPopup({
//             type: 'image',
//             gallery: {
//                 enabled: true
//             }
//         });

//         $('.expand-video').magnificPopup({
//             type: 'iframe',
//             gallery: {
//                 enabled: true
//             }
//         });
//     }
//     /*------------------------------------------
//         = WATER RIPPLE
//     -------------------------------------------*/
//     if ($(".ripple").length) {
//         $('.ripple').ripples({
//             resolution: 512,
//             dropRadius: 20, //px
//             perturbance: 0.04,
//         });

//         // Automatic drops
//         setInterval(function () {
//             var $el = $('.ripple');
//             var x = Math.random() * $el.outerWidth();
//             var y = Math.random() * $el.outerHeight();
//             var dropRadius = 20;
//             var strength = 0.04 + Math.random() * 0.04;

//             $el.ripples('drop', x, y, dropRadius, strength);
//         }, 400);
//     }

//     if ($(".particleground").length) {
//         $('.particleground').particleground({
//             dotColor: '#999999',
//             lineColor: '#999999',
//             particleRadius: 5,
//             lineWidth: 2,
//             curvedLines: true,
//             proximity: 20,
//             parallaxMultiplier: 10,
//         });

//     }


//     /*------------------------------------------
//         = VIDEO BACKGROUND
//     -------------------------------------------*/
//     if ($("#video-background").length) {
//         $('#video-background').YTPlayer({
//             showControls: false,
//             playerVars: {
//                 modestbranding: 0,
//                 autoplay: 1,
//                 controls: 1,
//                 showinfo: 0,
//                 wmode: 'transparent',
//                 branding: 0,
//                 rel: 0,
//                 autohide: 0,
//                 origin: window.location.origin
//             }
//         });
//     }

//     /*------------------------------------------
//         = POPUP YOUTUBE, VIMEO, GMAPS
//     -------------------------------------------*/
//     $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
//         type: 'iframe',
//         mainClass: 'mfp-fade',
//         removalDelay: 160,
//         preloader: false,
//         fixedContentPos: false
//     });


//     /*------------------------------------------
//         = TOGGLE MUSUC BIX
//     -------------------------------------------*/
//     if ($(".music-box").length) {
//         var musicBtn = $(".music-box-toggle-btn");

//         musicBtn.on("click", function () {
//             playAudio();
//             return false;
//         })
//     }

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



}(jQuery));