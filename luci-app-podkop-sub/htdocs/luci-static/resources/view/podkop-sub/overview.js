'use strict';
'require view';
'require form';
'require uci';
'require fs';
'require ui';

return view.extend({
  render: function () {
    var m, s, o;

    m = new form.Map('podkop-sub', _('Подписка Podkop'),
      _('Загрузка списка серверов из ссылки-подписки в podkop.'));

    s = m.section(form.NamedSection, 'main', 'subscription');

    o = s.option(form.Value, 'url', _('Ссылка подписки'));
    o.placeholder = 'https://example.com/sub/TOKEN';

    o = s.option(form.Button, '_update', _('Серверы'));
    o.inputtitle = _('Загрузить');
    o.inputstyle = 'apply';
    o.onclick = ui.createHandlerFn(this, function () {
      // Save and commit first: the CLI reads the committed UCI file,
      // so an unsaved URL would silently fetch the previous one.
      // The CLI speaks English on purpose - its output goes to syslog too.
      return m.save()
        .then(function () { return uci.apply(); })
        .then(function () { return fs.exec('/usr/bin/podkop-sub', ['update']); })
        .then(function (res) {
          var out = ((res.stdout || '') + (res.stderr || '')).trim();
          ui.addNotification(null, E('pre', {}, out || _('Нет вывода')),
            res.code === 0 ? 'info' : 'error');
        });
    });

    return m.render();
  }
});
