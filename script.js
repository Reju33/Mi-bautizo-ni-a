// Script para funcionalidad de música y cuenta regresiva (idéntico a la versión de niño)
document.addEventListener('DOMContentLoaded', () => {
    // Animación reveal al hacer scroll para la invitación
    const scrollAnimEl = document.querySelector('.scroll-animate');
    function revealOnScroll() {
        if (!scrollAnimEl) return;
        const rect = scrollAnimEl.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.88) {
            scrollAnimEl.classList.add('visible');
            window.removeEventListener('scroll', revealOnScroll);
        }
    }
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // --- Control personalizado de música y autoplay ---
    const audio = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    const musicIcon = document.getElementById('music-icon');

    // PLAY/PAUSE flotante
    if (audio && musicBtn && musicIcon) {
        function updateMusicIcon() {
            if (audio.paused) {
                musicIcon.classList.remove('fa-pause');
                musicIcon.classList.add('fa-play');
            } else {
                musicIcon.classList.remove('fa-play');
                musicIcon.classList.add('fa-pause');
            }
        }
        updateMusicIcon();
        musicBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        });
        audio.addEventListener('play', updateMusicIcon);
        audio.addEventListener('pause', updateMusicIcon);
    }

    // Autoplay robusto
    if (audio) {
        audio.play().catch(() => {
            // Si falla, intentamos reproducir al primer clic/tap
            const startMusic = () => {
                audio.play();
                document.removeEventListener('click', startMusic);
                document.removeEventListener('touchstart', startMusic);
            };
            document.addEventListener('click', startMusic);
            document.addEventListener('touchstart', startMusic);
        });
    }

    // Cuenta regresiva (idéntica a la original)
    const targetDate = new Date('2025-05-10T19:00:00-06:00');
    function updateCountdown() {
    function popNumber(el, newValue) {
        if (el.textContent !== newValue) {
            el.textContent = newValue;
            el.classList.remove('pop-animate');
            // Forzar reflow para reiniciar la animación
            void el.offsetWidth;
            el.classList.add('pop-animate');
        }
    }
        const now = new Date();
        const diff = targetDate - now;
        if (diff <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        popNumber(daysEl, days);
        popNumber(hoursEl, hours);
        popNumber(minutesEl, minutes);
        popNumber(secondsEl, seconds);
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Quitar la clase pop-animate al terminar la animación
    document.querySelectorAll('.countdown-number').forEach(function(el) {
        el.addEventListener('animationend', function() {
            el.classList.remove('pop-animate');
        });
    });

});
