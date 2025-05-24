$(document).ready(function() {
    $('#sidebarToggle').click(function() {
        $('#sidebar').addClass('active');
    });

    $('#closeSidebar').click(function() {
        $('#sidebar').removeClass('active');
    });
});
