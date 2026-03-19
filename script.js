// Firebase SDK importieren (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// =============================================================
// WICHTIG: Ersetze diese Werte mit deinen eigenen Firebase-Daten!
// Du findest sie unter: Firebase Console > Projekteinstellungen > Allgemein
// =============================================================
const firebaseConfig = {
    apiKey: "DEIN-API-KEY",
    authDomain: "DEIN-PROJEKT.firebaseapp.com",
    projectId: "DEIN-PROJEKT-ID",
    storageBucket: "DEIN-PROJEKT.firebasestorage.app",
    messagingSenderId: "DEINE-SENDER-ID",
    appId: "DEINE-APP-ID"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// CTA button scrolls to About section
document.getElementById('cta-btn').addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

// Kontaktformular -> speichert in Firestore
document.getElementById('contact-form').addEventListener('submit', async e => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');

    submitBtn.textContent = 'Wird gesendet...';
    submitBtn.disabled = true;

    try {
        await addDoc(collection(db, 'messages'), {
            name,
            email,
            message,
            createdAt: serverTimestamp()
        });
        alert('Danke fuer deine Nachricht! Sie wurde gespeichert.');
        e.target.reset();
    } catch (error) {
        console.error('Fehler beim Speichern:', error);
        alert('Fehler beim Senden. Bitte versuche es erneut.');
    } finally {
        submitBtn.textContent = 'Senden';
        submitBtn.disabled = false;
    }
});
