$(document).ready(function () {
     let timerInterval
     Swal.fire({
          title: "Ne fermez pas cette fenêtre sinon votre annonce risque de ne pas être publiée !",
          html: 'Publication de la bannière dans <strong></strong> secondes .<br/><br/>',
          timer: 60000,
          onBeforeOpen: () => {
               const content = Swal.getContent()
               const $ = content.querySelector.bind(content)

               const stop = $('#stop')
               const resume = $('#resume')
               const toggle = $('#toggle')
               const increase = $('#increase')

               Swal.showLoading()

               function toggleButtons() {
                    stop.disabled = !Swal.isTimerRunning()
                    resume.disabled = Swal.isTimerRunning()
               }

               stop.addEventListener('click', () => {
                    Swal.stopTimer()
                    toggleButtons()
               })

               resume.addEventListener('click', () => {
                    Swal.resumeTimer()
                    toggleButtons()
               })

               toggle.addEventListener('click', () => {
                    Swal.toggleTimer()
                    toggleButtons()
               })

               increase.addEventListener('click', () => {
                    Swal.increaseTimer(5000)
               })

               timerInterval = setInterval(() => {
                    Swal.getContent().querySelector('strong')
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

                         if (response == "ok") {
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


                         }
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
                    position: 'top-end',
                    type: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500,
                    onClose: () => {
                         window.location.href = "http://banner.comparez.co/"
                    }
               })
          }
     })

})