document.addEventListener('DOMContentLoaded', () => {
  console.log('L4G Course Registration & Learning Paths Portal initialized.');

  // Copy helper with fallback support
  async function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return Promise.resolve();
    }
  }

  // Copy button handler for script code blocks
  document.querySelectorAll('.copy-script-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const scriptBox = btn.closest('.script-box');
      const codeElement = scriptBox ? scriptBox.querySelector('.script-code code') : null;
      if (!codeElement) return;

      const textToCopy = codeElement.innerText.trim();

      try {
        await copyToClipboard(textToCopy);
        
        const textSpan = btn.querySelector('.copy-btn-text');
        const iconSvg = btn.querySelector('.copy-icon');
        const originalText = textSpan.textContent;
        const originalIcon = iconSvg ? iconSvg.innerHTML : '';

        btn.classList.add('copied');
        textSpan.textContent = 'Copied!';
        if (iconSvg) {
          iconSvg.innerHTML = '<polyline points="20 6 9 17 4 12"></polyline>';
        }

        setTimeout(() => {
          btn.classList.remove('copied');
          textSpan.textContent = originalText;
          if (iconSvg) {
            iconSvg.innerHTML = originalIcon;
          }
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    });
  });
});

