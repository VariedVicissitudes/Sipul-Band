// Toggle class menu
function setMenuState(isOpen) {
    $('.menu').toggleClass('active', isOpen);
    $('.ss-menu1').toggleClass('visible1', isOpen);
    $('.ss-menu2').toggleClass('visible2', isOpen);
    $('.ss-menu3').toggleClass('visible3', isOpen);
    $('.ss-menu4').toggleClass('visible4', isOpen);
    $('.ss-menu5').toggleClass('visible5', isOpen);
}

$(function () {
    $('.menu').on('click', function (event) {
        event.preventDefault();
        setMenuState(!$('.menu').hasClass('active'));
    });

    $('.ss-menu').on('click', function () {
        setMenuState(false);
    });

    $(window).on('scroll', function () {
        if ($('.menu').hasClass('active')) {
            setMenuState(false);
        }
    });
});

// Parallax effect and gsap
$(function () {
  if (!window.location.pathname.match("mentions")) {
    $('.rellax').css('transform', 'translateX(-50%)');
    var rellax = new Rellax('.rellax');
  }
})

// Script adresse Email
// Listener pour chargement adresse mailto
window.addEventListener("load", function () {
    if (document.getElementById('insertMail')) {
        let name = "Contact" ; // site email local-part (personalize as needed)
        let domain = "Sipul.Band" ; // site email domain (personalize as needed)
    //let subject = "subject=Formulaire Tuco" ;
    let divMail = document.getElementById('insertMail');
    let newAhref = document.createElement('a');
    newAhref.href = "mailto:" + name + '@' + domain;
    newAhref.innerHTML = name + '@' + domain;
    divMail.appendChild(newAhref);
  }
})

// Manage vidéo
$(function () {
    const $video = $('#bandVideo');
    const $playlistItems = $('.mediaPlaylistItem');
    const $videoTitle = $('#bandVideoTitle');

    function setActivePlaylistItem(activeIndex) {
        $playlistItems.removeClass('is-active').attr('aria-pressed', 'false');
        $playlistItems.eq(activeIndex).addClass('is-active').attr('aria-pressed', 'true');
    }

    function loadPlaylistVideo(activeIndex, shouldAutoplay) {
        const $activeItem = $playlistItems.eq(activeIndex);

        if (!$video.length || !$activeItem.length) {
            return;
        }

        const nextSource = $activeItem.data('video-src');
        const nextTitle = $activeItem.data('video-title');

        if ($video.attr('src') !== nextSource) {
            $video.attr('src', nextSource);
            $video[0].load();
        }

        $videoTitle.text(nextTitle);
        setActivePlaylistItem(activeIndex);

        if (shouldAutoplay) {
            $video[0].play().catch(function () {});
        }
    }

    if ($playlistItems.length) {
        $playlistItems.each(function (index) {
            $(this).attr('aria-pressed', index === 0 ? 'true' : 'false');
        });

        $playlistItems.on('click', function () {
            loadPlaylistVideo($playlistItems.index(this), true);
        });

        $video.on('ended', function () {
            const currentIndex = $playlistItems.index($('.mediaPlaylistItem.is-active'));
            const nextIndex = (currentIndex + 1) % $playlistItems.length;
            loadPlaylistVideo(nextIndex, true);
        });
    }

    $video.on('click', function (event) {
        event.preventDefault();
        const video = event.currentTarget;

        if (video.paused) {
            video.play().catch(function () {});
        } else {
            video.pause();
        }
    });
});

// Manage form
$(function () {
    const $name = $('#nom');
    const $phone = $('#telephone');
    const $mail = $('#mail');
    const $message = $('#message');
    const $checkRobot = $('#checkRobot');
    const $helpNom = $('#helpNom');
    const $helpTel = $('#helpTel');
    const $helpMail = $('#helpMail');
    const $helpRobot = $('#helpRobot');
    const $helpMessage = $('#helpMessage');

    if ($name.length) {
        $name.on('blur input', function () {
            if ($name.val().length >= 50) {
                $helpNom.text('50 characters max').hide().show();
            } else {
                $helpNom.slideUp(400);
            }
        });
    }

    if ($phone.length) {
        $phone.on('blur input', function () {
            const regexTelephone = /^[+]?([0-9\s().-]){7,}$/;
            let telEntry = String($phone.val()).trim();
            if (telEntry.length && !regexTelephone.test(telEntry)) {
                $helpTel.text('Incorrect phone number').hide().show();
            } else {
                $helpTel.slideUp(400);
            }
        });
    }

    if ($mail.length) {
        $mail.on('blur input', function () {
            const regexMail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
            const mailEntry = $mail.val();
            if (!mailEntry.match(regexMail)) {
                $helpMail.text('Incorrect email address').hide().show();
            } else {
                $helpMail.slideUp(400);
            }
        });
    }

    if ($checkRobot.length) {
        $checkRobot.on('blur input', function () {
            if ($checkRobot.val() != 7) {
                $helpRobot.text('Incorrect result of the operation').hide().show();
            } else {
                $helpRobot.slideUp(400);
            }
        });
    }

    if ($message.length && $helpMessage.length) {
        $message.on('blur input', function () {
            if ($message.val().length >= 3000) {
                $helpMessage.text('Your message must not exceed 3000 characters').hide().slideDown(400);
            } else {
                $helpMessage.slideUp(400);
            }
        });
    }
});

