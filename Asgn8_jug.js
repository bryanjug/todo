var addItem = function() {
	var myInput = document.createElement('input');
	var myBr = document.createElement('br');
	
	var myParent = document.getElementById('todolist');
	//last child of todolist
	myParent.appendChild(myInput).setAttribute('type', 'text');
	myParent.appendChild(myBr);
	
	myParent.appendChild(myInput).setAttribute('class', 'listitem');
}

var sortItems = function() {
	document.getElementById('displayitems').innerHTML = '';
	
	var myInputsList = new Array();
	
	var inputs = document.getElementsByClassName('listitem');
	
	
	for (index = 0; index < inputs.length; index++) {
		myInputsList[index] = '<span>' + inputs[index].value + '</span><br><hr>';
	}
	var listSorted = myInputsList.sort();
	var listJoined = listSorted.join('');
	document.getElementById('displayitems').innerHTML = listJoined;
}

window.onload = function () {
	var today = new Date();
	
	var todaymm = today.getMonth() + 1;
	var todaydd = today.getDate();
	var todayyyy = today.getFullYear();
	
	var todayFormatted = todaymm + '/' + todaydd + '/' + todayyyy;
	
	document.getElementById('today').innerHTML = todayFormatted;
	
	document.getElementById('additem').onclick = addItem;
	document.getElementById('sortitems').onclick = sortItems;
}

// Listen for "resize" events.
window.addEventListener( "resize", handleResizeEvent );
// Listen for Media Query "change" events.
setupMediaQueryListeners();

// --------------------------------------------------------------------------- //
// --------------------------------------------------------------------------- //

// I handle window resize events.
function handleResizeEvent( event ) {

	console.group( "%cResize Event", "color: red" );
	console.log( "Window width:", window.innerWidth );
	console.log( "Pixel density:", window.devicePixelRatio );
	// NOTE: Safari seems to report the devicePixelRatio as "1" (on my laptop)
	// regardless of what the Zoom is doing. Chrome and Firefox, on the other
	// hand, seem to show an increased pixel density as the Zoom increases.
	console.groupEnd();

}

// I handle media-query change events.
function handleMediaQueryChangeEvent( event ) {

	console.group( "%cMediaQueryList Event", "color: purple" );
	console.log( "Condition:", event.media );
	console.log( "Matches:", event.matches );
	console.groupEnd();

}

// --------------------------------------------------------------------------- //
// --------------------------------------------------------------------------- //

// I look through the document StyleSheet and setup watchers for any Media Rule
// in the CSS rule list.
function setupMediaQueryListeners() {

	var rules = document.styleSheets[ 0 ].cssRules;
	var length = rules.length;

	for ( var i = 0 ; i < length ; i++ ) {

		var rule = rules[ i ];
		var conditionText = ( rule.media && rule.media[ 0 ] );

		// If this isn't a CSS Media Rule, skip it.
		if ( ! conditionText ) {

			continue;

		}

		// Create a watcher for the given CSS Media Rule condition. The condition
		// text will be something like, "screen and (min-width: 900px)". The
		// resultant object allows us to listen for "change" events on that
		// condition relative to the state of the document.
		var mediaQueryList = window.matchMedia( conditionText );

		// CAUTION: You can also use .addEventListener(change); however, that
		// method does not appear to work for Safari. Classic Safari!
		mediaQueryList.addListener( handleMediaQueryChangeEvent );

		// In addition to listening for changes on the media query, we can also
		// check to see if the initial state of the media query matches the
		// current document state.
		console.group( "Setting up media listener" );
		console.log( "Condition:", conditionText );
		console.log( "Initial match:", mediaQueryList.matches );
		console.groupEnd();

	}			

}