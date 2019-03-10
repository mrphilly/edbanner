$(document).ready(function () {


document.getElementById("tel")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        $('.sauvegarder').trigger("click")
    }
});
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('pay');
    if (myParam != undefined) {

        var data = {
            'response': 'ok'
        }

        $(".lds-hourglass").hide()
        $(".page").hide()


        $.ajax({
            type: "POST",
            url: "/ads",
            datatype: "json",
            contentType: 'application/json',
            success: function (response) {
                $("#loading").modal('toggle')
                if(response=="ok"){
                    $("#loading").modal('toggle')
                     var notify = $.notify({
            message: '<strong>Ne fermez pas cette page</strong>Initialisation du traitement...',
            type: 'info',
            icon: 'fa fa-spinner',
            },{
            allow_dismiss: false,
            showProgressbar: true,
            delay: 60000,
            timer: 1000,
            placement: {
                from: "bottom",
                align: "center"
            },
            offset: {
                x: 150,
                y: 300
            },
            onClose: function () {

                $('#ignismyModal').modal("toggle")
            },
        });
        setTimeout(function () {
            notify.update({
                'message': '<strong>Connexion à google...</strong>.',

            });
        }, 10000);
        setTimeout(function () {

            notify.update({
                'message': '<strong>Plus que quelques secondes...</strong>.',


            });


        }, 15000);
        setTimeout(function () {
            notify.update({
                message: "<strong>Publication de l'annonce</strong> en cours.",
                icon: 'fa fa-paper-plane',
            },{
                'type': 'success',
            });
            console.log("1")

        }, 20000);


                }else{
                    window.location = "banner.comparez.co"
                }

            },

            data: JSON.stringify(data),
        });







    } else {

        $('.b, .c, .d').hide();
        $('.next, .prev').hide();
        $('.next').on("click", function () {
            $('.carousel').carousel('next')

        })
        $('.prev').on("click", function () {
            $('.carousel').carousel('prev')

        })
        onReady(function () {

            setVisible('.page', true);
            setVisible('.lds-hourglass', false);

        });

        toggleCard();
        toggleCarousel();
        $('.carousel').carousel({
            pause: true,
            interval: false,
        })

        $('#error').hide();
        $('#phone-error').hide();
        setTimeout(function () {
            $.notify({
                message: 'Cliquez sur le bouton <strong>Insérer une image</strong>  pour commencer !',
                icon: 'fa fa-hand-o-down',
            }, {
                delay: 60000,
                timer: 1000,
            }, {
                allow_dismiss: true,
                showProgressbar: false
            });
        }, 3000)


    }


})
$("#ignismyModal").on("hidden.bs.modal", function () {
   /*  window.location = "http://0.0.0.0:5009" */
    window.location = "banner.comparez.co"
});




function onReady(callback) {
    var intervalId = window.setInterval(function () {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalId);
            callback.call(this);
        }
    }, 2500);
}

function onReady1(callback) {
    var intervalId = window.setInterval(function () {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalId);
            callback.call(this);
        }
    }, 10000);
}

function setVisible(selector, visible) {
    document.querySelector(selector).style.display = visible ? 'block' : 'none';
}

function setVisible1(selector, visible) {
    document.querySelector(selector).style.display = visible ? 'block' : 'none';
}

function detectBrowser() {
    var isFirefox = typeof InstallTrigger !== 'undefined';
    var btn_download = $('.btn_download');
    var block = $('.block');
    var start_card = $('._start-card');
    var description_section = $('.description-section');
    var titre = $('.label-titre');
    var prix = $('.price');
    var tel = $('.tel');
    var icon_tel = $('.fa-phone')
    if (isFirefox) {
        btn_download.removeAttr('id');
        btn_download.attr('id', 'btn_download');
        block.removeClass('button-block');
        block.addClass("button-block-firefox");
        start_card.removeClass('start-card');
        start_card.addClass('start-card-firefox');
        description_section.removeClass('description-section');
        description_section.addClass('description-section-firefox');
        titre.removeClass('label-titre');
        titre.addClass('label-titre-firefox');
        prix.removeClass('label-prix');
        prix.addClass('label-prix-firefox');
        tel.removeClass('label-tel')
        tel.addClass('label-tel-firefox')
        icon_tel.removeClass('icon')
    }
}
$("#btn").click(() => {
    takeScreenShot()
})

