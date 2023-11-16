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
            // const loichuc = document.getElementById('loichuc');
            // loichuc.classList.remove('deactive');
            // loichuc.classList.add('active');
        });
    }

    const btnSendMsg = document.getElementById('btnSendMsg');
    if (btnSendMsg) {
        btnSendMsg.addEventListener('mouseup', async function (event) {
            const loichuc = document.getElementById('loichuc');
            loichuc.classList.remove('active');
            loichuc.classList.add('deactive');
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
                document.getElementById('btnloichuc').disabled = true;
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
        navText: [
            '<div class="custom-nav-btn"><svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M4.777,0.501l-4.304,4.303l4.304,4.303"/></svg></div>',
            '<div class="custom-nav-btn"><svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M0.527,9.107l4.303,-4.303l-4.303,-4.304"/></svg></div>'
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

    // async function readData() {
    //     let response;
    //     try {
    //       response = await gapi.client.sheets.spreadsheets.values.get({
    //         spreadsheetId: '1qoUAZbvEWCx615aSJGQKhfvIep7JmUUOy4xmNTH3juk',
    //         range: 'loichuc!A2:C1000',
    //       });
    //     } catch (err) {
    //       document.getElementById('content').innerText = err.message;
    //       return;
    //     }
    //     const range = response.result;
    //     if (!range || !range.values || range.values.length == 0) {
    //       document.getElementById('content').innerText = 'No values found.';
    //       return;
    //     }
    //     // Flatten to string to display
    //     displayData(range.values);
    // }

    // async function writeData() {
    //     const userName = document.getElementById('userName').value;
    //     const contentMsg = document.getElementById('contentMsg').value;
    //     const newValues = [ [userName, contentMsg, getCurrentDateTime()],];
    //     await gapi.client.sheets.spreadsheets.values.append({
    //         spreadsheetId: '1qoUAZbvEWCx615aSJGQKhfvIep7JmUUOy4xmNTH3juk',
    //         range: 'loichuc!A:C',
    //         valueInputOption: 'RAW', // Hoặc 'USER_ENTERED'
    //         insertDataOption: 'INSERT_ROWS', // Để chèn một hàng mới
    //         resource: {
    //           values: newValues,
    //         },
    //     });
    //     readData();
    // }
    
    function getCurrentDateTime() {
        const now = new Date();
      
        // Lấy ngày, tháng, năm
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = now.getFullYear();
      
        // Lấy giờ, phút, giây
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
      
        // Tạo định dạng "dd.mm.yyyy hh:mm:ss"
        const formattedDateTime = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
      
        return formattedDateTime;
    }

    function displayData(range){
        range.forEach(row => {
           var htmlString = `
                <div class="slide">
                    <div class="max-width-448 padding-16 relative" style="width: 100%;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" id="closeloichuc" style="width: 28px; position: absolute; right: 24px; top: 24px; cursor: pointer;">
                                        <path d="M23 23L9 9" stroke="#585858" stroke-opacity="0.6" strokewidth="2" strokelinecap="round" strokelinejoin="round"></path>
                                        <path d="M23 9L9 23" stroke="#585858" stroke-opacity="0.6" strokewidth="2" strokelinecap="round" strokelinejoin="round"></path>
                        </svg>
                        <div class="padding-16"
                            style="background: rgba(238, 241, 239, 0.5); width: 100%; border-radius: 8px;">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAAAWCAYAAABnnAr9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAUvSURBVHgB7VhfTxxVFD/n7syy5U+plcaCGqIx7QfYDyAfoG20lFqalJKQwEsFDBge4cUHkm4r1BdoiArabRTUuDz50v0C+N6NDyUmVNtGilthYXfu8ZyZWXdmugssu5m++Evu3tn7b87v3PPn3kFg3EkudFiG2SvPxxTeG+q+9nh2eamXFAxCgZIjl/vmoY6Y+fHbOFpWh1LRhzcuXskE+0DrQSCKI+nkcE9/AuqM/fiihvnhS9eSwTloC7e8mOKq3W5A2FBI45bGe6VBmCg3+SgC6mh0UpRQbFOIqe3ne7cmBgayt7//skth5KZvktZDI5f716COCPIFgrsEMOn0YjaidOLGxeur3jnK7WwuNhBBh0V41zuIgMbuMAmoEdowBr1KstuIzsdaTVs5rKSx4ByMqMm5laV2qCv8fFlJn5b6qIWNZOqL+1+f8c5QYnLc+SKwUGdw6YIyHkLN8mG8Qk+cd3kQ3F32QojkiFIz39n9NcN9TxABvpjNmyrrbVGWU/sFRDDdogixhV0vpwimZpaX5oKargpi5pX7Pob9EMFzUAcQQotYja9RYYP8Cl8WpBVQPxO+syvf3CzyVZ/YsUc7wRqxUQYSkcHm+AbX7yL/sOvFePG4FMtUvVAlphcWWqSwHNnKo/AE/BcKyqIucWq0uy9h8xWllPgiK/A01538lGdtviNciXRXka8tGEJECOzyQJNbZHIDaGhGRGn3uyVBl5CGKnCsNXqO49ADeXHFQY7grZW6NUAdM68SHjvs1zHhyx7TyC84jqiySLDtG8p8pTI+X1kcYwX1OrLCFkfXLRb4PVT0J5vS6zx5jxfc9MzMNDUZ4qrZw4q1Y+ytNuTNq5xhDgjKxJsEpXeJ8ggbCfSjCKgxdn17gxS7cJQVJ2kdqoTwZfJFr/iL+YonHed3yVqnueTAZxyUuc3JxMDSJAfir1qLlJvoTGDTtBdJ7/6dn5c0DlVi4oOB7HRyYajBMOcqKovYogHa7POKuATCSW5r4njxhP2izWuNzC3Og0Vp41AFpn9i9y8E+NruRzu2kRBtswu+xvWvqCmdy1rJIl/lKsE/F3DdfWR/pWdcp0d7+hJHUVIRE70DG7uF/BAfB1bdlyg7TSO22cU2FIiwoG+z4J2kdYzfvc4WtVluPY3UAVVCNuxlvqSh1JZnw3mCGtN8dvMZhRLhoSg8B0xtFST75L1LocL3oQ4QZSnDkMMexwE8xUK+yeVUqXBUBGRLwedc/waOG5QF67m92lgpsPmWEsMaW+tnEOBbLsNisEHMM1aI/uym0A1N1q0IGu21nsyF1LET5iS5wbEItqCY8wCS9U7aQqE041NyrLky+LpR6/XK4Ws+cP/afHkTmkd7/CdzLDc58cP9M6beO7uzlU/X4m5eeK8NZYF4lrUlWVjOWq5b4R/+ROIHH1syo5euX4UacRi+CCFgdnnxfOkuVU4KO6B2isuxYh6zVDG2pre4XeLWugR6z+g1tra0UnqN72MZCAkGhACS+x3uuyeu+7muRpCTGMVuyqdkO7s94rLB66SCLhEWQlHUIWByeQrBJGKnbJAvCFP1/oJQLRSEAYNS+/Yj/c4KqRy4larLhbgWhKKokQ/713L5/AX2vrS/B7No6QRY9MsBS8SPchSoJ8KxKHDOUMPdfeOc95Mcr1LyMTC3tXdh+KP+JMfsAz/huNemV4bQY5Rze/eDIlYGrJf2bCNSoPF/qPDCVGZ85Ep4Ga4cQjkeHAYzy19xHJJYhHzNoNWj3iv/xyvGv6+gVHgz8sDVAAAAAElFTkSuQmCC"
                                alt="" class="w-4" style="width: 90px; margin: auto;">
                            <p class="text-text text-14 padding-16 line-height-28">${row[1]}</p>
                            <div>
                                <h2 class="text-16  line-height-24 font-medium">-${row[0]}-</h2>
                                <p class="text-16 font-light">${row[2]}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            $("#sync3").trigger('add.owl.carousel', [$(htmlString)]).trigger('refresh.owl.carousel');
            $("#sync4").trigger('add.owl.carousel', [$(htmlString)]).trigger('refresh.owl.carousel');
        });
    }
}(jQuery));