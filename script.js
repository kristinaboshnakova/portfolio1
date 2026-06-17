const pageLoader = document.querySelector("#page-loader");
const loaderProgressBar = document.querySelector("#loader-progress-bar");
const loaderPercentage = document.querySelector("#loader-percentage");

const header = document.querySelector(".header");
const menuButton = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".navbar a");
const codeElement = document.querySelector("#typewriter-code");

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

/* =========================
   PAGE LOADER
========================= */

function runPageLoader() {
    if (
        !pageLoader ||
        !loaderProgressBar ||
        !loaderPercentage
    ) {
        document.body.classList.remove("is-loading");
        startCodeAnimation();

        return;
    }

    if (reducedMotion) {
        loaderProgressBar.style.width = "100%";
        loaderPercentage.textContent = "100%";

        window.setTimeout(() => {
            finishPageLoader();
        }, 250);

        return;
    }

    let progress = 0;

    const minimumLoaderTime = 4000;
    const loaderStartTime = Date.now();

    let pageIsLoaded = document.readyState === "complete";
    let loaderFinished = false;

    const loaderInterval = window.setInterval(() => {
        let increment;

        if (progress < 30) {
            increment = Math.random() * 3.5 + 2;
        } else if (progress < 65) {
            increment = Math.random() * 2.3 + 0.9;
        } else if (progress < 85) {
            increment = Math.random() * 1.2 + 0.4;
        } else {
            increment = Math.random() * 0.3 + 0.08;
        }

        progress = Math.min(progress + increment, 96);

        const roundedProgress = Math.round(progress);

        loaderProgressBar.style.width = `${roundedProgress}%`;
        loaderPercentage.textContent = `${roundedProgress}%`;
    }, 130);

    function tryToCompleteLoader() {
        if (loaderFinished || !pageIsLoaded) {
            return;
        }

        const elapsedTime = Date.now() - loaderStartTime;

        const remainingTime = Math.max(
            minimumLoaderTime - elapsedTime,
            0
        );

        loaderFinished = true;

        window.setTimeout(() => {
            window.clearInterval(loaderInterval);

            progress = 100;

            loaderProgressBar.style.width = "100%";
            loaderPercentage.textContent = "100%";

            window.setTimeout(() => {
                finishPageLoader();
            }, 350);
        }, remainingTime);
    }

    if (pageIsLoaded) {
        tryToCompleteLoader();
    } else {
        window.addEventListener(
            "load",
            () => {
                pageIsLoaded = true;
                tryToCompleteLoader();
            },
            {
                once: true
            }
        );
    }

    window.setTimeout(() => {
        pageIsLoaded = true;
        tryToCompleteLoader();
    }, 8000);
}

function finishPageLoader() {
    if (pageLoader) {
        pageLoader.classList.add("is-hidden");

        window.setTimeout(() => {
            pageLoader.remove();
        }, 750);
    }

    document.body.classList.remove("is-loading");
    startCodeAnimation();
}

/* =========================
   SCROLLED HEADER
========================= */

function updateHeaderOnScroll() {
    if (!header) {
        return;
    }

    const isScrolled = window.scrollY > 40;

    header.classList.toggle(
        "header-scrolled",
        isScrolled
    );
}

window.addEventListener(
    "scroll",
    updateHeaderOnScroll,
    {
        passive: true
    }
);

updateHeaderOnScroll();

/* =========================
   MOBILE NAVIGATION
========================= */

function setMenuState(isOpen) {
    if (!menuButton || !navbar) {
        return;
    }

    navbar.classList.toggle("show", isOpen);

    menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuButton.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );

    const icon = menuButton.querySelector("i");

    if (icon) {
        icon.classList.toggle("fa-bars", !isOpen);
        icon.classList.toggle("fa-xmark", isOpen);
    }
}

if (menuButton && navbar) {
    menuButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const isOpen = navbar.classList.contains("show");

        setMenuState(!isOpen);
    });

    navbar.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            setMenuState(false);
        });
    });

    document.addEventListener("click", () => {
        setMenuState(false);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setMenuState(false);

            if (menuButton) {
                menuButton.focus();
            }
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 992) {
            setMenuState(false);
        }
    });
}

/* =========================
   TYPEWRITER HTML CODE
========================= */

