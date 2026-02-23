document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        once: true,
        duration: 800,
        easing: 'ease-in-out'
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Subtle parallax effect on blobs
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        const blob1 = document.querySelector('.blob-1');
        const blob2 = document.querySelector('.blob-2');

        blob1.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
        blob2.style.transform = `translate(${x * -30}px, ${y * -30}px)`;
    });

    // Contact Form Submission (Formspree)
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch('https://formspree.io/f/xyza_placeholder', { // USER: REPLACE WITH YOUR FORMSPREE ID
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    submitBtn.innerText = 'Message Sent!';
                    submitBtn.style.backgroundColor = '#10b981';
                    contactForm.reset();
                    setTimeout(() => {
                        submitBtn.innerText = originalBtnText;
                        submitBtn.style.backgroundColor = '';
                        submitBtn.disabled = false;
                    }, 5000);
                } else {
                    throw new Error('Failed to send');
                }
            } catch (err) {
                submitBtn.innerText = 'Error! Try Again';
                submitBtn.style.backgroundColor = '#ef4444';
                setTimeout(() => {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }
});


const certificatesData = {
    'python-cert': {
        title: "The Joy of Computing Using Python",
        image: "python-cert.jpg",
        score: "61%",
        period: "Jul - Oct 2024"
    },
    'iot-cert': {
        title: "Introduction To Internet Of Things",
        image: "iot-cert.jpg",
        score: "79%",
        period: "Jan - Apr 2025"
    },
    'privacy-cert': {
        title: "Privacy and Security In Online Social Media",
        image: "social-media-cert.jpg",
        score: "64%",
        period: "Jul - Oct 2025"
    },
    'android-intern': {
        title: "Android Developer Virtual Internship",
        image: "android-intern-cert.jpg",
        score: "Grade: E (Elite)",
        period: "Jul - Sep 2025"
    },
    'web-intern': {
        title: "Web Development Internship",
        image: "web-intern-cert.jpg",
        score: "Performance: Excellent",
        period: "22/12/2025 - 30/01/2026"
    }
};

function viewCertificate(id) {
    console.log('Viewing certificate:', id);
    const data = certificatesData[id];
    if (!data) return;

    const modalContent = document.getElementById('modalContent');
    const modalElement = document.getElementById('projectModal');

    // Use getOrCreateInstance for better stability in BS5
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

    modalContent.innerHTML = `
        <div class="text-center mb-4">
            <h4 class="fw-bold text-white mb-2">${data.title}</h4>
            <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-1 mb-3 rounded-pill fw-bold">${data.score} | ${data.period}</span>
        </div>
        
        <div class="position-relative">
            <!-- Fallback Certificate UI (Visible if image fails) -->
            <div id="certFallback" class="glass-card p-5 text-center d-flex flex-column align-items-center justify-content-center" 
                 style="min-height: 400px; border: 2px dashed rgba(99, 102, 241, 0.3);">
                <i class="bi bi-award text-primary mb-4" style="font-size: 5rem; opacity: 0.5;"></i>
                <h2 class="fw-bold text-white mb-3" style="font-family: 'Outfit', sans-serif;">NPTEL ELITE</h2>
                <h5 class="text-white opacity-75 mb-4">${data.title}</h5>
                <div class="p-3 rounded-3 mb-4" style="background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.2);">
                    <p class="mb-0 fw-bold text-primary h3">${data.score}</p>
                    <p class="small text-white-50 mb-0">Consolidated Score</p>
                </div>
                <p class="small text-white-50 mb-0 italic">Certified in ${data.period}</p>
            </div>

            <!-- Real Image (Absolute positioned, visible when loaded) -->
            <img src="${data.image}" alt="${data.title}" 
                 class="img-fluid rounded-4 shadow-lg position-absolute top-0 start-0 w-100 h-100 object-fit-contain bg-slate-900" 
                 style="display: none; z-index: 10; cursor: pointer;"
                 onload="this.style.display='block'; document.getElementById('certFallback').style.display='none';">
        </div>

        <div class="text-center mt-4 pt-2">
            <p class="small text-white-50 mb-4 italic">
                <i class="bi bi-info-circle me-1"></i> 
                To show your official screenshot here, name it <strong>${data.image}</strong> in the project folder.
            </p>
            <button class="btn-material btn-primary-material px-5 py-2 btn-sm" data-bs-dismiss="modal">Close Preview</button>
        </div>
    `;

    modal.show();
}

