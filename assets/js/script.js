// = require tocbot.min.js
// = require instantclick.min.js

function toggleMobileMenu() {
	var container, button, menu;

	container = document.getElementById( 'site-navigation' );
	if ( ! container ) {
		return;
	}

	button = container.getElementsByTagName( 'button' )[0];
	if ( 'undefined' === typeof button ) {
		return;
	}

	menu = container.getElementsByTagName( 'ul' )[0];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	menu.setAttribute( 'aria-expanded', 'false' );
	if ( -1 === menu.className.indexOf( 'nav-menu' ) ) {
		menu.className += ' nav-menu';
	}

	button.onclick = function() {
		if ( -1 !== container.className.indexOf( 'toggled' ) ) {
			container.className = container.className.replace( ' toggled', '' );
			button.setAttribute( 'aria-expanded', 'false' );
			menu.setAttribute( 'aria-expanded', 'false' );
		} else {
			container.className += ' toggled';
			button.setAttribute( 'aria-expanded', 'true' );
			menu.setAttribute( 'aria-expanded', 'true' );
		}
	};
}

function highlighCurrentDocs() {
	var current = document.querySelector( '.docs-navigation__item.is-active' );
	if ( !current ) {
		return;
	}
	current.closest( '.docs-navigation__cat' ).classList.add( 'is-active' );
}

function toggleDocsMenu() {
	var isIOS = ((/iphone|ipad/gi).test(navigator.appVersion)),
		click = isIOS ? 'touchstart' : 'click';

	function getSiblings( element ) {
		return Array.prototype.filter.call( element.parentNode.children, function( child ) {
			return child !== element;
		} );
	}

	document.querySelector( '.docs-navigation' ).addEventListener( click, function( event ) {
		if ( event.target.classList.contains( 'docs-navigation__heading' ) ) {
			event.target.parentNode.classList.toggle( 'is-active' );
			getSiblings( event.target.parentNode ).forEach( function( cat ) {
				cat.classList.remove( 'is-active' );
			} );
		}
	} );
}

function filterDocs() {
	var input = document.querySelector( '.docs-navigation__filter' ),
		allCats = document.querySelectorAll( '.docs-navigation__cat' ),
		allItems = document.querySelectorAll( '.docs-navigation__item' );

	function reset() {
		allCats.forEach( function( cat ) {
			cat.classList.remove( 'is-hidden' );
			cat.classList.remove( 'is-active' );
		} );
		allItems.forEach( function( item ) {
			item.classList.remove( 'is-hidden' );
		} );
		highlighCurrentDocs();
	}

	function filter() {
		var term = input.value.toLowerCase();
		reset();

		// Clear box search.
		if ( ! term ) {
			return;
		}

		// Filter.
		allCats.forEach( function( cat ) {
			cat.classList.add( 'is-hidden' );
		} );
		allItems.forEach( function( item ) {
			item.classList.add( 'is-hidden' );
			if ( -1 === item.textContent.toLowerCase().indexOf( term ) ) {
				return;
			}
			var cat = item.closest( '.docs-navigation__cat' );
			item.classList.remove( 'is-hidden' );
			cat.classList.remove( 'is-hidden' );
			cat.classList.add( 'is-active' );
		} );
	}
	input.addEventListener( 'keyup', filter );
}

function generateTOC() {
	if ( !document.querySelector( '.entry-content h2' ) ) {
		document.querySelector( '.hentry' ).classList.add( 'no-toc' );
		return;
	}
	tocbot.init( {
		tocSelector: '.toc-navigation',
		contentSelector: '.entry-content',
		headingSelector: 'h2, h3, h4'
	} );
}

function copyToClipboard() {
	var blocks = document.querySelectorAll( 'pre.highlight' ),
		svg = '<svg class="icon icon-copy" aria-hidden="true" role="img"><use href="#icon-copy" xlink:href="#icon-copy"></use></svg> ';
	blocks.forEach( function( block ) {
		block.innerHTML += '<button class="button--copy" title="Click to copy the code">' + svg + 'Copy</button>';
	} );
	var clipboard = new Clipboard( '.button--copy', {
		target: function( trigger ) {
			return trigger.previousElementSibling;
		}
	} );
	clipboard.on('success', function(e) {
		e.clearSelection();
		e.trigger.innerHTML = svg + 'Copied';
		setTimeout(function() {
			e.trigger.innerHTML = svg + 'Copy';
		}, 3000);
	} );
	clipboard.on('error', function(e) {
		alert( 'Press Ctrl-C to copy' );
	});
}

function init() {
	toggleMobileMenu();
	toggleDocsMenu();
	// filterDocs();
	generateTOC();
	copyToClipboard();

	ga('send', 'pageview', location.pathname + location.search);

	docsearch({
		apiKey: '97cd82eb9fd8fdde822c2a66377779a0',
		indexName: 'metabox',
		inputSelector: '#filter',
		debug: true
	});
}

// Google Analytics
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', 'UA-57415220-10', 'auto');

// Google Fonts.
window.WebFontConfig = {
	google: { families: [ 'Roboto+Slab:700' ] }
};

InstantClick.on('change', init);
InstantClick.init();
