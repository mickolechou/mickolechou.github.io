(function ($) {

    $('.highlight').each(function (i, entry) {
        $(entry).prepend('<button class="copy-button invisible" data-clipboard-snippet><i class="fa fa-copy"></i></button>');
    });

    var clipboardSnippets = new Clipboard('[data-clipboard-snippet]', {
        target: function (trigger) { return trigger.nextElementSibling.querySelector('.code'); }
    });

    clipboardSnippets.on('success', function (e) {
        e.clearSelection();
        showTooltip(e.trigger, 'check');
    });

    clipboardSnippets.on('error', function (e) {
        showTooltip(e.trigger, 'close');
    });


    $(document).on('mouseleave', '.highlight', function (e) { 
        $(this).find('button').addClass('invisible');
    }).on('mouseenter', '.highlight', function (e) { 
        $(this).find('button').removeClass('invisible');
    });


    function showTooltip(elem, msg) {
        elem.firstChild.setAttribute('class', 'fa fa-' + msg);
        window.setTimeout(function () {
            elem.firstChild.setAttribute('class', 'fa fa-copy');
        }, 2000);
    }

    function fallbackMessage(action) {
        var actionMsg = ''; var actionKey = (action === 'cut' ? 'X' : 'C');
        if (/iPhone|iPad/i.test(navigator.userAgent)) {
            actionMsg = 'No support :(';
        } else if (/Mac/i.test(navigator.userAgent)) {
            actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
        } else {
            actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
        }
        return actionMsg;
    }


})(jQuery);
