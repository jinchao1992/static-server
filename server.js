const http = require('http')
const fs = require('fs')
const url = require('url')
const port = process.argv[2] || 80

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

const server = http.createServer(function (request, response) {
  const parsedUrl = url.parse(request.url, true)
  const pathWithQuery = request.url
  const queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  const path = parsedUrl.pathname
  const query = parsedUrl.query
  const method = request.method
  const filePath = path === '/' ? '/index.html' : path
  console.log('超哥说：含查询字符串的路径\n' + pathWithQuery);
  response.statusCode = 200;
  const index = filePath.lastIndexOf('.')
  // 获取后缀
  const suffix = filePath.substring(index)
  const types = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.jpg': 'image/jpeg'
  }
  response.setHeader('Content-Type', `${types[suffix]}; charset=utf-8`);
  let content
  try {
    content = fs.readFileSync(`./public${path}`)
  } catch (err) {
    content = '您所访问的路径不存在'
    response.statusCode = 404
  }
  response.write(content)
  response.end();
})
server.listen(port)
console.log('监听 ' + port + ' 成功\n请在浏览器里打开 http://localhost:' + port)
