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
	var clipboard = new ClipboardJS( '.button--copy', {
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

function popupImage() {
	$( '.entry-content img' ).each( function() {
		const $img = $( this );
		$img.attr( 'data-mfp-src', $img.attr( 'src' ) );
		$img.magnificPopup( { type: 'image' } );
	} );
}

docsearch({
	apiKey: '97cd82eb9fd8fdde822c2a66377779a0',
	indexName: 'metabox',
	inputSelector: '#filter',
	debug: true
});

toggleMobileMenu();
toggleDocsMenu();
generateTOC();
copyToClipboard();
popupImage();