interact('#droppable').dropzone({
    // only accept elements matching this CSS selector
    accept: '#yes-drop',
    accept: '.drag1',
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,

    // listen for drop related events:

    ondropactivate: function (event) {
        // add active dropzone feedback

    },
    ondragenter: function (event) {
        var dropzoneElement = event.target;

        // feedback the possibility of a drop


    },
    ondragleave: function (event) {
        // remove the drop feedback style


    },
    ondrop: function (event) {

    },
    ondropdeactivate: function (event) {
        // remove active dropzone feedback

    }
});

interact('.drag')
    .draggable({
        inertia: true,
        restrict: {
            restriction: "parent",
            endOnly: true,
            elementRect: {
                top: 0,
                left: 0,
                bottom: 1,
                right: 1
            }
        },
        autoScroll: true,
        // dragMoveListener from the dragging demo above
        onmove: dragMoveListener,
    });

interact('.drag1')
    .draggable({
        inertia: true,
        restrict: {
            restriction: "parent",
            endOnly: true,
            elementRect: {
                top: 0,
                left: 0,
                bottom: 1,
                right: 1
            }
        },
        autoScroll: true,
        // dragMoveListener from the dragging demo above
        onmove: dragMoveListener,
    });

function dragMoveListener(event) {

    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}



var takeScreenShotComparez = function () {

    html2canvas(document.querySelector(".atvImg-container"), {
        onrendered: function (canvas) {
            var tempcanvas = document.createElement('canvas');
            tempcanvas.width = 270;
            tempcanvas.height = 347;
            var context = tempcanvas.getContext('2d');
            context.drawImage(canvas, 0, 0, 270, 347);
            $('#final-img').attr('src', tempcanvas.toDataURL('image/jpg')) //function blocks CORS

        }
    });
}
var takeScreenShotAdwords = function () {
    var description = $("#description");
    var prix = $("#prix");
    var tel = $("#tel")
    var infos_desc = $("#infos-desc");
    var infos_prix = $("#infos-prix");
    //var infos_tel = $("#infos-tel")
    var ADS = {}
    html2canvas(document.querySelector(".figure"), {
        onrendered: function (canvas) {
            var tempcanvas = document.createElement('canvas');
            tempcanvas.width = 600;
            tempcanvas.height = 314;
            var context = tempcanvas.getContext('2d');
            var AR = calculateAspectRatio(canvas, tempcanvas);
            context.drawImage(canvas, AR.startX, AR.startY, AR.renderableWidth, AR.renderableHeight);
            $('#final-img-adwords').attr('src', tempcanvas.toDataURL('image/jpg')) //function blocks CORS
            infos_desc.text(description.val())
            infos_prix.text(prix.val())
            //infos_tel.text(tel.val())

        }

    });
}

var takeScreenShotFacebook = function () {

}

function telecharger() {
    var image = $("img[alt='final-image']").attr("src")
    console.log(image)
    var link = document.createElement("a");
    link.href = image
    link.download = 'comparez_banner.jpg'
    link.click()
}

function prependEle(parent, child) {
    parent.insertBefore(child, parent.firstChild);
};
//insert child after parent
function appendEle(parent, child) {
    parent.parentNode.insertBefore(child, parent.nextSibling);
};

