const AK_EMAIL = 'antikapitalistak@gmail.com';
const SHEET_NAME = 'Contactos web';

function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p.website) return HtmlService.createHtmlOutput('OK');

  const name = clean_(p.name, 120);
  const email = clean_(p.email, 200);
  const locality = clean_(p.locality, 160);
  const interest = clean_(p.interest, 200);
  const message = clean_(p.message, 5000);
  const lang = p.lang === 'eu' ? 'eu' : 'es';
  const consent = p.consent === 'yes';

  if (!consent || (email && !validEmail_(email))) {
    return HtmlService.createHtmlOutput('ERROR');
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Fecha', 'Nombre', 'Email', 'Localidad', 'Interés', 'Mensaje', 'Idioma', 'Consentimiento', 'Estado']);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      sheetSafe_(name),
      sheetSafe_(email),
      sheetSafe_(locality),
      sheetSafe_(interest),
      sheetSafe_(message),
      lang,
      'Sí',
      'Pendiente'
    ]);
  } finally {
    lock.releaseLock();
  }

  MailApp.sendEmail({
    to: AK_EMAIL,
    subject: '[WEB] Nuevo contacto' + (name ? ' — ' + name : '') + (locality ? ' — ' + locality : ''),
    htmlBody:
      '<p><strong>Nuevo contacto desde antikapitalistak.eus</strong></p>' +
      '<p><strong>Nombre:</strong> ' + html_(name) + '<br>' +
      '<strong>Email:</strong> ' + html_(email) + '<br>' +
      '<strong>Localidad:</strong> ' + html_(locality) + '<br>' +
      '<strong>Interés:</strong> ' + html_(interest) + '<br>' +
      '<strong>Idioma:</strong> ' + html_(lang.toUpperCase()) + '</p>' +
      '<p><strong>Mensaje:</strong></p><p>' + html_(message).replace(/\n/g, '<br>') + '</p>',
    replyTo: email,
    name: 'Web Antikapitalistak'
  });

  if (email) {
    const ackSubject = lang === 'eu'
      ? 'Zure mezua jaso dugu — Antikapitalistak Euskal Herria'
      : 'Hemos recibido tu mensaje — Antikapitalistak Euskal Herria';

    const displayName = name || (lang === 'eu' ? 'lagun' : 'compa');

    const ackBody = lang === 'eu'
      ? '<p>Kaixo, ' + html_(displayName) + ':</p><p>Eskerrik asko Antikapitalistak Euskal Herriarekin harremanetan jartzeagatik. Zure mezua jaso dugu.</p><p>Laster jarriko gara zurekin harremanetan.</p><p>Ondo izan,<br><strong>Antikapitalistak Euskal Herria</strong></p>'
      : '<p>Kaixo, ' + html_(displayName) + ':</p><p>Gracias por ponerte en contacto con Antikapitalistak Euskal Herria. Hemos recibido tu mensaje.</p><p>En breve nos pondremos en contacto contigo.</p><p>Un saludo,<br><strong>Antikapitalistak Euskal Herria</strong></p>';

    MailApp.sendEmail({
      to: email,
      subject: ackSubject,
      htmlBody: ackBody,
      name: 'Antikapitalistak Euskal Herria'
    });
  }

  return HtmlService.createHtmlOutput('OK');
}

function clean_(value, max) {
  return String(value || '').trim().slice(0, max);
}
function validEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function sheetSafe_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}
function html_(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}