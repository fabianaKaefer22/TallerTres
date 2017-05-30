$('form').submit(function(event){
	$('#error').hide();
	event.preventDefault();
	
	var login = $('input').val();
	var promesa = $.get('https://api.github.com/users/'+login);
	promesa.done(showUserInfo)
		.done(getFollowers)
		.fail(showError);
});

function showUserInfo(user){
	$('#username').text(user.name);
	$('#location').text(user.location);
	$('#avatar').attr('src',user.avatar_url);
	$('#followers').text(user.followers);
	$('#following').text('following: '+user.following);
}
function showError(error) {
	$('#error').show()
				.slideUp(5000, function(){
					$('#error').hide(10000)
				});
}

function getFollowers(login){
	var login = $('input').val();
	$.get('https://api.github.com/users/'+login+'/followers')
		.done(showUserFollowers)
		.fail(showError)
}
function showUserFollowers(followers){
	var template = $('#template')
	var followerTpl;
	for (var i = 0; i < followers.length; i++) {
		var f = followers[i];
		var followerTpl = $(template).clone();
		followerTpl.find('h3').text(f.login);
		followerTpl.find('img').attr('src',f.avatar_url);
		/*demas atributos*/
		$('#followers-list').append(followerTpl);
	}

}