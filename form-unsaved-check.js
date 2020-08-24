function listen_for_input() {
    // leaving unsaved?
    $(":input[type!=filtering]").off('change');
    $(":input[type!=filtering]").change(function () {
        window.unsaved = true;
    });
}

function check_for_submit() {
    $('input[type=submit],button[type=submit],.modal-form-submit ').off('click');
    $('input[type=submit],button[type=submit],.modal-form-submit ').click( function() {
        window.unsaved = false;
    });
}

(function() {
    listen_for_input();
    check_for_submit();
    window.onbeforeunload = (function () {
        if (window.unsaved) {
            return "You have unsaved changes on this page. Do you want to leave this page and discard your changes or stay on this page?";
        }
    });

})();