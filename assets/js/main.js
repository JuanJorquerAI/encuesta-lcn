document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterMessage = document.getElementById('newsletter-message');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const emailInput = document.getElementById('footer-email');
      const submitButton = this.querySelector('button[type="submit"]');
      const scriptURL = 'https://script.google.com/macros/s/AKfycbwzAc2E8v-SeOxq_JcZvEcbeq-yZJU7bq1xuW-BdZ5FIknVpxmFXSJp9FdqKku2jMua/exec'; // <-- ¡IMPORTANTE! REEMPLAZA ESTA URL

      if (!scriptURL || scriptURL === 'https://script.google.com/macros/s/AKfycbwzAc2E8v-SeOxq_JcZvEcbeq-yZJU7bq1xuW-BdZ5FIknVpxmFXSJp9FdqKku2jMua/exec') {
        newsletterMessage.textContent = 'Error: La URL del script no está configurada.';
        newsletterMessage.className = 'newsletter-message error';
        return;
      }

      submitButton.disabled = true;
      submitButton.querySelector('.btn-text').textContent = 'Enviando...';

      fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', // Importante para evitar errores de CORS con Google Scripts
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailInput.value }),
      })
      .then(response => {
        newsletterMessage.textContent = '¡Gracias por suscribirte!';
        newsletterMessage.className = 'newsletter-message success';
        emailInput.value = ''; // Limpiar el campo
      })
      .catch(error => {
        newsletterMessage.textContent = 'Hubo un error. Inténtalo de nuevo.';
        newsletterMessage.className = 'newsletter-message error';
        console.error('Error!', error.message);
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.querySelector('.btn-text').textContent = 'Suscribirme';
      });
    });
  }
});
