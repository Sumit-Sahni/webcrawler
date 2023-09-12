const {normalizeURL, getURLsFromHTML} =  require("./crawl.js");
const {test, expect} =  require("@jest/globals");

test('normalizeURL', ()=>{
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL string protocol', ()=>{
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', ()=>{
    const inputHTMLBody = `
      <html>
          <body>
             <a href="https://blog.boot.dev/">Boot.dev Blog</a>
          </body>
      </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML( inputHTMLBody ,inputBaseURL)
    const expected = ["https://blog.boot.dev/"]
    expect(actual).toEqual(expected)
})


// Relative UTLS means it dosen't include protocol & domain only paths
test('getURLsFromHTML relative', ()=>{
    const inputHTMLBody = `
      <html>
          <body>
             <a href="/path/">Boot.dev Blog</a>
          </body>
      </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML( inputHTMLBody ,inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

// URL for BOth Absolute & Relative
test('getURLsFromHTML relative & absolute', ()=>{
    const inputHTMLBody = `
      <html>
          <body>
             <a href="https://blog.boot.dev/path1/">Boot.dev Blog Path1 </a>
             <a href="/path2/">Boot.dev Blog Path2</a>
          </body>
      </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML( inputHTMLBody ,inputBaseURL)
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})

// Invalid URLS
test('getURLsFromHTML IvalidURLS', ()=>{
    const inputHTMLBody = `
      <html>
          <body>
             <a href="invalid">Boot.dev Blog Path1 </a>
          </body>
      </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML( inputHTMLBody ,inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})