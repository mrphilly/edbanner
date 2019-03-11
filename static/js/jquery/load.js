$(document).ready(function () {
     let timerInterval
     Swal.fire({
          title: "<strong style='color: red'>Ne fermez pas cette fenêtre sinon votre annonce risque de ne pas être publiée !</strong>",
          html: 'Publication de la bannière dans <strong id="strong"></strong> secondes .<br/><br/>',
          timer: 30000,
          onBeforeOpen: () => {
               const content = Swal.getContent()
               const $ = content.querySelector.bind(content)



               Swal.showLoading()

               timerInterval = setInterval(() => {
                    Swal.getContent().querySelector('#strong')
                         .textContent = (Swal.getTimerLeft() / 1000)
                         .toFixed(0)
               }, 100)
          },
          onOpen: () => {
               var data = {
                    'response': 'ok'
               }




               $.ajax({
                    type: "POST",
                    url: "/ads",
                    datatype: "json",
                    contentType: 'application/json',
                    success: function (response) {

                         /*   if (response == "ok") {
                                var notify = $.notify({
                                     message: '<strong>Ne fermez pas cette page</strong> traitement en cours...',
                                     type: 'info',
                                     icon: 'fa fa-spinner',
                                }, {
                                     allow_dismiss: false,
                                     showProgressbar: true,
                                     delay: 20000,
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
                                     }, {
                                          'type': 'success',
                                     });
                                     console.log("1")

                                }, 20000);


                           } */
                         /* else {
                                                      window.location.href = "http://banner.comparez.co/"
                                                 } */

                    },

                    data: JSON.stringify(data),
               });

          },
          onClose: () => {
               clearInterval(timerInterval)
               Swal.fire({
                    type: 'success',
                    title: 'Votre bannière a été publié avec succès !',
                    showConfirmButton: false,
                    timer: 8000,
                    onClose: () => {
                         window.location.href = "http://banner.comparez.co/"
                    }
               })
          }
     })

})