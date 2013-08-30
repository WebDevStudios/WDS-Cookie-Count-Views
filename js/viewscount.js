/**
 * WDS view counter cookie tool
 * @since 0.1.0
 * @type  {Object}
 */
var wdsViewCount = {

	// initiate our countValue
	countValue : 0,
	queryVars  : false,

	/**
	 * Gets cookie value by name
	 * @since  0.1.0
	 * @param  {string} name Name of cookie to retrieve
	 * @return {string}      Value of cookie if found
	 */
	ReadCookie: function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},

	/**
	 * Removes cookie value
	 * @since  0.1.0
	 * @param  {string} name Name of cookie
	 */
	EraseCookie: function(name) {
		if ( this.ReadCookie(name) )
		   document.cookie = name+'=';
		this.log(name+' erased.');
	},

	/**
	 * Parse current url & return associative array or bool.
	 * @since  0.1.0
	 * @param  {string} Query var to check
	 * @return {mixed}  Returns either bool or full array of query var parts
	 */
	QueryVars: function( queryVar ) {

		if ( this.queryVars ) {
			if ( queryVar )
				return this.queryVars.hasOwnProperty( queryVar );
			return this.queryVars;
		}
		// string = string ? string : window.location.href;
		string = window.location.href;
		var vars = [], hash, parse = string.search(/\?/i);

		// if we don't find a query string, return false
		if ( parse === -1 ) {
			return false;
		}

		// if we do, break the pieces into an array
		var hashes = string.slice(string.indexOf('?') + 1).split('&');
		for( var i = 0; i < hashes.length; i++ ) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		this.queryVars = vars;

		// return bool, whether query var exists
		if ( queryVar )
			return this.queryVars.hasOwnProperty( queryVar );

		// return the array
		return this.queryVars;
	},

	/**
	 * Safely log things if query var is set
	 * @since  0.1.0
	 */
	log: function() {
		if ( this.QueryVars('wds-debug') && console && typeof console.log === 'function' ) {
			console.log.apply(console, arguments);
		}
	},

	/**
	 * Returns number of pageviews cookie value
	 * @since  0.1.0
	 * @param  {string} name Cookie name
	 * @return {int}    Page views count
	 */
	ViewCount: function( name ) {

		if ( !this.countValue ) {

			this.cookieName = name ? name : 'wds_viewcount';

			// get our counter
			var cookie = parseFloat( this.ReadCookie(this.cookieName) );

			cookie = isNaN(cookie) ? 1 : cookie;
			this.countValue = cookie;
			// Increment our counter
			document.cookie = [this.cookieName, '=', encodeURIComponent(cookie + 1)].join('');

			// Check query vars for deleting cookie
			if ( this.QueryVars('delete-trans') || this.QueryVars('wds-cookie-reset') )
				this.EraseCookie(this.cookieName);

			this.log(this.cookieName, cookie, this.cookieName + '->new', parseFloat( this.ReadCookie(this.cookieName) ), 'countValue', this.countValue);
		}

		// return our count
		return this.countValue;
	},

	/**
	 * Wait till window loads, then get our cookie, if it hasn't been called yet
	 * @since  0.1.0
	 */
	Test: function() {

		// This is for testing only
		if ( ! wdsViewCount.QueryVars('wds-debug') )
			return;

		// wait 1 second
		setTimeout( function(){
			// check if value has been populated yet
			if ( !wdsViewCount.countValue ) {
				// if not, update our count
				wdsViewCount.ViewCount();
			}
		}, 1000 );
	}

};

/**
 * Returns number of pageviews cookie value
 * @since  0.1.0
 * @return {int} Page views count
 */
function wds_viewcount( name ) {
	return wdsViewCount.ViewCount( name );
}

/**
 * Gets count if debugging & script is not used already
 * @since  0.1.0
 */
window.addEventListener
	? window.addEventListener('load',wdsViewCount.Test,false)
	: window.attachEvent && window.attachEvent('onload',wdsViewCount.Test);