function addLogo() {
    var figure = $('.figure')
    var parent = document.querySelector(".banner-image")
    var logo = $(".logo-image")
    console.log(logo)
    var file = document.querySelector('#logo-insert').files[0]; //sames as here
    var reader = new FileReader();
    if (logo != null) {
        logo.remove()
        var canvas_AR = document.createElement('canvas');
        var div = document.createElement('div')
        div.setAttribute("class", "card-img-top logo-image drag superposition1")
        div.setAttribute("onmousedown", "showBorder()")
        div.setAttribute("onmouseup", "removeBorder()")
        div.style.width = '50px';
        div.style.height = '50px';
        canvas_AR.width = 50;
        canvas_AR.height = 50;
        div.append(canvas_AR)
        appendEle(parent, div)
        var context_AR = canvas_AR.getContext('2d');
        reader.onloadend = function () {
            var image_AR = new Image();
            image_AR.onload = function () {
                var AR = calculateAspectRatio(image_AR, canvas_AR);
                context_AR.drawImage(image_AR, AR.startX, AR.startY, AR.renderableWidth, AR.renderableHeight);
            }
            image_AR.src = reader.result;

            $('.next').trigger('click')
            $('.carousel').carousel('next')
            $('.next').hide()

        }

        if (file) {
            reader.readAsDataURL(file); //reads the data as a URL
        } else {
            logo.attr("src", "");
        }
    } else {

        var canvas_AR = document.createElement('canvas');
        var div = document.createElement('div')
        div.setAttribute("class", "card-img-top logo-image drag superposition1")
        div.setAttribute("onmousedown", "showBorder()")
        div.setAttribute("onmouseup", "removeBorder()")
        div.style.width = '50px';
        div.style.height = '50px';
        canvas_AR.width = 50;
        canvas_AR.height = 50;
        div.append(canvas_AR)
        appendEle(parent, div)
        var context_AR = canvas_AR.getContext('2d');
        reader.onloadend = function () {
            var image_AR = new Image();
            image_AR.onload = function () {
                var AR = calculateAspectRatio(image_AR, canvas_AR);
                context_AR.drawImage(image_AR, AR.startX, AR.startY, AR.renderableWidth, AR.renderableHeight);
            }
            image_AR.src = reader.result;

            $('.next').trigger('click')
            $('.carousel').carousel('next')
            $('.next').hide()

        }

        if (file) {
            reader.readAsDataURL(file); //reads the data as a URL
        } else {
            logo.attr("src", "");
        }
    }

}




function addImage() {


    var preview = document.querySelector('.banner-image'); //selects the query named img
    var file = document.querySelector('#addimage').files[0]; //sames as here
    var reader = new FileReader();
    var parent = document.querySelector(".figure")
    var figure = document.getElementsByClassName("figure")
    var fi = $('.figure')
    var banner = $('.banner-image')
    var banniere = document.querySelector(".banner-image")



    var canvas_AR = document.createElement('canvas');
    var div = document.createElement('div')
    div.setAttribute("class", "card-img-top banner-image")
    div.width = 250;
    div.height = 250;
    canvas_AR.width = 250;
    canvas_AR.height = 250;
    if (banniere != null) {
        banner.remove()
        div.append(canvas_AR)
        prependEle(parent, div);
    } else {
        div.append(canvas_AR)
        prependEle(parent, div);
    }
    var context_AR = canvas_AR.getContext('2d');


    reader.onloadend = function () {
        var image_AR = new Image();
        image_AR.src = reader.result;
        image_AR.onload = function () {
            var AR = calculateAspectRatio(image_AR, canvas_AR);
            context_AR.drawImage(image_AR, AR.startX, AR.startY, AR.renderableWidth, AR.renderableHeight);
        }
        $('.next').trigger('click');
        $('.b').show();
        $('.next, .prev').show()

        $('.carousel').carousel('next')
        $('.carousel').carousel('pause')
        $.notify({
            message: "Vous pouvez appuyez sur les flèches pour passer à l'étape suivante",
            icon: 'fa fa-tags',
        }, {
            delay: 10000,
            timer: 1000,
            allow_dismiss: true,
            showProgressbar: false,
            animate: {
                enter: 'animated lightSpeedIn',
                exit: 'animated lightSpeedOut'
            },
        }, {

        });

    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        preview.src = "";
    }
}



