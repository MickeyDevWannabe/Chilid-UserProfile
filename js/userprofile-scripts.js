$(document).ready(function() {
	var jsonFilePath = "json/userprofile-data.json";
	var likesCounter = null;
	var followersCounter = null;

	$(".btn--share").click(function(e) {
		e.preventDefault();

		var getLink = window.location.href;
		var browserWidth = $(window).width();
		var browserHeight = $(window).height();

		$('.lightbox__profile-url').html(getLink);

		var lightboxWidth = Math.round($('.lightbox-container').width() / 2);
		var prepWidthValue = browserWidth / 2 - lightboxWidth;

		var lightboxHeight = Math.round($('.lightbox-container').height() / 2);
		var prepHeightValue = browserHeight / 2 - lightboxHeight;

		$('.lightbox-container').css({top: prepHeightValue, left: prepWidthValue});
			
		if($('.lightbox-overlay').css('visibility') == 'hidden') {
			$('.lightbox-overlay').css({visibility: 'visible'});
		} else {
			$('.lightbox-overlay').css({visibility: 'hidden'});
		}
	});

	$(".js-lightbox-close").click(function(){
		if($('.lightbox-overlay').css('visibility') == 'hidden') {
			$('.lightbox-overlay').css({visibility: 'visible'});
		} else {
			$('.lightbox-overlay').css({visibility: 'hidden'});
		}
	});

	$(".btn--hideComments").click(function(e) {
		e.preventDefault();

		$('.js-hide-comments').toggle();
	});

	function loadProfileUserdata() {
		$.getJSON(jsonFilePath, function(data) {
			$(".js-profile-owner-avatar").attr("src", data.ownerAvatarURL);
			$(".data__fullname").prepend(data.fullName);
			$(".data__living-place").html(data.address.city + ', ' + data.address.country);
			$(".js-likes-value").html(data.popularityData.likes);
			$(".js-following-value").html(data.popularityData.following);
			$(".js-followers-value").html(data.popularityData.followers);
		});
	}

	function loadProfileComments() {
		$.getJSON(jsonFilePath, function(data) {
			var posts = [];
			var currentDate = new Date();

			$.each(data.profileComments, function(index, element) {
				posts.push('<div class="comments__display">' +
						'<div class="comments__user-avatar inline-float">' +
							'<img class="maxwidth-inherit js-comment-user-avatar" src="' + element.userAvatarURL + '" />' +
						'</div>' +
						'<div class="comments__name-position-block valign-force inline-float">' +
							'<span class="comments__commentator-name">' + element.fullName + '</span><span class="comments__publish-date">' + Math.ceil(Math.abs(currentDate - new Date(element.postDate)) / 86400000) + 'd</span>' +
						'</div>' +
						'<div class="comments__content">' +
							'<p class="comments__paragraph">' + element.content + '</p>' +
						'</div>' +
					'</div>');
			});

			$( "<div/>", {
				class: "js-hide-comments",
				html: posts.join( "" )
			}).appendTo( ".js-load-comments" );
			$(".js-comment-count").html(Object.keys(data.profileComments).sort().pop());
		});
	}

	function popularityCounter() {
		$.getJSON(jsonFilePath, function(data) {
			likesCounter = data.popularityData.likes;
			followersCounter = data.popularityData.followers;
		});
	}

	$(".btn--like").click(function(e) {
		e.preventDefault();

		popularityCounter();
		setTimeout(function() {
			$(".js-likes-value").html(likesCounter += 1);
			$.post('likes.php', {ajax: true});
		}, 10);
	});

	$(".btn--follow").click(function(e) {
		e.preventDefault();

		popularityCounter();
		setTimeout(function() {
			$(".js-followers-value").html(followersCounter += 1);
			$.post('followers.php', {ajax: true});
		}, 10);
	});

	loadProfileUserdata();
	loadProfileComments();
});