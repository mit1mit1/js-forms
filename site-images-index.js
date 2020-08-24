$(document).ready(function() {
    // Image upload / display
    var progressbar = $("#progressbar"),
        bar         = progressbar.find('.uk-progress-bar'),
        settings    = {
        

        action: "", // upload url
        params: { '_token': $('input[name=_token]').val() },

        allow : '*.(jpg|jpeg|gif|png)', // allow only images
        before: function() {
        },

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
                if (filename.indexOf('default-course-icon') > -1) {
                    $('#default-course-image').attr('src', '/site-images/get-icon/' + filename);
                    $('input[name=default_course_icon_uri]').val(filename);
                } else if (filename.indexOf('landing-icon') > -1) {
                    $('#landing-image').attr('src', '/site-images/get-icon/' + filename);
                    $('input[name=landing_icon_uri]').val(filename);
                // } else if (filename.indexOf('favicon') > -1) {
                //     $('#favicon-image').attr('src', '/site-images/get-icon/' + filename);
                //     $('input[name=favicon_uri]').val(filename);
                } else if (filename.indexOf('mylearning-icon') > -1) {
                    $('#mylearning-image').attr('src', '/site-images/get-icon/' + filename);
                    $('input[name=mylearning_icon_uri]').val(filename);
                } else if (filename.indexOf('mylearning-tiny-icon') > -1) {
                    $('#mylearning-image-tiny').attr('src', '/site-images/get-icon/' + filename);
                    $('input[name=mylearning_icon_tiny_uri]').val(filename);
                }
            } else {
                alert('Sorry upload failed. Please try again later.')
            }
        }
    };

    $('.upload-select').click(function(){
        upload_settings = settings;
        upload_settings.action = $(this).attr('data-upload-url');
        upload_settings.progressbar = $( $(this).attr('data-progressbar') );
        
        var select = UIkit.uploadSelect($(this), upload_settings);
    });
});
