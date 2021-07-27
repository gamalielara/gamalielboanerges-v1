// javascript for nav bar effects on scroll
window.addEventListener('scroll', function(){
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// javascript of responsive navigation sidebar menu
const menuBtn = document.querySelector('.menu-btn');
const navigation = document.querySelector('.navigation');
const navigationItems = document.querySelectorAll('.navigation a');
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navigation.classList.toggle('active');
});

navigationItems.forEach((navigationItem) => {
    navigationItem.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navigation.classList.remove('active');
    });
});

// to make the caption img hidden
const imgDiv = document.querySelectorAll('.work > .content > .card > .card-img');
document.querySelectorAll('.img-caption').forEach((caption) => {caption.classList.add('hidden')});
document.querySelectorAll('.card-fullpage').forEach((fullPreview) => {fullPreview.style.display = 'none';});
document.querySelectorAll('.container-fullpage').forEach((container) => {container.style.opacity = '0';});
document.querySelectorAll('.container-fullpage').forEach((container) => {container.style.transform = 'translate(-50%, 50%)';});

imgDiv.forEach((img) => {
const captionDiv = img.childNodes[1];
    img.addEventListener('mouseover', () => {
        captionDiv.classList.remove('hidden');
    });

    img.addEventListener('click', () => {
        captionDiv.classList.remove('hidden');
    });
    
    img.addEventListener('mouseleave', () => {
        captionDiv.classList.add('hidden');
    });
});

// to close the pop up preview
const closeButton = document.querySelectorAll('#close');
if(closeButton !== null){
    closeButton.forEach((close) => {
        close.addEventListener('click', (event) => {
            const theFullPageContainer = event.target.parentElement.parentElement.parentElement;
            document.querySelectorAll('.container-fullpage').forEach((container) => {container.style.transform = 'translate(-50%, 50%)';});
            document.querySelectorAll('.container-fullpage').forEach((container) => {container.style.opacity = '0';});
            setTimeout(() => {theFullPageContainer.style.display = 'none';}, 200);
        })
    })
}

// to open the pop up preview
const imageCaption = document.querySelectorAll('.content .card .card-img .img-caption h5');
imageCaption.forEach((caption) => {
    caption.addEventListener('click', (event) => {
        const imgfull = event.target.parentElement.parentElement.parentElement.childNodes[1];
        imgfull.style.display = 'block';
        setTimeout(() => {document.querySelectorAll('.container-fullpage').forEach((container) => {
            container.style.opacity = '1';
            container.style.transform = 'translate(-50%, -50%)';
        });}, 200); 
    })
});