import '../../node_modules/materialize-css/dist/js/materialize';

$(document).ready(() => {
    $('.button-collapse').sideNav({
        draggable: true,
        edge: 'left'
    });

    window.addEventListener('keydown', (event) => {
        if( event.ctrlKey && (event.which || event.keyCode) === 32)
            $('.search').focus();
    });
});
