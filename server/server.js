const path = require('path')
const express = require('express')

module.exports = {
  app: function() {
    const app = express()
    const indexPath = path.join(__dirname, '../dist/index.html')
    app.use(express.static(path.join(__dirname, '../dist')));
    app.use(express.static(path.join(__dirname, '../bower_components')));

    app.get('/', function(_, res) {
      res.sendFile(indexPath)
    })

    return app
  }
}