function hideError() {
    var error = document.getElementById("error")
    var _error = document.getElementById("phone-error")

    if (error != null) {
        if (error.style.display == "block") {
            error.style.display = "none";
        }
    }
    if (_error != null) {
        if (_error.style.display == "block") {
            _error.style.display = "none";
        }
    }
}

function setDescription() {

    var str = $("#description").val();
    hideError()
    if (str.length > 40) {
        alert("Description trop longue")
        $("#description").select()

    } else {
        $(".desc").css("background-color", "white")
        $(".description-section").css("border", "none")
        $(".desc").text(str);

    }
}

function setPrix() {
    var int3 = new Intl.NumberFormat("fr-FR", {
        maximumFractionDigits: 0
    });
    var saisie = $("#prix").val();
    var conversion = Number(saisie)
    var prix = int3.format(conversion);
    var str = prix.toString() + " CFA";
    hideError();
    $(".price").text(str);
}

function setTel() {
    hideError()
    var str = $("#tel").val();
    var html = $("<i class='material-icons ic' id=''>&#xe0cd;</i><span class='num'></span>")
    var target = $(".label-tel")
    var ic = document.querySelector(".ic")
    //console.log(ic)
    var parent = document.querySelector('.banner-image')
    var second_parent = document.querySelector('.drag')




    //var div = $("<div class='drag1' style='width: 130px; position: absolute;'  onmouseup = 'removeBorder1()' onmousedown = 'showBorder1()'><i class='material-icons ic' style='position: absolute' id='ic-num'>&#xe0cd;</i><span class='num' style='word-wrap: normal; margin-left: 25px;' id='num'></span></div>")

    if (ic == null) {
        var div = document.createElement("div")
        div.setAttribute("class", "drag1")
        div.setAttribute("onmouseup", "removeBorder1()")
        div.setAttribute("onmousedown", "showBorder1()")
        var num = document.createElement("span")
        num.setAttribute("class", "num")
        num.setAttribute("id", "num")
        div.innerHTML = "<i class='material-icons ic' style='position: absolute' id='ic-num'>&#xe0cd;</i>"
        div.appendChild(num)
 if (second_parent == null) {
            appendEle(parent, div)
            $('.drag1').css({
                "margin-left": "50px !important"
            })

        } else {
            appendEle(second_parent, div)
              $('.drag1').css({
                "margin-left": "50px !important"
            })
        }
        $(".num").text(str);
        setTimeout(function () {
            /*  $.notify({
                 icon: 'fa fa-hand-o-down',
                 message: "Cliquez pour commencer !",
                 offset: {
                     x: 250,
                     y: 300
                 },
                 delay: 6000000,
                 timer: 100000

             }); */
            $.notify({
                message: "<strong style='color: red; font-size: 14px'>Important </strong>Votre numéro sera affiché sur l'image vous pouvez cliquez dessus pour le déplacer",
                icon: 'fa fa-info-circle',
            }, {
                delay: 600000,
                timer: 10000,
            }, {
                allow_dismiss: true,
                showProgressbar: false,
                animate: {
                    enter: 'animated lightSpeedIn',
                    exit: 'animated lightSpeedOut'
                },

            });
        }, 3000)


    } else {
        //figure.append(div)
        $(".num").text(str);

    }




}



$("#btnSuccess").on("click", function () {
    $("#someElement").notify("successfully did XYZ", successOptions);
});

$("#btnError").on("click", function () {
    $("#someElement").notify("some error occured", errorOptions);
});

function showBorder() {
    $('.drag').addClass("border border-secondary")
}

function showBorder1() {
    $('.drag1').addClass("border border-secondary")
}

function removeBorder() {
    $('.drag').removeClass('border border-secondary')
}

function removeBorder1() {
    $('.drag1').removeClass('border border-secondary')
}

function triggerImage() {
    var addimage = document.getElementById('addimage')
    addimage.click()
}

