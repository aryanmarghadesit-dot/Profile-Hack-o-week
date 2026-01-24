let scene, camera, renderer;
let particles;
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function initThree() {
    const canvas = document.getElementById('bg-canvas');
    
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 15;
    
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    createParticles();
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
}

function createParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
        posArray[i * 3] = (Math.random() - 0.5) * 50;
        posArray[i * 3 + 1] = (Math.random() - 0.5) * 50;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 50;
        
        const colorChoice = Math.random();
        if (colorChoice < 0.33) {
            colorArray[i * 3] = 0;
            colorArray[i * 3 + 1] = 0.85;
            colorArray[i * 3 + 2] = 1;
        } else if (colorChoice < 0.66) {
            colorArray[i * 3] = 0.48;
            colorArray[i * 3 + 1] = 0.18;
            colorArray[i * 3 + 2] = 0.97;
        } else {
            colorArray[i * 3] = 0;
            colorArray[i * 3 + 1] = 1;
            colorArray[i * 3 + 2] = 0.5;
        }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    
    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
}

function animateThree() {
    requestAnimationFrame(animateThree);
    
    targetX = mouseX * 0.0003;
    targetY = mouseY * 0.0003;
    
    if (particles) {
        particles.rotation.y += 0.0002;
        particles.rotation.x += 0.0001;
        
        particles.rotation.y += (targetX - particles.rotation.y) * 0.02;
        particles.rotation.x += (targetY - particles.rotation.x) * 0.02;
    }
    
    renderer.render(scene, camera);
}

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);
    
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    heroTimeline
        .to('.hero-title .word', {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: 'expo.out'
        })
        .to('.hero-image-container', {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'back.out(1.7)'
        }, '-=0.5')
        .to('.hero-subtitle', {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.5')
        .to('.hero-description', {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.7')
        .to('.scroll-indicator', {
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.5');
    
    gsap.utils.toArray('.section-title').forEach((title) => {
        gsap.to(title, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    gsap.to('.about-section .glass-panel', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });
    
    gsap.utils.toArray('.skill-item').forEach((skill, index) => {
        gsap.to(skill, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: skill,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        gsap.to(item, {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    gsap.utils.toArray('.hackathon-card').forEach((card, index) => {
        gsap.to(card, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    gsap.to('.contact-content', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });
}

function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: targetSection,
                        offsetY: 0
                    },
                    ease: 'power3.inOut'
                });
            }
        });
    });
}

function initCursor() {
    const cursor = document.querySelector('.custom-cursor');
    
    if (!cursor) return;
    
    if (window.innerWidth <= 768 || 'ontouchstart' in window) {
        cursor.style.display = 'none';
        return;
    }
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.top = e.clientY + 'px';
        cursor.style.left = e.clientX + 'px';
    });
    
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .hackathon-card, .skill-item, .contact-btn, .glass-panel');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

function checkPerformance() {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        renderer.setPixelRatio(1);
        document.body.classList.add('reduced-motion');
    }
}

function init() {
    initThree();
    animateThree();
    initGSAP();
    smoothScroll();
    initCursor();
    checkPerformance();
    
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

gsap.utils.toArray('.glass-panel').forEach((panel) => {
    gsap.to(panel, {
        y: -50,
        scrollTrigger: {
            trigger: panel,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });
});

document.querySelectorAll('.contact-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});
