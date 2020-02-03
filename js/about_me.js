(function() {
    smoothScrollPage();

    // 1
    const menuElements = document.querySelectorAll("#menu>li>a");
    menuElements[0].classList.add("active");

    // 2
    const stdLayout__btn = document.getElementsByClassName("std-layout__btn");
    stdLayout__btn[0].addEventListener("mouseover", event => {
        stdLayout__btn[0].classList.remove("std-layout__btn--primary");
    });
    stdLayout__btn[0].addEventListener("mouseout", event => {
        stdLayout__btn[0].classList.add("std-layout__btn--primary");
    });
    stdLayout__btn[1].addEventListener("mouseover", event => {
        stdLayout__btn[1].classList.add("std-layout__btn--primary");
    });
    stdLayout__btn[1].addEventListener("mouseout", event => {
        stdLayout__btn[1].classList.remove("std-layout__btn--primary");
    });

    //
    const timelineItem = Array.from(
        document.getElementsByClassName("timeline-item")
    );
    let x = 0;
    let sum = 0;
    for (let i = 0; i < 6; i++) {
        if (i % 2 == 1) x++;
        let distance = x * 65;
        timelineItem[i].style.transform = `translateY(-${distance}%)`;

        if (i % 2 == 0) {
            sum += Number(timelineItem[i].offsetHeight);
        } else {
            sum += Number(timelineItem[i].offsetHeight) * ((100 - 65) / 100);
        }
    }
    document.getElementsByClassName(
        "timeline-wrap"
    )[0].style.height = `${sum}px`;

    x = 0;
    sum = 0;
    for (let i = 6; i < 13; i++) {
        if (i % 2 == 1) x++;
        let distance = x * 65;
        timelineItem[i].style.transform = `translateY(-${distance}%)`;

        if (i % 2 == 0) {
            sum += Number(timelineItem[i].offsetHeight);
        } else {
            sum += Number(timelineItem[i].offsetHeight) * ((100 - 65) / 100);
        }
    }
    document.getElementsByClassName(
        "timeline-wrap"
    )[1].style.height = `${sum}px`;
})();

window.addEventListener("resize", () => {
    if (document.documentElement.offsetWidth >= 1024) {
        mobileMenu.style.left = "-40px";
        sidebar.style.left = "0";
    } else {
        document.getElementById("fullsite").style.transform = "none";
        mobileMenu.style.left = "0";
        sidebar.style.left = "-220px";
        if (document.documentElement.offsetWidth <= 768) {
            Array.from(
                document.getElementsByClassName("timeline-item")
            ).forEach(elm => (elm.style.transform = "none"));
        }
    }

    const cover = Array.from(document.getElementsByClassName("cover"));
    cover.forEach(elm => (elm.style.display = "none"));

    smoothScrollPage();
});

function smoothScrollPage() {
    const widthHTML = document.documentElement.offsetWidth;
    const menuElements = document.querySelectorAll("#menu>li>a");
    const wrap = Array.from(document.getElementsByClassName("wrap"));
    const scrollHeightEachWrap = wrap.map(elm => elm.scrollHeight);
    const fullsite = document.getElementById("fullsite");

    menuElements.forEach((elm, idx) => {
        elm.addEventListener("click", event => {
            event.preventDefault();
            if (widthHTML <= 768) {
                fullsite.style.transform = "none";

                let distance = 0;
                for (let i = 0; i < idx; i++)
                    distance += scrollHeightEachWrap[i];

                window.scrollTo({
                    top: distance,
                    left: 0,
                    behavior: "smooth"
                });

                menuElements.forEach(e => {
                    e.classList.remove("active");
                });
                elm.classList.add("active");
            } else {
                let x;
                if (widthHTML > 1024) {
                    x = idx * ((980 / 1366) * widthHTML);
                } else {
                    x = idx * (widthHTML - 220);
                }

                fullsite.style.transform = `translate(-${x}px, 0)`;
                $(".counter").counterUp({
                    delay: 10,
                    time: 1000
                });
                menuElements.forEach(e => {
                    e.classList.remove("active");
                });
                elm.classList.add("active");
            }
        });
    });
}

/* open menu */
const mobileMenu = document.getElementsByClassName("mobile-menu-icon")[0];
const sidebar = document.getElementsByClassName("sidebar")[0];
const cover0 = document.getElementsByClassName("cover")[0];

// open
mobileMenu.addEventListener("click", event => {
    event.preventDefault();
    mobileMenu.style.left = "-40px";
    sidebar.style.left = "0";
    cover0.style.display = "block";
});

// close
cover0.addEventListener("click", () => {
    mobileMenu.style.left = "0";
    sidebar.style.left = "-220px";
    cover0.style.display = "none";
});

/* FILTER */

const filter = Array.from(document.getElementsByClassName("filter"));
const portfolioItem = Array.from(
    document.getElementsByClassName("portfolio_item")
);

// default: active tab 'all'
portfolioItem.forEach((elm, idx) => {
    filter[0].classList.add("active");
});

filter.forEach((filterItem, idx) => {
    filterItem.addEventListener("click", () => {
        addOrRemoveClassActiveFilter(filter, idx);
    });
});

function addOrRemoveClassActiveFilter(filter, index) {
    filter.forEach((elm, idx) => {
        elm.classList.remove("active");
    });
    filter[index].classList.add("active");
}

/* FANCYBOX */
const fancybox = Array.from(document.getElementsByClassName("fancybox"));
const fancyboxPopup = Array.from(
    document.getElementsByClassName("fancybox__popup")
);
const cover1 = document.getElementsByClassName("cover")[1];
const fancyboxCloseIcon = Array.from(
    document.getElementsByClassName("fancybox__closeIcon")
);

fancybox.forEach((elm, idx) => {
    elm.addEventListener("click", event => {
        event.preventDefault();
        const linkImg = elm.dataset.linkimg;
        fancyboxPopup[idx].style.display = "block";
        cover1.style.display = "block";
    });
});

fancyboxCloseIcon.forEach((elm, idx) => {
    elm.addEventListener("click", event => {
        cover1.style.display = "none";
        fancyboxPopup[idx].style.display = "none";
    });
});
