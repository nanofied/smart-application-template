(function(window){
  window.smartApp = {};

  smartApp.config = {
    clientId: 'faf44bec-04fb-47aa-8d31-8dfe3eff1720',
    scope: 'patient/*.read launch',
    redirectUri: 'https://nanofied.github.io/smart-application-template/app.html'
  };

  smartApp.data = {
    patient: {},
    encounter: {}
  };

  smartApp.authorizeApplication = function() {
    // Authorize FHIR client
    FHIR.oauth2.authorize({
        clientId: smartApp.config.clientId,
        scope: smartApp.config.scope,
        redirectUri: smartApp.config.redirectUri
      })
      .catch(console.error);
  };

  smartApp.startApplication = function() {
    console.log('Starting SMART application');
    // FHIR client ready
    FHIR.oauth2.ready()
      .then(function(client) {
        console.log('Passing client');
        console.log(client);
        // Extract data
        smartApp.extractData(client);
      })
      .catch(console.error);
  };

  smartApp.extractData = function(client) {
    // Read patient data
    client.patient.read()
      .then(function(patient) {
        console.log('Extracting patient');
        console.log(patient);
        smartApp.data.patient.id = patient.id;
        smartApp.data.patient.firstName = patient.name[0].given[0];
        smartApp.data.patient.lastName = patient.name[0].family[0];
        smartApp.data.patient.birthDate = patient.birthDate;
        smartApp.data.patient.gender = patient.gender;
        smartApp.data.patient.city = patient.address[0].city;
        smartApp.data.patient.state = patient.address[0].state;
        smartApp.data.patient.postalCode = patient.address[0].postalCode;
        // Read encounter data
        client.encounter.read()
          .then(function(encounter) {
            console.log('Extracting encounter');
            console.log(encounter);
            smartApp.data.encounter.id = encounter.id;
            smartApp.data.encounter.class = encounter.class;
            smartApp.data.encounter.status = encounter.status;
            smartApp.data.encounter.type = encounter.type[0].text;
            smartApp.data.encounter.start = encounter.period.start;
            smartApp.data.encounter.end = encounter.period.end;
            // Render HTML
            smartApp.renderHTML();
          })
          .catch(console.error);
      })
      .catch(console.error);
  };

  smartApp.renderHTML = function() {
    console.log('Rendering HTML');
    console.log(smartApp.data);
  };

})(window);
