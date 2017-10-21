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
	var current = document.querySelector( '.docs-navigation__link[href="' + location.pathname + '"]' );
	current.classList.add( 'is-active' );
	current.closest( '.docs-navigation__cat' ).classList.add( 'is-active' );
}

function toggleDocsMenu() {
	document.querySelector( '.docs-navigation' ).addEventListener( 'click', function( event ) {
		if ( event.target.classList.contains( 'docs-navigation__heading' ) ) {
			event.target.parentNode.classList.toggle( 'is-active' );
		}
	} );
}

function filterDocs() {
	var input = document.querySelector( '.docs-navigation__filter' ),
		allCats = document.querySelectorAll( '.docs-navigation__cat' ),
		allLinks = document.querySelectorAll( '.docs-navigation__link' );

	function reset() {
		allCats.forEach( function( cat ) {
			cat.classList.remove( 'is-hidden' );
			cat.classList.remove( 'is-active' );
		} );
		allLinks.forEach( function( link ) {
			link.classList.remove( 'is-hidden' );
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
		allLinks.forEach( function( link ) {
			link.classList.add( 'is-hidden' );
			if ( -1 === link.textContent.toLowerCase().indexOf( term ) ) {
				return;
			}
			var cat = link.closest( '.docs-navigation__cat' );
			link.classList.remove( 'is-hidden' );
			cat.classList.remove( 'is-hidden' );
			cat.classList.add( 'is-active' );
		} );
	}
	input.addEventListener( 'keyup', filter );
}

// Generate table of content.
tocbot.init( {
	tocSelector: '.toc-navigation',
	contentSelector: '.entry-content',
	headingSelector: 'h2, h3, h4'
} );
loadGoogleFonts();
highlighCurrentDocs();
toggleDocsMenu();
filterDocs();