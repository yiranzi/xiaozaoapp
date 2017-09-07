const SchooRouter = require('../server/router/school');

module.exports = {
  load: function (server) {
    SchooRouter.load(server);
  }
};
