var portfolio = {

    init: function init() {
        this.myNameAnimation();
        this.scrollingTitles();
        this.scrollImageInfo();
        this.navExpand();
        this.scrollToSection();
        this.imageInfo();
        this.techIconAnimation();
        this.techIconHover();
        this.socialIconText();
        this.heartAnimation();
    },

    scrollToSection: function scrollToSection() {
        var scrollOffset = 0;
        if ($(window).width() < 1000) {
            scrollOffset = $(window).height() / 4;
        } else {
            scrollOffset = $(window).height() / 3;
        }

        $('.navLink').click(function (e) {
            e.preventDefault();
            if ($(this).attr('href') === '#') {
                $('html, body').animate({
                    scrollTop: 0
                }, 1000);
            } else {
                $('html, body').animate({
                    scrollTop: $($(this).attr('href')).offset().top - scrollOffset
                }, 1000);
            }
        });
    },

    myNameAnimation: function myNameAnimation() {
        var $name = $('#myName'),
            $letter = $name.find('.letter'),
            $front = $name.find('#front'),
            $end = $name.find('#end'),
            $dev = $name.find('#dev'),
            $slash = $name.find('.slash'),
            tl = new TimelineMax();
        //Name line animation
        //TweenMax.staggerTo($letter, 0.8, { 'stroke-dashoffset': 0, ease: Power4.easeIn }, 0.2);

        //'front end dev' text========================================
        tl.from($front, 0.3, { x: -285, ease: Bounce.easeOut }, 2.5).from($end, 0.3, { y: 110, ease: Bounce.easeOut }).from($dev, 0.3, { x: 230, ease: Bounce.easeOut }).from($slash, 0.3, { y: 110, ease: Bounce.easeOut }).to('nav', 1, { autoAlpha: 1 }).to('#svgNameContainer', 1, { top: '15vh' }).to('#myName', 1, { scale: 0.85, transformOrigin: '50% 50%' }, '-=1')
        //.to('#myName', 1, {top: '20vh', scale: 0.75})
        .to('.notFixed', 1, { top: '35vh' }, '-=1');
    },

    navExpand: function navExpand() {
        var $navIcon = $('#navIcon'),
            $iconTop = $navIcon.find('#top'),
            $iconMid = $navIcon.find('#mid'),
            $iconBot = $navIcon.find('#bot'),
            $nav = $('nav'),
            $links = $('.navLink'),
            tl = new TimelineMax({ paused: true });

        //animate icon and nav
        tl.to($nav, 0.5, { y: 0, autoAlpha: 1, ease: Power3.easeOut }).to($iconMid, 0.2, { autoAlpha: 0 }, 0).to($iconTop, 0.5, { rotation: 45, transformOrigin: '0% 50%', ease: Power3.easeOut }, 0).to($iconBot, 0.5, { rotation: -45, transformOrigin: '0% 50%', ease: Power3.easeOut }, 0);

        $navIcon.click(function () {
            if (!$nav.hasClass('out')) {
                tl.play();
                $nav.addClass('out');
            } else {
                tl.reverse();
                $nav.removeClass('out');
            }
        });

        //Close nav when a link is clicked
        $links.click(function () {
            if ($nav.hasClass('out')) {
                tl.reverse();
                $nav.removeClass('out');
            }
        });
    },

    expandingTitles: function expandingTitles(str, id) {
        str = str.toUpperCase();
        var arr = str.split("");

        arr.forEach(function (letter) {
            document.getElementById(id).innerHTML += '<h1 class="' + id + 'letter expand">' + letter + '</h1>';
        });

        var number = $("." + id + "letter").length;
        var move = number * 5 - 5;

        for (var i = 0; i <= number; i++) {
            $("." + id + "letter").eq(i).animate({ left: '-=' + move + '%', opacity: 1 }, 500);
            move -= 10;
        }
    },

    scrollingTitles: function scrollingTitles() {
        var that = this;
        var controller = new ScrollMagic.Controller();

        $('.titleBox').each(function () {
            var str = $(this).find('h1').attr('id');
            var topLine = $(this).find('.topLine');
            var tl = new TimelineMax().to(topLine, 1, { width: '100%' });

            var scene = new ScrollMagic.Scene({
                triggerElement: this,
                triggerHook: 0.8,
                reverse: false
            })
            /*.addIndicators({
              colorTrigger: '#fff'
            })*/
            .on('start', function () {
                that.expandingTitles(str, str);
            }).setTween(tl).addTo(controller);
        });
    },

    scrollImageInfo: function scrollImageInfo() {
        var testcontroller = new ScrollMagic.Controller();
        //If on small device trigger image info at top of screen(no hover)
        if ($(window).width() < 1000) {
            $('.imgBox').each(function () {
                var tl = new TimelineMax().to($(this).find('.info'), 0.5, { scale: 1, autoAlpha: 1, transformOrigin: '50% 50%' }).to($(this).find('a'), 0.5, { rotationX: 0 }, 0);

                var testscene = new ScrollMagic.Scene({
                    triggerElement: this,
                    triggerHook: 0.45,
                    duration: 200
                })
                /*.addIndicators({
                  colorTrigger: 'yellow'
                })*/
                .setTween(tl).addTo(testcontroller);
            });
        }
    },

    imageInfo: function imageInfo() {
        var $info = $('.info');

        TweenMax.set($info, { scale: 0, autoAlpha: 1, transformOrigin: '50% 50%' });
        if ($(window).width() > 1000) {
            $('.imgBox').hover(function () {
                TweenMax.to($(this).find($info), 0.5, { scale: 1, transformOrigin: '50% 50%' });
            }, function () {
                TweenMax.to($(this).find($info), 0.5, { scale: 0, transformOrigin: '50% 50%' });
            });
        }
    },

    techIconAnimation: function techIconAnimation() {
        var iconTL = new TimelineMax({ repeat: -1, repeatDelay: 5 });
        var element = $('.tech');
        if ($(window).width() < 1000) {
            iconTL.staggerTo(element, 0.6, { scale: 2, repeat: 1, yoyo: true, ease: Power4.easeIn }, 0.2);
        } else {
            element.hover(function () {
                TweenMax.to(this, 0.5, { scale: 2, 'zIndex': 2, ease: Bounce.easeOut });
            }, function () {
                TweenMax.to(this, 0.5, { scale: 1, 'zIndex': 1, ease: Bounce.easeOut });
            });
        }
    },

    techIconHover: function techIconHover() {
        $('.tech').on('click mouseover', function () {
            var textToAdd = $(this).attr('id');
            $('.hoverText').text(textToAdd);
        });
    },

    socialIconText: function socialIconText() {
        var iconTL = new TimelineMax({ repeat: -1 });
        var element = $('.socialIcons');
        var elementName = $('#iconName h1');

        iconTL.staggerTo(element, 2, { 'opacity': 1, repeat: 1, yoyo: true, ease: Power4.easeInOut }, 2.5).staggerTo(elementName, 2, { 'opacity': 1, repeat: 1, yoyo: true, ease: Power4.easeInOut }, 2.5, 0);
    }

}; //portfolio end


