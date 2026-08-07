/* script.js */

// 1. Efekat kucanja teksta (Typing Effect)
const typingText = document.getElementById('typing-text');
const phrases = [
    "Professional Web Developer",
    "HTML/CSS UI Specialist",
    "Kreator Vrhunskih Sajtova"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pauza pre brisanja
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pauza pre kucanja nove reči
    }

    setTimeout(type, typingSpeed);
}

// Pokreni kucanje nakon 1s
setTimeout(type, 1000);

// 2. Napredni 3D Tilt Efekat za kartice (Glassmorphism + 3D)
const tiltElements = document.querySelectorAll('.tilt-effect');

tiltElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Povećan ugao rotacije za jači 3D efekat
        const rotateX = ((y - centerY) / centerY) * -15; 
        const rotateY = ((x - centerX) / centerX) * 15;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        element.style.transition = 'transform 0.5s ease-out';
    });
    
    element.addEventListener('mouseenter', () => {
        element.style.transition = 'transform 0.1s ease'; // Brza reakcija
    });
});

// 3. Svetleći trag miša (Custom Cursor Glow)
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    // Isključeno na mobilnim uređajima kako bi tamo lepo radilo
    if(window.innerWidth > 768) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    }
});