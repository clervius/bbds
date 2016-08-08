(function($){ 
			   $(window).load(function(){ 

					$('#iview').iView({
					fx: 'fade', 
					pauseTime: 5000,
					directionNav: false,
					pauseOnHover: true,
					timer: "pie",
					timerDiameter: 17,
					timerPadding: 3,
					timerStroke: 3,
					timerBarStroke: 0,
					timerX: 6, 
					timerY: 6,
					timerColor: "#0F0",
					timerPosition: "top-right"
					});	

					$("#contact input[type='submit'], #sidebar-right #submittedWidget, .filter a, .pagination a, #submit, .comment-reply-link, #submittedContact, .tagcloud a, #sidebar-footer #submittedWidget").hover(function() {
					   $(this).animate({ backgroundColor: "#e4a125" }, 200);
					},function() {
					   $(this).animate({ backgroundColor: "#fff" }, 200);
					});

					/*Galleria.loadTheme('js/galleria.classic.js');
					Galleria.run('#galleria'); */

					var player = document.getElementById('player_1');
					  $f(player).addEvent('ready', ready);
			 
					function addEvent(element, eventName, callback) {
						if (element.addEventListener) {
						  element.addEventListener(eventName, callback, false)
						} else {
						  element.attachEvent(eventName, callback, false);
						}
					};
			 
					function ready(player_id) {
						var froogaloop = $f(player_id);
						froogaloop.addEvent('play', function(data) {
						  $('.flexslider').flexslider("pause");
						});
						froogaloop.addEvent('pause', function(data) {
						  $('.flexslider').flexslider("play");
						});
					};

					$(".flexslider")
					.fitVids()
					.flexslider({
					video: true, 
					slideshow: true,
					slideshowSpeed: 4000,         
					animationDuration: 700,  
					directionNav: false,
					controlNav: true, 
					before: function(slider){
						$f(player).api('pause');
					}
					});

				})
			})(jQuery);