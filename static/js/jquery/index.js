$(document).ready(function () {
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



})

function onReady(callback) {
    var intervalId = window.setInterval(function () {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalId);
            callback.call(this);
        }
    }, 2500);
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
    var infos_tel = $("#infos-tel")

    console.log(description.val())
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
            infos_tel.text(tel.val())
            $('#input-image').val(tempcanvas.toDataURL('image/jpg'))
            $('#desc').val(description.val())
            $('#price').val(prix.val() + " CFA")
            $('#telephone').val(tel.val())


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

function addLogo() {
    var figure = $('.figure')

    var file = document.querySelector('#logo-insert').files[0]; //sames as here
    var reader = new FileReader();
    var canvas_AR = document.createElement('canvas');
    var div = document.createElement('div')
    div.setAttribute("class", "card-img-top logo-image drag")
    div.setAttribute("onmousedown", "showBorder()")
    div.setAttribute("onmouseup", "removeBorder()")
    div.style.width = '50px';
    div.style.height = '50px';
    canvas_AR.width = 50;
    canvas_AR.height = 50;
    div.append(canvas_AR)
    figure.append(div);
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




function addImage() {
    var preview = document.querySelector('.banner-image'); //selects the query named img
    var file = document.querySelector('#addimage').files[0]; //sames as here
    var reader = new FileReader();
    var figure = document.getElementsByClassName("figure")
    console.log(figure)
    var fig = $('.banner-image')
    fig.remove()
    var fi = $('.figure')
    var banner = $('.banner-image')

    var first_img = document.getElementsByClassName('.banner-image')


    var canvas_AR = document.createElement('canvas');
    var div = document.createElement('div')
    div.setAttribute("class", "card-img-top banner-image")
    div.width = 250;
    div.height = 250;
    canvas_AR.width = 250;
    canvas_AR.height = 250;
    if (banner != null) {
        banner.remove()
        div.append(canvas_AR)
        fi.append(div)
    } else {
        div.append(canvas_AR)
        fi.append(div)
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
        $('.b, .c').show();
        $('.next, .prev').show()

        $('.carousel').carousel('next')
        $('.carousel').carousel('pause')

    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        preview.src = "";
    }
}



function hideError() {
    var error = document.getElementById("error")

    if (error != null) {
        if (error.style.display == "block") {
            error.style.display = "none";
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
    var str = $("#tel").val();
    hideError();
    $(".num").text(str);
}

function showBorder() {
    $('.drag').addClass("border border-secondary")
}

function removeBorder() {
    $('.drag').removeClass('border border-secondary')
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
    if (description.val() == "" || prix.val() == "" || tel.val() == "") {
        $("#error").show()
    } else {

        $('.carousel').carousel('next');
        $('.next').trigger('click');
        $(".d").show()
        onReady(function () {

            setVisible1('.block-publish', true);
            setVisible1('.lds-hourglass1', false);

        });
        $('.next').hide()
        $('.carousel-control-next').css("display", "none");
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
        'img': img.attr('src')
    }
    console.log(data)
    $.ajax({
        type: "POST",
        url: "/upload",
        datatype: "json",
        contentType: 'application/json',
        success: function (response) {
            console.log(response)
            alert(response.message);
            alert(response.keys);
        },
        data: data,
    });
}