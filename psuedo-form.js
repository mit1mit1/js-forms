function submit(submit_button) {
    var validated = 1;
    var all_data = { 'variable' : submit_button.attr('data-variable-value') }
    $('.psuedo-form-variable').each(function (index) {
        if ($(this).attr('type') == 'checkbox' || $(this).attr('type') == 'radio') {
            all_data[$(this).attr('data-variable-name')] = ($(this).prop('checked'));
        } else {
            if ($(this).attr('data-required') == 1 && $(this).val().length == 0) {
                UIkit.notify(submit_button.attr('data-error-message'), {pos:'top-right', status:"danger"});
                validated = false;
            }
            all_data[$(this).attr('data-variable-name')] = $(this).val();
        }
    });
    if (validated == 1) {
        $.ajax({
            context : submit_button,
            method: submit_button.attr('data-form-method'),
            url: submit_button.attr('data-form-url'),
            data: all_data,
        })
        .done(function( response ) {
            window.unsaved = false;
            if (response.redirect) {
                window.location.href = response.redirect;
            } else {
                if (submit_button.attr('data-success-message')) {
                    UIkit.notify(submit_button.attr('data-success-message'), {pos:'top-right', status:"success"});
                }
            }
            // Prevent error notification on success
            return true;
        })
        .fail(function( jqXHR, textStatus, errorThrown ) {
            UIkit.notify(submit_button.attr('data-error-message'), {pos:'top-right', status:"danger"});
        });
    }
}

(function() {
    $(".psuedo-submit").click(function () {
        submit_button = $(this);
        if ($(this).attr('data-confirm-message')) {
            UIkit.modal.confirm($(this).attr('data-confirm-message'), function(){
                submit(submit_button);
            });
        } else {
            submit(submit_button);
        }
    });

})();