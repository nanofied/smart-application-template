(function(window){
  window.smartApp = {};

  smartApp.extractData = function(client) {
    var patient = client.request('Patient');
    console.log(patient);
  };

  smartApp.renderHTML = function() {
    // Add logic for rendering extracted data in HTML
  };

})(window);