function triggerLogo() {
    var logo = document.getElementById('logo-insert')
    logo.click()
}


function toggleCard() {
    $(".start-card").slideDown(4000);

};

function toggleCarousel() {
    $("#carouselExampleIndicators").show('slide', {
        direction: 'right'
    }, 5000);
}


function verifyInput() {
    var description = $("#description");
    var prix = $("#prix");
    var tel = $("#tel")
    var img = ""
    if (description.val() == "" || prix.val() == "" || tel.val() == "" || isNaN(prix.val())) {
        $("#error").show()
    } else if (tel.val().startsWith("77") == true || tel.val().startsWith("78") == true || tel.val().startsWith("70") == true || tel.val().startsWith("76") == true && isNaN(tel.val()) && tel.val().length == 9) {
        html2canvas(document.querySelector(".figure"), {
            onrendered: function (canvas) {
                var tempcanvas = document.createElement('canvas');
                tempcanvas.width = 600;
                tempcanvas.height = 314;
                var context = tempcanvas.getContext('2d');
                var AR = calculateAspectRatio(canvas, tempcanvas);
                context.drawImage(canvas, AR.startX, AR.startY, AR.renderableWidth, AR.renderableHeight);
                img = tempcanvas.toDataURL("image/jpg")
                var data = {
                    'description': description.val(),
                    'prix': prix.val(),
                    'tel': tel.val(),
                    'img': img
                }
                $.ajax({
                    type: "POST",
                    url: "/session",
                    datatype: "json",
                    contentType: 'application/json',
                    success: function (response) {
                        console.log(response)

                    },

                    data: JSON.stringify(data),
                });
            }

        });

        $('.carousel').carousel('next');
        $('.next').trigger('click');
        $(".d").show()
        onReady(function () {

            setVisible1('.block-publish', true);
            setVisible1('.lds-hourglass1', false);

        });
        $('.next').hide()
        $('.carousel-control-next').css("display", "none");

    } else {
        $("#phone-error").show()
    }

}
// Set effect from select menu value


var calculateAspectRatio = function (image, canvas) {
    var imageAspectRatio = image.width / image.height;
    var canvasAspectRatio = canvas.width / canvas.height;
    var renderableHeight, renderableWidth, xStart, yStart;
    var AspectRatio = new Object();
    // If image's aspect ratio is less than canvas's we fit on height
    // and place the image centrally along width
    if (imageAspectRatio < canvasAspectRatio) {
        renderableHeight = canvas.height;
        renderableWidth = image.width * (renderableHeight / image.height);
        xStart = (canvas.width - renderableWidth) / 2;
        yStart = 0;
    }

    // If image's aspect ratio is greater than canvas's we fit on width
    // and place the image centrally along height
    else if (imageAspectRatio > canvasAspectRatio) {
        renderableWidth = canvas.width;
        renderableHeight = image.height * (renderableWidth / image.width);
        xStart = 0;
        yStart = (canvas.width - renderableHeight) / 2;
    }

    //keep aspect ratio
    else {
        renderableHeight = canvas.height;
        renderableWidth = canvas.width;
        xStart = 0;
        yStart = 0;
    }
    AspectRatio.renderableHeight = renderableHeight;
    AspectRatio.renderableWidth = renderableWidth;
    AspectRatio.startX = xStart;
    AspectRatio.startY = yStart;
    return AspectRatio;
}

