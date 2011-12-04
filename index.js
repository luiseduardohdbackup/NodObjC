
/**
 * NodObjC is the bridge between NodeJS and the Objective-C runtime and
 * frameworks. 
 */

/**
 * The `$` function is the primary export of NodObjC. When a framework is
 * imported, it's exported classes, functions, etc. get placed onto this as a sort
 * of "global module exports".
 */

module.exports = $

/**
 * Load the node-ffi extensions.
 */

require('./ffi-extend')

/**
 * Module dependencies.
 */

var Import = require('./import')

/**
 * `import()` is usually the first function called after requiring the `NodObjC`
 * module.
 */

$.import  = Import.import
$.resolve = Import.resolve

/**
 * This function accepts native JS types (String, Number, Date) and converts them
 * to the proper Objective-C type (NSString, NSNumber, NSDate).
 *   Syntax Sugar...
 */

function $ (o) {
  var t = typeof o
  if (t == 'string') {
    return $.NSString('stringWithUTF8String', String(o))
  } else if (t == 'number') {
    return $.NSNumber('numberWithDouble', Number(o))
  } else if (isDate(o)) {
    return $.NSDate('dateWithTimeIntervalSince1970', o / 1000)
  }
  throw new Error('Unsupported object passed in to convert: ' + o)
}


function isDate (d) {
  return d instanceof Date
      || Object.prototype.toString.call(d) == '[object Date]'
}
