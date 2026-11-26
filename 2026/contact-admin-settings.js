(() => {
  const STORAGE_KEY = 'sigma_demo_contact_admin_whatsapp';
  const settingsHeading = 'ຕັ້ງຄ່າຂໍ້ມູນການຮັບເງິນຂອງບໍລິສັດ';
  const labelText = 'WhatsApp Contact Admin (International)';
  const getNumber = () => String(localStorage.getItem(STORAGE_KEY) || '').replace(/\D/g, '');

  function findSettingsHeading() {
    return [...document.querySelectorAll('*')].find((node) => node.children.length <= 1 && node.textContent.trim() === settingsHeading);
  }

  function mountWhatsAppField() {
    const heading = findSettingsHeading();
    if (!heading || document.querySelector('[data-sigma-whatsapp-setting]')) return;
    const card = heading.closest('.card') || heading.parentElement?.parentElement;
    if (!card) return;
    const textInputs = [...card.querySelectorAll('input[type="text"]')];
    const phoneInput = textInputs[textInputs.length - 1];
    if (!phoneInput) return;
    const anchor = phoneInput.closest('.input-wrap') || phoneInput.parentElement;
    if (!anchor?.parentElement) return;

    const row = document.createElement('div');
    row.dataset.sigmaWhatsappSetting = 'true';
    row.style.cssText = 'margin-top:12px;padding-top:12px;border-top:1px dashed var(--border,rgba(148,163,184,.28));';
    row.innerHTML = `
      <label style="display:block;margin-bottom:6px;font-size:12px;color:var(--text-muted,#94a3b8);font-weight:700;">
        ${labelText}
      </label>
      <input type="text" inputmode="tel" autocomplete="tel" placeholder="ເຊັ່ນ 85620xxxxxxx"
        style="width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid var(--border,#cbd5e1);border-radius:9px;background:var(--surface,#fff);color:var(--text,#0f172a);font:inherit;"
        value="${getNumber()}" />
      <div style="margin-top:5px;font-size:10.5px;color:var(--text-muted,#94a3b8);line-height:1.4;">
        ໃຊ້ເລກຮູບແບບສາກົນ; modal Contact Admin ຈະໃຊ້ຄ່ານີ້ສຳລັບ WhatsApp.
      </div>`;
    anchor.parentElement.insertBefore(row, anchor.nextSibling);
    const input = row.querySelector('input');
    input.addEventListener('input', () => localStorage.setItem(STORAGE_KEY, input.value));
  }

  function patchWhatsAppLinks() {
    const number = getNumber();
    document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
      if (!link.dataset.sigmaWhatsappPatched) {
        link.dataset.sigmaWhatsappPatched = 'true';
        link.dataset.sigmaWhatsappOriginal = link.getAttribute('href') || '';
      }
      if (number) {
        link.href = `https://wa.me/${number}`;
        link.removeAttribute('aria-disabled');
        link.style.opacity = '';
        link.onclick = null;
      } else {
        link.href = '#';
        link.setAttribute('aria-disabled', 'true');
        link.style.opacity = '.7';
        link.onclick = (event) => {
          event.preventDefault();
          alert('ກະລຸນາຕັ້ງຄ່າ WhatsApp Contact Admin ໃນໜ້າຕັ້ງຄ່າບັນຊີບໍລິສັດກ່ອນ');
        };
      }
    });
  }

  document.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (button && button.textContent.includes('Save Settings')) {
      const input = document.querySelector('[data-sigma-whatsapp-setting] input');
      if (input) localStorage.setItem(STORAGE_KEY, input.value);
    }
  }, true);

  const observer = new MutationObserver(() => {
    mountWhatsAppField();
    patchWhatsAppLinks();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  mountWhatsAppField();
  patchWhatsAppLinks();
})();
