const CONTACT_ENDPOINT = '';

(function(){
  const form=document.querySelector('[data-contact-form]');
  if(!form) return;

  const status=form.querySelector('[data-form-status]');
  const submit=form.querySelector('.contact-submit');
  const lang=(form.querySelector('[name="lang"]')||{}).value==='eu'?'eu':'es';
  const frame=document.querySelector('iframe[name="'+form.target+'"]');
  let submitted=false;

  if(!CONTACT_ENDPOINT){
    submit.disabled=true;
    status.textContent=lang==='eu'
      ? 'Formularioa prest dago. Bidalketa segurua aktibatzea falta da.'
      : 'El formulario está preparado. Falta activar el envío seguro.';
    return;
  }

  form.action=CONTACT_ENDPOINT;

  if(frame){
    frame.addEventListener('load',function(){
      if(!submitted) return;
      submitted=false;
      submit.disabled=false;
      form.reset();
      status.classList.add('success');
      status.textContent=lang==='eu'
        ? 'Eskerrik asko. Zure mezua jaso dugu. Laster jarriko gara zurekin harremanetan.'
        : 'Gracias por ponerte en contacto. Hemos recibido tu mensaje y en breve nos pondremos en contacto contigo.';
    });
  }

  form.addEventListener('submit',function(event){
    status.classList.remove('success');
    if(!form.checkValidity()){
      event.preventDefault();
      form.reportValidity();
      return;
    }
    const stamp=form.querySelector('[name="submitted_at"]');
    if(stamp) stamp.value=new Date().toISOString();
    submitted=true;
    submit.disabled=true;
    status.textContent=lang==='eu'?'Bidaltzen…':'Enviando…';
  });
})();