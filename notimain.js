$(document).ready(function() {
    $('#sidebarToggle, #closeSidebar, #sidebarOverlay').click(function() {
        $('#sidebar').toggleClass('active');
        $('#sidebarOverlay').toggleClass('active');
    });

    // Page load animation
    $(window).on('load', function() {
        $('.main-content').hide().fadeIn(800).css('transform', 'translateY(0)').css('opacity', '1');
    });
});