// ready
$(document).ready(function () {
    portfolio.init();
});
/**
 * load
 */

document.addEventListener('DOMContentLoaded', function () {
    (function () {
        // my function loader
    })();
}, false);

/**
 * exists
 */
if (document.querySelector('.mydivclass') !== null) {
    // .. it exists
}
function mobileMediaQuery() {

    var mediaQueryInfo = {
        xs: matchMedia("(max-width: 576px)"),
        sm: matchMedia("(min-width: 577px) and (max-width: 768px)"),
        md: matchMedia("(min-width: 769px) and (max-width: 991px)"),
        lg: matchMedia("(min-width: 992px) and (max-width: 1200px)"),
        xl: matchMedia("(min-width: 1201px)"),
        iPad: matchMedia("(min-width: 577px) and (max-width: 1024px)")

    };
    var bodySelector = document.querySelectorAll('body')[0];

    /*
     *  Mobile Class
     *   => Toggle Class: ***
     * */
    if (mediaQueryInfo.xs.matches) {
        if (document.querySelector('.sizes__xs') === null) {
            bodySelector.classList.add('sizes__xs');
        } else {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = bodySelectorInfo[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var value = _step.value;

                    if (value === 'sizes__sm' || value === 'sizes__md' || value === 'sizes__lg' || value === 'sizes__xl') {
                        bodySelector.classList.remove(value);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    } else if (mediaQueryInfo.sm.matches) {
        if (document.querySelector('.sizes__sm') === null) {
            bodySelector.classList.add('sizes__sm');
        } else {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = bodySelectorInfo[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _value = _step2.value;

                    if (_value === 'sizes__xs' || _value === 'sizes__md' || _value === 'sizes__lg' || _value === 'sizes__xl') {
                        bodySelector.classList.remove(_value);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    } else if (mediaQueryInfo.md.matches) {
        if (document.querySelector('.sizes__md') === null) {
            bodySelector.classList.add('sizes__md');
        } else {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = bodySelectorInfo[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var _value2 = _step3.value;

                    if (_value2 === 'sizes__xs' || _value2 === 'sizes__sm' || _value2 === 'sizes__lg' || _value2 === 'sizes__xl') {
                        bodySelector.classList.remove(_value2);
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    } else if (mediaQueryInfo.lg.matches) {
        if (document.querySelector('.sizes__lg') === null) {
            bodySelector.classList.add('sizes__lg');
        } else {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = bodySelectorInfo[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var _value3 = _step4.value;

                    if (_value3 === 'sizes__xs' || _value3 === 'sizes__md' || _value3 === 'sizes__sm' || _value3 === 'sizes__xl') {
                        bodySelector.classList.remove(_value3);
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
    } else if (mediaQueryInfo.xl.matches) {
        if (document.querySelector('.sizes__xl') === null) {
            bodySelector.classList.add('sizes__xl');
        } else {
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = bodySelectorInfo[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var _value4 = _step5.value;

                    if (_value4 === 'sizes__xs' || _value4 === 'sizes__md' || _value4 === 'sizes__lg' || _value4 === 'sizes__sm') {
                        bodySelector.classList.remove(_value4);
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }
        }
    }

    /*
     *  Mobile menu
     *   => Toggle Class: mobileMenu
     * */
    if (mediaQueryInfo.mobileNav.matches) {
        if (document.querySelector('.mobileMenu') === null) {
            bodySelector.classList.add('mobileMenu');
        }
    } else {
        bodySelector.classList.remove('mobileMenu');
    }

    /*
     *  iPat Land Scape
     *   => Toggle Class: iPadLandscape
     * */
    if (mediaQueryInfo.iPad.matches) {
        bodySelector.classList.toggle('iPadLandscape');
    }
}

/**
 * Funcion Resize
 * Resize mediaQuery
 **/

window.addEventListener("resize", function () {
    //mobileMediaQuery();
});

/**
 * Funcion Ready
 **/
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {

        //mobileMediaQuery();

    }, 1500);
}, false);
/**
 *  Llamados
 *
 ==============================================================================*/

/**
 * Init
 */
(function () {
    setTimeout(function () {
        //detectBrowser();
        //mobileDetecting();
        //viewportSize();
    }, 3000);

    if ($('body').is('.mobile')) {}
})();

/**
 * Scroll
  */
window.onscroll = function () {}
//detectBrowser();
//mobileDetecting();
//viewportSize();


/**
 * Resize
 */
;window.addEventListener("resize", function () {
    //detectBrowser();
    //mobileDetecting();
    //viewportSize();
});

/**
 * load
 */
window.onload = function () {
    // my function loader
};

/**
 *    Info browser
 *        Dispocitivos desktop
 *        Nombre version
 */
function detectBrowser() {
    var BrowserDetect = {
        init: function init() {
            this.browser = this.searchString(this.dataBrowser) || "Other";
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
        },
        searchString: function searchString(data) {
            for (var i = 0; i < data.length; i++) {
                var dataString = data[i].string;
                this.versionSearchString = data[i].subString;

                if (dataString.indexOf(data[i].subString) !== -1) {
                    return data[i].identity;
                }
            }
        },
        searchVersion: function searchVersion(dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index === -1) {
                return;
            }

            var rv = dataString.indexOf("rv:");
            if (this.versionSearchString === "Trident" && rv !== -1) {
                return parseFloat(dataString.substring(rv + 3));
            } else {
                return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
            }
        },

        dataBrowser: [{ string: navigator.userAgent, subString: "Edge", identity: "MS Edge" }, { string: navigator.userAgent, subString: "MSIE", identity: "Explorer" }, { string: navigator.userAgent, subString: "Trident", identity: "Explorer" }, { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" }, { string: navigator.userAgent, subString: "Opera", identity: "Opera" }, { string: navigator.userAgent, subString: "OPR", identity: "Opera" }, { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" }, { string: navigator.userAgent, subString: "Safari", identity: "Safari" }]
    };

    BrowserDetect.init();

    //body add class
    var bodyTag = document.getElementsByTagName("body")[0];
    //console.log( BrowserDetect.browser + BrowserDetect.version);
    bodyTag.classList.add(BrowserDetect.browser + BrowserDetect.version);
    bodyTag.classList.add(BrowserDetect.browser);
}

/**
 *    Info browser
 *        Dispocitivos moviles
 */
function mobileDetecting() {
    var bodyTag = document.getElementsByTagName("body")[0];

    var isMobile = {
        Android: function Android() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function BlackBerry() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function iOS() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        iPhone: function iPhone() {
            return navigator.userAgent.match(/iPhone|iPod/i);
        },
        ipad: function ipad() {
            return navigator.userAgent.match(/iPad/i);
        },
        Opera: function Opera() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function Windows() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function any() {
            return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
        }
    };

    // Es movil
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        bodyTag.classList.add('mobile');
    }

    // Es ios
    if (isMobile.iOS()) {
        bodyTag.classList.add('iOS');
    }

    // tipo de movil
    if (isMobile.Android()) {
        bodyTag.classList.add('Android');
    } else if (isMobile.BlackBerry()) {
        bodyTag.classList.add('BlackBerry');
    } else if (isMobile.ipad()) {
        bodyTag.classList.add('ipad');
    } else if (isMobile.iPhone()) {
        bodyTag.classList.add('iPhone');
    } else if (isMobile.Opera()) {
        bodyTag.classList.add('Opera');
    } else if (isMobile.Windows()) {
        bodyTag.classList.add('Windows');
    }
}

/**
 *    viewport Size
 *        viewportSize
 */
function viewportSize() {
    var ventanaAncho = $(window).width();
    var ventanaAlto = $(window).height();

    var altoViewpor = ventanaAlto + 'px';
    var anchoViewpor = ventanaAncho + 'px';

    if (ventanaAncho <= 480) {
        console.log('movil :', ventanaAncho);
    } else if (ventanaAncho > 480 && ventanaAncho <= 768) {
        console.log('tabla :', ventanaAncho);
    } else if (ventanaAncho > 768) {
        console.log('desktop :', ventanaAncho);
    }
}

/**
 *  nav fixed
 *    clase activa para efecto "menu-fixed"
 *    menui => contenedor fixet
 */
function fixetNav() {
    var nav = document.querySelector('.navbar__global');
    var navTop = nav.offsetTop;
    console.log(navTop);
    console.log(window.scrollY);
    if (window.scrollY > navTop) {
        // nav offsetHeight = height of nav
        document.body.style.paddingTop = nav.offsetHeight + 'px';
        nav.classList.add('fixed-nav');
    } else {
        document.body.style.paddingTop = 0;
        nav.classList.remove('fixed-nav');
    }
}

window.addEventListener('scroll', function () {
    // fixetNav();
});
/**
 * Nav Active
 */
function navActive() {
    var pats = window.location.pathname.split('/');
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
        for (var _iterator6 = mira[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var value = _step6.value;

            console.log(value);
        }
    } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
                _iterator6.return();
            }
        } finally {
            if (_didIteratorError6) {
                throw _iteratorError6;
            }
        }
    }
}

(function () {
    navActive();
})();
/**
 * Bar progres 
 */
function progresBar() {

    var progress = document.querySelector('.barra-progreso');
    var bar = progress.querySelector('.barra-progresoEstatus');

    var scrollSpace = document.body.scrollHeight - window.innerHeight;
    var read = window.scrollY / scrollSpace * 100;
    bar.style.width = read + '%';
};

/**
 * called Bar progres 
 */
//window.addEventListener('scroll', () => progresBar() );
//window.addEventListener('resize', () => progresBar() );

/**
 * Styles Bar progres 
 */

/**
.barra-progreso {
    width: 100%;
    height: 2px;
    margin: -2px auto 0;
    background: #DDD;
    position: absolute;
    bottom: -1px;
    left: 0;
    .barra-progresoEstatus{
      position: absolute;
      height: 100%;
      width: 1px;
      background: linear-gradient(90deg, tomato,orange);
      transition: 0s width linear;
    }
  }
 */
/**
 * | Custom javascript scroll bar |
 *  ------------------------------
 * barra de desplazamiento horizontal.
 *
 *  *  *  *  *  *  Llamado *  *  *  *  *
 *
 *  *  *  *  *  *  options *  *  *  *  *
 * Function => scrollBar (".identifier");
 * Parameters options => ("#identifier","color","height");
 *
**/

(function scrollBar() {
    //scrollBar (".scrollbar");
})();

/**
 * | Custom javascript scroll bar |
 *  ------------------------------
 * barra de desplazamiento horizontal.
 *
 *
 *  *  *  *  *  *  options *  *  *  *  *
 *
 * Function => scrollBar (".identifier");
 * Parameters options => ("#identifier","color","height");
 *
 *  *  *  *  *  *  Markup  *  *  *  * *
 *
 *  <div class="scrollbar">
 *    <div class="scrollbar-bg"></div>
 *  </div>
 *
**/

function scrollBar(scrollbar) {
    var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "#f19636";
    var heightBar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "5px";

    // var color = "#f19636";
    // contenedor Barra de progreso
    var bar_bg = document.querySelectorAll(scrollbar + '-bg')[0];
    bar_bg.setAttribute("style", 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: ' + color + ';');

    // Barra de progreso
    var bar = document.querySelectorAll('' + scrollbar)[0];
    bar.setAttribute("style", 'position: fixed; top: 0; left: 0; overflow: hidden; width: 0%; height: ' + heightBar + '; z-index: 9999;');

    var body = document.body,
        html = document.documentElement;

    bar_bg.style.minWidth = document.width + "px";

    document.getElementsByTagName("body")[0].onresize = function () {
        // Actualiza el ancho del degradado
        bar_bg.style.minWidth = document.width + "px";
    };

    window.onscroll = function () {
        var dw = document.documentElement.clientWidth,
            dh = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight),
            wh = window.innerHeight,
            pos = pageYOffset || (document.documentElement.clientHeight ? document.documentElement.scrollTop : document.body.scrollTop),
            bw = pos / (dh - wh) * 100;

        bar.style.width = bw + "%";
    };
}

/**
 * Scroll horizontal
 *    rueda mouse solo en div class container-horizontal
 */
function scrollHorizontal() {
    $('.container-horizontal').on('mousewheel', function (event, delta) {
        this.scrollLeft -= delta * 30;
        event.preventDefault();
    });
}

/**
 * Funcion slider
 *
 */
function slideToggle() {

    // Set the effect type (slide slow fast swing linear)
    var effect = 'slide';

    // Set the options for the effect type chosen (Right Left Up Down)
    var options = { direction: "down" };

    // Set the duration (default: 400 milliseconds)
    var duration = 500;

    $('#bannerfullscreen').toggle(effect, options, duration);
}

/**
 *  | Smooth scroll |
 *  -----------------
 *
 * *  *  *  *  *  *  options *  *  *  *  *
 *
 * Add class => .scrollLink
 * Add speed => data-speed="2000"
 *
 *
 *  *  *  *  *  *  Ejemplo *  *  *  *  *
 *  <a class="scrollLink" data-speed="2000" href="#bazinga"> </a>
 *  <a class="scrollLink" data-speed="1000" href="#booya">   </a>
**/

function scrollLink() {
    if ('querySelector' in document && 'addEventListener' in window && Array.prototype.forEach) {

        // Function to animate the scroll
        var smoothScroll = function smoothScroll(anchor, duration) {

            // Calculate how far and how fast to scroll
            var startLocation = window.pageYOffset;
            var endLocation = anchor.offsetTop;
            var distance = endLocation - startLocation;
            var increments = distance / (duration / 16);
            var stopAnimation;

            // Scroll the page by an increment, and check if it's time to stop
            var animateScroll = function animateScroll() {
                window.scrollBy(0, increments);
                stopAnimation();
            };

            // If scrolling down
            if (increments >= 0) {
                // Stop animation when you reach the anchor OR the bottom of the page
                stopAnimation = function stopAnimation() {
                    var travelled = window.pageYOffset;
                    if (travelled >= endLocation - increments || window.innerHeight + travelled >= document.body.offsetHeight) {
                        clearInterval(runAnimation);
                    }
                };
            }
            // If scrolling up
            else {
                    // Stop animation when you reach the anchor OR the top of the page
                    stopAnimation = function stopAnimation() {
                        var travelled = window.pageYOffset;
                        if (travelled <= (endLocation || 0)) {
                            clearInterval(runAnimation);
                        }
                    };
                }

            // Loop the animation function
            var runAnimation = setInterval(animateScroll, 16);
        };

        // Define smooth scroll links
        var scrollToggle = document.querySelectorAll('.scrollLink');

        // For each smooth scroll link
        [].forEach.call(scrollToggle, function (toggle) {

            // When the smooth scroll link is clicked
            toggle.addEventListener('click', function (e) {

                // Prevent the default link behavior
                e.preventDefault();

                // Get anchor link and calculate distance from the top
                var dataID = toggle.getAttribute('href');
                var dataTarget = document.querySelector(dataID);
                var dataSpeed = toggle.getAttribute('data-speed');

                // If the anchor exists
                if (dataTarget) {
                    // Scroll to the anchor
                    smoothScroll(dataTarget, dataSpeed || 500);
                }
            }, false);
        });
    }
}

(function scrollLinkCalled() {
    // scrollLink ();
})();