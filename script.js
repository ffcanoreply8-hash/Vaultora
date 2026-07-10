"use strict";

/* =========================================================
   VAULTORA
   Front-end demonstration logic

   IMPORTANT:
   This script does not send form data to a server.
   Sensitive financial information is not requested.
========================================================= */


/* =========================================================
   DOM REFERENCES
========================================================= */

const navItems = document.querySelectorAll(".nav-item[data-section]");

const pageSections = document.querySelectorAll(".page-section");

const pageTitle = document.getElementById("pageTitle");

const modalTriggers = document.querySelectorAll("[data-modal]");

const navTargetButtons = document.querySelectorAll("[data-nav-target]");

const modalBackdrops = document.querySelectorAll(".modal-backdrop");

const modalCloseButtons = document.querySelectorAll(".modal-close");

const modalCancelButtons = document.querySelectorAll(".modal-cancel");

const notificationButton =
    document.getElementById("notificationButton");

const notificationPanel =
    document.getElementById("notificationPanel");

const closeNotificationButton =
    document.getElementById("closeNotificationButton");

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const sidebar =
    document.getElementById("sidebar");

const mobileOverlay =
    document.getElementById("mobileOverlay");

const currentDate =
    document.getElementById("currentDate");

const sessionId =
    document.getElementById("sessionId");

const demoConfirmation =
    document.getElementById("demoConfirmation");

const completeDemoButton =
    document.getElementById("completeDemoButton");

const voidChequeDemoForm =
    document.getElementById("voidChequeDemoForm");

const messageModal =
    document.getElementById("messageModal");

const messageTitle =
    document.getElementById("messageTitle");

const messageText =
    document.getElementById("messageText");

const messageCloseButton =
    document.getElementById("messageCloseButton");

const documentButtons =
    document.querySelectorAll("[data-document]");

const settingsButton =
    document.getElementById("settingsButton");

const profileButton =
    document.getElementById("profileButton");


/* =========================================================
   APPLICATION STATE
========================================================= */

const appState = {
    currentSection: "overview",
    notificationPanelOpen: false,
    mobileNavigationOpen: false
};


const sectionTitles = {
    overview: "Overview",
    documents: "Documents",
    verification: "Verification",
    activity: "Activity"
};


/* =========================================================
   INITIALIZATION
========================================================= */

function initializeVaultora() {
    setCurrentDate();

    generateSessionId();

    bindNavigation();

    bindModals();

    bindNotifications();

    bindMobileNavigation();

    bindDemoWorkflow();

    bindDocumentActions();

    bindGeneralActions();
}


document.addEventListener(
    "DOMContentLoaded",
    initializeVaultora
);


/* =========================================================
   DATE
========================================================= */

function setCurrentDate() {
    if (!currentDate) {
        return;
    }

    const formatter = new Intl.DateTimeFormat(
        "en-CA",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

    currentDate.textContent =
        formatter.format(new Date());
}


/* =========================================================
   SESSION IDENTIFIER

   This is only a visual demonstration identifier.
========================================================= */

function generateSessionId() {
    if (!sessionId) {
        return;
    }

    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let identifier = "";

    for (let index = 0; index < 6; index += 1) {
        const randomIndex = Math.floor(
            Math.random() * characters.length
        );

        identifier += characters[randomIndex];
    }

    sessionId.textContent =
        `VLT-${identifier}`;
}


/* =========================================================
   NAVIGATION
========================================================= */

function bindNavigation() {
    navItems.forEach((navItem) => {
        navItem.addEventListener(
            "click",
            () => {
                const targetSection =
                    navItem.dataset.section;

                navigateToSection(targetSection);
            }
        );
    });


    navTargetButtons.forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                const targetSection =
                    button.dataset.navTarget;

                navigateToSection(targetSection);
            }
        );
    });
}


function navigateToSection(sectionName) {
    const targetSection =
        document.getElementById(
            `${sectionName}Section`
        );

    if (!targetSection) {
        return;
    }


    appState.currentSection =
        sectionName;


    pageSections.forEach((section) => {
        section.classList.remove(
            "active-section"
        );
    });


    targetSection.classList.add(
        "active-section"
    );


    navItems.forEach((navItem) => {
        const isTarget =
            navItem.dataset.section === sectionName;

        navItem.classList.toggle(
            "active",
            isTarget
        );
    });


    if (pageTitle) {
        pageTitle.textContent =
            sectionTitles[sectionName]
            ?? "Vaultora";
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    closeMobileNavigation();
}


/* =========================================================
   MODALS
========================================================= */

function bindModals() {
    modalTriggers.forEach((trigger) => {
        trigger.addEventListener(
            "click",
            () => {
                const modalId =
                    trigger.dataset.modal;

                openModal(modalId);
            }
        );
    });


    modalCloseButtons.forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                const modalBackdrop =
                    button.closest(
                        ".modal-backdrop"
                    );

                closeModal(modalBackdrop);
            }
        );
    });


    modalCancelButtons.forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                const modalBackdrop =
                    button.closest(
                        ".modal-backdrop"
                    );

                closeModal(modalBackdrop);
            }
        );
    });


    modalBackdrops.forEach((backdrop) => {
        backdrop.addEventListener(
            "click",
            (event) => {
                if (event.target === backdrop) {
                    closeModal(backdrop);
                }
            }
        );
    });


    document.addEventListener(
        "keydown",
        (event) => {
            if (event.key !== "Escape") {
                return;
            }

            closeAllModals();

            closeNotificationPanel();

            closeMobileNavigation();
        }
    );
}


