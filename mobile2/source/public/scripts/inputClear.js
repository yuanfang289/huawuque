/**
 * Created by zhangguoying on 2017/1/3.
 */

UR.inputClear = ({
    parent = null,
    value = "",
    clearFn = null,
    autoBlur = true,
} = {}) => {

    if (!parent || typeof parent != 'object') return false;

    if (!parent.get(0)) parent = $(parent);

    let $input = parent.find(':input:not(button)'), $clear;

    if (!value) {
        value = $input.val();
    }

    $clear = parent.find('.input-clear');
    if (value.length && !$clear.length) {
        parent
            .addClass('input-clear-wrapper');

        $clear = $(`<button type="button" class="input-clear"><i class="uricon-clear"></i></button>`).appendTo(parent);
    }

    $(document)
        .off(UR.click, '.input-clear')
        .on(UR.click, '.input-clear', (evt) => {
            evt.preventDefault();

            $input.val("");
            $clear.remove();

            autoBlur && $input.blur();

            clearFn && clearFn(parent, value);
        });

    $input
        .off('blur')
        .on('blur', (evt) => {
            evt.preventDefault();

            $clear.remove();
        })
}
