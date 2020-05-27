(function (d) {
  var c = d.createElement('link')
  c.rel = 'stylesheet'
  c.href = './he-standard.css'
  var s = d.createElement('script')
  s.src = './he-standard.js'
  var sn = d.getElementsByTagName('script')[0]
  sn.parentNode.insertBefore(c, sn)
  sn.parentNode.insertBefore(s, sn)
})(document)
