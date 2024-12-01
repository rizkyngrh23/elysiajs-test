document.addEventListener('DOMContentLoaded', () => {
  const getQuoteButton = document.getElementById('getQuoteButton');
  const submittedDataDiv = document.getElementById('submittedData');
  const loadingSpinner = document.getElementById('loadingSpinner');

  const hideSpinner = () => {
    loadingSpinner.style.display = 'none';
  };

  const showSpinner = () => {
    loadingSpinner.style.display = 'block';
  };

  if (getQuoteButton && submittedDataDiv) {
    getQuoteButton.addEventListener('click', async () => {
      showSpinner();
      try {
        const response = await fetch('/api/quote');
        if (response.ok) {
          const result = await response.json();
          console.log(result);

          submittedDataDiv.innerHTML = `<p>${result.quote}</p>`;
        } else {
          console.error('Failed to fetch quote');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        hideSpinner();
      }
    });
  } else {
    console.error('Element not found');
  }

  window.addEventListener('load', hideSpinner);
});