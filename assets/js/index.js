import '../../node_modules/materialize-css/dist/js/materialize';

$(document).ready(() => {
    $(".button-collapse").sideNav({
        menuWidth: 300,
        edge: 'left',
        draggable: true
    });
});
