function register_modal_events() {
    // Image upload / display
    var progressbar = $("#progressbar"),
        bar         = progressbar.find('.uk-progress-bar'),
        settings    = {

        action: '/related_apps/app-icons', // upload url
        params: { '_token': $('input[name=_token]').val() },

        allow : '*.(jpg|jpeg|gif|png)', // allow only images

        loadstart: function() {
            bar.css("width", "0%").text("0%");
            progressbar.removeClass("uk-hidden");
        },

        progress: function(percent) {
            percent = Math.ceil(percent);
            bar.css("width", percent+"%").text(percent+"%");
        },

        allcomplete: function(response) {

            bar.css("width", "100%").text("100%");

            setTimeout(function(){
                progressbar.addClass("uk-hidden");
            }, 250);

            data = JSON.parse(response);
            if ('filename' in data) {
                var filename = data['filename'];
                $('#related-app-image').attr('src', '/related_apps/app-icons/' + filename);
                $('input[name=icon_uri]').val(filename);
            } else {
                UIkit.notify("Sorry, upload failed. Please try again later.", {pos:'top-right', status:"danger"});
            }
        },

        error: function(response) {
            UIkit.notify("Sorry, upload failed. Please try again later.", {pos:'top-right', status:"danger"});
        }
    };
    var select = UIkit.uploadSelect($("#upload-select"), settings),
        drop   = UIkit.uploadDrop($("#upload-drop"), settings);
}

$(document).ready(function() {

});
