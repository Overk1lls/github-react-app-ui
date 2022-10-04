const sonarqubeScanner = require('sonarqube-scanner');

const url = 'http://localhost:9000/';

sonarqubeScanner({ serverUrl: url }, () => {
  console.info('Scanner has started');
});