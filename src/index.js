import Lenis from "lenis";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

// Lenis smooth scroll
const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
	lenis.raf(time * 1000);
});

const teamAnchorScroll = function () {
	const anchorButtons = document.querySelectorAll(".button.is-team-anchor");
	if (anchorButtons.length === 0) return;
	let isScrolling = false;
	let scrollOffset;

	const calculateScrollOffset = function () {
		const headerHeight = document.querySelector(".section_header").offsetHeight;
		const stickyHeight = document.querySelector(".our-team_anchor-container").offsetHeight;
		scrollOffset = headerHeight + stickyHeight;
	};
	calculateScrollOffset();
	window.addEventListener("resize", calculateScrollOffset);

	anchorButtons.forEach((button) => {
		const targetSection = document.getElementById(button.dataset.anchor);

		button.addEventListener("click", function () {
			lenis.scrollTo(targetSection, {
				offset: -scrollOffset, // Negative offset to scroll 100px above the target
				immediate: false,
				ease: t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
			});
		});

		ScrollTrigger.create({
			trigger: targetSection,
			start: "top 60%",
			end: "bottom 60%",
			onEnter: () => {
				button.classList.add("is-current");
			},
			onLeave: () => {
				button.classList.remove("is-current");
			},
			onEnterBack: () => {
				button.classList.add("is-current");
			},
			onLeaveBack: () => {
				button.classList.remove("is-current");
			},
		});
	});
};

const logoAnimation = function () {
	const logo = document.querySelector(".nav_logo.is-animate");
	if (!logo) return;
	const heroSection = document.querySelector(".section_landing-hero");
	const header = document.querySelector(".section_header");
	const headerHeight = header.offsetHeight;
	const endHeight = window.innerWidth > 991 ? 24 : 18;

	// Adjusting hero padding-top to match fixed header's initial height
	heroSection.style.paddingTop = `${headerHeight}px`;

	// Create a timeline
	const tl = gsap.timeline({
		ease: "linear",

		scrollTrigger: {
			trigger: heroSection,
			start: "top top",
			end: "bottom center",
			scrub: true,
		},
	});

	// Animate the width
	tl.to(logo, {
		height: endHeight,
	});

	tl.fromTo(
		logo,
		{
			webkitFilter: "brightness(1)",
			filter: "brightness(1)",
		},
		{
			webkitFilter: "brightness(0)",
			filter: "brightness(0)",
			duration: 0.2,
		},
		"<"
	);
};

// Image paralax on scorll animation
const imageParalaxAnimation = function () {
	const parallaxContainers = document.querySelectorAll(".is-parallax");
	if (!parallaxContainers) return;
	parallaxContainers.forEach(function (container) {
		gsap.to(container.querySelectorAll("img"), {
			top: "0%", // Absolute image was set to -20% top
			ease: "none",
			scrollTrigger: {
				trigger: container,
				start: "top bottom",
				end: "bottom top",
				scrub: true,
			},
		});
	});
};

const trenchlessImageSlider = function () {
	const swiperTarget = document.querySelector(".trenchless-park_swiper");
	if (!swiperTarget) return;
	const swiper = new Swiper(swiperTarget, {
		modules: [Navigation, Pagination],
		loop: false,
		slidesPerView: 1.1,
		speed: 1000,
		spaceBetween: 24,
		autoHeight: false,
		pagination: {
			el: ".swiper-progress-bar",
			type: "progressbar",
		},
		navigation: {
			nextEl: ".swiper-btn-next",
			prevEl: ".swiper-btn-prev",
		},
	});
};

