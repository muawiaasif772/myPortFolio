function showSlider(element) {
    const slider = element.closest('.project-card').querySelector('.image-slider');
    if (slider) {
        slider.style.display = 'block';
        const firstImage = slider.querySelector('.slider-content img');
        if (firstImage) {
            slider.querySelectorAll('.slider-content img').forEach(img => {
                img.classList.remove('active'); // Ensure no other images have the active class
            });
            firstImage.classList.add('active'); // Activate the first image
        }
    } else {
        console.error("Slider not found for element:", element);
    }
}

// Add event listeners for the title, image, and description
document.querySelectorAll('.project-title, .project-image, .project-description').forEach((element) => {
    element.addEventListener('click', function () {
        showSlider(this);
    });
});

document.querySelectorAll('.close-slider').forEach((button) => {
    button.addEventListener('click', function () {
        const slider = this.closest('.image-slider');
        if (slider) {
            slider.style.display = 'none';
            slider.querySelectorAll('.slider-content img').forEach(img => {
                img.classList.remove('active'); // Remove active class from all images
            });
        }
    });
});

document.querySelectorAll('.next').forEach((button) => {
    button.addEventListener('click', function () {
        const slider = this.closest('.image-slider');
        const activeImg = slider.querySelector('.slider-content img.active');
        if (activeImg) {
            activeImg.classList.remove('active');
            const nextImg = activeImg.nextElementSibling || slider.querySelector('.slider-content img:first-child');
            nextImg.classList.add('active');
        }
    });
});

document.querySelectorAll('.prev').forEach((button) => {
    button.addEventListener('click', function () {
        const slider = this.closest('.image-slider');
        const activeImg = slider.querySelector('.slider-content img.active');
        if (activeImg) {
            activeImg.classList.remove('active');
            const prevImg = activeImg.previousElementSibling || slider.querySelector('.slider-content img:last-child');
            prevImg.classList.add('active');
        }
    });
});

// Optional: Handle mouse out to show the full image when the cursor is moved away
document.querySelectorAll('.project-image').forEach((image) => {
    image.addEventListener('mouseout', function () {
        this.style.opacity = '1'; // Ensure full visibility on mouse out
    });
});

let TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};
