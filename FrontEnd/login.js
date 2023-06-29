
// Récupérer les éléments du formulaire de connexion
const loginForm = document.querySelector('#form');
const usernameInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

// Ajouter un écouteur d'événement pour le formulaire de connexion
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Empêcher le formulaire de soumettre les données

  const emailv = usernameInput.value;
  const passwordv = passwordInput.value;
  try {
    // Envoyer les informations de connexion au serveur via une requête Fetch
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailv, password: passwordv}),
    }).then(res => res.json())
      .then(res => {
        console.log(res)

        if (res.token) {
          // Rediriger l'utilisateur vers la page de son compte   
          sessionStorage.setItem('token', res.token)
          window.location.href = 'http://127.0.0.1:5501';
        } else {
          // Afficher un message d'erreur
          const errorMessage = document.querySelector('#error-message');
          errorMessage.innerText = 'Nom d\'utilisateur ou mot de passe incorrect.';
        }
      })
  } catch (error) {
    // Afficher un message d'erreur
    const errorMessage = document.querySelector('#error-message');
    errorMessage.innerText = 'Erreur de connexion.';
    console.error(error);
  }
});