const blogShareButtons = function () {
	let title = document.title;
	let url = window.location.href;

	// Copy post URL
	const copyUrlButton = document.querySelector("[data-share-url]");
	const copyUrlText = document.querySelector(".blog-content_copied-text");
	if (copyUrlButton) {
		copyUrlButton.addEventListener("click", async () => {
			try {
				await navigator.clipboard.writeText(url);
				console.log("Content copied to clipboard");
				if (!copyUrlText.classList.contains("display-none")) return;
				copyUrlText.classList.remove("display-none");
				setTimeout(function () {
					copyUrlText.classList.add("display-none");
				}, 2000);
			} catch (err) {
				console.error("Failed to copy: ", err);
			}
		});
	}

	// Facebook share links
	let facebookShareLinks = document.querySelectorAll("[data-share-facebook]");
	facebookShareLinks.forEach(function (link) {
		link.setAttribute("href", "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(title));
		link.setAttribute("target", "_blank");
	});

	// LinkedIn share links
	let linkedinShareLinks = document.querySelectorAll("[data-share-linkedin]");
	linkedinShareLinks.forEach(function (link) {
		link.setAttribute(
			"href",
			"https://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(title) + "&summary="
		);
		link.setAttribute("target", "_blank");
	});
};

const homeHeadingAnimation = function () {
	const animationInterval = 600;
	const headings = document.querySelectorAll(".landing-future_heading");
	const animationTrack = document.querySelector(".landing-future-track");
	if (!animationTrack) return;

	let mm = gsap.matchMedia();
	mm.add("(min-width: 992px)", () => {
		// animationTrack.style.height = `calc(100vh + ${animationInterval * headings.length}px)`;
		const trackHeight = `calc(100vh + ${animationInterval * headings.length}px)`;
		gsap.set(animationTrack, {
			height: trackHeight,
		});

		headings.forEach((heading, index) => {
			const targetFontSize = "11vw";

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: ".landing-future_wrap",
					start: `top+=${index * animationInterval} top`,
					end: `top+=${(index + 1) * animationInterval} top`,
					scrub: true,
					toggleActions: "play none none reverse",
				},
			});

			tl.to(heading, {
				fontSize: targetFontSize, // Use the responsive font size
				opacity: 1,
				ease: "linear",
				duration: 1,
			});
		});
	});
};

const engineeringLineAnimaton = function () {
	const animatedLine = document.querySelector(".engineering-management_line");
	if (!animatedLine) return;
	const lastItem = document.querySelector(".engineering-management_item-grid.is-last");
	const lastItemHeight = lastItem.offsetHeight;
	const animatedLineWrap = document.querySelector(".engineering-management_line-wrap");
	animatedLineWrap.style.height = `calc(100% - ${lastItemHeight}px)`;

	gsap.set(animatedLine, { transformOrigin: "center top" });

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: animatedLineWrap,
			start: "top center",
			end: "bottom center",
			scrub: 1,
		},
	});

	tl.fromTo(
		animatedLine,
		{
			scaleY: 0,
		},
		{
			scaleY: 1,
			duration: 3,
			ease: "none",
		}
	);
};

const engineeringStepsAnimation = function () {
	const steps = document.querySelectorAll(".engineering-management_item-grid");
	steps.forEach((step) => {
		const image = step.querySelector(".engineering-management_image");
		const number = step.querySelector(".heading-style-h1");
		const text = step.querySelector(".engineering-management_content");
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: step,
				start: "top+=10 center",
				toggleActions: "play none none reverse",
			},
		});

		tl.fromTo(
			[image, number, text],
			{
				opacity: 0.1,
			},
			{
				opacity: 1,
				duration: 0.3,
				ease: "none",
			}
		);
	});
};

const projectImageSlider = function () {
	const swiperTarget = document.querySelector(".project-gallery_swiper");
	if (!swiperTarget) return;
	const swiper = new Swiper(swiperTarget, {
		loop: false,
		slidesPerView: 1,
		speed: 1000,
		spaceBetween: 24,
		autoHeight: false,
		pagination: {
			el: ".swiper-progress-bar",
			type: "progressbar",
		},
		navigation: {
			nextEl: ".swiper-btn-next",
			prevEl: ".swiper-btn-prev",
		},
		breakpoints: {
			768: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 3,
			},
		},
	});
};

