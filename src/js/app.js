(function(window){
  window.smartApp = {};

  smartApp.config = {
    clientId: 'faf44bec-04fb-47aa-8d31-8dfe3eff1720',
    scope: 'patient/*.read',
    redirectUri: 'https://nanofied.github.io/smart-application-template/app.html'
  };

  smartApp.data = {
    patient: {},
    observations: {}
  };

  smartApp.authorizeApplication = function() {
    FHIR.oauth2.authorize({
        clientId: smartApp.config.clientId,
        scope: smartApp.config.scope,
        redirectUri: smartApp.config.redirectUri
      })
      .catch(console.error);
  };

  smartApp.startApplication = function() {
    console.log('Starting SMART application');
    FHIR.oauth2.ready()
      .then(function(client) {
        console.log('Passing client');
        console.log(client);
        smartApp.extractData(client);
      })
      .catch(console.error);
  };

  smartApp.extractData = function(client) {
    client.patient.read()
      .then(function(patient) {
        console.log('Extracting patient');
        console.log(patient);
        smartApp.data.patient.id = patient.id;
        smartApp.data.patient.firstName = patient.name[0].given[0];
        smartApp.data.patient.lastName = patient.name[0].family[0];
        smartApp.data.patient.birthDate = patient.birthDate;
        smartApp.data.patient.gender = patient.gender;
        smartApp.renderHTML();
      })
      .catch(console.error);
  };

  smartApp.renderHTML = function() {
    console.log('Rendering HTML');
    console.log(smartApp.data);
  };

})(window);
