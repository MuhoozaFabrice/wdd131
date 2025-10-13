document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim(),
      };
      if (data.name && data.email && data.message.length >= 10) {
        const saved = JSON.parse(localStorage.getItem('messages') || '[]');
        saved.push(data);
        localStorage.setItem('messages', JSON.stringify(saved));
        alert('Thank you! Your message has been saved.');
        form.reset();
      } else {
        alert('Please complete the form correctly.');
      }
    });
  }
});