var calculateAspectRatioLogo = function (image, canvas) {
    var imageAspectRatio = image.width / image.height;
    var canvasAspectRatio = canvas.width / canvas.height;
    var renderableHeight, renderableWidth, xStart, yStart;
    var AspectRatio = new Object();
    // If image's aspect ratio is less than canvas's we fit on height
    // and place the image centrally along width
    if (imageAspectRatio < canvasAspectRatio) {
        renderableHeight = canvas.height;
        renderableWidth = image.width * (renderableHeight / image.height);
        xStart = (canvas.width - renderableWidth) / 2;
        yStart = 0;
    }

    // If image's aspect ratio is greater than canvas's we fit on width
    // and place the image centrally along height
    else if (imageAspectRatio > canvasAspectRatio) {
        renderableWidth = canvas.width;
        renderableHeight = image.height * (renderableWidth / image.width);
        xStart = 0;
        yStart = (canvas.width - renderableHeight) / 2;
    }

    //keep aspect ratio
    else {
        renderableHeight = canvas.height;
        renderableWidth = canvas.width;
        xStart = 0;
        yStart = 0;
    }
    AspectRatio.renderableHeight = renderableHeight;
    AspectRatio.renderableWidth = renderableWidth;
    AspectRatio.startX = xStart;
    AspectRatio.startY = yStart;
    return AspectRatio;
}

function publishOnAdwords() {
    var description = $("#description");
    var prix = $("#prix");
    var tel = $("#tel")
    var img = $('#final-img-adwords')
    var data = {
        'description': description.val(),
        'prix': prix.val(),
        'tel': tel.val(),
        'img': ""
    }

    console.log($.ajax({
        type: "POST",
        url: "/session",
        datatype: "json",
        contentType: 'application/json',
        success: function (response) {
            console.log(response)
            alert(response.message);
            alert(response.keys);
        },
        error: function (error) {
            console.log(error);
        },
        data: data,
    }))
}





function buy(btn) {
    setTimeout(function () {
        $("#visualiser2").modal('toggle')
        var selector = pQuery(btn);
        (new PayExpresse({
            item_id: 1,
        })).withOption({
            requestTokenUrl: '/pay',
            method: 'POST',
            headers: {
                "Accept": "application/json"
            },
            //prensentationMode   :   PayExpresse.OPEN_IN_POPUP,
            prensentationMode: PayExpresse.OPEN_IN_POPUP,
            didPopupClosed: function (is_completed, success_url, cancel_url) {
                if (is_completed === true) {

                    window.location.href = success_url;
                } else {
                    window.location.href = cancel_url
                }
            },
            willGetToken: function () {
                console.log("Je me prepare a obtenir un token");
                selector.prop('disabled', true);
                //var ads = []


            },
            didGetToken: function (token, redirectUrl) {
                console.log("Mon token est : " + token + ' et url est ' + redirectUrl);
                selector.prop('disabled', false);
            },
            didReceiveError: function (error) {
                alert('erreur inconnu', error.toString());
                selector.prop('disabled', false);
            },
            didReceiveNonSuccessResponse: function (jsonResponse) {
                console.log('non success response ', jsonResponse);
                alert(jsonResponse.errors);
                selector.prop('disabled', false);
            }
        }).send({
            pageBackgroundRadianStart: '#0178bc',
            pageBackgroundRadianEnd: '#00bdda',
            pageTextPrimaryColor: '#333',
            paymentFormBackground: '#fff',
            navControlNextBackgroundRadianStart: '#608d93',
            navControlNextBackgroundRadianEnd: '#28314e',
            navControlCancelBackgroundRadianStar: '#28314e',
            navControlCancelBackgroundRadianEnd: '#608d93',
            navControlTextColor: '#fff',
            paymentListItemTextColor: '#555',
            paymentListItemSelectedBackground: '#eee',
            commingIconBackgroundRadianStart: '#0178bc',
            commingIconBackgroundRadianEnd: '#00bdda',
            commingIconTextColor: '#fff',
            formInputBackgroundColor: '#eff1f2',
            formInputBorderTopColor: '#e3e7eb',
            formInputBorderLeftColor: '#7c7c7c',
            totalIconBackgroundRadianStart: '#0178bc',
            totalIconBackgroundRadianEnd: '#00bdda',
            formLabelTextColor: '#292b2c',
            alertDialogTextColor: '#333',
            alertDialogConfirmButtonBackgroundColor: '#0178bc',
            alertDialogConfirmButtonTextColor: '#fff'
        });
    }, 500)
}