// Contact form
$(function () {
    const $contactForm = $('.contactForm');

    if (!$contactForm.length) {
        return;
    }

    $contactForm.on('submit', function (e) {
        e.preventDefault();

        const nom = $('#nom').val();
        const telephone = $('#telephone').val();
        const mail = $('#mail').val();
        const message = $('#message').val();
        const newsletter = $('input[name="newsletter"]:checked').val();
        const checkRobot = $('#checkRobot').val();
        const $form = $(this);

        if ($('#checkRobot').val() == 7) {
            $.post('./datas/sendFormContact.php', {
                nom: nom,
                telephone: telephone,
                mail: mail,
                message: message,
                newsletter: newsletter,
                checkRobot: checkRobot
            }, function (data) {
                $form.fadeOut(400, function () {
                    $('#retourFormulaire').css({
                        padding: '10px',
                        'margin-top': '160px',
                        'margin-bottom': '160px',
                        'margin-left': 'auto',
                        'margin-right': 'auto',
                        color: 'white',
                        'font-size': '1rem',
                        'text-align': 'center'
                    });
                    $('#retourFormulaire').html(data);
                });
                $('#nom').val('');
                $('#telephone').val('');
                $('#mail').val('');
                $('#message').val('');
                $('#checkRobot').val('');
            });
        } else {
            alert('Incorrect anti robot check result !');
        }
    });
});

// Form newsletter input blur
$(function () {
    const regexMail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    const $emailNews = $('#emailNews');
    const $checkRobotNews = $('#checkRobotNews');
    const $helpMailNews = $('#helpMailNews');
    const $hideNews = $('#hideNews');

    if ($emailNews.length) {
        $emailNews.on('blur input', function () {
            const mailEntry = $emailNews.val();
            if (!mailEntry.match(regexMail)) {
                $helpMailNews.text('Incorrect email address').hide().show();
                $hideNews.hide();
            } else {
                $helpMailNews.slideUp(100, function () {
                    $hideNews.fadeIn();
                });
            }
        });
    }

    if ($checkRobotNews.length) {
        $checkRobotNews.on('blur input', function () {
            if ($checkRobotNews.val() != 7) {
                $helpMailNews.text('Incorrect result').hide().show();
            } else {
                $helpMailNews.slideUp(100);
            }
        });
    }
});

// Form newsletter ajax send
$(function () {
    const $newsletterForm = $('.newsletterForm');

    if (!$newsletterForm.length) {
        return;
    }

    $newsletterForm.on('submit', function (e) {
        e.preventDefault();
        const mail = $('#emailNews').val();
        const checkRobot = $('#checkRobotNews').val();
        const $form = $(this);

        if ($('#checkRobotNews').val() == 7) {
            $.post('./datas/sendFormSubscription.php', {
                mail: mail,
                checkRobot: checkRobot
            }, function (data) {
                $form.fadeOut(400, function () {
                    $('#retourNewsFormulaire').css({
                        padding: '10px',
                        'margin-top': '60px',
                        'margin-bottom': '60px',
                        'margin-left': 'auto',
                        'margin-right': 'auto',
                        color: 'white',
                        'font-size': '1rem',
                        'text-align': 'center'
                    });
                    $('#retourNewsFormulaire').html(data);
                });
                $('#emailNews').val('');
                $('#checkRobotNews').val('');
            });
        } else {
            alert('Incorrect anti robot check result !');
        }
    });
});

// Animations on scroll
$(function () {
    $(window).on('scroll', function () {
        let sizePage = $(window).height();
        let trigger = 100;
        // Animation en Y
        let element = document.getElementsByClassName('animatableY');
        for (var unit of element) {
          if (unit.getBoundingClientRect().top + trigger <= sizePage) {
            unit.classList.add('showed');
          }
        }

        // Animation en X
        let elementh2 = document.getElementsByClassName('animatableX');
        for (var unit of elementh2) {
          if (unit.getBoundingClientRect().top + trigger <= sizePage) {
            unit.classList.add('showed');
          }
        }

        // Animation opacity
        let elementOpacity = document.getElementsByClassName('animatableOpacity');
        for (var unit of elementOpacity) {
          if (unit.getBoundingClientRect().top + trigger <= sizePage) {
            unit.classList.add('showed');
          }
        }
    })
})

//Lazyload
$(function () {
  if (!window.location.pathname.match("mentions")) {
        if (typeof lazyload === 'function') {
            lazyload();
        }
  }
})

// Manage scroll up button
$(function () {
    const $upArrow = $('#upArrow');

    if (!$upArrow.length) {
        return;
    }

    $(window).on('scroll', function () {
        const scrollNow = $(window).scrollTop();
        $upArrow.toggle(scrollNow > 600);
    });

    $upArrow.on('click', function (event) {
        event.preventDefault();
        $('html, body').stop().animate({ scrollTop: 0 }, 400);
    });
});

// Locations
$(function () {
        $(".card").on('click', function () {
                window.open("https://www.instagram.com/sipul_band/", "_blank", "noopener");
        });
})