function openModal(modalId) {
    const modal =
        document.getElementById(modalId);

    if (!modal) {
        return;
    }

    closeNotificationPanel();

    modal.classList.add("open");

    document.body.style.overflow =
        "hidden";
}


function closeModal(modal) {
    if (!modal) {
        return;
    }

    modal.classList.remove("open");

    const anyOpenModal =
        document.querySelector(
            ".modal-backdrop.open"
        );

    if (!anyOpenModal) {
        document.body.style.overflow = "";
    }
}


function closeAllModals() {
    modalBackdrops.forEach((modal) => {
        modal.classList.remove("open");
    });

    document.body.style.overflow = "";
}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function bindNotifications() {
    if (notificationButton) {
        notificationButton.addEventListener(
            "click",
            () => {
                toggleNotificationPanel();
            }
        );
    }


    if (closeNotificationButton) {
        closeNotificationButton.addEventListener(
            "click",
            closeNotificationPanel
        );
    }
}


function toggleNotificationPanel() {
    if (!notificationPanel) {
        return;
    }

    appState.notificationPanelOpen =
        !appState.notificationPanelOpen;

    notificationPanel.classList.toggle(
        "open",
        appState.notificationPanelOpen
    );
}


function closeNotificationPanel() {
    if (!notificationPanel) {
        return;
    }

    appState.notificationPanelOpen =
        false;

    notificationPanel.classList.remove(
        "open"
    );
}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function bindMobileNavigation() {
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener(
            "click",
            toggleMobileNavigation
        );
    }


    if (mobileOverlay) {
        mobileOverlay.addEventListener(
            "click",
            closeMobileNavigation
        );
    }
}


function toggleMobileNavigation() {
    appState.mobileNavigationOpen =
        !appState.mobileNavigationOpen;

    sidebar?.classList.toggle(
        "mobile-open",
        appState.mobileNavigationOpen
    );

    mobileOverlay?.classList.toggle(
        "active",
        appState.mobileNavigationOpen
    );
}


function closeMobileNavigation() {
    appState.mobileNavigationOpen =
        false;

    sidebar?.classList.remove(
        "mobile-open"
    );

    mobileOverlay?.classList.remove(
        "active"
    );
}


/* =========================================================
   VOID CHEQUE DEMONSTRATION

   No real account information is collected.

   No fetch().
   No XMLHttpRequest.
   No WebSocket.
   No external submission.
========================================================= */

function bindDemoWorkflow() {
    if (
        !demoConfirmation ||
        !completeDemoButton ||
        !voidChequeDemoForm
    ) {
        return;
    }


    demoConfirmation.addEventListener(
        "change",
        () => {
            completeDemoButton.disabled =
                !demoConfirmation.checked;
        }
    );


    voidChequeDemoForm.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();

            if (!demoConfirmation.checked) {
                return;
            }


            const voidChequeModal =
                document.getElementById(
                    "voidChequeModal"
                );


            closeModal(voidChequeModal);


            demoConfirmation.checked =
                false;

            completeDemoButton.disabled =
                true;


            showMessage(
                "Demo workflow complete",
                "The sample workflow was completed locally. No banking details or financial documents were collected."
            );
        }
    );
}


/* =========================================================
   DOCUMENT ACTIONS
========================================================= */

function bindDocumentActions() {
    documentButtons.forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                const documentName =
                    button.dataset.document;

                showMessage(
                    documentName,
                    "This is a simulated workspace document. No real customer or financial information is stored."
                );
            }
        );
    });
}


/* =========================================================
   GENERAL UI ACTIONS
========================================================= */

function bindGeneralActions() {
    if (settingsButton) {
        settingsButton.addEventListener(
            "click",
            () => {
                showMessage(
                    "Demo settings",
                    "Account configuration is disabled in this front-end portfolio demonstration."
                );
            }
        );
    }


    if (profileButton) {
        profileButton.addEventListener(
            "click",
            () => {
                navigateToSection(
                    "verification"
                );
            }
        );
    }


    if (messageCloseButton) {
        messageCloseButton.addEventListener(
            "click",
            () => {
                closeModal(messageModal);
            }
        );
    }
}


/* =========================================================
   MESSAGE SYSTEM
========================================================= */

function showMessage(title, text) {
    if (
        !messageModal ||
        !messageTitle ||
        !messageText
    ) {
        return;
    }

    messageTitle.textContent =
        title;

    messageText.textContent =
        text;

    openModal("messageModal");
}
