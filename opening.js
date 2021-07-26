// tl to change together multiple animations
window.addEventListener('load', () => {   
    const tl = gsap.timeline({defaults: {ease: 'power1.out'}});
    tl.to('.text', {y:'0%', opacity: '1', duration: 1, stagger: 1});
    tl.to('.intro', {y: '-100%', duration: 2, delay: .5});
    tl.to('.slider', {y: '-100%', duration: 1.5}, '-=1.75');
});