UR.setTagColor = function($el) {
    $el.find('[data-color]').each(function() {
        var $this = $(this);
        var color = $this.data('color');
        var rgb = UR.hexToRGB(color);


        $this.css({
            backgroundColor: color,
            boxShadow: '0 6px 10px rgba(' + rgb.RGB + ', .3)'
        });
    })
};