const menuAnimation = function () {
	const lottieContainer = document.querySelector(".nav_hamburger-wrap");
	if (!lottieContainer) return;

	const navWrap = document.querySelector(".nav_menu");
	const navOverlay = document.querySelector(".nav_overlay");
	const menuLogo = document.querySelector(".nav_logo.is-menu");
	const languages = document.querySelector(".nav_languages");
	let menuOpen = false;
	let animationInProgress = false;

	// Timelines
	const openTl = gsap.timeline({ paused: true });
	const closeTl = gsap.timeline({ paused: true });

	// Open animation
	openTl
		// The rest is for all devices
		.set(navWrap, { display: "flex" })
		.set(navOverlay, { display: "block" }, "<")
		.to(navWrap, {
			x: "0%",
			duration: 0.6,
			ease: "power2.inOut",
		})
		.to(navOverlay, { opacity: 0.4, duration: 0.3 }, "<")
		.fromTo(
			[".nav_row, .nav_btn-row"],
			{ opacity: 0, y: "24px" },
			{
				opacity: 1,
				y: "0px",
				duration: 0.6,
				ease: "power2.out",
			},
			"0.5"
		);

	// Close animation
	closeTl
		.to(navWrap, {
			x: "100%",
			duration: 0.4,
			ease: "power1.in",
		})
		.to(
			[".nav_row, .nav_btn-row"],
			{
				opacity: 0,
				duration: 0.2,
				ease: "linear",
			},
			"<"
		)
		.to(navOverlay, { opacity: 0, duration: 0.2 })
		.set([navWrap, navOverlay], { display: "none" });

	// Mobile specific animation for logo and language switcher
	const mm = gsap.matchMedia();
	mm.add("(max-width: 991px)", () => {
		openTl.fromTo(
			menuLogo,
			{
				y: "24px",
				opacity: 0,
			},
			{
				opacity: 1,
				y: "0px",
				duration: 0.6,
				ease: "power2.out",
			},
			"0.5"
		);
		openTl.fromTo(
			languages,
			{
				y: "24px",
				opacity: 0,
			},
			{
				opacity: 1,
				y: "0px",
				duration: 0.6,
				ease: "power2.out",
			},
			"<"
		);

		closeTl.to(
			[menuLogo, languages],
			{
				opacity: 0,
				duration: 0.2,
				ease: "linear",
			},
			"0"
		);
	});

	// Hamburger lottie
	const lottie = Webflow.require("lottie").lottie;
	const hamburgerLottie = lottie.loadAnimation({
		container: lottieContainer, // the DOM element that will contain the animation
		renderer: "svg", // Render type: 'svg', 'canvas', 'html'
		loop: false, // Whether to loop the animation
		autoplay: false, // Whether to start playing the animation automatically
		path: "https://uploads-ssl.webflow.com/65d7809d1a3802ce7ed1eaf1/65e0740877890ba8d4a92f21_krs_menu_animation.json", // the path to the animation JSON
	});

	// Open animation
	const openMenu = function () {
		if (animationInProgress) return;
		animationInProgress = true;
		hamburgerLottie.setSpeed(1.5);
		hamburgerLottie.setDirection(1);
		hamburgerLottie.play();
		openTl.restart().then(() => {
			animationInProgress = false;
		});
		menuOpen = true;
	};

	// Close animation
	const closeMenu = function () {
		if (animationInProgress) return;
		animationInProgress = true;
		hamburgerLottie.setSpeed(2);
		hamburgerLottie.setDirection(-1);
		hamburgerLottie.play();
		closeTl.restart().then(() => {
			animationInProgress = false;
		});
		menuOpen = false;
	};

	// Add click listener to hamburger
	lottieContainer.addEventListener("click", function () {
		if (menuOpen) {
			closeMenu();
		} else {
			openMenu();
		}
	});

	// Close menu on body click
	navOverlay.addEventListener("click", function () {
		if (menuOpen) {
			closeMenu();
		}
	});
};

const textFillAnimation = function () {
	const animatedHeading = document.querySelector(".landing-future_heading");
	if (!animatedHeading) return;

	// Initialize SplitType on the selected element
	const splitHeading = new SplitType(animatedHeading, {
		types: "lines, words, chars",
	});

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: animatedHeading,
			start: "top bottom",
			end: "center center",
			scrub: true,
		},
	});

	// Animate the characters
	tl.fromTo(
		splitHeading.chars,
		{
			opacity: 0.2,
		},
		{
			opacity: 1,
			duration: 0.3,
			stagger: 0.3,
			ease: "linear",
		}
	);
};

// Initialize all animations when DOM is loaded
function initAnimations() {
	gsap.registerPlugin(ScrollTrigger);
	logoAnimation();
	imageParalaxAnimation();
	blogShareButtons();
	// homeHeadingAnimation();
	engineeringLineAnimaton();
	engineeringStepsAnimation();
	trenchlessImageSlider();
	projectImageSlider();
	menuAnimation();
	teamAnchorScroll();
	textFillAnimation();
}

document.addEventListener("DOMContentLoaded", initAnimations);
