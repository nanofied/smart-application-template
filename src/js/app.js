(function(window){
  window.smartApp = {};

  smartApp.authorizeApplication = function() {
    FHIR.oauth2.authorize({
        'clientId': 'faf44bec-04fb-47aa-8d31-8dfe3eff1720',
        'scope': 'patient/*.read launch profile openid online_access',
        'redirectUri': 'https://nanofied.github.io/smart-application-template/app.html'
      })
      .catch(function(reason) {
        console.error(reason);
      });
  };

  smartApp.extractData = function(client) {
    var patient = client.request('Patient');
    console.log(patient);
  };

  smartApp.renderHTML = function() {
    // Add logic for rendering extracted data in HTML
  };

})(window);
