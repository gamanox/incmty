/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.7.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote], button[data-confirm]',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);
      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, Link, browserCompatibleDocumentParser, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, constrainPageCacheTo, createDocument, currentState, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, recallScrollPosition, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  currentState = null;

  loadedAssets = null;

  referer = null;

  createDocument = null;

  xhr = null;

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    reflectNewUrl(url);
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  fetchReplacement = function(url, onLoadFunction) {
    if (onLoadFunction == null) {
      onLoadFunction = (function(_this) {
        return function() {};
      })(this);
    }
    triggerEvent('page:fetch', {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent('page:receive');
      if (doc = processResponse()) {
        changePage.apply(null, extractTitleAndBody(doc));
        reflectRedirectedUrl();
        onLoadFunction();
        return triggerEvent('page:load');
      } else {
        return document.location.href = url.absolute;
      }
    };
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent('page:restore');
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, key, pageCacheKeys, _i, _len, _results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    _results = [];
    for (_i = 0, _len = pageCacheKeys.length; _i < _len; _i++) {
      key = pageCacheKeys[_i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent('page:expire', pageCache[key]);
      _results.push(delete pageCache[key]);
    }
    return _results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    triggerEvent('page:change');
    return triggerEvent('page:update');
  };

  executeScriptTags = function() {
    var attr, copy, nextSibling, parentNode, script, scripts, _i, _j, _len, _len1, _ref, _ref1;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (_i = 0, _len = scripts.length; _i < _len; _i++) {
      script = scripts[_i];
      if (!((_ref = script.type) === '' || _ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      _ref1 = script.attributes;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        attr = _ref1[_j];
        copy.setAttribute(attr.name, attr.value);
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(currentState, '', location.href + preservedHash);
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  popCookie = function(name) {
    var value, _ref;
    value = ((_ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? _ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function() {
    return !triggerEvent('page:before-change');
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var _ref;
      return (400 <= (_ref = xhr.status) && _ref < 600);
    };
    validContent = function() {
      return xhr.getResponseHeader('Content-Type').match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var node, _i, _len, _ref, _results;
      _ref = doc.head.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          _results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return _results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var value, _i, _len, _ref, _results;
      if (a.length > b.length) {
        _ref = [b, a], a = _ref[0], b = _ref[1];
      }
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        value = a[_i];
        if (__indexOf.call(b, value) >= 0) {
          _results.push(value);
        }
      }
      return _results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.body), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  browserCompatibleDocumentParser = function() {
    var createDocumentUsingDOM, createDocumentUsingParser, createDocumentUsingWrite, e, testDoc, _ref;
    createDocumentUsingParser = function(html) {
      return (new DOMParser).parseFromString(html, 'text/html');
    };
    createDocumentUsingDOM = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.documentElement.innerHTML = html;
      return doc;
    };
    createDocumentUsingWrite = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.open('replace');
      doc.write(html);
      doc.close();
      return doc;
    };
    try {
      if (window.DOMParser) {
        testDoc = createDocumentUsingParser('<html><body><p>test');
        return createDocumentUsingParser;
      }
    } catch (_error) {
      e = _error;
      testDoc = createDocumentUsingDOM('<html><body><p>test');
      return createDocumentUsingDOM;
    } finally {
      if ((testDoc != null ? (_ref = testDoc.body) != null ? _ref.childNodes.length : void 0 : void 0) !== 1) {
        return createDocumentUsingWrite;
      }
    }
  };

  ComponentUrl = (function() {
    function ComponentUrl(original) {
      this.original = original != null ? original : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype._parse = function() {
      var _ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      _ref = this.link, this.href = _ref.href, this.protocol = _ref.protocol, this.host = _ref.host, this.hostname = _ref.hostname, this.port = _ref.port, this.pathname = _ref.pathname, this.search = _ref.search, this.hash = _ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(_super) {
    __extends(Link, _super);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, _i, _len;
      extensions = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = extensions.length; _i < _len; _i++) {
        extension = extensions[_i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link) {
      this.link = link;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this._crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    Link.prototype._anchored = function() {
      var current;
      return ((this.hash && this.withoutHash()) === (current = new ComponentUrl).withoutHash()) || (this.href === current.href + '#');
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.link;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event) {
      this.event = event;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented()) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent('page:change');
      return triggerEvent('page:update');
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent('page:update');
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, _ref;
    if ((_ref = event.state) != null ? _ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    createDocument = browserCompatibleDocumentParser();
    document.addEventListener('click', Click.installHandlerLast, true);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (_ref = popCookie('request_method')) === 'GET' || _ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks
  };

}).call(this);
/*!
 * VERSION: 1.13.1
 * DATE: 2014-07-19
 * UPDATES AND DOCS AT: http://www.greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/

var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("TweenMax",["core.Animation","core.SimpleTimeline","TweenLite"],function(t,e,i){var s=function(t){var e,i=[],s=t.length;for(e=0;e!==s;i.push(t[e++]));return i},r=function(t,e,s){i.call(this,t,e,s),this._cycle=0,this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._dirty=!0,this.render=r.prototype.render},n=1e-10,a=i._internals,o=a.isSelector,h=a.isArray,l=r.prototype=i.to({},.1,{}),_=[];r.version="1.13.1",l.constructor=r,l.kill()._gc=!1,r.killTweensOf=r.killDelayedCallsTo=i.killTweensOf,r.getTweensOf=i.getTweensOf,r.lagSmoothing=i.lagSmoothing,r.ticker=i.ticker,r.render=i.render,l.invalidate=function(){return this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),i.prototype.invalidate.call(this)},l.updateTo=function(t,e){var s,r=this.ratio;e&&this._startTime<this._timeline._time&&(this._startTime=this._timeline._time,this._uncache(!1),this._gc?this._enabled(!0,!1):this._timeline.insert(this,this._startTime-this._delay));for(s in t)this.vars[s]=t[s];if(this._initted)if(e)this._initted=!1;else if(this._gc&&this._enabled(!0,!1),this._notifyPluginsOfEnabled&&this._firstPT&&i._onPluginEvent("_onDisable",this),this._time/this._duration>.998){var n=this._time;this.render(0,!0,!1),this._initted=!1,this.render(n,!0,!1)}else if(this._time>0){this._initted=!1,this._init();for(var a,o=1/(1-r),h=this._firstPT;h;)a=h.s+h.c,h.c*=o,h.s=a-h.c,h=h._next}return this},l.render=function(t,e,i){this._initted||0===this._duration&&this.vars.repeat&&this.invalidate();var s,r,o,h,l,u,p,c,f=this._dirty?this.totalDuration():this._totalDuration,m=this._time,d=this._totalTime,g=this._cycle,v=this._duration,y=this._rawPrevTime;if(t>=f?(this._totalTime=f,this._cycle=this._repeat,this._yoyo&&0!==(1&this._cycle)?(this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0):(this._time=v,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1),this._reversed||(s=!0,r="onComplete"),0===v&&(this._initted||!this.vars.lazy||i)&&(this._startTime===this._timeline._duration&&(t=0),(0===t||0>y||y===n)&&y!==t&&(i=!0,y>n&&(r="onReverseComplete")),this._rawPrevTime=c=!e||t||y===t?t:n)):1e-7>t?(this._totalTime=this._time=this._cycle=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==d||0===v&&y>0&&y!==n)&&(r="onReverseComplete",s=this._reversed),0>t?(this._active=!1,0===v&&(this._initted||!this.vars.lazy||i)&&(y>=0&&(i=!0),this._rawPrevTime=c=!e||t||y===t?t:n)):this._initted||(i=!0)):(this._totalTime=this._time=t,0!==this._repeat&&(h=v+this._repeatDelay,this._cycle=this._totalTime/h>>0,0!==this._cycle&&this._cycle===this._totalTime/h&&this._cycle--,this._time=this._totalTime-this._cycle*h,this._yoyo&&0!==(1&this._cycle)&&(this._time=v-this._time),this._time>v?this._time=v:0>this._time&&(this._time=0)),this._easeType?(l=this._time/v,u=this._easeType,p=this._easePower,(1===u||3===u&&l>=.5)&&(l=1-l),3===u&&(l*=2),1===p?l*=l:2===p?l*=l*l:3===p?l*=l*l*l:4===p&&(l*=l*l*l*l),this.ratio=1===u?1-l:2===u?l:.5>this._time/v?l/2:1-l/2):this.ratio=this._ease.getRatio(this._time/v)),m===this._time&&!i&&g===this._cycle)return d!==this._totalTime&&this._onUpdate&&(e||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||_)),void 0;if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!i&&this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration))return this._time=m,this._totalTime=d,this._rawPrevTime=y,this._cycle=g,a.lazyTweens.push(this),this._lazy=t,void 0;this._time&&!s?this.ratio=this._ease.getRatio(this._time/v):s&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._lazy!==!1&&(this._lazy=!1),this._active||!this._paused&&this._time!==m&&t>=0&&(this._active=!0),0===d&&(2===this._initted&&t>0&&this._init(),this._startAt&&(t>=0?this._startAt.render(t,e,i):r||(r="_dummyGS")),this.vars.onStart&&(0!==this._totalTime||0===v)&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||_))),o=this._firstPT;o;)o.f?o.t[o.p](o.c*this.ratio+o.s):o.t[o.p]=o.c*this.ratio+o.s,o=o._next;this._onUpdate&&(0>t&&this._startAt&&this._startTime&&this._startAt.render(t,e,i),e||(this._totalTime!==d||s)&&this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||_)),this._cycle!==g&&(e||this._gc||this.vars.onRepeat&&this.vars.onRepeat.apply(this.vars.onRepeatScope||this,this.vars.onRepeatParams||_)),r&&(!this._gc||i)&&(0>t&&this._startAt&&!this._onUpdate&&this._startTime&&this._startAt.render(t,e,i),s&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[r]&&this.vars[r].apply(this.vars[r+"Scope"]||this,this.vars[r+"Params"]||_),0===v&&this._rawPrevTime===n&&c!==n&&(this._rawPrevTime=0))},r.to=function(t,e,i){return new r(t,e,i)},r.from=function(t,e,i){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,new r(t,e,i)},r.fromTo=function(t,e,i,s){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,new r(t,e,s)},r.staggerTo=r.allTo=function(t,e,n,a,l,u,p){a=a||0;var c,f,m,d,g=n.delay||0,v=[],y=function(){n.onComplete&&n.onComplete.apply(n.onCompleteScope||this,arguments),l.apply(p||this,u||_)};for(h(t)||("string"==typeof t&&(t=i.selector(t)||t),o(t)&&(t=s(t))),c=t.length,m=0;c>m;m++){f={};for(d in n)f[d]=n[d];f.delay=g,m===c-1&&l&&(f.onComplete=y),v[m]=new r(t[m],e,f),g+=a}return v},r.staggerFrom=r.allFrom=function(t,e,i,s,n,a,o){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,r.staggerTo(t,e,i,s,n,a,o)},r.staggerFromTo=r.allFromTo=function(t,e,i,s,n,a,o,h){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,r.staggerTo(t,e,s,n,a,o,h)},r.delayedCall=function(t,e,i,s,n){return new r(e,0,{delay:t,onComplete:e,onCompleteParams:i,onCompleteScope:s,onReverseComplete:e,onReverseCompleteParams:i,onReverseCompleteScope:s,immediateRender:!1,useFrames:n,overwrite:0})},r.set=function(t,e){return new r(t,0,e)},r.isTweening=function(t){return i.getTweensOf(t,!0).length>0};var u=function(t,e){for(var s=[],r=0,n=t._first;n;)n instanceof i?s[r++]=n:(e&&(s[r++]=n),s=s.concat(u(n,e)),r=s.length),n=n._next;return s},p=r.getAllTweens=function(e){return u(t._rootTimeline,e).concat(u(t._rootFramesTimeline,e))};r.killAll=function(t,i,s,r){null==i&&(i=!0),null==s&&(s=!0);var n,a,o,h=p(0!=r),l=h.length,_=i&&s&&r;for(o=0;l>o;o++)a=h[o],(_||a instanceof e||(n=a.target===a.vars.onComplete)&&s||i&&!n)&&(t?a.totalTime(a._reversed?0:a.totalDuration()):a._enabled(!1,!1))},r.killChildTweensOf=function(t,e){if(null!=t){var n,l,_,u,p,c=a.tweenLookup;if("string"==typeof t&&(t=i.selector(t)||t),o(t)&&(t=s(t)),h(t))for(u=t.length;--u>-1;)r.killChildTweensOf(t[u],e);else{n=[];for(_ in c)for(l=c[_].target.parentNode;l;)l===t&&(n=n.concat(c[_].tweens)),l=l.parentNode;for(p=n.length,u=0;p>u;u++)e&&n[u].totalTime(n[u].totalDuration()),n[u]._enabled(!1,!1)}}};var c=function(t,i,s,r){i=i!==!1,s=s!==!1,r=r!==!1;for(var n,a,o=p(r),h=i&&s&&r,l=o.length;--l>-1;)a=o[l],(h||a instanceof e||(n=a.target===a.vars.onComplete)&&s||i&&!n)&&a.paused(t)};return r.pauseAll=function(t,e,i){c(!0,t,e,i)},r.resumeAll=function(t,e,i){c(!1,t,e,i)},r.globalTimeScale=function(e){var s=t._rootTimeline,r=i.ticker.time;return arguments.length?(e=e||n,s._startTime=r-(r-s._startTime)*s._timeScale/e,s=t._rootFramesTimeline,r=i.ticker.frame,s._startTime=r-(r-s._startTime)*s._timeScale/e,s._timeScale=t._rootTimeline._timeScale=e,e):s._timeScale},l.progress=function(t){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!==(1&this._cycle)?1-t:t)+this._cycle*(this._duration+this._repeatDelay),!1):this._time/this.duration()},l.totalProgress=function(t){return arguments.length?this.totalTime(this.totalDuration()*t,!1):this._totalTime/this.totalDuration()},l.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),t>this._duration&&(t=this._duration),this._yoyo&&0!==(1&this._cycle)?t=this._duration-t+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(t+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(t,e)):this._time},l.duration=function(e){return arguments.length?t.prototype.duration.call(this,e):this._duration},l.totalDuration=function(t){return arguments.length?-1===this._repeat?this:this.duration((t-this._repeat*this._repeatDelay)/(this._repeat+1)):(this._dirty&&(this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat,this._dirty=!1),this._totalDuration)},l.repeat=function(t){return arguments.length?(this._repeat=t,this._uncache(!0)):this._repeat},l.repeatDelay=function(t){return arguments.length?(this._repeatDelay=t,this._uncache(!0)):this._repeatDelay},l.yoyo=function(t){return arguments.length?(this._yoyo=t,this):this._yoyo},r},!0),_gsScope._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(t,e,i){var s=function(t){e.call(this,t),this._labels={},this.autoRemoveChildren=this.vars.autoRemoveChildren===!0,this.smoothChildTiming=this.vars.smoothChildTiming===!0,this._sortChildren=!0,this._onUpdate=this.vars.onUpdate;var i,s,r=this.vars;for(s in r)i=r[s],o(i)&&-1!==i.join("").indexOf("{self}")&&(r[s]=this._swapSelfInParams(i));o(r.tweens)&&this.add(r.tweens,0,r.align,r.stagger)},r=1e-10,n=i._internals,a=n.isSelector,o=n.isArray,h=n.lazyTweens,l=n.lazyRender,_=[],u=_gsScope._gsDefine.globals,p=function(t){var e,i={};for(e in t)i[e]=t[e];return i},c=function(t,e,i,s){t._timeline.pause(t._startTime),e&&e.apply(s||t._timeline,i||_)},f=function(t){var e,i=[],s=t.length;for(e=0;e!==s;i.push(t[e++]));return i},m=s.prototype=new e;return s.version="1.13.1",m.constructor=s,m.kill()._gc=!1,m.to=function(t,e,s,r){var n=s.repeat&&u.TweenMax||i;return e?this.add(new n(t,e,s),r):this.set(t,s,r)},m.from=function(t,e,s,r){return this.add((s.repeat&&u.TweenMax||i).from(t,e,s),r)},m.fromTo=function(t,e,s,r,n){var a=r.repeat&&u.TweenMax||i;return e?this.add(a.fromTo(t,e,s,r),n):this.set(t,r,n)},m.staggerTo=function(t,e,r,n,o,h,l,_){var u,c=new s({onComplete:h,onCompleteParams:l,onCompleteScope:_,smoothChildTiming:this.smoothChildTiming});for("string"==typeof t&&(t=i.selector(t)||t),a(t)&&(t=f(t)),n=n||0,u=0;t.length>u;u++)r.startAt&&(r.startAt=p(r.startAt)),c.to(t[u],e,p(r),u*n);return this.add(c,o)},m.staggerFrom=function(t,e,i,s,r,n,a,o){return i.immediateRender=0!=i.immediateRender,i.runBackwards=!0,this.staggerTo(t,e,i,s,r,n,a,o)},m.staggerFromTo=function(t,e,i,s,r,n,a,o,h){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,this.staggerTo(t,e,s,r,n,a,o,h)},m.call=function(t,e,s,r){return this.add(i.delayedCall(0,t,e,s),r)},m.set=function(t,e,s){return s=this._parseTimeOrLabel(s,0,!0),null==e.immediateRender&&(e.immediateRender=s===this._time&&!this._paused),this.add(new i(t,0,e),s)},s.exportRoot=function(t,e){t=t||{},null==t.smoothChildTiming&&(t.smoothChildTiming=!0);var r,n,a=new s(t),o=a._timeline;for(null==e&&(e=!0),o._remove(a,!0),a._startTime=0,a._rawPrevTime=a._time=a._totalTime=o._time,r=o._first;r;)n=r._next,e&&r instanceof i&&r.target===r.vars.onComplete||a.add(r,r._startTime-r._delay),r=n;return o.add(a,0),a},m.add=function(r,n,a,h){var l,_,u,p,c,f;if("number"!=typeof n&&(n=this._parseTimeOrLabel(n,0,!0,r)),!(r instanceof t)){if(r instanceof Array||r&&r.push&&o(r)){for(a=a||"normal",h=h||0,l=n,_=r.length,u=0;_>u;u++)o(p=r[u])&&(p=new s({tweens:p})),this.add(p,l),"string"!=typeof p&&"function"!=typeof p&&("sequence"===a?l=p._startTime+p.totalDuration()/p._timeScale:"start"===a&&(p._startTime-=p.delay())),l+=h;return this._uncache(!0)}if("string"==typeof r)return this.addLabel(r,n);if("function"!=typeof r)throw"Cannot add "+r+" into the timeline; it is not a tween, timeline, function, or string.";r=i.delayedCall(0,r)}if(e.prototype.add.call(this,r,n),(this._gc||this._time===this._duration)&&!this._paused&&this._duration<this.duration())for(c=this,f=c.rawTime()>r._startTime;c._timeline;)f&&c._timeline.smoothChildTiming?c.totalTime(c._totalTime,!0):c._gc&&c._enabled(!0,!1),c=c._timeline;return this},m.remove=function(e){if(e instanceof t)return this._remove(e,!1);if(e instanceof Array||e&&e.push&&o(e)){for(var i=e.length;--i>-1;)this.remove(e[i]);return this}return"string"==typeof e?this.removeLabel(e):this.kill(null,e)},m._remove=function(t,i){e.prototype._remove.call(this,t,i);var s=this._last;return s?this._time>s._startTime+s._totalDuration/s._timeScale&&(this._time=this.duration(),this._totalTime=this._totalDuration):this._time=this._totalTime=this._duration=this._totalDuration=0,this},m.append=function(t,e){return this.add(t,this._parseTimeOrLabel(null,e,!0,t))},m.insert=m.insertMultiple=function(t,e,i,s){return this.add(t,e||0,i,s)},m.appendMultiple=function(t,e,i,s){return this.add(t,this._parseTimeOrLabel(null,e,!0,t),i,s)},m.addLabel=function(t,e){return this._labels[t]=this._parseTimeOrLabel(e),this},m.addPause=function(t,e,i,s){return this.call(c,["{self}",e,i,s],this,t)},m.removeLabel=function(t){return delete this._labels[t],this},m.getLabelTime=function(t){return null!=this._labels[t]?this._labels[t]:-1},m._parseTimeOrLabel=function(e,i,s,r){var n;if(r instanceof t&&r.timeline===this)this.remove(r);else if(r&&(r instanceof Array||r.push&&o(r)))for(n=r.length;--n>-1;)r[n]instanceof t&&r[n].timeline===this&&this.remove(r[n]);if("string"==typeof i)return this._parseTimeOrLabel(i,s&&"number"==typeof e&&null==this._labels[i]?e-this.duration():0,s);if(i=i||0,"string"!=typeof e||!isNaN(e)&&null==this._labels[e])null==e&&(e=this.duration());else{if(n=e.indexOf("="),-1===n)return null==this._labels[e]?s?this._labels[e]=this.duration()+i:i:this._labels[e]+i;i=parseInt(e.charAt(n-1)+"1",10)*Number(e.substr(n+1)),e=n>1?this._parseTimeOrLabel(e.substr(0,n-1),0,s):this.duration()}return Number(e)+i},m.seek=function(t,e){return this.totalTime("number"==typeof t?t:this._parseTimeOrLabel(t),e!==!1)},m.stop=function(){return this.paused(!0)},m.gotoAndPlay=function(t,e){return this.play(t,e)},m.gotoAndStop=function(t,e){return this.pause(t,e)},m.render=function(t,e,i){this._gc&&this._enabled(!0,!1);var s,n,a,o,u,p=this._dirty?this.totalDuration():this._totalDuration,c=this._time,f=this._startTime,m=this._timeScale,d=this._paused;if(t>=p?(this._totalTime=this._time=p,this._reversed||this._hasPausedChild()||(n=!0,o="onComplete",0===this._duration&&(0===t||0>this._rawPrevTime||this._rawPrevTime===r)&&this._rawPrevTime!==t&&this._first&&(u=!0,this._rawPrevTime>r&&(o="onReverseComplete"))),this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:r,t=p+1e-4):1e-7>t?(this._totalTime=this._time=0,(0!==c||0===this._duration&&this._rawPrevTime!==r&&(this._rawPrevTime>0||0>t&&this._rawPrevTime>=0))&&(o="onReverseComplete",n=this._reversed),0>t?(this._active=!1,this._rawPrevTime>=0&&this._first&&(u=!0),this._rawPrevTime=t):(this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:r,t=0,this._initted||(u=!0))):this._totalTime=this._time=this._rawPrevTime=t,this._time!==c&&this._first||i||u){if(this._initted||(this._initted=!0),this._active||!this._paused&&this._time!==c&&t>0&&(this._active=!0),0===c&&this.vars.onStart&&0!==this._time&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||_)),this._time>=c)for(s=this._first;s&&(a=s._next,!this._paused||d);)(s._active||s._startTime<=this._time&&!s._paused&&!s._gc)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=a;else for(s=this._last;s&&(a=s._prev,!this._paused||d);)(s._active||c>=s._startTime&&!s._paused&&!s._gc)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=a;this._onUpdate&&(e||(h.length&&l(),this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||_))),o&&(this._gc||(f===this._startTime||m!==this._timeScale)&&(0===this._time||p>=this.totalDuration())&&(n&&(h.length&&l(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[o]&&this.vars[o].apply(this.vars[o+"Scope"]||this,this.vars[o+"Params"]||_)))}},m._hasPausedChild=function(){for(var t=this._first;t;){if(t._paused||t instanceof s&&t._hasPausedChild())return!0;t=t._next}return!1},m.getChildren=function(t,e,s,r){r=r||-9999999999;for(var n=[],a=this._first,o=0;a;)r>a._startTime||(a instanceof i?e!==!1&&(n[o++]=a):(s!==!1&&(n[o++]=a),t!==!1&&(n=n.concat(a.getChildren(!0,e,s)),o=n.length))),a=a._next;return n},m.getTweensOf=function(t,e){var s,r,n=this._gc,a=[],o=0;for(n&&this._enabled(!0,!0),s=i.getTweensOf(t),r=s.length;--r>-1;)(s[r].timeline===this||e&&this._contains(s[r]))&&(a[o++]=s[r]);return n&&this._enabled(!1,!0),a},m._contains=function(t){for(var e=t.timeline;e;){if(e===this)return!0;e=e.timeline}return!1},m.shiftChildren=function(t,e,i){i=i||0;for(var s,r=this._first,n=this._labels;r;)r._startTime>=i&&(r._startTime+=t),r=r._next;if(e)for(s in n)n[s]>=i&&(n[s]+=t);return this._uncache(!0)},m._kill=function(t,e){if(!t&&!e)return this._enabled(!1,!1);for(var i=e?this.getTweensOf(e):this.getChildren(!0,!0,!1),s=i.length,r=!1;--s>-1;)i[s]._kill(t,e)&&(r=!0);return r},m.clear=function(t){var e=this.getChildren(!1,!0,!0),i=e.length;for(this._time=this._totalTime=0;--i>-1;)e[i]._enabled(!1,!1);return t!==!1&&(this._labels={}),this._uncache(!0)},m.invalidate=function(){for(var t=this._first;t;)t.invalidate(),t=t._next;return this},m._enabled=function(t,i){if(t===this._gc)for(var s=this._first;s;)s._enabled(t,!0),s=s._next;return e.prototype._enabled.call(this,t,i)},m.duration=function(t){return arguments.length?(0!==this.duration()&&0!==t&&this.timeScale(this._duration/t),this):(this._dirty&&this.totalDuration(),this._duration)},m.totalDuration=function(t){if(!arguments.length){if(this._dirty){for(var e,i,s=0,r=this._last,n=999999999999;r;)e=r._prev,r._dirty&&r.totalDuration(),r._startTime>n&&this._sortChildren&&!r._paused?this.add(r,r._startTime-r._delay):n=r._startTime,0>r._startTime&&!r._paused&&(s-=r._startTime,this._timeline.smoothChildTiming&&(this._startTime+=r._startTime/this._timeScale),this.shiftChildren(-r._startTime,!1,-9999999999),n=0),i=r._startTime+r._totalDuration/r._timeScale,i>s&&(s=i),r=e;this._duration=this._totalDuration=s,this._dirty=!1}return this._totalDuration}return 0!==this.totalDuration()&&0!==t&&this.timeScale(this._totalDuration/t),this},m.usesFrames=function(){for(var e=this._timeline;e._timeline;)e=e._timeline;return e===t._rootFramesTimeline},m.rawTime=function(){return this._paused?this._totalTime:(this._timeline.rawTime()-this._startTime)*this._timeScale},s},!0),_gsScope._gsDefine("TimelineMax",["TimelineLite","TweenLite","easing.Ease"],function(t,e,i){var s=function(e){t.call(this,e),this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._cycle=0,this._yoyo=this.vars.yoyo===!0,this._dirty=!0},r=1e-10,n=[],a=e._internals,o=a.lazyTweens,h=a.lazyRender,l=new i(null,null,1,0),_=s.prototype=new t;return _.constructor=s,_.kill()._gc=!1,s.version="1.13.1",_.invalidate=function(){return this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),t.prototype.invalidate.call(this)},_.addCallback=function(t,i,s,r){return this.add(e.delayedCall(0,t,s,r),i)},_.removeCallback=function(t,e){if(t)if(null==e)this._kill(null,t);else for(var i=this.getTweensOf(t,!1),s=i.length,r=this._parseTimeOrLabel(e);--s>-1;)i[s]._startTime===r&&i[s]._enabled(!1,!1);return this},_.tweenTo=function(t,i){i=i||{};var s,r,a,o={ease:l,overwrite:i.delay?2:1,useFrames:this.usesFrames(),immediateRender:!1};for(r in i)o[r]=i[r];return o.time=this._parseTimeOrLabel(t),s=Math.abs(Number(o.time)-this._time)/this._timeScale||.001,a=new e(this,s,o),o.onStart=function(){a.target.paused(!0),a.vars.time!==a.target.time()&&s===a.duration()&&a.duration(Math.abs(a.vars.time-a.target.time())/a.target._timeScale),i.onStart&&i.onStart.apply(i.onStartScope||a,i.onStartParams||n)},a},_.tweenFromTo=function(t,e,i){i=i||{},t=this._parseTimeOrLabel(t),i.startAt={onComplete:this.seek,onCompleteParams:[t],onCompleteScope:this},i.immediateRender=i.immediateRender!==!1;var s=this.tweenTo(e,i);return s.duration(Math.abs(s.vars.time-t)/this._timeScale||.001)},_.render=function(t,e,i){this._gc&&this._enabled(!0,!1);var s,a,l,_,u,p,c=this._dirty?this.totalDuration():this._totalDuration,f=this._duration,m=this._time,d=this._totalTime,g=this._startTime,v=this._timeScale,y=this._rawPrevTime,T=this._paused,w=this._cycle;if(t>=c?(this._locked||(this._totalTime=c,this._cycle=this._repeat),this._reversed||this._hasPausedChild()||(a=!0,_="onComplete",0===this._duration&&(0===t||0>y||y===r)&&y!==t&&this._first&&(u=!0,y>r&&(_="onReverseComplete"))),this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:r,this._yoyo&&0!==(1&this._cycle)?this._time=t=0:(this._time=f,t=f+1e-4)):1e-7>t?(this._locked||(this._totalTime=this._cycle=0),this._time=0,(0!==m||0===f&&y!==r&&(y>0||0>t&&y>=0)&&!this._locked)&&(_="onReverseComplete",a=this._reversed),0>t?(this._active=!1,y>=0&&this._first&&(u=!0),this._rawPrevTime=t):(this._rawPrevTime=f||!e||t||this._rawPrevTime===t?t:r,t=0,this._initted||(u=!0))):(0===f&&0>y&&(u=!0),this._time=this._rawPrevTime=t,this._locked||(this._totalTime=t,0!==this._repeat&&(p=f+this._repeatDelay,this._cycle=this._totalTime/p>>0,0!==this._cycle&&this._cycle===this._totalTime/p&&this._cycle--,this._time=this._totalTime-this._cycle*p,this._yoyo&&0!==(1&this._cycle)&&(this._time=f-this._time),this._time>f?(this._time=f,t=f+1e-4):0>this._time?this._time=t=0:t=this._time))),this._cycle!==w&&!this._locked){var x=this._yoyo&&0!==(1&w),b=x===(this._yoyo&&0!==(1&this._cycle)),P=this._totalTime,S=this._cycle,k=this._rawPrevTime,R=this._time;if(this._totalTime=w*f,w>this._cycle?x=!x:this._totalTime+=f,this._time=m,this._rawPrevTime=0===f?y-1e-4:y,this._cycle=w,this._locked=!0,m=x?0:f,this.render(m,e,0===f),e||this._gc||this.vars.onRepeat&&this.vars.onRepeat.apply(this.vars.onRepeatScope||this,this.vars.onRepeatParams||n),b&&(m=x?f+1e-4:-1e-4,this.render(m,!0,!1)),this._locked=!1,this._paused&&!T)return;this._time=R,this._totalTime=P,this._cycle=S,this._rawPrevTime=k}if(!(this._time!==m&&this._first||i||u))return d!==this._totalTime&&this._onUpdate&&(e||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||n)),void 0;if(this._initted||(this._initted=!0),this._active||!this._paused&&this._totalTime!==d&&t>0&&(this._active=!0),0===d&&this.vars.onStart&&0!==this._totalTime&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||n)),this._time>=m)for(s=this._first;s&&(l=s._next,!this._paused||T);)(s._active||s._startTime<=this._time&&!s._paused&&!s._gc)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=l;else for(s=this._last;s&&(l=s._prev,!this._paused||T);)(s._active||m>=s._startTime&&!s._paused&&!s._gc)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=l;this._onUpdate&&(e||(o.length&&h(),this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||n))),_&&(this._locked||this._gc||(g===this._startTime||v!==this._timeScale)&&(0===this._time||c>=this.totalDuration())&&(a&&(o.length&&h(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[_]&&this.vars[_].apply(this.vars[_+"Scope"]||this,this.vars[_+"Params"]||n)))},_.getActive=function(t,e,i){null==t&&(t=!0),null==e&&(e=!0),null==i&&(i=!1);var s,r,n=[],a=this.getChildren(t,e,i),o=0,h=a.length;for(s=0;h>s;s++)r=a[s],r.isActive()&&(n[o++]=r);return n},_.getLabelAfter=function(t){t||0!==t&&(t=this._time);var e,i=this.getLabelsArray(),s=i.length;for(e=0;s>e;e++)if(i[e].time>t)return i[e].name;return null},_.getLabelBefore=function(t){null==t&&(t=this._time);for(var e=this.getLabelsArray(),i=e.length;--i>-1;)if(t>e[i].time)return e[i].name;return null},_.getLabelsArray=function(){var t,e=[],i=0;for(t in this._labels)e[i++]={time:this._labels[t],name:t};return e.sort(function(t,e){return t.time-e.time}),e},_.progress=function(t){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!==(1&this._cycle)?1-t:t)+this._cycle*(this._duration+this._repeatDelay),!1):this._time/this.duration()},_.totalProgress=function(t){return arguments.length?this.totalTime(this.totalDuration()*t,!1):this._totalTime/this.totalDuration()},_.totalDuration=function(e){return arguments.length?-1===this._repeat?this:this.duration((e-this._repeat*this._repeatDelay)/(this._repeat+1)):(this._dirty&&(t.prototype.totalDuration.call(this),this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat),this._totalDuration)},_.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),t>this._duration&&(t=this._duration),this._yoyo&&0!==(1&this._cycle)?t=this._duration-t+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(t+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(t,e)):this._time},_.repeat=function(t){return arguments.length?(this._repeat=t,this._uncache(!0)):this._repeat},_.repeatDelay=function(t){return arguments.length?(this._repeatDelay=t,this._uncache(!0)):this._repeatDelay},_.yoyo=function(t){return arguments.length?(this._yoyo=t,this):this._yoyo},_.currentLabel=function(t){return arguments.length?this.seek(t,!0):this.getLabelBefore(this._time+1e-8)},s},!0),function(){var t=180/Math.PI,e=[],i=[],s=[],r={},n=function(t,e,i,s){this.a=t,this.b=e,this.c=i,this.d=s,this.da=s-t,this.ca=i-t,this.ba=e-t},a=",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",o=function(t,e,i,s){var r={a:t},n={},a={},o={c:s},h=(t+e)/2,l=(e+i)/2,_=(i+s)/2,u=(h+l)/2,p=(l+_)/2,c=(p-u)/8;return r.b=h+(t-h)/4,n.b=u+c,r.c=n.a=(r.b+n.b)/2,n.c=a.a=(u+p)/2,a.b=p-c,o.b=_+(s-_)/4,a.c=o.a=(a.b+o.b)/2,[r,n,a,o]},h=function(t,r,n,a,h){var l,_,u,p,c,f,m,d,g,v,y,T,w,x=t.length-1,b=0,P=t[0].a;for(l=0;x>l;l++)c=t[b],_=c.a,u=c.d,p=t[b+1].d,h?(y=e[l],T=i[l],w=.25*(T+y)*r/(a?.5:s[l]||.5),f=u-(u-_)*(a?.5*r:0!==y?w/y:0),m=u+(p-u)*(a?.5*r:0!==T?w/T:0),d=u-(f+((m-f)*(3*y/(y+T)+.5)/4||0))):(f=u-.5*(u-_)*r,m=u+.5*(p-u)*r,d=u-(f+m)/2),f+=d,m+=d,c.c=g=f,c.b=0!==l?P:P=c.a+.6*(c.c-c.a),c.da=u-_,c.ca=g-_,c.ba=P-_,n?(v=o(_,P,g,u),t.splice(b,1,v[0],v[1],v[2],v[3]),b+=4):b++,P=m;c=t[b],c.b=P,c.c=P+.4*(c.d-P),c.da=c.d-c.a,c.ca=c.c-c.a,c.ba=P-c.a,n&&(v=o(c.a,P,c.c,c.d),t.splice(b,1,v[0],v[1],v[2],v[3]))},l=function(t,s,r,a){var o,h,l,_,u,p,c=[];if(a)for(t=[a].concat(t),h=t.length;--h>-1;)"string"==typeof(p=t[h][s])&&"="===p.charAt(1)&&(t[h][s]=a[s]+Number(p.charAt(0)+p.substr(2)));if(o=t.length-2,0>o)return c[0]=new n(t[0][s],0,0,t[-1>o?0:1][s]),c;for(h=0;o>h;h++)l=t[h][s],_=t[h+1][s],c[h]=new n(l,0,0,_),r&&(u=t[h+2][s],e[h]=(e[h]||0)+(_-l)*(_-l),i[h]=(i[h]||0)+(u-_)*(u-_));return c[h]=new n(t[h][s],0,0,t[h+1][s]),c},_=function(t,n,o,_,u,p){var c,f,m,d,g,v,y,T,w={},x=[],b=p||t[0];u="string"==typeof u?","+u+",":a,null==n&&(n=1);for(f in t[0])x.push(f);if(t.length>1){for(T=t[t.length-1],y=!0,c=x.length;--c>-1;)if(f=x[c],Math.abs(b[f]-T[f])>.05){y=!1;break}y&&(t=t.concat(),p&&t.unshift(p),t.push(t[1]),p=t[t.length-3])}for(e.length=i.length=s.length=0,c=x.length;--c>-1;)f=x[c],r[f]=-1!==u.indexOf(","+f+","),w[f]=l(t,f,r[f],p);for(c=e.length;--c>-1;)e[c]=Math.sqrt(e[c]),i[c]=Math.sqrt(i[c]);if(!_){for(c=x.length;--c>-1;)if(r[f])for(m=w[x[c]],v=m.length-1,d=0;v>d;d++)g=m[d+1].da/i[d]+m[d].da/e[d],s[d]=(s[d]||0)+g*g;for(c=s.length;--c>-1;)s[c]=Math.sqrt(s[c])}for(c=x.length,d=o?4:1;--c>-1;)f=x[c],m=w[f],h(m,n,o,_,r[f]),y&&(m.splice(0,d),m.splice(m.length-d,d));return w},u=function(t,e,i){e=e||"soft";var s,r,a,o,h,l,_,u,p,c,f,m={},d="cubic"===e?3:2,g="soft"===e,v=[];if(g&&i&&(t=[i].concat(t)),null==t||d+1>t.length)throw"invalid Bezier data";for(p in t[0])v.push(p);for(l=v.length;--l>-1;){for(p=v[l],m[p]=h=[],c=0,u=t.length,_=0;u>_;_++)s=null==i?t[_][p]:"string"==typeof(f=t[_][p])&&"="===f.charAt(1)?i[p]+Number(f.charAt(0)+f.substr(2)):Number(f),g&&_>1&&u-1>_&&(h[c++]=(s+h[c-2])/2),h[c++]=s;for(u=c-d+1,c=0,_=0;u>_;_+=d)s=h[_],r=h[_+1],a=h[_+2],o=2===d?0:h[_+3],h[c++]=f=3===d?new n(s,r,a,o):new n(s,(2*r+s)/3,(2*r+a)/3,a);h.length=c}return m},p=function(t,e,i){for(var s,r,n,a,o,h,l,_,u,p,c,f=1/i,m=t.length;--m>-1;)for(p=t[m],n=p.a,a=p.d-n,o=p.c-n,h=p.b-n,s=r=0,_=1;i>=_;_++)l=f*_,u=1-l,s=r-(r=(l*l*a+3*u*(l*o+u*h))*l),c=m*i+_-1,e[c]=(e[c]||0)+s*s},c=function(t,e){e=e>>0||6;var i,s,r,n,a=[],o=[],h=0,l=0,_=e-1,u=[],c=[];for(i in t)p(t[i],a,e);for(r=a.length,s=0;r>s;s++)h+=Math.sqrt(a[s]),n=s%e,c[n]=h,n===_&&(l+=h,n=s/e>>0,u[n]=c,o[n]=l,h=0,c=[]);return{length:l,lengths:o,segments:u}},f=_gsScope._gsDefine.plugin({propName:"bezier",priority:-1,version:"1.3.3",API:2,global:!0,init:function(t,e,i){this._target=t,e instanceof Array&&(e={values:e}),this._func={},this._round={},this._props=[],this._timeRes=null==e.timeResolution?6:parseInt(e.timeResolution,10);var s,r,n,a,o,h=e.values||[],l={},p=h[0],f=e.autoRotate||i.vars.orientToBezier;this._autoRotate=f?f instanceof Array?f:[["x","y","rotation",f===!0?0:Number(f)||0]]:null;for(s in p)this._props.push(s);for(n=this._props.length;--n>-1;)s=this._props[n],this._overwriteProps.push(s),r=this._func[s]="function"==typeof t[s],l[s]=r?t[s.indexOf("set")||"function"!=typeof t["get"+s.substr(3)]?s:"get"+s.substr(3)]():parseFloat(t[s]),o||l[s]!==h[0][s]&&(o=l);if(this._beziers="cubic"!==e.type&&"quadratic"!==e.type&&"soft"!==e.type?_(h,isNaN(e.curviness)?1:e.curviness,!1,"thruBasic"===e.type,e.correlate,o):u(h,e.type,l),this._segCount=this._beziers[s].length,this._timeRes){var m=c(this._beziers,this._timeRes);this._length=m.length,this._lengths=m.lengths,this._segments=m.segments,this._l1=this._li=this._s1=this._si=0,this._l2=this._lengths[0],this._curSeg=this._segments[0],this._s2=this._curSeg[0],this._prec=1/this._curSeg.length}if(f=this._autoRotate)for(this._initialRotations=[],f[0]instanceof Array||(this._autoRotate=f=[f]),n=f.length;--n>-1;){for(a=0;3>a;a++)s=f[n][a],this._func[s]="function"==typeof t[s]?t[s.indexOf("set")||"function"!=typeof t["get"+s.substr(3)]?s:"get"+s.substr(3)]:!1;s=f[n][2],this._initialRotations[n]=this._func[s]?this._func[s].call(this._target):this._target[s]}return this._startRatio=i.vars.runBackwards?1:0,!0},set:function(e){var i,s,r,n,a,o,h,l,_,u,p=this._segCount,c=this._func,f=this._target,m=e!==this._startRatio;if(this._timeRes){if(_=this._lengths,u=this._curSeg,e*=this._length,r=this._li,e>this._l2&&p-1>r){for(l=p-1;l>r&&e>=(this._l2=_[++r]););this._l1=_[r-1],this._li=r,this._curSeg=u=this._segments[r],this._s2=u[this._s1=this._si=0]}else if(this._l1>e&&r>0){for(;r>0&&(this._l1=_[--r])>=e;);0===r&&this._l1>e?this._l1=0:r++,this._l2=_[r],this._li=r,this._curSeg=u=this._segments[r],this._s1=u[(this._si=u.length-1)-1]||0,this._s2=u[this._si]}if(i=r,e-=this._l1,r=this._si,e>this._s2&&u.length-1>r){for(l=u.length-1;l>r&&e>=(this._s2=u[++r]););this._s1=u[r-1],this._si=r}else if(this._s1>e&&r>0){for(;r>0&&(this._s1=u[--r])>=e;);0===r&&this._s1>e?this._s1=0:r++,this._s2=u[r],this._si=r}o=(r+(e-this._s1)/(this._s2-this._s1))*this._prec}else i=0>e?0:e>=1?p-1:p*e>>0,o=(e-i*(1/p))*p;for(s=1-o,r=this._props.length;--r>-1;)n=this._props[r],a=this._beziers[n][i],h=(o*o*a.da+3*s*(o*a.ca+s*a.ba))*o+a.a,this._round[n]&&(h=Math.round(h)),c[n]?f[n](h):f[n]=h;if(this._autoRotate){var d,g,v,y,T,w,x,b=this._autoRotate;
for(r=b.length;--r>-1;)n=b[r][2],w=b[r][3]||0,x=b[r][4]===!0?1:t,a=this._beziers[b[r][0]],d=this._beziers[b[r][1]],a&&d&&(a=a[i],d=d[i],g=a.a+(a.b-a.a)*o,y=a.b+(a.c-a.b)*o,g+=(y-g)*o,y+=(a.c+(a.d-a.c)*o-y)*o,v=d.a+(d.b-d.a)*o,T=d.b+(d.c-d.b)*o,v+=(T-v)*o,T+=(d.c+(d.d-d.c)*o-T)*o,h=m?Math.atan2(T-v,y-g)*x+w:this._initialRotations[r],c[n]?f[n](h):f[n]=h)}}}),m=f.prototype;f.bezierThrough=_,f.cubicToQuadratic=o,f._autoCSS=!0,f.quadraticToCubic=function(t,e,i){return new n(t,(2*e+t)/3,(2*e+i)/3,i)},f._cssRegister=function(){var t=_gsScope._gsDefine.globals.CSSPlugin;if(t){var e=t._internals,i=e._parseToProxy,s=e._setPluginRatio,r=e.CSSPropTween;e._registerComplexSpecialProp("bezier",{parser:function(t,e,n,a,o,h){e instanceof Array&&(e={values:e}),h=new f;var l,_,u,p=e.values,c=p.length-1,m=[],d={};if(0>c)return o;for(l=0;c>=l;l++)u=i(t,p[l],a,o,h,c!==l),m[l]=u.end;for(_ in e)d[_]=e[_];return d.values=m,o=new r(t,"bezier",0,0,u.pt,2),o.data=u,o.plugin=h,o.setRatio=s,0===d.autoRotate&&(d.autoRotate=!0),!d.autoRotate||d.autoRotate instanceof Array||(l=d.autoRotate===!0?0:Number(d.autoRotate),d.autoRotate=null!=u.end.left?[["left","top","rotation",l,!1]]:null!=u.end.x?[["x","y","rotation",l,!1]]:!1),d.autoRotate&&(a._transform||a._enableTransforms(!1),u.autoRotate=a._target._gsTransform),h._onInitTween(u.proxy,d,a._tween),o}})}},m._roundProps=function(t,e){for(var i=this._overwriteProps,s=i.length;--s>-1;)(t[i[s]]||t.bezier||t.bezierThrough)&&(this._round[i[s]]=e)},m._kill=function(t){var e,i,s=this._props;for(e in this._beziers)if(e in t)for(delete this._beziers[e],delete this._func[e],i=s.length;--i>-1;)s[i]===e&&s.splice(i,1);return this._super._kill.call(this,t)}}(),_gsScope._gsDefine("plugins.CSSPlugin",["plugins.TweenPlugin","TweenLite"],function(t,e){var i,s,r,n,a=function(){t.call(this,"css"),this._overwriteProps.length=0,this.setRatio=a.prototype.setRatio},o={},h=a.prototype=new t("css");h.constructor=a,a.version="1.13.1",a.API=2,a.defaultTransformPerspective=0,a.defaultSkewType="compensated",h="px",a.suffixMap={top:h,right:h,bottom:h,left:h,width:h,height:h,fontSize:h,padding:h,margin:h,perspective:h,lineHeight:""};var l,_,u,p,c,f,m=/(?:\d|\-\d|\.\d|\-\.\d)+/g,d=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,g=/(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,v=/[^\d\-\.]/g,y=/(?:\d|\-|\+|=|#|\.)*/g,T=/opacity *= *([^)]*)/i,w=/opacity:([^;]*)/i,x=/alpha\(opacity *=.+?\)/i,b=/^(rgb|hsl)/,P=/([A-Z])/g,S=/-([a-z])/gi,k=/(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,R=function(t,e){return e.toUpperCase()},A=/(?:Left|Right|Width)/i,C=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,O=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,D=/,(?=[^\)]*(?:\(|$))/gi,M=Math.PI/180,z=180/Math.PI,I={},E=document,L=E.createElement("div"),F=E.createElement("img"),N=a._internals={_specialProps:o},X=navigator.userAgent,U=function(){var t,e=X.indexOf("Android"),i=E.createElement("div");return u=-1!==X.indexOf("Safari")&&-1===X.indexOf("Chrome")&&(-1===e||Number(X.substr(e+8,1))>3),c=u&&6>Number(X.substr(X.indexOf("Version/")+8,1)),p=-1!==X.indexOf("Firefox"),/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(X)&&(f=parseFloat(RegExp.$1)),i.innerHTML="<a style='top:1px;opacity:.55;'>a</a>",t=i.getElementsByTagName("a")[0],t?/^0.55/.test(t.style.opacity):!1}(),Y=function(t){return T.test("string"==typeof t?t:(t.currentStyle?t.currentStyle.filter:t.style.filter)||"")?parseFloat(RegExp.$1)/100:1},j=function(t){window.console&&console.log(t)},B="",q="",V=function(t,e){e=e||L;var i,s,r=e.style;if(void 0!==r[t])return t;for(t=t.charAt(0).toUpperCase()+t.substr(1),i=["O","Moz","ms","Ms","Webkit"],s=5;--s>-1&&void 0===r[i[s]+t];);return s>=0?(q=3===s?"ms":i[s],B="-"+q.toLowerCase()+"-",q+t):null},G=E.defaultView?E.defaultView.getComputedStyle:function(){},W=a.getStyle=function(t,e,i,s,r){var n;return U||"opacity"!==e?(!s&&t.style[e]?n=t.style[e]:(i=i||G(t))?n=i[e]||i.getPropertyValue(e)||i.getPropertyValue(e.replace(P,"-$1").toLowerCase()):t.currentStyle&&(n=t.currentStyle[e]),null==r||n&&"none"!==n&&"auto"!==n&&"auto auto"!==n?n:r):Y(t)},Q=N.convertToPixels=function(t,i,s,r,n){if("px"===r||!r)return s;if("auto"===r||!s)return 0;var o,h,l,_=A.test(i),u=t,p=L.style,c=0>s;if(c&&(s=-s),"%"===r&&-1!==i.indexOf("border"))o=s/100*(_?t.clientWidth:t.clientHeight);else{if(p.cssText="border:0 solid red;position:"+W(t,"position")+";line-height:0;","%"!==r&&u.appendChild)p[_?"borderLeftWidth":"borderTopWidth"]=s+r;else{if(u=t.parentNode||E.body,h=u._gsCache,l=e.ticker.frame,h&&_&&h.time===l)return h.width*s/100;p[_?"width":"height"]=s+r}u.appendChild(L),o=parseFloat(L[_?"offsetWidth":"offsetHeight"]),u.removeChild(L),_&&"%"===r&&a.cacheWidths!==!1&&(h=u._gsCache=u._gsCache||{},h.time=l,h.width=100*(o/s)),0!==o||n||(o=Q(t,i,s,r,!0))}return c?-o:o},Z=N.calculateOffset=function(t,e,i){if("absolute"!==W(t,"position",i))return 0;var s="left"===e?"Left":"Top",r=W(t,"margin"+s,i);return t["offset"+s]-(Q(t,e,parseFloat(r),r.replace(y,""))||0)},$=function(t,e){var i,s,r={};if(e=e||G(t,null))if(i=e.length)for(;--i>-1;)r[e[i].replace(S,R)]=e.getPropertyValue(e[i]);else for(i in e)r[i]=e[i];else if(e=t.currentStyle||t.style)for(i in e)"string"==typeof i&&void 0===r[i]&&(r[i.replace(S,R)]=e[i]);return U||(r.opacity=Y(t)),s=Pe(t,e,!1),r.rotation=s.rotation,r.skewX=s.skewX,r.scaleX=s.scaleX,r.scaleY=s.scaleY,r.x=s.x,r.y=s.y,xe&&(r.z=s.z,r.rotationX=s.rotationX,r.rotationY=s.rotationY,r.scaleZ=s.scaleZ),r.filters&&delete r.filters,r},H=function(t,e,i,s,r){var n,a,o,h={},l=t.style;for(a in i)"cssText"!==a&&"length"!==a&&isNaN(a)&&(e[a]!==(n=i[a])||r&&r[a])&&-1===a.indexOf("Origin")&&("number"==typeof n||"string"==typeof n)&&(h[a]="auto"!==n||"left"!==a&&"top"!==a?""!==n&&"auto"!==n&&"none"!==n||"string"!=typeof e[a]||""===e[a].replace(v,"")?n:0:Z(t,a),void 0!==l[a]&&(o=new ue(l,a,l[a],o)));if(s)for(a in s)"className"!==a&&(h[a]=s[a]);return{difs:h,firstMPT:o}},K={width:["Left","Right"],height:["Top","Bottom"]},J=["marginLeft","marginRight","marginTop","marginBottom"],te=function(t,e,i){var s=parseFloat("width"===e?t.offsetWidth:t.offsetHeight),r=K[e],n=r.length;for(i=i||G(t,null);--n>-1;)s-=parseFloat(W(t,"padding"+r[n],i,!0))||0,s-=parseFloat(W(t,"border"+r[n]+"Width",i,!0))||0;return s},ee=function(t,e){(null==t||""===t||"auto"===t||"auto auto"===t)&&(t="0 0");var i=t.split(" "),s=-1!==t.indexOf("left")?"0%":-1!==t.indexOf("right")?"100%":i[0],r=-1!==t.indexOf("top")?"0%":-1!==t.indexOf("bottom")?"100%":i[1];return null==r?r="0":"center"===r&&(r="50%"),("center"===s||isNaN(parseFloat(s))&&-1===(s+"").indexOf("="))&&(s="50%"),e&&(e.oxp=-1!==s.indexOf("%"),e.oyp=-1!==r.indexOf("%"),e.oxr="="===s.charAt(1),e.oyr="="===r.charAt(1),e.ox=parseFloat(s.replace(v,"")),e.oy=parseFloat(r.replace(v,""))),s+" "+r+(i.length>2?" "+i[2]:"")},ie=function(t,e){return"string"==typeof t&&"="===t.charAt(1)?parseInt(t.charAt(0)+"1",10)*parseFloat(t.substr(2)):parseFloat(t)-parseFloat(e)},se=function(t,e){return null==t?e:"string"==typeof t&&"="===t.charAt(1)?parseInt(t.charAt(0)+"1",10)*Number(t.substr(2))+e:parseFloat(t)},re=function(t,e,i,s){var r,n,a,o,h=1e-6;return null==t?o=e:"number"==typeof t?o=t:(r=360,n=t.split("_"),a=Number(n[0].replace(v,""))*(-1===t.indexOf("rad")?1:z)-("="===t.charAt(1)?0:e),n.length&&(s&&(s[i]=e+a),-1!==t.indexOf("short")&&(a%=r,a!==a%(r/2)&&(a=0>a?a+r:a-r)),-1!==t.indexOf("_cw")&&0>a?a=(a+9999999999*r)%r-(0|a/r)*r:-1!==t.indexOf("ccw")&&a>0&&(a=(a-9999999999*r)%r-(0|a/r)*r)),o=e+a),h>o&&o>-h&&(o=0),o},ne={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},ae=function(t,e,i){return t=0>t?t+1:t>1?t-1:t,0|255*(1>6*t?e+6*(i-e)*t:.5>t?i:2>3*t?e+6*(i-e)*(2/3-t):e)+.5},oe=function(t){var e,i,s,r,n,a;return t&&""!==t?"number"==typeof t?[t>>16,255&t>>8,255&t]:(","===t.charAt(t.length-1)&&(t=t.substr(0,t.length-1)),ne[t]?ne[t]:"#"===t.charAt(0)?(4===t.length&&(e=t.charAt(1),i=t.charAt(2),s=t.charAt(3),t="#"+e+e+i+i+s+s),t=parseInt(t.substr(1),16),[t>>16,255&t>>8,255&t]):"hsl"===t.substr(0,3)?(t=t.match(m),r=Number(t[0])%360/360,n=Number(t[1])/100,a=Number(t[2])/100,i=.5>=a?a*(n+1):a+n-a*n,e=2*a-i,t.length>3&&(t[3]=Number(t[3])),t[0]=ae(r+1/3,e,i),t[1]=ae(r,e,i),t[2]=ae(r-1/3,e,i),t):(t=t.match(m)||ne.transparent,t[0]=Number(t[0]),t[1]=Number(t[1]),t[2]=Number(t[2]),t.length>3&&(t[3]=Number(t[3])),t)):ne.black},he="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";for(h in ne)he+="|"+h+"\\b";he=RegExp(he+")","gi");var le=function(t,e,i,s){if(null==t)return function(t){return t};var r,n=e?(t.match(he)||[""])[0]:"",a=t.split(n).join("").match(g)||[],o=t.substr(0,t.indexOf(a[0])),h=")"===t.charAt(t.length-1)?")":"",l=-1!==t.indexOf(" ")?" ":",",_=a.length,u=_>0?a[0].replace(m,""):"";return _?r=e?function(t){var e,p,c,f;if("number"==typeof t)t+=u;else if(s&&D.test(t)){for(f=t.replace(D,"|").split("|"),c=0;f.length>c;c++)f[c]=r(f[c]);return f.join(",")}if(e=(t.match(he)||[n])[0],p=t.split(e).join("").match(g)||[],c=p.length,_>c--)for(;_>++c;)p[c]=i?p[0|(c-1)/2]:a[c];return o+p.join(l)+l+e+h+(-1!==t.indexOf("inset")?" inset":"")}:function(t){var e,n,p;if("number"==typeof t)t+=u;else if(s&&D.test(t)){for(n=t.replace(D,"|").split("|"),p=0;n.length>p;p++)n[p]=r(n[p]);return n.join(",")}if(e=t.match(g)||[],p=e.length,_>p--)for(;_>++p;)e[p]=i?e[0|(p-1)/2]:a[p];return o+e.join(l)+h}:function(t){return t}},_e=function(t){return t=t.split(","),function(e,i,s,r,n,a,o){var h,l=(i+"").split(" ");for(o={},h=0;4>h;h++)o[t[h]]=l[h]=l[h]||l[(h-1)/2>>0];return r.parse(e,o,n,a)}},ue=(N._setPluginRatio=function(t){this.plugin.setRatio(t);for(var e,i,s,r,n=this.data,a=n.proxy,o=n.firstMPT,h=1e-6;o;)e=a[o.v],o.r?e=Math.round(e):h>e&&e>-h&&(e=0),o.t[o.p]=e,o=o._next;if(n.autoRotate&&(n.autoRotate.rotation=a.rotation),1===t)for(o=n.firstMPT;o;){if(i=o.t,i.type){if(1===i.type){for(r=i.xs0+i.s+i.xs1,s=1;i.l>s;s++)r+=i["xn"+s]+i["xs"+(s+1)];i.e=r}}else i.e=i.s+i.xs0;o=o._next}},function(t,e,i,s,r){this.t=t,this.p=e,this.v=i,this.r=r,s&&(s._prev=this,this._next=s)}),pe=(N._parseToProxy=function(t,e,i,s,r,n){var a,o,h,l,_,u=s,p={},c={},f=i._transform,m=I;for(i._transform=null,I=e,s=_=i.parse(t,e,s,r),I=m,n&&(i._transform=f,u&&(u._prev=null,u._prev&&(u._prev._next=null)));s&&s!==u;){if(1>=s.type&&(o=s.p,c[o]=s.s+s.c,p[o]=s.s,n||(l=new ue(s,"s",o,l,s.r),s.c=0),1===s.type))for(a=s.l;--a>0;)h="xn"+a,o=s.p+"_"+h,c[o]=s.data[h],p[o]=s[h],n||(l=new ue(s,h,o,l,s.rxp[h]));s=s._next}return{proxy:p,end:c,firstMPT:l,pt:_}},N.CSSPropTween=function(t,e,s,r,a,o,h,l,_,u,p){this.t=t,this.p=e,this.s=s,this.c=r,this.n=h||e,t instanceof pe||n.push(this.n),this.r=l,this.type=o||0,_&&(this.pr=_,i=!0),this.b=void 0===u?s:u,this.e=void 0===p?s+r:p,a&&(this._next=a,a._prev=this)}),ce=a.parseComplex=function(t,e,i,s,r,n,a,o,h,_){i=i||n||"",a=new pe(t,e,0,0,a,_?2:1,null,!1,o,i,s),s+="";var u,p,c,f,g,v,y,T,w,x,P,S,k=i.split(", ").join(",").split(" "),R=s.split(", ").join(",").split(" "),A=k.length,C=l!==!1;for((-1!==s.indexOf(",")||-1!==i.indexOf(","))&&(k=k.join(" ").replace(D,", ").split(" "),R=R.join(" ").replace(D,", ").split(" "),A=k.length),A!==R.length&&(k=(n||"").split(" "),A=k.length),a.plugin=h,a.setRatio=_,u=0;A>u;u++)if(f=k[u],g=R[u],T=parseFloat(f),T||0===T)a.appendXtra("",T,ie(g,T),g.replace(d,""),C&&-1!==g.indexOf("px"),!0);else if(r&&("#"===f.charAt(0)||ne[f]||b.test(f)))S=","===g.charAt(g.length-1)?"),":")",f=oe(f),g=oe(g),w=f.length+g.length>6,w&&!U&&0===g[3]?(a["xs"+a.l]+=a.l?" transparent":"transparent",a.e=a.e.split(R[u]).join("transparent")):(U||(w=!1),a.appendXtra(w?"rgba(":"rgb(",f[0],g[0]-f[0],",",!0,!0).appendXtra("",f[1],g[1]-f[1],",",!0).appendXtra("",f[2],g[2]-f[2],w?",":S,!0),w&&(f=4>f.length?1:f[3],a.appendXtra("",f,(4>g.length?1:g[3])-f,S,!1)));else if(v=f.match(m)){if(y=g.match(d),!y||y.length!==v.length)return a;for(c=0,p=0;v.length>p;p++)P=v[p],x=f.indexOf(P,c),a.appendXtra(f.substr(c,x-c),Number(P),ie(y[p],P),"",C&&"px"===f.substr(x+P.length,2),0===p),c=x+P.length;a["xs"+a.l]+=f.substr(c)}else a["xs"+a.l]+=a.l?" "+f:f;if(-1!==s.indexOf("=")&&a.data){for(S=a.xs0+a.data.s,u=1;a.l>u;u++)S+=a["xs"+u]+a.data["xn"+u];a.e=S+a["xs"+u]}return a.l||(a.type=-1,a.xs0=a.e),a.xfirst||a},fe=9;for(h=pe.prototype,h.l=h.pr=0;--fe>0;)h["xn"+fe]=0,h["xs"+fe]="";h.xs0="",h._next=h._prev=h.xfirst=h.data=h.plugin=h.setRatio=h.rxp=null,h.appendXtra=function(t,e,i,s,r,n){var a=this,o=a.l;return a["xs"+o]+=n&&o?" "+t:t||"",i||0===o||a.plugin?(a.l++,a.type=a.setRatio?2:1,a["xs"+a.l]=s||"",o>0?(a.data["xn"+o]=e+i,a.rxp["xn"+o]=r,a["xn"+o]=e,a.plugin||(a.xfirst=new pe(a,"xn"+o,e,i,a.xfirst||a,0,a.n,r,a.pr),a.xfirst.xs0=0),a):(a.data={s:e+i},a.rxp={},a.s=e,a.c=i,a.r=r,a)):(a["xs"+o]+=e+(s||""),a)};var me=function(t,e){e=e||{},this.p=e.prefix?V(t)||t:t,o[t]=o[this.p]=this,this.format=e.formatter||le(e.defaultValue,e.color,e.collapsible,e.multi),e.parser&&(this.parse=e.parser),this.clrs=e.color,this.multi=e.multi,this.keyword=e.keyword,this.dflt=e.defaultValue,this.pr=e.priority||0},de=N._registerComplexSpecialProp=function(t,e,i){"object"!=typeof e&&(e={parser:i});var s,r,n=t.split(","),a=e.defaultValue;for(i=i||[a],s=0;n.length>s;s++)e.prefix=0===s&&e.prefix,e.defaultValue=i[s]||a,r=new me(n[s],e)},ge=function(t){if(!o[t]){var e=t.charAt(0).toUpperCase()+t.substr(1)+"Plugin";de(t,{parser:function(t,i,s,r,n,a,h){var l=(_gsScope.GreenSockGlobals||_gsScope).com.greensock.plugins[e];return l?(l._cssRegister(),o[s].parse(t,i,s,r,n,a,h)):(j("Error: "+e+" js file not loaded."),n)}})}};h=me.prototype,h.parseComplex=function(t,e,i,s,r,n){var a,o,h,l,_,u,p=this.keyword;if(this.multi&&(D.test(i)||D.test(e)?(o=e.replace(D,"|").split("|"),h=i.replace(D,"|").split("|")):p&&(o=[e],h=[i])),h){for(l=h.length>o.length?h.length:o.length,a=0;l>a;a++)e=o[a]=o[a]||this.dflt,i=h[a]=h[a]||this.dflt,p&&(_=e.indexOf(p),u=i.indexOf(p),_!==u&&(i=-1===u?h:o,i[a]+=" "+p));e=o.join(", "),i=h.join(", ")}return ce(t,this.p,e,i,this.clrs,this.dflt,s,this.pr,r,n)},h.parse=function(t,e,i,s,n,a){return this.parseComplex(t.style,this.format(W(t,this.p,r,!1,this.dflt)),this.format(e),n,a)},a.registerSpecialProp=function(t,e,i){de(t,{parser:function(t,s,r,n,a,o){var h=new pe(t,r,0,0,a,2,r,!1,i);return h.plugin=o,h.setRatio=e(t,s,n._tween,r),h},priority:i})};var ve="scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),ye=V("transform"),Te=B+"transform",we=V("transformOrigin"),xe=null!==V("perspective"),be=N.Transform=function(){this.skewY=0},Pe=N.getTransform=function(t,e,i,s){if(t._gsTransform&&i&&!s)return t._gsTransform;var r,n,o,h,l,_,u,p,c,f,m,d,g,v=i?t._gsTransform||new be:new be,y=0>v.scaleX,T=2e-5,w=1e5,x=179.99,b=x*M,P=xe?parseFloat(W(t,we,e,!1,"0 0 0").split(" ")[2])||v.zOrigin||0:0;if(ye?r=W(t,Te,e,!0):t.currentStyle&&(r=t.currentStyle.filter.match(C),r=r&&4===r.length?[r[0].substr(4),Number(r[2].substr(4)),Number(r[1].substr(4)),r[3].substr(4),v.x||0,v.y||0].join(","):""),r&&"none"!==r&&"matrix(1, 0, 0, 1, 0, 0)"!==r){for(n=(r||"").match(/(?:\-|\b)[\d\-\.e]+\b/gi)||[],o=n.length;--o>-1;)h=Number(n[o]),n[o]=(l=h-(h|=0))?(0|l*w+(0>l?-.5:.5))/w+h:h;if(16===n.length){var S=n[8],k=n[9],R=n[10],A=n[12],O=n[13],D=n[14];if(v.zOrigin&&(D=-v.zOrigin,A=S*D-n[12],O=k*D-n[13],D=R*D+v.zOrigin-n[14]),!i||s||null==v.rotationX){var I,E,L,F,N,X,U,Y=n[0],j=n[1],B=n[2],q=n[3],V=n[4],G=n[5],Q=n[6],Z=n[7],$=n[11],H=Math.atan2(Q,R),K=-b>H||H>b;v.rotationX=H*z,H&&(F=Math.cos(-H),N=Math.sin(-H),I=V*F+S*N,E=G*F+k*N,L=Q*F+R*N,S=V*-N+S*F,k=G*-N+k*F,R=Q*-N+R*F,$=Z*-N+$*F,V=I,G=E,Q=L),H=Math.atan2(S,Y),v.rotationY=H*z,H&&(X=-b>H||H>b,F=Math.cos(-H),N=Math.sin(-H),I=Y*F-S*N,E=j*F-k*N,L=B*F-R*N,k=j*N+k*F,R=B*N+R*F,$=q*N+$*F,Y=I,j=E,B=L),H=Math.atan2(j,G),v.rotation=H*z,H&&(U=-b>H||H>b,F=Math.cos(-H),N=Math.sin(-H),Y=Y*F+V*N,E=j*F+G*N,G=j*-N+G*F,Q=B*-N+Q*F,j=E),U&&K?v.rotation=v.rotationX=0:U&&X?v.rotation=v.rotationY=0:X&&K&&(v.rotationY=v.rotationX=0),v.scaleX=(0|Math.sqrt(Y*Y+j*j)*w+.5)/w,v.scaleY=(0|Math.sqrt(G*G+k*k)*w+.5)/w,v.scaleZ=(0|Math.sqrt(Q*Q+R*R)*w+.5)/w,v.skewX=0,v.perspective=$?1/(0>$?-$:$):0,v.x=A,v.y=O,v.z=D}}else if(!(xe&&!s&&n.length&&v.x===n[4]&&v.y===n[5]&&(v.rotationX||v.rotationY)||void 0!==v.x&&"none"===W(t,"display",e))){var J=n.length>=6,te=J?n[0]:1,ee=n[1]||0,ie=n[2]||0,se=J?n[3]:1;v.x=n[4]||0,v.y=n[5]||0,_=Math.sqrt(te*te+ee*ee),u=Math.sqrt(se*se+ie*ie),p=te||ee?Math.atan2(ee,te)*z:v.rotation||0,c=ie||se?Math.atan2(ie,se)*z+p:v.skewX||0,f=_-Math.abs(v.scaleX||0),m=u-Math.abs(v.scaleY||0),Math.abs(c)>90&&270>Math.abs(c)&&(y?(_*=-1,c+=0>=p?180:-180,p+=0>=p?180:-180):(u*=-1,c+=0>=c?180:-180)),d=(p-v.rotation)%180,g=(c-v.skewX)%180,(void 0===v.skewX||f>T||-T>f||m>T||-T>m||d>-x&&x>d&&false|d*w||g>-x&&x>g&&false|g*w)&&(v.scaleX=_,v.scaleY=u,v.rotation=p,v.skewX=c),xe&&(v.rotationX=v.rotationY=v.z=0,v.perspective=parseFloat(a.defaultTransformPerspective)||0,v.scaleZ=1)}v.zOrigin=P;for(o in v)T>v[o]&&v[o]>-T&&(v[o]=0)}else v={x:0,y:0,z:0,scaleX:1,scaleY:1,scaleZ:1,skewX:0,perspective:0,rotation:0,rotationX:0,rotationY:0,zOrigin:0};return i&&(t._gsTransform=v),v.xPercent=v.yPercent=0,v},Se=function(t){var e,i,s=this.data,r=-s.rotation*M,n=r+s.skewX*M,a=1e5,o=(0|Math.cos(r)*s.scaleX*a)/a,h=(0|Math.sin(r)*s.scaleX*a)/a,l=(0|Math.sin(n)*-s.scaleY*a)/a,_=(0|Math.cos(n)*s.scaleY*a)/a,u=this.t.style,p=this.t.currentStyle;if(p){i=h,h=-l,l=-i,e=p.filter,u.filter="";var c,m,d=this.t.offsetWidth,g=this.t.offsetHeight,v="absolute"!==p.position,w="progid:DXImageTransform.Microsoft.Matrix(M11="+o+", M12="+h+", M21="+l+", M22="+_,x=s.x+d*s.xPercent/100,b=s.y+g*s.yPercent/100;if(null!=s.ox&&(c=(s.oxp?.01*d*s.ox:s.ox)-d/2,m=(s.oyp?.01*g*s.oy:s.oy)-g/2,x+=c-(c*o+m*h),b+=m-(c*l+m*_)),v?(c=d/2,m=g/2,w+=", Dx="+(c-(c*o+m*h)+x)+", Dy="+(m-(c*l+m*_)+b)+")"):w+=", sizingMethod='auto expand')",u.filter=-1!==e.indexOf("DXImageTransform.Microsoft.Matrix(")?e.replace(O,w):w+" "+e,(0===t||1===t)&&1===o&&0===h&&0===l&&1===_&&(v&&-1===w.indexOf("Dx=0, Dy=0")||T.test(e)&&100!==parseFloat(RegExp.$1)||-1===e.indexOf("gradient("&&e.indexOf("Alpha"))&&u.removeAttribute("filter")),!v){var P,S,k,R=8>f?1:-1;for(c=s.ieOffsetX||0,m=s.ieOffsetY||0,s.ieOffsetX=Math.round((d-((0>o?-o:o)*d+(0>h?-h:h)*g))/2+x),s.ieOffsetY=Math.round((g-((0>_?-_:_)*g+(0>l?-l:l)*d))/2+b),fe=0;4>fe;fe++)S=J[fe],P=p[S],i=-1!==P.indexOf("px")?parseFloat(P):Q(this.t,S,parseFloat(P),P.replace(y,""))||0,k=i!==s[S]?2>fe?-s.ieOffsetX:-s.ieOffsetY:2>fe?c-s.ieOffsetX:m-s.ieOffsetY,u[S]=(s[S]=Math.round(i-k*(0===fe||2===fe?1:R)))+"px"}}},ke=N.set3DTransformRatio=function(t){var e,i,s,r,n,a,o,h,l,_,u,c,f,m,d,g,v,y,T,w,x,b,P,S=this.data,k=this.t.style,R=S.rotation*M,A=S.scaleX,C=S.scaleY,O=S.scaleZ,D=S.x,z=S.y,I=S.z,E=S.perspective;if(!(1!==t&&0!==t||"auto"!==S.force3D||S.rotationY||S.rotationX||1!==O||E||I))return Re.call(this,t),void 0;if(p){var L=1e-4;L>A&&A>-L&&(A=O=2e-5),L>C&&C>-L&&(C=O=2e-5),!E||S.z||S.rotationX||S.rotationY||(E=0)}if(R||S.skewX)y=Math.cos(R),T=Math.sin(R),e=y,n=T,S.skewX&&(R-=S.skewX*M,y=Math.cos(R),T=Math.sin(R),"simple"===S.skewType&&(w=Math.tan(S.skewX*M),w=Math.sqrt(1+w*w),y*=w,T*=w)),i=-T,a=y;else{if(!(S.rotationY||S.rotationX||1!==O||E))return k[ye]=(S.xPercent||S.yPercent?"translate("+S.xPercent+"%,"+S.yPercent+"%) translate3d(":"translate3d(")+D+"px,"+z+"px,"+I+"px)"+(1!==A||1!==C?" scale("+A+","+C+")":""),void 0;e=a=1,i=n=0}u=1,s=r=o=h=l=_=c=f=m=0,d=E?-1/E:0,g=S.zOrigin,v=1e5,R=S.rotationY*M,R&&(y=Math.cos(R),T=Math.sin(R),l=u*-T,f=d*-T,s=e*T,o=n*T,u*=y,d*=y,e*=y,n*=y),R=S.rotationX*M,R&&(y=Math.cos(R),T=Math.sin(R),w=i*y+s*T,x=a*y+o*T,b=_*y+u*T,P=m*y+d*T,s=i*-T+s*y,o=a*-T+o*y,u=_*-T+u*y,d=m*-T+d*y,i=w,a=x,_=b,m=P),1!==O&&(s*=O,o*=O,u*=O,d*=O),1!==C&&(i*=C,a*=C,_*=C,m*=C),1!==A&&(e*=A,n*=A,l*=A,f*=A),g&&(c-=g,r=s*c,h=o*c,c=u*c+g),r=(w=(r+=D)-(r|=0))?(0|w*v+(0>w?-.5:.5))/v+r:r,h=(w=(h+=z)-(h|=0))?(0|w*v+(0>w?-.5:.5))/v+h:h,c=(w=(c+=I)-(c|=0))?(0|w*v+(0>w?-.5:.5))/v+c:c,k[ye]=(S.xPercent||S.yPercent?"translate("+S.xPercent+"%,"+S.yPercent+"%) matrix3d(":"matrix3d(")+[(0|e*v)/v,(0|n*v)/v,(0|l*v)/v,(0|f*v)/v,(0|i*v)/v,(0|a*v)/v,(0|_*v)/v,(0|m*v)/v,(0|s*v)/v,(0|o*v)/v,(0|u*v)/v,(0|d*v)/v,r,h,c,E?1+-c/E:1].join(",")+")"},Re=N.set2DTransformRatio=function(t){var e,i,s,r,n,a=this.data,o=this.t,h=o.style,l=a.x,_=a.y;return a.rotationX||a.rotationY||a.z||a.force3D===!0||"auto"===a.force3D&&1!==t&&0!==t?(this.setRatio=ke,ke.call(this,t),void 0):(a.rotation||a.skewX?(e=a.rotation*M,i=e-a.skewX*M,s=1e5,r=a.scaleX*s,n=a.scaleY*s,h[ye]=(a.xPercent||a.yPercent?"translate("+a.xPercent+"%,"+a.yPercent+"%) matrix(":"matrix(")+(0|Math.cos(e)*r)/s+","+(0|Math.sin(e)*r)/s+","+(0|Math.sin(i)*-n)/s+","+(0|Math.cos(i)*n)/s+","+l+","+_+")"):h[ye]=(a.xPercent||a.yPercent?"translate("+a.xPercent+"%,"+a.yPercent+"%) matrix(":"matrix(")+a.scaleX+",0,0,"+a.scaleY+","+l+","+_+")",void 0)};de("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent",{parser:function(t,e,i,s,n,o,h){if(s._transform)return n;var l,_,u,p,c,f,m,d=s._transform=Pe(t,r,!0,h.parseTransform),g=t.style,v=1e-6,y=ve.length,T=h,w={};if("string"==typeof T.transform&&ye)u=L.style,u[ye]=T.transform,u.display="block",u.position="absolute",E.body.appendChild(L),l=Pe(L,null,!1),E.body.removeChild(L);else if("object"==typeof T){if(l={scaleX:se(null!=T.scaleX?T.scaleX:T.scale,d.scaleX),scaleY:se(null!=T.scaleY?T.scaleY:T.scale,d.scaleY),scaleZ:se(T.scaleZ,d.scaleZ),x:se(T.x,d.x),y:se(T.y,d.y),z:se(T.z,d.z),xPercent:se(T.xPercent,d.xPercent),yPercent:se(T.yPercent,d.yPercent),perspective:se(T.transformPerspective,d.perspective)},m=T.directionalRotation,null!=m)if("object"==typeof m)for(u in m)T[u]=m[u];else T.rotation=m;"string"==typeof T.x&&-1!==T.x.indexOf("%")&&(l.x=0,l.xPercent=se(T.x,d.xPercent)),"string"==typeof T.y&&-1!==T.y.indexOf("%")&&(l.y=0,l.yPercent=se(T.y,d.yPercent)),l.rotation=re("rotation"in T?T.rotation:"shortRotation"in T?T.shortRotation+"_short":"rotationZ"in T?T.rotationZ:d.rotation,d.rotation,"rotation",w),xe&&(l.rotationX=re("rotationX"in T?T.rotationX:"shortRotationX"in T?T.shortRotationX+"_short":d.rotationX||0,d.rotationX,"rotationX",w),l.rotationY=re("rotationY"in T?T.rotationY:"shortRotationY"in T?T.shortRotationY+"_short":d.rotationY||0,d.rotationY,"rotationY",w)),l.skewX=null==T.skewX?d.skewX:re(T.skewX,d.skewX),l.skewY=null==T.skewY?d.skewY:re(T.skewY,d.skewY),(_=l.skewY-d.skewY)&&(l.skewX+=_,l.rotation+=_)}for(xe&&null!=T.force3D&&(d.force3D=T.force3D,f=!0),d.skewType=T.skewType||d.skewType||a.defaultSkewType,c=d.force3D||d.z||d.rotationX||d.rotationY||l.z||l.rotationX||l.rotationY||l.perspective,c||null==T.scale||(l.scaleZ=1);--y>-1;)i=ve[y],p=l[i]-d[i],(p>v||-v>p||null!=I[i])&&(f=!0,n=new pe(d,i,d[i],p,n),i in w&&(n.e=w[i]),n.xs0=0,n.plugin=o,s._overwriteProps.push(n.n));return p=T.transformOrigin,(p||xe&&c&&d.zOrigin)&&(ye?(f=!0,i=we,p=(p||W(t,i,r,!1,"50% 50%"))+"",n=new pe(g,i,0,0,n,-1,"transformOrigin"),n.b=g[i],n.plugin=o,xe?(u=d.zOrigin,p=p.split(" "),d.zOrigin=(p.length>2&&(0===u||"0px"!==p[2])?parseFloat(p[2]):u)||0,n.xs0=n.e=p[0]+" "+(p[1]||"50%")+" 0px",n=new pe(d,"zOrigin",0,0,n,-1,n.n),n.b=u,n.xs0=n.e=d.zOrigin):n.xs0=n.e=p):ee(p+"",d)),f&&(s._transformType=c||3===this._transformType?3:2),n},prefix:!0}),de("boxShadow",{defaultValue:"0px 0px 0px 0px #999",prefix:!0,color:!0,multi:!0,keyword:"inset"}),de("borderRadius",{defaultValue:"0px",parser:function(t,e,i,n,a){e=this.format(e);var o,h,l,_,u,p,c,f,m,d,g,v,y,T,w,x,b=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],P=t.style;for(m=parseFloat(t.offsetWidth),d=parseFloat(t.offsetHeight),o=e.split(" "),h=0;b.length>h;h++)this.p.indexOf("border")&&(b[h]=V(b[h])),u=_=W(t,b[h],r,!1,"0px"),-1!==u.indexOf(" ")&&(_=u.split(" "),u=_[0],_=_[1]),p=l=o[h],c=parseFloat(u),v=u.substr((c+"").length),y="="===p.charAt(1),y?(f=parseInt(p.charAt(0)+"1",10),p=p.substr(2),f*=parseFloat(p),g=p.substr((f+"").length-(0>f?1:0))||""):(f=parseFloat(p),g=p.substr((f+"").length)),""===g&&(g=s[i]||v),g!==v&&(T=Q(t,"borderLeft",c,v),w=Q(t,"borderTop",c,v),"%"===g?(u=100*(T/m)+"%",_=100*(w/d)+"%"):"em"===g?(x=Q(t,"borderLeft",1,"em"),u=T/x+"em",_=w/x+"em"):(u=T+"px",_=w+"px"),y&&(p=parseFloat(u)+f+g,l=parseFloat(_)+f+g)),a=ce(P,b[h],u+" "+_,p+" "+l,!1,"0px",a);return a},prefix:!0,formatter:le("0px 0px 0px 0px",!1,!0)}),de("backgroundPosition",{defaultValue:"0 0",parser:function(t,e,i,s,n,a){var o,h,l,_,u,p,c="background-position",m=r||G(t,null),d=this.format((m?f?m.getPropertyValue(c+"-x")+" "+m.getPropertyValue(c+"-y"):m.getPropertyValue(c):t.currentStyle.backgroundPositionX+" "+t.currentStyle.backgroundPositionY)||"0 0"),g=this.format(e);if(-1!==d.indexOf("%")!=(-1!==g.indexOf("%"))&&(p=W(t,"backgroundImage").replace(k,""),p&&"none"!==p)){for(o=d.split(" "),h=g.split(" "),F.setAttribute("src",p),l=2;--l>-1;)d=o[l],_=-1!==d.indexOf("%"),_!==(-1!==h[l].indexOf("%"))&&(u=0===l?t.offsetWidth-F.width:t.offsetHeight-F.height,o[l]=_?parseFloat(d)/100*u+"px":100*(parseFloat(d)/u)+"%");d=o.join(" ")}return this.parseComplex(t.style,d,g,n,a)},formatter:ee}),de("backgroundSize",{defaultValue:"0 0",formatter:ee}),de("perspective",{defaultValue:"0px",prefix:!0}),de("perspectiveOrigin",{defaultValue:"50% 50%",prefix:!0}),de("transformStyle",{prefix:!0}),de("backfaceVisibility",{prefix:!0}),de("userSelect",{prefix:!0}),de("margin",{parser:_e("marginTop,marginRight,marginBottom,marginLeft")}),de("padding",{parser:_e("paddingTop,paddingRight,paddingBottom,paddingLeft")}),de("clip",{defaultValue:"rect(0px,0px,0px,0px)",parser:function(t,e,i,s,n,a){var o,h,l;return 9>f?(h=t.currentStyle,l=8>f?" ":",",o="rect("+h.clipTop+l+h.clipRight+l+h.clipBottom+l+h.clipLeft+")",e=this.format(e).split(",").join(l)):(o=this.format(W(t,this.p,r,!1,this.dflt)),e=this.format(e)),this.parseComplex(t.style,o,e,n,a)}}),de("textShadow",{defaultValue:"0px 0px 0px #999",color:!0,multi:!0}),de("autoRound,strictUnits",{parser:function(t,e,i,s,r){return r}}),de("border",{defaultValue:"0px solid #000",parser:function(t,e,i,s,n,a){return this.parseComplex(t.style,this.format(W(t,"borderTopWidth",r,!1,"0px")+" "+W(t,"borderTopStyle",r,!1,"solid")+" "+W(t,"borderTopColor",r,!1,"#000")),this.format(e),n,a)},color:!0,formatter:function(t){var e=t.split(" ");return e[0]+" "+(e[1]||"solid")+" "+(t.match(he)||["#000"])[0]}}),de("borderWidth",{parser:_e("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}),de("float,cssFloat,styleFloat",{parser:function(t,e,i,s,r){var n=t.style,a="cssFloat"in n?"cssFloat":"styleFloat";return new pe(n,a,0,0,r,-1,i,!1,0,n[a],e)}});var Ae=function(t){var e,i=this.t,s=i.filter||W(this.data,"filter"),r=0|this.s+this.c*t;100===r&&(-1===s.indexOf("atrix(")&&-1===s.indexOf("radient(")&&-1===s.indexOf("oader(")?(i.removeAttribute("filter"),e=!W(this.data,"filter")):(i.filter=s.replace(x,""),e=!0)),e||(this.xn1&&(i.filter=s=s||"alpha(opacity="+r+")"),-1===s.indexOf("pacity")?0===r&&this.xn1||(i.filter=s+" alpha(opacity="+r+")"):i.filter=s.replace(T,"opacity="+r))};de("opacity,alpha,autoAlpha",{defaultValue:"1",parser:function(t,e,i,s,n,a){var o=parseFloat(W(t,"opacity",r,!1,"1")),h=t.style,l="autoAlpha"===i;return"string"==typeof e&&"="===e.charAt(1)&&(e=("-"===e.charAt(0)?-1:1)*parseFloat(e.substr(2))+o),l&&1===o&&"hidden"===W(t,"visibility",r)&&0!==e&&(o=0),U?n=new pe(h,"opacity",o,e-o,n):(n=new pe(h,"opacity",100*o,100*(e-o),n),n.xn1=l?1:0,h.zoom=1,n.type=2,n.b="alpha(opacity="+n.s+")",n.e="alpha(opacity="+(n.s+n.c)+")",n.data=t,n.plugin=a,n.setRatio=Ae),l&&(n=new pe(h,"visibility",0,0,n,-1,null,!1,0,0!==o?"inherit":"hidden",0===e?"hidden":"inherit"),n.xs0="inherit",s._overwriteProps.push(n.n),s._overwriteProps.push(i)),n}});var Ce=function(t,e){e&&(t.removeProperty?("ms"===e.substr(0,2)&&(e="M"+e.substr(1)),t.removeProperty(e.replace(P,"-$1").toLowerCase())):t.removeAttribute(e))},Oe=function(t){if(this.t._gsClassPT=this,1===t||0===t){this.t.setAttribute("class",0===t?this.b:this.e);for(var e=this.data,i=this.t.style;e;)e.v?i[e.p]=e.v:Ce(i,e.p),e=e._next;1===t&&this.t._gsClassPT===this&&(this.t._gsClassPT=null)}else this.t.getAttribute("class")!==this.e&&this.t.setAttribute("class",this.e)};de("className",{parser:function(t,e,s,n,a,o,h){var l,_,u,p,c,f=t.getAttribute("class")||"",m=t.style.cssText;if(a=n._classNamePT=new pe(t,s,0,0,a,2),a.setRatio=Oe,a.pr=-11,i=!0,a.b=f,_=$(t,r),u=t._gsClassPT){for(p={},c=u.data;c;)p[c.p]=1,c=c._next;u.setRatio(1)}return t._gsClassPT=a,a.e="="!==e.charAt(1)?e:f.replace(RegExp("\\s*\\b"+e.substr(2)+"\\b"),"")+("+"===e.charAt(0)?" "+e.substr(2):""),n._tween._duration&&(t.setAttribute("class",a.e),l=H(t,_,$(t),h,p),t.setAttribute("class",f),a.data=l.firstMPT,t.style.cssText=m,a=a.xfirst=n.parse(t,l.difs,a,o)),a}});var De=function(t){if((1===t||0===t)&&this.data._totalTime===this.data._totalDuration&&"isFromStart"!==this.data.data){var e,i,s,r,n=this.t.style,a=o.transform.parse;if("all"===this.e)n.cssText="",r=!0;else for(e=this.e.split(","),s=e.length;--s>-1;)i=e[s],o[i]&&(o[i].parse===a?r=!0:i="transformOrigin"===i?we:o[i].p),Ce(n,i);r&&(Ce(n,ye),this.t._gsTransform&&delete this.t._gsTransform)}};for(de("clearProps",{parser:function(t,e,s,r,n){return n=new pe(t,s,0,0,n,2),n.setRatio=De,n.e=e,n.pr=-10,n.data=r._tween,i=!0,n}}),h="bezier,throwProps,physicsProps,physics2D".split(","),fe=h.length;fe--;)ge(h[fe]);h=a.prototype,h._firstPT=null,h._onInitTween=function(t,e,o){if(!t.nodeType)return!1;this._target=t,this._tween=o,this._vars=e,l=e.autoRound,i=!1,s=e.suffixMap||a.suffixMap,r=G(t,""),n=this._overwriteProps;var h,p,f,m,d,g,v,y,T,x=t.style;if(_&&""===x.zIndex&&(h=W(t,"zIndex",r),("auto"===h||""===h)&&this._addLazySet(x,"zIndex",0)),"string"==typeof e&&(m=x.cssText,h=$(t,r),x.cssText=m+";"+e,h=H(t,h,$(t)).difs,!U&&w.test(e)&&(h.opacity=parseFloat(RegExp.$1)),e=h,x.cssText=m),this._firstPT=p=this.parse(t,e,null),this._transformType){for(T=3===this._transformType,ye?u&&(_=!0,""===x.zIndex&&(v=W(t,"zIndex",r),("auto"===v||""===v)&&this._addLazySet(x,"zIndex",0)),c&&this._addLazySet(x,"WebkitBackfaceVisibility",this._vars.WebkitBackfaceVisibility||(T?"visible":"hidden"))):x.zoom=1,f=p;f&&f._next;)f=f._next;y=new pe(t,"transform",0,0,null,2),this._linkCSSP(y,null,f),y.setRatio=T&&xe?ke:ye?Re:Se,y.data=this._transform||Pe(t,r,!0),n.pop()}if(i){for(;p;){for(g=p._next,f=m;f&&f.pr>p.pr;)f=f._next;(p._prev=f?f._prev:d)?p._prev._next=p:m=p,(p._next=f)?f._prev=p:d=p,p=g}this._firstPT=m}return!0},h.parse=function(t,e,i,n){var a,h,_,u,p,c,f,m,d,g,v=t.style;for(a in e)c=e[a],h=o[a],h?i=h.parse(t,c,a,this,i,n,e):(p=W(t,a,r)+"",d="string"==typeof c,"color"===a||"fill"===a||"stroke"===a||-1!==a.indexOf("Color")||d&&b.test(c)?(d||(c=oe(c),c=(c.length>3?"rgba(":"rgb(")+c.join(",")+")"),i=ce(v,a,p,c,!0,"transparent",i,0,n)):!d||-1===c.indexOf(" ")&&-1===c.indexOf(",")?(_=parseFloat(p),f=_||0===_?p.substr((_+"").length):"",(""===p||"auto"===p)&&("width"===a||"height"===a?(_=te(t,a,r),f="px"):"left"===a||"top"===a?(_=Z(t,a,r),f="px"):(_="opacity"!==a?0:1,f="")),g=d&&"="===c.charAt(1),g?(u=parseInt(c.charAt(0)+"1",10),c=c.substr(2),u*=parseFloat(c),m=c.replace(y,"")):(u=parseFloat(c),m=d?c.substr((u+"").length)||"":""),""===m&&(m=a in s?s[a]:f),c=u||0===u?(g?u+_:u)+m:e[a],f!==m&&""!==m&&(u||0===u)&&_&&(_=Q(t,a,_,f),"%"===m?(_/=Q(t,a,100,"%")/100,e.strictUnits!==!0&&(p=_+"%")):"em"===m?_/=Q(t,a,1,"em"):"px"!==m&&(u=Q(t,a,u,m),m="px"),g&&(u||0===u)&&(c=u+_+m)),g&&(u+=_),!_&&0!==_||!u&&0!==u?void 0!==v[a]&&(c||"NaN"!=c+""&&null!=c)?(i=new pe(v,a,u||_||0,0,i,-1,a,!1,0,p,c),i.xs0="none"!==c||"display"!==a&&-1===a.indexOf("Style")?c:p):j("invalid "+a+" tween value: "+e[a]):(i=new pe(v,a,_,u-_,i,0,a,l!==!1&&("px"===m||"zIndex"===a),0,p,c),i.xs0=m)):i=ce(v,a,p,c,!0,null,i,0,n)),n&&i&&!i.plugin&&(i.plugin=n);
return i},h.setRatio=function(t){var e,i,s,r=this._firstPT,n=1e-6;if(1!==t||this._tween._time!==this._tween._duration&&0!==this._tween._time)if(t||this._tween._time!==this._tween._duration&&0!==this._tween._time||this._tween._rawPrevTime===-1e-6)for(;r;){if(e=r.c*t+r.s,r.r?e=Math.round(e):n>e&&e>-n&&(e=0),r.type)if(1===r.type)if(s=r.l,2===s)r.t[r.p]=r.xs0+e+r.xs1+r.xn1+r.xs2;else if(3===s)r.t[r.p]=r.xs0+e+r.xs1+r.xn1+r.xs2+r.xn2+r.xs3;else if(4===s)r.t[r.p]=r.xs0+e+r.xs1+r.xn1+r.xs2+r.xn2+r.xs3+r.xn3+r.xs4;else if(5===s)r.t[r.p]=r.xs0+e+r.xs1+r.xn1+r.xs2+r.xn2+r.xs3+r.xn3+r.xs4+r.xn4+r.xs5;else{for(i=r.xs0+e+r.xs1,s=1;r.l>s;s++)i+=r["xn"+s]+r["xs"+(s+1)];r.t[r.p]=i}else-1===r.type?r.t[r.p]=r.xs0:r.setRatio&&r.setRatio(t);else r.t[r.p]=e+r.xs0;r=r._next}else for(;r;)2!==r.type?r.t[r.p]=r.b:r.setRatio(t),r=r._next;else for(;r;)2!==r.type?r.t[r.p]=r.e:r.setRatio(t),r=r._next},h._enableTransforms=function(t){this._transformType=t||3===this._transformType?3:2,this._transform=this._transform||Pe(this._target,r,!0)};var Me=function(){this.t[this.p]=this.e,this.data._linkCSSP(this,this._next,null,!0)};h._addLazySet=function(t,e,i){var s=this._firstPT=new pe(t,e,0,0,this._firstPT,2);s.e=i,s.setRatio=Me,s.data=this},h._linkCSSP=function(t,e,i,s){return t&&(e&&(e._prev=t),t._next&&(t._next._prev=t._prev),t._prev?t._prev._next=t._next:this._firstPT===t&&(this._firstPT=t._next,s=!0),i?i._next=t:s||null!==this._firstPT||(this._firstPT=t),t._next=e,t._prev=i),t},h._kill=function(e){var i,s,r,n=e;if(e.autoAlpha||e.alpha){n={};for(s in e)n[s]=e[s];n.opacity=1,n.autoAlpha&&(n.visibility=1)}return e.className&&(i=this._classNamePT)&&(r=i.xfirst,r&&r._prev?this._linkCSSP(r._prev,i._next,r._prev._prev):r===this._firstPT&&(this._firstPT=i._next),i._next&&this._linkCSSP(i._next,i._next._next,r._prev),this._classNamePT=null),t.prototype._kill.call(this,n)};var ze=function(t,e,i){var s,r,n,a;if(t.slice)for(r=t.length;--r>-1;)ze(t[r],e,i);else for(s=t.childNodes,r=s.length;--r>-1;)n=s[r],a=n.type,n.style&&(e.push($(n)),i&&i.push(n)),1!==a&&9!==a&&11!==a||!n.childNodes.length||ze(n,e,i)};return a.cascadeTo=function(t,i,s){var r,n,a,o=e.to(t,i,s),h=[o],l=[],_=[],u=[],p=e._internals.reservedProps;for(t=o._targets||o.target,ze(t,l,u),o.render(i,!0),ze(t,_),o.render(0,!0),o._enabled(!0),r=u.length;--r>-1;)if(n=H(u[r],l[r],_[r]),n.firstMPT){n=n.difs;for(a in s)p[a]&&(n[a]=s[a]);h.push(e.to(u[r],i,n))}return h},t.activate([a]),a},!0),function(){var t=_gsScope._gsDefine.plugin({propName:"roundProps",priority:-1,API:2,init:function(t,e,i){return this._tween=i,!0}}),e=t.prototype;e._onInitAllProps=function(){for(var t,e,i,s=this._tween,r=s.vars.roundProps instanceof Array?s.vars.roundProps:s.vars.roundProps.split(","),n=r.length,a={},o=s._propLookup.roundProps;--n>-1;)a[r[n]]=1;for(n=r.length;--n>-1;)for(t=r[n],e=s._firstPT;e;)i=e._next,e.pg?e.t._roundProps(a,!0):e.n===t&&(this._add(e.t,t,e.s,e.c),i&&(i._prev=e._prev),e._prev?e._prev._next=i:s._firstPT===e&&(s._firstPT=i),e._next=e._prev=null,s._propLookup[t]=o),e=i;return!1},e._add=function(t,e,i,s){this._addTween(t,e,i,i+s,e,!0),this._overwriteProps.push(e)}}(),_gsScope._gsDefine.plugin({propName:"attr",API:2,version:"0.3.3",init:function(t,e){var i,s,r;if("function"!=typeof t.setAttribute)return!1;this._target=t,this._proxy={},this._start={},this._end={};for(i in e)this._start[i]=this._proxy[i]=s=t.getAttribute(i),r=this._addTween(this._proxy,i,parseFloat(s),e[i],i),this._end[i]=r?r.s+r.c:e[i],this._overwriteProps.push(i);return!0},set:function(t){this._super.setRatio.call(this,t);for(var e,i=this._overwriteProps,s=i.length,r=1===t?this._end:t?this._proxy:this._start;--s>-1;)e=i[s],this._target.setAttribute(e,r[e]+"")}}),_gsScope._gsDefine.plugin({propName:"directionalRotation",version:"0.2.1",API:2,init:function(t,e){"object"!=typeof e&&(e={rotation:e}),this.finals={};var i,s,r,n,a,o,h=e.useRadians===!0?2*Math.PI:360,l=1e-6;for(i in e)"useRadians"!==i&&(o=(e[i]+"").split("_"),s=o[0],r=parseFloat("function"!=typeof t[i]?t[i]:t[i.indexOf("set")||"function"!=typeof t["get"+i.substr(3)]?i:"get"+i.substr(3)]()),n=this.finals[i]="string"==typeof s&&"="===s.charAt(1)?r+parseInt(s.charAt(0)+"1",10)*Number(s.substr(2)):Number(s)||0,a=n-r,o.length&&(s=o.join("_"),-1!==s.indexOf("short")&&(a%=h,a!==a%(h/2)&&(a=0>a?a+h:a-h)),-1!==s.indexOf("_cw")&&0>a?a=(a+9999999999*h)%h-(0|a/h)*h:-1!==s.indexOf("ccw")&&a>0&&(a=(a-9999999999*h)%h-(0|a/h)*h)),(a>l||-l>a)&&(this._addTween(t,i,r,r+a,i),this._overwriteProps.push(i)));return!0},set:function(t){var e;if(1!==t)this._super.setRatio.call(this,t);else for(e=this._firstPT;e;)e.f?e.t[e.p](this.finals[e.p]):e.t[e.p]=this.finals[e.p],e=e._next}})._autoCSS=!0,_gsScope._gsDefine("easing.Back",["easing.Ease"],function(t){var e,i,s,r=_gsScope.GreenSockGlobals||_gsScope,n=r.com.greensock,a=2*Math.PI,o=Math.PI/2,h=n._class,l=function(e,i){var s=h("easing."+e,function(){},!0),r=s.prototype=new t;return r.constructor=s,r.getRatio=i,s},_=t.register||function(){},u=function(t,e,i,s){var r=h("easing."+t,{easeOut:new e,easeIn:new i,easeInOut:new s},!0);return _(r,t),r},p=function(t,e,i){this.t=t,this.v=e,i&&(this.next=i,i.prev=this,this.c=i.v-e,this.gap=i.t-t)},c=function(e,i){var s=h("easing."+e,function(t){this._p1=t||0===t?t:1.70158,this._p2=1.525*this._p1},!0),r=s.prototype=new t;return r.constructor=s,r.getRatio=i,r.config=function(t){return new s(t)},s},f=u("Back",c("BackOut",function(t){return(t-=1)*t*((this._p1+1)*t+this._p1)+1}),c("BackIn",function(t){return t*t*((this._p1+1)*t-this._p1)}),c("BackInOut",function(t){return 1>(t*=2)?.5*t*t*((this._p2+1)*t-this._p2):.5*((t-=2)*t*((this._p2+1)*t+this._p2)+2)})),m=h("easing.SlowMo",function(t,e,i){e=e||0===e?e:.7,null==t?t=.7:t>1&&(t=1),this._p=1!==t?e:0,this._p1=(1-t)/2,this._p2=t,this._p3=this._p1+this._p2,this._calcEnd=i===!0},!0),d=m.prototype=new t;return d.constructor=m,d.getRatio=function(t){var e=t+(.5-t)*this._p;return this._p1>t?this._calcEnd?1-(t=1-t/this._p1)*t:e-(t=1-t/this._p1)*t*t*t*e:t>this._p3?this._calcEnd?1-(t=(t-this._p3)/this._p1)*t:e+(t-e)*(t=(t-this._p3)/this._p1)*t*t*t:this._calcEnd?1:e},m.ease=new m(.7,.7),d.config=m.config=function(t,e,i){return new m(t,e,i)},e=h("easing.SteppedEase",function(t){t=t||1,this._p1=1/t,this._p2=t+1},!0),d=e.prototype=new t,d.constructor=e,d.getRatio=function(t){return 0>t?t=0:t>=1&&(t=.999999999),(this._p2*t>>0)*this._p1},d.config=e.config=function(t){return new e(t)},i=h("easing.RoughEase",function(e){e=e||{};for(var i,s,r,n,a,o,h=e.taper||"none",l=[],_=0,u=0|(e.points||20),c=u,f=e.randomize!==!1,m=e.clamp===!0,d=e.template instanceof t?e.template:null,g="number"==typeof e.strength?.4*e.strength:.4;--c>-1;)i=f?Math.random():1/u*c,s=d?d.getRatio(i):i,"none"===h?r=g:"out"===h?(n=1-i,r=n*n*g):"in"===h?r=i*i*g:.5>i?(n=2*i,r=.5*n*n*g):(n=2*(1-i),r=.5*n*n*g),f?s+=Math.random()*r-.5*r:c%2?s+=.5*r:s-=.5*r,m&&(s>1?s=1:0>s&&(s=0)),l[_++]={x:i,y:s};for(l.sort(function(t,e){return t.x-e.x}),o=new p(1,1,null),c=u;--c>-1;)a=l[c],o=new p(a.x,a.y,o);this._prev=new p(0,0,0!==o.t?o:o.next)},!0),d=i.prototype=new t,d.constructor=i,d.getRatio=function(t){var e=this._prev;if(t>e.t){for(;e.next&&t>=e.t;)e=e.next;e=e.prev}else for(;e.prev&&e.t>=t;)e=e.prev;return this._prev=e,e.v+(t-e.t)/e.gap*e.c},d.config=function(t){return new i(t)},i.ease=new i,u("Bounce",l("BounceOut",function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375}),l("BounceIn",function(t){return 1/2.75>(t=1-t)?1-7.5625*t*t:2/2.75>t?1-(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1-(7.5625*(t-=2.25/2.75)*t+.9375):1-(7.5625*(t-=2.625/2.75)*t+.984375)}),l("BounceInOut",function(t){var e=.5>t;return t=e?1-2*t:2*t-1,t=1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375,e?.5*(1-t):.5*t+.5})),u("Circ",l("CircOut",function(t){return Math.sqrt(1-(t-=1)*t)}),l("CircIn",function(t){return-(Math.sqrt(1-t*t)-1)}),l("CircInOut",function(t){return 1>(t*=2)?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)})),s=function(e,i,s){var r=h("easing."+e,function(t,e){this._p1=t||1,this._p2=e||s,this._p3=this._p2/a*(Math.asin(1/this._p1)||0)},!0),n=r.prototype=new t;return n.constructor=r,n.getRatio=i,n.config=function(t,e){return new r(t,e)},r},u("Elastic",s("ElasticOut",function(t){return this._p1*Math.pow(2,-10*t)*Math.sin((t-this._p3)*a/this._p2)+1},.3),s("ElasticIn",function(t){return-(this._p1*Math.pow(2,10*(t-=1))*Math.sin((t-this._p3)*a/this._p2))},.3),s("ElasticInOut",function(t){return 1>(t*=2)?-.5*this._p1*Math.pow(2,10*(t-=1))*Math.sin((t-this._p3)*a/this._p2):.5*this._p1*Math.pow(2,-10*(t-=1))*Math.sin((t-this._p3)*a/this._p2)+1},.45)),u("Expo",l("ExpoOut",function(t){return 1-Math.pow(2,-10*t)}),l("ExpoIn",function(t){return Math.pow(2,10*(t-1))-.001}),l("ExpoInOut",function(t){return 1>(t*=2)?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*(t-1)))})),u("Sine",l("SineOut",function(t){return Math.sin(t*o)}),l("SineIn",function(t){return-Math.cos(t*o)+1}),l("SineInOut",function(t){return-.5*(Math.cos(Math.PI*t)-1)})),h("easing.EaseLookup",{find:function(e){return t.map[e]}},!0),_(r.SlowMo,"SlowMo","ease,"),_(i,"RoughEase","ease,"),_(e,"SteppedEase","ease,"),f},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(t,e){"use strict";var i=t.GreenSockGlobals=t.GreenSockGlobals||t;if(!i.TweenLite){var s,r,n,a,o,h=function(t){var e,s=t.split("."),r=i;for(e=0;s.length>e;e++)r[s[e]]=r=r[s[e]]||{};return r},l=h("com.greensock"),_=1e-10,u=function(t){var e,i=[],s=t.length;for(e=0;e!==s;i.push(t[e++]));return i},p=function(){},c=function(){var t=Object.prototype.toString,e=t.call([]);return function(i){return null!=i&&(i instanceof Array||"object"==typeof i&&!!i.push&&t.call(i)===e)}}(),f={},m=function(s,r,n,a){this.sc=f[s]?f[s].sc:[],f[s]=this,this.gsClass=null,this.func=n;var o=[];this.check=function(l){for(var _,u,p,c,d=r.length,g=d;--d>-1;)(_=f[r[d]]||new m(r[d],[])).gsClass?(o[d]=_.gsClass,g--):l&&_.sc.push(this);if(0===g&&n)for(u=("com.greensock."+s).split("."),p=u.pop(),c=h(u.join("."))[p]=this.gsClass=n.apply(n,o),a&&(i[p]=c,"function"==typeof define&&define.amd?define((t.GreenSockAMDPath?t.GreenSockAMDPath+"/":"")+s.split(".").pop(),[],function(){return c}):s===e&&"undefined"!=typeof module&&module.exports&&(module.exports=c)),d=0;this.sc.length>d;d++)this.sc[d].check()},this.check(!0)},d=t._gsDefine=function(t,e,i,s){return new m(t,e,i,s)},g=l._class=function(t,e,i){return e=e||function(){},d(t,[],function(){return e},i),e};d.globals=i;var v=[0,0,1,1],y=[],T=g("easing.Ease",function(t,e,i,s){this._func=t,this._type=i||0,this._power=s||0,this._params=e?v.concat(e):v},!0),w=T.map={},x=T.register=function(t,e,i,s){for(var r,n,a,o,h=e.split(","),_=h.length,u=(i||"easeIn,easeOut,easeInOut").split(",");--_>-1;)for(n=h[_],r=s?g("easing."+n,null,!0):l.easing[n]||{},a=u.length;--a>-1;)o=u[a],w[n+"."+o]=w[o+n]=r[o]=t.getRatio?t:t[o]||new t};for(n=T.prototype,n._calcEnd=!1,n.getRatio=function(t){if(this._func)return this._params[0]=t,this._func.apply(null,this._params);var e=this._type,i=this._power,s=1===e?1-t:2===e?t:.5>t?2*t:2*(1-t);return 1===i?s*=s:2===i?s*=s*s:3===i?s*=s*s*s:4===i&&(s*=s*s*s*s),1===e?1-s:2===e?s:.5>t?s/2:1-s/2},s=["Linear","Quad","Cubic","Quart","Quint,Strong"],r=s.length;--r>-1;)n=s[r]+",Power"+r,x(new T(null,null,1,r),n,"easeOut",!0),x(new T(null,null,2,r),n,"easeIn"+(0===r?",easeNone":"")),x(new T(null,null,3,r),n,"easeInOut");w.linear=l.easing.Linear.easeIn,w.swing=l.easing.Quad.easeInOut;var b=g("events.EventDispatcher",function(t){this._listeners={},this._eventTarget=t||this});n=b.prototype,n.addEventListener=function(t,e,i,s,r){r=r||0;var n,h,l=this._listeners[t],_=0;for(null==l&&(this._listeners[t]=l=[]),h=l.length;--h>-1;)n=l[h],n.c===e&&n.s===i?l.splice(h,1):0===_&&r>n.pr&&(_=h+1);l.splice(_,0,{c:e,s:i,up:s,pr:r}),this!==a||o||a.wake()},n.removeEventListener=function(t,e){var i,s=this._listeners[t];if(s)for(i=s.length;--i>-1;)if(s[i].c===e)return s.splice(i,1),void 0},n.dispatchEvent=function(t){var e,i,s,r=this._listeners[t];if(r)for(e=r.length,i=this._eventTarget;--e>-1;)s=r[e],s.up?s.c.call(s.s||i,{type:t,target:i}):s.c.call(s.s||i)};var P=t.requestAnimationFrame,S=t.cancelAnimationFrame,k=Date.now||function(){return(new Date).getTime()},R=k();for(s=["ms","moz","webkit","o"],r=s.length;--r>-1&&!P;)P=t[s[r]+"RequestAnimationFrame"],S=t[s[r]+"CancelAnimationFrame"]||t[s[r]+"CancelRequestAnimationFrame"];g("Ticker",function(t,e){var i,s,r,n,h,l=this,u=k(),c=e!==!1&&P,f=500,m=33,d=function(t){var e,a,o=k()-R;o>f&&(u+=o-m),R+=o,l.time=(R-u)/1e3,e=l.time-h,(!i||e>0||t===!0)&&(l.frame++,h+=e+(e>=n?.004:n-e),a=!0),t!==!0&&(r=s(d)),a&&l.dispatchEvent("tick")};b.call(l),l.time=l.frame=0,l.tick=function(){d(!0)},l.lagSmoothing=function(t,e){f=t||1/_,m=Math.min(e,f,0)},l.sleep=function(){null!=r&&(c&&S?S(r):clearTimeout(r),s=p,r=null,l===a&&(o=!1))},l.wake=function(){null!==r?l.sleep():l.frame>10&&(R=k()-f+5),s=0===i?p:c&&P?P:function(t){return setTimeout(t,0|1e3*(h-l.time)+1)},l===a&&(o=!0),d(2)},l.fps=function(t){return arguments.length?(i=t,n=1/(i||60),h=this.time+n,l.wake(),void 0):i},l.useRAF=function(t){return arguments.length?(l.sleep(),c=t,l.fps(i),void 0):c},l.fps(t),setTimeout(function(){c&&(!r||5>l.frame)&&l.useRAF(!1)},1500)}),n=l.Ticker.prototype=new l.events.EventDispatcher,n.constructor=l.Ticker;var A=g("core.Animation",function(t,e){if(this.vars=e=e||{},this._duration=this._totalDuration=t||0,this._delay=Number(e.delay)||0,this._timeScale=1,this._active=e.immediateRender===!0,this.data=e.data,this._reversed=e.reversed===!0,B){o||a.wake();var i=this.vars.useFrames?j:B;i.add(this,i._time),this.vars.paused&&this.paused(!0)}});a=A.ticker=new l.Ticker,n=A.prototype,n._dirty=n._gc=n._initted=n._paused=!1,n._totalTime=n._time=0,n._rawPrevTime=-1,n._next=n._last=n._onUpdate=n._timeline=n.timeline=null,n._paused=!1;var C=function(){o&&k()-R>2e3&&a.wake(),setTimeout(C,2e3)};C(),n.play=function(t,e){return null!=t&&this.seek(t,e),this.reversed(!1).paused(!1)},n.pause=function(t,e){return null!=t&&this.seek(t,e),this.paused(!0)},n.resume=function(t,e){return null!=t&&this.seek(t,e),this.paused(!1)},n.seek=function(t,e){return this.totalTime(Number(t),e!==!1)},n.restart=function(t,e){return this.reversed(!1).paused(!1).totalTime(t?-this._delay:0,e!==!1,!0)},n.reverse=function(t,e){return null!=t&&this.seek(t||this.totalDuration(),e),this.reversed(!0).paused(!1)},n.render=function(){},n.invalidate=function(){return this},n.isActive=function(){var t,e=this._timeline,i=this._startTime;return!e||!this._gc&&!this._paused&&e.isActive()&&(t=e.rawTime())>=i&&i+this.totalDuration()/this._timeScale>t},n._enabled=function(t,e){return o||a.wake(),this._gc=!t,this._active=this.isActive(),e!==!0&&(t&&!this.timeline?this._timeline.add(this,this._startTime-this._delay):!t&&this.timeline&&this._timeline._remove(this,!0)),!1},n._kill=function(){return this._enabled(!1,!1)},n.kill=function(t,e){return this._kill(t,e),this},n._uncache=function(t){for(var e=t?this:this.timeline;e;)e._dirty=!0,e=e.timeline;return this},n._swapSelfInParams=function(t){for(var e=t.length,i=t.concat();--e>-1;)"{self}"===t[e]&&(i[e]=this);return i},n.eventCallback=function(t,e,i,s){if("on"===(t||"").substr(0,2)){var r=this.vars;if(1===arguments.length)return r[t];null==e?delete r[t]:(r[t]=e,r[t+"Params"]=c(i)&&-1!==i.join("").indexOf("{self}")?this._swapSelfInParams(i):i,r[t+"Scope"]=s),"onUpdate"===t&&(this._onUpdate=e)}return this},n.delay=function(t){return arguments.length?(this._timeline.smoothChildTiming&&this.startTime(this._startTime+t-this._delay),this._delay=t,this):this._delay},n.duration=function(t){return arguments.length?(this._duration=this._totalDuration=t,this._uncache(!0),this._timeline.smoothChildTiming&&this._time>0&&this._time<this._duration&&0!==t&&this.totalTime(this._totalTime*(t/this._duration),!0),this):(this._dirty=!1,this._duration)},n.totalDuration=function(t){return this._dirty=!1,arguments.length?this.duration(t):this._totalDuration},n.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),this.totalTime(t>this._duration?this._duration:t,e)):this._time},n.totalTime=function(t,e,i){if(o||a.wake(),!arguments.length)return this._totalTime;if(this._timeline){if(0>t&&!i&&(t+=this.totalDuration()),this._timeline.smoothChildTiming){this._dirty&&this.totalDuration();var s=this._totalDuration,r=this._timeline;if(t>s&&!i&&(t=s),this._startTime=(this._paused?this._pauseTime:r._time)-(this._reversed?s-t:t)/this._timeScale,r._dirty||this._uncache(!1),r._timeline)for(;r._timeline;)r._timeline._time!==(r._startTime+r._totalTime)/r._timeScale&&r.totalTime(r._totalTime,!0),r=r._timeline}this._gc&&this._enabled(!0,!1),(this._totalTime!==t||0===this._duration)&&(this.render(t,e,!1),I.length&&q())}return this},n.progress=n.totalProgress=function(t,e){return arguments.length?this.totalTime(this.duration()*t,e):this._time/this.duration()},n.startTime=function(t){return arguments.length?(t!==this._startTime&&(this._startTime=t,this.timeline&&this.timeline._sortChildren&&this.timeline.add(this,t-this._delay)),this):this._startTime},n.timeScale=function(t){if(!arguments.length)return this._timeScale;if(t=t||_,this._timeline&&this._timeline.smoothChildTiming){var e=this._pauseTime,i=e||0===e?e:this._timeline.totalTime();this._startTime=i-(i-this._startTime)*this._timeScale/t}return this._timeScale=t,this._uncache(!1)},n.reversed=function(t){return arguments.length?(t!=this._reversed&&(this._reversed=t,this.totalTime(this._timeline&&!this._timeline.smoothChildTiming?this.totalDuration()-this._totalTime:this._totalTime,!0)),this):this._reversed},n.paused=function(t){if(!arguments.length)return this._paused;if(t!=this._paused&&this._timeline){o||t||a.wake();var e=this._timeline,i=e.rawTime(),s=i-this._pauseTime;!t&&e.smoothChildTiming&&(this._startTime+=s,this._uncache(!1)),this._pauseTime=t?i:null,this._paused=t,this._active=this.isActive(),!t&&0!==s&&this._initted&&this.duration()&&this.render(e.smoothChildTiming?this._totalTime:(i-this._startTime)/this._timeScale,!0,!0)}return this._gc&&!t&&this._enabled(!0,!1),this};var O=g("core.SimpleTimeline",function(t){A.call(this,0,t),this.autoRemoveChildren=this.smoothChildTiming=!0});n=O.prototype=new A,n.constructor=O,n.kill()._gc=!1,n._first=n._last=null,n._sortChildren=!1,n.add=n.insert=function(t,e){var i,s;if(t._startTime=Number(e||0)+t._delay,t._paused&&this!==t._timeline&&(t._pauseTime=t._startTime+(this.rawTime()-t._startTime)/t._timeScale),t.timeline&&t.timeline._remove(t,!0),t.timeline=t._timeline=this,t._gc&&t._enabled(!0,!0),i=this._last,this._sortChildren)for(s=t._startTime;i&&i._startTime>s;)i=i._prev;return i?(t._next=i._next,i._next=t):(t._next=this._first,this._first=t),t._next?t._next._prev=t:this._last=t,t._prev=i,this._timeline&&this._uncache(!0),this},n._remove=function(t,e){return t.timeline===this&&(e||t._enabled(!1,!0),t._prev?t._prev._next=t._next:this._first===t&&(this._first=t._next),t._next?t._next._prev=t._prev:this._last===t&&(this._last=t._prev),t._next=t._prev=t.timeline=null,this._timeline&&this._uncache(!0)),this},n.render=function(t,e,i){var s,r=this._first;for(this._totalTime=this._time=this._rawPrevTime=t;r;)s=r._next,(r._active||t>=r._startTime&&!r._paused)&&(r._reversed?r.render((r._dirty?r.totalDuration():r._totalDuration)-(t-r._startTime)*r._timeScale,e,i):r.render((t-r._startTime)*r._timeScale,e,i)),r=s},n.rawTime=function(){return o||a.wake(),this._totalTime};var D=g("TweenLite",function(e,i,s){if(A.call(this,i,s),this.render=D.prototype.render,null==e)throw"Cannot tween a null target.";this.target=e="string"!=typeof e?e:D.selector(e)||e;var r,n,a,o=e.jquery||e.length&&e!==t&&e[0]&&(e[0]===t||e[0].nodeType&&e[0].style&&!e.nodeType),h=this.vars.overwrite;if(this._overwrite=h=null==h?Y[D.defaultOverwrite]:"number"==typeof h?h>>0:Y[h],(o||e instanceof Array||e.push&&c(e))&&"number"!=typeof e[0])for(this._targets=a=u(e),this._propLookup=[],this._siblings=[],r=0;a.length>r;r++)n=a[r],n?"string"!=typeof n?n.length&&n!==t&&n[0]&&(n[0]===t||n[0].nodeType&&n[0].style&&!n.nodeType)?(a.splice(r--,1),this._targets=a=a.concat(u(n))):(this._siblings[r]=V(n,this,!1),1===h&&this._siblings[r].length>1&&G(n,this,null,1,this._siblings[r])):(n=a[r--]=D.selector(n),"string"==typeof n&&a.splice(r+1,1)):a.splice(r--,1);else this._propLookup={},this._siblings=V(e,this,!1),1===h&&this._siblings.length>1&&G(e,this,null,1,this._siblings);(this.vars.immediateRender||0===i&&0===this._delay&&this.vars.immediateRender!==!1)&&(this._time=-_,this.render(-this._delay))},!0),M=function(e){return e.length&&e!==t&&e[0]&&(e[0]===t||e[0].nodeType&&e[0].style&&!e.nodeType)},z=function(t,e){var i,s={};for(i in t)U[i]||i in e&&"transform"!==i&&"x"!==i&&"y"!==i&&"width"!==i&&"height"!==i&&"className"!==i&&"border"!==i||!(!F[i]||F[i]&&F[i]._autoCSS)||(s[i]=t[i],delete t[i]);t.css=s};n=D.prototype=new A,n.constructor=D,n.kill()._gc=!1,n.ratio=0,n._firstPT=n._targets=n._overwrittenProps=n._startAt=null,n._notifyPluginsOfEnabled=n._lazy=!1,D.version="1.13.1",D.defaultEase=n._ease=new T(null,null,1,1),D.defaultOverwrite="auto",D.ticker=a,D.autoSleep=!0,D.lagSmoothing=function(t,e){a.lagSmoothing(t,e)},D.selector=t.$||t.jQuery||function(e){var i=t.$||t.jQuery;return i?(D.selector=i,i(e)):"undefined"==typeof document?e:document.querySelectorAll?document.querySelectorAll(e):document.getElementById("#"===e.charAt(0)?e.substr(1):e)};var I=[],E={},L=D._internals={isArray:c,isSelector:M,lazyTweens:I},F=D._plugins={},N=L.tweenLookup={},X=0,U=L.reservedProps={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1,autoCSS:1,lazy:1},Y={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,"true":1,"false":0},j=A._rootFramesTimeline=new O,B=A._rootTimeline=new O,q=L.lazyRender=function(){var t=I.length;for(E={};--t>-1;)s=I[t],s&&s._lazy!==!1&&(s.render(s._lazy,!1,!0),s._lazy=!1);I.length=0};B._startTime=a.time,j._startTime=a.frame,B._active=j._active=!0,setTimeout(q,1),A._updateRoot=D.render=function(){var t,e,i;if(I.length&&q(),B.render((a.time-B._startTime)*B._timeScale,!1,!1),j.render((a.frame-j._startTime)*j._timeScale,!1,!1),I.length&&q(),!(a.frame%120)){for(i in N){for(e=N[i].tweens,t=e.length;--t>-1;)e[t]._gc&&e.splice(t,1);0===e.length&&delete N[i]}if(i=B._first,(!i||i._paused)&&D.autoSleep&&!j._first&&1===a._listeners.tick.length){for(;i&&i._paused;)i=i._next;i||a.sleep()}}},a.addEventListener("tick",A._updateRoot);var V=function(t,e,i){var s,r,n=t._gsTweenID;if(N[n||(t._gsTweenID=n="t"+X++)]||(N[n]={target:t,tweens:[]}),e&&(s=N[n].tweens,s[r=s.length]=e,i))for(;--r>-1;)s[r]===e&&s.splice(r,1);return N[n].tweens},G=function(t,e,i,s,r){var n,a,o,h;if(1===s||s>=4){for(h=r.length,n=0;h>n;n++)if((o=r[n])!==e)o._gc||o._enabled(!1,!1)&&(a=!0);else if(5===s)break;return a}var l,u=e._startTime+_,p=[],c=0,f=0===e._duration;for(n=r.length;--n>-1;)(o=r[n])===e||o._gc||o._paused||(o._timeline!==e._timeline?(l=l||W(e,0,f),0===W(o,l,f)&&(p[c++]=o)):u>=o._startTime&&o._startTime+o.totalDuration()/o._timeScale>u&&((f||!o._initted)&&2e-10>=u-o._startTime||(p[c++]=o)));for(n=c;--n>-1;)o=p[n],2===s&&o._kill(i,t)&&(a=!0),(2!==s||!o._firstPT&&o._initted)&&o._enabled(!1,!1)&&(a=!0);return a},W=function(t,e,i){for(var s=t._timeline,r=s._timeScale,n=t._startTime;s._timeline;){if(n+=s._startTime,r*=s._timeScale,s._paused)return-100;s=s._timeline}return n/=r,n>e?n-e:i&&n===e||!t._initted&&2*_>n-e?_:(n+=t.totalDuration()/t._timeScale/r)>e+_?0:n-e-_};n._init=function(){var t,e,i,s,r,n=this.vars,a=this._overwrittenProps,o=this._duration,h=!!n.immediateRender,l=n.ease;if(n.startAt){this._startAt&&(this._startAt.render(-1,!0),this._startAt.kill()),r={};for(s in n.startAt)r[s]=n.startAt[s];if(r.overwrite=!1,r.immediateRender=!0,r.lazy=h&&n.lazy!==!1,r.startAt=r.delay=null,this._startAt=D.to(this.target,0,r),h)if(this._time>0)this._startAt=null;else if(0!==o)return}else if(n.runBackwards&&0!==o)if(this._startAt)this._startAt.render(-1,!0),this._startAt.kill(),this._startAt=null;else{i={};for(s in n)U[s]&&"autoCSS"!==s||(i[s]=n[s]);if(i.overwrite=0,i.data="isFromStart",i.lazy=h&&n.lazy!==!1,i.immediateRender=h,this._startAt=D.to(this.target,0,i),h){if(0===this._time)return}else this._startAt._init(),this._startAt._enabled(!1)}if(this._ease=l=l?l instanceof T?l:"function"==typeof l?new T(l,n.easeParams):w[l]||D.defaultEase:D.defaultEase,n.easeParams instanceof Array&&l.config&&(this._ease=l.config.apply(l,n.easeParams)),this._easeType=this._ease._type,this._easePower=this._ease._power,this._firstPT=null,this._targets)for(t=this._targets.length;--t>-1;)this._initProps(this._targets[t],this._propLookup[t]={},this._siblings[t],a?a[t]:null)&&(e=!0);else e=this._initProps(this.target,this._propLookup,this._siblings,a);if(e&&D._onPluginEvent("_onInitAllProps",this),a&&(this._firstPT||"function"!=typeof this.target&&this._enabled(!1,!1)),n.runBackwards)for(i=this._firstPT;i;)i.s+=i.c,i.c=-i.c,i=i._next;this._onUpdate=n.onUpdate,this._initted=!0},n._initProps=function(e,i,s,r){var n,a,o,h,l,_;if(null==e)return!1;E[e._gsTweenID]&&q(),this.vars.css||e.style&&e!==t&&e.nodeType&&F.css&&this.vars.autoCSS!==!1&&z(this.vars,e);for(n in this.vars){if(_=this.vars[n],U[n])_&&(_ instanceof Array||_.push&&c(_))&&-1!==_.join("").indexOf("{self}")&&(this.vars[n]=_=this._swapSelfInParams(_,this));else if(F[n]&&(h=new F[n])._onInitTween(e,this.vars[n],this)){for(this._firstPT=l={_next:this._firstPT,t:h,p:"setRatio",s:0,c:1,f:!0,n:n,pg:!0,pr:h._priority},a=h._overwriteProps.length;--a>-1;)i[h._overwriteProps[a]]=this._firstPT;(h._priority||h._onInitAllProps)&&(o=!0),(h._onDisable||h._onEnable)&&(this._notifyPluginsOfEnabled=!0)}else this._firstPT=i[n]=l={_next:this._firstPT,t:e,p:n,f:"function"==typeof e[n],n:n,pg:!1,pr:0},l.s=l.f?e[n.indexOf("set")||"function"!=typeof e["get"+n.substr(3)]?n:"get"+n.substr(3)]():parseFloat(e[n]),l.c="string"==typeof _&&"="===_.charAt(1)?parseInt(_.charAt(0)+"1",10)*Number(_.substr(2)):Number(_)-l.s||0;l&&l._next&&(l._next._prev=l)}return r&&this._kill(r,e)?this._initProps(e,i,s,r):this._overwrite>1&&this._firstPT&&s.length>1&&G(e,this,i,this._overwrite,s)?(this._kill(i,e),this._initProps(e,i,s,r)):(this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration)&&(E[e._gsTweenID]=!0),o)},n.render=function(t,e,i){var s,r,n,a,o=this._time,h=this._duration,l=this._rawPrevTime;if(t>=h)this._totalTime=this._time=h,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(s=!0,r="onComplete"),0===h&&(this._initted||!this.vars.lazy||i)&&(this._startTime===this._timeline._duration&&(t=0),(0===t||0>l||l===_)&&l!==t&&(i=!0,l>_&&(r="onReverseComplete")),this._rawPrevTime=a=!e||t||l===t?t:_);else if(1e-7>t)this._totalTime=this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==o||0===h&&l>0&&l!==_)&&(r="onReverseComplete",s=this._reversed),0>t?(this._active=!1,0===h&&(this._initted||!this.vars.lazy||i)&&(l>=0&&(i=!0),this._rawPrevTime=a=!e||t||l===t?t:_)):this._initted||(i=!0);else if(this._totalTime=this._time=t,this._easeType){var u=t/h,p=this._easeType,c=this._easePower;(1===p||3===p&&u>=.5)&&(u=1-u),3===p&&(u*=2),1===c?u*=u:2===c?u*=u*u:3===c?u*=u*u*u:4===c&&(u*=u*u*u*u),this.ratio=1===p?1-u:2===p?u:.5>t/h?u/2:1-u/2}else this.ratio=this._ease.getRatio(t/h);if(this._time!==o||i){if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!i&&this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration))return this._time=this._totalTime=o,this._rawPrevTime=l,I.push(this),this._lazy=t,void 0;this._time&&!s?this.ratio=this._ease.getRatio(this._time/h):s&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._lazy!==!1&&(this._lazy=!1),this._active||!this._paused&&this._time!==o&&t>=0&&(this._active=!0),0===o&&(this._startAt&&(t>=0?this._startAt.render(t,e,i):r||(r="_dummyGS")),this.vars.onStart&&(0!==this._time||0===h)&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||y))),n=this._firstPT;n;)n.f?n.t[n.p](n.c*this.ratio+n.s):n.t[n.p]=n.c*this.ratio+n.s,n=n._next;this._onUpdate&&(0>t&&this._startAt&&this._startTime&&this._startAt.render(t,e,i),e||(this._time!==o||s)&&this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||y)),r&&(!this._gc||i)&&(0>t&&this._startAt&&!this._onUpdate&&this._startTime&&this._startAt.render(t,e,i),s&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[r]&&this.vars[r].apply(this.vars[r+"Scope"]||this,this.vars[r+"Params"]||y),0===h&&this._rawPrevTime===_&&a!==_&&(this._rawPrevTime=0))}},n._kill=function(t,e){if("all"===t&&(t=null),null==t&&(null==e||e===this.target))return this._lazy=!1,this._enabled(!1,!1);e="string"!=typeof e?e||this._targets||this.target:D.selector(e)||e;var i,s,r,n,a,o,h,l;if((c(e)||M(e))&&"number"!=typeof e[0])for(i=e.length;--i>-1;)this._kill(t,e[i])&&(o=!0);else{if(this._targets){for(i=this._targets.length;--i>-1;)if(e===this._targets[i]){a=this._propLookup[i]||{},this._overwrittenProps=this._overwrittenProps||[],s=this._overwrittenProps[i]=t?this._overwrittenProps[i]||{}:"all";break}}else{if(e!==this.target)return!1;a=this._propLookup,s=this._overwrittenProps=t?this._overwrittenProps||{}:"all"}if(a){h=t||a,l=t!==s&&"all"!==s&&t!==a&&("object"!=typeof t||!t._tempKill);for(r in h)(n=a[r])&&(n.pg&&n.t._kill(h)&&(o=!0),n.pg&&0!==n.t._overwriteProps.length||(n._prev?n._prev._next=n._next:n===this._firstPT&&(this._firstPT=n._next),n._next&&(n._next._prev=n._prev),n._next=n._prev=null),delete a[r]),l&&(s[r]=1);!this._firstPT&&this._initted&&this._enabled(!1,!1)}}return o},n.invalidate=function(){return this._notifyPluginsOfEnabled&&D._onPluginEvent("_onDisable",this),this._firstPT=null,this._overwrittenProps=null,this._onUpdate=null,this._startAt=null,this._initted=this._active=this._notifyPluginsOfEnabled=this._lazy=!1,this._propLookup=this._targets?{}:[],this},n._enabled=function(t,e){if(o||a.wake(),t&&this._gc){var i,s=this._targets;if(s)for(i=s.length;--i>-1;)this._siblings[i]=V(s[i],this,!0);else this._siblings=V(this.target,this,!0)}return A.prototype._enabled.call(this,t,e),this._notifyPluginsOfEnabled&&this._firstPT?D._onPluginEvent(t?"_onEnable":"_onDisable",this):!1},D.to=function(t,e,i){return new D(t,e,i)},D.from=function(t,e,i){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,new D(t,e,i)},D.fromTo=function(t,e,i,s){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,new D(t,e,s)},D.delayedCall=function(t,e,i,s,r){return new D(e,0,{delay:t,onComplete:e,onCompleteParams:i,onCompleteScope:s,onReverseComplete:e,onReverseCompleteParams:i,onReverseCompleteScope:s,immediateRender:!1,useFrames:r,overwrite:0})},D.set=function(t,e){return new D(t,0,e)},D.getTweensOf=function(t,e){if(null==t)return[];t="string"!=typeof t?t:D.selector(t)||t;var i,s,r,n;if((c(t)||M(t))&&"number"!=typeof t[0]){for(i=t.length,s=[];--i>-1;)s=s.concat(D.getTweensOf(t[i],e));for(i=s.length;--i>-1;)for(n=s[i],r=i;--r>-1;)n===s[r]&&s.splice(i,1)}else for(s=V(t).concat(),i=s.length;--i>-1;)(s[i]._gc||e&&!s[i].isActive())&&s.splice(i,1);return s},D.killTweensOf=D.killDelayedCallsTo=function(t,e,i){"object"==typeof e&&(i=e,e=!1);for(var s=D.getTweensOf(t,e),r=s.length;--r>-1;)s[r]._kill(i,t)};var Q=g("plugins.TweenPlugin",function(t,e){this._overwriteProps=(t||"").split(","),this._propName=this._overwriteProps[0],this._priority=e||0,this._super=Q.prototype},!0);if(n=Q.prototype,Q.version="1.10.1",Q.API=2,n._firstPT=null,n._addTween=function(t,e,i,s,r,n){var a,o;
return null!=s&&(a="number"==typeof s||"="!==s.charAt(1)?Number(s)-i:parseInt(s.charAt(0)+"1",10)*Number(s.substr(2)))?(this._firstPT=o={_next:this._firstPT,t:t,p:e,s:i,c:a,f:"function"==typeof t[e],n:r||e,r:n},o._next&&(o._next._prev=o),o):void 0},n.setRatio=function(t){for(var e,i=this._firstPT,s=1e-6;i;)e=i.c*t+i.s,i.r?e=Math.round(e):s>e&&e>-s&&(e=0),i.f?i.t[i.p](e):i.t[i.p]=e,i=i._next},n._kill=function(t){var e,i=this._overwriteProps,s=this._firstPT;if(null!=t[this._propName])this._overwriteProps=[];else for(e=i.length;--e>-1;)null!=t[i[e]]&&i.splice(e,1);for(;s;)null!=t[s.n]&&(s._next&&(s._next._prev=s._prev),s._prev?(s._prev._next=s._next,s._prev=null):this._firstPT===s&&(this._firstPT=s._next)),s=s._next;return!1},n._roundProps=function(t,e){for(var i=this._firstPT;i;)(t[this._propName]||null!=i.n&&t[i.n.split(this._propName+"_").join("")])&&(i.r=e),i=i._next},D._onPluginEvent=function(t,e){var i,s,r,n,a,o=e._firstPT;if("_onInitAllProps"===t){for(;o;){for(a=o._next,s=r;s&&s.pr>o.pr;)s=s._next;(o._prev=s?s._prev:n)?o._prev._next=o:r=o,(o._next=s)?s._prev=o:n=o,o=a}o=e._firstPT=r}for(;o;)o.pg&&"function"==typeof o.t[t]&&o.t[t]()&&(i=!0),o=o._next;return i},Q.activate=function(t){for(var e=t.length;--e>-1;)t[e].API===Q.API&&(F[(new t[e])._propName]=t[e]);return!0},d.plugin=function(t){if(!(t&&t.propName&&t.init&&t.API))throw"illegal plugin definition.";var e,i=t.propName,s=t.priority||0,r=t.overwriteProps,n={init:"_onInitTween",set:"setRatio",kill:"_kill",round:"_roundProps",initAll:"_onInitAllProps"},a=g("plugins."+i.charAt(0).toUpperCase()+i.substr(1)+"Plugin",function(){Q.call(this,i,s),this._overwriteProps=r||[]},t.global===!0),o=a.prototype=new Q(i);o.constructor=a,a.API=t.API;for(e in n)"function"==typeof t[e]&&(o[n[e]]=t[e]);return a.version=t.version,Q.activate([a]),a},s=t._gsQueue){for(r=0;s.length>r;r++)s[r]();for(n in f)f[n].func||t.console.log("GSAP encountered missing dependency: com.greensock."+n)}o=!1}}("undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window,"TweenMax");
// Snap.svg 0.3.0
// 
// Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
// http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// 
// build: 2014-06-03
!function(a){var b,c,d="0.4.2",e="hasOwnProperty",f=/[\.\/]/,g=/\s*,\s*/,h="*",i=function(a,b){return a-b},j={n:{}},k=function(){for(var a=0,b=this.length;b>a;a++)if("undefined"!=typeof this[a])return this[a]},l=function(){for(var a=this.length;--a;)if("undefined"!=typeof this[a])return this[a]},m=function(a,d){a=String(a);var e,f=c,g=Array.prototype.slice.call(arguments,2),h=m.listeners(a),j=0,n=[],o={},p=[],q=b;p.firstDefined=k,p.lastDefined=l,b=a,c=0;for(var r=0,s=h.length;s>r;r++)"zIndex"in h[r]&&(n.push(h[r].zIndex),h[r].zIndex<0&&(o[h[r].zIndex]=h[r]));for(n.sort(i);n[j]<0;)if(e=o[n[j++]],p.push(e.apply(d,g)),c)return c=f,p;for(r=0;s>r;r++)if(e=h[r],"zIndex"in e)if(e.zIndex==n[j]){if(p.push(e.apply(d,g)),c)break;do if(j++,e=o[n[j]],e&&p.push(e.apply(d,g)),c)break;while(e)}else o[e.zIndex]=e;else if(p.push(e.apply(d,g)),c)break;return c=f,b=q,p};m._events=j,m.listeners=function(a){var b,c,d,e,g,i,k,l,m=a.split(f),n=j,o=[n],p=[];for(e=0,g=m.length;g>e;e++){for(l=[],i=0,k=o.length;k>i;i++)for(n=o[i].n,c=[n[m[e]],n[h]],d=2;d--;)b=c[d],b&&(l.push(b),p=p.concat(b.f||[]));o=l}return p},m.on=function(a,b){if(a=String(a),"function"!=typeof b)return function(){};for(var c=a.split(g),d=0,e=c.length;e>d;d++)!function(a){for(var c,d=a.split(f),e=j,g=0,h=d.length;h>g;g++)e=e.n,e=e.hasOwnProperty(d[g])&&e[d[g]]||(e[d[g]]={n:{}});for(e.f=e.f||[],g=0,h=e.f.length;h>g;g++)if(e.f[g]==b){c=!0;break}!c&&e.f.push(b)}(c[d]);return function(a){+a==+a&&(b.zIndex=+a)}},m.f=function(a){var b=[].slice.call(arguments,1);return function(){m.apply(null,[a,null].concat(b).concat([].slice.call(arguments,0)))}},m.stop=function(){c=1},m.nt=function(a){return a?new RegExp("(?:\\.|\\/|^)"+a+"(?:\\.|\\/|$)").test(b):b},m.nts=function(){return b.split(f)},m.off=m.unbind=function(a,b){if(!a)return void(m._events=j={n:{}});var c=a.split(g);if(c.length>1)for(var d=0,i=c.length;i>d;d++)m.off(c[d],b);else{c=a.split(f);var k,l,n,d,i,o,p,q=[j];for(d=0,i=c.length;i>d;d++)for(o=0;o<q.length;o+=n.length-2){if(n=[o,1],k=q[o].n,c[d]!=h)k[c[d]]&&n.push(k[c[d]]);else for(l in k)k[e](l)&&n.push(k[l]);q.splice.apply(q,n)}for(d=0,i=q.length;i>d;d++)for(k=q[d];k.n;){if(b){if(k.f){for(o=0,p=k.f.length;p>o;o++)if(k.f[o]==b){k.f.splice(o,1);break}!k.f.length&&delete k.f}for(l in k.n)if(k.n[e](l)&&k.n[l].f){var r=k.n[l].f;for(o=0,p=r.length;p>o;o++)if(r[o]==b){r.splice(o,1);break}!r.length&&delete k.n[l].f}}else{delete k.f;for(l in k.n)k.n[e](l)&&k.n[l].f&&delete k.n[l].f}k=k.n}}},m.once=function(a,b){var c=function(){return m.unbind(a,c),b.apply(this,arguments)};return m.on(a,c)},m.version=d,m.toString=function(){return"You are running Eve "+d},"undefined"!=typeof module&&module.exports?module.exports=m:"function"==typeof define&&define.amd?define("eve",[],function(){return m}):a.eve=m}(this),function(a,b){"function"==typeof define&&define.amd?define(["eve"],function(c){return b(a,c)}):b(a,a.eve)}(this,function(a,b){var c=function(b){var c={},d=a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame||a.oRequestAnimationFrame||a.msRequestAnimationFrame||function(a){setTimeout(a,16)},e=Array.isArray||function(a){return a instanceof Array||"[object Array]"==Object.prototype.toString.call(a)},f=0,g="M"+(+new Date).toString(36),h=function(){return g+(f++).toString(36)},i=Date.now||function(){return+new Date},j=function(a){var b=this;if(null==a)return b.s;var c=b.s-a;b.b+=b.dur*c,b.B+=b.dur*c,b.s=a},k=function(a){var b=this;return null==a?b.spd:void(b.spd=a)},l=function(a){var b=this;return null==a?b.dur:(b.s=b.s*a/b.dur,void(b.dur=a))},m=function(){var a=this;delete c[a.id],a.update(),b("mina.stop."+a.id,a)},n=function(){var a=this;a.pdif||(delete c[a.id],a.update(),a.pdif=a.get()-a.b)},o=function(){var a=this;a.pdif&&(a.b=a.get()-a.pdif,delete a.pdif,c[a.id]=a)},p=function(){var a,b=this;if(e(b.start)){a=[];for(var c=0,d=b.start.length;d>c;c++)a[c]=+b.start[c]+(b.end[c]-b.start[c])*b.easing(b.s)}else a=+b.start+(b.end-b.start)*b.easing(b.s);b.set(a)},q=function(){var a=0;for(var e in c)if(c.hasOwnProperty(e)){var f=c[e],g=f.get();a++,f.s=(g-f.b)/(f.dur/f.spd),f.s>=1&&(delete c[e],f.s=1,a--,function(a){setTimeout(function(){b("mina.finish."+a.id,a)})}(f)),f.update()}a&&d(q)},r=function(a,b,e,f,g,i,s){var t={id:h(),start:a,end:b,b:e,s:0,dur:f-e,spd:1,get:g,set:i,easing:s||r.linear,status:j,speed:k,duration:l,stop:m,pause:n,resume:o,update:p};c[t.id]=t;var u,v=0;for(u in c)if(c.hasOwnProperty(u)&&(v++,2==v))break;return 1==v&&d(q),t};return r.time=i,r.getById=function(a){return c[a]||null},r.linear=function(a){return a},r.easeout=function(a){return Math.pow(a,1.7)},r.easein=function(a){return Math.pow(a,.48)},r.easeinout=function(a){if(1==a)return 1;if(0==a)return 0;var b=.48-a/1.04,c=Math.sqrt(.1734+b*b),d=c-b,e=Math.pow(Math.abs(d),1/3)*(0>d?-1:1),f=-c-b,g=Math.pow(Math.abs(f),1/3)*(0>f?-1:1),h=e+g+.5;return 3*(1-h)*h*h+h*h*h},r.backin=function(a){if(1==a)return 1;var b=1.70158;return a*a*((b+1)*a-b)},r.backout=function(a){if(0==a)return 0;a-=1;var b=1.70158;return a*a*((b+1)*a+b)+1},r.elastic=function(a){return a==!!a?a:Math.pow(2,-10*a)*Math.sin(2*(a-.075)*Math.PI/.3)+1},r.bounce=function(a){var b,c=7.5625,d=2.75;return 1/d>a?b=c*a*a:2/d>a?(a-=1.5/d,b=c*a*a+.75):2.5/d>a?(a-=2.25/d,b=c*a*a+.9375):(a-=2.625/d,b=c*a*a+.984375),b},a.mina=r,r}("undefined"==typeof b?function(){}:b),d=function(){function d(a,b){if(a){if(a.tagName)return y(a);if(f(a,"array")&&d.set)return d.set.apply(d,a);if(a instanceof u)return a;if(null==b)return a=z.doc.querySelector(a),y(a)}return a=null==a?"100%":a,b=null==b?"100%":b,new x(a,b)}function e(a,b){if(b){if("#text"==a&&(a=z.doc.createTextNode(b.text||"")),"string"==typeof a&&(a=e(a)),"string"==typeof b)return"xlink:"==b.substring(0,6)?a.getAttributeNS(W,b.substring(6)):"xml:"==b.substring(0,4)?a.getAttributeNS(X,b.substring(4)):a.getAttribute(b);for(var c in b)if(b[A](c)){var d=B(b[c]);d?"xlink:"==c.substring(0,6)?a.setAttributeNS(W,c.substring(6),d):"xml:"==c.substring(0,4)?a.setAttributeNS(X,c.substring(4),d):a.setAttribute(c,d):a.removeAttribute(c)}}else a=z.doc.createElementNS(X,a);return a}function f(a,b){return b=B.prototype.toLowerCase.call(b),"finite"==b?isFinite(a):"array"==b&&(a instanceof Array||Array.isArray&&Array.isArray(a))?!0:"null"==b&&null===a||b==typeof a&&null!==a||"object"==b&&a===Object(a)||L.call(a).slice(8,-1).toLowerCase()==b}function h(a){if("function"==typeof a||Object(a)!==a)return a;var b=new a.constructor;for(var c in a)a[A](c)&&(b[c]=h(a[c]));return b}function i(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return a.push(a.splice(c,1)[0])}function j(a,b,c){function d(){var e=Array.prototype.slice.call(arguments,0),f=e.join("␀"),g=d.cache=d.cache||{},h=d.count=d.count||[];return g[A](f)?(i(h,f),c?c(g[f]):g[f]):(h.length>=1e3&&delete g[h.shift()],h.push(f),g[f]=a.apply(b,e),c?c(g[f]):g[f])}return d}function k(a,b,c,d,e,f){if(null==e){var g=a-c,h=b-d;return g||h?(180+180*E.atan2(-h,-g)/I+360)%360:0}return k(a,b,e,f)-k(c,d,e,f)}function l(a){return a%360*I/180}function m(a){return 180*a/I%360}function n(a){var b=[];return a=a.replace(/(?:^|\s)(\w+)\(([^)]+)\)/g,function(a,c,d){return d=d.split(/\s*,\s*|\s+/),"rotate"==c&&1==d.length&&d.push(0,0),"scale"==c&&(d.length>2?d=d.slice(0,2):2==d.length&&d.push(0,0),1==d.length&&d.push(d[0],0,0)),b.push("skewX"==c?["m",1,0,E.tan(l(d[0])),1,0,0]:"skewY"==c?["m",1,E.tan(l(d[0])),0,1,0,0]:[c.charAt(0)].concat(d)),a}),b}function o(a,b){var c=eb(a),e=new d.Matrix;if(c)for(var f=0,g=c.length;g>f;f++){var h,i,j,k,l,m=c[f],n=m.length,o=B(m[0]).toLowerCase(),p=m[0]!=o,q=p?e.invert():0;"t"==o&&2==n?e.translate(m[1],0):"t"==o&&3==n?p?(h=q.x(0,0),i=q.y(0,0),j=q.x(m[1],m[2]),k=q.y(m[1],m[2]),e.translate(j-h,k-i)):e.translate(m[1],m[2]):"r"==o?2==n?(l=l||b,e.rotate(m[1],l.x+l.width/2,l.y+l.height/2)):4==n&&(p?(j=q.x(m[2],m[3]),k=q.y(m[2],m[3]),e.rotate(m[1],j,k)):e.rotate(m[1],m[2],m[3])):"s"==o?2==n||3==n?(l=l||b,e.scale(m[1],m[n-1],l.x+l.width/2,l.y+l.height/2)):4==n?p?(j=q.x(m[2],m[3]),k=q.y(m[2],m[3]),e.scale(m[1],m[1],j,k)):e.scale(m[1],m[1],m[2],m[3]):5==n&&(p?(j=q.x(m[3],m[4]),k=q.y(m[3],m[4]),e.scale(m[1],m[2],j,k)):e.scale(m[1],m[2],m[3],m[4])):"m"==o&&7==n&&e.add(m[1],m[2],m[3],m[4],m[5],m[6])}return e}function p(a,b){if(null==b){var c=!0;if(b=a.node.getAttribute("linearGradient"==a.type||"radialGradient"==a.type?"gradientTransform":"pattern"==a.type?"patternTransform":"transform"),!b)return new d.Matrix;b=n(b)}else b=d._.rgTransform.test(b)?B(b).replace(/\.{3}|\u2026/g,a._.transform||J):n(b),f(b,"array")&&(b=d.path?d.path.toString.call(b):B(b)),a._.transform=b;var e=o(b,a.getBBox(1));return c?e:void(a.matrix=e)}function q(a){var b=a.node.ownerSVGElement&&y(a.node.ownerSVGElement)||a.node.parentNode&&y(a.node.parentNode)||d.select("svg")||d(0,0),c=b.select("defs"),e=null==c?!1:c.node;return e||(e=w("defs",b.node).node),e}function r(a){return a.node.ownerSVGElement&&y(a.node.ownerSVGElement)||d.select("svg")}function s(a,b,c){function d(a){if(null==a)return J;if(a==+a)return a;e(j,{width:a});try{return j.getBBox().width}catch(b){return 0}}function f(a){if(null==a)return J;if(a==+a)return a;e(j,{height:a});try{return j.getBBox().height}catch(b){return 0}}function g(d,e){null==b?i[d]=e(a.attr(d)||0):d==b&&(i=e(null==c?a.attr(d)||0:c))}var h=r(a).node,i={},j=h.querySelector(".svg---mgr");switch(j||(j=e("rect"),e(j,{x:-9e9,y:-9e9,width:10,height:10,"class":"svg---mgr",fill:"none"}),h.appendChild(j)),a.type){case"rect":g("rx",d),g("ry",f);case"image":g("width",d),g("height",f);case"text":g("x",d),g("y",f);break;case"circle":g("cx",d),g("cy",f),g("r",d);break;case"ellipse":g("cx",d),g("cy",f),g("rx",d),g("ry",f);break;case"line":g("x1",d),g("x2",d),g("y1",f),g("y2",f);break;case"marker":g("refX",d),g("markerWidth",d),g("refY",f),g("markerHeight",f);break;case"radialGradient":g("fx",d),g("fy",f);break;case"tspan":g("dx",d),g("dy",f);break;default:g(b,d)}return h.removeChild(j),i}function t(a){f(a,"array")||(a=Array.prototype.slice.call(arguments,0));for(var b=0,c=0,d=this.node;this[b];)delete this[b++];for(b=0;b<a.length;b++)"set"==a[b].type?a[b].forEach(function(a){d.appendChild(a.node)}):d.appendChild(a[b].node);var e=d.childNodes;for(b=0;b<e.length;b++)this[c++]=y(e[b]);return this}function u(a){if(a.snap in Y)return Y[a.snap];var b,c=this.id=V();try{b=a.ownerSVGElement}catch(d){}if(this.node=a,b&&(this.paper=new x(b)),this.type=a.tagName,this.anims={},this._={transform:[]},a.snap=c,Y[c]=this,"g"==this.type&&(this.add=t),this.type in{g:1,mask:1,pattern:1})for(var e in x.prototype)x.prototype[A](e)&&(this[e]=x.prototype[e])}function v(a){this.node=a}function w(a,b){var c=e(a);b.appendChild(c);var d=y(c);return d}function x(a,b){var c,d,f,g=x.prototype;if(a&&"svg"==a.tagName){if(a.snap in Y)return Y[a.snap];var h=a.ownerDocument;c=new u(a),d=a.getElementsByTagName("desc")[0],f=a.getElementsByTagName("defs")[0],d||(d=e("desc"),d.appendChild(h.createTextNode("Created with Snap")),c.node.appendChild(d)),f||(f=e("defs"),c.node.appendChild(f)),c.defs=f;for(var i in g)g[A](i)&&(c[i]=g[i]);c.paper=c.root=c}else c=w("svg",z.doc.body),e(c.node,{height:b,version:1.1,width:a,xmlns:X});return c}function y(a){return a?a instanceof u||a instanceof v?a:a.tagName&&"svg"==a.tagName.toLowerCase()?new x(a):a.tagName&&"object"==a.tagName.toLowerCase()&&"image/svg+xml"==a.type?new x(a.contentDocument.getElementsByTagName("svg")[0]):new u(a):a}d.version="0.3.0",d.toString=function(){return"Snap v"+this.version},d._={};var z={win:a,doc:a.document};d._.glob=z;var A="hasOwnProperty",B=String,C=parseFloat,D=parseInt,E=Math,F=E.max,G=E.min,H=E.abs,I=(E.pow,E.PI),J=(E.round,""),K=" ",L=Object.prototype.toString,M=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i,N="	\n\f\r   ᠎             　\u2028\u2029",O=(d._.separator=new RegExp("[,"+N+"]+"),new RegExp("["+N+"]","g"),new RegExp("["+N+"]*,["+N+"]*")),P={hs:1,rg:1},Q=new RegExp("([a-z])["+N+",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?["+N+"]*,?["+N+"]*)+)","ig"),R=new RegExp("([rstm])["+N+",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?["+N+"]*,?["+N+"]*)+)","ig"),S=new RegExp("(-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?)["+N+"]*,?["+N+"]*","ig"),T=0,U="S"+(+new Date).toString(36),V=function(){return U+(T++).toString(36)},W="http://www.w3.org/1999/xlink",X="http://www.w3.org/2000/svg",Y={},Z=d.url=function(a){return"url('#"+a+"')"};d._.$=e,d._.id=V,d.format=function(){var a=/\{([^\}]+)\}/g,b=/(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,c=function(a,c,d){var e=d;return c.replace(b,function(a,b,c,d,f){b=b||d,e&&(b in e&&(e=e[b]),"function"==typeof e&&f&&(e=e()))}),e=(null==e||e==d?a:e)+""};return function(b,d){return B(b).replace(a,function(a,b){return c(a,b,d)})}}(),d._.clone=h,d._.cacher=j,d.rad=l,d.deg=m,d.angle=k,d.is=f,d.snapTo=function(a,b,c){if(c=f(c,"finite")?c:10,f(a,"array")){for(var d=a.length;d--;)if(H(a[d]-b)<=c)return a[d]}else{a=+a;var e=b%a;if(c>e)return b-e;if(e>a-c)return b-e+a}return b},d.getRGB=j(function(a){if(!a||(a=B(a)).indexOf("-")+1)return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:bb};if("none"==a)return{r:-1,g:-1,b:-1,hex:"none",toString:bb};if(!(P[A](a.toLowerCase().substring(0,2))||"#"==a.charAt())&&(a=$(a)),!a)return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:bb};var b,c,e,g,h,i,j=a.match(M);return j?(j[2]&&(e=D(j[2].substring(5),16),c=D(j[2].substring(3,5),16),b=D(j[2].substring(1,3),16)),j[3]&&(e=D((h=j[3].charAt(3))+h,16),c=D((h=j[3].charAt(2))+h,16),b=D((h=j[3].charAt(1))+h,16)),j[4]&&(i=j[4].split(O),b=C(i[0]),"%"==i[0].slice(-1)&&(b*=2.55),c=C(i[1]),"%"==i[1].slice(-1)&&(c*=2.55),e=C(i[2]),"%"==i[2].slice(-1)&&(e*=2.55),"rgba"==j[1].toLowerCase().slice(0,4)&&(g=C(i[3])),i[3]&&"%"==i[3].slice(-1)&&(g/=100)),j[5]?(i=j[5].split(O),b=C(i[0]),"%"==i[0].slice(-1)&&(b/=100),c=C(i[1]),"%"==i[1].slice(-1)&&(c/=100),e=C(i[2]),"%"==i[2].slice(-1)&&(e/=100),("deg"==i[0].slice(-3)||"°"==i[0].slice(-1))&&(b/=360),"hsba"==j[1].toLowerCase().slice(0,4)&&(g=C(i[3])),i[3]&&"%"==i[3].slice(-1)&&(g/=100),d.hsb2rgb(b,c,e,g)):j[6]?(i=j[6].split(O),b=C(i[0]),"%"==i[0].slice(-1)&&(b/=100),c=C(i[1]),"%"==i[1].slice(-1)&&(c/=100),e=C(i[2]),"%"==i[2].slice(-1)&&(e/=100),("deg"==i[0].slice(-3)||"°"==i[0].slice(-1))&&(b/=360),"hsla"==j[1].toLowerCase().slice(0,4)&&(g=C(i[3])),i[3]&&"%"==i[3].slice(-1)&&(g/=100),d.hsl2rgb(b,c,e,g)):(b=G(E.round(b),255),c=G(E.round(c),255),e=G(E.round(e),255),g=G(F(g,0),1),j={r:b,g:c,b:e,toString:bb},j.hex="#"+(16777216|e|c<<8|b<<16).toString(16).slice(1),j.opacity=f(g,"finite")?g:1,j)):{r:-1,g:-1,b:-1,hex:"none",error:1,toString:bb}},d),d.hsb=j(function(a,b,c){return d.hsb2rgb(a,b,c).hex}),d.hsl=j(function(a,b,c){return d.hsl2rgb(a,b,c).hex}),d.rgb=j(function(a,b,c,d){if(f(d,"finite")){var e=E.round;return"rgba("+[e(a),e(b),e(c),+d.toFixed(2)]+")"}return"#"+(16777216|c|b<<8|a<<16).toString(16).slice(1)});var $=function(a){var b=z.doc.getElementsByTagName("head")[0]||z.doc.getElementsByTagName("svg")[0],c="rgb(255, 0, 0)";return($=j(function(a){if("red"==a.toLowerCase())return c;b.style.color=c,b.style.color=a;var d=z.doc.defaultView.getComputedStyle(b,J).getPropertyValue("color");return d==c?null:d}))(a)},_=function(){return"hsb("+[this.h,this.s,this.b]+")"},ab=function(){return"hsl("+[this.h,this.s,this.l]+")"},bb=function(){return 1==this.opacity||null==this.opacity?this.hex:"rgba("+[this.r,this.g,this.b,this.opacity]+")"},cb=function(a,b,c){if(null==b&&f(a,"object")&&"r"in a&&"g"in a&&"b"in a&&(c=a.b,b=a.g,a=a.r),null==b&&f(a,string)){var e=d.getRGB(a);a=e.r,b=e.g,c=e.b}return(a>1||b>1||c>1)&&(a/=255,b/=255,c/=255),[a,b,c]},db=function(a,b,c,e){a=E.round(255*a),b=E.round(255*b),c=E.round(255*c);var g={r:a,g:b,b:c,opacity:f(e,"finite")?e:1,hex:d.rgb(a,b,c),toString:bb};return f(e,"finite")&&(g.opacity=e),g};d.color=function(a){var b;return f(a,"object")&&"h"in a&&"s"in a&&"b"in a?(b=d.hsb2rgb(a),a.r=b.r,a.g=b.g,a.b=b.b,a.opacity=1,a.hex=b.hex):f(a,"object")&&"h"in a&&"s"in a&&"l"in a?(b=d.hsl2rgb(a),a.r=b.r,a.g=b.g,a.b=b.b,a.opacity=1,a.hex=b.hex):(f(a,"string")&&(a=d.getRGB(a)),f(a,"object")&&"r"in a&&"g"in a&&"b"in a&&!("error"in a)?(b=d.rgb2hsl(a),a.h=b.h,a.s=b.s,a.l=b.l,b=d.rgb2hsb(a),a.v=b.b):(a={hex:"none"},a.r=a.g=a.b=a.h=a.s=a.v=a.l=-1,a.error=1)),a.toString=bb,a},d.hsb2rgb=function(a,b,c,d){f(a,"object")&&"h"in a&&"s"in a&&"b"in a&&(c=a.b,b=a.s,a=a.h,d=a.o),a*=360;var e,g,h,i,j;return a=a%360/60,j=c*b,i=j*(1-H(a%2-1)),e=g=h=c-j,a=~~a,e+=[j,i,0,0,i,j][a],g+=[i,j,j,i,0,0][a],h+=[0,0,i,j,j,i][a],db(e,g,h,d)},d.hsl2rgb=function(a,b,c,d){f(a,"object")&&"h"in a&&"s"in a&&"l"in a&&(c=a.l,b=a.s,a=a.h),(a>1||b>1||c>1)&&(a/=360,b/=100,c/=100),a*=360;var e,g,h,i,j;return a=a%360/60,j=2*b*(.5>c?c:1-c),i=j*(1-H(a%2-1)),e=g=h=c-j/2,a=~~a,e+=[j,i,0,0,i,j][a],g+=[i,j,j,i,0,0][a],h+=[0,0,i,j,j,i][a],db(e,g,h,d)},d.rgb2hsb=function(a,b,c){c=cb(a,b,c),a=c[0],b=c[1],c=c[2];var d,e,f,g;return f=F(a,b,c),g=f-G(a,b,c),d=0==g?null:f==a?(b-c)/g:f==b?(c-a)/g+2:(a-b)/g+4,d=(d+360)%6*60/360,e=0==g?0:g/f,{h:d,s:e,b:f,toString:_}},d.rgb2hsl=function(a,b,c){c=cb(a,b,c),a=c[0],b=c[1],c=c[2];var d,e,f,g,h,i;return g=F(a,b,c),h=G(a,b,c),i=g-h,d=0==i?null:g==a?(b-c)/i:g==b?(c-a)/i+2:(a-b)/i+4,d=(d+360)%6*60/360,f=(g+h)/2,e=0==i?0:.5>f?i/(2*f):i/(2-2*f),{h:d,s:e,l:f,toString:ab}},d.parsePathString=function(a){if(!a)return null;var b=d.path(a);if(b.arr)return d.path.clone(b.arr);var c={a:7,c:6,o:2,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,u:3,z:0},e=[];return f(a,"array")&&f(a[0],"array")&&(e=d.path.clone(a)),e.length||B(a).replace(Q,function(a,b,d){var f=[],g=b.toLowerCase();if(d.replace(S,function(a,b){b&&f.push(+b)}),"m"==g&&f.length>2&&(e.push([b].concat(f.splice(0,2))),g="l",b="m"==b?"l":"L"),"o"==g&&1==f.length&&e.push([b,f[0]]),"r"==g)e.push([b].concat(f));else for(;f.length>=c[g]&&(e.push([b].concat(f.splice(0,c[g]))),c[g]););}),e.toString=d.path.toString,b.arr=d.path.clone(e),e};var eb=d.parseTransformString=function(a){if(!a)return null;var b=[];return f(a,"array")&&f(a[0],"array")&&(b=d.path.clone(a)),b.length||B(a).replace(R,function(a,c,d){{var e=[];c.toLowerCase()}d.replace(S,function(a,b){b&&e.push(+b)}),b.push([c].concat(e))}),b.toString=d.path.toString,b};d._.svgTransform2string=n,d._.rgTransform=new RegExp("^[a-z]["+N+"]*-?\\.?\\d","i"),d._.transform2matrix=o,d._unit2px=s;z.doc.contains||z.doc.compareDocumentPosition?function(a,b){var c=9==a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a==d||!(!d||1!=d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)for(;b;)if(b=b.parentNode,b==a)return!0;return!1};d._.getSomeDefs=q,d._.getSomeSVG=r,d.select=function(a){return y(z.doc.querySelector(a))},d.selectAll=function(a){for(var b=z.doc.querySelectorAll(a),c=(d.set||Array)(),e=0;e<b.length;e++)c.push(y(b[e]));return c},setInterval(function(){for(var a in Y)if(Y[A](a)){var b=Y[a],c=b.node;("svg"!=b.type&&!c.ownerSVGElement||"svg"==b.type&&(!c.parentNode||"ownerSVGElement"in c.parentNode&&!c.ownerSVGElement))&&delete Y[a]}},1e4),function(a){function g(a){function b(a,b){var c=e(a.node,b);c=c&&c.match(g),c=c&&c[2],c&&"#"==c.charAt()&&(c=c.substring(1),c&&(i[c]=(i[c]||[]).concat(function(c){var d={};d[b]=Z(c),e(a.node,d)})))}function c(a){var b=e(a.node,"xlink:href");b&&"#"==b.charAt()&&(b=b.substring(1),b&&(i[b]=(i[b]||[]).concat(function(b){a.attr("xlink:href","#"+b)})))}for(var d,f=a.selectAll("*"),g=/^\s*url\(("|'|)(.*)\1\)\s*$/,h=[],i={},j=0,k=f.length;k>j;j++){d=f[j],b(d,"fill"),b(d,"stroke"),b(d,"filter"),b(d,"mask"),b(d,"clip-path"),c(d);var l=e(d.node,"id");l&&(e(d.node,{id:d.id}),h.push({old:l,id:d.id}))}for(j=0,k=h.length;k>j;j++){var m=i[h[j].old];if(m)for(var n=0,o=m.length;o>n;n++)m[n](h[j].id)}}function h(a,b,c){return function(d){var e=d.slice(a,b);return 1==e.length&&(e=e[0]),c?c(e):e}}function i(a){return function(){var b=a?"<"+this.type:"",c=this.node.attributes,d=this.node.childNodes;if(a)for(var e=0,f=c.length;f>e;e++)b+=" "+c[e].name+'="'+c[e].value.replace(/"/g,'\\"')+'"';if(d.length){for(a&&(b+=">"),e=0,f=d.length;f>e;e++)3==d[e].nodeType?b+=d[e].nodeValue:1==d[e].nodeType&&(b+=y(d[e]).toString());a&&(b+="</"+this.type+">")}else a&&(b+="/>");return b}}a.attr=function(a,c){{var d=this;d.node}if(!a)return d;if(f(a,"string")){if(!(arguments.length>1))return b("snap.util.getattr."+a,d).firstDefined();var e={};e[a]=c,a=e}for(var g in a)a[A](g)&&b("snap.util.attr."+g,d,a[g]);return d},a.getBBox=function(a){if(!d.Matrix||!d.path)return this.node.getBBox();var b=this,c=new d.Matrix;if(b.removed)return d._.box();for(;"use"==b.type;)if(a||(c=c.add(b.transform().localMatrix.translate(b.attr("x")||0,b.attr("y")||0))),b.original)b=b.original;else{var e=b.attr("xlink:href");b=b.original=b.node.ownerDocument.getElementById(e.substring(e.indexOf("#")+1))}var f=b._,g=d.path.get[b.type]||d.path.get.deflt;try{return a?(f.bboxwt=g?d.path.getBBox(b.realPath=g(b)):d._.box(b.node.getBBox()),d._.box(f.bboxwt)):(b.realPath=g(b),b.matrix=b.transform().localMatrix,f.bbox=d.path.getBBox(d.path.map(b.realPath,c.add(b.matrix))),d._.box(f.bbox))}catch(h){return d._.box()}};var j=function(){return this.string};a.transform=function(a){var b=this._;if(null==a){for(var c,f=this,g=new d.Matrix(this.node.getCTM()),h=p(this),i=[h],k=new d.Matrix,l=h.toTransformString(),m=B(h)==B(this.matrix)?B(b.transform):l;"svg"!=f.type&&(f=f.parent());)i.push(p(f));for(c=i.length;c--;)k.add(i[c]);return{string:m,globalMatrix:g,totalMatrix:k,localMatrix:h,diffMatrix:g.clone().add(h.invert()),global:g.toTransformString(),total:k.toTransformString(),local:l,toString:j}}return a instanceof d.Matrix?this.matrix=a:p(this,a),this.node&&("linearGradient"==this.type||"radialGradient"==this.type?e(this.node,{gradientTransform:this.matrix}):"pattern"==this.type?e(this.node,{patternTransform:this.matrix}):e(this.node,{transform:this.matrix})),this},a.parent=function(){return y(this.node.parentNode)},a.append=a.add=function(a){if(a){if("set"==a.type){var b=this;return a.forEach(function(a){b.add(a)}),this}a=y(a),this.node.appendChild(a.node),a.paper=this.paper}return this},a.appendTo=function(a){return a&&(a=y(a),a.append(this)),this},a.prepend=function(a){if(a){if("set"==a.type){var b,c=this;return a.forEach(function(a){b?b.after(a):c.prepend(a),b=a}),this}a=y(a);var d=a.parent();this.node.insertBefore(a.node,this.node.firstChild),this.add&&this.add(),a.paper=this.paper,this.parent()&&this.parent().add(),d&&d.add()}return this},a.prependTo=function(a){return a=y(a),a.prepend(this),this},a.before=function(a){if("set"==a.type){var b=this;return a.forEach(function(a){var c=a.parent();b.node.parentNode.insertBefore(a.node,b.node),c&&c.add()}),this.parent().add(),this}a=y(a);var c=a.parent();return this.node.parentNode.insertBefore(a.node,this.node),this.parent()&&this.parent().add(),c&&c.add(),a.paper=this.paper,this},a.after=function(a){a=y(a);var b=a.parent();return this.node.nextSibling?this.node.parentNode.insertBefore(a.node,this.node.nextSibling):this.node.parentNode.appendChild(a.node),this.parent()&&this.parent().add(),b&&b.add(),a.paper=this.paper,this},a.insertBefore=function(a){a=y(a);var b=this.parent();return a.node.parentNode.insertBefore(this.node,a.node),this.paper=a.paper,b&&b.add(),a.parent()&&a.parent().add(),this},a.insertAfter=function(a){a=y(a);var b=this.parent();return a.node.parentNode.insertBefore(this.node,a.node.nextSibling),this.paper=a.paper,b&&b.add(),a.parent()&&a.parent().add(),this},a.remove=function(){var a=this.parent();return this.node.parentNode&&this.node.parentNode.removeChild(this.node),delete this.paper,this.removed=!0,a&&a.add(),this},a.select=function(a){return y(this.node.querySelector(a))},a.selectAll=function(a){for(var b=this.node.querySelectorAll(a),c=(d.set||Array)(),e=0;e<b.length;e++)c.push(y(b[e]));return c},a.asPX=function(a,b){return null==b&&(b=this.attr(a)),+s(this,a,b)},a.use=function(){var a,b=this.node.id;return b||(b=this.id,e(this.node,{id:b})),a="linearGradient"==this.type||"radialGradient"==this.type||"pattern"==this.type?w(this.type,this.node.parentNode):w("use",this.node.parentNode),e(a.node,{"xlink:href":"#"+b}),a.original=this,a};var k=/\S+/g;a.addClass=function(a){var b,c,d,e,f=(a||"").match(k)||[],g=this.node,h=g.className.baseVal,i=h.match(k)||[];if(f.length){for(b=0;d=f[b++];)c=i.indexOf(d),~c||i.push(d);e=i.join(" "),h!=e&&(g.className.baseVal=e)}return this},a.removeClass=function(a){var b,c,d,e,f=(a||"").match(k)||[],g=this.node,h=g.className.baseVal,i=h.match(k)||[];if(i.length){for(b=0;d=f[b++];)c=i.indexOf(d),~c&&i.splice(c,1);e=i.join(" "),h!=e&&(g.className.baseVal=e)}return this},a.hasClass=function(a){var b=this.node,c=b.className.baseVal,d=c.match(k)||[];return!!~d.indexOf(a)},a.toggleClass=function(a,b){if(null!=b)return b?this.addClass(a):this.removeClass(a);var c,d,e,f,g=(a||"").match(k)||[],h=this.node,i=h.className.baseVal,j=i.match(k)||[];for(c=0;e=g[c++];)d=j.indexOf(e),~d?j.splice(d,1):j.push(e);return f=j.join(" "),i!=f&&(h.className.baseVal=f),this},a.clone=function(){var a=y(this.node.cloneNode(!0));return e(a.node,"id")&&e(a.node,{id:a.id}),g(a),a.insertAfter(this),a},a.toDefs=function(){var a=q(this);return a.appendChild(this.node),this},a.pattern=a.toPattern=function(a,b,c,d){var g=w("pattern",q(this));return null==a&&(a=this.getBBox()),f(a,"object")&&"x"in a&&(b=a.y,c=a.width,d=a.height,a=a.x),e(g.node,{x:a,y:b,width:c,height:d,patternUnits:"userSpaceOnUse",id:g.id,viewBox:[a,b,c,d].join(" ")}),g.node.appendChild(this.node),g},a.marker=function(a,b,c,d,g,h){var i=w("marker",q(this));return null==a&&(a=this.getBBox()),f(a,"object")&&"x"in a&&(b=a.y,c=a.width,d=a.height,g=a.refX||a.cx,h=a.refY||a.cy,a=a.x),e(i.node,{viewBox:[a,b,c,d].join(K),markerWidth:c,markerHeight:d,orient:"auto",refX:g||0,refY:h||0,id:i.id}),i.node.appendChild(this.node),i};var l=function(a,b,d,e){"function"!=typeof d||d.length||(e=d,d=c.linear),this.attr=a,this.dur=b,d&&(this.easing=d),e&&(this.callback=e)};d._.Animation=l,d.animation=function(a,b,c,d){return new l(a,b,c,d)},a.inAnim=function(){var a=this,b=[];for(var c in a.anims)a.anims[A](c)&&!function(a){b.push({anim:new l(a._attrs,a.dur,a.easing,a._callback),mina:a,curStatus:a.status(),status:function(b){return a.status(b)},stop:function(){a.stop()}})}(a.anims[c]);return b},d.animate=function(a,d,e,f,g,h){"function"!=typeof g||g.length||(h=g,g=c.linear);var i=c.time(),j=c(a,d,i,i+f,c.time,e,g);return h&&b.once("mina.finish."+j.id,h),j},a.stop=function(){for(var a=this.inAnim(),b=0,c=a.length;c>b;b++)a[b].stop();return this},a.animate=function(a,d,e,g){"function"!=typeof e||e.length||(g=e,e=c.linear),a instanceof l&&(g=a.callback,e=a.easing,d=e.dur,a=a.attr);var i,j,k,m,n=[],o=[],p={},q=this;for(var r in a)if(a[A](r)){q.equal?(m=q.equal(r,B(a[r])),i=m.from,j=m.to,k=m.f):(i=+q.attr(r),j=+a[r]);var s=f(i,"array")?i.length:1;p[r]=h(n.length,n.length+s,k),n=n.concat(i),o=o.concat(j)}var t=c.time(),u=c(n,o,t,t+d,c.time,function(a){var b={};for(var c in p)p[A](c)&&(b[c]=p[c](a));q.attr(b)},e);return q.anims[u.id]=u,u._attrs=a,u._callback=g,b("snap.animcreated."+q.id,u),b.once("mina.finish."+u.id,function(){delete q.anims[u.id],g&&g.call(q)}),b.once("mina.stop."+u.id,function(){delete q.anims[u.id]}),q};var m={};a.data=function(a,c){var e=m[this.id]=m[this.id]||{};if(0==arguments.length)return b("snap.data.get."+this.id,this,e,null),e;if(1==arguments.length){if(d.is(a,"object")){for(var f in a)a[A](f)&&this.data(f,a[f]);return this}return b("snap.data.get."+this.id,this,e[a],a),e[a]}return e[a]=c,b("snap.data.set."+this.id,this,c,a),this},a.removeData=function(a){return null==a?m[this.id]={}:m[this.id]&&delete m[this.id][a],this},a.outerSVG=a.toString=i(1),a.innerSVG=i()}(u.prototype),d.parse=function(a){var b=z.doc.createDocumentFragment(),c=!0,d=z.doc.createElement("div");if(a=B(a),a.match(/^\s*<\s*svg(?:\s|>)/)||(a="<svg>"+a+"</svg>",c=!1),d.innerHTML=a,a=d.getElementsByTagName("svg")[0])if(c)b=a;else for(;a.firstChild;)b.appendChild(a.firstChild);return d.innerHTML=J,new v(b)},v.prototype.select=u.prototype.select,v.prototype.selectAll=u.prototype.selectAll,d.fragment=function(){for(var a=Array.prototype.slice.call(arguments,0),b=z.doc.createDocumentFragment(),c=0,e=a.length;e>c;c++){var f=a[c];f.node&&f.node.nodeType&&b.appendChild(f.node),f.nodeType&&b.appendChild(f),"string"==typeof f&&b.appendChild(d.parse(f).node)}return new v(b)},d._.make=w,d._.wrap=y,x.prototype.el=function(a,b){var c=w(a,this.node);return b&&c.attr(b),c},b.on("snap.util.getattr",function(){var a=b.nt();a=a.substring(a.lastIndexOf(".")+1);var c=a.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()});return fb[A](c)?this.node.ownerDocument.defaultView.getComputedStyle(this.node,null).getPropertyValue(c):e(this.node,a)});var fb={"alignment-baseline":0,"baseline-shift":0,clip:0,"clip-path":0,"clip-rule":0,color:0,"color-interpolation":0,"color-interpolation-filters":0,"color-profile":0,"color-rendering":0,cursor:0,direction:0,display:0,"dominant-baseline":0,"enable-background":0,fill:0,"fill-opacity":0,"fill-rule":0,filter:0,"flood-color":0,"flood-opacity":0,font:0,"font-family":0,"font-size":0,"font-size-adjust":0,"font-stretch":0,"font-style":0,"font-variant":0,"font-weight":0,"glyph-orientation-horizontal":0,"glyph-orientation-vertical":0,"image-rendering":0,kerning:0,"letter-spacing":0,"lighting-color":0,marker:0,"marker-end":0,"marker-mid":0,"marker-start":0,mask:0,opacity:0,overflow:0,"pointer-events":0,"shape-rendering":0,"stop-color":0,"stop-opacity":0,stroke:0,"stroke-dasharray":0,"stroke-dashoffset":0,"stroke-linecap":0,"stroke-linejoin":0,"stroke-miterlimit":0,"stroke-opacity":0,"stroke-width":0,"text-anchor":0,"text-decoration":0,"text-rendering":0,"unicode-bidi":0,visibility:0,"word-spacing":0,"writing-mode":0};b.on("snap.util.attr",function(a){var c=b.nt(),d={};c=c.substring(c.lastIndexOf(".")+1),d[c]=a;var f=c.replace(/-(\w)/gi,function(a,b){return b.toUpperCase()}),g=c.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()});fb[A](g)?this.node.style[f]=null==a?J:a:e(this.node,d)}),function(){}(x.prototype),d.ajax=function(a,c,d,e){var g=new XMLHttpRequest,h=V();if(g){if(f(c,"function"))e=d,d=c,c=null;else if(f(c,"object")){var i=[];for(var j in c)c.hasOwnProperty(j)&&i.push(encodeURIComponent(j)+"="+encodeURIComponent(c[j]));c=i.join("&")}return g.open(c?"POST":"GET",a,!0),c&&(g.setRequestHeader("X-Requested-With","XMLHttpRequest"),g.setRequestHeader("Content-type","application/x-www-form-urlencoded")),d&&(b.once("snap.ajax."+h+".0",d),b.once("snap.ajax."+h+".200",d),b.once("snap.ajax."+h+".304",d)),g.onreadystatechange=function(){4==g.readyState&&b("snap.ajax."+h+"."+g.status,e,g)},4==g.readyState?g:(g.send(c),g)}},d.load=function(a,b,c){d.ajax(a,function(a){var e=d.parse(a.responseText);c?b.call(c,e):b(e)})};var gb=function(a){var b=a.getBoundingClientRect(),c=a.ownerDocument,d=c.body,e=c.documentElement,f=e.clientTop||d.clientTop||0,h=e.clientLeft||d.clientLeft||0,i=b.top+(g.win.pageYOffset||e.scrollTop||d.scrollTop)-f,j=b.left+(g.win.pageXOffset||e.scrollLeft||d.scrollLeft)-h;return{y:i,x:j}};return d.getElementByPoint=function(a,b){var c=this,d=(c.canvas,z.doc.elementFromPoint(a,b));if(z.win.opera&&"svg"==d.tagName){var e=gb(d),f=d.createSVGRect();f.x=a-e.x,f.y=b-e.y,f.width=f.height=1;var g=d.getIntersectionList(f,null);g.length&&(d=g[g.length-1])}return d?y(d):null},d.plugin=function(a){a(d,u,x,z,v)},z.win.Snap=d,d}();return d.plugin(function(a){function b(a,b,d,e,f,g){return null==b&&"[object SVGMatrix]"==c.call(a)?(this.a=a.a,this.b=a.b,this.c=a.c,this.d=a.d,this.e=a.e,void(this.f=a.f)):void(null!=a?(this.a=+a,this.b=+b,this.c=+d,this.d=+e,this.e=+f,this.f=+g):(this.a=1,this.b=0,this.c=0,this.d=1,this.e=0,this.f=0))}var c=Object.prototype.toString,d=String,e=Math,f="";!function(c){function g(a){return a[0]*a[0]+a[1]*a[1]
}function h(a){var b=e.sqrt(g(a));a[0]&&(a[0]/=b),a[1]&&(a[1]/=b)}c.add=function(a,c,d,e,f,g){var h,i,j,k,l=[[],[],[]],m=[[this.a,this.c,this.e],[this.b,this.d,this.f],[0,0,1]],n=[[a,d,f],[c,e,g],[0,0,1]];for(a&&a instanceof b&&(n=[[a.a,a.c,a.e],[a.b,a.d,a.f],[0,0,1]]),h=0;3>h;h++)for(i=0;3>i;i++){for(k=0,j=0;3>j;j++)k+=m[h][j]*n[j][i];l[h][i]=k}return this.a=l[0][0],this.b=l[1][0],this.c=l[0][1],this.d=l[1][1],this.e=l[0][2],this.f=l[1][2],this},c.invert=function(){var a=this,c=a.a*a.d-a.b*a.c;return new b(a.d/c,-a.b/c,-a.c/c,a.a/c,(a.c*a.f-a.d*a.e)/c,(a.b*a.e-a.a*a.f)/c)},c.clone=function(){return new b(this.a,this.b,this.c,this.d,this.e,this.f)},c.translate=function(a,b){return this.add(1,0,0,1,a,b)},c.scale=function(a,b,c,d){return null==b&&(b=a),(c||d)&&this.add(1,0,0,1,c,d),this.add(a,0,0,b,0,0),(c||d)&&this.add(1,0,0,1,-c,-d),this},c.rotate=function(b,c,d){b=a.rad(b),c=c||0,d=d||0;var f=+e.cos(b).toFixed(9),g=+e.sin(b).toFixed(9);return this.add(f,g,-g,f,c,d),this.add(1,0,0,1,-c,-d)},c.x=function(a,b){return a*this.a+b*this.c+this.e},c.y=function(a,b){return a*this.b+b*this.d+this.f},c.get=function(a){return+this[d.fromCharCode(97+a)].toFixed(4)},c.toString=function(){return"matrix("+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)].join()+")"},c.offset=function(){return[this.e.toFixed(4),this.f.toFixed(4)]},c.determinant=function(){return this.a*this.d-this.b*this.c},c.split=function(){var b={};b.dx=this.e,b.dy=this.f;var c=[[this.a,this.c],[this.b,this.d]];b.scalex=e.sqrt(g(c[0])),h(c[0]),b.shear=c[0][0]*c[1][0]+c[0][1]*c[1][1],c[1]=[c[1][0]-c[0][0]*b.shear,c[1][1]-c[0][1]*b.shear],b.scaley=e.sqrt(g(c[1])),h(c[1]),b.shear/=b.scaley,this.determinant()<0&&(b.scalex=-b.scalex);var d=-c[0][1],f=c[1][1];return 0>f?(b.rotate=a.deg(e.acos(f)),0>d&&(b.rotate=360-b.rotate)):b.rotate=a.deg(e.asin(d)),b.isSimple=!(+b.shear.toFixed(9)||b.scalex.toFixed(9)!=b.scaley.toFixed(9)&&b.rotate),b.isSuperSimple=!+b.shear.toFixed(9)&&b.scalex.toFixed(9)==b.scaley.toFixed(9)&&!b.rotate,b.noRotation=!+b.shear.toFixed(9)&&!b.rotate,b},c.toTransformString=function(a){var b=a||this.split();return+b.shear.toFixed(9)?"m"+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)]:(b.scalex=+b.scalex.toFixed(4),b.scaley=+b.scaley.toFixed(4),b.rotate=+b.rotate.toFixed(4),(b.dx||b.dy?"t"+[+b.dx.toFixed(4),+b.dy.toFixed(4)]:f)+(1!=b.scalex||1!=b.scaley?"s"+[b.scalex,b.scaley,0,0]:f)+(b.rotate?"r"+[+b.rotate.toFixed(4),0,0]:f))}}(b.prototype),a.Matrix=b,a.matrix=function(a,c,d,e,f,g){return new b(a,c,d,e,f,g)}}),d.plugin(function(a,c,d,e,f){function g(d){return function(e){if(b.stop(),e instanceof f&&1==e.node.childNodes.length&&("radialGradient"==e.node.firstChild.tagName||"linearGradient"==e.node.firstChild.tagName||"pattern"==e.node.firstChild.tagName)&&(e=e.node.firstChild,n(this).appendChild(e),e=l(e)),e instanceof c)if("radialGradient"==e.type||"linearGradient"==e.type||"pattern"==e.type){e.node.id||p(e.node,{id:e.id});var g=q(e.node.id)}else g=e.attr(d);else if(g=a.color(e),g.error){var h=a(n(this).ownerSVGElement).gradient(e);h?(h.node.id||p(h.node,{id:h.id}),g=q(h.node.id)):g=e}else g=r(g);var i={};i[d]=g,p(this.node,i),this.node.style[d]=t}}function h(a){b.stop(),a==+a&&(a+="px"),this.node.style.fontSize=a}function i(a){for(var b=[],c=a.childNodes,d=0,e=c.length;e>d;d++){var f=c[d];3==f.nodeType&&b.push(f.nodeValue),"tspan"==f.tagName&&b.push(1==f.childNodes.length&&3==f.firstChild.nodeType?f.firstChild.nodeValue:i(f))}return b}function j(){return b.stop(),this.node.style.fontSize}var k=a._.make,l=a._.wrap,m=a.is,n=a._.getSomeDefs,o=/^url\(#?([^)]+)\)$/,p=a._.$,q=a.url,r=String,s=a._.separator,t="";b.on("snap.util.attr.mask",function(a){if(a instanceof c||a instanceof f){if(b.stop(),a instanceof f&&1==a.node.childNodes.length&&(a=a.node.firstChild,n(this).appendChild(a),a=l(a)),"mask"==a.type)var d=a;else d=k("mask",n(this)),d.node.appendChild(a.node);!d.node.id&&p(d.node,{id:d.id}),p(this.node,{mask:q(d.id)})}}),function(a){b.on("snap.util.attr.clip",a),b.on("snap.util.attr.clip-path",a),b.on("snap.util.attr.clipPath",a)}(function(a){if(a instanceof c||a instanceof f){if(b.stop(),"clipPath"==a.type)var d=a;else d=k("clipPath",n(this)),d.node.appendChild(a.node),!d.node.id&&p(d.node,{id:d.id});p(this.node,{"clip-path":q(d.id)})}}),b.on("snap.util.attr.fill",g("fill")),b.on("snap.util.attr.stroke",g("stroke"));var u=/^([lr])(?:\(([^)]*)\))?(.*)$/i;b.on("snap.util.grad.parse",function(a){a=r(a);var b=a.match(u);if(!b)return null;var c=b[1],d=b[2],e=b[3];return d=d.split(/\s*,\s*/).map(function(a){return+a==a?+a:a}),1==d.length&&0==d[0]&&(d=[]),e=e.split("-"),e=e.map(function(a){a=a.split(":");var b={color:a[0]};return a[1]&&(b.offset=parseFloat(a[1])),b}),{type:c,params:d,stops:e}}),b.on("snap.util.attr.d",function(c){b.stop(),m(c,"array")&&m(c[0],"array")&&(c=a.path.toString.call(c)),c=r(c),c.match(/[ruo]/i)&&(c=a.path.toAbsolute(c)),p(this.node,{d:c})})(-1),b.on("snap.util.attr.#text",function(a){b.stop(),a=r(a);for(var c=e.doc.createTextNode(a);this.node.firstChild;)this.node.removeChild(this.node.firstChild);this.node.appendChild(c)})(-1),b.on("snap.util.attr.path",function(a){b.stop(),this.attr({d:a})})(-1),b.on("snap.util.attr.class",function(a){b.stop(),this.node.className.baseVal=a})(-1),b.on("snap.util.attr.viewBox",function(a){var c;c=m(a,"object")&&"x"in a?[a.x,a.y,a.width,a.height].join(" "):m(a,"array")?a.join(" "):a,p(this.node,{viewBox:c}),b.stop()})(-1),b.on("snap.util.attr.transform",function(a){this.transform(a),b.stop()})(-1),b.on("snap.util.attr.r",function(a){"rect"==this.type&&(b.stop(),p(this.node,{rx:a,ry:a}))})(-1),b.on("snap.util.attr.textpath",function(a){if(b.stop(),"text"==this.type){var d,e,f;if(!a&&this.textPath){for(e=this.textPath;e.node.firstChild;)this.node.appendChild(e.node.firstChild);return e.remove(),void delete this.textPath}if(m(a,"string")){var g=n(this),h=l(g.parentNode).path(a);g.appendChild(h.node),d=h.id,h.attr({id:d})}else a=l(a),a instanceof c&&(d=a.attr("id"),d||(d=a.id,a.attr({id:d})));if(d)if(e=this.textPath,f=this.node,e)e.attr({"xlink:href":"#"+d});else{for(e=p("textPath",{"xlink:href":"#"+d});f.firstChild;)e.appendChild(f.firstChild);f.appendChild(e),this.textPath=l(e)}}})(-1),b.on("snap.util.attr.text",function(a){if("text"==this.type){for(var c=this.node,d=function(a){var b=p("tspan");if(m(a,"array"))for(var c=0;c<a.length;c++)b.appendChild(d(a[c]));else b.appendChild(e.doc.createTextNode(a));return b.normalize&&b.normalize(),b};c.firstChild;)c.removeChild(c.firstChild);for(var f=d(a);f.firstChild;)c.appendChild(f.firstChild)}b.stop()})(-1),b.on("snap.util.attr.fontSize",h)(-1),b.on("snap.util.attr.font-size",h)(-1),b.on("snap.util.getattr.transform",function(){return b.stop(),this.transform()})(-1),b.on("snap.util.getattr.textpath",function(){return b.stop(),this.textPath})(-1),function(){function c(c){return function(){b.stop();var d=e.doc.defaultView.getComputedStyle(this.node,null).getPropertyValue("marker-"+c);return"none"==d?d:a(e.doc.getElementById(d.match(o)[1]))}}function d(a){return function(c){b.stop();var d="marker"+a.charAt(0).toUpperCase()+a.substring(1);if(""==c||!c)return void(this.node.style[d]="none");if("marker"==c.type){var e=c.node.id;return e||p(c.node,{id:c.id}),void(this.node.style[d]=q(e))}}}b.on("snap.util.getattr.marker-end",c("end"))(-1),b.on("snap.util.getattr.markerEnd",c("end"))(-1),b.on("snap.util.getattr.marker-start",c("start"))(-1),b.on("snap.util.getattr.markerStart",c("start"))(-1),b.on("snap.util.getattr.marker-mid",c("mid"))(-1),b.on("snap.util.getattr.markerMid",c("mid"))(-1),b.on("snap.util.attr.marker-end",d("end"))(-1),b.on("snap.util.attr.markerEnd",d("end"))(-1),b.on("snap.util.attr.marker-start",d("start"))(-1),b.on("snap.util.attr.markerStart",d("start"))(-1),b.on("snap.util.attr.marker-mid",d("mid"))(-1),b.on("snap.util.attr.markerMid",d("mid"))(-1)}(),b.on("snap.util.getattr.r",function(){return"rect"==this.type&&p(this.node,"rx")==p(this.node,"ry")?(b.stop(),p(this.node,"rx")):void 0})(-1),b.on("snap.util.getattr.text",function(){if("text"==this.type||"tspan"==this.type){b.stop();var a=i(this.node);return 1==a.length?a[0]:a}})(-1),b.on("snap.util.getattr.#text",function(){return this.node.textContent})(-1),b.on("snap.util.getattr.viewBox",function(){b.stop();var c=p(this.node,"viewBox");return c?(c=c.split(s),a._.box(+c[0],+c[1],+c[2],+c[3])):void 0})(-1),b.on("snap.util.getattr.points",function(){var a=p(this.node,"points");return b.stop(),a?a.split(s):void 0})(-1),b.on("snap.util.getattr.path",function(){var a=p(this.node,"d");return b.stop(),a})(-1),b.on("snap.util.getattr.class",function(){return this.node.className.baseVal})(-1),b.on("snap.util.getattr.fontSize",j)(-1),b.on("snap.util.getattr.font-size",j)(-1)}),d.plugin(function(){function a(a){return a}function c(a){return function(b){return+b.toFixed(3)+a}}var d={"+":function(a,b){return a+b},"-":function(a,b){return a-b},"/":function(a,b){return a/b},"*":function(a,b){return a*b}},e=String,f=/[a-z]+$/i,g=/^\s*([+\-\/*])\s*=\s*([\d.eE+\-]+)\s*([^\d\s]+)?\s*$/;b.on("snap.util.attr",function(a){var c=e(a).match(g);if(c){var h=b.nt(),i=h.substring(h.lastIndexOf(".")+1),j=this.attr(i),k={};b.stop();var l=c[3]||"",m=j.match(f),n=d[c[1]];if(m&&m==l?a=n(parseFloat(j),+c[2]):(j=this.asPX(i),a=n(this.asPX(i),this.asPX(i,c[2]+l))),isNaN(j)||isNaN(a))return;k[i]=a,this.attr(k)}})(-10),b.on("snap.util.equal",function(h,i){var j=e(this.attr(h)||""),k=e(i).match(g);if(k){b.stop();var l=k[3]||"",m=j.match(f),n=d[k[1]];return m&&m==l?{from:parseFloat(j),to:n(parseFloat(j),+k[2]),f:c(m)}:(j=this.asPX(h),{from:j,to:n(j,this.asPX(h,k[2]+l)),f:a})}})(-10)}),d.plugin(function(a,c,d,e){var f=d.prototype,g=a.is;f.rect=function(a,b,c,d,e,f){var h;return null==f&&(f=e),g(a,"object")&&"[object Object]"==a?h=a:null!=a&&(h={x:a,y:b,width:c,height:d},null!=e&&(h.rx=e,h.ry=f)),this.el("rect",h)},f.circle=function(a,b,c){var d;return g(a,"object")&&"[object Object]"==a?d=a:null!=a&&(d={cx:a,cy:b,r:c}),this.el("circle",d)};var h=function(){function a(){this.parentNode.removeChild(this)}return function(b,c){var d=e.doc.createElement("img"),f=e.doc.body;d.style.cssText="position:absolute;left:-9999em;top:-9999em",d.onload=function(){c.call(d),d.onload=d.onerror=null,f.removeChild(d)},d.onerror=a,f.appendChild(d),d.src=b}}();f.image=function(b,c,d,e,f){var i=this.el("image");if(g(b,"object")&&"src"in b)i.attr(b);else if(null!=b){var j={"xlink:href":b,preserveAspectRatio:"none"};null!=c&&null!=d&&(j.x=c,j.y=d),null!=e&&null!=f?(j.width=e,j.height=f):h(b,function(){a._.$(i.node,{width:this.offsetWidth,height:this.offsetHeight})}),a._.$(i.node,j)}return i},f.ellipse=function(a,b,c,d){var e;return g(a,"object")&&"[object Object]"==a?e=a:null!=a&&(e={cx:a,cy:b,rx:c,ry:d}),this.el("ellipse",e)},f.path=function(a){var b;return g(a,"object")&&!g(a,"array")?b=a:a&&(b={d:a}),this.el("path",b)},f.group=f.g=function(a){var b=this.el("g");return 1==arguments.length&&a&&!a.type?b.attr(a):arguments.length&&b.add(Array.prototype.slice.call(arguments,0)),b},f.svg=function(a,b,c,d,e,f,h,i){var j={};return g(a,"object")&&null==b?j=a:(null!=a&&(j.x=a),null!=b&&(j.y=b),null!=c&&(j.width=c),null!=d&&(j.height=d),null!=e&&null!=f&&null!=h&&null!=i&&(j.viewBox=[e,f,h,i])),this.el("svg",j)},f.mask=function(a){var b=this.el("mask");return 1==arguments.length&&a&&!a.type?b.attr(a):arguments.length&&b.add(Array.prototype.slice.call(arguments,0)),b},f.ptrn=function(a,b,c,d,e,f,h,i){if(g(a,"object"))var j=a;else arguments.length?(j={},null!=a&&(j.x=a),null!=b&&(j.y=b),null!=c&&(j.width=c),null!=d&&(j.height=d),null!=e&&null!=f&&null!=h&&null!=i&&(j.viewBox=[e,f,h,i])):j={patternUnits:"userSpaceOnUse"};return this.el("pattern",j)},f.use=function(a){if(null!=a){{make("use",this.node)}return a instanceof c&&(a.attr("id")||a.attr({id:ID()}),a=a.attr("id")),this.el("use",{"xlink:href":a})}return c.prototype.use.call(this)},f.text=function(a,b,c){var d={};return g(a,"object")?d=a:null!=a&&(d={x:a,y:b,text:c||""}),this.el("text",d)},f.line=function(a,b,c,d){var e={};return g(a,"object")?e=a:null!=a&&(e={x1:a,x2:c,y1:b,y2:d}),this.el("line",e)},f.polyline=function(a){arguments.length>1&&(a=Array.prototype.slice.call(arguments,0));var b={};return g(a,"object")&&!g(a,"array")?b=a:null!=a&&(b={points:a}),this.el("polyline",b)},f.polygon=function(a){arguments.length>1&&(a=Array.prototype.slice.call(arguments,0));var b={};return g(a,"object")&&!g(a,"array")?b=a:null!=a&&(b={points:a}),this.el("polygon",b)},function(){function c(){return this.selectAll("stop")}function d(b,c){var d=j("stop"),e={offset:+c+"%"};return b=a.color(b),e["stop-color"]=b.hex,b.opacity<1&&(e["stop-opacity"]=b.opacity),j(d,e),this.node.appendChild(d),this}function e(){if("linearGradient"==this.type){var b=j(this.node,"x1")||0,c=j(this.node,"x2")||1,d=j(this.node,"y1")||0,e=j(this.node,"y2")||0;return a._.box(b,d,math.abs(c-b),math.abs(e-d))}var f=this.node.cx||.5,g=this.node.cy||.5,h=this.node.r||0;return a._.box(f-h,g-h,2*h,2*h)}function g(a,c){function d(a,b){for(var c=(b-l)/(a-m),d=m;a>d;d++)g[d].offset=+(+l+c*(d-m)).toFixed(2);m=a,l=b}var e,f=b("snap.util.grad.parse",null,c).firstDefined();if(!f)return null;f.params.unshift(a),e="l"==f.type.toLowerCase()?h.apply(0,f.params):i.apply(0,f.params),f.type!=f.type.toLowerCase()&&j(e.node,{gradientUnits:"userSpaceOnUse"});var g=f.stops,k=g.length,l=0,m=0;k--;for(var n=0;k>n;n++)"offset"in g[n]&&d(n,g[n].offset);for(g[k].offset=g[k].offset||100,d(k,g[k].offset),n=0;k>=n;n++){var o=g[n];e.addStop(o.color,o.offset)}return e}function h(b,f,g,h,i){var k=a._.make("linearGradient",b);return k.stops=c,k.addStop=d,k.getBBox=e,null!=f&&j(k.node,{x1:f,y1:g,x2:h,y2:i}),k}function i(b,f,g,h,i,k){var l=a._.make("radialGradient",b);return l.stops=c,l.addStop=d,l.getBBox=e,null!=f&&j(l.node,{cx:f,cy:g,r:h}),null!=i&&null!=k&&j(l.node,{fx:i,fy:k}),l}var j=a._.$;f.gradient=function(a){return g(this.defs,a)},f.gradientLinear=function(a,b,c,d){return h(this.defs,a,b,c,d)},f.gradientRadial=function(a,b,c,d,e){return i(this.defs,a,b,c,d,e)},f.toString=function(){var b,c=this.node.ownerDocument,d=c.createDocumentFragment(),e=c.createElement("div"),f=this.node.cloneNode(!0);return d.appendChild(e),e.appendChild(f),a._.$(f,{xmlns:"http://www.w3.org/2000/svg"}),b=e.innerHTML,d.removeChild(d.firstChild),b},f.clear=function(){for(var a,b=this.node.firstChild;b;)a=b.nextSibling,"defs"!=b.tagName?b.parentNode.removeChild(b):f.clear.call({node:b}),b=a}}()}),d.plugin(function(a,b){function c(a){var b=c.ps=c.ps||{};return b[a]?b[a].sleep=100:b[a]={sleep:100},setTimeout(function(){for(var c in b)b[K](c)&&c!=a&&(b[c].sleep--,!b[c].sleep&&delete b[c])}),b[a]}function d(a,b,c,d){return null==a&&(a=b=c=d=0),null==b&&(b=a.y,c=a.width,d=a.height,a=a.x),{x:a,y:b,width:c,w:c,height:d,h:d,x2:a+c,y2:b+d,cx:a+c/2,cy:b+d/2,r1:N.min(c,d)/2,r2:N.max(c,d)/2,r0:N.sqrt(c*c+d*d)/2,path:w(a,b,c,d),vb:[a,b,c,d].join(" ")}}function e(){return this.join(",").replace(L,"$1")}function f(a){var b=J(a);return b.toString=e,b}function g(a,b,c,d,e,f,g,h,j){return null==j?n(a,b,c,d,e,f,g,h):i(a,b,c,d,e,f,g,h,o(a,b,c,d,e,f,g,h,j))}function h(c,d){function e(a){return+(+a).toFixed(3)}return a._.cacher(function(a,f,h){a instanceof b&&(a=a.attr("d")),a=E(a);for(var j,k,l,m,n,o="",p={},q=0,r=0,s=a.length;s>r;r++){if(l=a[r],"M"==l[0])j=+l[1],k=+l[2];else{if(m=g(j,k,l[1],l[2],l[3],l[4],l[5],l[6]),q+m>f){if(d&&!p.start){if(n=g(j,k,l[1],l[2],l[3],l[4],l[5],l[6],f-q),o+=["C"+e(n.start.x),e(n.start.y),e(n.m.x),e(n.m.y),e(n.x),e(n.y)],h)return o;p.start=o,o=["M"+e(n.x),e(n.y)+"C"+e(n.n.x),e(n.n.y),e(n.end.x),e(n.end.y),e(l[5]),e(l[6])].join(),q+=m,j=+l[5],k=+l[6];continue}if(!c&&!d)return n=g(j,k,l[1],l[2],l[3],l[4],l[5],l[6],f-q)}q+=m,j=+l[5],k=+l[6]}o+=l.shift()+l}return p.end=o,n=c?q:d?p:i(j,k,l[0],l[1],l[2],l[3],l[4],l[5],1)},null,a._.clone)}function i(a,b,c,d,e,f,g,h,i){var j=1-i,k=R(j,3),l=R(j,2),m=i*i,n=m*i,o=k*a+3*l*i*c+3*j*i*i*e+n*g,p=k*b+3*l*i*d+3*j*i*i*f+n*h,q=a+2*i*(c-a)+m*(e-2*c+a),r=b+2*i*(d-b)+m*(f-2*d+b),s=c+2*i*(e-c)+m*(g-2*e+c),t=d+2*i*(f-d)+m*(h-2*f+d),u=j*a+i*c,v=j*b+i*d,w=j*e+i*g,x=j*f+i*h,y=90-180*N.atan2(q-s,r-t)/O;return{x:o,y:p,m:{x:q,y:r},n:{x:s,y:t},start:{x:u,y:v},end:{x:w,y:x},alpha:y}}function j(b,c,e,f,g,h,i,j){a.is(b,"array")||(b=[b,c,e,f,g,h,i,j]);var k=D.apply(null,b);return d(k.min.x,k.min.y,k.max.x-k.min.x,k.max.y-k.min.y)}function k(a,b,c){return b>=a.x&&b<=a.x+a.width&&c>=a.y&&c<=a.y+a.height}function l(a,b){return a=d(a),b=d(b),k(b,a.x,a.y)||k(b,a.x2,a.y)||k(b,a.x,a.y2)||k(b,a.x2,a.y2)||k(a,b.x,b.y)||k(a,b.x2,b.y)||k(a,b.x,b.y2)||k(a,b.x2,b.y2)||(a.x<b.x2&&a.x>b.x||b.x<a.x2&&b.x>a.x)&&(a.y<b.y2&&a.y>b.y||b.y<a.y2&&b.y>a.y)}function m(a,b,c,d,e){var f=-3*b+9*c-9*d+3*e,g=a*f+6*b-12*c+6*d;return a*g-3*b+3*c}function n(a,b,c,d,e,f,g,h,i){null==i&&(i=1),i=i>1?1:0>i?0:i;for(var j=i/2,k=12,l=[-.1252,.1252,-.3678,.3678,-.5873,.5873,-.7699,.7699,-.9041,.9041,-.9816,.9816],n=[.2491,.2491,.2335,.2335,.2032,.2032,.1601,.1601,.1069,.1069,.0472,.0472],o=0,p=0;k>p;p++){var q=j*l[p]+j,r=m(q,a,c,e,g),s=m(q,b,d,f,h),t=r*r+s*s;o+=n[p]*N.sqrt(t)}return j*o}function o(a,b,c,d,e,f,g,h,i){if(!(0>i||n(a,b,c,d,e,f,g,h)<i)){var j,k=1,l=k/2,m=k-l,o=.01;for(j=n(a,b,c,d,e,f,g,h,m);S(j-i)>o;)l/=2,m+=(i>j?1:-1)*l,j=n(a,b,c,d,e,f,g,h,m);return m}}function p(a,b,c,d,e,f,g,h){if(!(Q(a,c)<P(e,g)||P(a,c)>Q(e,g)||Q(b,d)<P(f,h)||P(b,d)>Q(f,h))){var i=(a*d-b*c)*(e-g)-(a-c)*(e*h-f*g),j=(a*d-b*c)*(f-h)-(b-d)*(e*h-f*g),k=(a-c)*(f-h)-(b-d)*(e-g);if(k){var l=i/k,m=j/k,n=+l.toFixed(2),o=+m.toFixed(2);if(!(n<+P(a,c).toFixed(2)||n>+Q(a,c).toFixed(2)||n<+P(e,g).toFixed(2)||n>+Q(e,g).toFixed(2)||o<+P(b,d).toFixed(2)||o>+Q(b,d).toFixed(2)||o<+P(f,h).toFixed(2)||o>+Q(f,h).toFixed(2)))return{x:l,y:m}}}}function q(a,b,c){var d=j(a),e=j(b);if(!l(d,e))return c?0:[];for(var f=n.apply(0,a),g=n.apply(0,b),h=~~(f/8),k=~~(g/8),m=[],o=[],q={},r=c?0:[],s=0;h+1>s;s++){var t=i.apply(0,a.concat(s/h));m.push({x:t.x,y:t.y,t:s/h})}for(s=0;k+1>s;s++)t=i.apply(0,b.concat(s/k)),o.push({x:t.x,y:t.y,t:s/k});for(s=0;h>s;s++)for(var u=0;k>u;u++){var v=m[s],w=m[s+1],x=o[u],y=o[u+1],z=S(w.x-v.x)<.001?"y":"x",A=S(y.x-x.x)<.001?"y":"x",B=p(v.x,v.y,w.x,w.y,x.x,x.y,y.x,y.y);if(B){if(q[B.x.toFixed(4)]==B.y.toFixed(4))continue;q[B.x.toFixed(4)]=B.y.toFixed(4);var C=v.t+S((B[z]-v[z])/(w[z]-v[z]))*(w.t-v.t),D=x.t+S((B[A]-x[A])/(y[A]-x[A]))*(y.t-x.t);C>=0&&1>=C&&D>=0&&1>=D&&(c?r++:r.push({x:B.x,y:B.y,t1:C,t2:D}))}}return r}function r(a,b){return t(a,b)}function s(a,b){return t(a,b,1)}function t(a,b,c){a=E(a),b=E(b);for(var d,e,f,g,h,i,j,k,l,m,n=c?0:[],o=0,p=a.length;p>o;o++){var r=a[o];if("M"==r[0])d=h=r[1],e=i=r[2];else{"C"==r[0]?(l=[d,e].concat(r.slice(1)),d=l[6],e=l[7]):(l=[d,e,d,e,h,i,h,i],d=h,e=i);for(var s=0,t=b.length;t>s;s++){var u=b[s];if("M"==u[0])f=j=u[1],g=k=u[2];else{"C"==u[0]?(m=[f,g].concat(u.slice(1)),f=m[6],g=m[7]):(m=[f,g,f,g,j,k,j,k],f=j,g=k);var v=q(l,m,c);if(c)n+=v;else{for(var w=0,x=v.length;x>w;w++)v[w].segment1=o,v[w].segment2=s,v[w].bez1=l,v[w].bez2=m;n=n.concat(v)}}}}}return n}function u(a,b,c){var d=v(a);return k(d,b,c)&&t(a,[["M",b,c],["H",d.x2+10]],1)%2==1}function v(a){var b=c(a);if(b.bbox)return J(b.bbox);if(!a)return d();a=E(a);for(var e,f=0,g=0,h=[],i=[],j=0,k=a.length;k>j;j++)if(e=a[j],"M"==e[0])f=e[1],g=e[2],h.push(f),i.push(g);else{var l=D(f,g,e[1],e[2],e[3],e[4],e[5],e[6]);h=h.concat(l.min.x,l.max.x),i=i.concat(l.min.y,l.max.y),f=e[5],g=e[6]}var m=P.apply(0,h),n=P.apply(0,i),o=Q.apply(0,h),p=Q.apply(0,i),q=d(m,n,o-m,p-n);return b.bbox=J(q),q}function w(a,b,c,d,f){if(f)return[["M",+a+ +f,b],["l",c-2*f,0],["a",f,f,0,0,1,f,f],["l",0,d-2*f],["a",f,f,0,0,1,-f,f],["l",2*f-c,0],["a",f,f,0,0,1,-f,-f],["l",0,2*f-d],["a",f,f,0,0,1,f,-f],["z"]];var g=[["M",a,b],["l",c,0],["l",0,d],["l",-c,0],["z"]];return g.toString=e,g}function x(a,b,c,d,f){if(null==f&&null==d&&(d=c),a=+a,b=+b,c=+c,d=+d,null!=f)var g=Math.PI/180,h=a+c*Math.cos(-d*g),i=a+c*Math.cos(-f*g),j=b+c*Math.sin(-d*g),k=b+c*Math.sin(-f*g),l=[["M",h,j],["A",c,c,0,+(f-d>180),0,i,k]];else l=[["M",a,b],["m",0,-d],["a",c,d,0,1,1,0,2*d],["a",c,d,0,1,1,0,-2*d],["z"]];return l.toString=e,l}function y(b){var d=c(b),g=String.prototype.toLowerCase;if(d.rel)return f(d.rel);a.is(b,"array")&&a.is(b&&b[0],"array")||(b=a.parsePathString(b));var h=[],i=0,j=0,k=0,l=0,m=0;"M"==b[0][0]&&(i=b[0][1],j=b[0][2],k=i,l=j,m++,h.push(["M",i,j]));for(var n=m,o=b.length;o>n;n++){var p=h[n]=[],q=b[n];if(q[0]!=g.call(q[0]))switch(p[0]=g.call(q[0]),p[0]){case"a":p[1]=q[1],p[2]=q[2],p[3]=q[3],p[4]=q[4],p[5]=q[5],p[6]=+(q[6]-i).toFixed(3),p[7]=+(q[7]-j).toFixed(3);break;case"v":p[1]=+(q[1]-j).toFixed(3);break;case"m":k=q[1],l=q[2];default:for(var r=1,s=q.length;s>r;r++)p[r]=+(q[r]-(r%2?i:j)).toFixed(3)}else{p=h[n]=[],"m"==q[0]&&(k=q[1]+i,l=q[2]+j);for(var t=0,u=q.length;u>t;t++)h[n][t]=q[t]}var v=h[n].length;switch(h[n][0]){case"z":i=k,j=l;break;case"h":i+=+h[n][v-1];break;case"v":j+=+h[n][v-1];break;default:i+=+h[n][v-2],j+=+h[n][v-1]}}return h.toString=e,d.rel=f(h),h}function z(b){var d=c(b);if(d.abs)return f(d.abs);if(I(b,"array")&&I(b&&b[0],"array")||(b=a.parsePathString(b)),!b||!b.length)return[["M",0,0]];var g,h=[],i=0,j=0,k=0,l=0,m=0;"M"==b[0][0]&&(i=+b[0][1],j=+b[0][2],k=i,l=j,m++,h[0]=["M",i,j]);for(var n,o,p=3==b.length&&"M"==b[0][0]&&"R"==b[1][0].toUpperCase()&&"Z"==b[2][0].toUpperCase(),q=m,r=b.length;r>q;q++){if(h.push(n=[]),o=b[q],g=o[0],g!=g.toUpperCase())switch(n[0]=g.toUpperCase(),n[0]){case"A":n[1]=o[1],n[2]=o[2],n[3]=o[3],n[4]=o[4],n[5]=o[5],n[6]=+o[6]+i,n[7]=+o[7]+j;break;case"V":n[1]=+o[1]+j;break;case"H":n[1]=+o[1]+i;break;case"R":for(var s=[i,j].concat(o.slice(1)),t=2,u=s.length;u>t;t++)s[t]=+s[t]+i,s[++t]=+s[t]+j;h.pop(),h=h.concat(G(s,p));break;case"O":h.pop(),s=x(i,j,o[1],o[2]),s.push(s[0]),h=h.concat(s);break;case"U":h.pop(),h=h.concat(x(i,j,o[1],o[2],o[3])),n=["U"].concat(h[h.length-1].slice(-2));break;case"M":k=+o[1]+i,l=+o[2]+j;default:for(t=1,u=o.length;u>t;t++)n[t]=+o[t]+(t%2?i:j)}else if("R"==g)s=[i,j].concat(o.slice(1)),h.pop(),h=h.concat(G(s,p)),n=["R"].concat(o.slice(-2));else if("O"==g)h.pop(),s=x(i,j,o[1],o[2]),s.push(s[0]),h=h.concat(s);else if("U"==g)h.pop(),h=h.concat(x(i,j,o[1],o[2],o[3])),n=["U"].concat(h[h.length-1].slice(-2));else for(var v=0,w=o.length;w>v;v++)n[v]=o[v];if(g=g.toUpperCase(),"O"!=g)switch(n[0]){case"Z":i=+k,j=+l;break;case"H":i=n[1];break;case"V":j=n[1];break;case"M":k=n[n.length-2],l=n[n.length-1];default:i=n[n.length-2],j=n[n.length-1]}}return h.toString=e,d.abs=f(h),h}function A(a,b,c,d){return[a,b,c,d,c,d]}function B(a,b,c,d,e,f){var g=1/3,h=2/3;return[g*a+h*c,g*b+h*d,g*e+h*c,g*f+h*d,e,f]}function C(b,c,d,e,f,g,h,i,j,k){var l,m=120*O/180,n=O/180*(+f||0),o=[],p=a._.cacher(function(a,b,c){var d=a*N.cos(c)-b*N.sin(c),e=a*N.sin(c)+b*N.cos(c);return{x:d,y:e}});if(k)y=k[0],z=k[1],w=k[2],x=k[3];else{l=p(b,c,-n),b=l.x,c=l.y,l=p(i,j,-n),i=l.x,j=l.y;var q=(N.cos(O/180*f),N.sin(O/180*f),(b-i)/2),r=(c-j)/2,s=q*q/(d*d)+r*r/(e*e);s>1&&(s=N.sqrt(s),d=s*d,e=s*e);var t=d*d,u=e*e,v=(g==h?-1:1)*N.sqrt(S((t*u-t*r*r-u*q*q)/(t*r*r+u*q*q))),w=v*d*r/e+(b+i)/2,x=v*-e*q/d+(c+j)/2,y=N.asin(((c-x)/e).toFixed(9)),z=N.asin(((j-x)/e).toFixed(9));y=w>b?O-y:y,z=w>i?O-z:z,0>y&&(y=2*O+y),0>z&&(z=2*O+z),h&&y>z&&(y-=2*O),!h&&z>y&&(z-=2*O)}var A=z-y;if(S(A)>m){var B=z,D=i,E=j;z=y+m*(h&&z>y?1:-1),i=w+d*N.cos(z),j=x+e*N.sin(z),o=C(i,j,d,e,f,0,h,D,E,[z,B,w,x])}A=z-y;var F=N.cos(y),G=N.sin(y),H=N.cos(z),I=N.sin(z),J=N.tan(A/4),K=4/3*d*J,L=4/3*e*J,M=[b,c],P=[b+K*G,c-L*F],Q=[i+K*I,j-L*H],R=[i,j];if(P[0]=2*M[0]-P[0],P[1]=2*M[1]-P[1],k)return[P,Q,R].concat(o);o=[P,Q,R].concat(o).join().split(",");for(var T=[],U=0,V=o.length;V>U;U++)T[U]=U%2?p(o[U-1],o[U],n).y:p(o[U],o[U+1],n).x;return T}function D(a,b,c,d,e,f,g,h){for(var i,j,k,l,m,n,o,p,q=[],r=[[],[]],s=0;2>s;++s)if(0==s?(j=6*a-12*c+6*e,i=-3*a+9*c-9*e+3*g,k=3*c-3*a):(j=6*b-12*d+6*f,i=-3*b+9*d-9*f+3*h,k=3*d-3*b),S(i)<1e-12){if(S(j)<1e-12)continue;l=-k/j,l>0&&1>l&&q.push(l)}else o=j*j-4*k*i,p=N.sqrt(o),0>o||(m=(-j+p)/(2*i),m>0&&1>m&&q.push(m),n=(-j-p)/(2*i),n>0&&1>n&&q.push(n));for(var t,u=q.length,v=u;u--;)l=q[u],t=1-l,r[0][u]=t*t*t*a+3*t*t*l*c+3*t*l*l*e+l*l*l*g,r[1][u]=t*t*t*b+3*t*t*l*d+3*t*l*l*f+l*l*l*h;return r[0][v]=a,r[1][v]=b,r[0][v+1]=g,r[1][v+1]=h,r[0].length=r[1].length=v+2,{min:{x:P.apply(0,r[0]),y:P.apply(0,r[1])},max:{x:Q.apply(0,r[0]),y:Q.apply(0,r[1])}}}function E(a,b){var d=!b&&c(a);if(!b&&d.curve)return f(d.curve);for(var e=z(a),g=b&&z(b),h={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},i={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},j=(function(a,b,c){var d,e;if(!a)return["C",b.x,b.y,b.x,b.y,b.x,b.y];switch(!(a[0]in{T:1,Q:1})&&(b.qx=b.qy=null),a[0]){case"M":b.X=a[1],b.Y=a[2];break;case"A":a=["C"].concat(C.apply(0,[b.x,b.y].concat(a.slice(1))));break;case"S":"C"==c||"S"==c?(d=2*b.x-b.bx,e=2*b.y-b.by):(d=b.x,e=b.y),a=["C",d,e].concat(a.slice(1));break;case"T":"Q"==c||"T"==c?(b.qx=2*b.x-b.qx,b.qy=2*b.y-b.qy):(b.qx=b.x,b.qy=b.y),a=["C"].concat(B(b.x,b.y,b.qx,b.qy,a[1],a[2]));break;case"Q":b.qx=a[1],b.qy=a[2],a=["C"].concat(B(b.x,b.y,a[1],a[2],a[3],a[4]));break;case"L":a=["C"].concat(A(b.x,b.y,a[1],a[2]));break;case"H":a=["C"].concat(A(b.x,b.y,a[1],b.y));break;case"V":a=["C"].concat(A(b.x,b.y,b.x,a[1]));break;case"Z":a=["C"].concat(A(b.x,b.y,b.X,b.Y))}return a}),k=function(a,b){if(a[b].length>7){a[b].shift();for(var c=a[b];c.length;)m[b]="A",g&&(n[b]="A"),a.splice(b++,0,["C"].concat(c.splice(0,6)));a.splice(b,1),r=Q(e.length,g&&g.length||0)}},l=function(a,b,c,d,f){a&&b&&"M"==a[f][0]&&"M"!=b[f][0]&&(b.splice(f,0,["M",d.x,d.y]),c.bx=0,c.by=0,c.x=a[f][1],c.y=a[f][2],r=Q(e.length,g&&g.length||0))},m=[],n=[],o="",p="",q=0,r=Q(e.length,g&&g.length||0);r>q;q++){e[q]&&(o=e[q][0]),"C"!=o&&(m[q]=o,q&&(p=m[q-1])),e[q]=j(e[q],h,p),"A"!=m[q]&&"C"==o&&(m[q]="C"),k(e,q),g&&(g[q]&&(o=g[q][0]),"C"!=o&&(n[q]=o,q&&(p=n[q-1])),g[q]=j(g[q],i,p),"A"!=n[q]&&"C"==o&&(n[q]="C"),k(g,q)),l(e,g,h,i,q),l(g,e,i,h,q);var s=e[q],t=g&&g[q],u=s.length,v=g&&t.length;h.x=s[u-2],h.y=s[u-1],h.bx=M(s[u-4])||h.x,h.by=M(s[u-3])||h.y,i.bx=g&&(M(t[v-4])||i.x),i.by=g&&(M(t[v-3])||i.y),i.x=g&&t[v-2],i.y=g&&t[v-1]}return g||(d.curve=f(e)),g?[e,g]:e}function F(a,b){if(!b)return a;var c,d,e,f,g,h,i;for(a=E(a),e=0,g=a.length;g>e;e++)for(i=a[e],f=1,h=i.length;h>f;f+=2)c=b.x(i[f],i[f+1]),d=b.y(i[f],i[f+1]),i[f]=c,i[f+1]=d;return a}function G(a,b){for(var c=[],d=0,e=a.length;e-2*!b>d;d+=2){var f=[{x:+a[d-2],y:+a[d-1]},{x:+a[d],y:+a[d+1]},{x:+a[d+2],y:+a[d+3]},{x:+a[d+4],y:+a[d+5]}];b?d?e-4==d?f[3]={x:+a[0],y:+a[1]}:e-2==d&&(f[2]={x:+a[0],y:+a[1]},f[3]={x:+a[2],y:+a[3]}):f[0]={x:+a[e-2],y:+a[e-1]}:e-4==d?f[3]=f[2]:d||(f[0]={x:+a[d],y:+a[d+1]}),c.push(["C",(-f[0].x+6*f[1].x+f[2].x)/6,(-f[0].y+6*f[1].y+f[2].y)/6,(f[1].x+6*f[2].x-f[3].x)/6,(f[1].y+6*f[2].y-f[3].y)/6,f[2].x,f[2].y])}return c}var H=b.prototype,I=a.is,J=a._.clone,K="hasOwnProperty",L=/,?([a-z]),?/gi,M=parseFloat,N=Math,O=N.PI,P=N.min,Q=N.max,R=N.pow,S=N.abs,T=h(1),U=h(),V=h(0,1),W=a._unit2px,X={path:function(a){return a.attr("path")},circle:function(a){var b=W(a);return x(b.cx,b.cy,b.r)},ellipse:function(a){var b=W(a);return x(b.cx||0,b.cy||0,b.rx,b.ry)},rect:function(a){var b=W(a);return w(b.x||0,b.y||0,b.width,b.height,b.rx,b.ry)},image:function(a){var b=W(a);return w(b.x||0,b.y||0,b.width,b.height)},line:function(a){return"M"+[a.attr("x1")||0,a.attr("y1")||0,a.attr("x2"),a.attr("y2")]},polyline:function(a){return"M"+a.attr("points")},polygon:function(a){return"M"+a.attr("points")+"z"},deflt:function(a){var b=a.node.getBBox();return w(b.x,b.y,b.width,b.height)}};a.path=c,a.path.getTotalLength=T,a.path.getPointAtLength=U,a.path.getSubpath=function(a,b,c){if(this.getTotalLength(a)-c<1e-6)return V(a,b).end;var d=V(a,c,1);return b?V(d,b).end:d},H.getTotalLength=function(){return this.node.getTotalLength?this.node.getTotalLength():void 0},H.getPointAtLength=function(a){return U(this.attr("d"),a)},H.getSubpath=function(b,c){return a.path.getSubpath(this.attr("d"),b,c)},a._.box=d,a.path.findDotsAtSegment=i,a.path.bezierBBox=j,a.path.isPointInsideBBox=k,a.path.isBBoxIntersect=l,a.path.intersection=r,a.path.intersectionNumber=s,a.path.isPointInside=u,a.path.getBBox=v,a.path.get=X,a.path.toRelative=y,a.path.toAbsolute=z,a.path.toCubic=E,a.path.map=F,a.path.toString=e,a.path.clone=f}),d.plugin(function(a){var d=Math.max,e=Math.min,f=function(a){if(this.items=[],this.bindings={},this.length=0,this.type="set",a)for(var b=0,c=a.length;c>b;b++)a[b]&&(this[this.items.length]=this.items[this.items.length]=a[b],this.length++)},g=f.prototype;g.push=function(){for(var a,b,c=0,d=arguments.length;d>c;c++)a=arguments[c],a&&(b=this.items.length,this[b]=this.items[b]=a,this.length++);return this},g.pop=function(){return this.length&&delete this[this.length--],this.items.pop()},g.forEach=function(a,b){for(var c=0,d=this.items.length;d>c;c++)if(a.call(b,this.items[c],c)===!1)return this;return this},g.animate=function(d,e,f,g){"function"!=typeof f||f.length||(g=f,f=c.linear),d instanceof a._.Animation&&(g=d.callback,f=d.easing,e=f.dur,d=d.attr);var h=arguments;if(a.is(d,"array")&&a.is(h[h.length-1],"array"))var i=!0;var j,k=function(){j?this.b=j:j=this.b},l=0,m=g&&function(){l++==this.length&&g.call(this)};return this.forEach(function(a,c){b.once("snap.animcreated."+a.id,k),i?h[c]&&a.animate.apply(a,h[c]):a.animate(d,e,f,m)})},g.remove=function(){for(;this.length;)this.pop().remove();return this},g.bind=function(a,b,c){var d={};if("function"==typeof b)this.bindings[a]=b;else{var e=c||a;this.bindings[a]=function(a){d[e]=a,b.attr(d)}}return this},g.attr=function(a){var b={};for(var c in a)this.bindings[c]?this.bindings[c](a[c]):b[c]=a[c];for(var d=0,e=this.items.length;e>d;d++)this.items[d].attr(b);return this},g.clear=function(){for(;this.length;)this.pop()},g.splice=function(a,b){a=0>a?d(this.length+a,0):a,b=d(0,e(this.length-a,b));var c,g=[],h=[],i=[];for(c=2;c<arguments.length;c++)i.push(arguments[c]);for(c=0;b>c;c++)h.push(this[a+c]);for(;c<this.length-a;c++)g.push(this[a+c]);var j=i.length;for(c=0;c<j+g.length;c++)this.items[a+c]=this[a+c]=j>c?i[c]:g[c-j];for(c=this.items.length=this.length-=b-j;this[c];)delete this[c++];return new f(h)},g.exclude=function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]==a)return this.splice(b,1),!0;return!1},g.insertAfter=function(a){for(var b=this.items.length;b--;)this.items[b].insertAfter(a);return this},g.getBBox=function(){for(var a=[],b=[],c=[],f=[],g=this.items.length;g--;)if(!this.items[g].removed){var h=this.items[g].getBBox();a.push(h.x),b.push(h.y),c.push(h.x+h.width),f.push(h.y+h.height)}return a=e.apply(0,a),b=e.apply(0,b),c=d.apply(0,c),f=d.apply(0,f),{x:a,y:b,x2:c,y2:f,width:c-a,height:f-b,cx:a+(c-a)/2,cy:b+(f-b)/2}},g.clone=function(a){a=new f;for(var b=0,c=this.items.length;c>b;b++)a.push(this.items[b].clone());return a},g.toString=function(){return"Snap‘s set"},g.type="set",a.set=function(){var a=new f;return arguments.length&&a.push.apply(a,Array.prototype.slice.call(arguments,0)),a}}),d.plugin(function(a,c){function d(a){var b=a[0];switch(b.toLowerCase()){case"t":return[b,0,0];case"m":return[b,1,0,0,1,0,0];case"r":return 4==a.length?[b,0,a[2],a[3]]:[b,0];case"s":return 5==a.length?[b,1,1,a[3],a[4]]:3==a.length?[b,1,1]:[b,1]}}function e(b,c,e){c=m(c).replace(/\.{3}|\u2026/g,b),b=a.parseTransformString(b)||[],c=a.parseTransformString(c)||[];for(var f,g,h,k,l=Math.max(b.length,c.length),n=[],o=[],p=0;l>p;p++){if(h=b[p]||d(c[p]),k=c[p]||d(h),h[0]!=k[0]||"r"==h[0].toLowerCase()&&(h[2]!=k[2]||h[3]!=k[3])||"s"==h[0].toLowerCase()&&(h[3]!=k[3]||h[4]!=k[4])){b=a._.transform2matrix(b,e()),c=a._.transform2matrix(c,e()),n=[["m",b.a,b.b,b.c,b.d,b.e,b.f]],o=[["m",c.a,c.b,c.c,c.d,c.e,c.f]];break}for(n[p]=[],o[p]=[],f=0,g=Math.max(h.length,k.length);g>f;f++)f in h&&(n[p][f]=h[f]),f in k&&(o[p][f]=k[f])}return{from:j(n),to:j(o),f:i(n)}}function f(a){return a}function g(a){return function(b){return+b.toFixed(3)+a}}function h(b){return a.rgb(b[0],b[1],b[2])}function i(a){var b,c,d,e,f,g,h=0,i=[];for(b=0,c=a.length;c>b;b++){for(f="[",g=['"'+a[b][0]+'"'],d=1,e=a[b].length;e>d;d++)g[d]="val["+h++ +"]";
f+=g+"]",i[b]=f}return Function("val","return Snap.path.toString.call(["+i+"])")}function j(a){for(var b=[],c=0,d=a.length;d>c;c++)for(var e=1,f=a[c].length;f>e;e++)b.push(a[c][e]);return b}var k={},l=/[a-z]+$/i,m=String;k.stroke=k.fill="colour",c.prototype.equal=function(a,c){return b("snap.util.equal",this,a,c).firstDefined()},b.on("snap.util.equal",function(b,c){var d,n,o=m(this.attr(b)||""),p=this;if(o==+o&&c==+c)return{from:+o,to:+c,f:f};if("colour"==k[b])return d=a.color(o),n=a.color(c),{from:[d.r,d.g,d.b,d.opacity],to:[n.r,n.g,n.b,n.opacity],f:h};if("transform"==b||"gradientTransform"==b||"patternTransform"==b)return c instanceof a.Matrix&&(c=c.toTransformString()),a._.rgTransform.test(c)||(c=a._.svgTransform2string(c)),e(o,c,function(){return p.getBBox(1)});if("d"==b||"path"==b)return d=a.path.toCubic(o,c),{from:j(d[0]),to:j(d[1]),f:i(d[0])};if("points"==b)return d=m(o).split(a._.separator),n=m(c).split(a._.separator),{from:d,to:n,f:function(a){return a}};aUnit=o.match(l);var q=m(c).match(l);return aUnit&&aUnit==q?{from:parseFloat(o),to:parseFloat(c),f:g(aUnit)}:{from:this.asPX(b),to:this.asPX(b,c),f:f}})}),d.plugin(function(a,c,d,e){for(var f=c.prototype,g="hasOwnProperty",h=("createTouch"in e.doc),i=["click","dblclick","mousedown","mousemove","mouseout","mouseover","mouseup","touchstart","touchmove","touchend","touchcancel"],j={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},k=(function(a,b){var c="y"==a?"scrollTop":"scrollLeft",d=b&&b.node?b.node.ownerDocument:e.doc;return d[c in d.documentElement?"documentElement":"body"][c]}),l=function(){this.returnValue=!1},m=function(){return this.originalEvent.preventDefault()},n=function(){this.cancelBubble=!0},o=function(){return this.originalEvent.stopPropagation()},p=function(){return e.doc.addEventListener?function(a,b,c,d){var e=h&&j[b]?j[b]:b,f=function(e){var f=k("y",d),i=k("x",d);if(h&&j[g](b))for(var l=0,n=e.targetTouches&&e.targetTouches.length;n>l;l++)if(e.targetTouches[l].target==a||a.contains(e.targetTouches[l].target)){var p=e;e=e.targetTouches[l],e.originalEvent=p,e.preventDefault=m,e.stopPropagation=o;break}var q=e.clientX+i,r=e.clientY+f;return c.call(d,e,q,r)};return b!==e&&a.addEventListener(b,f,!1),a.addEventListener(e,f,!1),function(){return b!==e&&a.removeEventListener(b,f,!1),a.removeEventListener(e,f,!1),!0}}:e.doc.attachEvent?function(a,b,c,d){var e=function(a){a=a||d.node.ownerDocument.window.event;var b=k("y",d),e=k("x",d),f=a.clientX+e,g=a.clientY+b;return a.preventDefault=a.preventDefault||l,a.stopPropagation=a.stopPropagation||n,c.call(d,a,f,g)};a.attachEvent("on"+b,e);var f=function(){return a.detachEvent("on"+b,e),!0};return f}:void 0}(),q=[],r=function(a){for(var c,d=a.clientX,e=a.clientY,f=k("y"),g=k("x"),i=q.length;i--;){if(c=q[i],h){for(var j,l=a.touches&&a.touches.length;l--;)if(j=a.touches[l],j.identifier==c.el._drag.id||c.el.node.contains(j.target)){d=j.clientX,e=j.clientY,(a.originalEvent?a.originalEvent:a).preventDefault();break}}else a.preventDefault();{var m=c.el.node;m.nextSibling,m.parentNode,m.style.display}d+=g,e+=f,b("snap.drag.move."+c.el.id,c.move_scope||c.el,d-c.el._drag.x,e-c.el._drag.y,d,e,a)}},s=function(c){a.unmousemove(r).unmouseup(s);for(var d,e=q.length;e--;)d=q[e],d.el._drag={},b("snap.drag.end."+d.el.id,d.end_scope||d.start_scope||d.move_scope||d.el,c);q=[]},t=i.length;t--;)!function(b){a[b]=f[b]=function(c,d){return a.is(c,"function")&&(this.events=this.events||[],this.events.push({name:b,f:c,unbind:p(this.node||document,b,c,d||this)})),this},a["un"+b]=f["un"+b]=function(a){for(var c=this.events||[],d=c.length;d--;)if(c[d].name==b&&(c[d].f==a||!a))return c[d].unbind(),c.splice(d,1),!c.length&&delete this.events,this;return this}}(i[t]);f.hover=function(a,b,c,d){return this.mouseover(a,c).mouseout(b,d||c)},f.unhover=function(a,b){return this.unmouseover(a).unmouseout(b)};var u=[];f.drag=function(c,d,e,f,g,h){function i(i,j,k){(i.originalEvent||i).preventDefault(),this._drag.x=j,this._drag.y=k,this._drag.id=i.identifier,!q.length&&a.mousemove(r).mouseup(s),q.push({el:this,move_scope:f,start_scope:g,end_scope:h}),d&&b.on("snap.drag.start."+this.id,d),c&&b.on("snap.drag.move."+this.id,c),e&&b.on("snap.drag.end."+this.id,e),b("snap.drag.start."+this.id,g||f||this,j,k,i)}if(!arguments.length){var j;return this.drag(function(a,b){this.attr({transform:j+(j?"T":"t")+[a,b]})},function(){j=this.transform().local})}return this._drag={},u.push({el:this,start:i}),this.mousedown(i),this},f.undrag=function(){for(var c=u.length;c--;)u[c].el==this&&(this.unmousedown(u[c].start),u.splice(c,1),b.unbind("snap.drag.*."+this.id));return!u.length&&a.unmousemove(r).unmouseup(s),this}}),d.plugin(function(a,c,d){var e=(c.prototype,d.prototype),f=/^\s*url\((.+)\)/,g=String,h=a._.$;a.filter={},e.filter=function(b){var d=this;"svg"!=d.type&&(d=d.paper);var e=a.parse(g(b)),f=a._.id(),i=(d.node.offsetWidth,d.node.offsetHeight,h("filter"));return h(i,{id:f,filterUnits:"userSpaceOnUse"}),i.appendChild(e.node),d.defs.appendChild(i),new c(i)},b.on("snap.util.getattr.filter",function(){b.stop();var c=h(this.node,"filter");if(c){var d=g(c).match(f);return d&&a.select(d[1])}}),b.on("snap.util.attr.filter",function(d){if(d instanceof c&&"filter"==d.type){b.stop();var e=d.node.id;e||(h(d.node,{id:d.id}),e=d.id),h(this.node,{filter:a.url(e)})}d&&"none"!=d||(b.stop(),this.node.removeAttribute("filter"))}),a.filter.blur=function(b,c){null==b&&(b=2);var d=null==c?b:[b,c];return a.format('<feGaussianBlur stdDeviation="{def}"/>',{def:d})},a.filter.blur.toString=function(){return this()},a.filter.shadow=function(b,c,d,e,f){return"string"==typeof d&&(e=d,f=e,d=4),"string"!=typeof e&&(f=e,e="#000"),e=e||"#000",null==d&&(d=4),null==f&&(f=1),null==b&&(b=0,c=2),null==c&&(c=b),e=a.color(e),a.format('<feGaussianBlur in="SourceAlpha" stdDeviation="{blur}"/><feOffset dx="{dx}" dy="{dy}" result="offsetblur"/><feFlood flood-color="{color}"/><feComposite in2="offsetblur" operator="in"/><feComponentTransfer><feFuncA type="linear" slope="{opacity}"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>',{color:e,dx:b,dy:c,blur:d,opacity:f})},a.filter.shadow.toString=function(){return this()},a.filter.grayscale=function(b){return null==b&&(b=1),a.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {b} {h} 0 0 0 0 0 1 0"/>',{a:.2126+.7874*(1-b),b:.7152-.7152*(1-b),c:.0722-.0722*(1-b),d:.2126-.2126*(1-b),e:.7152+.2848*(1-b),f:.0722-.0722*(1-b),g:.2126-.2126*(1-b),h:.0722+.9278*(1-b)})},a.filter.grayscale.toString=function(){return this()},a.filter.sepia=function(b){return null==b&&(b=1),a.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {h} {i} 0 0 0 0 0 1 0"/>',{a:.393+.607*(1-b),b:.769-.769*(1-b),c:.189-.189*(1-b),d:.349-.349*(1-b),e:.686+.314*(1-b),f:.168-.168*(1-b),g:.272-.272*(1-b),h:.534-.534*(1-b),i:.131+.869*(1-b)})},a.filter.sepia.toString=function(){return this()},a.filter.saturate=function(b){return null==b&&(b=1),a.format('<feColorMatrix type="saturate" values="{amount}"/>',{amount:1-b})},a.filter.saturate.toString=function(){return this()},a.filter.hueRotate=function(b){return b=b||0,a.format('<feColorMatrix type="hueRotate" values="{angle}"/>',{angle:b})},a.filter.hueRotate.toString=function(){return this()},a.filter.invert=function(b){return null==b&&(b=1),a.format('<feComponentTransfer><feFuncR type="table" tableValues="{amount} {amount2}"/><feFuncG type="table" tableValues="{amount} {amount2}"/><feFuncB type="table" tableValues="{amount} {amount2}"/></feComponentTransfer>',{amount:b,amount2:1-b})},a.filter.invert.toString=function(){return this()},a.filter.brightness=function(b){return null==b&&(b=1),a.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}"/><feFuncG type="linear" slope="{amount}"/><feFuncB type="linear" slope="{amount}"/></feComponentTransfer>',{amount:b})},a.filter.brightness.toString=function(){return this()},a.filter.contrast=function(b){return null==b&&(b=1),a.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}" intercept="{amount2}"/><feFuncG type="linear" slope="{amount}" intercept="{amount2}"/><feFuncB type="linear" slope="{amount}" intercept="{amount2}"/></feComponentTransfer>',{amount:b,amount2:.5-b/2})},a.filter.contrast.toString=function(){return this()}}),d});
var Delaunay;

(function() {
  "use strict";

  var EPSILON = 1.0 / 1048576.0;

  function supertriangle(vertices) {
    var xmin = Number.POSITIVE_INFINITY,
        ymin = Number.POSITIVE_INFINITY,
        xmax = Number.NEGATIVE_INFINITY,
        ymax = Number.NEGATIVE_INFINITY,
        i, dx, dy, dmax, xmid, ymid;

    for(i = vertices.length; i--; ) {
      if(vertices[i][0] < xmin) xmin = vertices[i][0];
      if(vertices[i][0] > xmax) xmax = vertices[i][0];
      if(vertices[i][1] < ymin) ymin = vertices[i][1];
      if(vertices[i][1] > ymax) ymax = vertices[i][1];
    }

    dx = xmax - xmin;
    dy = ymax - ymin;
    dmax = Math.max(dx, dy);
    xmid = xmin + dx * 0.5;
    ymid = ymin + dy * 0.5;

    return [
      [xmid - 20 * dmax, ymid -      dmax],
      [xmid            , ymid + 20 * dmax],
      [xmid + 20 * dmax, ymid -      dmax]
    ];
  }

  function circumcircle(vertices, i, j, k) {
    var x1 = vertices[i][0],
        y1 = vertices[i][1],
        x2 = vertices[j][0],
        y2 = vertices[j][1],
        x3 = vertices[k][0],
        y3 = vertices[k][1],
        fabsy1y2 = Math.abs(y1 - y2),
        fabsy2y3 = Math.abs(y2 - y3),
        xc, yc, m1, m2, mx1, mx2, my1, my2, dx, dy;

    /* Check for coincident points */
    if(fabsy1y2 < EPSILON && fabsy2y3 < EPSILON)
      throw new Error("Eek! Coincident points!");

    if(fabsy1y2 < EPSILON) {
      m2  = -((x3 - x2) / (y3 - y2));
      mx2 = (x2 + x3) / 2.0;
      my2 = (y2 + y3) / 2.0;
      xc  = (x2 + x1) / 2.0;
      yc  = m2 * (xc - mx2) + my2;
    }

    else if(fabsy2y3 < EPSILON) {
      m1  = -((x2 - x1) / (y2 - y1));
      mx1 = (x1 + x2) / 2.0;
      my1 = (y1 + y2) / 2.0;
      xc  = (x3 + x2) / 2.0;
      yc  = m1 * (xc - mx1) + my1;
    }

    else {
      m1  = -((x2 - x1) / (y2 - y1));
      m2  = -((x3 - x2) / (y3 - y2));
      mx1 = (x1 + x2) / 2.0;
      mx2 = (x2 + x3) / 2.0;
      my1 = (y1 + y2) / 2.0;
      my2 = (y2 + y3) / 2.0;
      xc  = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
      yc  = (fabsy1y2 > fabsy2y3) ?
        m1 * (xc - mx1) + my1 :
        m2 * (xc - mx2) + my2;
    }

    dx = x2 - xc;
    dy = y2 - yc;
    return {i: i, j: j, k: k, x: xc, y: yc, r: dx * dx + dy * dy};
  }

  function dedup(edges) {
    var i, j, a, b, m, n;

    for(j = edges.length; j; ) {
      b = edges[--j];
      a = edges[--j];

      for(i = j; i; ) {
        n = edges[--i];
        m = edges[--i];

        if((a === m && b === n) || (a === n && b === m)) {
          edges.splice(j, 2);
          edges.splice(i, 2);
          break;
        }
      }
    }
  }

  Delaunay = {
    triangulate: function(vertices, key) {
      var n = vertices.length,
          i, j, indices, st, open, closed, edges, dx, dy, a, b, c;

      /* Bail if there aren't enough vertices to form any triangles. */
      if(n < 3)
        return [];

      /* Slice out the actual vertices from the passed objects. (Duplicate the
       * array even if we don't, though, since we need to make a supertriangle
       * later on!) */
      vertices = vertices.slice(0);

      if(key)
        for(i = n; i--; )
          vertices[i] = vertices[i][key];

      /* Make an array of indices into the vertex array, sorted by the
       * vertices' x-position. */
      indices = new Array(n);

      for(i = n; i--; )
        indices[i] = i;

      indices.sort(function(i, j) {
        return vertices[j][0] - vertices[i][0];
      });

      /* Next, find the vertices of the supertriangle (which contains all other
       * triangles), and append them onto the end of a (copy of) the vertex
       * array. */
      st = supertriangle(vertices);
      vertices.push(st[0], st[1], st[2]);
      
      /* Initialize the open list (containing the supertriangle and nothing
       * else) and the closed list (which is empty since we havn't processed
       * any triangles yet). */
      open   = [circumcircle(vertices, n + 0, n + 1, n + 2)];
      closed = [];
      edges  = [];

      /* Incrementally add each vertex to the mesh. */
      for(i = indices.length; i--; edges.length = 0) {
        c = indices[i];

        /* For each open triangle, check to see if the current point is
         * inside it's circumcircle. If it is, remove the triangle and add
         * it's edges to an edge list. */
        for(j = open.length; j--; ) {
          /* If this point is to the right of this triangle's circumcircle,
           * then this triangle should never get checked again. Remove it
           * from the open list, add it to the closed list, and skip. */
          dx = vertices[c][0] - open[j].x;
          if(dx > 0.0 && dx * dx > open[j].r) {
            closed.push(open[j]);
            open.splice(j, 1);
            continue;
          }

          /* If we're outside the circumcircle, skip this triangle. */
          dy = vertices[c][1] - open[j].y;
          if(dx * dx + dy * dy - open[j].r > EPSILON)
            continue;

          /* Remove the triangle and add it's edges to the edge list. */
          edges.push(
            open[j].i, open[j].j,
            open[j].j, open[j].k,
            open[j].k, open[j].i
          );
          open.splice(j, 1);
        }

        /* Remove any doubled edges. */
        dedup(edges);

        /* Add a new triangle for each edge. */
        for(j = edges.length; j; ) {
          b = edges[--j];
          a = edges[--j];
          open.push(circumcircle(vertices, a, b, c));
        }
      }

      /* Copy any remaining open triangles to the closed list, and then
       * remove any triangles that share a vertex with the supertriangle,
       * building a list of triplets that represent triangles. */
      for(i = open.length; i--; )
        closed.push(open[i]);
      open.length = 0;

      for(i = closed.length; i--; )
        if(closed[i].i < n && closed[i].j < n && closed[i].k < n)
          open.push(closed[i].i, closed[i].j, closed[i].k);

      /* Yay, we're done! */
      return open;
    },
    contains: function(tri, p) {
      /* Bounding box test first, for quick rejections. */
      if((p[0] < tri[0][0] && p[0] < tri[1][0] && p[0] < tri[2][0]) ||
         (p[0] > tri[0][0] && p[0] > tri[1][0] && p[0] > tri[2][0]) ||
         (p[1] < tri[0][1] && p[1] < tri[1][1] && p[1] < tri[2][1]) ||
         (p[1] > tri[0][1] && p[1] > tri[1][1] && p[1] > tri[2][1]))
        return null;

      var a = tri[1][0] - tri[0][0],
          b = tri[2][0] - tri[0][0],
          c = tri[1][1] - tri[0][1],
          d = tri[2][1] - tri[0][1],
          i = a * d - b * c;

      /* Degenerate tri. */
      if(i === 0.0)
        return null;

      var u = (d * (p[0] - tri[0][0]) - b * (p[1] - tri[0][1])) / i,
          v = (a * (p[1] - tri[0][1]) - c * (p[0] - tri[0][0])) / i;

      /* If we're outside the tri, fail. */
      if(u < 0.0 || v < 0.0 || (u + v) > 1.0)
        return null;

      return [u, v];
    }
  };

  if(typeof module !== "undefined")
    module.exports = Delaunay;
})();
/*!
 * Paper.js v0.9.18 - The Swiss Army Knife of Vector Graphics Scripting.
 * http://paperjs.org/
 *
 * Copyright (c) 2011 - 2014, Juerg Lehni & Jonathan Puckey
 * http://scratchdisk.com/ & http://jonathanpuckey.com/
 *
 * Distributed under the MIT license. See LICENSE file for details.
 *
 * All rights reserved.
 *
 * Date: Mon Apr 7 11:24:38 2014 +0200
 *
 ***
 *
 * Straps.js - Class inheritance library with support for bean-style accessors
 *
 * Copyright (c) 2006 - 2013 Juerg Lehni
 * http://scratchdisk.com/
 *
 * Distributed under the MIT license.
 *
 ***
 *
 * Acorn.js
 * http://marijnhaverbeke.nl/acorn/
 *
 * Acorn is a tiny, fast JavaScript parser written in JavaScript,
 * created by Marijn Haverbeke and released under an MIT license.
 *
 */


var paper = new function(undefined) {

var Base = new function() {
  var hidden = /^(statics|enumerable|beans|preserve)$/,

    forEach = [].forEach || function(iter, bind) {
      for (var i = 0, l = this.length; i < l; i++)
        iter.call(bind, this[i], i, this);
    },

    forIn = function(iter, bind) {
      for (var i in this)
        if (this.hasOwnProperty(i))
          iter.call(bind, this[i], i, this);
    },

    create = Object.create || function(proto) {
      return { __proto__: proto };
    },

    describe = Object.getOwnPropertyDescriptor || function(obj, name) {
      var get = obj.__lookupGetter__ && obj.__lookupGetter__(name);
      return get
          ? { get: get, set: obj.__lookupSetter__(name),
            enumerable: true, configurable: true }
          : obj.hasOwnProperty(name)
            ? { value: obj[name], enumerable: true,
              configurable: true, writable: true }
            : null;
    },

    _define = Object.defineProperty || function(obj, name, desc) {
      if ((desc.get || desc.set) && obj.__defineGetter__) {
        if (desc.get)
          obj.__defineGetter__(name, desc.get);
        if (desc.set)
          obj.__defineSetter__(name, desc.set);
      } else {
        obj[name] = desc.value;
      }
      return obj;
    },

    define = function(obj, name, desc) {
      delete obj[name];
      return _define(obj, name, desc);
    };

  function inject(dest, src, enumerable, beans, preserve) {
    var beansNames = {};

    function field(name, val) {
      val = val || (val = describe(src, name))
          && (val.get ? val : val.value);
      if (typeof val === 'string' && val[0] === '#')
        val = dest[val.substring(1)] || val;
      var isFunc = typeof val === 'function',
        res = val,
        prev = preserve || isFunc
            ? (val && val.get ? name in dest : dest[name])
            : null,
        bean;
      if (!preserve || !prev) {
        if (isFunc && prev)
          val.base = prev;
        if (isFunc && beans !== false
            && (bean = name.match(/^([gs]et|is)(([A-Z])(.*))$/)))
          beansNames[bean[3].toLowerCase() + bean[4]] = bean[2];
        if (!res || isFunc || !res.get || typeof res.get !== 'function'
            || !Base.isPlainObject(res))
          res = { value: res, writable: true };
        if ((describe(dest, name)
            || { configurable: true }).configurable) {
          res.configurable = true;
          res.enumerable = enumerable;
        }
        define(dest, name, res);
      }
    }
    if (src) {
      for (var name in src) {
        if (src.hasOwnProperty(name) && !hidden.test(name))
          field(name);
      }
      for (var name in beansNames) {
        var part = beansNames[name],
          set = dest['set' + part],
          get = dest['get' + part] || set && dest['is' + part];
        if (get && (beans === true || get.length === 0))
          field(name, { get: get, set: set });
      }
    }
    return dest;
  }

  function each(obj, iter, bind) {
    if (obj)
      ('length' in obj && !obj.getLength
          && typeof obj.length === 'number'
        ? forEach
        : forIn).call(obj, iter, bind = bind || obj);
    return bind;
  }

  function set(obj, props) {
    for (var i in props)
      if (props.hasOwnProperty(i))
        obj[i] = props[i];
    return obj;
  }

  return inject(function Base() {
    for (var i = 0, l = arguments.length; i < l; i++)
      set(this, arguments[i]);
  }, {
    inject: function(src) {
      if (src) {
        var statics = src.statics === true ? src : src.statics,
          beans = src.beans,
          preserve = src.preserve;
        if (statics !== src)
          inject(this.prototype, src, src.enumerable, beans, preserve);
        inject(this, statics, true, beans, preserve);
      }
      for (var i = 1, l = arguments.length; i < l; i++)
        this.inject(arguments[i]);
      return this;
    },

    extend: function() {
      var base = this,
        ctor;
      for (var i = 0, l = arguments.length; i < l; i++)
        if (ctor = arguments[i].initialize)
          break;
      ctor = ctor || function() {
        base.apply(this, arguments);
      };
      ctor.prototype = create(this.prototype);
      ctor.base = base;
      define(ctor.prototype, 'constructor',
          { value: ctor, writable: true, configurable: true });
      inject(ctor, this, true);
      return arguments.length ? this.inject.apply(ctor, arguments) : ctor;
    }
  }, true).inject({
    inject: function() {
      for (var i = 0, l = arguments.length; i < l; i++) {
        var src = arguments[i];
        if (src)
          inject(this, src, src.enumerable, src.beans, src.preserve);
      }
      return this;
    },

    extend: function() {
      var res = create(this);
      return res.inject.apply(res, arguments);
    },

    each: function(iter, bind) {
      return each(this, iter, bind);
    },

    clone: function() {
      return new this.constructor(this);
    },

    statics: {
      each: each,
      create: create,
      define: define,
      describe: describe,
      set: set,

      clone: function(obj) {
        return set(new obj.constructor(), obj);
      },

      isPlainObject: function(obj) {
        var ctor = obj != null && obj.constructor;
        return ctor && (ctor === Object || ctor === Base
            || ctor.name === 'Object');
      },

      pick: function() {
        for (var i = 0, l = arguments.length; i < l; i++)
          if (arguments[i] !== undefined)
            return arguments[i];
      }
    }
  });
};

if (typeof module !== 'undefined')
  module.exports = Base;

if (!Array.isArray) {
  Array.isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };
}

if (!document.head) {
  document.head = document.getElementsByTagName('head')[0];
}

Base.inject({
  toString: function() {
    return this._id != null
      ?  (this._class || 'Object') + (this._name
        ? " '" + this._name + "'"
        : ' @' + this._id)
      : '{ ' + Base.each(this, function(value, key) {
        if (!/^_/.test(key)) {
          var type = typeof value;
          this.push(key + ': ' + (type === 'number'
              ? Formatter.instance.number(value)
              : type === 'string' ? "'" + value + "'" : value));
        }
      }, []).join(', ') + ' }';
  },

  exportJSON: function(options) {
    return Base.exportJSON(this, options);
  },

  toJSON: function() {
    return Base.serialize(this);
  },

  _set: function(props, exclude) {
    if (props && Base.isPlainObject(props)) {
      var orig = props._filtering || props;
      for (var key in orig) {
        if (key in this && orig.hasOwnProperty(key)
            && (!exclude || !exclude[key])) {
          var value = props[key];
          if (value !== undefined)
            this[key] = value;
        }
      }
      return true;
    }
  },

  statics: {

    exports: {
      enumerable: true 
    },

    extend: function extend() {
      var res = extend.base.apply(this, arguments),
        name = res.prototype._class;
      if (name && !Base.exports[name])
        Base.exports[name] = res;
      return res;
    },

    equals: function(obj1, obj2) {
      function checkKeys(o1, o2) {
        for (var i in o1)
          if (o1.hasOwnProperty(i) && !o2.hasOwnProperty(i))
            return false;
        return true;
      }
      if (obj1 === obj2)
        return true;
      if (obj1 && obj1.equals)
        return obj1.equals(obj2);
      if (obj2 && obj2.equals)
        return obj2.equals(obj1);
      if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length)
          return false;
        for (var i = 0, l = obj1.length; i < l; i++) {
          if (!Base.equals(obj1[i], obj2[i]))
            return false;
        }
        return true;
      }
      if (obj1 && typeof obj1 === 'object'
          && obj2 && typeof obj2 === 'object') {
        if (!checkKeys(obj1, obj2) || !checkKeys(obj2, obj1))
          return false;
        for (var i in obj1) {
          if (obj1.hasOwnProperty(i)
              && !Base.equals(obj1[i], obj2[i]))
            return false;
        }
        return true;
      }
      return false;
    },

    read: function(list, start, options, length) {
      if (this === Base) {
        var value = this.peek(list, start);
        list.__index++;
        return value;
      }
      var proto = this.prototype,
        readIndex = proto._readIndex,
        index = start || readIndex && list.__index || 0;
      if (!length)
        length = list.length - index;
      var obj = list[index];
      if (obj instanceof this
        || options && options.readNull && obj == null && length <= 1) {
        if (readIndex)
          list.__index = index + 1;
        return obj && options && options.clone ? obj.clone() : obj;
      }
      obj = Base.create(this.prototype);
      if (readIndex)
        obj.__read = true;
      obj = obj.initialize.apply(obj, index > 0 || length < list.length
        ? Array.prototype.slice.call(list, index, index + length)
        : list) || obj;
      if (readIndex) {
        list.__index = index + obj.__read;
        obj.__read = undefined;
      }
      return obj;
    },

    peek: function(list, start) {
      return list[list.__index = start || list.__index || 0];
    },

    remain: function(list) {
      return list.length - (list.__index || 0);
    },

    readAll: function(list, start, options) {
      var res = [],
        entry;
      for (var i = start || 0, l = list.length; i < l; i++) {
        res.push(Array.isArray(entry = list[i])
            ? this.read(entry, 0, options)
            : this.read(list, i, options, 1));
      }
      return res;
    },

    readNamed: function(list, name, start, options, length) {
      var value = this.getNamed(list, name),
        hasObject = value !== undefined;
      if (hasObject) {
        var filtered = list._filtered;
        if (!filtered) {
          filtered = list._filtered = Base.create(list[0]);
          filtered._filtering = list[0];
        }
        filtered[name] = undefined;
      }
      return this.read(hasObject ? [value] : list, start, options, length);
    },

    getNamed: function(list, name) {
      var arg = list[0];
      if (list._hasObject === undefined)
        list._hasObject = list.length === 1 && Base.isPlainObject(arg);
      if (list._hasObject)
        return name ? arg[name] : list._filtered || arg;
    },

    hasNamed: function(list, name) {
      return !!this.getNamed(list, name);
    },

    isPlainValue: function(obj) {
      return this.isPlainObject(obj) || Array.isArray(obj);
    },

    serialize: function(obj, options, compact, dictionary) {
      options = options || {};

      var root = !dictionary,
        res;
      if (root) {
        options.formatter = new Formatter(options.precision);
        dictionary = {
          length: 0,
          definitions: {},
          references: {},
          add: function(item, create) {
            var id = '#' + item._id,
              ref = this.references[id];
            if (!ref) {
              this.length++;
              var res = create.call(item),
                name = item._class;
              if (name && res[0] !== name)
                res.unshift(name);
              this.definitions[id] = res;
              ref = this.references[id] = [id];
            }
            return ref;
          }
        };
      }
      if (obj && obj._serialize) {
        res = obj._serialize(options, dictionary);
        var name = obj._class;
        if (name && !compact && !res._compact && res[0] !== name)
          res.unshift(name);
      } else if (Array.isArray(obj)) {
        res = [];
        for (var i = 0, l = obj.length; i < l; i++)
          res[i] = Base.serialize(obj[i], options, compact,
              dictionary);
        if (compact)
          res._compact = true;
      } else if (Base.isPlainObject(obj)) {
        res = {};
        for (var i in obj)
          if (obj.hasOwnProperty(i))
            res[i] = Base.serialize(obj[i], options, compact,
                dictionary);
      } else if (typeof obj === 'number') {
        res = options.formatter.number(obj, options.precision);
      } else {
        res = obj;
      }
      return root && dictionary.length > 0
          ? [['dictionary', dictionary.definitions], res]
          : res;
    },

    deserialize: function(json, create, _data) {
      var res = json,
        isRoot = !_data;
      _data = _data || {};
      if (Array.isArray(json)) {
        var type = json[0],
          isDictionary = type === 'dictionary';
        if (!isDictionary) {
          if (_data.dictionary && json.length == 1 && /^#/.test(type))
            return _data.dictionary[type];
          type = Base.exports[type];
        }
        res = [];
        for (var i = type ? 1 : 0, l = json.length; i < l; i++)
          res.push(Base.deserialize(json[i], create, _data));
        if (isDictionary) {
          _data.dictionary = res[0];
        } else if (type) {
          var args = res;
          if (create) {
            res = create(type, args, isRoot);
          } else {
            res = Base.create(type.prototype);
            type.apply(res, args);
          }
        }
      } else if (Base.isPlainObject(json)) {
        res = {};
        for (var key in json)
          res[key] = Base.deserialize(json[key], create, _data);
      }
      return res;
    },

    exportJSON: function(obj, options) {
      var json = Base.serialize(obj, options);
      return options && options.asString === false
          ? json
          : JSON.stringify(json);
    },

    importJSON: function(json, target) {
      return Base.deserialize(
          typeof json === 'string' ? JSON.parse(json) : json,
          function(type, args, isRoot) {
            var obj = target && target.constructor === type
                ? target
                : Base.create(type.prototype),
              isTarget = obj === target;
            if (!isRoot && args.length === 1 && obj instanceof Item
                && (!(obj instanceof Layer) || isTarget)) {
              var arg = args[0];
              if (Base.isPlainObject(arg))
                arg.insert = false;
            }
            type.apply(obj, args);
            if (isTarget)
              target = null;
            return obj;
          });
    },

    splice: function(list, items, index, remove) {
      var amount = items && items.length,
        append = index === undefined;
      index = append ? list.length : index;
      if (index > list.length)
        index = list.length;
      for (var i = 0; i < amount; i++)
        items[i]._index = index + i;
      if (append) {
        list.push.apply(list, items);
        return [];
      } else {
        var args = [index, remove];
        if (items)
          args.push.apply(args, items);
        var removed = list.splice.apply(list, args);
        for (var i = 0, l = removed.length; i < l; i++)
          removed[i]._index = undefined;
        for (var i = index + amount, l = list.length; i < l; i++)
          list[i]._index = i;
        return removed;
      }
    },

    capitalize: function(str) {
      return str.replace(/\b[a-z]/g, function(match) {
        return match.toUpperCase();
      });
    },

    camelize: function(str) {
      return str.replace(/-(.)/g, function(all, chr) {
        return chr.toUpperCase();
      });
    },

    hyphenate: function(str) {
      return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }
  }
});

var Callback = {
  attach: function(type, func) {
    if (typeof type !== 'string') {
      Base.each(type, function(value, key) {
        this.attach(key, value);
      }, this);
      return;
    }
    var entry = this._eventTypes[type];
    if (entry) {
      var handlers = this._handlers = this._handlers || {};
      handlers = handlers[type] = handlers[type] || [];
      if (handlers.indexOf(func) == -1) { 
        handlers.push(func);
        if (entry.install && handlers.length == 1)
          entry.install.call(this, type);
      }
    }
  },

  detach: function(type, func) {
    if (typeof type !== 'string') {
      Base.each(type, function(value, key) {
        this.detach(key, value);
      }, this);
      return;
    }
    var entry = this._eventTypes[type],
      handlers = this._handlers && this._handlers[type],
      index;
    if (entry && handlers) {
      if (!func || (index = handlers.indexOf(func)) != -1
          && handlers.length == 1) {
        if (entry.uninstall)
          entry.uninstall.call(this, type);
        delete this._handlers[type];
      } else if (index != -1) {
        handlers.splice(index, 1);
      }
    }
  },

  once: function(type, func) {
    this.attach(type, function() {
      func.apply(this, arguments);
      this.detach(type, func);
    });
  },

  fire: function(type, event) {
    var handlers = this._handlers && this._handlers[type];
    if (!handlers)
      return false;
    var args = [].slice.call(arguments, 1),
      that = this;
    for (var i = 0, l = handlers.length; i < l; i++) {
      if (handlers[i].apply(that, args) === false
          && event && event.stop) {
        event.stop();
        break;
      }
    }
    return true;
  },

  responds: function(type) {
    return !!(this._handlers && this._handlers[type]);
  },

  on: '#attach',
  off: '#detach',
  trigger: '#fire',

  _installEvents: function(install) {
    var handlers = this._handlers,
      key = install ? 'install' : 'uninstall';
    for (var type in handlers) {
      if (handlers[type].length > 0) {
        var entry = this._eventTypes[type],
          func = entry[key];
        if (func)
          func.call(this, type);
      }
    }
  },

  statics: {
    inject: function inject() {
      for (var i = 0, l = arguments.length; i < l; i++) {
        var src = arguments[i],
          events = src._events;
        if (events) {
          var types = {};
          Base.each(events, function(entry, key) {
            var isString = typeof entry === 'string',
              name = isString ? entry : key,
              part = Base.capitalize(name),
              type = name.substring(2).toLowerCase();
            types[type] = isString ? {} : entry;
            name = '_' + name;
            src['get' + part] = function() {
              return this[name];
            };
            src['set' + part] = function(func) {
              var prev = this[name];
              if (prev)
                this.detach(type, prev);
              if (func)
                this.attach(type, func);
              this[name] = func;
            };
          });
          src._eventTypes = types;
        }
        inject.base.call(this, src);
      }
      return this;
    }
  }
};

var PaperScope = Base.extend({
  _class: 'PaperScope',

  initialize: function PaperScope(script) {
    paper = this;
    this.settings = {
      applyMatrix: true,
      handleSize: 4,
      hitTolerance: 0
    };
    this.project = null;
    this.projects = [];
    this.tools = [];
    this.palettes = [];
    this._id = script && (script.getAttribute('id') || script.src)
        || ('paperscope-' + (PaperScope._id++));
    if (script)
      script.setAttribute('id', this._id);
    PaperScope._scopes[this._id] = this;
    if (!this.support) {
      var ctx = CanvasProvider.getContext(1, 1);
      PaperScope.prototype.support = {
        nativeDash: 'setLineDash' in ctx || 'mozDash' in ctx,
        nativeBlendModes: BlendMode.nativeModes
      };
      CanvasProvider.release(ctx);
    }
  },

  version: '0.9.18',

  getView: function() {
    return this.project && this.project.getView();
  },

  getPaper: function() {
    return this;
  },

  execute: function(code) {
    paper.PaperScript.execute(code, this);
    View.updateFocus();
  },

  install: function(scope) {
    var that = this;
    Base.each(['project', 'view', 'tool'], function(key) {
      Base.define(scope, key, {
        configurable: true,
        get: function() {
          return that[key];
        }
      });
    });
    for (var key in this)
      if (!/^_/.test(key) && this[key])
        scope[key] = this[key];
  },

  setup: function(canvas) {
    paper = this;
    this.project = new Project(canvas);
    return this;
  },

  activate: function() {
    paper = this;
  },

  clear: function() {
    for (var i = this.projects.length - 1; i >= 0; i--)
      this.projects[i].remove();
    for (var i = this.tools.length - 1; i >= 0; i--)
      this.tools[i].remove();
    for (var i = this.palettes.length - 1; i >= 0; i--)
      this.palettes[i].remove();
  },

  remove: function() {
    this.clear();
    delete PaperScope._scopes[this._id];
  },

  statics: new function() {
    function handleAttribute(name) {
      name += 'Attribute';
      return function(el, attr) {
        return el[name](attr) || el[name]('data-paper-' + attr);
      };
    }

    return {
      _scopes: {},
      _id: 0,

      get: function(id) {
        if (id && id.getAttribute)
          id = id.getAttribute('id');
        return this._scopes[id] || null;
      },

      getAttribute: handleAttribute('get'),
      hasAttribute: handleAttribute('has')
    };
  }
});

var PaperScopeItem = Base.extend(Callback, {

  initialize: function(activate) {
    this._scope = paper;
    this._index = this._scope[this._list].push(this) - 1;
    if (activate || !this._scope[this._reference])
      this.activate();
  },

  activate: function() {
    if (!this._scope)
      return false;
    var prev = this._scope[this._reference];
    if (prev && prev !== this)
      prev.fire('deactivate');
    this._scope[this._reference] = this;
    this.fire('activate', prev);
    return true;
  },

  isActive: function() {
    return this._scope[this._reference] === this;
  },

  remove: function() {
    if (this._index == null)
      return false;
    Base.splice(this._scope[this._list], null, this._index, 1);
    if (this._scope[this._reference] == this)
      this._scope[this._reference] = null;
    this._scope = null;
    return true;
  }
});

var Formatter = Base.extend({
  initialize: function(precision) {
    this.precision = precision || 5;
    this.multiplier = Math.pow(10, this.precision);
  },

  number: function(val) {
    return Math.round(val * this.multiplier) / this.multiplier;
  },

  point: function(val, separator) {
    return this.number(val.x) + (separator || ',') + this.number(val.y);
  },

  size: function(val, separator) {
    return this.number(val.width) + (separator || ',')
        + this.number(val.height);
  },

  rectangle: function(val, separator) {
    return this.point(val, separator) + (separator || ',')
        + this.size(val, separator);
  }
});

Formatter.instance = new Formatter();

var Numerical = new function() {

  var abscissas = [
    [  0.5773502691896257645091488],
    [0,0.7745966692414833770358531],
    [  0.3399810435848562648026658,0.8611363115940525752239465],
    [0,0.5384693101056830910363144,0.9061798459386639927976269],
    [  0.2386191860831969086305017,0.6612093864662645136613996,0.9324695142031520278123016],
    [0,0.4058451513773971669066064,0.7415311855993944398638648,0.9491079123427585245261897],
    [  0.1834346424956498049394761,0.5255324099163289858177390,0.7966664774136267395915539,0.9602898564975362316835609],
    [0,0.3242534234038089290385380,0.6133714327005903973087020,0.8360311073266357942994298,0.9681602395076260898355762],
    [  0.1488743389816312108848260,0.4333953941292471907992659,0.6794095682990244062343274,0.8650633666889845107320967,0.9739065285171717200779640],
    [0,0.2695431559523449723315320,0.5190961292068118159257257,0.7301520055740493240934163,0.8870625997680952990751578,0.9782286581460569928039380],
    [  0.1252334085114689154724414,0.3678314989981801937526915,0.5873179542866174472967024,0.7699026741943046870368938,0.9041172563704748566784659,0.9815606342467192506905491],
    [0,0.2304583159551347940655281,0.4484927510364468528779129,0.6423493394403402206439846,0.8015780907333099127942065,0.9175983992229779652065478,0.9841830547185881494728294],
    [  0.1080549487073436620662447,0.3191123689278897604356718,0.5152486363581540919652907,0.6872929048116854701480198,0.8272013150697649931897947,0.9284348836635735173363911,0.9862838086968123388415973],
    [0,0.2011940939974345223006283,0.3941513470775633698972074,0.5709721726085388475372267,0.7244177313601700474161861,0.8482065834104272162006483,0.9372733924007059043077589,0.9879925180204854284895657],
    [  0.0950125098376374401853193,0.2816035507792589132304605,0.4580167776572273863424194,0.6178762444026437484466718,0.7554044083550030338951012,0.8656312023878317438804679,0.9445750230732325760779884,0.9894009349916499325961542]
  ];

  var weights = [
    [1],
    [0.8888888888888888888888889,0.5555555555555555555555556],
    [0.6521451548625461426269361,0.3478548451374538573730639],
    [0.5688888888888888888888889,0.4786286704993664680412915,0.2369268850561890875142640],
    [0.4679139345726910473898703,0.3607615730481386075698335,0.1713244923791703450402961],
    [0.4179591836734693877551020,0.3818300505051189449503698,0.2797053914892766679014678,0.1294849661688696932706114],
    [0.3626837833783619829651504,0.3137066458778872873379622,0.2223810344533744705443560,0.1012285362903762591525314],
    [0.3302393550012597631645251,0.3123470770400028400686304,0.2606106964029354623187429,0.1806481606948574040584720,0.0812743883615744119718922],
    [0.2955242247147528701738930,0.2692667193099963550912269,0.2190863625159820439955349,0.1494513491505805931457763,0.0666713443086881375935688],
    [0.2729250867779006307144835,0.2628045445102466621806889,0.2331937645919904799185237,0.1862902109277342514260976,0.1255803694649046246346943,0.0556685671161736664827537],
    [0.2491470458134027850005624,0.2334925365383548087608499,0.2031674267230659217490645,0.1600783285433462263346525,0.1069393259953184309602547,0.0471753363865118271946160],
    [0.2325515532308739101945895,0.2262831802628972384120902,0.2078160475368885023125232,0.1781459807619457382800467,0.1388735102197872384636018,0.0921214998377284479144218,0.0404840047653158795200216],
    [0.2152638534631577901958764,0.2051984637212956039659241,0.1855383974779378137417166,0.1572031671581935345696019,0.1215185706879031846894148,0.0801580871597602098056333,0.0351194603317518630318329],
    [0.2025782419255612728806202,0.1984314853271115764561183,0.1861610000155622110268006,0.1662692058169939335532009,0.1395706779261543144478048,0.1071592204671719350118695,0.0703660474881081247092674,0.0307532419961172683546284],
    [0.1894506104550684962853967,0.1826034150449235888667637,0.1691565193950025381893121,0.1495959888165767320815017,0.1246289712555338720524763,0.0951585116824927848099251,0.0622535239386478928628438,0.0271524594117540948517806]
  ];

  var abs = Math.abs,
    sqrt = Math.sqrt,
    pow = Math.pow,
    cos = Math.cos,
    PI = Math.PI,
    TOLERANCE = 10e-6,
    EPSILON = 10e-12;

  function setupRoots(roots, min, max) {
    var unbound = min === undefined,
      minE = min - EPSILON,
      maxE = max + EPSILON,
      count = 0;
    return function(root) {
      if (unbound || root > minE && root < maxE)
        roots[count++] = root < min ? min : root > max ? max : root;
      return count;
    };
  }

  return {
    TOLERANCE: TOLERANCE,
    EPSILON: EPSILON,
    KAPPA: 4 * (sqrt(2) - 1) / 3,

    isZero: function(val) {
      return abs(val) <= EPSILON;
    },

    integrate: function(f, a, b, n) {
      var x = abscissas[n - 2],
        w = weights[n - 2],
        A = 0.5 * (b - a),
        B = A + a,
        i = 0,
        m = (n + 1) >> 1,
        sum = n & 1 ? w[i++] * f(B) : 0; 
      while (i < m) {
        var Ax = A * x[i];
        sum += w[i++] * (f(B + Ax) + f(B - Ax));
      }
      return A * sum;
    },

    findRoot: function(f, df, x, a, b, n, tolerance) {
      for (var i = 0; i < n; i++) {
        var fx = f(x),
          dx = fx / df(x),
          nx = x - dx;
        if (abs(dx) < tolerance)
          return nx;
        if (fx > 0) {
          b = x;
          x = nx <= a ? 0.5 * (a + b) : nx;
        } else {
          a = x;
          x = nx >= b ? 0.5 * (a + b) : nx;
        }
      }
      return x;
    },

    solveQuadratic: function(a, b, c, roots, min, max) {
      var add = setupRoots(roots, min, max);

      if (abs(a) < EPSILON) {
        if (abs(b) >= EPSILON)
          return add(-c / b);
        return abs(c) < EPSILON ? -1 : 0; 
      }
      var p = b / (2 * a);
      var q = c / a;
      var p2 = p * p;
      if (p2 < q - EPSILON)
        return 0;
      var s = p2 > q ? sqrt(p2 - q) : 0,
        count = add(s - p);
      if (s > 0)
        count = add(-s - p);
      return count;
    },

    solveCubic: function(a, b, c, d, roots, min, max) {
      if (abs(a) < EPSILON)
        return Numerical.solveQuadratic(b, c, d, roots, min, max);

      b /= a;
      c /= a;
      d /= a;
      var add = setupRoots(roots, min, max),
        bb = b * b,
        p = (bb - 3 * c) / 9,
        q = (2 * bb * b - 9 * b * c + 27 * d) / 54,
        ppp = p * p * p,
        D = q * q - ppp;
      b /= 3;
      if (abs(D) < EPSILON) {
        if (abs(q) < EPSILON) 
          return add(-b);
        var sqp = sqrt(p),
          snq = q > 0 ? 1 : -1;
        add(-snq * 2 * sqp - b);
        return add(snq * sqp - b);
      }
      if (D < 0) { 
        var sqp = sqrt(p),
          phi = Math.acos(q / (sqp * sqp * sqp)) / 3,
          t = -2 * sqp,
          o = 2 * PI / 3;
        add(t * cos(phi) - b);
        add(t * cos(phi + o) - b);
        return add(t * cos(phi - o) - b);
      }
      var A = (q > 0 ? -1 : 1) * pow(abs(q) + sqrt(D), 1 / 3);
      return add(A + p / A - b);
    }
  };
};

var Point = Base.extend({
  _class: 'Point',
  _readIndex: true,

  initialize: function Point(arg0, arg1) {
    var type = typeof arg0;
    if (type === 'number') {
      var hasY = typeof arg1 === 'number';
      this.x = arg0;
      this.y = hasY ? arg1 : arg0;
      if (this.__read)
        this.__read = hasY ? 2 : 1;
    } else if (type === 'undefined' || arg0 === null) {
      this.x = this.y = 0;
      if (this.__read)
        this.__read = arg0 === null ? 1 : 0;
    } else {
      if (Array.isArray(arg0)) {
        this.x = arg0[0];
        this.y = arg0.length > 1 ? arg0[1] : arg0[0];
      } else if (arg0.x != null) {
        this.x = arg0.x;
        this.y = arg0.y;
      } else if (arg0.width != null) {
        this.x = arg0.width;
        this.y = arg0.height;
      } else if (arg0.angle != null) {
        this.x = arg0.length;
        this.y = 0;
        this.setAngle(arg0.angle);
      } else {
        this.x = this.y = 0;
        if (this.__read)
          this.__read = 0;
      }
      if (this.__read)
        this.__read = 1;
    }
  },

  set: function(x, y) {
    this.x = x;
    this.y = y;
    return this;
  },

  equals: function(point) {
    return this === point || point
        && (this.x === point.x && this.y === point.y
          || Array.isArray(point)
            && this.x === point[0] && this.y === point[1])
        || false;
  },

  clone: function() {
    return new Point(this.x, this.y);
  },

  toString: function() {
    var f = Formatter.instance;
    return '{ x: ' + f.number(this.x) + ', y: ' + f.number(this.y) + ' }';
  },

  _serialize: function(options) {
    var f = options.formatter;
    return [f.number(this.x), f.number(this.y)];
  },

  getLength: function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },

  setLength: function(length) {
    if (this.isZero()) {
      var angle = this._angle || 0;
      this.set(
        Math.cos(angle) * length,
        Math.sin(angle) * length
      );
    } else {
      var scale = length / this.getLength();
      if (Numerical.isZero(scale))
        this.getAngle();
      this.set(
        this.x * scale,
        this.y * scale
      );
    }
  },
  getAngle: function() {
    return this.getAngleInRadians.apply(this, arguments) * 180 / Math.PI;
  },

  setAngle: function(angle) {
    this.setAngleInRadians.call(this, angle * Math.PI / 180);
  },

  getAngleInDegrees: '#getAngle',
  setAngleInDegrees: '#setAngle',

  getAngleInRadians: function() {
    if (!arguments.length) {
      return this.isZero()
          ? this._angle || 0
          : this._angle = Math.atan2(this.y, this.x);
    } else {
      var point = Point.read(arguments),
        div = this.getLength() * point.getLength();
      if (Numerical.isZero(div)) {
        return NaN;
      } else {
        return Math.acos(this.dot(point) / div);
      }
    }
  },

  setAngleInRadians: function(angle) {
    this._angle = angle;
    if (!this.isZero()) {
      var length = this.getLength();
      this.set(
        Math.cos(angle) * length,
        Math.sin(angle) * length
      );
    }
  },

  getQuadrant: function() {
    return this.x >= 0 ? this.y >= 0 ? 1 : 4 : this.y >= 0 ? 2 : 3;
  }
}, {
  beans: false,

  getDirectedAngle: function() {
    var point = Point.read(arguments);
    return Math.atan2(this.cross(point), this.dot(point)) * 180 / Math.PI;
  },

  getDistance: function() {
    var point = Point.read(arguments),
      x = point.x - this.x,
      y = point.y - this.y,
      d = x * x + y * y,
      squared = Base.read(arguments);
    return squared ? d : Math.sqrt(d);
  },

  normalize: function(length) {
    if (length === undefined)
      length = 1;
    var current = this.getLength(),
      scale = current !== 0 ? length / current : 0,
      point = new Point(this.x * scale, this.y * scale);
    if (scale >= 0)
      point._angle = this._angle;
    return point;
  },

  rotate: function(angle, center) {
    if (angle === 0)
      return this.clone();
    angle = angle * Math.PI / 180;
    var point = center ? this.subtract(center) : this,
      s = Math.sin(angle),
      c = Math.cos(angle);
    point = new Point(
      point.x * c - point.y * s,
      point.x * s + point.y * c
    );
    return center ? point.add(center) : point;
  },

  transform: function(matrix) {
    return matrix ? matrix._transformPoint(this) : this;
  },

  add: function() {
    var point = Point.read(arguments);
    return new Point(this.x + point.x, this.y + point.y);
  },

  subtract: function() {
    var point = Point.read(arguments);
    return new Point(this.x - point.x, this.y - point.y);
  },

  multiply: function() {
    var point = Point.read(arguments);
    return new Point(this.x * point.x, this.y * point.y);
  },

  divide: function() {
    var point = Point.read(arguments);
    return new Point(this.x / point.x, this.y / point.y);
  },

  modulo: function() {
    var point = Point.read(arguments);
    return new Point(this.x % point.x, this.y % point.y);
  },

  negate: function() {
    return new Point(-this.x, -this.y);
  },

  isInside: function(rect) {
    return rect.contains(this);
  },

  isClose: function(point, tolerance) {
    return this.getDistance(point) < tolerance;
  },

  isColinear: function(point) {
    return Math.abs(this.cross(point)) < 0.00001;
  },

  isOrthogonal: function(point) {
    return Math.abs(this.dot(point)) < 0.00001;
  },

  isZero: function() {
    return Numerical.isZero(this.x) && Numerical.isZero(this.y);
  },

  isNaN: function() {
    return isNaN(this.x) || isNaN(this.y);
  },

  dot: function() {
    var point = Point.read(arguments);
    return this.x * point.x + this.y * point.y;
  },

  cross: function() {
    var point = Point.read(arguments);
    return this.x * point.y - this.y * point.x;
  },

  project: function() {
    var point = Point.read(arguments);
    if (point.isZero()) {
      return new Point(0, 0);
    } else {
      var scale = this.dot(point) / point.dot(point);
      return new Point(
        point.x * scale,
        point.y * scale
      );
    }
  },

  statics: {
    min: function() {
      var point1 = Point.read(arguments),
        point2 = Point.read(arguments);
      return new Point(
        Math.min(point1.x, point2.x),
        Math.min(point1.y, point2.y)
      );
    },

    max: function() {
      var point1 = Point.read(arguments),
        point2 = Point.read(arguments);
      return new Point(
        Math.max(point1.x, point2.x),
        Math.max(point1.y, point2.y)
      );
    },

    random: function() {
      return new Point(Math.random(), Math.random());
    }
  }
}, Base.each(['round', 'ceil', 'floor', 'abs'], function(name) {
  var op = Math[name];
  this[name] = function() {
    return new Point(op(this.x), op(this.y));
  };
}, {}));

var LinkedPoint = Point.extend({
  initialize: function Point(x, y, owner, setter) {
    this._x = x;
    this._y = y;
    this._owner = owner;
    this._setter = setter;
  },

  set: function(x, y, _dontNotify) {
    this._x = x;
    this._y = y;
    if (!_dontNotify)
      this._owner[this._setter](this);
    return this;
  },

  getX: function() {
    return this._x;
  },

  setX: function(x) {
    this._x = x;
    this._owner[this._setter](this);
  },

  getY: function() {
    return this._y;
  },

  setY: function(y) {
    this._y = y;
    this._owner[this._setter](this);
  }
});

var Size = Base.extend({
  _class: 'Size',
  _readIndex: true,

  initialize: function Size(arg0, arg1) {
    var type = typeof arg0;
    if (type === 'number') {
      var hasHeight = typeof arg1 === 'number';
      this.width = arg0;
      this.height = hasHeight ? arg1 : arg0;
      if (this.__read)
        this.__read = hasHeight ? 2 : 1;
    } else if (type === 'undefined' || arg0 === null) {
      this.width = this.height = 0;
      if (this.__read)
        this.__read = arg0 === null ? 1 : 0;
    } else {
      if (Array.isArray(arg0)) {
        this.width = arg0[0];
        this.height = arg0.length > 1 ? arg0[1] : arg0[0];
      } else if (arg0.width != null) {
        this.width = arg0.width;
        this.height = arg0.height;
      } else if (arg0.x != null) {
        this.width = arg0.x;
        this.height = arg0.y;
      } else {
        this.width = this.height = 0;
        if (this.__read)
          this.__read = 0;
      }
      if (this.__read)
        this.__read = 1;
    }
  },

  set: function(width, height) {
    this.width = width;
    this.height = height;
    return this;
  },

  equals: function(size) {
    return size === this || size && (this.width === size.width
        && this.height === size.height
        || Array.isArray(size) && this.width === size[0]
          && this.height === size[1]) || false;
  },

  clone: function() {
    return new Size(this.width, this.height);
  },

  toString: function() {
    var f = Formatter.instance;
    return '{ width: ' + f.number(this.width)
        + ', height: ' + f.number(this.height) + ' }';
  },

  _serialize: function(options) {
    var f = options.formatter;
    return [f.number(this.width),
        f.number(this.height)];
  },

  add: function() {
    var size = Size.read(arguments);
    return new Size(this.width + size.width, this.height + size.height);
  },

  subtract: function() {
    var size = Size.read(arguments);
    return new Size(this.width - size.width, this.height - size.height);
  },

  multiply: function() {
    var size = Size.read(arguments);
    return new Size(this.width * size.width, this.height * size.height);
  },

  divide: function() {
    var size = Size.read(arguments);
    return new Size(this.width / size.width, this.height / size.height);
  },

  modulo: function() {
    var size = Size.read(arguments);
    return new Size(this.width % size.width, this.height % size.height);
  },

  negate: function() {
    return new Size(-this.width, -this.height);
  },

  isZero: function() {
    return Numerical.isZero(this.width) && Numerical.isZero(this.height);
  },

  isNaN: function() {
    return isNaN(this.width) || isNaN(this.height);
  },

  statics: {
    min: function(size1, size2) {
      return new Size(
        Math.min(size1.width, size2.width),
        Math.min(size1.height, size2.height));
    },

    max: function(size1, size2) {
      return new Size(
        Math.max(size1.width, size2.width),
        Math.max(size1.height, size2.height));
    },

    random: function() {
      return new Size(Math.random(), Math.random());
    }
  }
}, Base.each(['round', 'ceil', 'floor', 'abs'], function(name) {
  var op = Math[name];
  this[name] = function() {
    return new Size(op(this.width), op(this.height));
  };
}, {}));

var LinkedSize = Size.extend({
  initialize: function Size(width, height, owner, setter) {
    this._width = width;
    this._height = height;
    this._owner = owner;
    this._setter = setter;
  },

  set: function(width, height, _dontNotify) {
    this._width = width;
    this._height = height;
    if (!_dontNotify)
      this._owner[this._setter](this);
    return this;
  },

  getWidth: function() {
    return this._width;
  },

  setWidth: function(width) {
    this._width = width;
    this._owner[this._setter](this);
  },

  getHeight: function() {
    return this._height;
  },

  setHeight: function(height) {
    this._height = height;
    this._owner[this._setter](this);
  }
});

var Rectangle = Base.extend({
  _class: 'Rectangle',
  _readIndex: true,
  beans: true,

  initialize: function Rectangle(arg0, arg1, arg2, arg3) {
    var type = typeof arg0,
      read = 0;
    if (type === 'number') {
      this.x = arg0;
      this.y = arg1;
      this.width = arg2;
      this.height = arg3;
      read = 4;
    } else if (type === 'undefined' || arg0 === null) {
      this.x = this.y = this.width = this.height = 0;
      read = arg0 === null ? 1 : 0;
    } else if (arguments.length === 1) {
      if (Array.isArray(arg0)) {
        this.x = arg0[0];
        this.y = arg0[1];
        this.width = arg0[2];
        this.height = arg0[3];
        read = 1;
      } else if (arg0.x !== undefined || arg0.width !== undefined) {
        this.x = arg0.x || 0;
        this.y = arg0.y || 0;
        this.width = arg0.width || 0;
        this.height = arg0.height || 0;
        read = 1;
      } else if (arg0.from === undefined && arg0.to === undefined) {
        this.x = this.y = this.width = this.height = 0;
        this._set(arg0);
        read = 1;
      }
    }
    if (!read) {
      var point = Point.readNamed(arguments, 'from'),
        next = Base.peek(arguments);
      this.x = point.x;
      this.y = point.y;
      if (next && next.x !== undefined || Base.hasNamed(arguments, 'to')) {
        var to = Point.readNamed(arguments, 'to');
        this.width = to.x - point.x;
        this.height = to.y - point.y;
        if (this.width < 0) {
          this.x = to.x;
          this.width = -this.width;
        }
        if (this.height < 0) {
          this.y = to.y;
          this.height = -this.height;
        }
      } else {
        var size = Size.read(arguments);
        this.width = size.width;
        this.height = size.height;
      }
      read = arguments.__index;
    }
    if (this.__read)
      this.__read = read;
  },

  set: function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    return this;
  },

  clone: function() {
    return new Rectangle(this.x, this.y, this.width, this.height);
  },

  equals: function(rect) {
    var rt = Base.isPlainValue(rect)
        ? Rectangle.read(arguments)
        : rect;
    return rt === this
        || rt && this.x === rt.x && this.y === rt.y
          && this.width === rt.width && this.height === rt.height
        || false;
  },

  toString: function() {
    var f = Formatter.instance;
    return '{ x: ' + f.number(this.x)
        + ', y: ' + f.number(this.y)
        + ', width: ' + f.number(this.width)
        + ', height: ' + f.number(this.height)
        + ' }';
  },

  _serialize: function(options) {
    var f = options.formatter;
    return [f.number(this.x),
        f.number(this.y),
        f.number(this.width),
        f.number(this.height)];
  },

  getPoint: function(_dontLink) {
    var ctor = _dontLink ? Point : LinkedPoint;
    return new ctor(this.x, this.y, this, 'setPoint');
  },

  setPoint: function() {
    var point = Point.read(arguments);
    this.x = point.x;
    this.y = point.y;
  },

  getSize: function(_dontLink) {
    var ctor = _dontLink ? Size : LinkedSize;
    return new ctor(this.width, this.height, this, 'setSize');
  },

  setSize: function() {
    var size = Size.read(arguments);
    if (this._fixX)
      this.x += (this.width - size.width) * this._fixX;
    if (this._fixY)
      this.y += (this.height - size.height) * this._fixY;
    this.width = size.width;
    this.height = size.height;
    this._fixW = 1;
    this._fixH = 1;
  },

  getLeft: function() {
    return this.x;
  },

  setLeft: function(left) {
    if (!this._fixW)
      this.width -= left - this.x;
    this.x = left;
    this._fixX = 0;
  },

  getTop: function() {
    return this.y;
  },

  setTop: function(top) {
    if (!this._fixH)
      this.height -= top - this.y;
    this.y = top;
    this._fixY = 0;
  },

  getRight: function() {
    return this.x + this.width;
  },

  setRight: function(right) {
    if (this._fixX !== undefined && this._fixX !== 1)
      this._fixW = 0;
    if (this._fixW)
      this.x = right - this.width;
    else
      this.width = right - this.x;
    this._fixX = 1;
  },

  getBottom: function() {
    return this.y + this.height;
  },

  setBottom: function(bottom) {
    if (this._fixY !== undefined && this._fixY !== 1)
      this._fixH = 0;
    if (this._fixH)
      this.y = bottom - this.height;
    else
      this.height = bottom - this.y;
    this._fixY = 1;
  },

  getCenterX: function() {
    return this.x + this.width * 0.5;
  },

  setCenterX: function(x) {
    this.x = x - this.width * 0.5;
    this._fixX = 0.5;
  },

  getCenterY: function() {
    return this.y + this.height * 0.5;
  },

  setCenterY: function(y) {
    this.y = y - this.height * 0.5;
    this._fixY = 0.5;
  },

  getCenter: function(_dontLink) {
    var ctor = _dontLink ? Point : LinkedPoint;
    return new ctor(this.getCenterX(), this.getCenterY(), this, 'setCenter');
  },

  setCenter: function() {
    var point = Point.read(arguments);
    this.setCenterX(point.x);
    this.setCenterY(point.y);
    return this;
  },

  getArea: function() {
    return this.width * this.height;
  },

  isEmpty: function() {
    return this.width === 0 || this.height === 0;
  },

  contains: function(arg) {
    return arg && arg.width !== undefined
        || (Array.isArray(arg) ? arg : arguments).length == 4
        ? this._containsRectangle(Rectangle.read(arguments))
        : this._containsPoint(Point.read(arguments));
  },

  _containsPoint: function(point) {
    var x = point.x,
      y = point.y;
    return x >= this.x && y >= this.y
        && x <= this.x + this.width
        && y <= this.y + this.height;
  },

  _containsRectangle: function(rect) {
    var x = rect.x,
      y = rect.y;
    return x >= this.x && y >= this.y
        && x + rect.width <= this.x + this.width
        && y + rect.height <= this.y + this.height;
  },

  intersects: function() {
    var rect = Rectangle.read(arguments);
    return rect.x + rect.width > this.x
        && rect.y + rect.height > this.y
        && rect.x < this.x + this.width
        && rect.y < this.y + this.height;
  },

  touches: function() {
    var rect = Rectangle.read(arguments);
    return rect.x + rect.width >= this.x
        && rect.y + rect.height >= this.y
        && rect.x <= this.x + this.width
        && rect.y <= this.y + this.height;
  },

  intersect: function() {
    var rect = Rectangle.read(arguments),
      x1 = Math.max(this.x, rect.x),
      y1 = Math.max(this.y, rect.y),
      x2 = Math.min(this.x + this.width, rect.x + rect.width),
      y2 = Math.min(this.y + this.height, rect.y + rect.height);
    return new Rectangle(x1, y1, x2 - x1, y2 - y1);
  },

  unite: function() {
    var rect = Rectangle.read(arguments),
      x1 = Math.min(this.x, rect.x),
      y1 = Math.min(this.y, rect.y),
      x2 = Math.max(this.x + this.width, rect.x + rect.width),
      y2 = Math.max(this.y + this.height, rect.y + rect.height);
    return new Rectangle(x1, y1, x2 - x1, y2 - y1);
  },

  include: function() {
    var point = Point.read(arguments);
    var x1 = Math.min(this.x, point.x),
      y1 = Math.min(this.y, point.y),
      x2 = Math.max(this.x + this.width, point.x),
      y2 = Math.max(this.y + this.height, point.y);
    return new Rectangle(x1, y1, x2 - x1, y2 - y1);
  },

  expand: function() {
    var amount = Size.read(arguments),
      hor = amount.width,
      ver = amount.height;
    return new Rectangle(this.x - hor / 2, this.y - ver / 2,
        this.width + hor, this.height + ver);
  },

  scale: function(hor, ver) {
    return this.expand(this.width * hor - this.width,
        this.height * (ver === undefined ? hor : ver) - this.height);
  }
}, new function() {
  return Base.each([
      ['Top', 'Left'], ['Top', 'Right'],
      ['Bottom', 'Left'], ['Bottom', 'Right'],
      ['Left', 'Center'], ['Top', 'Center'],
      ['Right', 'Center'], ['Bottom', 'Center']
    ],
    function(parts, index) {
      var part = parts.join('');
      var xFirst = /^[RL]/.test(part);
      if (index >= 4)
        parts[1] += xFirst ? 'Y' : 'X';
      var x = parts[xFirst ? 0 : 1],
        y = parts[xFirst ? 1 : 0],
        getX = 'get' + x,
        getY = 'get' + y,
        setX = 'set' + x,
        setY = 'set' + y,
        get = 'get' + part,
        set = 'set' + part;
      this[get] = function(_dontLink) {
        var ctor = _dontLink ? Point : LinkedPoint;
        return new ctor(this[getX](), this[getY](), this, set);
      };
      this[set] = function() {
        var point = Point.read(arguments);
        this[setX](point.x);
        this[setY](point.y);
      };
    }, {
      beans: true
    });
});

var LinkedRectangle = Rectangle.extend({
  initialize: function Rectangle(x, y, width, height, owner, setter) {
    this.set(x, y, width, height, true);
    this._owner = owner;
    this._setter = setter;
  },

  set: function(x, y, width, height, _dontNotify) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    if (!_dontNotify)
      this._owner[this._setter](this);
    return this;
  }
}, new function() {
  var proto = Rectangle.prototype;

  return Base.each(['x', 'y', 'width', 'height'], function(key) {
    var part = Base.capitalize(key);
    var internal = '_' + key;
    this['get' + part] = function() {
      return this[internal];
    };

    this['set' + part] = function(value) {
      this[internal] = value;
      if (!this._dontNotify)
        this._owner[this._setter](this);
    };
  }, Base.each(['Point', 'Size', 'Center',
      'Left', 'Top', 'Right', 'Bottom', 'CenterX', 'CenterY',
      'TopLeft', 'TopRight', 'BottomLeft', 'BottomRight',
      'LeftCenter', 'TopCenter', 'RightCenter', 'BottomCenter'],
    function(key) {
      var name = 'set' + key;
      this[name] = function() {
        this._dontNotify = true;
        proto[name].apply(this, arguments);
        this._dontNotify = false;
        this._owner[this._setter](this);
      };
    }, {
      isSelected: function() {
        return this._owner._boundsSelected;
      },

      setSelected: function(selected) {
        var owner = this._owner;
        if (owner.setSelected) {
          owner._boundsSelected = selected;
          owner.setSelected(selected || owner._selectedSegmentState > 0);
        }
      }
    })
  );
});

var Matrix = Base.extend({
  _class: 'Matrix',

  initialize: function Matrix(arg) {
    var count = arguments.length,
      ok = true;
    if (count === 6) {
      this.set.apply(this, arguments);
    } else if (count === 1) {
      if (arg instanceof Matrix) {
        this.set(arg._a, arg._c, arg._b, arg._d, arg._tx, arg._ty);
      } else if (Array.isArray(arg)) {
        this.set.apply(this, arg);
      } else {
        ok = false;
      }
    } else if (count === 0) {
      this.reset();
    } else {
      ok = false;
    }
    if (!ok)
      throw new Error('Unsupported matrix parameters');
  },

  set: function(a, c, b, d, tx, ty, _dontNotify) {
    this._a = a;
    this._c = c;
    this._b = b;
    this._d = d;
    this._tx = tx;
    this._ty = ty;
    if (!_dontNotify)
      this._changed();
    return this;
  },

  _serialize: function(options) {
    return Base.serialize(this.getValues(), options);
  },

  _changed: function() {
    var owner = this._owner;
    if (owner) {
      if (owner._applyMatrix) {
        owner.transform(null, true);
      } else {
        owner._changed(9);
      }
    }
  },

  clone: function() {
    return new Matrix(this._a, this._c, this._b, this._d,
        this._tx, this._ty);
  },

  equals: function(mx) {
    return mx === this || mx && this._a === mx._a && this._b === mx._b
        && this._c === mx._c && this._d === mx._d
        && this._tx === mx._tx && this._ty === mx._ty
        || false;
  },

  toString: function() {
    var f = Formatter.instance;
    return '[[' + [f.number(this._a), f.number(this._b),
          f.number(this._tx)].join(', ') + '], ['
        + [f.number(this._c), f.number(this._d),
          f.number(this._ty)].join(', ') + ']]';
  },

  reset: function(_dontNotify) {
    this._a = this._d = 1;
    this._c = this._b = this._tx = this._ty = 0;
    if (!_dontNotify)
      this._changed();
    return this;
  },

  apply: function() {
    var owner = this._owner;
    if (owner) {
      owner.transform(null, true);
      return this.isIdentity();
    }
    return false;
  },

  translate: function() {
    var point = Point.read(arguments),
      x = point.x,
      y = point.y;
    this._tx += x * this._a + y * this._b;
    this._ty += x * this._c + y * this._d;
    this._changed();
    return this;
  },

  scale: function() {
    var scale = Point.read(arguments),
      center = Point.read(arguments, 0, { readNull: true });
    if (center)
      this.translate(center);
    this._a *= scale.x;
    this._c *= scale.x;
    this._b *= scale.y;
    this._d *= scale.y;
    if (center)
      this.translate(center.negate());
    this._changed();
    return this;
  },

  rotate: function(angle ) {
    angle *= Math.PI / 180;
    var center = Point.read(arguments, 1),
      x = center.x,
      y = center.y,
      cos = Math.cos(angle),
      sin = Math.sin(angle),
      tx = x - x * cos + y * sin,
      ty = y - x * sin - y * cos,
      a = this._a,
      b = this._b,
      c = this._c,
      d = this._d;
    this._a = cos * a + sin * b;
    this._b = -sin * a + cos * b;
    this._c = cos * c + sin * d;
    this._d = -sin * c + cos * d;
    this._tx += tx * a + ty * b;
    this._ty += tx * c + ty * d;
    this._changed();
    return this;
  },

  shear: function() {
    var shear = Point.read(arguments),
      center = Point.read(arguments, 0, { readNull: true });
    if (center)
      this.translate(center);
    var a = this._a,
      c = this._c;
    this._a += shear.y * this._b;
    this._c += shear.y * this._d;
    this._b += shear.x * a;
    this._d += shear.x * c;
    if (center)
      this.translate(center.negate());
    this._changed();
    return this;
  },

  skew: function() {
    var skew = Point.read(arguments),
      center = Point.read(arguments, 0, { readNull: true }),
      toRadians = Math.PI / 180,
      shear = new Point(Math.tan(skew.x * toRadians),
        Math.tan(skew.y * toRadians));
    return this.shear(shear, center);
  },

  concatenate: function(mx) {
    var a = this._a,
      b = this._b,
      c = this._c,
      d = this._d;
    this._a = mx._a * a + mx._c * b;
    this._b = mx._b * a + mx._d * b;
    this._c = mx._a * c + mx._c * d;
    this._d = mx._b * c + mx._d * d;
    this._tx += mx._tx * a + mx._ty * b;
    this._ty += mx._tx * c + mx._ty * d;
    this._changed();
    return this;
  },

  preConcatenate: function(mx) {
    var a = this._a,
      b = this._b,
      c = this._c,
      d = this._d,
      tx = this._tx,
      ty = this._ty;
    this._a = mx._a * a + mx._b * c;
    this._b = mx._a * b + mx._b * d;
    this._c = mx._c * a + mx._d * c;
    this._d = mx._c * b + mx._d * d;
    this._tx = mx._a * tx + mx._b * ty + mx._tx;
    this._ty = mx._c * tx + mx._d * ty + mx._ty;
    this._changed();
    return this;
  },

  isIdentity: function() {
    return this._a === 1 && this._c === 0 && this._b === 0 && this._d === 1
        && this._tx === 0 && this._ty === 0;
  },

  orNullIfIdentity: function() {
    return this.isIdentity() ? null : this;
  },

  isInvertible: function() {
    return !!this._getDeterminant();
  },

  isSingular: function() {
    return !this._getDeterminant();
  },

  transform: function( src, srcOffset, dst, dstOffset, count) {
    return arguments.length < 5
      ? this._transformPoint(Point.read(arguments))
      : this._transformCoordinates(src, srcOffset, dst, dstOffset, count);
  },

  _transformPoint: function(point, dest, _dontNotify) {
    var x = point.x,
      y = point.y;
    if (!dest)
      dest = new Point();
    return dest.set(
      x * this._a + y * this._b + this._tx,
      x * this._c + y * this._d + this._ty,
      _dontNotify
    );
  },

  _transformCoordinates: function(src, srcOffset, dst, dstOffset, count) {
    var i = srcOffset,
      j = dstOffset,
      max = i + 2 * count;
    while (i < max) {
      var x = src[i++],
        y = src[i++];
      dst[j++] = x * this._a + y * this._b + this._tx;
      dst[j++] = x * this._c + y * this._d + this._ty;
    }
    return dst;
  },

  _transformCorners: function(rect) {
    var x1 = rect.x,
      y1 = rect.y,
      x2 = x1 + rect.width,
      y2 = y1 + rect.height,
      coords = [ x1, y1, x2, y1, x2, y2, x1, y2 ];
    return this._transformCoordinates(coords, 0, coords, 0, 4);
  },

  _transformBounds: function(bounds, dest, _dontNotify) {
    var coords = this._transformCorners(bounds),
      min = coords.slice(0, 2),
      max = coords.slice();
    for (var i = 2; i < 8; i++) {
      var val = coords[i],
        j = i & 1;
      if (val < min[j])
        min[j] = val;
      else if (val > max[j])
        max[j] = val;
    }
    if (!dest)
      dest = new Rectangle();
    return dest.set(min[0], min[1], max[0] - min[0], max[1] - min[1],
        _dontNotify);
  },

  inverseTransform: function() {
    return this._inverseTransform(Point.read(arguments));
  },

  _getDeterminant: function() {
    var det = this._a * this._d - this._b * this._c;
    return isFinite(det) && !Numerical.isZero(det)
        && isFinite(this._tx) && isFinite(this._ty)
        ? det : null;
  },

  _inverseTransform: function(point, dest, _dontNotify) {
    var det = this._getDeterminant();
    if (!det)
      return null;
    var x = point.x - this._tx,
      y = point.y - this._ty;
    if (!dest)
      dest = new Point();
    return dest.set(
      (x * this._d - y * this._b) / det,
      (y * this._a - x * this._c) / det,
      _dontNotify
    );
  },

  decompose: function() {
    var a = this._a, b = this._b, c = this._c, d = this._d;
    if (Numerical.isZero(a * d - b * c))
      return null;

    var scaleX = Math.sqrt(a * a + b * b);
    a /= scaleX;
    b /= scaleX;

    var shear = a * c + b * d;
    c -= a * shear;
    d -= b * shear;

    var scaleY = Math.sqrt(c * c + d * d);
    c /= scaleY;
    d /= scaleY;
    shear /= scaleY;

    if (a * d < b * c) {
      a = -a;
      b = -b;
      shear = -shear;
      scaleX = -scaleX;
    }

    return {
      scaling: new Point(scaleX, scaleY),
      rotation: -Math.atan2(b, a) * 180 / Math.PI,
      shearing: shear
    };
  },

  getValues: function() {
    return [ this._a, this._c, this._b, this._d, this._tx, this._ty ];
  },

  getTranslation: function() {
    return new Point(this._tx, this._ty);
  },

  getScaling: function() {
    return (this.decompose() || {}).scaling;
  },

  getRotation: function() {
    return (this.decompose() || {}).rotation;
  },

  inverted: function() {
    var det = this._getDeterminant();
    return det && new Matrix(
        this._d / det,
        -this._c / det,
        -this._b / det,
        this._a / det,
        (this._b * this._ty - this._d * this._tx) / det,
        (this._c * this._tx - this._a * this._ty) / det);
  },

  shiftless: function() {
    return new Matrix(this._a, this._c, this._b, this._d, 0, 0);
  },

  applyToContext: function(ctx) {
    ctx.transform(this._a, this._c, this._b, this._d, this._tx, this._ty);
  }
}, Base.each(['a', 'c', 'b', 'd', 'tx', 'ty'], function(name) {
  var part = Base.capitalize(name),
    prop = '_' + name;
  this['get' + part] = function() {
    return this[prop];
  };
  this['set' + part] = function(value) {
    this[prop] = value;
    this._changed();
  };
}, {}));

var Line = Base.extend({
  _class: 'Line',

  initialize: function Line(arg0, arg1, arg2, arg3, arg4) {
    var asVector = false;
    if (arguments.length >= 4) {
      this._px = arg0;
      this._py = arg1;
      this._vx = arg2;
      this._vy = arg3;
      asVector = arg4;
    } else {
      this._px = arg0.x;
      this._py = arg0.y;
      this._vx = arg1.x;
      this._vy = arg1.y;
      asVector = arg2;
    }
    if (!asVector) {
      this._vx -= this._px;
      this._vy -= this._py;
    }
  },

  getPoint: function() {
    return new Point(this._px, this._py);
  },

  getVector: function() {
    return new Point(this._vx, this._vy);
  },

  getLength: function() {
    return this.getVector().getLength();
  },

  intersect: function(line, isInfinite) {
    return Line.intersect(
        this._px, this._py, this._vx, this._vy,
        line._px, line._py, line._vx, line._vy,
        true, isInfinite);
  },

  getSide: function(point) {
    return Line.getSide(
        this._px, this._py, this._vx, this._vy,
        point.x, point.y, true);
  },

  getDistance: function(point) {
    return Math.abs(Line.getSignedDistance(
        this._px, this._py, this._vx, this._vy,
        point.x, point.y, true));
  },

  statics: {
    intersect: function(apx, apy, avx, avy, bpx, bpy, bvx, bvy, asVector,
        isInfinite) {
      if (!asVector) {
        avx -= apx;
        avy -= apy;
        bvx -= bpx;
        bvy -= bpy;
      }
      var cross = bvy * avx - bvx * avy;
      if (!Numerical.isZero(cross)) {
        var dx = apx - bpx,
          dy = apy - bpy,
          ta = (bvx * dy - bvy * dx) / cross,
          tb = (avx * dy - avy * dx) / cross;
        if ((isInfinite || 0 <= ta && ta <= 1)
            && (isInfinite || 0 <= tb && tb <= 1))
          return new Point(
                apx + ta * avx,
                apy + ta * avy);
      }
    },

    getSide: function(px, py, vx, vy, x, y, asVector) {
      if (!asVector) {
        vx -= px;
        vy -= py;
      }
      var v2x = x - px,
        v2y = y - py,
        ccw = v2x * vy - v2y * vx; 
      if (ccw === 0) {
        ccw = v2x * vx + v2y * vy; 
        if (ccw > 0) {
          v2x -= vx;
          v2y -= vy;
          ccw = v2x * vx + v2y * vy;
          if (ccw < 0)
            ccw = 0;
        }
      }
      return ccw < 0 ? -1 : ccw > 0 ? 1 : 0;
    },

    getSignedDistance: function(px, py, vx, vy, x, y, asVector) {
      if (!asVector) {
        vx -= px;
        vy -= py;
      }
      var m = vy / vx, 
        b = py - m * px; 
      return (y - (m * x) - b) / Math.sqrt(m * m + 1);
    }
  }
});

var Project = PaperScopeItem.extend({
  _class: 'Project',
  _list: 'projects',
  _reference: 'project',

  initialize: function Project(element) {
    PaperScopeItem.call(this, true);
    this.layers = [];
    this.symbols = [];
    this._currentStyle = new Style(null, null, this);
    this.activeLayer = new Layer();
    this._view = View.create(this,
        element || CanvasProvider.getCanvas(1, 1));
    this._selectedItems = {};
    this._selectedItemCount = 0;
    this._updateVersion = 0;
  },

  _serialize: function(options, dictionary) {
    return Base.serialize(this.layers, options, true, dictionary);
  },

  clear: function() {
    for (var i = this.layers.length - 1; i >= 0; i--)
      this.layers[i].remove();
    this.symbols = [];
  },

  isEmpty: function() {
    return this.layers.length <= 1
      && (!this.activeLayer || this.activeLayer.isEmpty());
  },

  remove: function remove() {
    if (!remove.base.call(this))
      return false;
    if (this._view)
      this._view.remove();
    return true;
  },

  getView: function() {
    return this._view;
  },

  getCurrentStyle: function() {
    return this._currentStyle;
  },

  setCurrentStyle: function(style) {
    this._currentStyle.initialize(style);
  },

  getIndex: function() {
    return this._index;
  },

  addChild: function(child) {
    if (child instanceof Layer) {
      Base.splice(this.layers, [child]);
      if (!this.activeLayer)
        this.activeLayer = child;
    } else if (child instanceof Item) {
      (this.activeLayer
        || this.addChild(new Layer(Item.NO_INSERT))).addChild(child);
    } else {
      child = null;
    }
    return child;
  },

  getSelectedItems: function() {
    var items = [];
    for (var id in this._selectedItems) {
      var item = this._selectedItems[id];
      if (item.isInserted())
        items.push(item);
    }
    return items;
  },

  getOptions: function() {
    return this._scope.settings;
  },

  _updateSelection: function(item) {
    var id = item._id,
      selectedItems = this._selectedItems;
    if (item._selected) {
      if (selectedItems[id] !== item) {
        this._selectedItemCount++;
        selectedItems[id] = item;
      }
    } else if (selectedItems[id] === item) {
      this._selectedItemCount--;
      delete selectedItems[id];
    }
  },

  selectAll: function() {
    var layers = this.layers;
    for (var i = 0, l = layers.length; i < l; i++)
      layers[i].setFullySelected(true);
  },

  deselectAll: function() {
    var selectedItems = this._selectedItems;
    for (var i in selectedItems)
      selectedItems[i].setFullySelected(false);
  },

  hitTest: function() {
    var point = Point.read(arguments),
      options = HitResult.getOptions(Base.read(arguments));
    for (var i = this.layers.length - 1; i >= 0; i--) {
      var res = this.layers[i].hitTest(point, options);
      if (res) return res;
    }
    return null;
  },

  getItems: function(match) {
    return Item._getItems(this.layers, match, true);
  },

  getItem: function(match) {
    return Item._getItems(this.layers, match, false);
  },

  importJSON: function(json) {
    this.activate();
    var layer = this.activeLayer;
    return Base.importJSON(json, layer && layer.isEmpty() && layer);
  },

  draw: function(ctx, matrix, pixelRatio) {
    this._updateVersion++;
    ctx.save();
    matrix.applyToContext(ctx);
    var param = new Base({
      offset: new Point(0, 0),
      pixelRatio: pixelRatio,
      trackTransforms: true,
      transforms: [matrix]
    });
    for (var i = 0, l = this.layers.length; i < l; i++)
      this.layers[i].draw(ctx, param);
    ctx.restore();

    if (this._selectedItemCount > 0) {
      ctx.save();
      ctx.strokeWidth = 1;
      for (var id in this._selectedItems) {
        var item = this._selectedItems[id],
          globalMatrix = item._globalMatrix,
          size = this._scope.settings.handleSize,
          half = size / 2;
        if (item._updateVersion === this._updateVersion
            && (item._drawSelected || item._boundsSelected)
            && globalMatrix) {
          var color = item.getSelectedColor()
              || item.getLayer().getSelectedColor();
          ctx.strokeStyle = ctx.fillStyle = color
              ? color.toCanvasStyle(ctx) : '#009dec';
          if (item._drawSelected)
            item._drawSelected(ctx, globalMatrix);
          if (item._boundsSelected) {
            var coords = globalMatrix._transformCorners(
                item.getInternalBounds());
            ctx.beginPath();
            for (var i = 0; i < 8; i++)
              ctx[i === 0 ? 'moveTo' : 'lineTo'](
                  coords[i], coords[++i]);
            ctx.closePath();
            ctx.stroke();
            for (var i = 0; i < 8; i++)
              ctx.fillRect(coords[i] - half, coords[++i] - half,
                  size, size);
          }
        }
      }
      ctx.restore();
    }
  }
});

var Symbol = Base.extend({
  _class: 'Symbol',

  initialize: function Symbol(item, dontCenter) {
    this._id = Symbol._id = (Symbol._id || 0) + 1;
    this.project = paper.project;
    this.project.symbols.push(this);
    if (item)
      this.setDefinition(item, dontCenter);
  },

  _serialize: function(options, dictionary) {
    return dictionary.add(this, function() {
      return Base.serialize([this._class, this._definition],
          options, false, dictionary);
    });
  },

  _changed: function(flags) {
    if (flags & 8) {
      Item._clearBoundsCache(this);
    }
    if (flags & 1) {
      this.project._needsUpdate = true;
    }
  },

  getDefinition: function() {
    return this._definition;
  },

  setDefinition: function(item, _dontCenter) {
    if (item._parentSymbol)
      item = item.clone();
    if (this._definition)
      this._definition._parentSymbol = null;
    this._definition = item;
    item.remove();
    item.setSelected(false);
    if (!_dontCenter)
      item.setPosition(new Point());
    item._parentSymbol = this;
    this._changed(9);
  },

  place: function(position) {
    return new PlacedSymbol(this, position);
  },

  clone: function() {
    return new Symbol(this._definition.clone(false));
  }
});

var Item = Base.extend(Callback, {
  statics: {
    extend: function extend(src) {
      if (src._serializeFields)
        src._serializeFields = new Base(
            this.prototype._serializeFields, src._serializeFields);
      return extend.base.apply(this, arguments);
    },

    NO_INSERT: { insert: false }
  },

  _class: 'Item',
  _applyMatrix: true,
  _canApplyMatrix: true,
  _boundsSelected: false,
  _selectChildren: false,
  _serializeFields: {
    name: null,
    matrix: new Matrix(),
    pivot: null,
    locked: false,
    visible: true,
    blendMode: 'normal',
    opacity: 1,
    guide: false,
    selected: false,
    clipMask: false,
    applyMatrix: null,
    data: {}
  },

  initialize: function Item() {
  },

  _initialize: function(props, point) {
    var internal = props && props.internal === true,
      matrix = this._matrix = new Matrix(),
      project = paper.project;
    if (!internal)
      this._id = Item._id = (Item._id || 0) + 1;
    this._applyMatrix = this._canApplyMatrix && paper.settings.applyMatrix;
    if (point)
      matrix.translate(point);
    matrix._owner = this;
    this._style = new Style(project._currentStyle, this, project);
    if (!this._project) {
      if (internal || props && props.insert === false) {
        this._setProject(project);
      } else {
        (project.activeLayer || new Layer()).addChild(this);
      }
    }
    return props && props !== Item.NO_INSERT
        ? this._set(props, { insert: true }) 
        : true;
  },

  _events: new function() {

    var mouseFlags = {
      mousedown: {
        mousedown: 1,
        mousedrag: 1,
        click: 1,
        doubleclick: 1
      },
      mouseup: {
        mouseup: 1,
        mousedrag: 1,
        click: 1,
        doubleclick: 1
      },
      mousemove: {
        mousedrag: 1,
        mousemove: 1,
        mouseenter: 1,
        mouseleave: 1
      }
    };

    var mouseEvent = {
      install: function(type) {
        var counters = this.getView()._eventCounters;
        if (counters) {
          for (var key in mouseFlags) {
            counters[key] = (counters[key] || 0)
                + (mouseFlags[key][type] || 0);
          }
        }
      },
      uninstall: function(type) {
        var counters = this.getView()._eventCounters;
        if (counters) {
          for (var key in mouseFlags)
            counters[key] -= mouseFlags[key][type] || 0;
        }
      }
    };

    return Base.each(['onMouseDown', 'onMouseUp', 'onMouseDrag', 'onClick',
      'onDoubleClick', 'onMouseMove', 'onMouseEnter', 'onMouseLeave'],
      function(name) {
        this[name] = mouseEvent;
      }, {
        onFrame: {
          install: function() {
            this._animateItem(true);
          },
          uninstall: function() {
            this._animateItem(false);
          }
        },

        onLoad: {}
      }
    );
  },

  _animateItem: function(animate) {
    this.getView()._animateItem(this, animate);
  },

  _serialize: function(options, dictionary) {
    var props = {},
      that = this;

    function serialize(fields) {
      for (var key in fields) {
        var value = that[key];
        if (!Base.equals(value, key === 'leading'
            ? fields.fontSize * 1.2 : fields[key])) {
          props[key] = Base.serialize(value, options,
              key !== 'data', dictionary);
        }
      }
    }

    serialize(this._serializeFields);
    if (!(this instanceof Group))
      serialize(this._style._defaults);
    return [ this._class, props ];
  },

  _changed: function(flags) {
    var symbol = this._parentSymbol,
      cacheParent = this._parent || symbol,
      project = this._project;
    if (flags & 8) {
      this._bounds = this._position = this._decomposed =
          this._globalMatrix = this._currentPath = undefined;
    }
    if (cacheParent && (flags
        & (8 | 32))) {
      Item._clearBoundsCache(cacheParent);
    }
    if (flags & 2) {
      Item._clearBoundsCache(this);
    }
    if (project) {
      if (flags & 1) {
        project._needsUpdate = true;
      }
      if (project._changes) {
        var entry = project._changesById[this._id];
        if (entry) {
          entry.flags |= flags;
        } else {
          entry = { item: this, flags: flags };
          project._changesById[this._id] = entry;
          project._changes.push(entry);
        }
      }
    }
    if (symbol)
      symbol._changed(flags);
  },

  set: function(props) {
    if (props)
      this._set(props, { insert: true });
    return this;
  },

  getId: function() {
    return this._id;
  },

  getClassName: function() {
    return this._class;
  },

  getName: function() {
    return this._name;
  },

  setName: function(name, unique) {

    if (this._name)
      this._removeNamed();
    if (name === (+name) + '')
      throw new Error(
          'Names consisting only of numbers are not supported.');
    if (name && this._parent) {
      var children = this._parent._children,
        namedChildren = this._parent._namedChildren,
        orig = name,
        i = 1;
      while (unique && children[name])
        name = orig + ' ' + (i++);
      (namedChildren[name] = namedChildren[name] || []).push(this);
      children[name] = this;
    }
    this._name = name || undefined;
    this._changed(128);
  },

  getStyle: function() {
    return this._style;
  },

  setStyle: function(style) {
    this.getStyle().set(style);
  },

  hasFill: function() {
    return this.getStyle().hasFill();
  },

  hasStroke: function() {
    return this.getStyle().hasStroke();
  },

  hasShadow: function() {
    return this.getStyle().hasShadow();
  }
}, Base.each(['locked', 'visible', 'blendMode', 'opacity', 'guide'],
  function(name) {
    var part = Base.capitalize(name),
      name = '_' + name;
    this['get' + part] = function() {
      return this[name];
    };
    this['set' + part] = function(value) {
      if (value != this[name]) {
        this[name] = value;
        this._changed(name === '_locked'
            ? 128 : 129);
      }
    };
}, {}), {
  beans: true,

  _locked: false,

  _visible: true,

  _blendMode: 'normal',

  _opacity: 1,

  _guide: false,

  isSelected: function() {
    if (this._selectChildren) {
      for (var i = 0, l = this._children.length; i < l; i++)
        if (this._children[i].isSelected())
          return true;
    }
    return this._selected;
  },

  setSelected: function(selected, noChildren) {
    if (!noChildren && this._selectChildren) {
      for (var i = 0, l = this._children.length; i < l; i++)
        this._children[i].setSelected(selected);
    }
    if ((selected = !!selected) ^ this._selected) {
      this._selected = selected;
      this._project._updateSelection(this);
      this._changed(129);
    }
  },

  _selected: false,

  isFullySelected: function() {
    if (this._children && this._selected) {
      for (var i = 0, l = this._children.length; i < l; i++)
        if (!this._children[i].isFullySelected())
          return false;
      return true;
    }
    return this._selected;
  },

  setFullySelected: function(selected) {
    if (this._children) {
      for (var i = 0, l = this._children.length; i < l; i++)
        this._children[i].setFullySelected(selected);
    }
    this.setSelected(selected, true);
  },

  isClipMask: function() {
    return this._clipMask;
  },

  setClipMask: function(clipMask) {
    if (this._clipMask != (clipMask = !!clipMask)) {
      this._clipMask = clipMask;
      if (clipMask) {
        this.setFillColor(null);
        this.setStrokeColor(null);
      }
      this._changed(129);
      if (this._parent)
        this._parent._changed(1024);
    }
  },

  _clipMask: false,

  getData: function() {
    if (!this._data)
      this._data = {};
    return this._data;
  },

  setData: function(data) {
    this._data = data;
  },

  getPosition: function(_dontLink) {
    var position = this._position,
      ctor = _dontLink ? Point : LinkedPoint;
    if (!position) {
      var pivot = this._pivot;
      position = this._position = pivot
          ? this._matrix._transformPoint(pivot)
          : this.getBounds().getCenter(true);
    }
    return new ctor(position.x, position.y, this, 'setPosition');
  },

  setPosition: function() {
    this.translate(Point.read(arguments).subtract(this.getPosition(true)));
  },

  getPivot: function(_dontLink) {
    var pivot = this._pivot;
    if (pivot) {
      var ctor = _dontLink ? Point : LinkedPoint;
      pivot = new ctor(pivot.x, pivot.y, this, 'setAnchor');
    }
    return pivot;
  },

  setPivot: function() {
    this._pivot = Point.read(arguments);
    this._position = undefined;
  },

  _pivot: null,

  getRegistration: '#getPivot',
  setRegistration: '#setPivot'
}, Base.each(['bounds', 'strokeBounds', 'handleBounds', 'roughBounds',
    'internalBounds', 'internalRoughBounds'],
  function(key) {
    var getter = 'get' + Base.capitalize(key),
      match = key.match(/^internal(.*)$/),
      internalGetter = match ? 'get' + match[1] : null;
    this[getter] = function(_matrix) {
      var boundsGetter = this._boundsGetter,
        name = !internalGetter && (typeof boundsGetter === 'string'
            ? boundsGetter : boundsGetter && boundsGetter[getter])
            || getter,
        bounds = this._getCachedBounds(name, _matrix, null,
            internalGetter);
      return key === 'bounds'
          ? new LinkedRectangle(bounds.x, bounds.y, bounds.width,
              bounds.height, this, 'setBounds')
          : bounds;
    };
  },
{
  beans: true,

  _getBounds: function(getter, matrix, cacheItem) {
    var children = this._children;
    if (!children || children.length == 0)
      return new Rectangle();
    var x1 = Infinity,
      x2 = -x1,
      y1 = x1,
      y2 = x2;
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      if (child._visible && !child.isEmpty()) {
        var rect = child._getCachedBounds(getter, matrix, cacheItem);
        x1 = Math.min(rect.x, x1);
        y1 = Math.min(rect.y, y1);
        x2 = Math.max(rect.x + rect.width, x2);
        y2 = Math.max(rect.y + rect.height, y2);
      }
    }
    return isFinite(x1)
        ? new Rectangle(x1, y1, x2 - x1, y2 - y1)
        : new Rectangle();
  },

  setBounds: function() {
    var rect = Rectangle.read(arguments),
      bounds = this.getBounds(),
      matrix = new Matrix(),
      center = rect.getCenter();
    matrix.translate(center);
    if (rect.width != bounds.width || rect.height != bounds.height) {
      matrix.scale(
          bounds.width != 0 ? rect.width / bounds.width : 1,
          bounds.height != 0 ? rect.height / bounds.height : 1);
    }
    center = bounds.getCenter();
    matrix.translate(-center.x, -center.y);
    this.transform(matrix);
  },

  _getCachedBounds: function(getter, matrix, cacheItem, internalGetter) {
    matrix = matrix && matrix.orNullIfIdentity();
    var _matrix = internalGetter ? null : this._matrix.orNullIfIdentity(),
      cache = (!matrix || matrix.equals(_matrix)) && getter;
    var cacheParent = this._parent || this._parentSymbol;
    if (cacheItem && cacheParent) {
      var id = cacheItem._id,
        ref = cacheParent._boundsCache = cacheParent._boundsCache || {
          ids: {},
          list: []
        };
      if (!ref.ids[id]) {
        ref.list.push(cacheItem);
        ref.ids[id] = cacheItem;
      }
    }
    if (cache && this._bounds && this._bounds[cache])
      return this._bounds[cache].clone();
    matrix = !matrix
        ? _matrix
        : _matrix
          ? matrix.clone().concatenate(_matrix)
          : matrix;
    var bounds = this._getBounds(internalGetter || getter, matrix,
        cache ? this : cacheItem);
    if (cache) {
      if (!this._bounds)
        this._bounds = {};
      var cached = this._bounds[cache] = bounds.clone();
      cached._internal = !!internalGetter;
    }
    return bounds;
  },

  statics: {
    _clearBoundsCache: function(item) {
      if (item._boundsCache) {
        for (var i = 0, list = item._boundsCache.list, l = list.length;
            i < l; i++) {
          var child = list[i];
          child._bounds = child._position = undefined;
          if (child !== item && child._boundsCache)
            Item._clearBoundsCache(child);
        }
        item._boundsCache = undefined;
      }
    }
  }

}), {
  beans: true,

  _decompose: function() {
    return this._decomposed = this._matrix.decompose();
  },

  getRotation: function() {
    var decomposed = this._decomposed || this._decompose();
    return decomposed && decomposed.rotation;
  },

  setRotation: function(rotation) {
    var current = this.getRotation();
    if (current != null && rotation != null) {
      var decomposed = this._decomposed;
      this.rotate(rotation - current);
      decomposed.rotation = rotation;
      this._decomposed = decomposed;
    }
  },

  getScaling: function() {
    var decomposed = this._decomposed || this._decompose();
    return decomposed && decomposed.scaling;
  },

  setScaling: function() {
    var current = this.getScaling();
    if (current != null) {
      var scaling = Point.read(arguments, 0, { clone: true }),
        decomposed = this._decomposed;
      this.scale(scaling.x / current.x, scaling.y / current.y);
      decomposed.scaling = scaling;
      this._decomposed = decomposed;
    }
  },

  getMatrix: function() {
    return this._matrix;
  },

  setMatrix: function(matrix) {
    this._matrix.initialize(matrix);
    if (this._applyMatrix) {
      this.transform(null, true);
    } else {
      this._changed(9);
    }
  },

  getGlobalMatrix: function(_internal) {
    var matrix = this._globalMatrix,
      updateVersion = this._project._updateVersion,
      viewMatrix = this.getView()._matrix;
    if (matrix && matrix._updateVersion !== updateVersion)
      matrix = null;
    if (!matrix) {
      matrix = this._globalMatrix = this._matrix.clone();
      matrix.preConcatenate(this._parent
          ? this._parent.getGlobalMatrix(true)
          : viewMatrix);
      matrix._updateVersion = updateVersion;
    }
    return _internal ? matrix : viewMatrix.inverted().concatenate(matrix);
  },

  getApplyMatrix: function() {
    return this._applyMatrix;
  },

  setApplyMatrix: function(transform) {
    if (this._applyMatrix = this._canApplyMatrix && !!transform)
      this.transform(null, true);
  },

  getTransformContent: '#getApplyMatrix',
  setTransformContent: '#setApplyMatrix',
}, {
  getProject: function() {
    return this._project;
  },

  _setProject: function(project, installEvents) {
    if (this._project !== project) {
      if (this._project)
        this._installEvents(false);
      this._project = project;
      var children = this._children;
      for (var i = 0, l = children && children.length; i < l; i++)
        children[i]._setProject(project);
      installEvents = true;
    }
    if (installEvents)
      this._installEvents(true);
  },

  getView: function() {
    return this._project.getView();
  },

  _installEvents: function _installEvents(install) {
    _installEvents.base.call(this, install);
    var children = this._children;
    for (var i = 0, l = children && children.length; i < l; i++)
      children[i]._installEvents(install);
  },

  getLayer: function() {
    var parent = this;
    while (parent = parent._parent) {
      if (parent instanceof Layer)
        return parent;
    }
    return null;
  },

  getParent: function() {
    return this._parent;
  },

  setParent: function(item) {
    return item.addChild(this);
  },

  getChildren: function() {
    return this._children;
  },

  setChildren: function(items) {
    this.removeChildren();
    this.addChildren(items);
  },

  getFirstChild: function() {
    return this._children && this._children[0] || null;
  },

  getLastChild: function() {
    return this._children && this._children[this._children.length - 1]
        || null;
  },

  getNextSibling: function() {
    return this._parent && this._parent._children[this._index + 1] || null;
  },

  getPreviousSibling: function() {
    return this._parent && this._parent._children[this._index - 1] || null;
  },

  getIndex: function() {
    return this._index;
  },

  isInserted: function() {
    return this._parent ? this._parent.isInserted() : false;
  },

  equals: function(item) {
    return item === this || item && this._class === item._class
        && this._style.equals(item._style)
        && this._matrix.equals(item._matrix)
        && this._locked === item._locked
        && this._visible === item._visible
        && this._blendMode === item._blendMode
        && this._opacity === item._opacity
        && this._clipMask === item._clipMask
        && this._guide === item._guide
        && this._equals(item)
        || false;
  },

  _equals: function(item) {
    return Base.equals(this._children, item._children);
  },

  clone: function(insert) {
    return this._clone(new this.constructor(Item.NO_INSERT), insert);
  },

  _clone: function(copy, insert) {
    copy.setStyle(this._style);
    if (this._children) {
      for (var i = 0, l = this._children.length; i < l; i++)
        copy.addChild(this._children[i].clone(false), true);
    }
    if (insert || insert === undefined)
      copy.insertAbove(this);
    var keys = ['_locked', '_visible', '_blendMode', '_opacity',
        '_clipMask', '_guide', '_applyMatrix'];
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      if (this.hasOwnProperty(key))
        copy[key] = this[key];
    }
    copy._matrix.initialize(this._matrix);
    copy._data = this._data ? Base.clone(this._data) : null;
    copy.setSelected(this._selected);
    if (this._name)
      copy.setName(this._name, true);
    return copy;
  },

  copyTo: function(itemOrProject) {
    return itemOrProject.addChild(this.clone(false));
  },

  rasterize: function(resolution) {
    var bounds = this.getStrokeBounds(),
      scale = (resolution || this.getView().getResolution()) / 72,
      topLeft = bounds.getTopLeft().floor(),
      bottomRight = bounds.getBottomRight().ceil(),
      size = new Size(bottomRight.subtract(topLeft)),
      canvas = CanvasProvider.getCanvas(size.multiply(scale)),
      ctx = canvas.getContext('2d'),
      matrix = new Matrix().scale(scale).translate(topLeft.negate());
    ctx.save();
    matrix.applyToContext(ctx);
    this.draw(ctx, new Base({ transforms: [matrix] }));
    ctx.restore();
    var raster = new Raster(Item.NO_INSERT);
    raster.setCanvas(canvas);
    raster.transform(new Matrix().translate(topLeft.add(size.divide(2)))
        .scale(1 / scale));
    raster.insertAbove(this);
    return raster;
  },

  contains: function() {
    return !!this._contains(
        this._matrix._inverseTransform(Point.read(arguments)));
  },

  _contains: function(point) {
    if (this._children) {
      for (var i = this._children.length - 1; i >= 0; i--) {
        if (this._children[i].contains(point))
          return true;
      }
      return false;
    }
    return point.isInside(this.getInternalBounds());
  },

  hitTest: function(point, options) {
    point = Point.read(arguments);
    options = HitResult.getOptions(Base.read(arguments));
    if (this._locked || !this._visible || this._guide && !options.guides
        || this.isEmpty())
      return null;

    var matrix = this._matrix,
      parentTotalMatrix = options._totalMatrix,
      view = this.getView(),
      totalMatrix = options._totalMatrix = parentTotalMatrix
          ? parentTotalMatrix.clone().concatenate(matrix)
          : this.getGlobalMatrix().clone().preConcatenate(
              view._matrix),
      tolerancePadding = options._tolerancePadding = new Size(
            Path._getPenPadding(1, totalMatrix.inverted())
          ).multiply(
            Math.max(options.tolerance, 0.00001)
          );
    point = matrix._inverseTransform(point);

    if (!this._children && !this.getInternalRoughBounds()
        .expand(tolerancePadding.multiply(2))._containsPoint(point))
      return null;
    var type,
      checkSelf = !(options.guides && !this._guide
        || options.selected && !this._selected
        || (type = options.type) && (typeof type === 'string'
            ? type !== Base.hyphenate(this._class)
            : !(this instanceof type))),
      that = this,
      res;

    function checkBounds(type, part) {
      var pt = bounds['get' + part]();
      if (point.subtract(pt).divide(tolerancePadding).length <= 1)
        return new HitResult(type, that,
            { name: Base.hyphenate(part), point: pt });
    }

    if (checkSelf && (options.center || options.bounds) && this._parent) {
      var bounds = this.getInternalBounds();
      if (options.center)
        res = checkBounds('center', 'Center');
      if (!res && options.bounds) {
        var points = [
          'TopLeft', 'TopRight', 'BottomLeft', 'BottomRight',
          'LeftCenter', 'TopCenter', 'RightCenter', 'BottomCenter'
        ];
        for (var i = 0; i < 8 && !res; i++)
          res = checkBounds('bounds', points[i]);
      }
    }

    var children = !res && this._children;
    if (children) {
      var opts = this._getChildHitTestOptions(options);
      for (var i = children.length - 1; i >= 0 && !res; i--)
        res = children[i].hitTest(point, opts);
    }
    if (!res && checkSelf)
      res = this._hitTest(point, options);
    if (res && res.point)
      res.point = matrix.transform(res.point);
    options._totalMatrix = parentTotalMatrix;
    return res;
  },

  _getChildHitTestOptions: function(options) {
    return options;
  },

  _hitTest: function(point, options) {
    if (options.fill && this.hasFill() && this._contains(point))
      return new HitResult('fill', this);
  }
}, { 
  matches: function(match) {
    function matchObject(obj1, obj2) {
      for (var i in obj1) {
        if (obj1.hasOwnProperty(i)) {
          var val1 = obj1[i],
            val2 = obj2[i];
          if (Base.isPlainObject(val1) && Base.isPlainObject(val2)) {
            if (!matchObject(val1, val2))
              return false;
          } else if (!Base.equals(val1, val2)) {
            return false;
          }
        }
      }
      return true;
    }
    for (var key in match) {
      if (match.hasOwnProperty(key)) {
        var value = this[key],
          compare = match[key];
        if (value === undefined && key === 'type')
          value = Base.hyphenate(this._class);
        if (/^(constructor|class)$/.test(key)) {
          if (!(this instanceof compare))
            return false;
        } else if (compare instanceof RegExp) {
          if (!compare.test(value))
            return false;
        } else if (typeof compare === 'function') {
          if (!compare(value))
            return false;
        } else if (Base.isPlainObject(compare)) {
          if (!matchObject(compare, value))
            return false;
        } else if (!Base.equals(value, compare)) {
          return false;
        }
      }
    }
    return true;
  },

  getItems: function(match) {
    return Item._getItems(this._children, match, true);
  },

  getItem: function(match) {
    return Item._getItems(this._children, match, false);
  },

  statics: {
    _getItems: function _getItems(children, match, list) {
      var items = list && [];
      for (var i = 0, l = children && children.length; i < l; i++) {
        var child = children[i];
        if (child.matches(match)) {
          if (list) {
            items.push(child);
          } else {
            return child;
          }
        }
        var res = _getItems(child._children, match, list);
        if (list) {
          items.push.apply(items, res);
        } else if (res) {
          return res;
        }
      }
      return list ? items : null;
    }
  }
}, {

  importJSON: function(json) {
    var res = Base.importJSON(json, this);
    return res !== this
        ? this.addChild(res)
        : res;
  },

  addChild: function(item, _preserve) {
    return this.insertChild(undefined, item, _preserve);
  },

  insertChild: function(index, item, _preserve) {
    var res = this.insertChildren(index, [item], _preserve);
    return res && res[0];
  },

  addChildren: function(items, _preserve) {
    return this.insertChildren(this._children.length, items, _preserve);
  },

  insertChildren: function(index, items, _preserve, _proto) {
    var children = this._children;
    if (children && items && items.length > 0) {
      items = Array.prototype.slice.apply(items);
      for (var i = items.length - 1; i >= 0; i--) {
        var item = items[i];
        if (_proto && !(item instanceof _proto)) {
          items.splice(i, 1);
        } else {
          item._remove(false, true);
        }
      }
      Base.splice(children, items, index, 0);
      var project = this._project,
        notifySelf = project && project._changes;
      for (var i = 0, l = items.length; i < l; i++) {
        var item = items[i];
        item._parent = this;
        item._setProject(this._project, true);
        if (item._name)
          item.setName(item._name);
        if (notifySelf)
          this._changed(5);
      }
      this._changed(11);
    } else {
      items = null;
    }
    return items;
  },

  _insert: function(above, item, _preserve) {
    if (!item._parent)
      return null;
    var index = item._index + (above ? 1 : 0);
    if (item._parent === this._parent && index > this._index)
       index--;
    return item._parent.insertChild(index, this, _preserve);
  },

  insertAbove: function(item, _preserve) {
    return this._insert(true, item, _preserve);
  },

  insertBelow: function(item, _preserve) {
    return this._insert(false, item, _preserve);
   },

  sendToBack: function() {
    return this._parent.insertChild(0, this);
  },

  bringToFront: function() {
    return this._parent.addChild(this);
  },

  appendTop: '#addChild',

  appendBottom: function(item) {
    return this.insertChild(0, item);
  },

  moveAbove: '#insertAbove',

  moveBelow: '#insertBelow',

  reduce: function() {
    if (this._children && this._children.length === 1) {
      var child = this._children[0].reduce();
      child.insertAbove(this);
      child.setStyle(this._style);
      this.remove();
      return child;
    }
    return this;
  },

  _removeNamed: function() {
    var children = this._parent._children,
      namedChildren = this._parent._namedChildren,
      name = this._name,
      namedArray = namedChildren[name],
      index = namedArray ? namedArray.indexOf(this) : -1;
    if (index == -1)
      return;
    if (children[name] == this)
      delete children[name];
    namedArray.splice(index, 1);
    if (namedArray.length) {
      children[name] = namedArray[namedArray.length - 1];
    } else {
      delete namedChildren[name];
    }
  },

  _remove: function(notifySelf, notifyParent) {
    var parent = this._parent;
    if (parent) {
      if (this._name)
        this._removeNamed();
      if (this._index != null)
        Base.splice(parent._children, null, this._index, 1);
      this._installEvents(false);
      if (notifySelf) {
        var project = this._project;
        if (project && project._changes)
          this._changed(5);
      }
      if (notifyParent)
        parent._changed(11);
      this._parent = null;
      return true;
    }
    return false;
  },

  remove: function() {
    return this._remove(true, true);
  },

  removeChildren: function(from, to) {
    if (!this._children)
      return null;
    from = from || 0;
    to = Base.pick(to, this._children.length);
    var removed = Base.splice(this._children, null, from, to - from);
    for (var i = removed.length - 1; i >= 0; i--) {
      removed[i]._remove(true, false);
    }
    if (removed.length > 0)
      this._changed(11);
    return removed;
  },

  clear: '#removeChildren',

  reverseChildren: function() {
    if (this._children) {
      this._children.reverse();
      for (var i = 0, l = this._children.length; i < l; i++)
        this._children[i]._index = i;
      this._changed(11);
    }
  },

  isEmpty: function() {
    return !this._children || this._children.length == 0;
  },

  isEditable: function() {
    var item = this;
    while (item) {
      if (!item._visible || item._locked)
        return false;
      item = item._parent;
    }
    return true;
  },

  _getOrder: function(item) {
    function getList(item) {
      var list = [];
      do {
        list.unshift(item);
      } while (item = item._parent);
      return list;
    }
    var list1 = getList(this),
      list2 = getList(item);
    for (var i = 0, l = Math.min(list1.length, list2.length); i < l; i++) {
      if (list1[i] != list2[i]) {
        return list1[i]._index < list2[i]._index ? 1 : -1;
      }
    }
    return 0;
  },

  hasChildren: function() {
    return this._children && this._children.length > 0;
  },

  isAbove: function(item) {
    return this._getOrder(item) === -1;
  },

  isBelow: function(item) {
    return this._getOrder(item) === 1;
  },

  isParent: function(item) {
    return this._parent === item;
  },

  isChild: function(item) {
    return item && item._parent === this;
  },

  isDescendant: function(item) {
    var parent = this;
    while (parent = parent._parent) {
      if (parent == item)
        return true;
    }
    return false;
  },

  isAncestor: function(item) {
    return item ? item.isDescendant(this) : false;
  },

  isGroupedWith: function(item) {
    var parent = this._parent;
    while (parent) {
      if (parent._parent
        && /^(Group|Layer|CompoundPath)$/.test(parent._class)
        && item.isDescendant(parent))
          return true;
      parent = parent._parent;
    }
    return false;
  },

  translate: function() {
    var mx = new Matrix();
    return this.transform(mx.translate.apply(mx, arguments));
  },

  rotate: function(angle ) {
    return this.transform(new Matrix().rotate(angle,
        Point.read(arguments, 1, { readNull: true })
          || this.getPosition(true)));
  }
}, Base.each(['scale', 'shear', 'skew'], function(name) {
  this[name] = function() {
    var point = Point.read(arguments),
      center = Point.read(arguments, 0, { readNull: true });
    return this.transform(new Matrix()[name](point,
        center || this.getPosition(true)));
  };
}, {

}), {
  transform: function(matrix, _applyMatrix) {
    if (matrix && matrix.isIdentity())
      matrix = null;
    var _matrix = this._matrix,
      applyMatrix = (_applyMatrix || this._applyMatrix)
        && (!_matrix.isIdentity() || matrix);
    if (!matrix && !applyMatrix)
      return this;
    if (matrix)
      _matrix.preConcatenate(matrix);
    if (applyMatrix = applyMatrix && this._transformContent(_matrix)) {
      var pivot = this._pivot,
        style = this._style,
        fillColor = style.getFillColor(true),
        strokeColor = style.getStrokeColor(true);
      if (pivot)
        pivot.transform(_matrix);
      if (fillColor)
        fillColor.transform(_matrix);
      if (strokeColor)
        strokeColor.transform(_matrix);
      _matrix.reset(true);
    }
    var bounds = this._bounds,
      position = this._position;
    this._changed(9);
    var decomp = bounds && matrix && matrix.decompose();
    if (decomp && !decomp.shearing && decomp.rotation % 90 === 0) {
      for (var key in bounds) {
        var rect = bounds[key];
        if (applyMatrix || !rect._internal)
          matrix._transformBounds(rect, rect);
      }
      var getter = this._boundsGetter,
        rect = bounds[getter && getter.getBounds || getter || 'getBounds'];
      if (rect)
        this._position = rect.getCenter(true);
      this._bounds = bounds;
    } else if (matrix && position) {
      this._position = matrix._transformPoint(position, position);
    }
    return this;
  },

  _transformContent: function(matrix) {
    var children = this._children;
    if (children) {
      for (var i = 0, l = children.length; i < l; i++)
        children[i].transform(matrix, true);
      return true;
    }
  },

  globalToLocal: function() {
    var matrix = this.getGlobalMatrix();
    return matrix && matrix._inverseTransform(Point.read(arguments));
  },

  localToGlobal: function() {
    var matrix = this.getGlobalMatrix();
    return matrix && matrix._transformPoint(Point.read(arguments));
  },

  fitBounds: function(rectangle, fill) {
    rectangle = Rectangle.read(arguments);
    var bounds = this.getBounds(),
      itemRatio = bounds.height / bounds.width,
      rectRatio = rectangle.height / rectangle.width,
      scale = (fill ? itemRatio > rectRatio : itemRatio < rectRatio)
          ? rectangle.width / bounds.width
          : rectangle.height / bounds.height,
      newBounds = new Rectangle(new Point(),
          new Size(bounds.width * scale, bounds.height * scale));
    newBounds.setCenter(rectangle.getCenter());
    this.setBounds(newBounds);
  },

  _setStyles: function(ctx) {
    var style = this._style,
      fillColor = style.getFillColor(),
      strokeColor = style.getStrokeColor(),
      shadowColor = style.getShadowColor();
    if (fillColor)
      ctx.fillStyle = fillColor.toCanvasStyle(ctx);
    if (strokeColor) {
      var strokeWidth = style.getStrokeWidth();
      if (strokeWidth > 0) {
        ctx.strokeStyle = strokeColor.toCanvasStyle(ctx);
        ctx.lineWidth = strokeWidth;
        var strokeJoin = style.getStrokeJoin(),
          strokeCap = style.getStrokeCap(),
          miterLimit = style.getMiterLimit();
        if (strokeJoin)
          ctx.lineJoin = strokeJoin;
        if (strokeCap)
          ctx.lineCap = strokeCap;
        if (miterLimit)
          ctx.miterLimit = miterLimit;
        if (paper.support.nativeDash) {
          var dashArray = style.getDashArray(),
            dashOffset = style.getDashOffset();
          if (dashArray && dashArray.length) {
            if ('setLineDash' in ctx) {
              ctx.setLineDash(dashArray);
              ctx.lineDashOffset = dashOffset;
            } else {
              ctx.mozDash = dashArray;
              ctx.mozDashOffset = dashOffset;
            }
          }
        }
      }
    }
    if (shadowColor) {
      var shadowBlur = style.getShadowBlur();
      if (shadowBlur > 0) {
        ctx.shadowColor = shadowColor.toCanvasStyle(ctx);
        ctx.shadowBlur = shadowBlur;
        var offset = this.getShadowOffset();
        ctx.shadowOffsetX = offset.x;
        ctx.shadowOffsetY = offset.y;
      }
    }
  },

  draw: function(ctx, param) {
    if (!this._visible || this._opacity === 0)
      return;
    var updateVersion = this._updateVersion = this._project._updateVersion;
    var trackTransforms = param.trackTransforms,
      transforms = param.transforms,
      matrix = this._matrix,
      parentMatrix = transforms[transforms.length - 1],
      globalMatrix = parentMatrix.clone().concatenate(matrix);
    if (!globalMatrix.isInvertible())
      return;
    if (trackTransforms) {
      transforms.push(this._globalMatrix = globalMatrix);
      globalMatrix._updateVersion = updateVersion;
    }

    var blendMode = this._blendMode,
      opacity = this._opacity,
      normalBlend = blendMode === 'normal',
      nativeBlend = BlendMode.nativeModes[blendMode],
      direct = normalBlend && opacity === 1
          || param.clip
          || (nativeBlend || normalBlend && opacity < 1)
            && this._canComposite(),
      mainCtx, itemOffset, prevOffset;
    if (!direct) {
      var bounds = this.getStrokeBounds(parentMatrix);
      if (!bounds.width || !bounds.height)
        return;
      prevOffset = param.offset;
      itemOffset = param.offset = bounds.getTopLeft().floor();
      mainCtx = ctx;
      ctx = CanvasProvider.getContext(
          bounds.getSize().ceil().add(new Size(1, 1)),
          param.pixelRatio);
    }
    ctx.save();
    if (direct) {
      ctx.globalAlpha = opacity;
      if (nativeBlend)
        ctx.globalCompositeOperation = blendMode;
    } else {
      ctx.translate(-itemOffset.x, -itemOffset.y);
    }
    (direct ? matrix : globalMatrix).applyToContext(ctx);
    if (!direct && param.clipItem)
      param.clipItem.draw(ctx, param.extend({ clip: true }));
    this._draw(ctx, param);
    ctx.restore();
    if (trackTransforms)
      transforms.pop();
    if (param.clip && !param.dontFinish)
      ctx.clip();
    if (!direct) {
      BlendMode.process(blendMode, ctx, mainCtx, opacity,
          itemOffset.subtract(prevOffset).multiply(param.pixelRatio));
      CanvasProvider.release(ctx);
      param.offset = prevOffset;
    }
  },

  _canComposite: function() {
    return false;
  }
}, Base.each(['down', 'drag', 'up', 'move'], function(name) {
  this['removeOn' + Base.capitalize(name)] = function() {
    var hash = {};
    hash[name] = true;
    return this.removeOn(hash);
  };
}, {

  removeOn: function(obj) {
    for (var name in obj) {
      if (obj[name]) {
        var key = 'mouse' + name,
          project = this._project,
          sets = project._removeSets = project._removeSets || {};
        sets[key] = sets[key] || {};
        sets[key][this._id] = this;
      }
    }
    return this;
  }
}));

var Group = Item.extend({
  _class: 'Group',
  _selectChildren: true,
  _serializeFields: {
    children: []
  },

  initialize: function Group(arg) {
    this._children = [];
    this._namedChildren = {};
    if (!this._initialize(arg))
      this.addChildren(Array.isArray(arg) ? arg : arguments);
  },

  _changed: function _changed(flags) {
    _changed.base.call(this, flags);
    if (flags & (2 | 1024)) {
      this._clipItem = undefined;
    }
  },

  _getClipItem: function() {
    var clipItem = this._clipItem;
    if (clipItem === undefined) {
      clipItem = null;
      for (var i = 0, l = this._children.length; i < l; i++) {
        var child = this._children[i];
        if (child._clipMask) {
          clipItem = child;
          break;
        }
      }
      this._clipItem = clipItem;
    }
    return clipItem;
  },

  isClipped: function() {
    return !!this._getClipItem();
  },

  setClipped: function(clipped) {
    var child = this.getFirstChild();
    if (child)
      child.setClipMask(clipped);
  },

  _draw: function(ctx, param) {
    var clip = param.clip,
      clipItem = !clip && this._getClipItem(),
      draw = true;
    param = param.extend({ clipItem: clipItem, clip: false });
    if (clip) {
      if (this._currentPath) {
        ctx.currentPath = this._currentPath;
        draw = false;
      } else {
        ctx.beginPath();
        param.dontStart = param.dontFinish = true;
      }
    } else if (clipItem) {
      clipItem.draw(ctx, param.extend({ clip: true }));
    }
    if (draw) {
      for (var i = 0, l = this._children.length; i < l; i++) {
        var item = this._children[i];
        if (item !== clipItem)
          item.draw(ctx, param);
      }
    }
    if (clip) {
      this._currentPath = ctx.currentPath;
    }
  }
});

var Layer = Group.extend({
  _class: 'Layer',

  initialize: function Layer(arg) {
    var props = Base.isPlainObject(arg)
        ? new Base(arg) 
        : { children: Array.isArray(arg) ? arg : arguments },
      insert = props.insert;
    props.insert = false;
    Group.call(this, props);
    if (insert || insert === undefined) {
      this._project.addChild(this);
      this.activate();
    }
  },

  _remove: function _remove(notify) {
    if (this._parent)
      return _remove.base.call(this, notify);
    if (this._index != null) {
      if (this._project.activeLayer === this)
        this._project.activeLayer = this.getNextSibling()
            || this.getPreviousSibling();
      Base.splice(this._project.layers, null, this._index, 1);
      this._installEvents(false);
      this._project._needsUpdate = true;
      return true;
    }
    return false;
  },

  getNextSibling: function getNextSibling() {
    return this._parent ? getNextSibling.base.call(this)
        : this._project.layers[this._index + 1] || null;
  },

  getPreviousSibling: function getPreviousSibling() {
    return this._parent ? getPreviousSibling.base.call(this)
        : this._project.layers[this._index - 1] || null;
  },

  isInserted: function isInserted() {
    return this._parent ? isInserted.base.call(this) : this._index != null;
  },

  activate: function() {
    this._project.activeLayer = this;
  },

  _insert: function _insert(above, item, _preserve) {
    if (item instanceof Layer && !item._parent) {
      this._remove(true, true);
      Base.splice(item._project.layers, [this],
          item._index + (above ? 1 : 0), 0);
      this._setProject(item._project, true);
      return this;
    }
    return _insert.base.call(this, above, item, _preserve);
  }
});

var Shape = Item.extend({
  _class: 'Shape',
  _applyMatrix: false,
  _canApplyMatrix: false,
  _boundsSelected: true,
  _serializeFields: {
    type: null,
    size: null,
    radius: null
  },

  initialize: function Shape(props) {
    this._initialize(props);
  },

  _equals: function(item) {
    return this._type === item._type
      && this._size.equals(item._size)
      && Base.equals(this._radius, item._radius);
  },

  clone: function(insert) {
    var copy = new Shape(Item.NO_INSERT);
    copy.setType(this._type);
    copy.setSize(this._size);
    copy.setRadius(this._radius);
    return this._clone(copy, insert);
  },

  getType: function() {
    return this._type;
  },

  setType: function(type) {
    this._type = type;
  },

  getShape: '#getType',
  setShape: '#setType',

  getSize: function() {
    var size = this._size;
    return new LinkedSize(size.width, size.height, this, 'setSize');
  },

  setSize: function() {
    var size = Size.read(arguments);
    if (!this._size) {
      this._size = size.clone();
    } else if (!this._size.equals(size)) {
      var type = this._type,
        width = size.width,
        height = size.height;
      if (type === 'rectangle') {
        var radius = Size.min(this._radius, size.divide(2));
        this._radius.set(radius.width, radius.height);
      } else if (type === 'circle') {
        width = height = (width + height) / 2;
        this._radius = width / 2;
      } else if (type === 'ellipse') {
        this._radius.set(width / 2, height / 2);
      }
      this._size.set(width, height);
      this._changed(9);
    }
  },

  getRadius: function() {
    var rad = this._radius;
    return this._type === 'circle'
        ? rad
        : new LinkedSize(rad.width, rad.height, this, 'setRadius');
  },

  setRadius: function(radius) {
    var type = this._type;
    if (type === 'circle') {
      if (radius === this._radius)
        return;
      var size = radius * 2;
      this._radius = radius;
      this._size.set(size, size);
    } else {
      radius = Size.read(arguments);
      if (!this._radius) {
        this._radius = radius.clone();
      } else {
        if (this._radius.equals(radius))
          return;
        this._radius.set(radius.width, radius.height);
        if (type === 'rectangle') {
          var size = Size.max(this._size, radius.multiply(2));
          this._size.set(size.width, size.height);
        } else if (type === 'ellipse') {
          this._size.set(radius.width * 2, radius.height * 2);
        }
      }
    }
    this._changed(9);
  },

  isEmpty: function() {
    return false;
  },

  toPath: function(insert) {
    var path = new Path[Base.capitalize(this._type)]({
      center: new Point(),
      size: this._size,
      radius: this._radius,
      insert: false
    });
    path.setStyle(this._style);
    path.transform(this._matrix);
    if (insert || insert === undefined)
      path.insertAbove(this);
    return path;
  },

  _draw: function(ctx, param) {
    var style = this._style,
      hasFill = style.hasFill(),
      hasStroke = style.hasStroke(),
      dontPaint = param.dontFinish || param.clip;
    if (hasFill || hasStroke || dontPaint) {
      var radius = this._radius,
        type = this._type;
      if (!param.dontStart)
        ctx.beginPath();
      if (type === 'circle') {
        ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
      } else {
        var rx = radius.width,
          ry = radius.height,
          kappa = 0.5522847498307936;
        if (type === 'ellipse') {
          var cx = rx * kappa,
            cy = ry * kappa;
          ctx.moveTo(-rx, 0);
          ctx.bezierCurveTo(-rx, -cy, -cx, -ry, 0, -ry);
          ctx.bezierCurveTo(cx, -ry, rx, -cy, rx, 0);
          ctx.bezierCurveTo(rx, cy, cx, ry, 0, ry);
          ctx.bezierCurveTo(-cx, ry, -rx, cy, -rx, 0);
        } else { 
          var size = this._size,
            width = size.width,
            height = size.height;
          if (rx === 0 && ry === 0) {
            ctx.rect(-width / 2, -height / 2, width, height);
          } else {
            kappa = 1 - kappa;
            var x = width / 2,
              y = height / 2,
              cx = rx * kappa,
              cy = ry * kappa;
            ctx.moveTo(-x, -y + ry);
            ctx.bezierCurveTo(-x, -y + cy, -x + cx, -y, -x + rx, -y);
            ctx.lineTo(x - rx, -y);
            ctx.bezierCurveTo(x - cx, -y, x, -y + cy, x, -y + ry);
            ctx.lineTo(x, y - ry);
            ctx.bezierCurveTo(x, y - cy, x - cx, y, x - rx, y);
            ctx.lineTo(-x + rx, y);
            ctx.bezierCurveTo(-x + cx, y, -x, y - cy, -x, y - ry);
          }
        }
      }
      ctx.closePath();
    }
    if (!dontPaint && (hasFill || hasStroke)) {
      this._setStyles(ctx);
      if (hasFill) {
        ctx.fill(style.getWindingRule());
        ctx.shadowColor = 'rgba(0,0,0,0)';
      }
      if (hasStroke)
        ctx.stroke();
    }
  },

  _canComposite: function() {
    return !(this.hasFill() && this.hasStroke());
  },

  _getBounds: function(getter, matrix) {
    var rect = new Rectangle(this._size).setCenter(0, 0);
    if (getter !== 'getBounds' && this.hasStroke())
      rect = rect.expand(this.getStrokeWidth());
    return matrix ? matrix._transformBounds(rect) : rect;
  }
},
new function() { 

  function getCornerCenter(that, point, expand) {
    var radius = that._radius;
    if (!radius.isZero()) {
      var halfSize = that._size.divide(2);
      for (var i = 0; i < 4; i++) {
        var dir = new Point(i & 1 ? 1 : -1, i > 1 ? 1 : -1),
          corner = dir.multiply(halfSize),
          center = corner.subtract(dir.multiply(radius)),
          rect = new Rectangle(corner, center);
        if ((expand ? rect.expand(expand) : rect).contains(point))
          return center;
      }
    }
  }

  function getEllipseRadius(point, radius) {
    var angle = point.getAngleInRadians(),
      width = radius.width * 2,
      height = radius.height * 2,
      x = width * Math.sin(angle),
      y = height * Math.cos(angle);
    return width * height / (2 * Math.sqrt(x * x + y * y));
  }

  return {
    _contains: function _contains(point) {
      if (this._type === 'rectangle') {
        var center = getCornerCenter(this, point);
        return center
            ? point.subtract(center).divide(this._radius)
              .getLength() <= 1
            : _contains.base.call(this, point);
      } else {
        return point.divide(this.size).getLength() <= 0.5;
      }
    },

    _hitTest: function _hitTest(point, options) {
      var hit = false;
      if (this.hasStroke()) {
        var type = this._type,
          radius = this._radius,
          strokeWidth = this.getStrokeWidth() + 2 * options.tolerance;
        if (type === 'rectangle') {
          var center = getCornerCenter(this, point, strokeWidth);
          if (center) {
            var pt = point.subtract(center);
            hit = 2 * Math.abs(pt.getLength()
                - getEllipseRadius(pt, radius)) <= strokeWidth;
          } else {
            var rect = new Rectangle(this._size).setCenter(0, 0),
              outer = rect.expand(strokeWidth),
              inner = rect.expand(-strokeWidth);
            hit = outer._containsPoint(point)
                && !inner._containsPoint(point);
          }
        } else {
          if (type === 'ellipse')
            radius = getEllipseRadius(point, radius);
          hit = 2 * Math.abs(point.getLength() - radius)
              <= strokeWidth;
        }
      }
      return hit
          ? new HitResult('stroke', this)
          : _hitTest.base.apply(this, arguments);
    }
  };
}, {

statics: new function() {
  function createShape(type, point, size, radius, args) {
    var item = new Shape(Base.getNamed(args));
    item._type = type;
    item._size = size;
    item._radius = radius;
    return item.translate(point);
  }

  return {
    Circle: function() {
      var center = Point.readNamed(arguments, 'center'),
        radius = Base.readNamed(arguments, 'radius');
      return createShape('circle', center, new Size(radius * 2), radius,
          arguments);
    },

    Rectangle: function() {
      var rect = Rectangle.readNamed(arguments, 'rectangle'),
        radius = Size.min(Size.readNamed(arguments, 'radius'),
            rect.getSize(true).divide(2));
      return createShape('rectangle', rect.getCenter(true),
          rect.getSize(true), radius, arguments);
    },

    Ellipse: function() {
      var ellipse = Shape._readEllipse(arguments),
        radius = ellipse.radius;
      return createShape('ellipse', ellipse.center, radius.multiply(2),
          radius, arguments);
    },

    _readEllipse: function(args) {
      var center,
        radius;
      if (Base.hasNamed(args, 'radius')) {
        center = Point.readNamed(args, 'center');
        radius = Size.readNamed(args, 'radius');
      } else {
        var rect = Rectangle.readNamed(args, 'rectangle');
        center = rect.getCenter(true);
        radius = rect.getSize(true).divide(2);
      }
      return { center: center, radius: radius };
    }
  };
}});

var Raster = Item.extend({
  _class: 'Raster',
  _applyMatrix: false,
  _canApplyMatrix: false,
  _boundsGetter: 'getBounds',
  _boundsSelected: true,
  _serializeFields: {
    source: null
  },

  initialize: function Raster(object, position) {
    if (!this._initialize(object,
        position !== undefined && Point.read(arguments, 1))) {
      if (typeof object === 'string') {
        this.setSource(object);
      } else {
        this.setImage(object);
      }
    }
    if (!this._size)
      this._size = new Size();
  },

  _equals: function(item) {
    return this.getSource() === item.getSource();
  },

  clone: function(insert) {
    var copy = new Raster(Item.NO_INSERT),
      image = this._image,
      canvas = this._canvas;
    if (image) {
      copy.setImage(image);
    } else if (canvas) {
      var copyCanvas = CanvasProvider.getCanvas(this._size);
      copyCanvas.getContext('2d').drawImage(canvas, 0, 0);
      copy.setCanvas(copyCanvas);
    }
    return this._clone(copy, insert);
  },

  getSize: function() {
    var size = this._size;
    return new LinkedSize(size.width, size.height, this, 'setSize');
  },

  setSize: function() {
    var size = Size.read(arguments);
    if (!this._size.equals(size)) {
      var element = this.getElement();
      this.setCanvas(CanvasProvider.getCanvas(size));
      if (element)
        this.getContext(true).drawImage(element, 0, 0,
            size.width, size.height);
    }
  },

  getWidth: function() {
    return this._size.width;
  },

  getHeight: function() {
    return this._size.height;
  },

  isEmpty: function() {
    return this._size.width == 0 && this._size.height == 0;
  },

  getPpi: function() {
    var matrix = this._matrix,
      orig = new Point(0, 0).transform(matrix),
      u = new Point(1, 0).transform(matrix).subtract(orig),
      v = new Point(0, 1).transform(matrix).subtract(orig);
    return new Size(
      72 / u.getLength(),
      72 / v.getLength()
    );
  },

  getImage: function() {
    return this._image;
  },

  setImage: function(image) {
    if (this._canvas)
      CanvasProvider.release(this._canvas);
    if (image.getContext) {
      this._image = null;
      this._canvas = image;
    } else {
      this._image = image;
      this._canvas = null;
    }
    this._size = new Size(
        image.naturalWidth || image.width,
        image.naturalHeight || image.height);
    this._context = null;
    this._changed(9 | 513);
  },

  getCanvas: function() {
    if (!this._canvas) {
      var ctx = CanvasProvider.getContext(this._size);
      try {
        if (this._image)
          ctx.drawImage(this._image, 0, 0);
        this._canvas = ctx.canvas;
      } catch (e) {
        CanvasProvider.release(ctx);
      }
    }
    return this._canvas;
  },

  setCanvas: '#setImage',

  getContext: function(modify) {
    if (!this._context)
      this._context = this.getCanvas().getContext('2d');
    if (modify) {
      this._image = null;
      this._changed(513);
    }
    return this._context;
  },

  setContext: function(context) {
    this._context = context;
  },

  getSource: function() {
    return this._image && this._image.src || this.toDataURL();
  },

  setSource: function(src) {
    var that = this,
      image;

    function loaded() {
      var view = that.getView();
      if (view) {
        paper = view._scope;
        that.setImage(image);
        that.fire('load');
        view.update();
      }
    }

      image = document.getElementById(src) || new Image();

    if (image.naturalWidth && image.naturalHeight) {
      setTimeout(loaded, 0);
    } else {
      DomEvent.add(image, {
        load: loaded
      });
      if (!image.src)
        image.src = src;
    }
    this.setImage(image);
  },

  getElement: function() {
    return this._canvas || this._image;
  },

  getSubCanvas: function(rect) { 
    var rect = Rectangle.read(arguments),
      ctx = CanvasProvider.getContext(rect.getSize());
    ctx.drawImage(this.getCanvas(), rect.x, rect.y,
        rect.width, rect.height, 0, 0, rect.width, rect.height);
    return ctx.canvas;
  },

  getSubRaster: function(rect) { 
    var rect = Rectangle.read(arguments),
      raster = new Raster(Item.NO_INSERT);
    raster.setCanvas(this.getSubCanvas(rect));
    raster.translate(rect.getCenter().subtract(this.getSize().divide(2)));
    raster._matrix.preConcatenate(this._matrix);
    raster.insertAbove(this);
    return raster;
  },

  toDataURL: function() {
    var src = this._image && this._image.src;
    if (/^data:/.test(src))
      return src;
    var canvas = this.getCanvas();
    return canvas ? canvas.toDataURL() : null;
  },

  drawImage: function(image ) {
    var point = Point.read(arguments, 1);
    this.getContext(true).drawImage(image, point.x, point.y);
  },

  getAverageColor: function(object) {
    var bounds, path;
    if (!object) {
      bounds = this.getBounds();
    } else if (object instanceof PathItem) {
      path = object;
      bounds = object.getBounds();
    } else if (object.width) {
      bounds = new Rectangle(object);
    } else if (object.x) {
      bounds = new Rectangle(object.x - 0.5, object.y - 0.5, 1, 1);
    }
    var sampleSize = 32,
      width = Math.min(bounds.width, sampleSize),
      height = Math.min(bounds.height, sampleSize);
    var ctx = Raster._sampleContext;
    if (!ctx) {
      ctx = Raster._sampleContext = CanvasProvider.getContext(
          new Size(sampleSize));
    } else {
      ctx.clearRect(0, 0, sampleSize + 1, sampleSize + 1);
    }
    ctx.save();
    var matrix = new Matrix()
        .scale(width / bounds.width, height / bounds.height)
        .translate(-bounds.x, -bounds.y);
    matrix.applyToContext(ctx);
    if (path)
      path.draw(ctx, new Base({ clip: true, transforms: [matrix] }));
    this._matrix.applyToContext(ctx);
    ctx.drawImage(this.getElement(),
        -this._size.width / 2, -this._size.height / 2);
    ctx.restore();
    var pixels = ctx.getImageData(0.5, 0.5, Math.ceil(width),
        Math.ceil(height)).data,
      channels = [0, 0, 0],
      total = 0;
    for (var i = 0, l = pixels.length; i < l; i += 4) {
      var alpha = pixels[i + 3];
      total += alpha;
      alpha /= 255;
      channels[0] += pixels[i] * alpha;
      channels[1] += pixels[i + 1] * alpha;
      channels[2] += pixels[i + 2] * alpha;
    }
    for (var i = 0; i < 3; i++)
      channels[i] /= total;
    return total ? Color.read(channels) : null;
  },

  getPixel: function(point) { 
    var point = Point.read(arguments);
    var data = this.getContext().getImageData(point.x, point.y, 1, 1).data;
    return new Color('rgb', [data[0] / 255, data[1] / 255, data[2] / 255],
        data[3] / 255);
  },

  setPixel: function() {
    var point = Point.read(arguments),
      color = Color.read(arguments),
      components = color._convert('rgb'),
      alpha = color._alpha,
      ctx = this.getContext(true),
      imageData = ctx.createImageData(1, 1),
      data = imageData.data;
    data[0] = components[0] * 255;
    data[1] = components[1] * 255;
    data[2] = components[2] * 255;
    data[3] = alpha != null ? alpha * 255 : 255;
    ctx.putImageData(imageData, point.x, point.y);
  },

  createImageData: function() {
    var size = Size.read(arguments);
    return this.getContext().createImageData(size.width, size.height);
  },

  getImageData: function(rect) { 
    var rect = Rectangle.read(arguments);
    if (rect.isEmpty())
      rect = new Rectangle(this._size);
    return this.getContext().getImageData(rect.x, rect.y,
        rect.width, rect.height);
  },

  setImageData: function(data ) {
    var point = Point.read(arguments, 1);
    this.getContext(true).putImageData(data, point.x, point.y);
  },

  _getBounds: function(getter, matrix) {
    var rect = new Rectangle(this._size).setCenter(0, 0);
    return matrix ? matrix._transformBounds(rect) : rect;
  },

  _hitTest: function(point) {
    if (this._contains(point)) {
      var that = this;
      return new HitResult('pixel', that, {
        offset: point.add(that._size.divide(2)).round(),
        color: {
          get: function() {
            return that.getPixel(this.offset);
          }
        }
      });
    }
  },

  _draw: function(ctx) {
    var element = this.getElement();
    if (element) {
      ctx.globalAlpha = this._opacity;
      ctx.drawImage(element,
          -this._size.width / 2, -this._size.height / 2);
    }
  },

  _canComposite: function() {
    return true;
  }
});

var PlacedSymbol = Item.extend({
  _class: 'PlacedSymbol',
  _applyMatrix: false,
  _canApplyMatrix: false,
  _boundsGetter: { getBounds: 'getStrokeBounds' },
  _boundsSelected: true,
  _serializeFields: {
    symbol: null
  },

  initialize: function PlacedSymbol(arg0, arg1) {
    if (!this._initialize(arg0,
        arg1 !== undefined && Point.read(arguments, 1)))
      this.setSymbol(arg0 instanceof Symbol ? arg0 : new Symbol(arg0));
  },

  _equals: function(item) {
    return this._symbol === item._symbol;
  },

  getSymbol: function() {
    return this._symbol;
  },

  setSymbol: function(symbol) {
    this._symbol = symbol;
    this._changed(9);
  },

  clone: function(insert) {
    var copy = new PlacedSymbol(Item.NO_INSERT);
    copy.setSymbol(this._symbol);
    return this._clone(copy, insert);
  },

  isEmpty: function() {
    return this._symbol._definition.isEmpty();
  },

  _getBounds: function(getter, matrix, cacheItem) {
    return this.symbol._definition._getCachedBounds(getter, matrix,
        cacheItem);
  },

  _hitTest: function(point, options) {
    var res = this._symbol._definition.hitTest(point, options);
    if (res)
      res.item = this;
    return res;
  },

  _draw: function(ctx, param) {
    this.symbol._definition.draw(ctx, param);
  }

});

var HitResult = Base.extend({
  _class: 'HitResult',

  initialize: function HitResult(type, item, values) {
    this.type = type;
    this.item = item;
    if (values) {
      values.enumerable = true;
      this.inject(values);
    }
  },

  statics: {
    getOptions: function(options) {
      return options && options._merged ? options : new Base({
        type: null,
        tolerance: paper.settings.hitTolerance,
        fill: !options,
        stroke: !options,
        segments: !options,
        handles: false,
        ends: false,
        center: false,
        bounds: false,
        guides: false,
        selected: false,
        _merged: true
      }, options);
    }
  }
});

var Segment = Base.extend({
  _class: 'Segment',
  beans: true,

  initialize: function Segment(arg0, arg1, arg2, arg3, arg4, arg5) {
    var count = arguments.length,
      point, handleIn, handleOut;
    if (count === 0) {
    } else if (count === 1) {
      if (arg0.point) {
        point = arg0.point;
        handleIn = arg0.handleIn;
        handleOut = arg0.handleOut;
      } else {
        point = arg0;
      }
    } else if (count === 2 && typeof arg0 === 'number') {
      point = arguments;
    } else if (count <= 3) {
      point = arg0;
      handleIn = arg1;
      handleOut = arg2;
    } else { 
      point = arg0 !== undefined ? [ arg0, arg1 ] : null;
      handleIn = arg2 !== undefined ? [ arg2, arg3 ] : null;
      handleOut = arg4 !== undefined ? [ arg4, arg5 ] : null;
    }
    new SegmentPoint(point, this, '_point');
    new SegmentPoint(handleIn, this, '_handleIn');
    new SegmentPoint(handleOut, this, '_handleOut');
  },

  _serialize: function(options) {
    return Base.serialize(this.isLinear() ? this._point
        : [this._point, this._handleIn, this._handleOut],
        options, true);
  },

  _changed: function(point) {
    var path = this._path;
    if (!path)
      return;
    var curves = path._curves,
      index = this._index,
      curveIn, curveOut;
    if (curves) {
      if ((!point || point === this._point || point === this._handleIn)
          && (curveIn = curves[index - 1]
            || path._closed && curves[curves.length - 1]))
        curveIn._changed();
      if ((!point || point === this._point || point === this._handleOut)
          && (curveOut = curves[index]))
        curveOut._changed();
    }
    path._changed(25);
  },

  getPoint: function() {
    return this._point;
  },

  setPoint: function() {
    var point = Point.read(arguments);
    this._point.set(point.x, point.y);
  },

  getHandleIn: function() {
    return this._handleIn;
  },

  setHandleIn: function() {
    var point = Point.read(arguments);
    this._handleIn.set(point.x, point.y);
  },

  getHandleOut: function() {
    return this._handleOut;
  },

  setHandleOut: function() {
    var point = Point.read(arguments);
    this._handleOut.set(point.x, point.y);
  },

  isLinear: function() {
    return this._handleIn.isZero() && this._handleOut.isZero();
  },

  setLinear: function() {
    this._handleIn.set(0, 0);
    this._handleOut.set(0, 0);
  },

  isColinear: function(segment) {
    var next1 = this.getNext(),
      next2 = segment.getNext();
    return this._handleOut.isZero() && next1._handleIn.isZero()
        && segment._handleOut.isZero() && next2._handleIn.isZero()
        && next1._point.subtract(this._point).isColinear(
          next2._point.subtract(segment._point));
  },

  isOrthogonal: function() {
    var prev = this.getPrevious(),
      next = this.getNext();
    return prev._handleOut.isZero() && this._handleIn.isZero()
      && this._handleOut.isZero() && next._handleIn.isZero()
      && this._point.subtract(prev._point).isOrthogonal(
          next._point.subtract(this._point));
  },

  isArc: function() {
    var next = this.getNext(),
      handle1 = this._handleOut,
      handle2 = next._handleIn,
      kappa = 0.5522847498307936;
    if (handle1.isOrthogonal(handle2)) {
      var from = this._point,
        to = next._point,
        corner = new Line(from, handle1, true).intersect(
            new Line(to, handle2, true), true);
      return corner && Numerical.isZero(handle1.getLength() /
          corner.subtract(from).getLength() - kappa)
        && Numerical.isZero(handle2.getLength() /
          corner.subtract(to).getLength() - kappa);
    }
    return false;
  },

  _selectionState: 0,

  isSelected: function(_point) {
    var state = this._selectionState;
    return !_point ? !!(state & 7)
      : _point === this._point ? !!(state & 4)
      : _point === this._handleIn ? !!(state & 1)
      : _point === this._handleOut ? !!(state & 2)
      : false;
  },

  setSelected: function(selected, _point) {
    var path = this._path,
      selected = !!selected, 
      state = this._selectionState,
      oldState = state,
      flag = !_point ? 7
          : _point === this._point ? 4
          : _point === this._handleIn ? 1
          : _point === this._handleOut ? 2
          : 0;
    if (selected) {
      state |= flag;
    } else {
      state &= ~flag;
    }
    this._selectionState = state;
    if (path && state !== oldState) {
      path._updateSelection(this, oldState, state);
      path._changed(129);
    }
  },

  getIndex: function() {
    return this._index !== undefined ? this._index : null;
  },

  getPath: function() {
    return this._path || null;
  },

  getCurve: function() {
    var path = this._path,
      index = this._index;
    if (path) {
      if (index > 0 && !path._closed
          && index === path._segments.length - 1)
        index--;
      return path.getCurves()[index] || null;
    }
    return null;
  },

  getLocation: function() {
    var curve = this.getCurve();
    return curve
        ? new CurveLocation(curve, this === curve._segment1 ? 0 : 1)
        : null;
  },

  getNext: function() {
    var segments = this._path && this._path._segments;
    return segments && (segments[this._index + 1]
        || this._path._closed && segments[0]) || null;
  },

  getPrevious: function() {
    var segments = this._path && this._path._segments;
    return segments && (segments[this._index - 1]
        || this._path._closed && segments[segments.length - 1]) || null;
  },

  reverse: function() {
    return new Segment(this._point, this._handleOut, this._handleIn);
  },

  remove: function() {
    return this._path ? !!this._path.removeSegment(this._index) : false;
  },

  clone: function() {
    return new Segment(this._point, this._handleIn, this._handleOut);
  },

  equals: function(segment) {
    return segment === this || segment && this._class === segment._class
        && this._point.equals(segment._point)
        && this._handleIn.equals(segment._handleIn)
        && this._handleOut.equals(segment._handleOut)
        || false;
  },

  toString: function() {
    var parts = [ 'point: ' + this._point ];
    if (!this._handleIn.isZero())
      parts.push('handleIn: ' + this._handleIn);
    if (!this._handleOut.isZero())
      parts.push('handleOut: ' + this._handleOut);
    return '{ ' + parts.join(', ') + ' }';
  },

  transform: function(matrix) {
    this._transformCoordinates(matrix, new Array(6), true);
    this._changed();
  },

  _transformCoordinates: function(matrix, coords, change) {
    var point = this._point,
      handleIn =  !change || !this._handleIn.isZero()
          ? this._handleIn : null,
      handleOut = !change || !this._handleOut.isZero()
          ? this._handleOut : null,
      x = point._x,
      y = point._y,
      i = 2;
    coords[0] = x;
    coords[1] = y;
    if (handleIn) {
      coords[i++] = handleIn._x + x;
      coords[i++] = handleIn._y + y;
    }
    if (handleOut) {
      coords[i++] = handleOut._x + x;
      coords[i++] = handleOut._y + y;
    }
    if (matrix) {
      matrix._transformCoordinates(coords, 0, coords, 0, i / 2);
      x = coords[0];
      y = coords[1];
      if (change) {
        point._x = x;
        point._y = y;
        i  = 2;
        if (handleIn) {
          handleIn._x = coords[i++] - x;
          handleIn._y = coords[i++] - y;
        }
        if (handleOut) {
          handleOut._x = coords[i++] - x;
          handleOut._y = coords[i++] - y;
        }
      } else {
        if (!handleIn) {
          coords[i++] = x;
          coords[i++] = y;
        }
        if (!handleOut) {
          coords[i++] = x;
          coords[i++] = y;
        }
      }
    }
    return coords;
  }
});

var SegmentPoint = Point.extend({
  initialize: function SegmentPoint(point, owner, key) {
    var x, y, selected;
    if (!point) {
      x = y = 0;
    } else if ((x = point[0]) !== undefined) { 
      y = point[1];
    } else {
      var pt = point;
      if ((x = pt.x) === undefined) {
        pt = Point.read(arguments);
        x = pt.x;
      }
      y = pt.y;
      selected = pt.selected;
    }
    this._x = x;
    this._y = y;
    this._owner = owner;
    owner[key] = this;
    if (selected)
      this.setSelected(true);
  },

  set: function(x, y) {
    this._x = x;
    this._y = y;
    this._owner._changed(this);
    return this;
  },

  _serialize: function(options) {
    var f = options.formatter,
      x = f.number(this._x),
      y = f.number(this._y);
    return this.isSelected()
        ? { x: x, y: y, selected: true }
        : [x, y];
  },

  getX: function() {
    return this._x;
  },

  setX: function(x) {
    this._x = x;
    this._owner._changed(this);
  },

  getY: function() {
    return this._y;
  },

  setY: function(y) {
    this._y = y;
    this._owner._changed(this);
  },

  isZero: function() {
    return Numerical.isZero(this._x) && Numerical.isZero(this._y);
  },

  setSelected: function(selected) {
    this._owner.setSelected(selected, this);
  },

  isSelected: function() {
    return this._owner.isSelected(this);
  }
});

var Curve = Base.extend({
  _class: 'Curve',
  initialize: function Curve(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    var count = arguments.length;
    if (count === 3) {
      this._path = arg0;
      this._segment1 = arg1;
      this._segment2 = arg2;
    } else if (count === 0) {
      this._segment1 = new Segment();
      this._segment2 = new Segment();
    } else if (count === 1) {
      this._segment1 = new Segment(arg0.segment1);
      this._segment2 = new Segment(arg0.segment2);
    } else if (count === 2) {
      this._segment1 = new Segment(arg0);
      this._segment2 = new Segment(arg1);
    } else {
      var point1, handle1, handle2, point2;
      if (count === 4) {
        point1 = arg0;
        handle1 = arg1;
        handle2 = arg2;
        point2 = arg3;
      } else if (count === 8) {
        point1 = [arg0, arg1];
        point2 = [arg6, arg7];
        handle1 = [arg2 - arg0, arg3 - arg1];
        handle2 = [arg4 - arg6, arg5 - arg7];
      }
      this._segment1 = new Segment(point1, null, handle1);
      this._segment2 = new Segment(point2, handle2, null);
    }
  },

  _changed: function() {
    this._length = this._bounds = undefined;
  },

  getPoint1: function() {
    return this._segment1._point;
  },

  setPoint1: function() {
    var point = Point.read(arguments);
    this._segment1._point.set(point.x, point.y);
  },

  getPoint2: function() {
    return this._segment2._point;
  },

  setPoint2: function() {
    var point = Point.read(arguments);
    this._segment2._point.set(point.x, point.y);
  },

  getHandle1: function() {
    return this._segment1._handleOut;
  },

  setHandle1: function() {
    var point = Point.read(arguments);
    this._segment1._handleOut.set(point.x, point.y);
  },

  getHandle2: function() {
    return this._segment2._handleIn;
  },

  setHandle2: function() {
    var point = Point.read(arguments);
    this._segment2._handleIn.set(point.x, point.y);
  },

  getSegment1: function() {
    return this._segment1;
  },

  getSegment2: function() {
    return this._segment2;
  },

  getPath: function() {
    return this._path;
  },

  getIndex: function() {
    return this._segment1._index;
  },

  getNext: function() {
    var curves = this._path && this._path._curves;
    return curves && (curves[this._segment1._index + 1]
        || this._path._closed && curves[0]) || null;
  },

  getPrevious: function() {
    var curves = this._path && this._path._curves;
    return curves && (curves[this._segment1._index - 1]
        || this._path._closed && curves[curves.length - 1]) || null;
  },

  isSelected: function() {
    return this.getPoint1().isSelected()
        && this.getHandle2().isSelected()
        && this.getHandle2().isSelected()
        && this.getPoint2().isSelected();
  },

  setSelected: function(selected) {
    this.getPoint1().setSelected(selected);
    this.getHandle1().setSelected(selected);
    this.getHandle2().setSelected(selected);
    this.getPoint2().setSelected(selected);
  },

  getValues: function(matrix) {
    return Curve.getValues(this._segment1, this._segment2, matrix);
  },

  getPoints: function() {
    var coords = this.getValues(),
      points = [];
    for (var i = 0; i < 8; i += 2)
      points.push(new Point(coords[i], coords[i + 1]));
    return points;
  },

  getLength: function() {
    if (this._length == null) {
      this._length = this.isLinear()
        ? this._segment2._point.getDistance(this._segment1._point)
        : Curve.getLength(this.getValues(), 0, 1);
    }
    return this._length;
  },

  getArea: function() {
    return Curve.getArea(this.getValues());
  },

  getPart: function(from, to) {
    return new Curve(Curve.getPart(this.getValues(), from, to));
  },

  getPartLength: function(from, to) {
    return Curve.getLength(this.getValues(), from, to);
  },

  isLinear: function() {
    return this._segment1._handleOut.isZero()
        && this._segment2._handleIn.isZero();
  },

  isHorizontal: function() {
    return this.isLinear() && Numerical.isZero(
        this._segment1._point._y - this._segment2._point._y);
  },

  getIntersections: function(curve) {
    return Curve.getIntersections(this.getValues(), curve.getValues(),
        this, curve, []);
  },

  _getParameter: function(offset, isParameter) {
    return isParameter
        ? offset
        : offset && offset.curve === this
          ? offset.parameter
          : offset === undefined && isParameter === undefined
            ? 0.5 
            : this.getParameterAt(offset, 0);
  },

  divide: function(offset, isParameter, ignoreLinear) {
    var parameter = this._getParameter(offset, isParameter),
      tolerance = 0.00001,
      res = null;
    if (parameter > tolerance && parameter < 1 - tolerance) {
      var parts = Curve.subdivide(this.getValues(), parameter),
        isLinear = ignoreLinear ? false : this.isLinear(),
        left = parts[0],
        right = parts[1];

      if (!isLinear) {
        this._segment1._handleOut.set(left[2] - left[0],
            left[3] - left[1]);
        this._segment2._handleIn.set(right[4] - right[6],
            right[5] - right[7]);
      }

      var x = left[6], y = left[7],
        segment = new Segment(new Point(x, y),
            !isLinear && new Point(left[4] - x, left[5] - y),
            !isLinear && new Point(right[2] - x, right[3] - y));

      if (this._path) {
        if (this._segment1._index > 0 && this._segment2._index === 0) {
          this._path.add(segment);
        } else {
          this._path.insert(this._segment2._index, segment);
        }
        res = this; 
      } else {
        var end = this._segment2;
        this._segment2 = segment;
        res = new Curve(segment, end);
      }
    }
    return res;
  },

  split: function(offset, isParameter) {
    return this._path
      ? this._path.split(this._segment1._index,
          this._getParameter(offset, isParameter))
      : null;
  },

  reverse: function() {
    return new Curve(this._segment2.reverse(), this._segment1.reverse());
  },

  remove: function() {
    var removed = false;
    if (this._path) {
      var segment2 = this._segment2,
        handleOut = segment2._handleOut;
      removed = segment2.remove();
      if (removed)
        this._segment1._handleOut.set(handleOut.x, handleOut.y);
    }
    return removed;
  },

  clone: function() {
    return new Curve(this._segment1, this._segment2);
  },

  toString: function() {
    var parts = [ 'point1: ' + this._segment1._point ];
    if (!this._segment1._handleOut.isZero())
      parts.push('handle1: ' + this._segment1._handleOut);
    if (!this._segment2._handleIn.isZero())
      parts.push('handle2: ' + this._segment2._handleIn);
    parts.push('point2: ' + this._segment2._point);
    return '{ ' + parts.join(', ') + ' }';
  },

statics: {
  getValues: function(segment1, segment2, matrix) {
    var p1 = segment1._point,
      h1 = segment1._handleOut,
      h2 = segment2._handleIn,
      p2 = segment2._point,
      values = [
        p1._x, p1._y,
        p1._x + h1._x, p1._y + h1._y,
        p2._x + h2._x, p2._y + h2._y,
        p2._x, p2._y
      ];
    if (matrix)
      matrix._transformCoordinates(values, 0, values, 0, 6);
    return values;
  },

  evaluate: function(v, t, type) {
    var p1x = v[0], p1y = v[1],
      c1x = v[2], c1y = v[3],
      c2x = v[4], c2y = v[5],
      p2x = v[6], p2y = v[7],
      tolerance = 0.00001,
      x, y;

    if (type === 0 && (t < tolerance || t > 1 - tolerance)) {
      var isZero = t < tolerance;
      x = isZero ? p1x : p2x;
      y = isZero ? p1y : p2y;
    } else {
      var cx = 3 * (c1x - p1x),
        bx = 3 * (c2x - c1x) - cx,
        ax = p2x - p1x - cx - bx,

        cy = 3 * (c1y - p1y),
        by = 3 * (c2y - c1y) - cy,
        ay = p2y - p1y - cy - by;
      if (type === 0) {
        x = ((ax * t + bx) * t + cx) * t + p1x;
        y = ((ay * t + by) * t + cy) * t + p1y;
      } else {
        if (t < tolerance && c1x === p1x && c1y === p1y
            || t > 1 - tolerance && c2x === p2x && c2y === p2y) {
          x = p2x - p1x;
          y = p2y - p1y;
        } else if (t < tolerance) {
          x = cx;
          y = cy;
        } else if (t > 1 - tolerance) {
          x = 3 * (p2x - c2x);
          y = 3 * (p2y - c2y);
        } else {
          x = (3 * ax * t + 2 * bx) * t + cx;
          y = (3 * ay * t + 2 * by) * t + cy;
        }
        if (type === 3) {
          var x2 = 6 * ax * t + 2 * bx,
            y2 = 6 * ay * t + 2 * by;
          return (x * y2 - y * x2) / Math.pow(x * x + y * y, 3 / 2);
        }
      }
    }
    return type === 2 ? new Point(y, -x) : new Point(x, y);
  },

  subdivide: function(v, t) {
    var p1x = v[0], p1y = v[1],
      c1x = v[2], c1y = v[3],
      c2x = v[4], c2y = v[5],
      p2x = v[6], p2y = v[7];
    if (t === undefined)
      t = 0.5;
    var u = 1 - t,
      p3x = u * p1x + t * c1x, p3y = u * p1y + t * c1y,
      p4x = u * c1x + t * c2x, p4y = u * c1y + t * c2y,
      p5x = u * c2x + t * p2x, p5y = u * c2y + t * p2y,
      p6x = u * p3x + t * p4x, p6y = u * p3y + t * p4y,
      p7x = u * p4x + t * p5x, p7y = u * p4y + t * p5y,
      p8x = u * p6x + t * p7x, p8y = u * p6y + t * p7y;
    return [
      [p1x, p1y, p3x, p3y, p6x, p6y, p8x, p8y], 
      [p8x, p8y, p7x, p7y, p5x, p5y, p2x, p2y] 
    ];
  },

  solveCubic: function (v, coord, val, roots, min, max) {
    var p1 = v[coord],
      c1 = v[coord + 2],
      c2 = v[coord + 4],
      p2 = v[coord + 6],
      c = 3 * (c1 - p1),
      b = 3 * (c2 - c1) - c,
      a = p2 - p1 - c - b;
    return Numerical.solveCubic(a, b, c, p1 - val, roots, min, max);
  },

  getParameterOf: function(v, x, y) {
    var tolerance = 0.00001;
    if (Math.abs(v[0] - x) < tolerance && Math.abs(v[1] - y) < tolerance)
      return 0;
    if (Math.abs(v[6] - x) < tolerance && Math.abs(v[7] - y) < tolerance)
      return 1;
    var txs = [],
      tys = [],
      sx = Curve.solveCubic(v, 0, x, txs),
      sy = Curve.solveCubic(v, 1, y, tys),
      tx, ty;
    for (var cx = 0;  sx == -1 || cx < sx;) {
      if (sx == -1 || (tx = txs[cx++]) >= 0 && tx <= 1) {
        for (var cy = 0; sy == -1 || cy < sy;) {
          if (sy == -1 || (ty = tys[cy++]) >= 0 && ty <= 1) {
            if (sx == -1) tx = ty;
            else if (sy == -1) ty = tx;
            if (Math.abs(tx - ty) < tolerance)
              return (tx + ty) * 0.5;
          }
        }
        if (sx == -1)
          break;
      }
    }
    return null;
  },

  getPart: function(v, from, to) {
    if (from > 0)
      v = Curve.subdivide(v, from)[1]; 
    if (to < 1)
      v = Curve.subdivide(v, (to - from) / (1 - from))[0]; 
    return v;
  },

  isLinear: function(v) {
    var isZero = Numerical.isZero;
    return isZero(v[0] - v[2]) && isZero(v[1] - v[3])
        && isZero(v[4] - v[6]) && isZero(v[5] - v[7]);
  },

  isFlatEnough: function(v, tolerance) {
    var p1x = v[0], p1y = v[1],
      c1x = v[2], c1y = v[3],
      c2x = v[4], c2y = v[5],
      p2x = v[6], p2y = v[7],
      ux = 3 * c1x - 2 * p1x - p2x,
      uy = 3 * c1y - 2 * p1y - p2y,
      vx = 3 * c2x - 2 * p2x - p1x,
      vy = 3 * c2y - 2 * p2y - p1y;
    return Math.max(ux * ux, vx * vx) + Math.max(uy * uy, vy * vy)
        < 10 * tolerance * tolerance;
  },

  getArea: function(v) {
    var p1x = v[0], p1y = v[1],
      c1x = v[2], c1y = v[3],
      c2x = v[4], c2y = v[5],
      p2x = v[6], p2y = v[7];
    return (  3.0 * c1y * p1x - 1.5 * c1y * c2x
        - 1.5 * c1y * p2x - 3.0 * p1y * c1x
        - 1.5 * p1y * c2x - 0.5 * p1y * p2x
        + 1.5 * c2y * p1x + 1.5 * c2y * c1x
        - 3.0 * c2y * p2x + 0.5 * p2y * p1x
        + 1.5 * p2y * c1x + 3.0 * p2y * c2x) / 10;
  },

  getBounds: function(v) {
    var min = v.slice(0, 2), 
      max = min.slice(), 
      roots = [0, 0];
    for (var i = 0; i < 2; i++)
      Curve._addBounds(v[i], v[i + 2], v[i + 4], v[i + 6],
          i, 0, min, max, roots);
    return new Rectangle(min[0], min[1], max[0] - min[0], max[1] - min[1]);
  },

  _addBounds: function(v0, v1, v2, v3, coord, padding, min, max, roots) {
    function add(value, padding) {
      var left = value - padding,
        right = value + padding;
      if (left < min[coord])
        min[coord] = left;
      if (right > max[coord])
        max[coord] = right;
    }
    var a = 3 * (v1 - v2) - v0 + v3,
      b = 2 * (v0 + v2) - 4 * v1,
      c = v1 - v0,
      count = Numerical.solveQuadratic(a, b, c, roots),
      tMin = 0.00001,
      tMax = 1 - tMin;
    add(v3, 0);
    for (var i = 0; i < count; i++) {
      var t = roots[i],
        u = 1 - t;
      if (tMin < t && t < tMax)
        add(u * u * u * v0
          + 3 * u * u * t * v1
          + 3 * u * t * t * v2
          + t * t * t * v3,
          padding);
    }
  }
}}, Base.each(['getBounds', 'getStrokeBounds', 'getHandleBounds', 'getRoughBounds'],
  function(name) {
    this[name] = function() {
      if (!this._bounds)
        this._bounds = {};
      var bounds = this._bounds[name];
      if (!bounds) {
        bounds = this._bounds[name] = Path[name]([this._segment1,
            this._segment2], false, this._path.getStyle());
      }
      return bounds.clone();
    };
  },
{

}), Base.each(['getPoint', 'getTangent', 'getNormal', 'getCurvature'],
  function(name, index) {
    this[name + 'At'] = function(offset, isParameter) {
      var values = this.getValues();
      return Curve.evaluate(values, isParameter
          ? offset : Curve.getParameterAt(values, offset, 0), index);
    };
    this[name] = function(parameter) {
      return Curve.evaluate(this.getValues(), parameter, index);
    };
  },
{
  getParameterAt: function(offset, start) {
    return Curve.getParameterAt(this.getValues(), offset,
        start !== undefined ? start : offset < 0 ? 1 : 0);
  },

  getParameterOf: function(point) { 
    var point = Point.read(arguments);
    return Curve.getParameterOf(this.getValues(), point.x, point.y);
  },

  getLocationAt: function(offset, isParameter) {
    if (!isParameter)
      offset = this.getParameterAt(offset);
    return new CurveLocation(this, offset);
  },

  getLocationOf: function(point) { 
    var point = Point.read(arguments),
      t = this.getParameterOf(point);
    return t != null ? new CurveLocation(this, t) : null;
  },

  getNearestLocation: function(point) { 
    var point = Point.read(arguments),
      values = this.getValues(),
      count = 100,
      minDist = Infinity,
      minT = 0;

    function refine(t) {
      if (t >= 0 && t <= 1) {
        var dist = point.getDistance(
            Curve.evaluate(values, t, 0), true);
        if (dist < minDist) {
          minDist = dist;
          minT = t;
          return true;
        }
      }
    }

    for (var i = 0; i <= count; i++)
      refine(i / count);

    var step = 1 / (count * 2);
    while (step > 0.00001) {
      if (!refine(minT - step) && !refine(minT + step))
        step /= 2;
    }
    var pt = Curve.evaluate(values, minT, 0);
    return new CurveLocation(this, minT, pt, null, null, null,
        point.getDistance(pt));
  },

  getNearestPoint: function(point) {
    var point = Point.read(arguments);
    return this.getNearestLocation(point).getPoint();
  }

}),
new function() { 

  function getLengthIntegrand(v) {
    var p1x = v[0], p1y = v[1],
      c1x = v[2], c1y = v[3],
      c2x = v[4], c2y = v[5],
      p2x = v[6], p2y = v[7],

      ax = 9 * (c1x - c2x) + 3 * (p2x - p1x),
      bx = 6 * (p1x + c2x) - 12 * c1x,
      cx = 3 * (c1x - p1x),

      ay = 9 * (c1y - c2y) + 3 * (p2y - p1y),
      by = 6 * (p1y + c2y) - 12 * c1y,
      cy = 3 * (c1y - p1y);

    return function(t) {
      var dx = (ax * t + bx) * t + cx,
        dy = (ay * t + by) * t + cy;
      return Math.sqrt(dx * dx + dy * dy);
    };
  }

  function getIterations(a, b) {
    return Math.max(2, Math.min(16, Math.ceil(Math.abs(b - a) * 32)));
  }

  return {
    statics: true,

    getLength: function(v, a, b) {
      if (a === undefined)
        a = 0;
      if (b === undefined)
        b = 1;
      var isZero = Numerical.isZero;
      if (a === 0 && b === 1
          && isZero(v[0] - v[2]) && isZero(v[1] - v[3])
          && isZero(v[6] - v[4]) && isZero(v[7] - v[5])) {
        var dx = v[6] - v[0], 
          dy = v[7] - v[1]; 
        return Math.sqrt(dx * dx + dy * dy);
      }
      var ds = getLengthIntegrand(v);
      return Numerical.integrate(ds, a, b, getIterations(a, b));
    },

    getParameterAt: function(v, offset, start) {
      if (offset === 0)
        return start;
      var forward = offset > 0,
        a = forward ? start : 0,
        b = forward ? 1 : start,
        offset = Math.abs(offset),
        ds = getLengthIntegrand(v),
        rangeLength = Numerical.integrate(ds, a, b,
            getIterations(a, b));
      if (offset >= rangeLength)
        return forward ? b : a;
      var guess = offset / rangeLength,
        length = 0;
      function f(t) {
        var count = getIterations(start, t);
        length += start < t
            ? Numerical.integrate(ds, start, t, count)
            : -Numerical.integrate(ds, t, start, count);
        start = t;
        return length - offset;
      }
      return Numerical.findRoot(f, ds,
          forward ? a + guess : b - guess, 
          a, b, 16, 0.00001);
    }
  };
}, new function() { 
  function addLocation(locations, include, curve1, t1, point1, curve2, t2,
      point2) {
    var loc = new CurveLocation(curve1, t1, point1, curve2, t2, point2);
    if (!include || include(loc))
      locations.push(loc);
  }

  function addCurveIntersections(v1, v2, curve1, curve2, locations, include,
      tMin, tMax, uMin, uMax, oldTDiff, reverse, recursion) {
    if (recursion > 20)
      return;
    var q0x = v2[0], q0y = v2[1], q3x = v2[6], q3y = v2[7],
      tolerance = 0.00001,
      hullEpsilon = 1e-9,
      getSignedDistance = Line.getSignedDistance,
      d1 = getSignedDistance(q0x, q0y, q3x, q3y, v2[2], v2[3]) || 0,
      d2 = getSignedDistance(q0x, q0y, q3x, q3y, v2[4], v2[5]) || 0,
      factor = d1 * d2 > 0 ? 3 / 4 : 4 / 9,
      dMin = factor * Math.min(0, d1, d2),
      dMax = factor * Math.max(0, d1, d2),
      dp0 = getSignedDistance(q0x, q0y, q3x, q3y, v1[0], v1[1]),
      dp1 = getSignedDistance(q0x, q0y, q3x, q3y, v1[2], v1[3]),
      dp2 = getSignedDistance(q0x, q0y, q3x, q3y, v1[4], v1[5]),
      dp3 = getSignedDistance(q0x, q0y, q3x, q3y, v1[6], v1[7]),
      tMinNew, tMaxNew, tDiff;
    if (q0x === q3x && uMax - uMin <= hullEpsilon && recursion > 3) {
      tMinNew = (tMax + tMin) / 2;
      tMaxNew = tMinNew;
      tDiff = 0;
    } else {
      var hull = getConvexHull(dp0, dp1, dp2, dp3),
        top = hull[0],
        bottom = hull[1],
        tMinClip, tMaxClip;
      tMinClip = clipConvexHull(top, bottom, dMin, dMax);
      top.reverse();
      bottom.reverse();
      tMaxClip = clipConvexHull(top, bottom, dMin, dMax);
      if (tMinClip == null || tMaxClip == null)
        return false;
      v1 = Curve.getPart(v1, tMinClip, tMaxClip);
      tDiff = tMaxClip - tMinClip;
      tMinNew = tMax * tMinClip + tMin * (1 - tMinClip);
      tMaxNew = tMax * tMaxClip + tMin * (1 - tMaxClip);
    }
    if (oldTDiff > 0.8 && tDiff > 0.8) {
      if (tMaxNew - tMinNew > uMax - uMin) {
        var parts = Curve.subdivide(v1, 0.5),
          t = tMinNew + (tMaxNew - tMinNew) / 2;
        addCurveIntersections(
          v2, parts[0], curve2, curve1, locations, include,
          uMin, uMax, tMinNew, t, tDiff, !reverse, ++recursion);
        addCurveIntersections(
          v2, parts[1], curve2, curve1, locations, include,
          uMin, uMax, t, tMaxNew, tDiff, !reverse, recursion);
      } else {
        var parts = Curve.subdivide(v2, 0.5),
          t = uMin + (uMax - uMin) / 2;
        addCurveIntersections(
          parts[0], v1, curve2, curve1, locations, include,
          uMin, t, tMinNew, tMaxNew, tDiff, !reverse, ++recursion);
        addCurveIntersections(
          parts[1], v1, curve2, curve1, locations, include,
          t, uMax, tMinNew, tMaxNew, tDiff, !reverse, recursion);
      }
    } else if (Math.max(uMax - uMin, tMaxNew - tMinNew) < tolerance) {
      var t1 = tMinNew + (tMaxNew - tMinNew) / 2,
        t2 = uMin + (uMax - uMin) / 2;
      if (reverse) {
        addLocation(locations, include,
            curve2, t2, Curve.evaluate(v2, t2, 0),
            curve1, t1, Curve.evaluate(v1, t1, 0));
      } else {
        addLocation(locations, include,
            curve1, t1, Curve.evaluate(v1, t1, 0),
            curve2, t2, Curve.evaluate(v2, t2, 0));
      }
    } else { 
      addCurveIntersections(v2, v1, curve2, curve1, locations, include,
          uMin, uMax, tMinNew, tMaxNew, tDiff, !reverse, ++recursion);
    }
  }

  function getConvexHull(dq0, dq1, dq2, dq3) {
    var p0 = [ 0, dq0 ],
      p1 = [ 1 / 3, dq1 ],
      p2 = [ 2 / 3, dq2 ],
      p3 = [ 1, dq3 ],
      getSignedDistance = Line.getSignedDistance,
      dist1 = getSignedDistance(0, dq0, 1, dq3, 1 / 3, dq1),
      dist2 = getSignedDistance(0, dq0, 1, dq3, 2 / 3, dq2),
      flip = false,
      hull;
    if (dist1 * dist2 < 0) {
      hull = [[p0, p1, p3], [p0, p2, p3]];
      flip = dist1 < 0;
    } else {
      var pmax, cross = 0,
        distZero = dist1 === 0 || dist2 === 0;
      if (Math.abs(dist1) > Math.abs(dist2)) {
        pmax = p1;
        cross = (dq3 - dq2 - (dq3 - dq0) / 3)
            * (2 * (dq3 - dq2) - dq3 + dq1) / 3;
      } else {
        pmax = p2;
        cross = (dq1 - dq0 + (dq0 - dq3) / 3)
            * (-2 * (dq0 - dq1) + dq0 - dq2) / 3;
      }
      hull = cross < 0 || distZero
          ? [[p0, pmax, p3], [p0, p3]]
          : [[p0, p1, p2, p3], [p0, p3]];
      flip = dist1 ? dist1 < 0 : dist2 < 0;
    }
    return flip ? hull.reverse() : hull;
  }

  function clipConvexHull(hullTop, hullBottom, dMin, dMax) {
    var tProxy,
      tVal = null,
      px, py,
      qx, qy;
    for (var i = 0, l = hullBottom.length - 1; i < l; i++) {
      py = hullBottom[i][1];
      qy = hullBottom[i + 1][1];
      if (py < qy) {
        tProxy = null;
      } else if (qy <= dMax) {
        px = hullBottom[i][0];
        qx = hullBottom[i + 1][0];
        tProxy = px + (dMax  - py) * (qx - px) / (qy - py);
      } else {
        continue;
      }
      break;
    }
    if (hullTop[0][1] <= dMax)
      tProxy = hullTop[0][0];
    for (var i = 0, l = hullTop.length - 1; i < l; i++) {
      py = hullTop[i][1];
      qy = hullTop[i + 1][1];
      if (py >= dMin) {
        tVal = tProxy;
      } else if (py > qy) {
        tVal = null;
      } else if (qy >= dMin) {
        px = hullTop[i][0];
        qx = hullTop[i + 1][0];
        tVal = px + (dMin  - py) * (qx - px) / (qy - py);
      } else {
        continue;
      }
      break;
    }
    return tVal;
  }

  function addCurveLineIntersections(v1, v2, curve1, curve2, locations,
      include) {
    var flip = Curve.isLinear(v1),
      vc = flip ? v2 : v1,
      vl = flip ? v1 : v2,
      lx1 = vl[0], ly1 = vl[1],
      lx2 = vl[6], ly2 = vl[7],
      ldx = lx2 - lx1,
      ldy = ly2 - ly1,
      angle = Math.atan2(-ldy, ldx),
      sin = Math.sin(angle),
      cos = Math.cos(angle),
      rlx2 = ldx * cos - ldy * sin,
      rvl = [0, 0, 0, 0, rlx2, 0, rlx2, 0],
      rvc = [];
    for(var i = 0; i < 8; i += 2) {
      var x = vc[i] - lx1,
        y = vc[i + 1] - ly1;
      rvc.push(
        x * cos - y * sin,
        y * cos + x * sin);
    }
    var roots = [],
      count = Curve.solveCubic(rvc, 1, 0, roots, 0, 1);
    for (var i = 0; i < count; i++) {
      var tc = roots[i],
        x = Curve.evaluate(rvc, tc, 0).x;
      if (x >= 0 && x <= rlx2) {
        var tl = Curve.getParameterOf(rvl, x, 0),
          t1 = flip ? tl : tc,
          t2 = flip ? tc : tl;
        addLocation(locations, include,
            curve1, t1, Curve.evaluate(v1, t1, 0),
            curve2, t2, Curve.evaluate(v2, t2, 0));
      }
    }
  }

  function addLineIntersection(v1, v2, curve1, curve2, locations, include) {
    var point = Line.intersect(
        v1[0], v1[1], v1[6], v1[7],
        v2[0], v2[1], v2[6], v2[7]);
    if (point) {
      var x = point.x,
        y = point.y;
      addLocation(locations, include,
          curve1, Curve.getParameterOf(v1, x, y), point,
          curve2, Curve.getParameterOf(v2, x, y), point);
    }
  }

  return { statics: {
    getIntersections: function(v1, v2, curve1, curve2, locations, include) {
      var linear1 = Curve.isLinear(v1),
        linear2 = Curve.isLinear(v2);
      (linear1 && linear2
        ? addLineIntersection
        : linear1 || linear2
          ? addCurveLineIntersections
          : addCurveIntersections)(
            v1, v2, curve1, curve2, locations, include,
            0, 1, 0, 1, 0, false, 0);
      return locations;
    }
  }};
});

var CurveLocation = Base.extend({
  _class: 'CurveLocation',
  beans: true,

  initialize: function CurveLocation(curve, parameter, point, _curve2,
      _parameter2, _point2, _distance) {
    this._id = CurveLocation._id = (CurveLocation._id || 0) + 1;
    this._curve = curve;
    this._segment1 = curve._segment1;
    this._segment2 = curve._segment2;
    this._parameter = parameter;
    this._point = point;
    this._curve2 = _curve2;
    this._parameter2 = _parameter2;
    this._point2 = _point2;
    this._distance = _distance;
  },

  getSegment: function(_preferFirst) {
    if (!this._segment) {
      var curve = this.getCurve(),
        parameter = this.getParameter();
      if (parameter === 1) {
        this._segment = curve._segment2;
      } else if (parameter === 0 || _preferFirst) {
        this._segment = curve._segment1;
      } else if (parameter == null) {
        return null;
      } else {
        this._segment = curve.getPartLength(0, parameter)
          < curve.getPartLength(parameter, 1)
            ? curve._segment1
            : curve._segment2;
      }
    }
    return this._segment;
  },

  getCurve: function(_uncached) {
    if (!this._curve || _uncached) {
      this._curve = this._segment1.getCurve();
      if (this._curve.getParameterOf(this._point) == null)
        this._curve = this._segment2.getPrevious().getCurve();
    }
    return this._curve;
  },

  getIntersection: function() {
    var intersection = this._intersection;
    if (!intersection && this._curve2) {
      var param = this._parameter2;
      this._intersection = intersection = new CurveLocation(
          this._curve2, param, this._point2 || this._point, this);
      intersection._intersection = this;
    }
    return intersection;
  },

  getPath: function() {
    var curve = this.getCurve();
    return curve && curve._path;
  },

  getIndex: function() {
    var curve = this.getCurve();
    return curve && curve.getIndex();
  },

  getOffset: function() {
    var path = this.getPath();
    return path && path._getOffset(this);
  },

  getCurveOffset: function() {
    var curve = this.getCurve(),
      parameter = this.getParameter();
    return parameter != null && curve && curve.getPartLength(0, parameter);
  },

  getParameter: function(_uncached) {
    if ((this._parameter == null || _uncached) && this._point) {
      var curve = this.getCurve(_uncached && this._point);
      this._parameter = curve && curve.getParameterOf(this._point);
    }
    return this._parameter;
  },

  getPoint: function(_uncached) {
    if ((!this._point || _uncached) && this._parameter != null) {
      var curve = this.getCurve();
      this._point = curve && curve.getPointAt(this._parameter, true);
    }
    return this._point;
  },

  getTangent: function() {
    var parameter = this.getParameter(),
      curve = this.getCurve();
    return parameter != null && curve && curve.getTangentAt(parameter, true);
  },

  getNormal: function() {
    var parameter = this.getParameter(),
      curve = this.getCurve();
    return parameter != null && curve && curve.getNormalAt(parameter, true);
  },

  getDistance: function() {
    return this._distance;
  },

  divide: function() {
    var curve = this.getCurve(true);
    return curve && curve.divide(this.getParameter(true), true);
  },

  split: function() {
    var curve = this.getCurve(true);
    return curve && curve.split(this.getParameter(true), true);
  },

  equals: function(loc) {
    var isZero = Numerical.isZero;
    return this === loc
        || loc
          && this._curve === loc._curve
          && this._curve2 === loc._curve2
          && isZero(this._parameter - loc._parameter)
          && isZero(this._parameter2 - loc._parameter2)
        || false;
  },

  toString: function() {
    var parts = [],
      point = this.getPoint(),
      f = Formatter.instance;
    if (point)
      parts.push('point: ' + point);
    var index = this.getIndex();
    if (index != null)
      parts.push('index: ' + index);
    var parameter = this.getParameter();
    if (parameter != null)
      parts.push('parameter: ' + f.number(parameter));
    if (this._distance != null)
      parts.push('distance: ' + f.number(this._distance));
    return '{ ' + parts.join(', ') + ' }';
  }
});

var PathItem = Item.extend({
  _class: 'PathItem',

  initialize: function PathItem() {
  },

  getIntersections: function(path, _expand) {
    if (this === path)
      path = null;
    if (path && !this.getBounds().touches(path.getBounds()))
      return [];
    var locations = [],
      curves1 = this.getCurves(),
      curves2 = path ? path.getCurves() : curves1,
      matrix1 = this._matrix.orNullIfIdentity(),
      matrix2 = path ? path._matrix.orNullIfIdentity() : matrix1,
      length1 = curves1.length,
      length2 = path ? curves2.length : length1,
      values2 = [],
      MIN = 1e-11,
      MAX = 1 - 1e-11;
    for (var i = 0; i < length2; i++)
      values2[i] = curves2[i].getValues(matrix2);
    for (var i = 0; i < length1; i++) {
      var curve1 = curves1[i],
        values1 = path ? curve1.getValues(matrix1) : values2[i];
      if (!path) {
        var seg1 = curve1.getSegment1(),
          seg2 = curve1.getSegment2(),
          h1 = seg1._handleOut,
          h2 = seg2._handleIn;
        if (new Line(seg1._point.subtract(h1), h1.multiply(2), true)
            .intersect(new Line(seg2._point.subtract(h2),
            h2.multiply(2), true), false)) {
          var parts = Curve.subdivide(values1);
          Curve.getIntersections(
            parts[0], parts[1], curve1, curve1, locations,
            function(loc) {
              if (loc._parameter <= MAX) {
                loc._parameter /= 2;
                loc._parameter2 = 0.5 + loc._parameter2 / 2;
                return true;
              }
            }
          );
        }
      }
      for (var j = path ? 0 : i + 1; j < length2; j++) {
        Curve.getIntersections(
          values1, values2[j], curve1, curves2[j], locations,
          !path && (j === i + 1 || j === length2 - 1 && i === 0)
            && function(loc) {
              var t = loc._parameter;
              return t >= MIN && t <= MAX;
            }
        );
      }
    }
    var last = locations.length - 1;
    for (var i = last; i >= 0; i--) {
      var loc = locations[i],
        next = loc._curve.getNext(),
        next2 = loc._curve2.getNext();
      if (next && loc._parameter >= MAX) {
        loc._parameter = 0;
        loc._curve = next;
      }
      if (next2 && loc._parameter2 >= MAX) {
        loc._parameter2 = 0;
        loc._curve2 = next2;
      }
    }

    function compare(loc1, loc2) {
      var path1 = loc1.getPath(),
        path2 = loc2.getPath();
      return path1 === path2
          ? (loc1.getIndex() + loc1.getParameter())
              - (loc2.getIndex() + loc2.getParameter())
          : path1._id - path2._id;
    }

    if (last > 0) {
      locations.sort(compare);
      for (var i = last; i >= 0; i--) {
        if (locations[i].equals(locations[i === 0 ? last : i - 1])) {
          locations.splice(i, 1);
          last--;
        }
      }
    }
    if (_expand) {
      for (var i = last; i >= 0; i--)
        locations.push(locations[i].getIntersection());
      locations.sort(compare);
    }
    return locations;
  },

  setPathData: function(data) {

    var parts = data.match(/[mlhvcsqtaz][^mlhvcsqtaz]*/ig),
      coords,
      relative = false,
      previous,
      control,
      current = new Point(),
      start = new Point();

    function getCoord(index, coord) {
      var val = +coords[index];
      if (relative)
        val += current[coord];
      return val;
    }

    function getPoint(index) {
      return new Point(
        getCoord(index, 'x'),
        getCoord(index + 1, 'y')
      );
    }

    this.clear();

    for (var i = 0, l = parts.length; i < l; i++) {
      var part = parts[i],
        command = part[0],
        lower = command.toLowerCase();
      coords = part.match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g);
      var length = coords && coords.length;
      relative = command === lower;
      if (previous === 'z' && !/[mz]/.test(lower))
        this.moveTo(current = start);
      switch (lower) {
      case 'm':
      case 'l':
        var move = lower === 'm';
        if (move && previous && previous !== 'z')
          this.closePath(true);
        for (var j = 0; j < length; j += 2)
          this[j === 0 && move ? 'moveTo' : 'lineTo'](
              current = getPoint(j));
        control = current;
        if (move)
          start = current;
        break;
      case 'h':
      case 'v':
        var coord = lower === 'h' ? 'x' : 'y';
        for (var j = 0; j < length; j++) {
          current[coord] = getCoord(j, coord);
          this.lineTo(current);
        }
        control = current;
        break;
      case 'c':
        for (var j = 0; j < length; j += 6) {
          this.cubicCurveTo(
              getPoint(j),
              control = getPoint(j + 2),
              current = getPoint(j + 4));
        }
        break;
      case 's':
        for (var j = 0; j < length; j += 4) {
          this.cubicCurveTo(
              /[cs]/.test(previous)
                  ? current.multiply(2).subtract(control)
                  : current,
              control = getPoint(j),
              current = getPoint(j + 2));
          previous = lower;
        }
        break;
      case 'q':
        for (var j = 0; j < length; j += 4) {
          this.quadraticCurveTo(
              control = getPoint(j),
              current = getPoint(j + 2));
        }
        break;
      case 't':
        for (var j = 0; j < length; j += 2) {
          this.quadraticCurveTo(
              control = (/[qt]/.test(previous)
                  ? current.multiply(2).subtract(control)
                  : current),
              current = getPoint(j));
          previous = lower;
        }
        break;
      case 'a':
        for (var j = 0; j < length; j += 7) {
          this.arcTo(current = getPoint(j + 5),
              new Size(+coords[0], +coords[1]),
              +coords[2], +coords[4], +coords[3]);
        }
        break;
      case 'z':
        this.closePath(true);
        break;
      }
      previous = lower;
    }
  },

  _canComposite: function() {
    return !(this.hasFill() && this.hasStroke());
  },

  _contains: function(point) {
    var winding = this._getWinding(point, false, true);
    return !!(this.getWindingRule() === 'evenodd' ? winding & 1 : winding);
  }

});

var Path = PathItem.extend({
  _class: 'Path',
  _serializeFields: {
    segments: [],
    closed: false
  },

  initialize: function Path(arg) {
    this._closed = false;
    this._segments = [];
    var segments = Array.isArray(arg)
      ? typeof arg[0] === 'object'
        ? arg
        : arguments
      : arg && (arg.size === undefined && (arg.x !== undefined
          || arg.point !== undefined))
        ? arguments
        : null;
    if (segments && segments.length > 0) {
      this.setSegments(segments);
    } else {
      this._curves = undefined; 
      this._selectedSegmentState = 0;
      if (!segments && typeof arg === 'string') {
        this.setPathData(arg);
        arg = null;
      }
    }
    this._initialize(!segments && arg);
  },

  _equals: function(item) {
    return Base.equals(this._segments, item._segments);
  },

  clone: function(insert) {
    var copy = new Path(Item.NO_INSERT);
    copy.setSegments(this._segments);
    copy._closed = this._closed;
    if (this._clockwise !== undefined)
      copy._clockwise = this._clockwise;
    return this._clone(copy, insert);
  },

  _changed: function _changed(flags) {
    _changed.base.call(this, flags);
    if (flags & 8) {
      var parent = this._parent;
      if (parent)
        parent._currentPath = undefined;
      this._length = this._clockwise = undefined;
      if (this._curves && !(flags & 16)) {
        for (var i = 0, l = this._curves.length; i < l; i++)
          this._curves[i]._changed();
      }
      this._monoCurves = undefined;
    } else if (flags & 32) {
      this._bounds = undefined;
    }
  },

  getStyle: function() {
    var parent = this._parent;
    return (parent instanceof CompoundPath ? parent : this)._style;
  },

  getSegments: function() {
    return this._segments;
  },

  setSegments: function(segments) {
    var fullySelected = this.isFullySelected();
    this._segments.length = 0;
    this._selectedSegmentState = 0;
    this._curves = undefined;
    if (segments && segments.length > 0)
      this._add(Segment.readAll(segments));
    if (fullySelected)
      this.setFullySelected(true);
  },

  getFirstSegment: function() {
    return this._segments[0];
  },

  getLastSegment: function() {
    return this._segments[this._segments.length - 1];
  },

  getCurves: function() {
    var curves = this._curves,
      segments = this._segments;
    if (!curves) {
      var length = this._countCurves();
      curves = this._curves = new Array(length);
      for (var i = 0; i < length; i++)
        curves[i] = new Curve(this, segments[i],
          segments[i + 1] || segments[0]);
    }
    return curves;
  },

  getFirstCurve: function() {
    return this.getCurves()[0];
  },

  getLastCurve: function() {
    var curves = this.getCurves();
    return curves[curves.length - 1];
  },

  isClosed: function() {
    return this._closed;
  },

  setClosed: function(closed) {
    if (this._closed != (closed = !!closed)) {
      this._closed = closed;
      if (this._curves) {
        var length = this._curves.length = this._countCurves();
        if (closed)
          this._curves[length - 1] = new Curve(this,
            this._segments[length - 1], this._segments[0]);
      }
      this._changed(25);
    }
  }
}, {
  beans: true,

  getPathData: function(_precision) {
    var segments = this._segments,
      f = Formatter.instance,
      parts = [];

    function addCurve(seg1, seg2, skipLine) {
      var point1 = seg1._point,
        point2 = seg2._point,
        handle1 = seg1._handleOut,
        handle2 = seg2._handleIn;
      if (handle1.isZero() && handle2.isZero()) {
        if (!skipLine) {
          parts.push('L' + f.point(point2, _precision));
        }
      } else {
        var end = point2.subtract(point1);
        parts.push('c' + f.point(handle1, _precision)
            + ' ' + f.point(end.add(handle2), _precision)
            + ' ' + f.point(end, _precision));
      }
    }

    if (segments.length === 0)
      return '';
    parts.push('M' + f.point(segments[0]._point));
    for (var i = 0, l = segments.length  - 1; i < l; i++)
      addCurve(segments[i], segments[i + 1], false);
    if (this._closed) {
      addCurve(segments[segments.length - 1], segments[0], true);
      parts.push('z');
    }
    return parts.join('');
  }
}, {

  isEmpty: function() {
    return this._segments.length === 0;
  },

  isPolygon: function() {
    for (var i = 0, l = this._segments.length; i < l; i++) {
      if (!this._segments[i].isLinear())
        return false;
    }
    return true;
  },

  _transformContent: function(matrix) {
    var coords = new Array(6);
    for (var i = 0, l = this._segments.length; i < l; i++)
      this._segments[i]._transformCoordinates(matrix, coords, true);
    return true;
  },

  _add: function(segs, index) {
    var segments = this._segments,
      curves = this._curves,
      amount = segs.length,
      append = index == null,
      index = append ? segments.length : index;
    for (var i = 0; i < amount; i++) {
      var segment = segs[i];
      if (segment._path)
        segment = segs[i] = segment.clone();
      segment._path = this;
      segment._index = index + i;
      if (segment._selectionState)
        this._updateSelection(segment, 0, segment._selectionState);
    }
    if (append) {
      segments.push.apply(segments, segs);
    } else {
      segments.splice.apply(segments, [index, 0].concat(segs));
      for (var i = index + amount, l = segments.length; i < l; i++)
        segments[i]._index = i;
    }
    if (curves || segs._curves) {
      if (!curves)
        curves = this._curves = [];
      var from = index > 0 ? index - 1 : index,
        start = from,
        to = Math.min(from + amount, this._countCurves());
      if (segs._curves) {
        curves.splice.apply(curves, [from, 0].concat(segs._curves));
        start += segs._curves.length;
      }
      for (var i = start; i < to; i++)
        curves.splice(i, 0, new Curve(this, null, null));
      this._adjustCurves(from, to);
    }
    this._changed(25);
    return segs;
  },

  _adjustCurves: function(from, to) {
    var segments = this._segments,
      curves = this._curves,
      curve;
    for (var i = from; i < to; i++) {
      curve = curves[i];
      curve._path = this;
      curve._segment1 = segments[i];
      curve._segment2 = segments[i + 1] || segments[0];
    }
    if (curve = curves[this._closed && from === 0 ? segments.length - 1
        : from - 1])
      curve._segment2 = segments[from] || segments[0];
    if (curve = curves[to])
      curve._segment1 = segments[to];
  },

  _countCurves: function() {
    var length = this._segments.length;
    return !this._closed && length > 0 ? length - 1 : length;
  },

  add: function(segment1 ) {
    return arguments.length > 1 && typeof segment1 !== 'number'
      ? this._add(Segment.readAll(arguments))
      : this._add([ Segment.read(arguments) ])[0];
  },

  insert: function(index, segment1 ) {
    return arguments.length > 2 && typeof segment1 !== 'number'
      ? this._add(Segment.readAll(arguments, 1), index)
      : this._add([ Segment.read(arguments, 1) ], index)[0];
  },

  addSegment: function() {
    return this._add([ Segment.read(arguments) ])[0];
  },

  insertSegment: function(index ) {
    return this._add([ Segment.read(arguments, 1) ], index)[0];
  },

  addSegments: function(segments) {
    return this._add(Segment.readAll(segments));
  },

  insertSegments: function(index, segments) {
    return this._add(Segment.readAll(segments), index);
  },

  removeSegment: function(index) {
    return this.removeSegments(index, index + 1)[0] || null;
  },

  removeSegments: function(from, to, _includeCurves) {
    from = from || 0;
    to = Base.pick(to, this._segments.length);
    var segments = this._segments,
      curves = this._curves,
      count = segments.length, 
      removed = segments.splice(from, to - from),
      amount = removed.length;
    if (!amount)
      return removed;
    for (var i = 0; i < amount; i++) {
      var segment = removed[i];
      if (segment._selectionState)
        this._updateSelection(segment, segment._selectionState, 0);
      segment._index = segment._path = null;
    }
    for (var i = from, l = segments.length; i < l; i++)
      segments[i]._index = i;
    if (curves) {
      var index = from > 0 && to === count + (this._closed ? 1 : 0)
          ? from - 1
          : from,
        curves = curves.splice(index, amount);
      if (_includeCurves)
        removed._curves = curves.slice(1);
      this._adjustCurves(index, index);
    }
    this._changed(25);
    return removed;
  },

  clear: '#removeSegments',

  isFullySelected: function() {
    var length = this._segments.length;
    return this._selected && length > 0 && this._selectedSegmentState
        === length * 7;
  },

  setFullySelected: function(selected) {
    if (selected)
      this._selectSegments(true);
    this.setSelected(selected);
  },

  setSelected: function setSelected(selected) {
    if (!selected)
      this._selectSegments(false);
    setSelected.base.call(this, selected);
  },

  _selectSegments: function(selected) {
    var length = this._segments.length;
    this._selectedSegmentState = selected
        ? length * 7 : 0;
    for (var i = 0; i < length; i++)
      this._segments[i]._selectionState = selected
          ? 7 : 0;
  },

  _updateSelection: function(segment, oldState, newState) {
    segment._selectionState = newState;
    var total = this._selectedSegmentState += newState - oldState;
    if (total > 0)
      this.setSelected(true);
  },

  flatten: function(maxDistance) {
    var flattener = new PathFlattener(this),
      pos = 0,
      step = flattener.length / Math.ceil(flattener.length / maxDistance),
      end = flattener.length + (this._closed ? -step : step) / 2;
    var segments = [];
    while (pos <= end) {
      segments.push(new Segment(flattener.evaluate(pos, 0)));
      pos += step;
    }
    this.setSegments(segments);
  },

  reduce: function() {
    var curves = this.getCurves();
    for (var i = curves.length - 1; i >= 0; i--) {
      var curve = curves[i];
      if (curve.isLinear() && curve.getLength() === 0)
        curve.remove();
    }
    return this;
  },

  simplify: function(tolerance) {
    if (this._segments.length > 2) {
      var fitter = new PathFitter(this, tolerance || 2.5);
      this.setSegments(fitter.fit());
    }
  },

  split: function(index, parameter) {
    if (parameter === null)
      return;
    if (arguments.length === 1) {
      var arg = index;
      if (typeof arg === 'number')
        arg = this.getLocationAt(arg);
      index = arg.index;
      parameter = arg.parameter;
    }
    var tolerance = 0.00001;
    if (parameter >= 1 - tolerance) {
      index++;
      parameter--;
    }
    var curves = this.getCurves();
    if (index >= 0 && index < curves.length) {
      if (parameter > tolerance) {
        curves[index++].divide(parameter, true);
      }
      var segs = this.removeSegments(index, this._segments.length, true),
        path;
      if (this._closed) {
        this.setClosed(false);
        path = this;
      } else if (index > 0) {
        path = this._clone(new Path().insertAbove(this, true));
      }
      path._add(segs, 0);
      this.addSegment(segs[0]);
      return path;
    }
    return null;
  },

  isClockwise: function() {
    if (this._clockwise !== undefined)
      return this._clockwise;
    return Path.isClockwise(this._segments);
  },

  setClockwise: function(clockwise) {
    if (this.isClockwise() != (clockwise = !!clockwise))
      this.reverse();
    this._clockwise = clockwise;
  },

  reverse: function() {
    this._segments.reverse();
    for (var i = 0, l = this._segments.length; i < l; i++) {
      var segment = this._segments[i];
      var handleIn = segment._handleIn;
      segment._handleIn = segment._handleOut;
      segment._handleOut = handleIn;
      segment._index = i;
    }
    this._curves = null;
    if (this._clockwise !== undefined)
      this._clockwise = !this._clockwise;
  },

  join: function(path) {
    if (path) {
      var segments = path._segments,
        last1 = this.getLastSegment(),
        last2 = path.getLastSegment();
      if (last1._point.equals(last2._point))
        path.reverse();
      var first1,
        first2 = path.getFirstSegment();
      if (last1._point.equals(first2._point)) {
        last1.setHandleOut(first2._handleOut);
        this._add(segments.slice(1));
      } else {
        first1 = this.getFirstSegment();
        if (first1._point.equals(first2._point))
          path.reverse();
        last2 = path.getLastSegment();
        if (first1._point.equals(last2._point)) {
          first1.setHandleIn(last2._handleIn);
          this._add(segments.slice(0, segments.length - 1), 0);
        } else {
          this._add(segments.slice());
        }
      }
      if (path.closed)
        this._add([segments[0]]);
      path.remove();
    }
    var first = this.getFirstSegment(),
      last = this.getLastSegment();
    if (first !== last && first._point.equals(last._point)) {
      first.setHandleIn(last._handleIn);
      last.remove();
      this.setClosed(true);
    }
  },

  getLength: function() {
    if (this._length == null) {
      var curves = this.getCurves();
      this._length = 0;
      for (var i = 0, l = curves.length; i < l; i++)
        this._length += curves[i].getLength();
    }
    return this._length;
  },

  getArea: function() {
    var curves = this.getCurves();
    var area = 0;
    for (var i = 0, l = curves.length; i < l; i++)
      area += curves[i].getArea();
    return area;
  },

  _getOffset: function(location) {
    var index = location && location.getIndex();
    if (index != null) {
      var curves = this.getCurves(),
        offset = 0;
      for (var i = 0; i < index; i++)
        offset += curves[i].getLength();
      var curve = curves[index],
        parameter = location.getParameter();
      if (parameter > 0)
        offset += curve.getPartLength(0, parameter);
      return offset;
    }
    return null;
  },

  getLocationOf: function(point) { 
    var point = Point.read(arguments),
      curves = this.getCurves();
    for (var i = 0, l = curves.length; i < l; i++) {
      var loc = curves[i].getLocationOf(point);
      if (loc)
        return loc;
    }
    return null;
  },

  getLocationAt: function(offset, isParameter) {
    var curves = this.getCurves(),
      length = 0;
    if (isParameter) {
      var index = ~~offset; 
      return curves[index].getLocationAt(offset - index, true);
    }
    for (var i = 0, l = curves.length; i < l; i++) {
      var start = length,
        curve = curves[i];
      length += curve.getLength();
      if (length > offset) {
        return curve.getLocationAt(offset - start);
      }
    }
    if (offset <= this.getLength())
      return new CurveLocation(curves[curves.length - 1], 1);
    return null;
  },

  getPointAt: function(offset, isParameter) {
    var loc = this.getLocationAt(offset, isParameter);
    return loc && loc.getPoint();
  },

  getTangentAt: function(offset, isParameter) {
    var loc = this.getLocationAt(offset, isParameter);
    return loc && loc.getTangent();
  },

  getNormalAt: function(offset, isParameter) {
    var loc = this.getLocationAt(offset, isParameter);
    return loc && loc.getNormal();
  },

  getNearestLocation: function(point) { 
    var point = Point.read(arguments),
      curves = this.getCurves(),
      minDist = Infinity,
      minLoc = null;
    for (var i = 0, l = curves.length; i < l; i++) {
      var loc = curves[i].getNearestLocation(point);
      if (loc._distance < minDist) {
        minDist = loc._distance;
        minLoc = loc;
      }
    }
    return minLoc;
  },

  getNearestPoint: function(point) { 
    var point = Point.read(arguments);
    return this.getNearestLocation(point).getPoint();
  },

  toShape: function(insert) {
    if (!this._closed)
      return null;

    var segments = this._segments,
      type,
      size,
      radius,
      topCenter;

    function isColinear(i, j) {
      return segments[i].isColinear(segments[j]);
    }

    function isOrthogonal(i) {
      return segments[i].isOrthogonal();
    }

    function isArc(i) {
      return segments[i].isArc();
    }

    function getDistance(i, j) {
      return segments[i]._point.getDistance(segments[j]._point);
    }

    if (this.isPolygon() && segments.length === 4
        && isColinear(0, 2) && isColinear(1, 3) && isOrthogonal(1)) {
      type = Shape.Rectangle;
      size = new Size(getDistance(0, 3), getDistance(0, 1));
      topCenter = segments[1]._point.add(segments[2]._point).divide(2);
    } else if (segments.length === 8 && isArc(0) && isArc(2) && isArc(4)
        && isArc(6) && isColinear(1, 5) && isColinear(3, 7)) {
      type = Shape.Rectangle;
      size = new Size(getDistance(1, 6), getDistance(0, 3));
      radius = size.subtract(new Size(getDistance(0, 7),
          getDistance(1, 2))).divide(2);
      topCenter = segments[3]._point.add(segments[4]._point).divide(2);
    } else if (segments.length === 4
        && isArc(0) && isArc(1) && isArc(2) && isArc(3)) {
      if (Numerical.isZero(getDistance(0, 2) - getDistance(1, 3))) {
        type = Shape.Circle;
        radius = getDistance(0, 2) / 2;
      } else {
        type = Shape.Ellipse;
        radius = new Size(getDistance(2, 0) / 2, getDistance(3, 1) / 2);
      }
      topCenter = segments[1]._point;
    }

    if (type) {
      var center = this.getPosition(true),
        shape = new type({
          center: center,
          size: size,
          radius: radius,
          insert: false
        });
      shape.rotate(topCenter.subtract(center).getAngle() + 90);
      shape.setStyle(this._style);
      if (insert || insert === undefined)
        shape.insertAbove(this);
      return shape;
    }
    return null;
  },

  _hitTest: function(point, options) {
    var that = this,
      style = this.getStyle(),
      segments = this._segments,
      numSegments = segments.length,
      closed = this._closed,
      tolerancePadding = options._tolerancePadding,
      strokePadding = tolerancePadding,
      join, cap, miterLimit,
      area, loc, res,
      hasStroke = options.stroke && style.hasStroke(),
      hasFill = options.fill && style.hasFill(),
      radius = hasStroke ? style.getStrokeWidth() / 2
          : hasFill ? 0 : null;
    if (radius != null) {
      if (radius > 0) {
        join = style.getStrokeJoin();
        cap = style.getStrokeCap();
        miterLimit = radius * style.getMiterLimit();
        strokePadding = tolerancePadding.add(new Point(radius, radius));
      } else {
        join = cap = 'round';
      }
    }

    function isCloseEnough(pt, padding) {
      return point.subtract(pt).divide(padding).length <= 1;
    }

    function checkSegmentPoint(seg, pt, name) {
      if (!options.selected || pt.isSelected()) {
        var anchor = seg._point;
        if (pt !== anchor)
          pt = pt.add(anchor);
        if (isCloseEnough(pt, strokePadding)) {
          return new HitResult(name, that, {
            segment: seg,
            point: pt
          });
        }
      }
    }

    function checkSegmentPoints(seg, ends) {
      return (ends || options.segments)
        && checkSegmentPoint(seg, seg._point, 'segment')
        || (!ends && options.handles) && (
          checkSegmentPoint(seg, seg._handleIn, 'handle-in') ||
          checkSegmentPoint(seg, seg._handleOut, 'handle-out'));
    }

    function addToArea(point) {
      area.add(point);
    }

    function checkSegmentStroke(segment) {
      if (join !== 'round' || cap !== 'round') {
        area = new Path({ internal: true, closed: true });
        if (closed || segment._index > 0
            && segment._index < numSegments - 1) {
          if (join !== 'round' && (segment._handleIn.isZero()
              || segment._handleOut.isZero()))
            Path._addBevelJoin(segment, join, radius, miterLimit,
                addToArea, true);
        } else if (cap !== 'round') {
          Path._addSquareCap(segment, cap, radius, addToArea, true);
        }
        if (!area.isEmpty()) {
          var loc;
          return area.contains(point)
            || (loc = area.getNearestLocation(point))
              && isCloseEnough(loc.getPoint(), tolerancePadding);
        }
      }
      return isCloseEnough(segment._point, strokePadding);
    }

    if (options.ends && !options.segments && !closed) {
      if (res = checkSegmentPoints(segments[0], true)
          || checkSegmentPoints(segments[numSegments - 1], true))
        return res;
    } else if (options.segments || options.handles) {
      for (var i = 0; i < numSegments; i++)
        if (res = checkSegmentPoints(segments[i]))
          return res;
    }
    if (radius != null) {
      loc = this.getNearestLocation(point);
      if (loc) {
        var parameter = loc.getParameter();
        if (parameter === 0 || parameter === 1 && numSegments > 1) {
          if (!checkSegmentStroke(loc.getSegment()))
            loc = null;
        } else  if (!isCloseEnough(loc.getPoint(), strokePadding)) {
          loc = null;
        }
      }
      if (!loc && join === 'miter' && numSegments > 1) {
        for (var i = 0; i < numSegments; i++) {
          var segment = segments[i];
          if (point.getDistance(segment._point) <= miterLimit
              && checkSegmentStroke(segment)) {
            loc = segment.getLocation();
            break;
          }
        }
      }
    }
    return !loc && hasFill && this._contains(point) || loc && !hasStroke
        ? new HitResult('fill', this)
        : loc
          ? new HitResult('stroke', this, {
            location: loc,
            point: loc.getPoint()
          })
          : null;
  }

}, new function() { 

  function drawHandles(ctx, segments, matrix, size) {
    var half = size / 2;

    function drawHandle(index) {
      var hX = coords[index],
        hY = coords[index + 1];
      if (pX != hX || pY != hY) {
        ctx.beginPath();
        ctx.moveTo(pX, pY);
        ctx.lineTo(hX, hY);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(hX, hY, half, 0, Math.PI * 2, true);
        ctx.fill();
      }
    }

    var coords = new Array(6);
    for (var i = 0, l = segments.length; i < l; i++) {
      var segment = segments[i];
      segment._transformCoordinates(matrix, coords, false);
      var state = segment._selectionState,
        pX = coords[0],
        pY = coords[1];
      if (state & 1)
        drawHandle(2);
      if (state & 2)
        drawHandle(4);
      ctx.fillRect(pX - half, pY - half, size, size);
      if (!(state & 4)) {
        var fillStyle = ctx.fillStyle;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(pX - half + 1, pY - half + 1, size - 2, size - 2);
        ctx.fillStyle = fillStyle;
      }
    }
  }

  function drawSegments(ctx, path, matrix) {
    var segments = path._segments,
      length = segments.length,
      coords = new Array(6),
      first = true,
      curX, curY,
      prevX, prevY,
      inX, inY,
      outX, outY;

    function drawSegment(i) {
      var segment = segments[i];
      if (matrix) {
        segment._transformCoordinates(matrix, coords, false);
        curX = coords[0];
        curY = coords[1];
      } else {
        var point = segment._point;
        curX = point._x;
        curY = point._y;
      }
      if (first) {
        ctx.moveTo(curX, curY);
        first = false;
      } else {
        if (matrix) {
          inX = coords[2];
          inY = coords[3];
        } else {
          var handle = segment._handleIn;
          inX = curX + handle._x;
          inY = curY + handle._y;
        }
        if (inX == curX && inY == curY && outX == prevX && outY == prevY) {
          ctx.lineTo(curX, curY);
        } else {
          ctx.bezierCurveTo(outX, outY, inX, inY, curX, curY);
        }
      }
      prevX = curX;
      prevY = curY;
      if (matrix) {
        outX = coords[4];
        outY = coords[5];
      } else {
        var handle = segment._handleOut;
        outX = prevX + handle._x;
        outY = prevY + handle._y;
      }
    }

    for (var i = 0; i < length; i++)
      drawSegment(i);
    if (path._closed && length > 0)
      drawSegment(0);
  }

  return {
    _draw: function(ctx, param) {
      var dontStart = param.dontStart,
        dontPaint = param.dontFinish || param.clip;
      if (!dontStart)
        ctx.beginPath();

      var style = this.getStyle(),
        hasFill = style.hasFill(),
        hasStroke = style.hasStroke(),
        dashArray = style.getDashArray(),
        dashLength = !paper.support.nativeDash && hasStroke
            && dashArray && dashArray.length;

      function getOffset(i) {
        return dashArray[((i % dashLength) + dashLength) % dashLength];
      }

      if (!dontStart && this._currentPath) {
        ctx.currentPath = this._currentPath;
      } else if (hasFill || hasStroke && !dashLength || dontPaint) {
        drawSegments(ctx, this);
        if (this._closed)
          ctx.closePath();
        if (!dontStart)
          this._currentPath = ctx.currentPath;
      }

      if (!dontPaint && (hasFill || hasStroke)) {
        this._setStyles(ctx);
        if (hasFill) {
          ctx.fill(style.getWindingRule());
          ctx.shadowColor = 'rgba(0,0,0,0)';
        }
        if (hasStroke) {
          if (dashLength) {
            if (!dontStart)
              ctx.beginPath();
            var flattener = new PathFlattener(this),
              length = flattener.length,
              from = -style.getDashOffset(), to,
              i = 0;
            from = from % length;
            while (from > 0) {
              from -= getOffset(i--) + getOffset(i--);
            }
            while (from < length) {
              to = from + getOffset(i++);
              if (from > 0 || to > 0)
                flattener.drawPart(ctx,
                    Math.max(from, 0), Math.max(to, 0));
              from = to + getOffset(i++);
            }
          }
          ctx.stroke();
        }
      }
    },

    _drawSelected: function(ctx, matrix) {
      ctx.beginPath();
      drawSegments(ctx, this, matrix);
      ctx.stroke();
      drawHandles(ctx, this._segments, matrix, paper.settings.handleSize);
    }
  };
}, new function() { 

  function getFirstControlPoints(rhs) {
    var n = rhs.length,
      x = [], 
      tmp = [], 
      b = 2;
    x[0] = rhs[0] / b;
    for (var i = 1; i < n; i++) {
      tmp[i] = 1 / b;
      b = (i < n - 1 ? 4 : 2) - tmp[i];
      x[i] = (rhs[i] - x[i - 1]) / b;
    }
    for (var i = 1; i < n; i++) {
      x[n - i - 1] -= tmp[n - i] * x[n - i];
    }
    return x;
  }

  return {
    smooth: function() {
      var segments = this._segments,
        size = segments.length,
        closed = this._closed,
        n = size,
        overlap = 0;
      if (size <= 2)
        return;
      if (closed) {
        overlap = Math.min(size, 4);
        n += Math.min(size, overlap) * 2;
      }
      var knots = [];
      for (var i = 0; i < size; i++)
        knots[i + overlap] = segments[i]._point;
      if (closed) {
        for (var i = 0; i < overlap; i++) {
          knots[i] = segments[i + size - overlap]._point;
          knots[i + size + overlap] = segments[i]._point;
        }
      } else {
        n--;
      }
      var rhs = [];

      for (var i = 1; i < n - 1; i++)
        rhs[i] = 4 * knots[i]._x + 2 * knots[i + 1]._x;
      rhs[0] = knots[0]._x + 2 * knots[1]._x;
      rhs[n - 1] = 3 * knots[n - 1]._x;
      var x = getFirstControlPoints(rhs);

      for (var i = 1; i < n - 1; i++)
        rhs[i] = 4 * knots[i]._y + 2 * knots[i + 1]._y;
      rhs[0] = knots[0]._y + 2 * knots[1]._y;
      rhs[n - 1] = 3 * knots[n - 1]._y;
      var y = getFirstControlPoints(rhs);

      if (closed) {
        for (var i = 0, j = size; i < overlap; i++, j++) {
          var f1 = i / overlap,
            f2 = 1 - f1,
            ie = i + overlap,
            je = j + overlap;
          x[j] = x[i] * f1 + x[j] * f2;
          y[j] = y[i] * f1 + y[j] * f2;
          x[je] = x[ie] * f2 + x[je] * f1;
          y[je] = y[ie] * f2 + y[je] * f1;
        }
        n--;
      }
      var handleIn = null;
      for (var i = overlap; i <= n - overlap; i++) {
        var segment = segments[i - overlap];
        if (handleIn)
          segment.setHandleIn(handleIn.subtract(segment._point));
        if (i < n) {
          segment.setHandleOut(
              new Point(x[i], y[i]).subtract(segment._point));
          handleIn = i < n - 1
              ? new Point(
                2 * knots[i + 1]._x - x[i + 1],
                2 * knots[i + 1]._y - y[i + 1])
              : new Point(
                (knots[n]._x + x[n - 1]) / 2,
                (knots[n]._y + y[n - 1]) / 2);
        }
      }
      if (closed && handleIn) {
        var segment = this._segments[0];
        segment.setHandleIn(handleIn.subtract(segment._point));
      }
    }
  };
}, new function() { 
  function getCurrentSegment(that) {
    var segments = that._segments;
    if (segments.length === 0)
      throw new Error('Use a moveTo() command first');
    return segments[segments.length - 1];
  }

  return {
    moveTo: function() {
      var segments = this._segments;
      if (segments.length === 1)
        this.removeSegment(0);
      if (!segments.length)
        this._add([ new Segment(Point.read(arguments)) ]);
    },

    moveBy: function() {
      throw new Error('moveBy() is unsupported on Path items.');
    },

    lineTo: function() {
      this._add([ new Segment(Point.read(arguments)) ]);
    },

    cubicCurveTo: function() {
      var handle1 = Point.read(arguments),
        handle2 = Point.read(arguments),
        to = Point.read(arguments),
        current = getCurrentSegment(this);
      current.setHandleOut(handle1.subtract(current._point));
      this._add([ new Segment(to, handle2.subtract(to)) ]);
    },

    quadraticCurveTo: function() {
      var handle = Point.read(arguments),
        to = Point.read(arguments),
        current = getCurrentSegment(this)._point;
      this.cubicCurveTo(
        handle.add(current.subtract(handle).multiply(1 / 3)),
        handle.add(to.subtract(handle).multiply(1 / 3)),
        to
      );
    },

    curveTo: function() {
      var through = Point.read(arguments),
        to = Point.read(arguments),
        t = Base.pick(Base.read(arguments), 0.5),
        t1 = 1 - t,
        current = getCurrentSegment(this)._point,
        handle = through.subtract(current.multiply(t1 * t1))
          .subtract(to.multiply(t * t)).divide(2 * t * t1);
      if (handle.isNaN())
        throw new Error(
          'Cannot put a curve through points with parameter = ' + t);
      this.quadraticCurveTo(handle, to);
    },

    arcTo: function() {
      var current = getCurrentSegment(this),
        from = current._point,
        to = Point.read(arguments),
        through,
        peek = Base.peek(arguments),
        clockwise = Base.pick(peek, true),
        center, extent, vector, matrix;
      if (typeof clockwise === 'boolean') {
        var middle = from.add(to).divide(2),
        through = middle.add(middle.subtract(from).rotate(
            clockwise ? -90 : 90));
      } else if (Base.remain(arguments) <= 2) {
        through = to;
        to = Point.read(arguments);
      } else {
        var radius = Size.read(arguments);
        if (radius.isZero())
          return this.lineTo(to);
        var rotation = Base.read(arguments),
          clockwise = !!Base.read(arguments),
          large = !!Base.read(arguments),
          middle = from.add(to).divide(2),
          pt = from.subtract(middle).rotate(-rotation),
          x = pt.x,
          y = pt.y,
          abs = Math.abs,
          EPSILON = 1e-11,
          rx = abs(radius.width),
          ry = abs(radius.height),
          rxSq = rx * rx,
          rySq = ry * ry,
          xSq =  x * x,
          ySq =  y * y;
        var factor = Math.sqrt(xSq / rxSq + ySq / rySq);
        if (factor > 1) {
          rx *= factor;
          ry *= factor;
          rxSq = rx * rx;
          rySq = ry * ry;
        }
        factor = (rxSq * rySq - rxSq * ySq - rySq * xSq) /
            (rxSq * ySq + rySq * xSq);
        if (abs(factor) < EPSILON)
          factor = 0;
        if (factor < 0)
          throw new Error(
              'Cannot create an arc with the given arguments');
        center = new Point(rx * y / ry, -ry * x / rx)
            .multiply((large === clockwise ? -1 : 1)
              * Math.sqrt(factor))
            .rotate(rotation).add(middle);
        matrix = new Matrix().translate(center).rotate(rotation)
            .scale(rx, ry);
        vector = matrix._inverseTransform(from);
        extent = vector.getDirectedAngle(matrix._inverseTransform(to));
        if (!clockwise && extent > 0)
          extent -= 360;
        else if (clockwise && extent < 0)
          extent += 360;
      }
      if (through) {
        var l1 = new Line(from.add(through).divide(2),
              through.subtract(from).rotate(90), true),
          l2 = new Line(through.add(to).divide(2),
              to.subtract(through).rotate(90), true),
          line = new Line(from, to),
          throughSide = line.getSide(through);
        center = l1.intersect(l2, true);
        if (!center) {
          if (!throughSide)
            return this.lineTo(to);
          throw new Error(
              'Cannot create an arc with the given arguments');
        }
        vector = from.subtract(center);
        extent = vector.getDirectedAngle(to.subtract(center));
        var centerSide = line.getSide(center);
        if (centerSide === 0) {
          extent = throughSide * Math.abs(extent);
        } else if (throughSide === centerSide) {
          extent += extent < 0 ? 360 : -360;
        }
      }
      var ext = Math.abs(extent),
        count =  ext >= 360 ? 4 : Math.ceil(ext / 90),
        inc = extent / count,
        half = inc * Math.PI / 360,
        z = 4 / 3 * Math.sin(half) / (1 + Math.cos(half)),
        segments = [];
      for (var i = 0; i <= count; i++) {
        var pt = to,
          out = null;
        if (i < count) {
          out = vector.rotate(90).multiply(z);
          if (matrix) {
            pt = matrix._transformPoint(vector);
            out = matrix._transformPoint(vector.add(out))
                .subtract(pt);
          } else {
            pt = center.add(vector);
          }
        }
        if (i === 0) {
          current.setHandleOut(out);
        } else {
          var _in = vector.rotate(-90).multiply(z);
          if (matrix) {
            _in = matrix._transformPoint(vector.add(_in))
                .subtract(pt);
          }
          segments.push(new Segment(pt, _in, out));
        }
        vector = vector.rotate(inc);
      }
      this._add(segments);
    },

    lineBy: function() {
      var to = Point.read(arguments),
        current = getCurrentSegment(this)._point;
      this.lineTo(current.add(to));
    },

    curveBy: function() {
      var through = Point.read(arguments),
        to = Point.read(arguments),
        parameter = Base.read(arguments),
        current = getCurrentSegment(this)._point;
      this.curveTo(current.add(through), current.add(to), parameter);
    },

    cubicCurveBy: function() {
      var handle1 = Point.read(arguments),
        handle2 = Point.read(arguments),
        to = Point.read(arguments),
        current = getCurrentSegment(this)._point;
      this.cubicCurveTo(current.add(handle1), current.add(handle2),
          current.add(to));
    },

    quadraticCurveBy: function() {
      var handle = Point.read(arguments),
        to = Point.read(arguments),
        current = getCurrentSegment(this)._point;
      this.quadraticCurveTo(current.add(handle), current.add(to));
    },

    arcBy: function() {
      var current = getCurrentSegment(this)._point,
        point = current.add(Point.read(arguments)),
        clockwise = Base.pick(Base.peek(arguments), true);
      if (typeof clockwise === 'boolean') {
        this.arcTo(point, clockwise);
      } else {
        this.arcTo(point, current.add(Point.read(arguments)));
      }
    },

    closePath: function(join) {
      this.setClosed(true);
      if (join)
        this.join();
    }
  };
}, {  

  _getBounds: function(getter, matrix) {
    return Path[getter](this._segments, this._closed, this.getStyle(),
        matrix);
  },

statics: {
  isClockwise: function(segments) {
    var sum = 0;
    for (var i = 0, l = segments.length; i < l; i++) {
      var v = Curve.getValues(
          segments[i], segments[i + 1 < l ? i + 1 : 0]);
      for (var j = 2; j < 8; j += 2)
        sum += (v[j - 2] - v[j]) * (v[j + 1] + v[j - 1]);
    }
    return sum > 0;
  },

  getBounds: function(segments, closed, style, matrix, strokePadding) {
    var first = segments[0];
    if (!first)
      return new Rectangle();
    var coords = new Array(6),
      prevCoords = first._transformCoordinates(matrix, new Array(6), false),
      min = prevCoords.slice(0, 2), 
      max = min.slice(), 
      roots = new Array(2);

    function processSegment(segment) {
      segment._transformCoordinates(matrix, coords, false);
      for (var i = 0; i < 2; i++) {
        Curve._addBounds(
          prevCoords[i], 
          prevCoords[i + 4], 
          coords[i + 2], 
          coords[i], 
          i, strokePadding ? strokePadding[i] : 0, min, max, roots);
      }
      var tmp = prevCoords;
      prevCoords = coords;
      coords = tmp;
    }

    for (var i = 1, l = segments.length; i < l; i++)
      processSegment(segments[i]);
    if (closed)
      processSegment(first);
    return new Rectangle(min[0], min[1], max[0] - min[0], max[1] - min[1]);
  },

  getStrokeBounds: function(segments, closed, style, matrix) {
    if (!style.hasStroke())
      return Path.getBounds(segments, closed, style, matrix);
    var length = segments.length - (closed ? 0 : 1),
      radius = style.getStrokeWidth() / 2,
      padding = Path._getPenPadding(radius, matrix),
      bounds = Path.getBounds(segments, closed, style, matrix, padding),
      join = style.getStrokeJoin(),
      cap = style.getStrokeCap(),
      miterLimit = radius * style.getMiterLimit();
    var joinBounds = new Rectangle(new Size(padding).multiply(2));

    function add(point) {
      bounds = bounds.include(matrix
        ? matrix._transformPoint(point, point) : point);
    }

    function addRound(segment) {
      bounds = bounds.unite(joinBounds.setCenter(matrix
        ? matrix._transformPoint(segment._point) : segment._point));
    }

    function addJoin(segment, join) {
      var handleIn = segment._handleIn,
        handleOut = segment._handleOut
      if (join === 'round' || !handleIn.isZero() && !handleOut.isZero()
          && handleIn.isColinear(handleOut)) {
        addRound(segment);
      } else {
        Path._addBevelJoin(segment, join, radius, miterLimit, add);
      }
    }

    function addCap(segment, cap) {
      if (cap === 'round') {
        addRound(segment);
      } else {
        Path._addSquareCap(segment, cap, radius, add);
      }
    }

    for (var i = 1; i < length; i++)
      addJoin(segments[i], join);
    if (closed) {
      addJoin(segments[0], join);
    } else if (length > 0) {
      addCap(segments[0], cap);
      addCap(segments[segments.length - 1], cap);
    }
    return bounds;
  },

  _getPenPadding: function(radius, matrix) {
    if (!matrix)
      return [radius, radius];
    var mx = matrix.shiftless(),
      hor = mx.transform(new Point(radius, 0)),
      ver = mx.transform(new Point(0, radius)),
      phi = hor.getAngleInRadians(),
      a = hor.getLength(),
      b = ver.getLength();
    var sin = Math.sin(phi),
      cos = Math.cos(phi),
      tan = Math.tan(phi),
      tx = -Math.atan(b * tan / a),
      ty = Math.atan(b / (tan * a));
    return [Math.abs(a * Math.cos(tx) * cos - b * Math.sin(tx) * sin),
        Math.abs(b * Math.sin(ty) * cos + a * Math.cos(ty) * sin)];
  },

  _addBevelJoin: function(segment, join, radius, miterLimit, addPoint, area) {
    var curve2 = segment.getCurve(),
      curve1 = curve2.getPrevious(),
      point = curve2.getPointAt(0, true),
      normal1 = curve1.getNormalAt(1, true),
      normal2 = curve2.getNormalAt(0, true),
      step = normal1.getDirectedAngle(normal2) < 0 ? -radius : radius;
    normal1.setLength(step);
    normal2.setLength(step);
    if (area) {
      addPoint(point);
      addPoint(point.add(normal1));
    }
    if (join === 'miter') {
      var corner = new Line(
          point.add(normal1),
          new Point(-normal1.y, normal1.x), true
        ).intersect(new Line(
          point.add(normal2),
          new Point(-normal2.y, normal2.x), true
        ), true);
      if (corner && point.getDistance(corner) <= miterLimit) {
        addPoint(corner);
        if (!area)
          return;
      }
    }
    if (!area)
      addPoint(point.add(normal1));
    addPoint(point.add(normal2));
  },

  _addSquareCap: function(segment, cap, radius, addPoint, area) {
    var point = segment._point,
      loc = segment.getLocation(),
      normal = loc.getNormal().normalize(radius);
    if (area) {
      addPoint(point.subtract(normal));
      addPoint(point.add(normal));
    }
    if (cap === 'square')
      point = point.add(normal.rotate(loc.getParameter() == 0 ? -90 : 90));
    addPoint(point.add(normal));
    addPoint(point.subtract(normal));
  },

  getHandleBounds: function(segments, closed, style, matrix, strokePadding,
      joinPadding) {
    var coords = new Array(6),
      x1 = Infinity,
      x2 = -x1,
      y1 = x1,
      y2 = x2;
    for (var i = 0, l = segments.length; i < l; i++) {
      var segment = segments[i];
      segment._transformCoordinates(matrix, coords, false);
      for (var j = 0; j < 6; j += 2) {
        var padding = j == 0 ? joinPadding : strokePadding,
          paddingX = padding ? padding[0] : 0,
          paddingY = padding ? padding[1] : 0,
          x = coords[j],
          y = coords[j + 1],
          xn = x - paddingX,
          xx = x + paddingX,
          yn = y - paddingY,
          yx = y + paddingY;
        if (xn < x1) x1 = xn;
        if (xx > x2) x2 = xx;
        if (yn < y1) y1 = yn;
        if (yx > y2) y2 = yx;
      }
    }
    return new Rectangle(x1, y1, x2 - x1, y2 - y1);
  },

  getRoughBounds: function(segments, closed, style, matrix) {
    var strokeRadius = style.hasStroke() ? style.getStrokeWidth() / 2 : 0,
      joinRadius = strokeRadius;
    if (strokeRadius > 0) {
      if (style.getStrokeJoin() === 'miter')
        joinRadius = strokeRadius * style.getMiterLimit();
      if (style.getStrokeCap() === 'square')
        joinRadius = Math.max(joinRadius, strokeRadius * Math.sqrt(2));
    }
    return Path.getHandleBounds(segments, closed, style, matrix,
        Path._getPenPadding(strokeRadius, matrix),
        Path._getPenPadding(joinRadius, matrix));
  }
}});

Path.inject({ statics: new function() {

  var kappa = 0.5522847498307936,
    ellipseSegments = [
      new Segment([-1, 0], [0, kappa ], [0, -kappa]),
      new Segment([0, -1], [-kappa, 0], [kappa, 0 ]),
      new Segment([1, 0], [0, -kappa], [0, kappa ]),
      new Segment([0, 1], [kappa, 0 ], [-kappa, 0])
    ];

  function createPath(segments, closed, args) {
    var props = Base.getNamed(args),
      path = new Path(props && props.insert === false && Item.NO_INSERT);
    path._add(segments);
    path._closed = closed;
    return path.set(props);
  }

  function createEllipse(center, radius, args) {
    var segments = new Array(4);
    for (var i = 0; i < 4; i++) {
      var segment = ellipseSegments[i];
      segments[i] = new Segment(
        segment._point.multiply(radius).add(center),
        segment._handleIn.multiply(radius),
        segment._handleOut.multiply(radius)
      );
    }
    return createPath(segments, true, args);
  }

  return {
    Line: function() {
      return createPath([
        new Segment(Point.readNamed(arguments, 'from')),
        new Segment(Point.readNamed(arguments, 'to'))
      ], false, arguments);
    },

    Circle: function() {
      var center = Point.readNamed(arguments, 'center'),
        radius = Base.readNamed(arguments, 'radius');
      return createEllipse(center, new Size(radius), arguments);
    },

    Rectangle: function() {
      var rect = Rectangle.readNamed(arguments, 'rectangle'),
        radius = Size.readNamed(arguments, 'radius', 0,
            { readNull: true }),
        bl = rect.getBottomLeft(true),
        tl = rect.getTopLeft(true),
        tr = rect.getTopRight(true),
        br = rect.getBottomRight(true),
        segments;
      if (!radius || radius.isZero()) {
        segments = [
          new Segment(bl),
          new Segment(tl),
          new Segment(tr),
          new Segment(br)
        ];
      } else {
        radius = Size.min(radius, rect.getSize(true).divide(2));
        var rx = radius.width,
          ry = radius.height,
          hx = rx * kappa,
          hy = ry * kappa;
        segments = [
          new Segment(bl.add(rx, 0), null, [-hx, 0]),
          new Segment(bl.subtract(0, ry), [0, hy]),
          new Segment(tl.add(0, ry), null, [0, -hy]),
          new Segment(tl.add(rx, 0), [-hx, 0], null),
          new Segment(tr.subtract(rx, 0), null, [hx, 0]),
          new Segment(tr.add(0, ry), [0, -hy], null),
          new Segment(br.subtract(0, ry), null, [0, hy]),
          new Segment(br.subtract(rx, 0), [hx, 0])
        ];
      }
      return createPath(segments, true, arguments);
    },

    RoundRectangle: '#Rectangle',

    Ellipse: function() {
      var ellipse = Shape._readEllipse(arguments);
      return createEllipse(ellipse.center, ellipse.radius, arguments);
    },

    Oval: '#Ellipse',

    Arc: function() {
      var from = Point.readNamed(arguments, 'from'),
        through = Point.readNamed(arguments, 'through'),
        to = Point.readNamed(arguments, 'to'),
        props = Base.getNamed(arguments),
        path = new Path(props && props.insert === false
            && Item.NO_INSERT);
      path.moveTo(from);
      path.arcTo(through, to);
      return path.set(props);
    },

    RegularPolygon: function() {
      var center = Point.readNamed(arguments, 'center'),
        sides = Base.readNamed(arguments, 'sides'),
        radius = Base.readNamed(arguments, 'radius'),
        step = 360 / sides,
        three = !(sides % 3),
        vector = new Point(0, three ? -radius : radius),
        offset = three ? -1 : 0.5,
        segments = new Array(sides);
      for (var i = 0; i < sides; i++)
        segments[i] = new Segment(center.add(
          vector.rotate((i + offset) * step)));
      return createPath(segments, true, arguments);
    },

    Star: function() {
      var center = Point.readNamed(arguments, 'center'),
        points = Base.readNamed(arguments, 'points') * 2,
        radius1 = Base.readNamed(arguments, 'radius1'),
        radius2 = Base.readNamed(arguments, 'radius2'),
        step = 360 / points,
        vector = new Point(0, -1),
        segments = new Array(points);
      for (var i = 0; i < points; i++)
        segments[i] = new Segment(center.add(vector.rotate(step * i)
            .multiply(i % 2 ? radius2 : radius1)));
      return createPath(segments, true, arguments);
    }
  };
}});

var CompoundPath = PathItem.extend({
  _class: 'CompoundPath',
  _serializeFields: {
    children: []
  },

  initialize: function CompoundPath(arg) {
    this._children = [];
    this._namedChildren = {};
    if (!this._initialize(arg)) {
      if (typeof arg === 'string') {
        this.setPathData(arg);
      } else {
        this.addChildren(Array.isArray(arg) ? arg : arguments);
      }
    }
  },

  insertChildren: function insertChildren(index, items, _preserve) {
    items = insertChildren.base.call(this, index, items, _preserve, Path);
    for (var i = 0, l = !_preserve && items && items.length; i < l; i++) {
      var item = items[i];
      if (item._clockwise === undefined)
        item.setClockwise(item._index === 0);
    }
    return items;
  },

  reverse: function() {
    var children = this._children;
    for (var i = 0, l = children.length; i < l; i++)
      children[i].reverse();
  },

  smooth: function() {
    for (var i = 0, l = this._children.length; i < l; i++)
      this._children[i].smooth();
  },

  isClockwise: function() {
    var child = this.getFirstChild();
    return child && child.isClockwise();
  },

  setClockwise: function(clockwise) {
    if (this.isClockwise() !== !!clockwise)
      this.reverse();
  },

  getFirstSegment: function() {
    var first = this.getFirstChild();
    return first && first.getFirstSegment();
  },

  getLastSegment: function() {
    var last = this.getLastChild();
    return last && last.getLastSegment();
  },

  getCurves: function() {
    var children = this._children,
      curves = [];
    for (var i = 0, l = children.length; i < l; i++)
      curves.push.apply(curves, children[i].getCurves());
    return curves;
  },

  getFirstCurve: function() {
    var first = this.getFirstChild();
    return first && first.getFirstCurve();
  },

  getLastCurve: function() {
    var last = this.getLastChild();
    return last && last.getFirstCurve();
  },

  getArea: function() {
    var children = this._children,
      area = 0;
    for (var i = 0, l = children.length; i < l; i++)
      area += children[i].getArea();
    return area;
  }
}, {
  beans: true,

  getPathData: function(_precision) {
    var children = this._children,
      paths = [];
    for (var i = 0, l = children.length; i < l; i++)
      paths.push(children[i].getPathData(_precision));
    return paths.join(' ');
  }
}, {
  _getChildHitTestOptions: function(options) {
    return options.type === 'path'
        ? options
        : new Base(options, { fill: false });
  },

  _draw: function(ctx, param) {
    var children = this._children;
    if (children.length === 0)
      return;

    if (this._currentPath) {
      ctx.currentPath = this._currentPath;
    } else {
      param = param.extend({ dontStart: true, dontFinish: true });
      ctx.beginPath();
      for (var i = 0, l = children.length; i < l; i++)
        children[i].draw(ctx, param);
      this._currentPath = ctx.currentPath;
    }

    if (!param.clip) {
      this._setStyles(ctx);
      var style = this._style;
      if (style.hasFill()) {
        ctx.fill(style.getWindingRule());
        ctx.shadowColor = 'rgba(0,0,0,0)';
      }
      if (style.hasStroke())
        ctx.stroke();
    }
  },

  _drawSelected: function(ctx, matrix) {
    var children = this._children;
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i],
        mx = child._matrix;
      child._drawSelected(ctx, mx.isIdentity() ? matrix
          : matrix.clone().concatenate(child._matrix));
    }
  }
}, new function() { 
  function getCurrentPath(that, check) {
    var children = that._children;
    if (check && children.length === 0)
      throw new Error('Use a moveTo() command first');
    return children[children.length - 1];
  }

  var fields = {
    moveTo: function() {
      var current = getCurrentPath(this),
        path = current && current.isEmpty() ? current : new Path();
      if (path !== current)
        this.addChild(path);
      path.moveTo.apply(path, arguments);
    },

    moveBy: function() {
      var current = getCurrentPath(this, true),
        last = current && current.getLastSegment(),
        point = Point.read(arguments);
      this.moveTo(last ? point.add(last._point) : point);
    },

    closePath: function(join) {
      getCurrentPath(this, true).closePath(join);
    }
  };

  Base.each(['lineTo', 'cubicCurveTo', 'quadraticCurveTo', 'curveTo', 'arcTo',
      'lineBy', 'cubicCurveBy', 'quadraticCurveBy', 'curveBy', 'arcBy'],
      function(key) {
        fields[key] = function() {
          var path = getCurrentPath(this, true);
          path[key].apply(path, arguments);
        };
      }
  );

  return fields;
});

PathItem.inject(new function() {
  function computeBoolean(path1, path2, operator, subtract) {
    function preparePath(path) {
      return path.clone(false).reduce().reorient().transform(null, true);
    }

    var _path1 = preparePath(path1),
      _path2 = path2 && path1 !== path2 && preparePath(path2);
    if (!_path1.isClockwise())
      _path1.reverse();
    if (_path2 && !(subtract ^ _path2.isClockwise()))
      _path2.reverse();
    splitPath(_path1.getIntersections(_path2, true));

    var chain = [],
      windings = [],
      lengths = [],
      segments = [],
      monoCurves = [];

    function collect(paths) {
      for (var i = 0, l = paths.length; i < l; i++) {
        var path = paths[i];
        segments.push.apply(segments, path._segments);
        monoCurves.push.apply(monoCurves, path._getMonoCurves());
      }
    }

    collect(_path1._children || [_path1]);
    if (_path2)
      collect(_path2._children || [_path2]);
    segments.sort(function(a, b) {
      var _a = a._intersection,
        _b = b._intersection;
      return !_a && !_b || _a && _b ? 0 : _a ? -1 : 1;
    });
    for (var i = 0, l = segments.length; i < l; i++) {
      var segment = segments[i];
      if (segment._winding != null)
        continue;
      chain.length = windings.length = lengths.length = 0;
      var totalLength = 0,
        startSeg = segment;
      do {
        chain.push(segment);
        lengths.push(totalLength += segment.getCurve().getLength());
        segment = segment.getNext();
      } while (segment && !segment._intersection && segment !== startSeg);
      for (var j = 0; j < 3; j++) {
        var length = totalLength * Math.random(),
          amount = lengths.length,
          k = 0;
        do {
          if (lengths[k] >= length) {
            if (k > 0)
              length -= lengths[k - 1];
            break;
          }
        } while (++k < amount);
        var curve = chain[k].getCurve(),
          point = curve.getPointAt(length),
          hor = curve.isHorizontal(),
          path = curve._path;
        if (path._parent instanceof CompoundPath)
          path = path._parent;
        windings[j] = subtract && _path2
            && (path === _path1 && _path2._getWinding(point, hor)
            || path === _path2 && !_path1._getWinding(point, hor))
            ? 0
            : getWinding(point, monoCurves, hor);
      }
      windings.sort();
      var winding = windings[1];
      for (var j = chain.length - 1; j >= 0; j--)
        chain[j]._winding = winding;
    }
    var result = new CompoundPath();
    result.addChildren(tracePaths(segments, operator), true);
    _path1.remove();
    if (_path2)
      _path2.remove();
    return result.reduce();
  }

  function splitPath(intersections) {
    var TOLERANCE = 0.00001,
      linearSegments;

    function resetLinear() {
      for (var i = 0, l = linearSegments.length; i < l; i++) {
        var segment = linearSegments[i];
        segment._handleOut.set(0, 0);
        segment._handleIn.set(0, 0);
      }
    }

    for (var i = intersections.length - 1, curve, prevLoc; i >= 0; i--) {
      var loc = intersections[i],
        t = loc._parameter;
      if (prevLoc && prevLoc._curve === loc._curve
          && prevLoc._parameter > 0) {
        t /= prevLoc._parameter;
      } else {
        if (linearSegments)
          resetLinear();
        curve = loc._curve;
        linearSegments = curve.isLinear() && [];
      }
      var newCurve,
        segment;
      if (newCurve = curve.divide(t, true, true)) {
        segment = newCurve._segment1;
        curve = newCurve.getPrevious();
      } else {
        segment = t < TOLERANCE
          ? curve._segment1
          : t > 1 - TOLERANCE
            ? curve._segment2
            : curve.getPartLength(0, t) < curve.getPartLength(t, 1)
              ? curve._segment1
              : curve._segment2;
      }
      segment._intersection = loc.getIntersection();
      loc._segment = segment;
      if (linearSegments)
        linearSegments.push(segment);
      prevLoc = loc;
    }
    if (linearSegments)
      resetLinear();
  }

  function getWinding(point, curves, horizontal, testContains) {
    var TOLERANCE = 0.00001,
      x = point.x,
      y = point.y,
      windLeft = 0,
      windRight = 0,
      roots = [],
      abs = Math.abs,
      MAX = 1 - TOLERANCE;
    if (horizontal) {
      var yTop = -Infinity,
        yBottom = Infinity,
        yBefore = y - TOLERANCE,
        yAfter = y + TOLERANCE;
      for (var i = 0, l = curves.length; i < l; i++) {
        var values = curves[i].values;
        if (Curve.solveCubic(values, 0, x, roots, 0, 1) > 0) {
          for (var j = roots.length - 1; j >= 0; j--) {
            var y0 = Curve.evaluate(values, roots[j], 0).y;
            if (y0 < yBefore && y0 > yTop) {
              yTop = y0;
            } else if (y0 > yAfter && y0 < yBottom) {
              yBottom = y0;
            }
          }
        }
      }
      yTop = (yTop + y) / 2;
      yBottom = (yBottom + y) / 2;
      if (yTop > -Infinity)
        windLeft = getWinding(new Point(x, yTop), curves);
      if (yBottom < Infinity)
        windRight = getWinding(new Point(x, yBottom), curves);
    } else {
      var xBefore = x - TOLERANCE,
        xAfter = x + TOLERANCE;
      for (var i = 0, l = curves.length; i < l; i++) {
        var curve = curves[i],
          values = curve.values,
          winding = curve.winding,
          next = curve.next;
        if (winding && (winding === 1
            && y >= values[1] && y <= values[7]
            || y >= values[7] && y <= values[1])
          && Curve.solveCubic(values, 1, y, roots, 0,
            !next.winding && next.values[1] === y ? 1 : MAX) === 1){
          var t = roots[0],
            x0 = Curve.evaluate(values, t, 0).x,
            slope = Curve.evaluate(values, t, 1).y;
          if (abs(slope) < TOLERANCE && !Curve.isLinear(values)
              || t < TOLERANCE && slope * Curve.evaluate(
                curve.previous.values, t, 1).y < 0) {
            if (testContains && x0 >= xBefore && x0 <= xAfter) {
              ++windLeft;
              ++windRight;
            }
          } else if (x0 <= xBefore) {
            windLeft += winding;
          } else if (x0 >= xAfter) {
            windRight += winding;
          }
        }
      }
    }
    return Math.max(abs(windLeft), abs(windRight));
  }

  function tracePaths(segments, operator, selfOp) {
    operator = operator || function() {
      return true;
    };
    var paths = [],
      ZERO = 1e-3,
      ONE = 1 - 1e-3;
    for (var i = 0, seg, startSeg, l = segments.length; i < l; i++) {
      seg = startSeg = segments[i];
      if (seg._visited || !operator(seg._winding))
        continue;
      var path = new Path(Item.NO_INSERT),
        inter = seg._intersection,
        startInterSeg = inter && inter._segment,
        added = false, 
        dir = 1;
      do {
        var handleIn = dir > 0 ? seg._handleIn : seg._handleOut,
          handleOut = dir > 0 ? seg._handleOut : seg._handleIn,
          interSeg;
        if (added && (!operator(seg._winding) || selfOp)
            && (inter = seg._intersection)
            && (interSeg = inter._segment)
            && interSeg !== startSeg) {
          if (selfOp) {
            seg._visited = interSeg._visited;
            seg = interSeg;
            dir = 1;
          } else {
            var c1 = seg.getCurve();
            if (dir > 0)
              c1 = c1.getPrevious();
            var t1 = c1.getTangentAt(dir < 1 ? ZERO : ONE, true),
              c4 = interSeg.getCurve(),
              c3 = c4.getPrevious(),
              t3 = c3.getTangentAt(ONE, true),
              t4 = c4.getTangentAt(ZERO, true),
              w3 = t1.cross(t3),
              w4 = t1.cross(t4);
            if (w3 * w4 !== 0) {
              var curve = w3 < w4 ? c3 : c4,
                nextCurve = operator(curve._segment1._winding)
                  ? curve
                  : w3 < w4 ? c4 : c3,
                nextSeg = nextCurve._segment1;
              dir = nextCurve === c3 ? -1 : 1;
              if (nextSeg._visited && seg._path !== nextSeg._path
                    || !operator(nextSeg._winding)) {
                dir = 1;
              } else {
                seg._visited = interSeg._visited;
                seg = interSeg;
                if (nextSeg._visited)
                  dir = 1;
              }
            } else {
              dir = 1;
            }
          }
          handleOut = dir > 0 ? seg._handleOut : seg._handleIn;
        }
        path.add(new Segment(seg._point, added && handleIn, handleOut));
        added = true;
        seg._visited = true;
        seg = dir > 0 ? seg.getNext() : seg. getPrevious();
      } while (seg && !seg._visited
          && seg !== startSeg && seg !== startInterSeg
          && (seg._intersection || operator(seg._winding)));
      if (seg && (seg === startSeg || seg === startInterSeg)) {
        path.firstSegment.setHandleIn((seg === startInterSeg
            ? startInterSeg : seg)._handleIn);
        path.setClosed(true);
      } else {
        path.lastSegment._handleOut.set(0, 0);
      }
      if (path._segments.length >
          (path._closed ? path.isPolygon() ? 2 : 0 : 1))
        paths.push(path);
    }
    return paths;
  }

  return {
    _getWinding: function(point, horizontal, testContains) {
      return getWinding(point, this._getMonoCurves(),
          horizontal, testContains);
    },

    unite: function(path) {
      return computeBoolean(this, path, function(w) {
        return w === 1 || w === 0;
      }, false);
    },

    intersect: function(path) {
      return computeBoolean(this, path, function(w) {
        return w === 2;
      }, false);
    },

    subtract: function(path) {
      return computeBoolean(this, path, function(w) {
        return w === 1;
      }, true);
    },

    exclude: function(path) {
      return new Group([this.subtract(path), path.subtract(this)]);
    },

    divide: function(path) {
      return new Group([this.subtract(path), this.intersect(path)]);
    }
  };
});

Path.inject({
  _getMonoCurves: function() {
    var monoCurves = this._monoCurves,
      prevCurve;

    function insertCurve(v) {
      var y0 = v[1],
        y1 = v[7],
        curve = {
          values: v,
          winding: y0 === y1
            ? 0 
            : y0 > y1
              ? -1 
              : 1, 
          previous: prevCurve,
          next: null 
        };
      if (prevCurve)
        prevCurve.next = curve;
      monoCurves.push(curve);
      prevCurve = curve;
    }

    function handleCurve(v) {
      if (Curve.getLength(v) === 0)
        return;
      var y0 = v[1],
        y1 = v[3],
        y2 = v[5],
        y3 = v[7];
      if (Curve.isLinear(v)) {
        insertCurve(v);
      } else {
        var a = 3 * (y1 - y2) - y0 + y3,
          b = 2 * (y0 + y2) - 4 * y1,
          c = y1 - y0,
          TOLERANCE = 0.00001,
          roots = [];
        var count = Numerical.solveQuadratic(a, b, c, roots, TOLERANCE,
            1 - TOLERANCE);
        if (count === 0) {
          insertCurve(v);
        } else {
          roots.sort();
          var t = roots[0],
            parts = Curve.subdivide(v, t);
          insertCurve(parts[0]);
          if (count > 1) {
            t = (roots[1] - t) / (1 - t);
            parts = Curve.subdivide(parts[1], t);
            insertCurve(parts[0]);
          }
          insertCurve(parts[1]);
        }
      }
    }

    if (!monoCurves) {
      monoCurves = this._monoCurves = [];
      var curves = this.getCurves(),
        segments = this._segments;
      for (var i = 0, l = curves.length; i < l; i++)
        handleCurve(curves[i].getValues());
      if (!this._closed && segments.length > 1) {
        var p1 = segments[segments.length - 1]._point,
          p2 = segments[0]._point,
          p1x = p1._x, p1y = p1._y,
          p2x = p2._x, p2y = p2._y;
        handleCurve([p1x, p1y, p1x, p1y, p2x, p2y, p2x, p2y]);
      }
      if (monoCurves.length > 0) {
        var first = monoCurves[0],
          last = monoCurves[monoCurves.length - 1];
        first.previous = last;
        last.next = first;
      }
    }
    return monoCurves;
  },

  getInteriorPoint: function() {
    var bounds = this.getBounds(),
      point = bounds.getCenter(true);
    if (!this.contains(point)) {
      var curves = this._getMonoCurves(),
        roots = [],
        y = point.y,
        xIntercepts = [];
      for (var i = 0, l = curves.length; i < l; i++) {
        var values = curves[i].values;
        if ((curves[i].winding === 1
            && y >= values[1] && y <= values[7]
            || y >= values[7] && y <= values[1])
            && Curve.solveCubic(values, 1, y, roots, 0, 1) > 0) {
          for (var j = roots.length - 1; j >= 0; j--)
            xIntercepts.push(Curve.evaluate(values, roots[j], 0).x);
        }
        if (xIntercepts.length > 1)
          break;
      }
      point.x = (xIntercepts[0] + xIntercepts[1]) / 2;
    }
    return point;
  },

  reorient: function() {
    this.setClockwise(true);
    return this;
  }
});

CompoundPath.inject({
  _getMonoCurves: function() {
    var children =  this._children,
      monoCurves = [];
    for (var i = 0, l = children.length; i < l; i++)
      monoCurves.push.apply(monoCurves, children[i]._getMonoCurves());
    return monoCurves;
  },

  reorient: function() {
    var children = this.removeChildren().sort(function(a, b) {
      return b.getBounds().getArea() - a.getBounds().getArea();
    });
    this.addChildren(children);
    var clockwise = children[0].isClockwise();
    for (var i = 1, l = children.length; i < l; i++) { 
      var point = children[i].getInteriorPoint(),
        counters = 0;
      for (var j = i - 1; j >= 0; j--) {
        if (children[j].contains(point))
          counters++;
      }
      children[i].setClockwise(counters % 2 === 0 && clockwise);
    }
    return this;
  }
});

var PathFlattener = Base.extend({
  initialize: function(path) {
    this.curves = []; 
    this.parts = []; 
    this.length = 0; 
    this.index = 0;

    var segments = path._segments,
      segment1 = segments[0],
      segment2,
      that = this;

    function addCurve(segment1, segment2) {
      var curve = Curve.getValues(segment1, segment2);
      that.curves.push(curve);
      that._computeParts(curve, segment1._index, 0, 1);
    }

    for (var i = 1, l = segments.length; i < l; i++) {
      segment2 = segments[i];
      addCurve(segment1, segment2);
      segment1 = segment2;
    }
    if (path._closed)
      addCurve(segment2, segments[0]);
  },

  _computeParts: function(curve, index, minT, maxT) {
    if ((maxT - minT) > 1 / 32 && !Curve.isFlatEnough(curve, 0.25)) {
      var curves = Curve.subdivide(curve);
      var halfT = (minT + maxT) / 2;
      this._computeParts(curves[0], index, minT, halfT);
      this._computeParts(curves[1], index, halfT, maxT);
    } else {
      var x = curve[6] - curve[0],
        y = curve[7] - curve[1],
        dist = Math.sqrt(x * x + y * y);
      if (dist > 0.00001) {
        this.length += dist;
        this.parts.push({
          offset: this.length,
          value: maxT,
          index: index
        });
      }
    }
  },

  getParameterAt: function(offset) {
    var i, j = this.index;
    for (;;) {
      i = j;
      if (j == 0 || this.parts[--j].offset < offset)
        break;
    }
    for (var l = this.parts.length; i < l; i++) {
      var part = this.parts[i];
      if (part.offset >= offset) {
        this.index = i;
        var prev = this.parts[i - 1];
        var prevVal = prev && prev.index == part.index ? prev.value : 0,
          prevLen = prev ? prev.offset : 0;
        return {
          value: prevVal + (part.value - prevVal)
            * (offset - prevLen) /  (part.offset - prevLen),
          index: part.index
        };
      }
    }
    var part = this.parts[this.parts.length - 1];
    return {
      value: 1,
      index: part.index
    };
  },

  evaluate: function(offset, type) {
    var param = this.getParameterAt(offset);
    return Curve.evaluate(this.curves[param.index], param.value, type);
  },

  drawPart: function(ctx, from, to) {
    from = this.getParameterAt(from);
    to = this.getParameterAt(to);
    for (var i = from.index; i <= to.index; i++) {
      var curve = Curve.getPart(this.curves[i],
          i == from.index ? from.value : 0,
          i == to.index ? to.value : 1);
      if (i == from.index)
        ctx.moveTo(curve[0], curve[1]);
      ctx.bezierCurveTo.apply(ctx, curve.slice(2));
    }
  }
});

var PathFitter = Base.extend({
  initialize: function(path, error) {
    this.points = [];
    var segments = path._segments,
      prev;
    for (var i = 0, l = segments.length; i < l; i++) {
      var point = segments[i].point.clone();
      if (!prev || !prev.equals(point)) {
        this.points.push(point);
        prev = point;
      }
    }
    this.error = error;
  },

  fit: function() {
    var points = this.points,
      length = points.length;
    this.segments = length > 0 ? [new Segment(points[0])] : [];
    if (length > 1)
      this.fitCubic(0, length - 1,
        points[1].subtract(points[0]).normalize(),
        points[length - 2].subtract(points[length - 1]).normalize());
    return this.segments;
  },

  fitCubic: function(first, last, tan1, tan2) {
    if (last - first == 1) {
      var pt1 = this.points[first],
        pt2 = this.points[last],
        dist = pt1.getDistance(pt2) / 3;
      this.addCurve([pt1, pt1.add(tan1.normalize(dist)),
          pt2.add(tan2.normalize(dist)), pt2]);
      return;
    }
    var uPrime = this.chordLengthParameterize(first, last),
      maxError = Math.max(this.error, this.error * this.error),
      split;
    for (var i = 0; i <= 4; i++) {
      var curve = this.generateBezier(first, last, uPrime, tan1, tan2);
      var max = this.findMaxError(first, last, curve, uPrime);
      if (max.error < this.error) {
        this.addCurve(curve);
        return;
      }
      split = max.index;
      if (max.error >= maxError)
        break;
      this.reparameterize(first, last, uPrime, curve);
      maxError = max.error;
    }
    var V1 = this.points[split - 1].subtract(this.points[split]),
      V2 = this.points[split].subtract(this.points[split + 1]),
      tanCenter = V1.add(V2).divide(2).normalize();
    this.fitCubic(first, split, tan1, tanCenter);
    this.fitCubic(split, last, tanCenter.negate(), tan2);
  },

  addCurve: function(curve) {
    var prev = this.segments[this.segments.length - 1];
    prev.setHandleOut(curve[1].subtract(curve[0]));
    this.segments.push(
        new Segment(curve[3], curve[2].subtract(curve[3])));
  },

  generateBezier: function(first, last, uPrime, tan1, tan2) {
    var epsilon = 1e-11,
      pt1 = this.points[first],
      pt2 = this.points[last],
      C = [[0, 0], [0, 0]],
      X = [0, 0];

    for (var i = 0, l = last - first + 1; i < l; i++) {
      var u = uPrime[i],
        t = 1 - u,
        b = 3 * u * t,
        b0 = t * t * t,
        b1 = b * t,
        b2 = b * u,
        b3 = u * u * u,
        a1 = tan1.normalize(b1),
        a2 = tan2.normalize(b2),
        tmp = this.points[first + i]
          .subtract(pt1.multiply(b0 + b1))
          .subtract(pt2.multiply(b2 + b3));
      C[0][0] += a1.dot(a1);
      C[0][1] += a1.dot(a2);
      C[1][0] = C[0][1];
      C[1][1] += a2.dot(a2);
      X[0] += a1.dot(tmp);
      X[1] += a2.dot(tmp);
    }

    var detC0C1 = C[0][0] * C[1][1] - C[1][0] * C[0][1],
      alpha1, alpha2;
    if (Math.abs(detC0C1) > epsilon) {
      var detC0X  = C[0][0] * X[1]    - C[1][0] * X[0],
        detXC1  = X[0]    * C[1][1] - X[1]    * C[0][1];
      alpha1 = detXC1 / detC0C1;
      alpha2 = detC0X / detC0C1;
    } else {
      var c0 = C[0][0] + C[0][1],
        c1 = C[1][0] + C[1][1];
      if (Math.abs(c0) > epsilon) {
        alpha1 = alpha2 = X[0] / c0;
      } else if (Math.abs(c1) > epsilon) {
        alpha1 = alpha2 = X[1] / c1;
      } else {
        alpha1 = alpha2 = 0;
      }
    }

    var segLength = pt2.getDistance(pt1);
    epsilon *= segLength;
    if (alpha1 < epsilon || alpha2 < epsilon) {
      alpha1 = alpha2 = segLength / 3;
    }

    return [pt1, pt1.add(tan1.normalize(alpha1)),
        pt2.add(tan2.normalize(alpha2)), pt2];
  },

  reparameterize: function(first, last, u, curve) {
    for (var i = first; i <= last; i++) {
      u[i - first] = this.findRoot(curve, this.points[i], u[i - first]);
    }
  },

  findRoot: function(curve, point, u) {
    var curve1 = [],
      curve2 = [];
    for (var i = 0; i <= 2; i++) {
      curve1[i] = curve[i + 1].subtract(curve[i]).multiply(3);
    }
    for (var i = 0; i <= 1; i++) {
      curve2[i] = curve1[i + 1].subtract(curve1[i]).multiply(2);
    }
    var pt = this.evaluate(3, curve, u),
      pt1 = this.evaluate(2, curve1, u),
      pt2 = this.evaluate(1, curve2, u),
      diff = pt.subtract(point),
      df = pt1.dot(pt1) + diff.dot(pt2);
    if (Math.abs(df) < 0.00001)
      return u;
    return u - diff.dot(pt1) / df;
  },

  evaluate: function(degree, curve, t) {
    var tmp = curve.slice();
    for (var i = 1; i <= degree; i++) {
      for (var j = 0; j <= degree - i; j++) {
        tmp[j] = tmp[j].multiply(1 - t).add(tmp[j + 1].multiply(t));
      }
    }
    return tmp[0];
  },

  chordLengthParameterize: function(first, last) {
    var u = [0];
    for (var i = first + 1; i <= last; i++) {
      u[i - first] = u[i - first - 1]
          + this.points[i].getDistance(this.points[i - 1]);
    }
    for (var i = 1, m = last - first; i <= m; i++) {
      u[i] /= u[m];
    }
    return u;
  },

  findMaxError: function(first, last, curve, u) {
    var index = Math.floor((last - first + 1) / 2),
      maxDist = 0;
    for (var i = first + 1; i < last; i++) {
      var P = this.evaluate(3, curve, u[i - first]);
      var v = P.subtract(this.points[i]);
      var dist = v.x * v.x + v.y * v.y; 
      if (dist >= maxDist) {
        maxDist = dist;
        index = i;
      }
    }
    return {
      error: maxDist,
      index: index
    };
  }
});

var TextItem = Item.extend({
  _class: 'TextItem',
  _boundsSelected: true,
  _applyMatrix: false,
  _canApplyMatrix: false,
  _serializeFields: {
    content: null
  },
  _boundsGetter: 'getBounds',

  initialize: function TextItem(arg) {
    this._content = '';
    this._lines = [];
    var hasProps = arg && Base.isPlainObject(arg)
        && arg.x === undefined && arg.y === undefined;
    this._initialize(hasProps && arg, !hasProps && Point.read(arguments));
  },

  _equals: function(item) {
    return this._content === item._content;
  },

  _clone: function _clone(copy) {
    copy.setContent(this._content);
    return _clone.base.call(this, copy);
  },

  getContent: function() {
    return this._content;
  },

  setContent: function(content) {
    this._content = '' + content;
    this._lines = this._content.split(/\r\n|\n|\r/mg);
    this._changed(265);
  },

  isEmpty: function() {
    return !this._content;
  },

  getCharacterStyle: '#getStyle',
  setCharacterStyle: '#setStyle',

  getParagraphStyle: '#getStyle',
  setParagraphStyle: '#setStyle'
});

var PointText = TextItem.extend({
  _class: 'PointText',

  initialize: function PointText() {
    TextItem.apply(this, arguments);
  },

  clone: function(insert) {
    return this._clone(new PointText(Item.NO_INSERT), insert);
  },

  getPoint: function() {
    var point = this._matrix.getTranslation();
    return new LinkedPoint(point.x, point.y, this, 'setPoint');
  },

  setPoint: function() {
    var point = Point.read(arguments);
    this.translate(point.subtract(this._matrix.getTranslation()));
  },

  _draw: function(ctx) {
    if (!this._content)
      return;
    this._setStyles(ctx);
    var style = this._style,
      lines = this._lines,
      leading = style.getLeading(),
      shadowColor = ctx.shadowColor;
    ctx.font = style.getFontStyle();
    ctx.textAlign = style.getJustification();
    for (var i = 0, l = lines.length; i < l; i++) {
      ctx.shadowColor = shadowColor;
      var line = lines[i];
      if (style.hasFill()) {
        ctx.fillText(line, 0, 0);
        ctx.shadowColor = 'rgba(0,0,0,0)';
      }
      if (style.hasStroke())
        ctx.strokeText(line, 0, 0);
      ctx.translate(0, leading);
    }
  },

  _getBounds: function(getter, matrix) {
    var style = this._style,
      lines = this._lines,
      numLines = lines.length,
      justification = style.getJustification(),
      leading = style.getLeading(),
      width = this.getView().getTextWidth(style.getFontStyle(), lines),
      x = 0;
    if (justification !== 'left')
      x -= width / (justification === 'center' ? 2: 1);
    var bounds = new Rectangle(x,
          numLines ? - 0.75 * leading : 0,
          width, numLines * leading);
    return matrix ? matrix._transformBounds(bounds, bounds) : bounds;
  }
});

var Color = Base.extend(new function() {

  var types = {
    gray: ['gray'],
    rgb: ['red', 'green', 'blue'],
    hsb: ['hue', 'saturation', 'brightness'],
    hsl: ['hue', 'saturation', 'lightness'],
    gradient: ['gradient', 'origin', 'destination', 'highlight']
  };

  var componentParsers = {},
    colorCache = {},
    colorCtx;

  function fromCSS(string) {
    var match = string.match(/^#(\w{1,2})(\w{1,2})(\w{1,2})$/),
      components;
    if (match) {
      components = [0, 0, 0];
      for (var i = 0; i < 3; i++) {
        var value = match[i + 1];
        components[i] = parseInt(value.length == 1
            ? value + value : value, 16) / 255;
      }
    } else if (match = string.match(/^rgba?\((.*)\)$/)) {
      components = match[1].split(',');
      for (var i = 0, l = components.length; i < l; i++) {
        var value = +components[i];
        components[i] = i < 3 ? value / 255 : value;
      }
    } else {
      var cached = colorCache[string];
      if (!cached) {
        if (!colorCtx) {
          colorCtx = CanvasProvider.getContext(1, 1);
          colorCtx.globalCompositeOperation = 'copy';
        }
        colorCtx.fillStyle = 'rgba(0,0,0,0)';
        colorCtx.fillStyle = string;
        colorCtx.fillRect(0, 0, 1, 1);
        var data = colorCtx.getImageData(0, 0, 1, 1).data;
        cached = colorCache[string] = [
          data[0] / 255,
          data[1] / 255,
          data[2] / 255
        ];
      }
      components = cached.slice();
    }
    return components;
  }

  var hsbIndices = [
    [0, 3, 1], 
    [2, 0, 1], 
    [1, 0, 3], 
    [1, 2, 0], 
    [3, 1, 0], 
    [0, 1, 2]  
  ];

  var converters = {
    'rgb-hsb': function(r, g, b) {
      var max = Math.max(r, g, b),
        min = Math.min(r, g, b),
        delta = max - min,
        h = delta === 0 ? 0
          :   ( max == r ? (g - b) / delta + (g < b ? 6 : 0)
            : max == g ? (b - r) / delta + 2
            :            (r - g) / delta + 4) * 60; 
      return [h, max === 0 ? 0 : delta / max, max];
    },

    'hsb-rgb': function(h, s, b) {
      h = (((h / 60) % 6) + 6) % 6;
      var i = Math.floor(h), 
        f = h - i,
        i = hsbIndices[i],
        v = [
          b,            
          b * (1 - s),      
          b * (1 - s * f),    
          b * (1 - s * (1 - f)) 
        ];
      return [v[i[0]], v[i[1]], v[i[2]]];
    },

    'rgb-hsl': function(r, g, b) {
      var max = Math.max(r, g, b),
        min = Math.min(r, g, b),
        delta = max - min,
        achromatic = delta === 0,
        h = achromatic ? 0
          :   ( max == r ? (g - b) / delta + (g < b ? 6 : 0)
            : max == g ? (b - r) / delta + 2
            :            (r - g) / delta + 4) * 60, 
        l = (max + min) / 2,
        s = achromatic ? 0 : l < 0.5
            ? delta / (max + min)
            : delta / (2 - max - min);
      return [h, s, l];
    },

    'hsl-rgb': function(h, s, l) {
      h = (((h / 360) % 1) + 1) % 1;
      if (s === 0)
        return [l, l, l];
      var t3s = [ h + 1 / 3, h, h - 1 / 3 ],
        t2 = l < 0.5 ? l * (1 + s) : l + s - l * s,
        t1 = 2 * l - t2,
        c = [];
      for (var i = 0; i < 3; i++) {
        var t3 = t3s[i];
        if (t3 < 0) t3 += 1;
        if (t3 > 1) t3 -= 1;
        c[i] = 6 * t3 < 1
          ? t1 + (t2 - t1) * 6 * t3
          : 2 * t3 < 1
            ? t2
            : 3 * t3 < 2
              ? t1 + (t2 - t1) * ((2 / 3) - t3) * 6
              : t1;
      }
      return c;
    },

    'rgb-gray': function(r, g, b) {
      return [r * 0.2989 + g * 0.587 + b * 0.114];
    },

    'gray-rgb': function(g) {
      return [g, g, g];
    },

    'gray-hsb': function(g) {
      return [0, 0, g];
    },

    'gray-hsl': function(g) {
      return [0, 0, g];
    },

    'gradient-rgb': function() {
      return [];
    },

    'rgb-gradient': function() {
      return [];
    }

  };

  return Base.each(types, function(properties, type) {
    componentParsers[type] = [];
    Base.each(properties, function(name, index) {
      var part = Base.capitalize(name),
        hasOverlap = /^(hue|saturation)$/.test(name),
        parser = componentParsers[type][index] = name === 'gradient'
          ? function(value) {
            var current = this._components[0];
            value = Gradient.read(Array.isArray(value) ? value
                : arguments, 0, { readNull: true });
            if (current !== value) {
              if (current)
                current._removeOwner(this);
              if (value)
                value._addOwner(this);
            }
            return value;
          }
          : type === 'gradient'
            ? function() {
              return Point.read(arguments, 0, {
                  readNull: name === 'highlight',
                  clone: true
              });
            }
            : function(value) {
              return value == null || isNaN(value) ? 0 : value;
            };

      this['get' + part] = function() {
        return this._type === type
          || hasOverlap && /^hs[bl]$/.test(this._type)
            ? this._components[index]
            : this._convert(type)[index];
      };

      this['set' + part] = function(value) {
        if (this._type !== type
            && !(hasOverlap && /^hs[bl]$/.test(this._type))) {
          this._components = this._convert(type);
          this._properties = types[type];
          this._type = type;
        }
        value = parser.call(this, value);
        if (value != null) {
          this._components[index] = value;
          this._changed();
        }
      };
    }, this);
  }, {
    _class: 'Color',
    _readIndex: true,

    initialize: function Color(arg) {
      var slice = Array.prototype.slice,
        args = arguments,
        read = 0,
        type,
        components,
        alpha,
        values;
      if (Array.isArray(arg)) {
        args = arg;
        arg = args[0];
      }
      var argType = arg != null && typeof arg;
      if (argType === 'string' && arg in types) {
        type = arg;
        arg = args[1];
        if (Array.isArray(arg)) {
          components = arg;
          alpha = args[2];
        } else {
          if (this.__read)
            read = 1; 
          args = slice.call(args, 1);
          argType = typeof arg;
        }
      }
      if (!components) {
        values = argType === 'number'
            ? args
            : argType === 'object' && arg.length != null
              ? arg
              : null;
        if (values) {
          if (!type)
            type = values.length >= 3
                ? 'rgb'
                : 'gray';
          var length = types[type].length;
          alpha = values[length];
          if (this.__read)
            read += values === arguments
              ? length + (alpha != null ? 1 : 0)
              : 1;
          if (values.length > length)
            values = slice.call(values, 0, length);
        } else if (argType === 'string') {
          type = 'rgb';
          components = fromCSS(arg);
          if (components.length === 4) {
            alpha = components[3];
            components.length--;
          }
        } else if (argType === 'object') {
          if (arg.constructor === Color) {
            type = arg._type;
            components = arg._components.slice();
            alpha = arg._alpha;
            if (type === 'gradient') {
              for (var i = 1, l = components.length; i < l; i++) {
                var point = components[i];
                if (point)
                  components[i] = point.clone();
              }
            }
          } else if (arg.constructor === Gradient) {
            type = 'gradient';
            values = args;
          } else {
            type = 'hue' in arg
              ? 'lightness' in arg
                ? 'hsl'
                : 'hsb'
              : 'gradient' in arg || 'stops' in arg
                  || 'radial' in arg
                ? 'gradient'
                : 'gray' in arg
                  ? 'gray'
                  : 'rgb';
            var properties = types[type];
              parsers = componentParsers[type];
            this._components = components = [];
            for (var i = 0, l = properties.length; i < l; i++) {
              var value = arg[properties[i]];
              if (value == null && i === 0 && type === 'gradient'
                  && 'stops' in arg) {
                value = {
                  stops: arg.stops,
                  radial: arg.radial
                };
              }
              value = parsers[i].call(this, value);
              if (value != null)
                components[i] = value;
            }
            alpha = arg.alpha;
          }
        }
        if (this.__read && type)
          read = 1;
      }
      this._type = type || 'rgb';
      if (type === 'gradient')
        this._id = Color._id = (Color._id || 0) + 1;
      if (!components) {
        this._components = components = [];
        var parsers = componentParsers[this._type];
        for (var i = 0, l = parsers.length; i < l; i++) {
          var value = parsers[i].call(this, values && values[i]);
          if (value != null)
            components[i] = value;
        }
      }
      this._components = components;
      this._properties = types[this._type];
      this._alpha = alpha;
      if (this.__read)
        this.__read = read;
    },

    _serialize: function(options, dictionary) {
      var components = this.getComponents();
      return Base.serialize(
          /^(gray|rgb)$/.test(this._type)
            ? components
            : [this._type].concat(components),
          options, true, dictionary);
    },

    _changed: function() {
      this._canvasStyle = null;
      if (this._owner)
        this._owner._changed(65);
    },

    _convert: function(type) {
      var converter;
      return this._type === type
          ? this._components.slice()
          : (converter = converters[this._type + '-' + type])
            ? converter.apply(this, this._components)
            : converters['rgb-' + type].apply(this,
              converters[this._type + '-rgb'].apply(this,
                this._components));
    },

    convert: function(type) {
      return new Color(type, this._convert(type), this._alpha);
    },

    getType: function() {
      return this._type;
    },

    setType: function(type) {
      this._components = this._convert(type);
      this._properties = types[type];
      this._type = type;
    },

    getComponents: function() {
      var components = this._components.slice();
      if (this._alpha != null)
        components.push(this._alpha);
      return components;
    },

    getAlpha: function() {
      return this._alpha != null ? this._alpha : 1;
    },

    setAlpha: function(alpha) {
      this._alpha = alpha == null ? null : Math.min(Math.max(alpha, 0), 1);
      this._changed();
    },

    hasAlpha: function() {
      return this._alpha != null;
    },

    equals: function(color) {
      var col = Base.isPlainValue(color)
          ? Color.read(arguments)
          : color;
      return col === this || col && this._class === col._class
          && this._type === col._type
          && this._alpha === col._alpha
          && Base.equals(this._components, col._components)
          || false;
    },

    toString: function() {
      var properties = this._properties,
        parts = [],
        isGradient = this._type === 'gradient',
        f = Formatter.instance;
      for (var i = 0, l = properties.length; i < l; i++) {
        var value = this._components[i];
        if (value != null)
          parts.push(properties[i] + ': '
              + (isGradient ? value : f.number(value)));
      }
      if (this._alpha != null)
        parts.push('alpha: ' + f.number(this._alpha));
      return '{ ' + parts.join(', ') + ' }';
    },

    toCSS: function(hex) {
      var components = this._convert('rgb'),
        alpha = hex || this._alpha == null ? 1 : this._alpha;
      function convert(val) {
        return Math.round((val < 0 ? 0 : val > 1 ? 1 : val) * 255);
      }
      components = [
        convert(components[0]),
        convert(components[1]),
        convert(components[2])
      ];
      if (alpha < 1)
        components.push(alpha < 0 ? 0 : alpha);
      return hex
          ? '#' + ((1 << 24) + (components[0] << 16)
            + (components[1] << 8)
            + components[2]).toString(16).slice(1)
          : (components.length == 4 ? 'rgba(' : 'rgb(')
            + components.join(',') + ')';
    },

    toCanvasStyle: function(ctx) {
      if (this._canvasStyle)
        return this._canvasStyle;
      if (this._type !== 'gradient')
        return this._canvasStyle = this.toCSS();
      var components = this._components,
        gradient = components[0],
        stops = gradient._stops,
        origin = components[1],
        destination = components[2],
        canvasGradient;
      if (gradient._radial) {
        var radius = destination.getDistance(origin),
          highlight = components[3];
        if (highlight) {
          var vector = highlight.subtract(origin);
          if (vector.getLength() > radius)
            highlight = origin.add(vector.normalize(radius - 0.1));
        }
        var start = highlight || origin;
        canvasGradient = ctx.createRadialGradient(start.x, start.y,
            0, origin.x, origin.y, radius);
      } else {
        canvasGradient = ctx.createLinearGradient(origin.x, origin.y,
            destination.x, destination.y);
      }
      for (var i = 0, l = stops.length; i < l; i++) {
        var stop = stops[i];
        canvasGradient.addColorStop(stop._rampPoint,
            stop._color.toCanvasStyle());
      }
      return this._canvasStyle = canvasGradient;
    },

    transform: function(matrix) {
      if (this._type === 'gradient') {
        var components = this._components;
        for (var i = 1, l = components.length; i < l; i++) {
          var point = components[i];
          matrix._transformPoint(point, point, true);
        }
        this._changed();
      }
    },

    statics: {
      _types: types,

      random: function() {
        var random = Math.random;
        return new Color(random(), random(), random());
      }
    }
  });
}, new function() {
  var operators = {
    add: function(a, b) {
      return a + b;
    },

    subtract: function(a, b) {
      return a - b;
    },

    multiply: function(a, b) {
      return a * b;
    },

    divide: function(a, b) {
      return a / b;
    }
  };

  return Base.each(operators, function(operator, name) {
    this[name] = function(color) {
      color = Color.read(arguments);
      var type = this._type,
        components1 = this._components,
        components2 = color._convert(type);
      for (var i = 0, l = components1.length; i < l; i++)
        components2[i] = operator(components1[i], components2[i]);
      return new Color(type, components2,
          this._alpha != null
              ? operator(this._alpha, color.getAlpha())
              : null);
    };
  }, {
  });
});

Base.each(Color._types, function(properties, type) {
  var ctor = this[Base.capitalize(type) + 'Color'] = function(arg) {
      var argType = arg != null && typeof arg,
        components = argType === 'object' && arg.length != null
          ? arg
          : argType === 'string'
            ? null
            : arguments;
      return components
          ? new Color(type, components)
          : new Color(arg);
    };
  if (type.length == 3) {
    var acronym = type.toUpperCase();
    Color[acronym] = this[acronym + 'Color'] = ctor;
  }
}, Base.exports);

var Gradient = Base.extend({
  _class: 'Gradient',

  initialize: function Gradient(stops, radial) {
    this._id = Gradient._id = (Gradient._id || 0) + 1;
    if (stops && this._set(stops))
      stops = radial = null;
    if (!this._stops)
      this.setStops(stops || ['white', 'black']);
    if (this._radial == null)
      this.setRadial(typeof radial === 'string' && radial === 'radial'
          || radial || false);
  },

  _serialize: function(options, dictionary) {
    return dictionary.add(this, function() {
      return Base.serialize([this._stops, this._radial],
          options, true, dictionary);
    });
  },

  _changed: function() {
    for (var i = 0, l = this._owners && this._owners.length; i < l; i++)
      this._owners[i]._changed();
  },

  _addOwner: function(color) {
    if (!this._owners)
      this._owners = [];
    this._owners.push(color);
  },

  _removeOwner: function(color) {
    var index = this._owners ? this._owners.indexOf(color) : -1;
    if (index != -1) {
      this._owners.splice(index, 1);
      if (this._owners.length === 0)
        this._owners = undefined;
    }
  },

  clone: function() {
    var stops = [];
    for (var i = 0, l = this._stops.length; i < l; i++)
      stops[i] = this._stops[i].clone();
    return new Gradient(stops);
  },

  getStops: function() {
    return this._stops;
  },

  setStops: function(stops) {
    if (this.stops) {
      for (var i = 0, l = this._stops.length; i < l; i++)
        this._stops[i]._owner = undefined;
    }
    if (stops.length < 2)
      throw new Error(
          'Gradient stop list needs to contain at least two stops.');
    this._stops = GradientStop.readAll(stops, 0, { clone: true });
    for (var i = 0, l = this._stops.length; i < l; i++) {
      var stop = this._stops[i];
      stop._owner = this;
      if (stop._defaultRamp)
        stop.setRampPoint(i / (l - 1));
    }
    this._changed();
  },

  getRadial: function() {
    return this._radial;
  },

  setRadial: function(radial) {
    this._radial = radial;
    this._changed();
  },

  equals: function(gradient) {
    if (gradient === this)
      return true;
    if (gradient &&  this._class === gradient._class
        && this._stops.length === gradient._stops.length) {
      for (var i = 0, l = this._stops.length; i < l; i++) {
        if (!this._stops[i].equals(gradient._stops[i]))
          return false;
      }
      return true;
    }
    return false;
  }
});

var GradientStop = Base.extend({
  _class: 'GradientStop',

  initialize: function GradientStop(arg0, arg1) {
    if (arg0) {
      var color, rampPoint;
      if (arg1 === undefined && Array.isArray(arg0)) {
        color = arg0[0];
        rampPoint = arg0[1];
      } else if (arg0.color) {
        color = arg0.color;
        rampPoint = arg0.rampPoint;
      } else {
        color = arg0;
        rampPoint = arg1;
      }
      this.setColor(color);
      this.setRampPoint(rampPoint);
    }
  },

  clone: function() {
    return new GradientStop(this._color.clone(), this._rampPoint);
  },

  _serialize: function(options, dictionary) {
    return Base.serialize([this._color, this._rampPoint], options, true,
        dictionary);
  },

  _changed: function() {
    if (this._owner)
      this._owner._changed(65);
  },

  getRampPoint: function() {
    return this._rampPoint;
  },

  setRampPoint: function(rampPoint) {
    this._defaultRamp = rampPoint == null;
    this._rampPoint = rampPoint || 0;
    this._changed();
  },

  getColor: function() {
    return this._color;
  },

  setColor: function(color) {
    this._color = Color.read(arguments);
    if (this._color === color)
      this._color = color.clone();
    this._color._owner = this;
    this._changed();
  },

  equals: function(stop) {
    return stop === this || stop && this._class === stop._class
        && this._color.equals(stop._color)
        && this._rampPoint == stop._rampPoint
        || false;
  }
});

var Style = Base.extend(new function() {
  var defaults = {
    fillColor: undefined,
    strokeColor: undefined,
    strokeWidth: 1,
    strokeCap: 'butt',
    strokeJoin: 'miter',
    miterLimit: 10,
    dashOffset: 0,
    dashArray: [],
    windingRule: 'nonzero',
    shadowColor: undefined,
    shadowBlur: 0,
    shadowOffset: new Point(),
    selectedColor: undefined,
    fontFamily: 'sans-serif',
    fontWeight: 'normal',
    fontSize: 12,
    font: 'sans-serif', 
    leading: null,
    justification: 'left'
  };

  var flags = {
    strokeWidth: 97,
    strokeCap: 97,
    strokeJoin: 97,
    miterLimit: 97,
    fontFamily: 9,
    fontWeight: 9,
    fontSize: 9,
    font: 9, 
    leading: 9,
    justification: 9
  };

  var item = {},
    fields = {
      _defaults: defaults,
      _textDefaults: new Base(defaults, {
        fillColor: new Color() 
      }),
      beans: true
    };

  Base.each(defaults, function(value, key) {
    var isColor = /Color$/.test(key),
      part = Base.capitalize(key),
      flag = flags[key],
      set = 'set' + part,
      get = 'get' + part;

    fields[set] = function(value) {
      var owner = this._owner,
        children = owner && owner._children;
      if (children && children.length > 0
          && !(owner instanceof CompoundPath)) {
        for (var i = 0, l = children.length; i < l; i++)
          children[i]._style[set](value);
      } else {
        var old = this._values[key];
        if (old != value) {
          if (isColor) {
            if (old)
              old._owner = undefined;
            if (value && value.constructor === Color) {
              if (value._owner)
                value = value.clone();
              value._owner = owner;
            }
          }
          this._values[key] = value;
          if (owner)
            owner._changed(flag || 65);
        }
      }
    };

    fields[get] = function(_dontMerge) {
      var owner = this._owner,
        children = owner && owner._children,
        value;
      if (!children || children.length === 0 || _dontMerge
          || owner instanceof CompoundPath) {
        var value = this._values[key];
        if (value === undefined) {
          value = this._defaults[key];
          if (value && value.clone)
            value = value.clone();
          this._values[key] = value;
        } else if (isColor && !(value && value.constructor === Color)) {
          this._values[key] = value = Color.read([value], 0,
              { readNull: true, clone: true });
          if (value)
            value._owner = owner;
        }
        return value;
      }
      for (var i = 0, l = children.length; i < l; i++) {
        var childValue = children[i]._style[get]();
        if (i === 0) {
          value = childValue;
        } else if (!Base.equals(value, childValue)) {
          return undefined;
        }
      }
      return value;
    };

    item[get] = function() {
      return this._style[get]();
    };

    item[set] = function(value) {
      this._style[set](value);
    };
  });

  Item.inject(item);
  return fields;
}, {
  _class: 'Style',

  initialize: function Style(style, _owner, _project) {
    this._values = {};
    this._owner = _owner;
    this._project = _owner && _owner._project || _project || paper.project;
    if (_owner instanceof TextItem)
      this._defaults = this._textDefaults;
    if (style)
      this.set(style);
  },

  set: function(style) {
    var isStyle = style instanceof Style,
      values = isStyle ? style._values : style;
    if (values) {
      for (var key in values) {
        if (key in this._defaults) {
          var value = values[key];
          this[key] = value && isStyle && value.clone
              ? value.clone() : value;
        }
      }
    }
  },

  equals: function(style) {
    return style === this || style && this._class === style._class
        && Base.equals(this._values, style._values)
        || false;
  },

  hasFill: function() {
    return !!this.getFillColor();
  },

  hasStroke: function() {
    return !!this.getStrokeColor() && this.getStrokeWidth() > 0;
  },

  hasShadow: function() {
    return !!this.getShadowColor() && this.getShadowBlur() > 0;
  },

  getView: function() {
    return this._project.getView();
  },

  getFontStyle: function() {
    var fontSize = this.getFontSize();
    return this.getFontWeight()
        + ' ' + fontSize + (/[a-z]/i.test(fontSize + '') ? ' ' : 'px ')
        + this.getFontFamily();
  },

  getFont: '#getFontFamily',
  setFont: '#setFontFamily',

  getLeading: function getLeading() {
    var leading = getLeading.base.call(this),
      fontSize = this.getFontSize();
    if (/pt|em|%|px/.test(fontSize))
      fontSize = this.getView().getPixelSize(fontSize);
    return leading != null ? leading : fontSize * 1.2;
  }

});

var DomElement = new function() {

  var special = /^(checked|value|selected|disabled)$/i,
    translated = { text: 'textContent', html: 'innerHTML' },
    unitless = { lineHeight: 1, zoom: 1, zIndex: 1, opacity: 1 };

  function create(nodes, parent) {
    var res = [];
    for (var i =  0, l = nodes && nodes.length; i < l;) {
      var el = nodes[i++];
      if (typeof el === 'string') {
        el = document.createElement(el);
      } else if (!el || !el.nodeType) {
        continue;
      }
      if (Base.isPlainObject(nodes[i]))
        DomElement.set(el, nodes[i++]);
      if (Array.isArray(nodes[i]))
        create(nodes[i++], el);
      if (parent)
        parent.appendChild(el);
      res.push(el);
    }
    return res;
  }

  function handlePrefix(el, name, set, value) {
    var prefixes = ['webkit', 'moz', 'Moz', 'ms', 'o', ''],
      suffix = name[0].toUpperCase() + name.substring(1);
    for (var i = 0; i < 6; i++) {
      var prefix = prefixes[i],
        key = prefix ? prefix + suffix : name;
      if (key in el) {
        if (set) {
          el[key] = value;
        } else {
          return el[key];
        }
        break;
      }
    }
  }

  return {
    create: function(nodes, parent) {
      var isArray = Array.isArray(nodes),
        res = create(isArray ? nodes : arguments, isArray ? parent : null);
      return res.length == 1 ? res[0] : res;
    },

    find: function(selector, root) {
      return (root || document).querySelector(selector);
    },

    findAll: function(selector, root) {
      return (root || document).querySelectorAll(selector);
    },

    get: function(el, key) {
      return el
        ? special.test(key)
          ? key === 'value' || typeof el[key] !== 'string'
            ? el[key]
            : true
          : key in translated
            ? el[translated[key]]
            : el.getAttribute(key)
        : null;
    },

    set: function(el, key, value) {
      if (typeof key !== 'string') {
        for (var name in key)
          if (key.hasOwnProperty(name))
            this.set(el, name, key[name]);
      } else if (!el || value === undefined) {
        return el;
      } else if (special.test(key)) {
        el[key] = value;
      } else if (key in translated) {
        el[translated[key]] = value;
      } else if (key === 'style') {
        this.setStyle(el, value);
      } else if (key === 'events') {
        DomEvent.add(el, value);
      } else {
        el.setAttribute(key, value);
      }
      return el;
    },

    getStyles: function(el) {
      var doc = el && el.nodeType !== 9 ? el.ownerDocument : el,
        view = doc && doc.defaultView;
      return view && view.getComputedStyle(el, '');
    },

    getStyle: function(el, key) {
      return el && el.style[key] || this.getStyles(el)[key] || null;
    },

    setStyle: function(el, key, value) {
      if (typeof key !== 'string') {
        for (var name in key)
          if (key.hasOwnProperty(name))
            this.setStyle(el, name, key[name]);
      } else {
        if (/^-?[\d\.]+$/.test(value) && !(key in unitless))
          value += 'px';
        el.style[key] = value;
      }
      return el;
    },

    hasClass: function(el, cls) {
      return new RegExp('\\s*' + cls + '\\s*').test(el.className);
    },

    addClass: function(el, cls) {
      el.className = (el.className + ' ' + cls).trim();
    },

    removeClass: function(el, cls) {
      el.className = el.className.replace(
        new RegExp('\\s*' + cls + '\\s*'), ' ').trim();
    },

    remove: function(el) {
      if (el.parentNode)
        el.parentNode.removeChild(el);
    },

    removeChildren: function(el) {
      while (el.firstChild)
        el.removeChild(el.firstChild);
    },

    getBounds: function(el, viewport) {
      var doc = el.ownerDocument,
        body = doc.body,
        html = doc.documentElement,
        rect;
      try {
        rect = el.getBoundingClientRect();
      } catch (e) {
        rect = { left: 0, top: 0, width: 0, height: 0 };
      }
      var x = rect.left - (html.clientLeft || body.clientLeft || 0),
        y = rect.top - (html.clientTop  || body.clientTop  || 0);
      if (!viewport) {
        var view = doc.defaultView;
        x += view.pageXOffset || html.scrollLeft || body.scrollLeft;
        y += view.pageYOffset || html.scrollTop || body.scrollTop;
      }
      return new Rectangle(x, y, rect.width, rect.height);
    },

    getViewportBounds: function(el) {
      var doc = el.ownerDocument,
        view = doc.defaultView,
        html = doc.documentElement;
      return new Rectangle(0, 0,
        view.innerWidth || html.clientWidth,
        view.innerHeight || html.clientHeight
      );
    },

    getOffset: function(el, viewport) {
      return this.getBounds(el, viewport).getPoint();
    },

    getSize: function(el) {
      return this.getBounds(el, true).getSize();
    },

    isInvisible: function(el) {
      return this.getSize(el).equals(new Size(0, 0));
    },

    isInView: function(el) {
      return !this.isInvisible(el) && this.getViewportBounds(el).intersects(
          this.getBounds(el, true));
    },

    getPrefixed: function(el, name) {
      return handlePrefix(el, name);
    },

    setPrefixed: function(el, name, value) {
      if (typeof name === 'object') {
        for (var key in name)
          handlePrefix(el, key, true, name[key]);
      } else {
        handlePrefix(el, name, true, value);
      }
    }
  };
};

var DomEvent = {
  add: function(el, events) {
    for (var type in events) {
      var func = events[type],
        parts = type.split(/[\s,]+/g);
      for (var i = 0, l = parts.length; i < l; i++)
        el.addEventListener(parts[i], func, false);
    }
  },

  remove: function(el, events) {
    for (var type in events) {
      var func = events[type],
        parts = type.split(/[\s,]+/g);
      for (var i = 0, l = parts.length; i < l; i++)
        el.removeEventListener(parts[i], func, false);
    }
  },

  getPoint: function(event) {
    var pos = event.targetTouches
        ? event.targetTouches.length
          ? event.targetTouches[0]
          : event.changedTouches[0]
        : event;
    return new Point(
      pos.pageX || pos.clientX + document.documentElement.scrollLeft,
      pos.pageY || pos.clientY + document.documentElement.scrollTop
    );
  },

  getTarget: function(event) {
    return event.target || event.srcElement;
  },

  getRelatedTarget: function(event) {
    return event.relatedTarget || event.toElement;
  },

  getOffset: function(event, target) {
    return DomEvent.getPoint(event).subtract(DomElement.getOffset(
        target || DomEvent.getTarget(event)));
  },

  stop: function(event) {
    event.stopPropagation();
    event.preventDefault();
  }
};

DomEvent.requestAnimationFrame = new function() {
  var nativeRequest = DomElement.getPrefixed(window, 'requestAnimationFrame'),
    requested = false,
    callbacks = [],
    focused = true,
    timer;

  DomEvent.add(window, {
    focus: function() {
      focused = true;
    },
    blur: function() {
      focused = false;
    }
  });

  function handleCallbacks() {
    for (var i = callbacks.length - 1; i >= 0; i--) {
      var entry = callbacks[i],
        func = entry[0],
        el = entry[1];
      if (!el || (PaperScope.getAttribute(el, 'keepalive') == 'true'
          || focused) && DomElement.isInView(el)) {
        callbacks.splice(i, 1);
        func();
      }
    }
    if (nativeRequest) {
      if (callbacks.length) {
        nativeRequest(handleCallbacks);
      } else {
        requested = false;
      }
    }
  }

  return function(callback, element) {
    callbacks.push([callback, element]);
    if (nativeRequest) {
      if (!requested) {
        nativeRequest(handleCallbacks);
        requested = true;
      }
    } else if (!timer) {
      timer = setInterval(handleCallbacks, 1000 / 60);
    }
  };
};

var View = Base.extend(Callback, {
  _class: 'View',

  initialize: function View(project, element) {
    this._project = project;
    this._scope = project._scope;
    this._element = element;
    var size;
    if (!this._pixelRatio)
      this._pixelRatio = window.devicePixelRatio || 1;
    this._id = element.getAttribute('id');
    if (this._id == null)
      element.setAttribute('id', this._id = 'view-' + View._id++);
    DomEvent.add(element, this._viewEvents);
    var none = 'none';
    DomElement.setPrefixed(element.style, {
      userSelect: none,
      touchAction: none,
      touchCallout: none,
      contentZooming: none,
      userDrag: none,
      tapHighlightColor: 'rgba(0,0,0,0)'
    });
    if (PaperScope.hasAttribute(element, 'resize')) {
      var offset = DomElement.getOffset(element, true),
        that = this;
      size = DomElement.getViewportBounds(element)
          .getSize().subtract(offset);
      this._windowEvents = {
        resize: function() {
          if (!DomElement.isInvisible(element))
            offset = DomElement.getOffset(element, true);
          that.setViewSize(DomElement.getViewportBounds(element)
              .getSize().subtract(offset));
        }
      };
      DomEvent.add(window, this._windowEvents);
    } else {
      size = DomElement.getSize(element);
      if (size.isNaN() || size.isZero()) {
        var getSize = function(name) {
          return element[name]
              || parseInt(element.getAttribute(name), 10);
        };
        size = new Size(getSize('width'), getSize('height'));
      }
    }
    this._setViewSize(size);
    if (PaperScope.hasAttribute(element, 'stats')
        && typeof Stats !== 'undefined') {
      this._stats = new Stats();
      var stats = this._stats.domElement,
        style = stats.style,
        offset = DomElement.getOffset(element);
      style.position = 'absolute';
      style.left = offset.x + 'px';
      style.top = offset.y + 'px';
      document.body.appendChild(stats);
    }
    View._views.push(this);
    View._viewsById[this._id] = this;
    this._viewSize = size;
    (this._matrix = new Matrix())._owner = this;
    this._zoom = 1;
    if (!View._focused)
      View._focused = this;
    this._frameItems = {};
    this._frameItemCount = 0;
  },

  remove: function() {
    if (!this._project)
      return false;
    if (View._focused === this)
      View._focused = null;
    View._views.splice(View._views.indexOf(this), 1);
    delete View._viewsById[this._id];
    if (this._project._view === this)
      this._project._view = null;
    DomEvent.remove(this._element, this._viewEvents);
    DomEvent.remove(window, this._windowEvents);
    this._element = this._project = null;
    this.detach('frame');
    this._animate = false;
    this._frameItems = {};
    return true;
  },

  _events: {
    onFrame: {
      install: function() {
        this.play();
      },

      uninstall: function() {
        this.pause();
      }
    },

    onResize: {}
  },

  _animate: false,
  _time: 0,
  _count: 0,

  _requestFrame: function() {
    var that = this;
    DomEvent.requestAnimationFrame(function() {
      that._requested = false;
      if (!that._animate)
        return;
      that._requestFrame();
      that._handleFrame();
    }, this._element);
    this._requested = true;
  },

  _handleFrame: function() {
    paper = this._scope;
    var now = Date.now() / 1000,
      delta = this._before ? now - this._before : 0;
    this._before = now;
    this._handlingFrame = true;
    this.fire('frame', new Base({
      delta: delta,
      time: this._time += delta,
      count: this._count++
    }));
    if (this._stats)
      this._stats.update();
    this._handlingFrame = false;
    this.update();
  },

  _animateItem: function(item, animate) {
    var items = this._frameItems;
    if (animate) {
      items[item._id] = {
        item: item,
        time: 0,
        count: 0
      };
      if (++this._frameItemCount === 1)
        this.attach('frame', this._handleFrameItems);
    } else {
      delete items[item._id];
      if (--this._frameItemCount === 0) {
        this.detach('frame', this._handleFrameItems);
      }
    }
  },

  _handleFrameItems: function(event) {
    for (var i in this._frameItems) {
      var entry = this._frameItems[i];
      entry.item.fire('frame', new Base(event, {
        time: entry.time += event.delta,
        count: entry.count++
      }));
    }
  },

  _update: function() {
    this._project._needsUpdate = true;
    if (this._handlingFrame)
      return;
    if (this._animate) {
      this._handleFrame();
    } else {
      this.update();
    }
  },

  _changed: function(flags) {
    if (flags & 1)
      this._project._needsUpdate = true;
  },

  _transform: function(matrix) {
    this._matrix.concatenate(matrix);
    this._bounds = null;
    this._update();
  },

  getElement: function() {
    return this._element;
  },

  getPixelRatio: function() {
    return this._pixelRatio;
  },

  getResolution: function() {
    return this._pixelRatio * 72;
  },

  getViewSize: function() {
    var size = this._viewSize;
    return new LinkedSize(size.width, size.height, this, 'setViewSize');
  },

  setViewSize: function() {
    var size = Size.read(arguments),
      delta = size.subtract(this._viewSize);
    if (delta.isZero())
      return;
    this._viewSize.set(size.width, size.height);
    this._setViewSize(size);
    this._bounds = null; 
    this.fire('resize', {
      size: size,
      delta: delta
    });
    this._update();
  },

  _setViewSize: function(size) {
    var element = this._element;
    element.width = size.width;
    element.height = size.height;
  },

  getBounds: function() {
    if (!this._bounds)
      this._bounds = this._matrix.inverted()._transformBounds(
          new Rectangle(new Point(), this._viewSize));
    return this._bounds;
  },

  getSize: function() {
    return this.getBounds().getSize();
  },

  getCenter: function() {
    return this.getBounds().getCenter();
  },

  setCenter: function(center) {
    center = Point.read(arguments);
    this.scrollBy(center.subtract(this.getCenter()));
  },

  getZoom: function() {
    return this._zoom;
  },

  setZoom: function(zoom) {
    this._transform(new Matrix().scale(zoom / this._zoom,
      this.getCenter()));
    this._zoom = zoom;
  },

  isVisible: function() {
    return DomElement.isInView(this._element);
  },

  scrollBy: function() {
    this._transform(new Matrix().translate(Point.read(arguments).negate()));
  },

  play: function() {
    this._animate = true;
    if (!this._requested)
      this._requestFrame();
  },

  pause: function() {
    this._animate = false;
  },

  draw: function() {
    this.update();
  },

  projectToView: function() {
    return this._matrix._transformPoint(Point.read(arguments));
  },

  viewToProject: function() {
    return this._matrix._inverseTransform(Point.read(arguments));
  }

}, {
  statics: {
    _views: [],
    _viewsById: {},
    _id: 0,

    create: function(project, element) {
      if (typeof element === 'string')
        element = document.getElementById(element);
      return new CanvasView(project, element);
    }
  }
}, new function() {
  var tool,
    prevFocus,
    tempFocus,
    dragging = false;

  function getView(event) {
    var target = DomEvent.getTarget(event);
    return target.getAttribute && View._viewsById[target.getAttribute('id')];
  }

  function viewToProject(view, event) {
    return view.viewToProject(DomEvent.getOffset(event, view._element));
  }

  function updateFocus() {
    if (!View._focused || !View._focused.isVisible()) {
      for (var i = 0, l = View._views.length; i < l; i++) {
        var view = View._views[i];
        if (view && view.isVisible()) {
          View._focused = tempFocus = view;
          break;
        }
      }
    }
  }

  function handleMouseMove(view, point, event) {
    view._handleEvent('mousemove', point, event);
    var tool = view._scope.tool;
    if (tool) {
      tool._handleEvent(dragging && tool.responds('mousedrag')
          ? 'mousedrag' : 'mousemove', point, event);
    }
    view.update();
    return tool;
  }

  var navigator = window.navigator,
    mousedown, mousemove, mouseup;
  if (navigator.pointerEnabled || navigator.msPointerEnabled) {
    mousedown = 'pointerdown MSPointerDown';
    mousemove = 'pointermove MSPointerMove';
    mouseup = 'pointerup pointercancel MSPointerUp MSPointerCancel';
  } else {
    mousedown = 'touchstart';
    mousemove = 'touchmove';
    mouseup = 'touchend touchcancel';
    if (!('ontouchstart' in window && navigator.userAgent.match(
        /mobile|tablet|ip(ad|hone|od)|android|silk/i))) {
      mousedown += ' mousedown';
      mousemove += ' mousemove';
      mouseup += ' mouseup';
    }
  }

  var viewEvents = {
    'selectstart dragstart': function(event) {
      if (dragging)
        event.preventDefault();
    }
  };

  var docEvents = {
    mouseout: function(event) {
      var view = View._focused,
        target = DomEvent.getRelatedTarget(event);
      if (view && (!target || target.nodeName === 'HTML'))
        handleMouseMove(view, viewToProject(view, event), event);
    },

    scroll: updateFocus
  };

  viewEvents[mousedown] = function(event) {
    var view = View._focused = getView(event),
      point = viewToProject(view, event);
    dragging = true;
    view._handleEvent('mousedown', point, event);
    if (tool = view._scope.tool)
      tool._handleEvent('mousedown', point, event);
    view.update();
  };

  docEvents[mousemove] = function(event) {
    var view = View._focused;
    if (!dragging) {
      var target = getView(event);
      if (target) {
        if (view !== target)
          handleMouseMove(view, viewToProject(view, event), event);
        prevFocus = view;
        view = View._focused = tempFocus = target;
      } else if (tempFocus && tempFocus === view) {
        view = View._focused = prevFocus;
        updateFocus();
      }
    }
    if (view) {
      var point = viewToProject(view, event);
      if (dragging || view.getBounds().contains(point))
        tool = handleMouseMove(view, point, event);
    }
  };

  docEvents[mouseup] = function(event) {
    var view = View._focused;
    if (!view || !dragging)
      return;
    var point = viewToProject(view, event);
    dragging = false;
    view._handleEvent('mouseup', point, event);
    if (tool)
      tool._handleEvent('mouseup', point, event);
    view.update();
  };

  DomEvent.add(document, docEvents);

  DomEvent.add(window, {
    load: updateFocus
  });

  return {
    _viewEvents: viewEvents,

    _handleEvent: function() {},

    statics: {
      updateFocus: updateFocus
    }
  };
});

var CanvasView = View.extend({
  _class: 'CanvasView',

  initialize: function CanvasView(project, canvas) {
    if (!(canvas instanceof HTMLCanvasElement)) {
      var size = Size.read(arguments);
      if (size.isZero())
        throw new Error(
            'Cannot create CanvasView with the provided argument: '
            + canvas);
      canvas = CanvasProvider.getCanvas(size);
    }
    this._context = canvas.getContext('2d');
    this._eventCounters = {};
    this._pixelRatio = 1;
    if (PaperScope.getAttribute(canvas, 'hidpi') !== 'off') {
      var deviceRatio = window.devicePixelRatio || 1,
        backingStoreRatio = DomElement.getPrefixed(this._context,
            'backingStorePixelRatio') || 1;
      this._pixelRatio = deviceRatio / backingStoreRatio;
    }
    View.call(this, project, canvas);
  },

  _setViewSize: function(size) {
    var width = size.width,
      height = size.height,
      pixelRatio = this._pixelRatio,
      element = this._element,
      style = element.style;
    element.width = width * pixelRatio;
    element.height = height * pixelRatio;
    if (pixelRatio !== 1) {
      style.width = width + 'px';
      style.height = height + 'px';
      this._context.scale(pixelRatio, pixelRatio);
    }
  },

  getPixelSize: function(size) {
    var ctx = this._context,
      prevFont = ctx.font;
    ctx.font = size + ' serif';
    size = parseFloat(ctx.font);
    ctx.font = prevFont;
    return size;
  },

  getTextWidth: function(font, lines) {
    var ctx = this._context,
      prevFont = ctx.font,
      width = 0;
    ctx.font = font;
    for (var i = 0, l = lines.length; i < l; i++)
      width = Math.max(width, ctx.measureText(lines[i]).width);
    ctx.font = prevFont;
    return width;
  },

  update: function() {
    var project = this._project;
    if (!project || !project._needsUpdate)
      return false;
    var ctx = this._context,
      size = this._viewSize;
    ctx.clearRect(0, 0, size.width + 1, size.height + 1);
    project.draw(ctx, this._matrix, this._pixelRatio);
    project._needsUpdate = false;
    return true;
  }
}, new function() { 

  var downPoint,
    lastPoint,
    overPoint,
    downItem,
    lastItem,
    overItem,
    dragItem,
    dblClick,
    clickTime;

  function callEvent(view, type, event, point, target, lastPoint) {
    var item = target,
      mouseEvent;

    function call(obj) {
      if (obj.responds(type)) {
        if (!mouseEvent) {
          mouseEvent = new MouseEvent(type, event, point, target,
              lastPoint ? point.subtract(lastPoint) : null);
        }
        if (obj.fire(type, mouseEvent) && mouseEvent.isStopped) {
          event.preventDefault();
          return true;
        }
      }
    }

    while (item) {
      if (call(item))
        return true;
      item = item.getParent();
    }
    if (call(view))
      return true;
    return false;
  }

  return {
    _handleEvent: function(type, point, event) {
      if (!this._eventCounters[type])
        return;
      var project = this._project,
        hit = project.hitTest(point, {
          tolerance: this._scope.settings.hitTolerance,
          fill: true,
          stroke: true
        }),
        item = hit && hit.item,
        stopped = false;
      switch (type) {
      case 'mousedown':
        stopped = callEvent(this, type, event, point, item);
        dblClick = lastItem == item && (Date.now() - clickTime < 300);
        downItem = lastItem = item;
        downPoint = lastPoint = overPoint = point;
        dragItem = !stopped && item;
        while (dragItem && !dragItem.responds('mousedrag'))
          dragItem = dragItem._parent;
        break;
      case 'mouseup':
        stopped = callEvent(this, type, event, point, item, downPoint);
        if (dragItem) {
          if (lastPoint && !lastPoint.equals(point))
            callEvent(this, 'mousedrag', event, point, dragItem,
                lastPoint);
          if (item !== dragItem) {
            overPoint = point;
            callEvent(this, 'mousemove', event, point, item,
                overPoint);
          }
        }
        if (!stopped && item && item === downItem) {
          clickTime = Date.now();
          callEvent(this, dblClick && downItem.responds('doubleclick')
              ? 'doubleclick' : 'click', event, downPoint, item);
          dblClick = false;
        }
        downItem = dragItem = null;
        break;
      case 'mousemove':
        if (dragItem)
          stopped = callEvent(this, 'mousedrag', event, point,
              dragItem, lastPoint);
        if (!stopped) {
          if (item !== overItem)
            overPoint = point;
          stopped = callEvent(this, type, event, point, item,
              overPoint);
        }
        lastPoint = overPoint = point;
        if (item !== overItem) {
          callEvent(this, 'mouseleave', event, point, overItem);
          overItem = item;
          callEvent(this, 'mouseenter', event, point, item);
        }
        break;
      }
      return stopped;
    }
  };
});

var Event = Base.extend({
  _class: 'Event',

  initialize: function Event(event) {
    this.event = event;
  },

  isPrevented: false,
  isStopped: false,

  preventDefault: function() {
    this.isPrevented = true;
    this.event.preventDefault();
  },

  stopPropagation: function() {
    this.isStopped = true;
    this.event.stopPropagation();
  },

  stop: function() {
    this.stopPropagation();
    this.preventDefault();
  },

  getModifiers: function() {
    return Key.modifiers;
  }
});

var KeyEvent = Event.extend({
  _class: 'KeyEvent',

  initialize: function KeyEvent(down, key, character, event) {
    Event.call(this, event);
    this.type = down ? 'keydown' : 'keyup';
    this.key = key;
    this.character = character;
  },

  toString: function() {
    return "{ type: '" + this.type
        + "', key: '" + this.key
        + "', character: '" + this.character
        + "', modifiers: " + this.getModifiers()
        + " }";
  }
});

var Key = new function() {

  var specialKeys = {
    8: 'backspace',
    9: 'tab',
    13: 'enter',
    16: 'shift',
    17: 'control',
    18: 'option',
    19: 'pause',
    20: 'caps-lock',
    27: 'escape',
    32: 'space',
    35: 'end',
    36: 'home',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    46: 'delete',
    91: 'command',
    93: 'command', 
    224: 'command'  
  },

  specialChars = {
    9: true, 
    13: true, 
    32: true 
  },

  modifiers = new Base({
    shift: false,
    control: false,
    option: false,
    command: false,
    capsLock: false,
    space: false
  }),

  charCodeMap = {}, 
  keyMap = {}, 
  downCode; 

  function handleKey(down, keyCode, charCode, event) {
    var character = charCode ? String.fromCharCode(charCode) : '',
      specialKey = specialKeys[keyCode],
      key = specialKey || character.toLowerCase(),
      type = down ? 'keydown' : 'keyup',
      view = View._focused,
      scope = view && view.isVisible() && view._scope,
      tool = scope && scope.tool,
      name;
    keyMap[key] = down;
    if (specialKey && (name = Base.camelize(specialKey)) in modifiers)
      modifiers[name] = down;
    if (down) {
      charCodeMap[keyCode] = charCode;
    } else {
      delete charCodeMap[keyCode];
    }
    if (tool && tool.responds(type)) {
      paper = scope;
      tool.fire(type, new KeyEvent(down, key, character, event));
      if (view)
        view.update();
    }
  }

  DomEvent.add(document, {
    keydown: function(event) {
      var code = event.which || event.keyCode;
      if (code in specialKeys || modifiers.command) {
        handleKey(true, code,
            code in specialChars || modifiers.command ? code : 0,
            event);
      } else {
        downCode = code;
      }
    },

    keypress: function(event) {
      if (downCode != null) {
        handleKey(true, downCode, event.which || event.keyCode, event);
        downCode = null;
      }
    },

    keyup: function(event) {
      var code = event.which || event.keyCode;
      if (code in charCodeMap)
        handleKey(false, code, charCodeMap[code], event);
    }
  });

  DomEvent.add(window, {
    blur: function(event) {
      for (var code in charCodeMap)
        handleKey(false, code, charCodeMap[code], event);
    }
  });

  return {
    modifiers: modifiers,

    isDown: function(key) {
      return !!keyMap[key];
    }
  };
};

var MouseEvent = Event.extend({
  _class: 'MouseEvent',

  initialize: function MouseEvent(type, event, point, target, delta) {
    Event.call(this, event);
    this.type = type;
    this.point = point;
    this.target = target;
    this.delta = delta;
  },

  toString: function() {
    return "{ type: '" + this.type
        + "', point: " + this.point
        + ', target: ' + this.target
        + (this.delta ? ', delta: ' + this.delta : '')
        + ', modifiers: ' + this.getModifiers()
        + ' }';
  }
});

 Base.extend(Callback, {
  _class: 'Palette',
  _events: [ 'onChange' ],

  initialize: function Palette(title, components, values) {
    var parent = DomElement.find('.palettejs-panel')
      || DomElement.find('body').appendChild(
        DomElement.create('div', { 'class': 'palettejs-panel' }));
    this._element = parent.appendChild(
      DomElement.create('table', { 'class': 'palettejs-pane' }));
    this._title = title;
    if (!values)
      values = {};
    for (var name in (this.components = components)) {
      var component = components[name];
      if (!(component instanceof Component)) {
        if (component.value == null)
          component.value = values[name];
        component.name = name;
        component = components[name] = new Component(component);
      }
      this._element.appendChild(component._element);
      component._palette = this;
      if (values[name] === undefined)
        values[name] = component.value;
    }
    this.values = Base.each(values, function(value, name) {
      var component = components[name];
      if (component) {
        Base.define(values, name, {
          enumerable: true,
          configurable: true,
          get: function() {
            return component._value;
          },
          set: function(val) {
            component.setValue(val);
          }
        });
      }
    });
    if (window.paper)
      paper.palettes.push(this);
  },

  reset: function() {
    for (var i in this.components)
      this.components[i].reset();
  },

  remove: function() {
    DomElement.remove(this._element);
  }
});

var Component = Base.extend(Callback, {
  _class: 'Component',
  _events: [ 'onChange', 'onClick' ],

  _types: {
    'boolean': {
      type: 'checkbox',
      value: 'checked'
    },

    string: {
      type: 'text'
    },

    number: {
      type: 'number',
      number: true
    },

    button: {
      type: 'button'
    },

    text: {
      tag: 'div',
      value: 'text'
    },

    slider: {
      type: 'range',
      number: true
    },

    list: {
      tag: 'select',

      setOptions: function() {
        DomElement.removeChildren(this._input);
        DomElement.create(Base.each(this._options, function(option) {
          this.push('option', { value: option, text: option });
        }, []), this._input);
      }
    },

    color: {
      type: 'color',

      getValue: function(value) {
        return new Color(value);
      },

      setValue: function(value) {
        return new Color(value).toCSS(
            DomElement.get(this._input, 'type') === 'color');
      }
    }
  },

  initialize: function Component(obj) {
    this._id = Component._id = (Component._id || 0) + 1;
    this._type = obj.type in this._types
      ? obj.type
      : 'options' in obj
        ? 'list'
        : 'onClick' in obj
          ? 'button'
          : typeof obj.value;
    this._meta = this._types[this._type] || { type: this._type };
    var that = this,
      id = 'component-' + this._id;
    this._dontFire = true;
    this._input = DomElement.create(this._meta.tag || 'input', {
      id: id,
      type: this._meta.type,
      events: {
        change: function() {
          that.setValue(
            DomElement.get(this, that._meta.value || 'value'));
        },
        click: function() {
          that.fire('click');
        }
      }
    });
    this.attach('change', function(value) {
      if (!this._dontFire)
        this._palette.fire('change', this, this.name, value);
    });
    this._element = DomElement.create('tr', [
      'td', [this._label = DomElement.create('label', { 'for': id })],
      'td', [this._input]
    ]);
    Base.each(obj, function(value, key) {
      this[key] = value;
    }, this);
    this._defaultValue = this._value;
    this._dontFire = false;
  },

  getType: function() {
    return this._type;
  },

  getLabel: function() {
    return this.__label;
  },

  setLabel: function(label) {
    this.__label = label;
    DomElement.set(this._label, 'text', label + ':');
  },

  getOptions: function() {
    return this._options;
  },

  setOptions: function(options) {
    this._options = options;
    var setOptions = this._meta.setOptions;
    if (setOptions)
      setOptions.call(this);
  },

  getValue: function() {
    var value = this._value,
      getValue = this._meta.getValue;
    return getValue ? getValue.call(this, value) : value;
  },

  setValue: function(value) {
    var key = this._meta.value || 'value',
      setValue = this._meta.setValue;
    if (setValue)
      value = setValue.call(this, value);
    DomElement.set(this._input, key, value);
    value = DomElement.get(this._input, key);
    if (this._meta.number)
      value = parseFloat(value, 10);
    if (this._value !== value) {
      this._value = value;
      if (!this._dontFire)
        this.fire('change', this.getValue());
    }
  },

  getRange: function() {
    return [parseFloat(DomElement.get(this._input, 'min')),
        parseFloat(DomElement.get(this._input, 'max'))];
  },

  setRange: function(min, max) {
    var range = Array.isArray(min) ? min : [min, max];
    DomElement.set(this._input, { min: range[0], max: range[1] });
  },

  getMin: function() {
    return this.getRange()[0];
  },

  setMin: function(min) {
    this.setRange(min, this.getMax());
  },

  getMax: function() {
    return this.getRange()[1];
  },

  setMax: function(max) {
    this.setRange(this.getMin(), max);
  },

  getStep: function() {
    return parseFloat(DomElement.get(this._input, 'step'));
  },

  setStep: function(step) {
    DomElement.set(this._input, 'step', step);
  },

  reset: function() {
    this.setValue(this._defaultValue);
  }
});

var ToolEvent = Event.extend({
  _class: 'ToolEvent',
  _item: null,

  initialize: function ToolEvent(tool, type, event) {
    this.tool = tool;
    this.type = type;
    this.event = event;
  },

  _choosePoint: function(point, toolPoint) {
    return point ? point : toolPoint ? toolPoint.clone() : null;
  },

  getPoint: function() {
    return this._choosePoint(this._point, this.tool._point);
  },

  setPoint: function(point) {
    this._point = point;
  },

  getLastPoint: function() {
    return this._choosePoint(this._lastPoint, this.tool._lastPoint);
  },

  setLastPoint: function(lastPoint) {
    this._lastPoint = lastPoint;
  },

  getDownPoint: function() {
    return this._choosePoint(this._downPoint, this.tool._downPoint);
  },

  setDownPoint: function(downPoint) {
    this._downPoint = downPoint;
  },

  getMiddlePoint: function() {
    if (!this._middlePoint && this.tool._lastPoint) {
      return this.tool._point.add(this.tool._lastPoint).divide(2);
    }
    return this._middlePoint;
  },

  setMiddlePoint: function(middlePoint) {
    this._middlePoint = middlePoint;
  },

  getDelta: function() {
    return !this._delta && this.tool._lastPoint
        ? this.tool._point.subtract(this.tool._lastPoint)
        : this._delta;
  },

  setDelta: function(delta) {
    this._delta = delta;
  },

  getCount: function() {
    return /^mouse(down|up)$/.test(this.type)
        ? this.tool._downCount
        : this.tool._count;
  },

  setCount: function(count) {
    this.tool[/^mouse(down|up)$/.test(this.type) ? 'downCount' : 'count']
      = count;
  },

  getItem: function() {
    if (!this._item) {
      var result = this.tool._scope.project.hitTest(this.getPoint());
      if (result) {
        var item = result.item,
          parent = item._parent;
        while (/^(Group|CompoundPath)$/.test(parent._class)) {
          item = parent;
          parent = parent._parent;
        }
        this._item = item;
      }
    }
    return this._item;
  },

  setItem: function(item) {
    this._item = item;
  },

  toString: function() {
    return '{ type: ' + this.type
        + ', point: ' + this.getPoint()
        + ', count: ' + this.getCount()
        + ', modifiers: ' + this.getModifiers()
        + ' }';
  }
});

var Tool = PaperScopeItem.extend({
  _class: 'Tool',
  _list: 'tools',
  _reference: 'tool',
  _events: [ 'onActivate', 'onDeactivate', 'onEditOptions',
      'onMouseDown', 'onMouseUp', 'onMouseDrag', 'onMouseMove',
      'onKeyDown', 'onKeyUp' ],

  initialize: function Tool(props) {
    PaperScopeItem.call(this);
    this._firstMove = true;
    this._count = 0;
    this._downCount = 0;
    this._set(props);
  },

  getMinDistance: function() {
    return this._minDistance;
  },

  setMinDistance: function(minDistance) {
    this._minDistance = minDistance;
    if (this._minDistance != null && this._maxDistance != null
        && this._minDistance > this._maxDistance) {
      this._maxDistance = this._minDistance;
    }
  },

  getMaxDistance: function() {
    return this._maxDistance;
  },

  setMaxDistance: function(maxDistance) {
    this._maxDistance = maxDistance;
    if (this._minDistance != null && this._maxDistance != null
        && this._maxDistance < this._minDistance) {
      this._minDistance = maxDistance;
    }
  },

  getFixedDistance: function() {
    return this._minDistance == this._maxDistance
      ? this._minDistance : null;
  },

  setFixedDistance: function(distance) {
    this._minDistance = distance;
    this._maxDistance = distance;
  },

  _updateEvent: function(type, point, minDistance, maxDistance, start,
      needsChange, matchMaxDistance) {
    if (!start) {
      if (minDistance != null || maxDistance != null) {
        var minDist = minDistance != null ? minDistance : 0,
          vector = point.subtract(this._point),
          distance = vector.getLength();
        if (distance < minDist)
          return false;
        var maxDist = maxDistance != null ? maxDistance : 0;
        if (maxDist != 0) {
          if (distance > maxDist) {
            point = this._point.add(vector.normalize(maxDist));
          } else if (matchMaxDistance) {
            return false;
          }
        }
      }
      if (needsChange && point.equals(this._point))
        return false;
    }
    this._lastPoint = start && type == 'mousemove' ? point : this._point;
    this._point = point;
    switch (type) {
    case 'mousedown':
      this._lastPoint = this._downPoint;
      this._downPoint = this._point;
      this._downCount++;
      break;
    case 'mouseup':
      this._lastPoint = this._downPoint;
      break;
    }
    this._count = start ? 0 : this._count + 1;
    return true;
  },

  _fireEvent: function(type, event) {
    var sets = paper.project._removeSets;
    if (sets) {
      if (type === 'mouseup')
        sets.mousedrag = null;
      var set = sets[type];
      if (set) {
        for (var id in set) {
          var item = set[id];
          for (var key in sets) {
            var other = sets[key];
            if (other && other != set)
              delete other[item._id];
          }
          item.remove();
        }
        sets[type] = null;
      }
    }
    return this.responds(type)
        && this.fire(type, new ToolEvent(this, type, event));
  },

  _handleEvent: function(type, point, event) {
    paper = this._scope;
    var called = false;
    switch (type) {
    case 'mousedown':
      this._updateEvent(type, point, null, null, true, false, false);
      called = this._fireEvent(type, event);
      break;
    case 'mousedrag':
      var needsChange = false,
        matchMaxDistance = false;
      while (this._updateEvent(type, point, this.minDistance,
          this.maxDistance, false, needsChange, matchMaxDistance)) {
        called = this._fireEvent(type, event) || called;
        needsChange = true;
        matchMaxDistance = true;
      }
      break;
    case 'mouseup':
      if (!point.equals(this._point)
          && this._updateEvent('mousedrag', point, this.minDistance,
              this.maxDistance, false, false, false)) {
        called = this._fireEvent('mousedrag', event);
      }
      this._updateEvent(type, point, null, this.maxDistance, false,
          false, false);
      called = this._fireEvent(type, event) || called;
      this._updateEvent(type, point, null, null, true, false, false);
      this._firstMove = true;
      break;
    case 'mousemove':
      while (this._updateEvent(type, point, this.minDistance,
          this.maxDistance, this._firstMove, true, false)) {
        called = this._fireEvent(type, event) || called;
        this._firstMove = false;
      }
      break;
    }
    if (called)
      event.preventDefault();
    return called;
  }

});

var Http = {
  request: function(method, url, callback) {
    var xhr = new (window.ActiveXObject || XMLHttpRequest)(
          'Microsoft.XMLHTTP');
    xhr.open(method.toUpperCase(), url, true);
    if ('overrideMimeType' in xhr)
      xhr.overrideMimeType('text/plain');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        var status = xhr.status;
        if (status === 0 || status === 200) {
          callback.call(xhr, xhr.responseText);
        } else {
          throw new Error('Could not load ' + url + ' (Error '
              + status + ')');
        }
      }
    };
    return xhr.send(null);
  }
};

var CanvasProvider = {
  canvases: [],

  getCanvas: function(width, height, pixelRatio) {
    var canvas,
      init = true;
    if (typeof width === 'object') {
      pixelRatio = height;
      height = width.height;
      width = width.width;
    }
    if (!pixelRatio) {
      pixelRatio = 1;
    } else if (pixelRatio !== 1) {
      width *= pixelRatio;
      height *= pixelRatio;
    }
    if (this.canvases.length) {
      canvas = this.canvases.pop();
    } else {
      canvas = document.createElement('canvas');
    }
    var ctx = canvas.getContext('2d');
    if (canvas.width === width && canvas.height === height) {
      if (init)
        ctx.clearRect(0, 0, width + 1, height + 1);
    } else {
      canvas.width = width;
      canvas.height = height;
    }
    ctx.save();
    if (pixelRatio !== 1)
      ctx.scale(pixelRatio, pixelRatio);
    return canvas;
  },

  getContext: function(width, height, pixelRatio) {
    return this.getCanvas(width, height, pixelRatio).getContext('2d');
  },

  release: function(obj) {
    var canvas = obj.canvas ? obj.canvas : obj;
    canvas.getContext('2d').restore();
    this.canvases.push(canvas);
  }
};

var BlendMode = new function() {
  var min = Math.min,
    max = Math.max,
    abs = Math.abs,
    sr, sg, sb, sa, 
    br, bg, bb, ba, 
    dr, dg, db;     

  function getLum(r, g, b) {
    return 0.2989 * r + 0.587 * g + 0.114 * b;
  }

  function setLum(r, g, b, l) {
    var d = l - getLum(r, g, b);
    dr = r + d;
    dg = g + d;
    db = b + d;
    var l = getLum(dr, dg, db),
      mn = min(dr, dg, db),
      mx = max(dr, dg, db);
    if (mn < 0) {
      var lmn = l - mn;
      dr = l + (dr - l) * l / lmn;
      dg = l + (dg - l) * l / lmn;
      db = l + (db - l) * l / lmn;
    }
    if (mx > 255) {
      var ln = 255 - l,
        mxl = mx - l;
      dr = l + (dr - l) * ln / mxl;
      dg = l + (dg - l) * ln / mxl;
      db = l + (db - l) * ln / mxl;
    }
  }

  function getSat(r, g, b) {
    return max(r, g, b) - min(r, g, b);
  }

  function setSat(r, g, b, s) {
    var col = [r, g, b],
      mx = max(r, g, b), 
      mn = min(r, g, b), 
      md; 
    mn = mn === r ? 0 : mn === g ? 1 : 2;
    mx = mx === r ? 0 : mx === g ? 1 : 2;
    md = min(mn, mx) === 0 ? max(mn, mx) === 1 ? 2 : 1 : 0;
    if (col[mx] > col[mn]) {
      col[md] = (col[md] - col[mn]) * s / (col[mx] - col[mn]);
      col[mx] = s;
    } else {
      col[md] = col[mx] = 0;
    }
    col[mn] = 0;
    dr = col[0];
    dg = col[1];
    db = col[2];
  }

  var modes = {
    multiply: function() {
      dr = br * sr / 255;
      dg = bg * sg / 255;
      db = bb * sb / 255;
    },

    screen: function() {
      dr = br + sr - (br * sr / 255);
      dg = bg + sg - (bg * sg / 255);
      db = bb + sb - (bb * sb / 255);
    },

    overlay: function() {
      dr = br < 128 ? 2 * br * sr / 255 : 255 - 2 * (255 - br) * (255 - sr) / 255;
      dg = bg < 128 ? 2 * bg * sg / 255 : 255 - 2 * (255 - bg) * (255 - sg) / 255;
      db = bb < 128 ? 2 * bb * sb / 255 : 255 - 2 * (255 - bb) * (255 - sb) / 255;
    },

    'soft-light': function() {
      var t = sr * br / 255;
      dr = t + br * (255 - (255 - br) * (255 - sr) / 255 - t) / 255;
      t = sg * bg / 255;
      dg = t + bg * (255 - (255 - bg) * (255 - sg) / 255 - t) / 255;
      t = sb * bb / 255;
      db = t + bb * (255 - (255 - bb) * (255 - sb) / 255 - t) / 255;
    },

    'hard-light': function() {
      dr = sr < 128 ? 2 * sr * br / 255 : 255 - 2 * (255 - sr) * (255 - br) / 255;
      dg = sg < 128 ? 2 * sg * bg / 255 : 255 - 2 * (255 - sg) * (255 - bg) / 255;
      db = sb < 128 ? 2 * sb * bb / 255 : 255 - 2 * (255 - sb) * (255 - bb) / 255;
    },

    'color-dodge': function() {
      dr = br === 0 ? 0 : sr === 255 ? 255 : min(255, 255 * br / (255 - sr));
      dg = bg === 0 ? 0 : sg === 255 ? 255 : min(255, 255 * bg / (255 - sg));
      db = bb === 0 ? 0 : sb === 255 ? 255 : min(255, 255 * bb / (255 - sb));
    },

    'color-burn': function() {
      dr = br === 255 ? 255 : sr === 0 ? 0 : max(0, 255 - (255 - br) * 255 / sr);
      dg = bg === 255 ? 255 : sg === 0 ? 0 : max(0, 255 - (255 - bg) * 255 / sg);
      db = bb === 255 ? 255 : sb === 0 ? 0 : max(0, 255 - (255 - bb) * 255 / sb);
    },

    darken: function() {
      dr = br < sr ? br : sr;
      dg = bg < sg ? bg : sg;
      db = bb < sb ? bb : sb;
    },

    lighten: function() {
      dr = br > sr ? br : sr;
      dg = bg > sg ? bg : sg;
      db = bb > sb ? bb : sb;
    },

    difference: function() {
      dr = br - sr;
      if (dr < 0)
        dr = -dr;
      dg = bg - sg;
      if (dg < 0)
        dg = -dg;
      db = bb - sb;
      if (db < 0)
        db = -db;
    },

    exclusion: function() {
      dr = br + sr * (255 - br - br) / 255;
      dg = bg + sg * (255 - bg - bg) / 255;
      db = bb + sb * (255 - bb - bb) / 255;
    },

    hue: function() {
      setSat(sr, sg, sb, getSat(br, bg, bb));
      setLum(dr, dg, db, getLum(br, bg, bb));
    },

    saturation: function() {
      setSat(br, bg, bb, getSat(sr, sg, sb));
      setLum(dr, dg, db, getLum(br, bg, bb));
    },

    luminosity: function() {
      setLum(br, bg, bb, getLum(sr, sg, sb));
    },

    color: function() {
      setLum(sr, sg, sb, getLum(br, bg, bb));
    },

    add: function() {
      dr = min(br + sr, 255);
      dg = min(bg + sg, 255);
      db = min(bb + sb, 255);
    },

    subtract: function() {
      dr = max(br - sr, 0);
      dg = max(bg - sg, 0);
      db = max(bb - sb, 0);
    },

    average: function() {
      dr = (br + sr) / 2;
      dg = (bg + sg) / 2;
      db = (bb + sb) / 2;
    },

    negation: function() {
      dr = 255 - abs(255 - sr - br);
      dg = 255 - abs(255 - sg - bg);
      db = 255 - abs(255 - sb - bb);
    }
  };

  var nativeModes = this.nativeModes = Base.each([
    'source-over', 'source-in', 'source-out', 'source-atop',
    'destination-over', 'destination-in', 'destination-out',
    'destination-atop', 'lighter', 'darker', 'copy', 'xor'
  ], function(mode) {
    this[mode] = true;
  }, {});

  var ctx = CanvasProvider.getContext(1, 1);
  Base.each(modes, function(func, mode) {
    var darken = mode === 'darken',
      ok = false;
    ctx.save();
    try {
      ctx.fillStyle = darken ? '#300' : '#a00';
      ctx.fillRect(0, 0, 1, 1);
      ctx.globalCompositeOperation = mode;
      if (ctx.globalCompositeOperation === mode) {
        ctx.fillStyle = darken ? '#a00' : '#300';
        ctx.fillRect(0, 0, 1, 1);
        ok = ctx.getImageData(0, 0, 1, 1).data[0] !== darken ? 170 : 51;
      }
    } catch (e) {}
    ctx.restore();
    nativeModes[mode] = ok;
  });
  CanvasProvider.release(ctx);

  this.process = function(mode, srcContext, dstContext, alpha, offset) {
    var srcCanvas = srcContext.canvas,
      normal = mode === 'normal';
    if (normal || nativeModes[mode]) {
      dstContext.save();
      dstContext.setTransform(1, 0, 0, 1, 0, 0);
      dstContext.globalAlpha = alpha;
      if (!normal)
        dstContext.globalCompositeOperation = mode;
      dstContext.drawImage(srcCanvas, offset.x, offset.y);
      dstContext.restore();
    } else {
      var process = modes[mode];
      if (!process)
        return;
      var dstData = dstContext.getImageData(offset.x, offset.y,
          srcCanvas.width, srcCanvas.height),
        dst  = dstData.data,
        src  = srcContext.getImageData(0, 0,
          srcCanvas.width, srcCanvas.height).data;
      for (var i = 0, l = dst.length; i < l; i += 4) {
        sr = src[i];
        br = dst[i];
        sg = src[i + 1];
        bg = dst[i + 1];
        sb = src[i + 2];
        bb = dst[i + 2];
        sa = src[i + 3];
        ba = dst[i + 3];
        process();
        var a1 = sa * alpha / 255,
          a2 = 1 - a1;
        dst[i] = a1 * dr + a2 * br;
        dst[i + 1] = a1 * dg + a2 * bg;
        dst[i + 2] = a1 * db + a2 * bb;
        dst[i + 3] = sa * alpha + a2 * ba;
      }
      dstContext.putImageData(dstData, offset.x, offset.y);
    }
  };
};

var SVGStyles = Base.each({
  fillColor: ['fill', 'color'],
  strokeColor: ['stroke', 'color'],
  strokeWidth: ['stroke-width', 'number'],
  strokeCap: ['stroke-linecap', 'string'],
  strokeJoin: ['stroke-linejoin', 'string'],
  miterLimit: ['stroke-miterlimit', 'number'],
  dashArray: ['stroke-dasharray', 'array'],
  dashOffset: ['stroke-dashoffset', 'number'],
  fontFamily: ['font-family', 'string'],
  fontWeight: ['font-weight', 'string'],
  fontSize: ['font-size', 'number'],
  justification: ['text-anchor', 'lookup', {
    left: 'start',
    center: 'middle',
    right: 'end'
  }],
  opacity: ['opacity', 'number'],
  blendMode: ['mix-blend-mode', 'string']
}, function(entry, key) {
  var part = Base.capitalize(key),
    lookup = entry[2];
  this[key] = {
    type: entry[1],
    property: key,
    attribute: entry[0],
    toSVG: lookup,
    fromSVG: lookup && Base.each(lookup, function(value, name) {
      this[value] = name;
    }, {}),
    get: 'get' + part,
    set: 'set' + part
  };
}, {});

var SVGNamespaces = {
  href: 'http://www.w3.org/1999/xlink',
  xlink: 'http://www.w3.org/2000/xmlns'
};

new function() {
  var formatter;

  function setAttributes(node, attrs) {
    for (var key in attrs) {
      var val = attrs[key],
        namespace = SVGNamespaces[key];
      if (typeof val === 'number')
        val = formatter.number(val);
      if (namespace) {
        node.setAttributeNS(namespace, key, val);
      } else {
        node.setAttribute(key, val);
      }
    }
    return node;
  }

  function createElement(tag, attrs) {
    return setAttributes(
      document.createElementNS('http://www.w3.org/2000/svg', tag), attrs);
  }

  function getTransform(item, coordinates, center) {
    var matrix = item._matrix,
      trans = matrix.getTranslation(),
      attrs = {};
    if (coordinates) {
      matrix = matrix.shiftless();
      var point = matrix._inverseTransform(trans);
      attrs[center ? 'cx' : 'x'] = point.x;
      attrs[center ? 'cy' : 'y'] = point.y;
      trans = null;
    }
    if (!matrix.isIdentity()) {
      var decomposed = matrix.decompose();
      if (decomposed && !decomposed.shearing) {
        var parts = [],
          angle = decomposed.rotation,
          scale = decomposed.scaling;
        if (trans && !trans.isZero())
          parts.push('translate(' + formatter.point(trans) + ')');
        if (angle)
          parts.push('rotate(' + formatter.number(angle) + ')');
        if (!Numerical.isZero(scale.x - 1)
            || !Numerical.isZero(scale.y - 1))
          parts.push('scale(' + formatter.point(scale) +')');
        attrs.transform = parts.join(' ');
      } else {
        attrs.transform = 'matrix(' + matrix.getValues().join(',') + ')';
      }
    }
    return attrs;
  }

  function exportGroup(item, options) {
    var attrs = getTransform(item),
      children = item._children;
    var node = createElement('g', attrs);
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      var childNode = exportSVG(child, options);
      if (childNode) {
        if (child.isClipMask()) {
          var clip = createElement('clipPath');
          clip.appendChild(childNode);
          setDefinition(child, clip, 'clip');
          setAttributes(node, {
            'clip-path': 'url(#' + clip.id + ')'
          });
        } else {
          node.appendChild(childNode);
        }
      }
    }
    return node;
  }

  function exportRaster(item) {
    var attrs = getTransform(item, true),
      size = item.getSize();
    attrs.x -= size.width / 2;
    attrs.y -= size.height / 2;
    attrs.width = size.width;
    attrs.height = size.height;
    attrs.href = item.toDataURL();
    return createElement('image', attrs);
  }

  function exportPath(item, options) {
    if (options.matchShapes) {
      var shape = item.toShape(false);
      if (shape)
        return exportShape(shape, options);
    }
    var segments = item._segments,
      type,
      attrs;
    if (segments.length === 0)
      return null;
    if (item.isPolygon()) {
      if (segments.length >= 3) {
        type = item._closed ? 'polygon' : 'polyline';
        var parts = [];
        for(i = 0, l = segments.length; i < l; i++)
          parts.push(formatter.point(segments[i]._point));
        attrs = {
          points: parts.join(' ')
        };
      } else {
        type = 'line';
        var first = segments[0]._point,
          last = segments[segments.length - 1]._point;
        attrs = {
          x1: first.x,
          y1: first.y,
          x2: last.x,
          y2: last.y
        };
      }
    } else {
      type = 'path';
      var data = item.getPathData();
      attrs = data && { d: data };
    }
    return createElement(type, attrs);
  }

  function exportShape(item) {
    var type = item._type,
      radius = item._radius,
      attrs = getTransform(item, true, type !== 'rectangle');
    if (type === 'rectangle') {
      type = 'rect'; 
      var size = item._size,
        width = size.width,
        height = size.height;
      attrs.x -= width / 2;
      attrs.y -= height / 2;
      attrs.width = width;
      attrs.height = height;
      if (radius.isZero())
        radius = null;
    }
    if (radius) {
      if (type === 'circle') {
        attrs.r = radius;
      } else {
        attrs.rx = radius.width;
        attrs.ry = radius.height;
      }
    }
    return createElement(type, attrs);
  }

  function exportCompoundPath(item) {
    var attrs = getTransform(item, true);
    var data = item.getPathData();
    if (data)
      attrs.d = data;
    return createElement('path', attrs);
  }

  function exportPlacedSymbol(item, options) {
    var attrs = getTransform(item, true),
      symbol = item.getSymbol(),
      symbolNode = getDefinition(symbol, 'symbol'),
      definition = symbol.getDefinition(),
      bounds = definition.getBounds();
    if (!symbolNode) {
      symbolNode = createElement('symbol', {
        viewBox: formatter.rectangle(bounds)
      });
      symbolNode.appendChild(exportSVG(definition, options));
      setDefinition(symbol, symbolNode, 'symbol');
    }
    attrs.href = '#' + symbolNode.id;
    attrs.x += bounds.x;
    attrs.y += bounds.y;
    attrs.width = formatter.number(bounds.width);
    attrs.height = formatter.number(bounds.height);
    return createElement('use', attrs);
  }

  function exportGradient(color) {
    var gradientNode = getDefinition(color, 'color');
    if (!gradientNode) {
      var gradient = color.getGradient(),
        radial = gradient._radial,
        origin = color.getOrigin().transform(),
        destination = color.getDestination().transform(),
        attrs;
      if (radial) {
        attrs = {
          cx: origin.x,
          cy: origin.y,
          r: origin.getDistance(destination)
        };
        var highlight = color.getHighlight();
        if (highlight) {
          highlight = highlight.transform();
          attrs.fx = highlight.x;
          attrs.fy = highlight.y;
        }
      } else {
        attrs = {
          x1: origin.x,
          y1: origin.y,
          x2: destination.x,
          y2: destination.y
        };
      }
      attrs.gradientUnits = 'userSpaceOnUse';
      gradientNode = createElement(
          (radial ? 'radial' : 'linear') + 'Gradient', attrs);
      var stops = gradient._stops;
      for (var i = 0, l = stops.length; i < l; i++) {
        var stop = stops[i],
          stopColor = stop._color,
          alpha = stopColor.getAlpha();
        attrs = {
          offset: stop._rampPoint,
          'stop-color': stopColor.toCSS(true)
        };
        if (alpha < 1)
          attrs['stop-opacity'] = alpha;
        gradientNode.appendChild(createElement('stop', attrs));
      }
      setDefinition(color, gradientNode, 'color');
    }
    return 'url(#' + gradientNode.id + ')';
  }

  function exportText(item) {
    var node = createElement('text', getTransform(item, true));
    node.textContent = item._content;
    return node;
  }

  var exporters = {
    Group: exportGroup,
    Layer: exportGroup,
    Raster: exportRaster,
    Path: exportPath,
    Shape: exportShape,
    CompoundPath: exportCompoundPath,
    PlacedSymbol: exportPlacedSymbol,
    PointText: exportText
  };

  function applyStyle(item, node) {
    var attrs = {},
      parent = item.getParent();

    if (item._name != null)
      attrs.id = item._name;

    Base.each(SVGStyles, function(entry) {
      var get = entry.get,
        type = entry.type,
        value = item[get]();
      if (!parent || !Base.equals(parent[get](), value)) {
        if (type === 'color' && value != null) {
          var alpha = value.getAlpha();
          if (alpha < 1)
            attrs[entry.attribute + '-opacity'] = alpha;
        }
        attrs[entry.attribute] = value == null
          ? 'none'
          : type === 'number'
            ? formatter.number(value)
            : type === 'color'
              ? value.gradient
                ? exportGradient(value, item)
                : value.toCSS(true)
              : type === 'array'
                ? value.join(',')
                : type === 'lookup'
                  ? entry.toSVG[value]
                  : value;
      }
    });

    if (attrs.opacity === 1)
      delete attrs.opacity;

    if (item._visibility != null && !item._visibility)
      attrs.visibility = 'hidden';

    return setAttributes(node, attrs);
  }

  var definitions;
  function getDefinition(item, type) {
    if (!definitions)
      definitions = { ids: {}, svgs: {} };
    return item && definitions.svgs[type + '-' + item._id];
  }

  function setDefinition(item, node, type) {
    if (!definitions)
      getDefinition();
    var id = definitions.ids[type] = (definitions.ids[type] || 0) + 1;
    node.id = type + '-' + id;
    definitions.svgs[type + '-' + item._id] = node;
  }

  function exportDefinitions(node, options) {
    var svg = node,
      defs = null;
    if (definitions) {
      svg = node.nodeName.toLowerCase() === 'svg' && node;
      for (var i in definitions.svgs) {
        if (!defs) {
          if (!svg) {
            svg = createElement('svg');
            svg.appendChild(node);
          }
          defs = svg.insertBefore(createElement('defs'),
              svg.firstChild);
        }
        defs.appendChild(definitions.svgs[i]);
      }
      definitions = null;
    }
    return options.asString
        ? new XMLSerializer().serializeToString(svg)
        : svg;
  }

  function exportSVG(item, options) {
    var exporter = exporters[item._class],
      node = exporter && exporter(item, options);
    if (node && item._data) {
      var data = JSON.stringify(item._data);
      if (data !== '{}')
        node.setAttribute('data-paper-data', data);
    }
    return node && applyStyle(item, node);
  }

  function setOptions(options) {
    if (!options)
      options = {};
    formatter = new Formatter(options.precision);
    return options;
  }

  Item.inject({
    exportSVG: function(options) {
      options = setOptions(options);
      return exportDefinitions(exportSVG(this, options), options);
    }
  });

  Project.inject({
    exportSVG: function(options) {
      options = setOptions(options);
      var layers = this.layers,
        size = this.getView().getSize(),
        node = createElement('svg', {
          x: 0,
          y: 0,
          width: size.width,
          height: size.height,
          version: '1.1',
          xmlns: 'http://www.w3.org/2000/svg',
          'xmlns:xlink': 'http://www.w3.org/1999/xlink'
        });
      for (var i = 0, l = layers.length; i < l; i++)
        node.appendChild(exportSVG(layers[i], options));
      return exportDefinitions(node, options);
    }
  });
};

new function() {

  function getValue(node, name, isString, allowNull) {
    var namespace = SVGNamespaces[name],
      value = namespace
        ? node.getAttributeNS(namespace, name)
        : node.getAttribute(name);
    if (value === 'null')
      value = null;
    return value == null
        ? allowNull
          ? null
          : isString
            ? ''
            : 0
        : isString
          ? value
          : parseFloat(value);
  }

  function getPoint(node, x, y, allowNull) {
    x = getValue(node, x, false, allowNull);
    y = getValue(node, y, false, allowNull);
    return allowNull && (x == null || y == null) ? null
        : new Point(x, y);
  }

  function getSize(node, w, h, allowNull) {
    w = getValue(node, w, false, allowNull);
    h = getValue(node, h, false, allowNull);
    return allowNull && (w == null || h == null) ? null
        : new Size(w, h);
  }

  function convertValue(value, type, lookup) {
    return value === 'none'
        ? null
        : type === 'number'
          ? parseFloat(value)
          : type === 'array'
            ? value ? value.split(/[\s,]+/g).map(parseFloat) : []
            : type === 'color'
              ? getDefinition(value) || value
              : type === 'lookup'
                ? lookup[value]
                : value;
  }

  function importGroup(node, type, isRoot, options) {
    var nodes = node.childNodes,
      isClip = type === 'clippath',
      item = new Group(),
      project = item._project,
      currentStyle = project._currentStyle,
      children = [];
    if (!isClip) {
      item = applyAttributes(item, node, isRoot);
      project._currentStyle = item._style.clone();
    }
    for (var i = 0, l = nodes.length; i < l; i++) {
      var childNode = nodes[i],
        child;
      if (childNode.nodeType === 1
          && (child = importSVG(childNode, false, options))
          && !(child instanceof Symbol))
        children.push(child);
    }
    item.addChildren(children);
    if (isClip)
      item = applyAttributes(item.reduce(), node, isRoot);
    project._currentStyle = currentStyle;
    if (isClip || type === 'defs') {
      item.remove();
      item = null;
    }
    return item;
  }

  function importPoly(node, type) {
    var coords = node.getAttribute('points').match(
          /[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g),
      points = [];
    for (var i = 0, l = coords.length; i < l; i += 2)
      points.push(new Point(
          parseFloat(coords[i]),
          parseFloat(coords[i + 1])));
    var path = new Path(points);
    if (type === 'polygon')
      path.closePath();
    return path;
  }

  function importPath(node) {
    var data = node.getAttribute('d'),
      param = { pathData: data };
    return data.match(/m/gi).length > 1 || /z\S+/i.test(data)
        ? new CompoundPath(param)
        : new Path(param);
  }

  function importGradient(node, type) {
    var id = (getValue(node, 'href', true) || '').substring(1),
      isRadial = type === 'radialgradient',
      gradient;
    if (id) {
      gradient = definitions[id].getGradient();
    } else {
      var nodes = node.childNodes,
        stops = [];
      for (var i = 0, l = nodes.length; i < l; i++) {
        var child = nodes[i];
        if (child.nodeType === 1)
          stops.push(applyAttributes(new GradientStop(), child));
      }
      gradient = new Gradient(stops, isRadial);
    }
    var origin, destination, highlight;
    if (isRadial) {
      origin = getPoint(node, 'cx', 'cy');
      destination = origin.add(getValue(node, 'r'), 0);
      highlight = getPoint(node, 'fx', 'fy', true);
    } else {
      origin = getPoint(node, 'x1', 'y1');
      destination = getPoint(node, 'x2', 'y2');
    }
    applyAttributes(
      new Color(gradient, origin, destination, highlight), node);
    return null;
  }

  var importers = {
    '#document': function (node, type, isRoot, options) {
      var nodes = node.childNodes;
      for (var i = 0, l = nodes.length; i < l; i++) {
        var child = nodes[i];
        if (child.nodeType === 1) {
          var next = child.nextSibling;
          document.body.appendChild(child);
          var item = importSVG(child, isRoot, options);
          if (next) {
            node.insertBefore(child, next);
          } else {
            node.appendChild(child);
          }
          return item;
        }
      }
    },
    g: importGroup,
    svg: importGroup,
    clippath: importGroup,
    polygon: importPoly,
    polyline: importPoly,
    path: importPath,
    lineargradient: importGradient,
    radialgradient: importGradient,

    image: function (node) {
      var raster = new Raster(getValue(node, 'href', true));
      raster.attach('load', function() {
        var size = getSize(node, 'width', 'height');
        this.setSize(size);
        var center = this._matrix._transformPoint(
            getPoint(node, 'x', 'y').add(size.divide(2)));
        this.translate(center);
      });
      return raster;
    },

    symbol: function(node, type, isRoot, options) {
      return new Symbol(importGroup(node, type, isRoot, options), true);
    },

    defs: importGroup,

    use: function(node) {
      var id = (getValue(node, 'href', true) || '').substring(1),
        definition = definitions[id],
        point = getPoint(node, 'x', 'y');
      return definition
          ? definition instanceof Symbol
            ? definition.place(point)
            : definition.clone().translate(point)
          : null;
    },

    circle: function(node) {
      return new Shape.Circle(getPoint(node, 'cx', 'cy'),
          getValue(node, 'r'));
    },

    ellipse: function(node) {
      return new Shape.Ellipse({
        center: getPoint(node, 'cx', 'cy'),
        radius: getSize(node, 'rx', 'ry')
      });
    },

    rect: function(node) {
      var point = getPoint(node, 'x', 'y'),
        size = getSize(node, 'width', 'height'),
        radius = getSize(node, 'rx', 'ry');
      return new Shape.Rectangle(new Rectangle(point, size), radius);
    },

    line: function(node) {
      return new Path.Line(getPoint(node, 'x1', 'y1'),
          getPoint(node, 'x2', 'y2'));
    },

    text: function(node) {
      var text = new PointText(getPoint(node, 'x', 'y')
          .add(getPoint(node, 'dx', 'dy')));
      text.setContent(node.textContent.trim() || '');
      return text;
    }
  };

  function applyTransform(item, value, name, node) {
    var transforms = (node.getAttribute(name) || '').split(/\)\s*/g),
      matrix = new Matrix();
    for (var i = 0, l = transforms.length; i < l; i++) {
      var transform = transforms[i];
      if (!transform)
        break;
      var parts = transform.split('('),
        command = parts[0],
        v = parts[1].split(/[\s,]+/g);
      for (var j = 0, m = v.length; j < m; j++)
        v[j] = parseFloat(v[j]);
      switch (command) {
      case 'matrix':
        matrix.concatenate(
            new Matrix(v[0], v[1], v[2], v[3], v[4], v[5]));
        break;
      case 'rotate':
        matrix.rotate(v[0], v[1], v[2]);
        break;
      case 'translate':
        matrix.translate(v[0], v[1]);
        break;
      case 'scale':
        matrix.scale(v);
        break;
      case 'skewX':
        matrix.skew(v[0], 0);
        break;
      case 'skewY':
        matrix.skew(0, v[0]);
        break;
      }
    }
    item.transform(matrix);
  }

  function applyOpacity(item, value, name) {
    var color = item[name === 'fill-opacity' ? 'getFillColor'
        : 'getStrokeColor']();
    if (color)
      color.setAlpha(parseFloat(value));
  }

  var attributes = Base.each(SVGStyles, function(entry) {
    this[entry.attribute] = function(item, value) {
      item[entry.set](convertValue(value, entry.type, entry.fromSVG));
      if (entry.type === 'color' && item instanceof Shape) {
        var color = item[entry.get]();
        if (color)
          color.transform(new Matrix().translate(
              item.getPosition(true).negate()));
      }
    };
  }, {
    id: function(item, value) {
      definitions[value] = item;
      if (item.setName)
        item.setName(value);
    },

    'clip-path': function(item, value) {
      var clip = getDefinition(value);
      if (clip) {
        clip = clip.clone();
        clip.setClipMask(true);
        if (item instanceof Group) {
          item.insertChild(0, clip);
        } else {
          return new Group(clip, item);
        }
      }
    },

    gradientTransform: applyTransform,
    transform: applyTransform,

    'fill-opacity': applyOpacity,
    'stroke-opacity': applyOpacity,

    visibility: function(item, value) {
      item.setVisible(value === 'visible');
    },

    'stop-color': function(item, value) {
      if (item.setColor)
        item.setColor(value);
    },

    'stop-opacity': function(item, value) {
      if (item._color)
        item._color.setAlpha(parseFloat(value));
    },

    offset: function(item, value) {
      var percentage = value.match(/(.*)%$/);
      item.setRampPoint(percentage
          ? percentage[1] / 100
          : parseFloat(value));
    },

    viewBox: function(item, value, name, node, styles) {
      var rect = new Rectangle(convertValue(value, 'array')),
        size = getSize(node, 'width', 'height', true);
      if (item instanceof Group) {
        var scale = size ? rect.getSize().divide(size) : 1,
          matrix = new Matrix().translate(rect.getPoint()).scale(scale);
        item.transform(matrix.inverted());
      } else if (item instanceof Symbol) {
        if (size)
          rect.setSize(size);
        var clip = getAttribute(node, 'overflow', styles) != 'visible',
          group = item._definition;
        if (clip && !rect.contains(group.getBounds())) {
          clip = new Shape.Rectangle(rect).transform(group._matrix);
          clip.setClipMask(true);
          group.addChild(clip);
        }
      }
    }
  });

  function getAttribute(node, name, styles) {
    var attr = node.attributes[name],
      value = attr && attr.value;
    if (!value) {
      var style = Base.camelize(name);
      value = node.style[style];
      if (!value && styles.node[style] !== styles.parent[style])
        value = styles.node[style];
    }
    return !value
        ? undefined
        : value === 'none'
          ? null
          : value;
  }

  function applyAttributes(item, node, isRoot) {
    var styles = {
      node: DomElement.getStyles(node) || {},
      parent: !isRoot && DomElement.getStyles(node.parentNode) || {}
    };
    Base.each(attributes, function(apply, name) {
      var value = getAttribute(node, name, styles);
      if (value !== undefined)
        item = Base.pick(apply(item, value, name, node, styles), item);
    });
    return item;
  }

  var definitions = {};
  function getDefinition(value) {
    var match = value && value.match(/\((?:#|)([^)']+)/);
    return match && definitions[match[1]];
  }

  function importSVG(source, isRoot, options) {
    if (!source)
      return null;
    if (!options) {
      options = {};
    } else if (typeof options === 'function') {
      options = { onLoad: options };
    }

    var node = source,
      scope = paper;

    function onLoadCallback(svg) {
      paper = scope;
      var item = importSVG(svg, isRoot, options),
        onLoad = options.onLoad,
        view = scope.project && scope.getView();
      if (onLoad)
        onLoad.call(this, item);
      view.update();
    }

    if (isRoot) {
      if (typeof source === 'string' && !/^.*</.test(source)) {
        node = document.getElementById(source);
        if (node) {
          source = null;
        } else {
          return Http.request('get', source, onLoadCallback);
        }
      } else if (typeof File !== 'undefined' && source instanceof File) {
        var reader = new FileReader();
        reader.onload = function() {
          onLoadCallback(reader.result);
        };
        return reader.readAsText(source);
      }
    }

    if (typeof source === 'string')
      node = new DOMParser().parseFromString(source, 'image/svg+xml');
    if (!node.nodeName)
      throw new Error('Unsupported SVG source: ' + source);
    var type = node.nodeName.toLowerCase(),
      importer = importers[type],
      item,
      data = node.getAttribute && node.getAttribute('data-paper-data'),
      settings = scope.settings,
      prevApplyMatrix = settings.applyMatrix;
    settings.applyMatrix = false;
    item = importer && importer(node, type, isRoot, options) || null;
    settings.applyMatrix = prevApplyMatrix;
    if (item) {
      if (!(item instanceof Group))
        item = applyAttributes(item, node, isRoot);
      if (options.expandShapes && item instanceof Shape) {
        item.remove();
        item = item.toPath();
      }
      if (data)
        item._data = JSON.parse(data);
    }
    if (isRoot)
      definitions = {};
    return item;
  }

  Item.inject({
    importSVG: function(node, options) {
      return this.addChild(importSVG(node, true, options));
    }
  });

  Project.inject({
    importSVG: function(node, options) {
      this.activate();
      return importSVG(node, true, options);
    }
  });
};

Base.exports.PaperScript = (function() {
  var exports, define,
    scope = this;
!function(e,r){return"object"==typeof exports&&"object"==typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):(r(e.acorn||(e.acorn={})),void 0)}(this,function(e){"use strict";function r(e){fr=e||{};for(var r in hr)Object.prototype.hasOwnProperty.call(fr,r)||(fr[r]=hr[r]);mr=fr.sourceFile||null}function t(e,r){var t=vr(pr,e);r+=" ("+t.line+":"+t.column+")";var n=new SyntaxError(r);throw n.pos=e,n.loc=t,n.raisedAt=br,n}function n(e){function r(e){if(1==e.length)return t+="return str === "+JSON.stringify(e[0])+";";t+="switch(str){";for(var r=0;r<e.length;++r)t+="case "+JSON.stringify(e[r])+":";t+="return true}return false;"}e=e.split(" ");var t="",n=[];e:for(var a=0;a<e.length;++a){for(var o=0;o<n.length;++o)if(n[o][0].length==e[a].length){n[o].push(e[a]);continue e}n.push([e[a]])}if(n.length>3){n.sort(function(e,r){return r.length-e.length}),t+="switch(str.length){";for(var a=0;a<n.length;++a){var i=n[a];t+="case "+i[0].length+":",r(i)}t+="}"}else r(e);return new Function("str",t)}function a(){this.line=Ar,this.column=br-Sr}function o(){Ar=1,br=Sr=0,Er=!0,u()}function i(e,r){gr=br,fr.locations&&(kr=new a),wr=e,u(),Cr=r,Er=e.beforeExpr}function s(){var e=fr.onComment&&fr.locations&&new a,r=br,n=pr.indexOf("*/",br+=2);if(-1===n&&t(br-2,"Unterminated comment"),br=n+2,fr.locations){Kt.lastIndex=r;for(var o;(o=Kt.exec(pr))&&o.index<br;)++Ar,Sr=o.index+o[0].length}fr.onComment&&fr.onComment(!0,pr.slice(r+2,n),r,br,e,fr.locations&&new a)}function c(){for(var e=br,r=fr.onComment&&fr.locations&&new a,t=pr.charCodeAt(br+=2);dr>br&&10!==t&&13!==t&&8232!==t&&8329!==t;)++br,t=pr.charCodeAt(br);fr.onComment&&fr.onComment(!1,pr.slice(e+2,br),e,br,r,fr.locations&&new a)}function u(){for(;dr>br;){var e=pr.charCodeAt(br);if(32===e)++br;else if(13===e){++br;var r=pr.charCodeAt(br);10===r&&++br,fr.locations&&(++Ar,Sr=br)}else if(10===e)++br,++Ar,Sr=br;else if(14>e&&e>8)++br;else if(47===e){var r=pr.charCodeAt(br+1);if(42===r)s();else{if(47!==r)break;c()}}else if(160===e)++br;else{if(!(e>=5760&&Jt.test(String.fromCharCode(e))))break;++br}}}function l(){var e=pr.charCodeAt(br+1);return e>=48&&57>=e?E(!0):(++br,i(xt))}function f(){var e=pr.charCodeAt(br+1);return Er?(++br,k()):61===e?x(Et,2):x(wt,1)}function p(){var e=pr.charCodeAt(br+1);return 61===e?x(Et,2):x(Ft,1)}function d(e){var r=pr.charCodeAt(br+1);return r===e?x(124===e?Lt:Ut,2):61===r?x(Et,2):x(124===e?Rt:Vt,1)}function m(){var e=pr.charCodeAt(br+1);return 61===e?x(Et,2):x(Tt,1)}function h(e){var r=pr.charCodeAt(br+1);return r===e?x(St,2):61===r?x(Et,2):x(At,1)}function v(e){var r=pr.charCodeAt(br+1),t=1;return r===e?(t=62===e&&62===pr.charCodeAt(br+2)?3:2,61===pr.charCodeAt(br+t)?x(Et,t+1):x(jt,t)):(61===r&&(t=61===pr.charCodeAt(br+2)?3:2),x(Ot,t))}function b(e){var r=pr.charCodeAt(br+1);return 61===r?x(qt,61===pr.charCodeAt(br+2)?3:2):x(61===e?Ct:It,1)}function y(e){switch(e){case 46:return l();case 40:return++br,i(ht);case 41:return++br,i(vt);case 59:return++br,i(yt);case 44:return++br,i(bt);case 91:return++br,i(ft);case 93:return++br,i(pt);case 123:return++br,i(dt);case 125:return++br,i(mt);case 58:return++br,i(gt);case 63:return++br,i(kt);case 48:var r=pr.charCodeAt(br+1);if(120===r||88===r)return C();case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return E(!1);case 34:case 39:return A(e);case 47:return f(e);case 37:case 42:return p();case 124:case 38:return d(e);case 94:return m();case 43:case 45:return h(e);case 60:case 62:return v(e);case 61:case 33:return b(e);case 126:return x(It,1)}return!1}function g(e){if(e?br=yr+1:yr=br,fr.locations&&(xr=new a),e)return k();if(br>=dr)return i(Br);var r=pr.charCodeAt(br);if(Qt(r)||92===r)return L();var n=y(r);if(n===!1){var o=String.fromCharCode(r);if("\\"===o||$t.test(o))return L();t(br,"Unexpected character '"+o+"'")}return n}function x(e,r){var t=pr.slice(br,br+r);br+=r,i(e,t)}function k(){for(var e,r,n="",a=br;;){br>=dr&&t(a,"Unterminated regular expression");var o=pr.charAt(br);if(Gt.test(o)&&t(a,"Unterminated regular expression"),e)e=!1;else{if("["===o)r=!0;else if("]"===o&&r)r=!1;else if("/"===o&&!r)break;e="\\"===o}++br}var n=pr.slice(a,br);++br;var s=I();return s&&!/^[gmsiy]*$/.test(s)&&t(a,"Invalid regexp flag"),i(jr,new RegExp(n,s))}function w(e,r){for(var t=br,n=0,a=0,o=null==r?1/0:r;o>a;++a){var i,s=pr.charCodeAt(br);if(i=s>=97?s-97+10:s>=65?s-65+10:s>=48&&57>=s?s-48:1/0,i>=e)break;++br,n=n*e+i}return br===t||null!=r&&br-t!==r?null:n}function C(){br+=2;var e=w(16);return null==e&&t(yr+2,"Expected hexadecimal number"),Qt(pr.charCodeAt(br))&&t(br,"Identifier directly after number"),i(Or,e)}function E(e){var r=br,n=!1,a=48===pr.charCodeAt(br);e||null!==w(10)||t(r,"Invalid number"),46===pr.charCodeAt(br)&&(++br,w(10),n=!0);var o=pr.charCodeAt(br);(69===o||101===o)&&(o=pr.charCodeAt(++br),(43===o||45===o)&&++br,null===w(10)&&t(r,"Invalid number"),n=!0),Qt(pr.charCodeAt(br))&&t(br,"Identifier directly after number");var s,c=pr.slice(r,br);return n?s=parseFloat(c):a&&1!==c.length?/[89]/.test(c)||Vr?t(r,"Invalid number"):s=parseInt(c,8):s=parseInt(c,10),i(Or,s)}function A(e){br++;for(var r="";;){br>=dr&&t(yr,"Unterminated string constant");var n=pr.charCodeAt(br);if(n===e)return++br,i(Fr,r);if(92===n){n=pr.charCodeAt(++br);var a=/^[0-7]+/.exec(pr.slice(br,br+3));for(a&&(a=a[0]);a&&parseInt(a,8)>255;)a=a.slice(0,a.length-1);if("0"===a&&(a=null),++br,a)Vr&&t(br-2,"Octal literal in strict mode"),r+=String.fromCharCode(parseInt(a,8)),br+=a.length-1;else switch(n){case 110:r+="\n";break;case 114:r+="\r";break;case 120:r+=String.fromCharCode(S(2));break;case 117:r+=String.fromCharCode(S(4));break;case 85:r+=String.fromCharCode(S(8));break;case 116:r+="  ";break;case 98:r+="\b";break;case 118:r+="";break;case 102:r+="\f";break;case 48:r+="\0";break;case 13:10===pr.charCodeAt(br)&&++br;case 10:fr.locations&&(Sr=br,++Ar);break;default:r+=String.fromCharCode(n)}}else(13===n||10===n||8232===n||8329===n)&&t(yr,"Unterminated string constant"),r+=String.fromCharCode(n),++br}}function S(e){var r=w(16,e);return null===r&&t(yr,"Bad character escape sequence"),r}function I(){Bt=!1;for(var e,r=!0,n=br;;){var a=pr.charCodeAt(br);if(Yt(a))Bt&&(e+=pr.charAt(br)),++br;else{if(92!==a)break;Bt||(e=pr.slice(n,br)),Bt=!0,117!=pr.charCodeAt(++br)&&t(br,"Expecting Unicode escape sequence \\uXXXX"),++br;var o=S(4),i=String.fromCharCode(o);i||t(br-1,"Invalid Unicode escape"),(r?Qt(o):Yt(o))||t(br-4,"Invalid Unicode escape"),e+=i}r=!1}return Bt?e:pr.slice(n,br)}function L(){var e=I(),r=Dr;return Bt||(Wt(e)?r=lt[e]:(fr.forbidReserved&&(3===fr.ecmaVersion?Mt:zt)(e)||Vr&&Xt(e))&&t(yr,"The keyword '"+e+"' is reserved")),i(r,e)}function U(){Ir=yr,Lr=gr,Ur=kr,g()}function R(e){for(Vr=e,br=Lr;Sr>br;)Sr=pr.lastIndexOf("\n",Sr-2)+1,--Ar;u(),g()}function T(){this.type=null,this.start=yr,this.end=null}function V(){this.start=xr,this.end=null,null!==mr&&(this.source=mr)}function q(){var e=new T;return fr.locations&&(e.loc=new V),fr.ranges&&(e.range=[yr,0]),e}function O(e){var r=new T;return r.start=e.start,fr.locations&&(r.loc=new V,r.loc.start=e.loc.start),fr.ranges&&(r.range=[e.range[0],0]),r}function j(e,r){return e.type=r,e.end=Lr,fr.locations&&(e.loc.end=Ur),fr.ranges&&(e.range[1]=Lr),e}function F(e){return fr.ecmaVersion>=5&&"ExpressionStatement"===e.type&&"Literal"===e.expression.type&&"use strict"===e.expression.value}function D(e){return wr===e?(U(),!0):void 0}function B(){return!fr.strictSemicolons&&(wr===Br||wr===mt||Gt.test(pr.slice(Lr,yr)))}function M(){D(yt)||B()||X()}function z(e){wr===e?U():X()}function X(){t(yr,"Unexpected token")}function N(e){"Identifier"!==e.type&&"MemberExpression"!==e.type&&t(e.start,"Assigning to rvalue"),Vr&&"Identifier"===e.type&&Nt(e.name)&&t(e.start,"Assigning to "+e.name+" in strict mode")}function W(e){Ir=Lr=br,fr.locations&&(Ur=new a),Rr=Vr=null,Tr=[],g();var r=e||q(),t=!0;for(e||(r.body=[]);wr!==Br;){var n=J();r.body.push(n),t&&F(n)&&R(!0),t=!1}return j(r,"Program")}function J(){wr===wt&&g(!0);var e=wr,r=q();switch(e){case Mr:case Nr:U();var n=e===Mr;D(yt)||B()?r.label=null:wr!==Dr?X():(r.label=lr(),M());for(var a=0;a<Tr.length;++a){var o=Tr[a];if(null==r.label||o.name===r.label.name){if(null!=o.kind&&(n||"loop"===o.kind))break;if(r.label&&n)break}}return a===Tr.length&&t(r.start,"Unsyntactic "+e.keyword),j(r,n?"BreakStatement":"ContinueStatement");case Wr:return U(),M(),j(r,"DebuggerStatement");case Pr:return U(),Tr.push(Zt),r.body=J(),Tr.pop(),z(tt),r.test=P(),M(),j(r,"DoWhileStatement");case _r:if(U(),Tr.push(Zt),z(ht),wr===yt)return $(r,null);if(wr===rt){var i=q();return U(),G(i,!0),1===i.declarations.length&&D(ut)?_(r,i):$(r,i)}var i=K(!1,!0);return D(ut)?(N(i),_(r,i)):$(r,i);case Gr:return U(),cr(r,!0);case Kr:return U(),r.test=P(),r.consequent=J(),r.alternate=D(Hr)?J():null,j(r,"IfStatement");case Qr:return Rr||t(yr,"'return' outside of function"),U(),D(yt)||B()?r.argument=null:(r.argument=K(),M()),j(r,"ReturnStatement");case Yr:U(),r.discriminant=P(),r.cases=[],z(dt),Tr.push(en);for(var s,c;wr!=mt;)if(wr===zr||wr===Jr){var u=wr===zr;s&&j(s,"SwitchCase"),r.cases.push(s=q()),s.consequent=[],U(),u?s.test=K():(c&&t(Ir,"Multiple default clauses"),c=!0,s.test=null),z(gt)}else s||X(),s.consequent.push(J());return s&&j(s,"SwitchCase"),U(),Tr.pop(),j(r,"SwitchStatement");case Zr:return U(),Gt.test(pr.slice(Lr,yr))&&t(Lr,"Illegal newline after throw"),r.argument=K(),M(),j(r,"ThrowStatement");case et:if(U(),r.block=H(),r.handler=null,wr===Xr){var l=q();U(),z(ht),l.param=lr(),Vr&&Nt(l.param.name)&&t(l.param.start,"Binding "+l.param.name+" in strict mode"),z(vt),l.guard=null,l.body=H(),r.handler=j(l,"CatchClause")}return r.guardedHandlers=qr,r.finalizer=D($r)?H():null,r.handler||r.finalizer||t(r.start,"Missing catch or finally clause"),j(r,"TryStatement");case rt:return U(),r=G(r),M(),r;case tt:return U(),r.test=P(),Tr.push(Zt),r.body=J(),Tr.pop(),j(r,"WhileStatement");case nt:return Vr&&t(yr,"'with' in strict mode"),U(),r.object=P(),r.body=J(),j(r,"WithStatement");case dt:return H();case yt:return U(),j(r,"EmptyStatement");default:var f=Cr,p=K();if(e===Dr&&"Identifier"===p.type&&D(gt)){for(var a=0;a<Tr.length;++a)Tr[a].name===f&&t(p.start,"Label '"+f+"' is already declared");var d=wr.isLoop?"loop":wr===Yr?"switch":null;return Tr.push({name:f,kind:d}),r.body=J(),Tr.pop(),r.label=p,j(r,"LabeledStatement")}return r.expression=p,M(),j(r,"ExpressionStatement")}}function P(){z(ht);var e=K();return z(vt),e}function H(e){var r,t=q(),n=!0,a=!1;for(t.body=[],z(dt);!D(mt);){var o=J();t.body.push(o),n&&e&&F(o)&&(r=a,R(a=!0)),n=!1}return a&&!r&&R(!1),j(t,"BlockStatement")}function $(e,r){return e.init=r,z(yt),e.test=wr===yt?null:K(),z(yt),e.update=wr===vt?null:K(),z(vt),e.body=J(),Tr.pop(),j(e,"ForStatement")}function _(e,r){return e.left=r,e.right=K(),z(vt),e.body=J(),Tr.pop(),j(e,"ForInStatement")}function G(e,r){for(e.declarations=[],e.kind="var";;){var n=q();if(n.id=lr(),Vr&&Nt(n.id.name)&&t(n.id.start,"Binding "+n.id.name+" in strict mode"),n.init=D(Ct)?K(!0,r):null,e.declarations.push(j(n,"VariableDeclarator")),!D(bt))break}return j(e,"VariableDeclaration")}function K(e,r){var t=Q(r);if(!e&&wr===bt){var n=O(t);for(n.expressions=[t];D(bt);)n.expressions.push(Q(r));return j(n,"SequenceExpression")}return t}function Q(e){var r=Y(e);if(wr.isAssign){var t=O(r);return t.operator=Cr,t.left=r,U(),t.right=Q(e),N(r),j(t,"AssignmentExpression")}return r}function Y(e){var r=Z(e);if(D(kt)){var t=O(r);return t.test=r,t.consequent=K(!0),z(gt),t.alternate=K(!0,e),j(t,"ConditionalExpression")}return r}function Z(e){return er(rr(),-1,e)}function er(e,r,t){var n=wr.binop;if(null!=n&&(!t||wr!==ut)&&n>r){var a=O(e);a.left=e,a.operator=Cr,U(),a.right=er(rr(),n,t);var a=j(a,/&&|\|\|/.test(a.operator)?"LogicalExpression":"BinaryExpression");return er(a,r,t)}return e}function rr(){if(wr.prefix){var e=q(),r=wr.isUpdate;return e.operator=Cr,e.prefix=!0,U(),e.argument=rr(),r?N(e.argument):Vr&&"delete"===e.operator&&"Identifier"===e.argument.type&&t(e.start,"Deleting local variable in strict mode"),j(e,r?"UpdateExpression":"UnaryExpression")}for(var n=tr();wr.postfix&&!B();){var e=O(n);e.operator=Cr,e.prefix=!1,e.argument=n,N(n),U(),n=j(e,"UpdateExpression")}return n}function tr(){return nr(ar())}function nr(e,r){if(D(xt)){var t=O(e);return t.object=e,t.property=lr(!0),t.computed=!1,nr(j(t,"MemberExpression"),r)}if(D(ft)){var t=O(e);return t.object=e,t.property=K(),t.computed=!0,z(pt),nr(j(t,"MemberExpression"),r)}if(!r&&D(ht)){var t=O(e);return t.callee=e,t.arguments=ur(vt,!1),nr(j(t,"CallExpression"),r)}return e}function ar(){switch(wr){case ot:var e=q();return U(),j(e,"ThisExpression");case Dr:return lr();case Or:case Fr:case jr:var e=q();return e.value=Cr,e.raw=pr.slice(yr,gr),U(),j(e,"Literal");case it:case st:case ct:var e=q();return e.value=wr.atomValue,e.raw=wr.keyword,U(),j(e,"Literal");case ht:var r=xr,t=yr;U();var n=K();return n.start=t,n.end=gr,fr.locations&&(n.loc.start=r,n.loc.end=kr),fr.ranges&&(n.range=[t,gr]),z(vt),n;case ft:var e=q();return U(),e.elements=ur(pt,!0,!0),j(e,"ArrayExpression");case dt:return ir();case Gr:var e=q();return U(),cr(e,!1);case at:return or();default:X()}}function or(){var e=q();return U(),e.callee=nr(ar(),!0),e.arguments=D(ht)?ur(vt,!1):qr,j(e,"NewExpression")}function ir(){var e=q(),r=!0,n=!1;for(e.properties=[],U();!D(mt);){if(r)r=!1;else if(z(bt),fr.allowTrailingCommas&&D(mt))break;var a,o={key:sr()},i=!1;if(D(gt)?(o.value=K(!0),a=o.kind="init"):fr.ecmaVersion>=5&&"Identifier"===o.key.type&&("get"===o.key.name||"set"===o.key.name)?(i=n=!0,a=o.kind=o.key.name,o.key=sr(),wr!==ht&&X(),o.value=cr(q(),!1)):X(),"Identifier"===o.key.type&&(Vr||n))for(var s=0;s<e.properties.length;++s){var c=e.properties[s];if(c.key.name===o.key.name){var u=a==c.kind||i&&"init"===c.kind||"init"===a&&("get"===c.kind||"set"===c.kind);u&&!Vr&&"init"===a&&"init"===c.kind&&(u=!1),u&&t(o.key.start,"Redefinition of property")}}e.properties.push(o)}return j(e,"ObjectExpression")}function sr(){return wr===Or||wr===Fr?ar():lr(!0)}function cr(e,r){wr===Dr?e.id=lr():r?X():e.id=null,e.params=[];var n=!0;for(z(ht);!D(vt);)n?n=!1:z(bt),e.params.push(lr());var a=Rr,o=Tr;if(Rr=!0,Tr=[],e.body=H(!0),Rr=a,Tr=o,Vr||e.body.body.length&&F(e.body.body[0]))for(var i=e.id?-1:0;i<e.params.length;++i){var s=0>i?e.id:e.params[i];if((Xt(s.name)||Nt(s.name))&&t(s.start,"Defining '"+s.name+"' in strict mode"),i>=0)for(var c=0;i>c;++c)s.name===e.params[c].name&&t(s.start,"Argument name clash in strict mode")}return j(e,r?"FunctionDeclaration":"FunctionExpression")}function ur(e,r,t){for(var n=[],a=!0;!D(e);){if(a)a=!1;else if(z(bt),r&&fr.allowTrailingCommas&&D(e))break;t&&wr===bt?n.push(null):n.push(K(!0))}return n}function lr(e){var r=q();return r.name=wr===Dr?Cr:e&&!fr.forbidReserved&&wr.keyword||X(),U(),j(r,"Identifier")}e.version="0.3.2";var fr,pr,dr,mr;e.parse=function(e,t){return pr=String(e),dr=pr.length,r(t),o(),W(fr.program)};var hr=e.defaultOptions={ecmaVersion:5,strictSemicolons:!1,allowTrailingCommas:!0,forbidReserved:!1,locations:!1,onComment:null,ranges:!1,program:null,sourceFile:null},vr=e.getLineInfo=function(e,r){for(var t=1,n=0;;){Kt.lastIndex=n;var a=Kt.exec(e);if(!(a&&a.index<r))break;++t,n=a.index+a[0].length}return{line:t,column:r-n}};e.tokenize=function(e,t){function n(e){return g(e),a.start=yr,a.end=gr,a.startLoc=xr,a.endLoc=kr,a.type=wr,a.value=Cr,a}pr=String(e),dr=pr.length,r(t),o();var a={};return n.jumpTo=function(e,r){if(br=e,fr.locations){Ar=1,Sr=Kt.lastIndex=0;for(var t;(t=Kt.exec(pr))&&t.index<e;)++Ar,Sr=t.index+t[0].length}Er=r,u()},n};var br,yr,gr,xr,kr,wr,Cr,Er,Ar,Sr,Ir,Lr,Ur,Rr,Tr,Vr,qr=[],Or={type:"num"},jr={type:"regexp"},Fr={type:"string"},Dr={type:"name"},Br={type:"eof"},Mr={keyword:"break"},zr={keyword:"case",beforeExpr:!0},Xr={keyword:"catch"},Nr={keyword:"continue"},Wr={keyword:"debugger"},Jr={keyword:"default"},Pr={keyword:"do",isLoop:!0},Hr={keyword:"else",beforeExpr:!0},$r={keyword:"finally"},_r={keyword:"for",isLoop:!0},Gr={keyword:"function"},Kr={keyword:"if"},Qr={keyword:"return",beforeExpr:!0},Yr={keyword:"switch"},Zr={keyword:"throw",beforeExpr:!0},et={keyword:"try"},rt={keyword:"var"},tt={keyword:"while",isLoop:!0},nt={keyword:"with"},at={keyword:"new",beforeExpr:!0},ot={keyword:"this"},it={keyword:"null",atomValue:null},st={keyword:"true",atomValue:!0},ct={keyword:"false",atomValue:!1},ut={keyword:"in",binop:7,beforeExpr:!0},lt={"break":Mr,"case":zr,"catch":Xr,"continue":Nr,"debugger":Wr,"default":Jr,"do":Pr,"else":Hr,"finally":$r,"for":_r,"function":Gr,"if":Kr,"return":Qr,"switch":Yr,"throw":Zr,"try":et,"var":rt,"while":tt,"with":nt,"null":it,"true":st,"false":ct,"new":at,"in":ut,"instanceof":{keyword:"instanceof",binop:7,beforeExpr:!0},"this":ot,"typeof":{keyword:"typeof",prefix:!0,beforeExpr:!0},"void":{keyword:"void",prefix:!0,beforeExpr:!0},"delete":{keyword:"delete",prefix:!0,beforeExpr:!0}},ft={type:"[",beforeExpr:!0},pt={type:"]"},dt={type:"{",beforeExpr:!0},mt={type:"}"},ht={type:"(",beforeExpr:!0},vt={type:")"},bt={type:",",beforeExpr:!0},yt={type:";",beforeExpr:!0},gt={type:":",beforeExpr:!0},xt={type:"."},kt={type:"?",beforeExpr:!0},wt={binop:10,beforeExpr:!0},Ct={isAssign:!0,beforeExpr:!0},Et={isAssign:!0,beforeExpr:!0},At={binop:9,prefix:!0,beforeExpr:!0},St={postfix:!0,prefix:!0,isUpdate:!0},It={prefix:!0,beforeExpr:!0},Lt={binop:1,beforeExpr:!0},Ut={binop:2,beforeExpr:!0},Rt={binop:3,beforeExpr:!0},Tt={binop:4,beforeExpr:!0},Vt={binop:5,beforeExpr:!0},qt={binop:6,beforeExpr:!0},Ot={binop:7,beforeExpr:!0},jt={binop:8,beforeExpr:!0},Ft={binop:10,beforeExpr:!0};e.tokTypes={bracketL:ft,bracketR:pt,braceL:dt,braceR:mt,parenL:ht,parenR:vt,comma:bt,semi:yt,colon:gt,dot:xt,question:kt,slash:wt,eq:Ct,name:Dr,eof:Br,num:Or,regexp:jr,string:Fr};for(var Dt in lt)e.tokTypes["_"+Dt]=lt[Dt];var Bt,Mt=n("abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile"),zt=n("class enum extends super const export import"),Xt=n("implements interface let package private protected public static yield"),Nt=n("eval arguments"),Wt=n("break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this"),Jt=/[\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]/,Pt="\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc",Ht="\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f",$t=new RegExp("["+Pt+"]"),_t=new RegExp("["+Pt+Ht+"]"),Gt=/[\n\r\u2028\u2029]/,Kt=/\r\n|[\n\r\u2028\u2029]/g,Qt=e.isIdentifierStart=function(e){return 65>e?36===e:91>e?!0:97>e?95===e:123>e?!0:e>=170&&$t.test(String.fromCharCode(e))},Yt=e.isIdentifierChar=function(e){return 48>e?36===e:58>e?!0:65>e?!1:91>e?!0:97>e?95===e:123>e?!0:e>=170&&_t.test(String.fromCharCode(e))},Zt={kind:"loop"},en={kind:"switch"}});

  var binaryOperators = {
    '+': '__add',
    '-': '__subtract',
    '*': '__multiply',
    '/': '__divide',
    '%': '__modulo',
    '==': 'equals',
    '!=': 'equals'
  };

  var unaryOperators = {
    '-': '__negate',
    '+': null
  };

  var fields = Base.each(
    ['add', 'subtract', 'multiply', 'divide', 'modulo', 'negate'],
    function(name) {
      this['__' + name] = '#' + name;
    },
    {}
  );
  Point.inject(fields);
  Size.inject(fields);
  Color.inject(fields);

  function _$_(left, operator, right) {
    var handler = binaryOperators[operator];
    if (left && left[handler]) {
      var res = left[handler](right);
      return operator === '!=' ? !res : res;
    }
    switch (operator) {
    case '+': return left + right;
    case '-': return left - right;
    case '*': return left * right;
    case '/': return left / right;
    case '%': return left % right;
    case '==': return left == right;
    case '!=': return left != right;
    }
  }

  function $_(operator, value) {
    var handler = unaryOperators[operator];
    if (handler && value && value[handler])
      return value[handler]();
    switch (operator) {
    case '+': return +value;
    case '-': return -value;
    }
  }

  function compile(code) {

    var insertions = [];

    function getOffset(offset) {
      for (var i = 0, l = insertions.length; i < l; i++) {
        var insertion = insertions[i];
        if (insertion[0] >= offset)
          break;
        offset += insertion[1];
      }
      return offset;
    }

    function getCode(node) {
      return code.substring(getOffset(node.range[0]),
          getOffset(node.range[1]));
    }

    function replaceCode(node, str) {
      var start = getOffset(node.range[0]),
        end = getOffset(node.range[1]),
        insert = 0;
      for (var i = insertions.length - 1; i >= 0; i--) {
        if (start > insertions[i][0]) {
          insert = i + 1;
          break;
        }
      }
      insertions.splice(insert, 0, [start, str.length - end + start]);
      code = code.substring(0, start) + str + code.substring(end);
    }

    function walkAST(node, parent) {
      if (!node)
        return;
      for (var key in node) {
        if (key === 'range')
          continue;
        var value = node[key];
        if (Array.isArray(value)) {
          for (var i = 0, l = value.length; i < l; i++)
            walkAST(value[i], node);
        } else if (value && typeof value === 'object') {
          walkAST(value, node);
        }
      }
      switch (node && node.type) {
      case 'UnaryExpression': 
        if (node.operator in unaryOperators
            && node.argument.type !== 'Literal') {
          var arg = getCode(node.argument);
          replaceCode(node, '$_("' + node.operator + '", '
              + arg + ')');
        }
        break;
      case 'BinaryExpression': 
        if (node.operator in binaryOperators
            && node.left.type !== 'Literal') {
          var left = getCode(node.left),
            right = getCode(node.right);
          replaceCode(node, '_$_(' + left + ', "' + node.operator
              + '", ' + right + ')');
        }
        break;
      case 'UpdateExpression': 
      case 'AssignmentExpression': 
        if (!(parent && (
            parent.type === 'ForStatement'
            || parent.type === 'BinaryExpression'
              && /^[=!<>]/.test(parent.operator)
            || parent.type === 'MemberExpression'
              && parent.computed))) {
          if (node.type === 'UpdateExpression') {
            if (!node.prefix) {
              var arg = getCode(node.argument);
              replaceCode(node, arg + ' = _$_(' + arg + ', "'
                  + node.operator[0] + '", 1)');
            }
          } else { 
            if (/^.=$/.test(node.operator)
                && node.left.type !== 'Literal') {
              var left = getCode(node.left),
                right = getCode(node.right);
              replaceCode(node, left + ' = _$_(' + left + ', "'
                  + node.operator[0] + '", ' + right + ')');
            }
          }
        }
        break;
      }
    }
    walkAST(scope.acorn.parse(code, { ranges: true }));
    return code;
  }

  function execute(code, scope) {
    paper = scope;
    var view = scope.getView(),
      tool = /\s+on(?:Key|Mouse)(?:Up|Down|Move|Drag)\b/.test(code)
          ? new Tool()
          : null,
      toolHandlers = tool ? tool._events : [],
      handlers = ['onFrame', 'onResize'].concat(toolHandlers),
      params = [],
      args = [],
      func;
    code = compile(code);
    function expose(scope, hidden) {
      for (var key in scope) {
        if ((hidden || !/^_/.test(key)) && new RegExp(
            '\\b' + key.replace(/\$/g, '\\$') + '\\b').test(code)) {
          params.push(key);
          args.push(scope[key]);
        }
      }
    }
    expose({ _$_: _$_, $_: $_, view: view, tool: tool }, true);
    expose(scope);
    handlers = Base.each(handlers, function(key) {
      if (new RegExp('\\s+' + key + '\\b').test(code)) {
        params.push(key);
        this.push(key + ': ' + key);
      }
    }, []).join(', ');
    if (handlers)
      code += '\nreturn { ' + handlers + ' };';
    var firefox = window.InstallTrigger;
    if (firefox || window.chrome) {
      var script = document.createElement('script'),
        head = document.head;
      if (firefox)
        code = '\n' + code;
      script.appendChild(document.createTextNode(
        'paper._execute = function(' + params + ') {' + code + '\n}'
      ));
      head.appendChild(script);
      func = paper._execute;
      delete paper._execute;
      head.removeChild(script);
    } else {
      func = Function(params, code);
    }
    var res = func.apply(scope, args) || {};
    Base.each(toolHandlers, function(key) {
      var value = res[key];
      if (value)
        tool[key] = value;
    });
    if (view) {
      if (res.onResize)
        view.setOnResize(res.onResize);
      view.fire('resize', {
        size: view.size,
        delta: new Point()
      });
      if (res.onFrame)
        view.setOnFrame(res.onFrame);
      view.update();
    }
  }

  function load() {
    Base.each(document.getElementsByTagName('script'), function(script) {
      if (/^text\/(?:x-|)paperscript$/.test(script.type)
          && !script.getAttribute('data-paper-ignore')) {
        var canvas = PaperScope.getAttribute(script, 'canvas'),
          scope = PaperScope.get(canvas)
              || new PaperScope(script).setup(canvas),
          src = script.src;
        if (src) {
          Http.request('get', src, function(code) {
            execute(code, scope);
          });
        } else {
          execute(script.innerHTML, scope);
        }
        script.setAttribute('data-paper-ignore', true);
      }
    }, this);
  }

  if (document.readyState === 'complete') {
    setTimeout(load);
  } else {
    DomEvent.add(window, { load: load });
  }

  return {
    compile: compile,
    execute: execute,
    load: load,
    lineNumberBase: 0
  };

}).call(this);

paper = new (PaperScope.inject(Base.exports, {
  enumerable: true,
  Base: Base,
  Numerical: Numerical,
  DomElement: DomElement,
  DomEvent: DomEvent,
  Http: Http,
  Key: Key
}))();

if (typeof define === 'function' && define.amd)
  define('paper', paper);

return paper;
};
// var s;
// $(function() {
//   s = Snap('svg');

//   var bounds= document.getElementById('svg').getBoundingClientRect();
//   var width = bounds.width;
//   var height = bounds.height;
//   var triangles =[];
//   var vertices=[];
//   var triangleHolder= s.g();
//   var pointMarks = s.g();
//   var objIndex=0;


//   function getRandomPoint(){
//     var point={};
//     point.x=randomNumber(0, width);
//     point.y=randomNumber(0, height);
//     return point;
//     }

//   function tweenPoint(tweenObject,targetEl) {
//     var point=getRandomPoint();
//     var point2=getRandomPoint();
//     var randX=point.x;
//     var randY=point.y;
//     var randX2=point2.x
//     var randY2=point2.y;
//     TweenLite.to(tweenObject, 16, {bezier:[{x:randX, y:randY}, {x:randX2, y:randY2}],ease:Sine.easeInOut, onComplete:tweenPoint,onCompleteParams:[tweenObject,targetEl],onUpdate:applyValue, onUpdateParams:["{self}",targetEl]});
//   }

//   function applyValue(tween,targetEl) {
//     vertices[targetEl.data("index")][0]=tween.target.x;
//     vertices[targetEl.data("index")][1]=tween.target.y;
//     targetEl.attr({cx:tween.target.x,cy:tween.target.y})
//   }

//   function randomNumber(min, max) {
//       return Math.floor(Math.random() * (1 + max - min) + min);
//   }
   
//   function makeObj(){
//     var point = getRandomPoint();
//     var c = s.circle(point.x, point.y, 4);
//     c.attr({fill:"rgba(110,70,110,0)"})
//     var dummyObject={}
//     dummyObject.x=c.getBBox().x;
//     dummyObject.y=c.getBBox().y;
//     tweenPoint(dummyObject,c);
//     c.data("index",objIndex)
//     var returnArr =[dummyObject.x,dummyObject.y,c]
//     objIndex++;
//     return returnArr;
//   }


//   function draw(){
//     triangleHolder.clear();
//       for(i=triangles.length; i>0 ;i-=3 ) {
//         var cString = 
//           "M"+vertices[triangles[i-1]][0]+" "+vertices[triangles[i-1]][1]+
//           "L"+vertices[triangles[i-2]][0]+" "+vertices[triangles[i-2]][1]+
//           "L"+vertices[triangles[i-3]][0]+" "+vertices[triangles[i-3]][1]+"z";
//         var c = s.path(cString).attr({  fill: "rgba(173,216,94,"+i*.004+")",
//       stroke: "rgba(173,216,94,0.1)",
//       strokeWidth: 2});
//       triangleHolder.add(c)  
//       }

//   }


//   for(i=0;i<14;i++){
    
//       vertices.push(makeObj());
//   }


    
//   function doDelaunay() {
//     triangles = Delaunay.triangulate(vertices);
//    if(triangles.length>2){draw()};
    
//     requestAnimationFrame(doDelaunay);
//   }
//   requestAnimationFrame(doDelaunay);

// });
(function() {
  $(function() {
    $('body').prepend('<div id="fb-root"></div>');
    return $.ajax({
      url: "" + window.location.protocol + "//connect.facebook.net/es_LA/all.js",
      dataType: 'script',
      cache: true
    });
  });

  window.fbAsyncInit = function() {
    FB.init({
      appId: '261219254067038',
      cookie: true
    });
    $('#sign_in').click(function(e) {
      e.preventDefault();
      return FB.login(function(response) {
        if (response.authResponse) {
          return window.location = '/auth/facebook/callback';
        }
      }, {
        scope: 'publish_actions'
      });
    });
    return $('#sign_out').click(function(e) {
      FB.getLoginStatus(function(response) {
        if (response.authResponse) {
          return FB.logout();
        }
      });
      return true;
    });
  };

}).call(this);
(function() {
  $(function() {
    return $('.btn').on('click', function() {
      FB.api('/me/feed', 'post', {
        message: 'Hello, world!'
      }, function(response) {
        if (!response || response.error) {
          return alert("Error occured");
        } else {
          return alert("Action was successful! Action ID: " + response.id);
        }
      });
      return console.log("click");
    });
  });

}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//









// $(function() {
//   $('.btn').on('click', function(e) {
//     e.preventDefault();
//     FB.api('/me/feed', 'post', {
//       message: 'Hello, world!'
//     });
//     console.log("click");
//   });
// });
