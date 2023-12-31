function createUserSession(req, user, action) {
    req.session.uid = user.id;
    req.session.position = user.position;

    req.session.save(action);
  }
  
  function destroyUserAuthSession(req) {
    req.session.uid = null;
  }
  
  module.exports = {
    createUserSession: createUserSession,
    destroyUserAuthSession: destroyUserAuthSession
  };