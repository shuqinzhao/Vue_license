// https://developer.mozilla.org/en-US/docs/DOM/document.cookie

// This framework is released under the GNU Public License, version 3 or later.
// http://www.gnu.org/licenses/gpl-3.0-standalone.html

// Syntaxes:

// * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
// * docCookies.getItem(name)
// * docCookies.removeItem(name[, path], domain)
// * docCookies.hasItem(name)
// * docCookies.keys()

class docCookies {
  static getItem (sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*)\\s*' + encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&') + '\\s*\\=\\s*([^]*).*$)|^.*$'), '$1')) || null
  }

  static setItem (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    const regExp = new RegExp(/^(?:expires|max-age|path|domain|secure)$/, 'i')
    if (!sKey || regExp.test(sKey)) {
      return false
    }

    let sExpires = ''

    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? ' expires=Fri, 31 Dec 9999 23:59:59 GMT' : ` max-age=${vEnd}`
          break
        case String:
          sExpires = ` expires=${vEnd}`
          break
        case Date:
          sExpires = ` expires=${vEnd.toUTCString()}`
          break
      }
    }

    document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? ' domain=' + sDomain : '') + (sPath ? ' path=' + sPath : '') + (bSecure ? ' secure' : '')

    return true
  }

  static removeItem (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) {
      return false
    }

    document.cookie = encodeURIComponent(sKey) + '= expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? ' domain=' + sDomain : '') + (sPath ? ' path=' + sPath : '')

    return true
  }

  static hasItem (sKey) {
    return (new RegExp('(?:^|\\s*)' + encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&') + '\\s*\\=')).test(document.cookie)
  }

  static keys () {
    const aKeys = document.cookie.replace(/((?:^|\s*)[^=]+)(?=|$)|^\s*|\s*(?:=[^]*)?(?:\1|$)/g, '').split(/\s*(?:=[^]*)?\s*/)

    return aKeys.map((item) => {
      return decodeURIComponent(item)
    })
  }
}

export default docCookies
