function loadGoogleFonts() {
	window.WebFontConfig = {
		google: { families: [ 'Roboto+Slab:700' ] }
	};
	var wf = document.createElement('script'), s = document.scripts[0];
	wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
	wf.async = true;
	s.parentNode.insertBefore(wf, s);
}

function highlighCurrentDocs() {
	var current = document.querySelector( '.docs-navigation__item.is-active' );
	if ( !current ) {
		return;
	}
	current.closest( '.docs-navigation__cat' ).classList.add( 'is-active' );
}

function toggleDocsMenu() {
	var click = 'ontouchstart' in window ? 'touchstart' : 'click';

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

loadGoogleFonts();
toggleDocsMenu();
filterDocs();
generateTOC()