const codeTokens = [
    [
        {
            text: "<!DOCTYPE html>",
            className: "token-text"
        }
    ],
    [
        {
            text: "<html",
            className: "token-component"
        },
        {
            text: " lang=",
            className: "token-text"
        },
        {
            text: '"en"',
            className: "token-string"
        },
        {
            text: ">",
            className: "token-component"
        }
    ],
    [],
    [
        {
            text: "  <head>",
            className: "token-component"
        }
    ],
    [
        {
            text: "    <meta",
            className: "token-component"
        },
        {
            text: " charset=",
            className: "token-text"
        },
        {
            text: '"UTF-8"',
            className: "token-string"
        },
        {
            text: ">",
            className: "token-component"
        }
    ],
    [
        {
            text: "    <meta",
            className: "token-component"
        },
        {
            text: " name=",
            className: "token-text"
        },
        {
            text: '"viewport"',
            className: "token-string"
        },
        {
            text: " content=",
            className: "token-text"
        },
        {
            text: '"width=device-width, initial-scale=1.0"',
            className: "token-string"
        },
        {
            text: ">",
            className: "token-component"
        }
    ],
    [
        {
            text: "    <title>",
            className: "token-component"
        },
        {
            text: "Portfolio",
            className: "token-text"
        },
        {
            text: "</title>",
            className: "token-component"
        }
    ],
    [
        {
            text: "  </head>",
            className: "token-component"
        }
    ],
    [],
    [
        {
            text: "  <body>",
            className: "token-component"
        }
    ],
    [
        {
            text: "    <main",
            className: "token-component"
        },
        {
            text: " class=",
            className: "token-text"
        },
        {
            text: '"portfolio"',
            className: "token-string"
        },
        {
            text: ">",
            className: "token-component"
        }
    ],
    [
        {
            text: "      <h1>",
            className: "token-component"
        },
        {
            text: "Building modern web experiences",
            className: "token-text"
        },
        {
            text: "</h1>",
            className: "token-component"
        }
    ],
    [
        {
            text: "      <p>",
            className: "token-component"
        },
        {
            text: "Responsive. Accessible. Polished.",
            className: "token-text"
        },
        {
            text: "</p>",
            className: "token-component"
        }
    ],
    [
        {
            text: "    </main>",
            className: "token-component"
        }
    ],
    [
        {
            text: "  </body>",
            className: "token-component"
        }
    ],
    [],
    [
        {
            text: "</html>",
            className: "token-component"
        }
    ]
];

const characterDelay = 27;
const lineDelay = 80;

let codeAnimationStarted = false;

function sleep(milliseconds) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, milliseconds);
    });
}

async function typeCode() {
    if (!codeElement) {
        return;
    }

    codeElement.textContent = "";

    for (
        let lineIndex = 0;
        lineIndex < codeTokens.length;
        lineIndex += 1
    ) {
        const line = codeTokens[lineIndex];

        for (const token of line) {
            const span = document.createElement("span");

            if (token.className) {
                span.className = token.className;
            }

            codeElement.appendChild(span);

            for (const character of token.text) {
                span.textContent += character;

                const randomDelay = Math.random() * 20;

                await sleep(
                    characterDelay + randomDelay
                );
            }
        }

        if (lineIndex < codeTokens.length - 1) {
            codeElement.appendChild(
                document.createTextNode("\n")
            );

            await sleep(lineDelay);
        }
    }
}

function renderCodeImmediately() {
    if (!codeElement) {
        return;
    }

    codeElement.textContent = "";

    codeTokens.forEach((line, lineIndex) => {
        line.forEach((token) => {
            const span = document.createElement("span");

            if (token.className) {
                span.className = token.className;
            }

            span.textContent = token.text;

            codeElement.appendChild(span);
        });

        if (lineIndex < codeTokens.length - 1) {
            codeElement.appendChild(
                document.createTextNode("\n")
            );
        }
    });
}

function startCodeAnimation() {
    if (
        codeAnimationStarted ||
        !codeElement
    ) {
        return;
    }

    codeAnimationStarted = true;

    if (reducedMotion) {
        renderCodeImmediately();

        return;
    }

    window.setTimeout(() => {
        typeCode();
    }, 250);
}

/* =========================
   FOOTER
========================= */

const currentYearElement = document.querySelector(
    "#current-year"
);

const scrollToTopButton = document.querySelector(
    "#scroll-to-top"
);

if (currentYearElement) {
    currentYearElement.textContent =
        new Date().getFullYear();
}

if (scrollToTopButton) {
    scrollToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: reducedMotion
                ? "auto"
                : "smooth"
        });
    });
}

/* =========================
   START WEBSITE
========================= */

if (pageLoader) {
    runPageLoader();
} else {
    document.body.classList.remove("is-loading");
    startCodeAnimation();
}