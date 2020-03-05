(function(window){
  window.smartApp = {};

  smartApp.config = {
    clientId: 'faf44bec-04fb-47aa-8d31-8dfe3eff1720',
    scope: 'patient/*.read launch profile openid online_access',
    redirectUri: 'https://nanofied.github.io/smart-application-template/app.html'
  };

  smartApp.authorizeApplication = function() {
    FHIR.oauth2.authorize({
        clientId: smartApp.config.clientId,
        scope: smartApp.config.scope,
        redirectUri: smartApp.config.redirectUri
      })
      .catch(function(reason) {
        console.error(reason);
      });
  };

  smartApp.onReady = function() {
    FHIR.oauth2.ready()
      .then(function(client) {
        smartApp.extractData(client);
      })
      .catch(function(reason) {
        console.error(reason);
      });
  };

  smartApp.extractData = function(client) {
    console.log(client);
  };

  smartApp.renderHTML = function(data) {
    console.log(data);
  };

})(window);
