var request = require('request');
const baseUrl = 'https://api.keyvalue.xyz';

function createToken(key, callback) {
    var url = baseUrl + '/new/' + key;
    request({
        url: url,
        method: 'POST'
    },
    function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var tokenUrl = response.body;
            var token = tokenUrl.split(baseUrl + '/')[1].split('/')[0];
            callback(null, token);
            return;
        }
        callback(error || 'Invalid HTTP response', null);
    });
}

function getValueForKey(token, key, callback) {
    var url = baseUrl + '/' + token + '/' + key;
    request({
        url: url,
        method: 'GET'
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            if (response.body == '\n') {
                callback(null, null);
            }
            else {
                callback(null, response.body.trim());
            }
            return;
        }
        callback(error || 'Invalid HTTP response', null);
    });
}

function getJSONForKey(token, key, callback) {
    getValueForKey(token, key, function(error, response) {
        if (error) {
            callback(error, response);
            return;
        }
        if (!response) {
            callback(null, {});
            return;
        }
        try {
            callback(null, JSON.parse(response));
        }
        catch (e) {
            callback('Error parsing response: ' + e, null);
        }
    });
}

function setValueForKey(token, key, value, callback) {
    var url = baseUrl + '/' + token + '/' + key;
    request({
        url: url,
        method: 'POST',
        body: value
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(null);
        }
        else {
            callback(error || 'Invalid HTTP response');
        }
    });
}

function setJSONForKey(token, key, value, callback) {
    var url = baseUrl + '/' + token + '/' + key;
    request({
        url: url,
        method: 'POST',
        json: true,
        body: value
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(null);
        }
        else {
            callback(error || 'Invalid HTTP response');
        }
    });
}

module.exports = {
    createToken: createToken,
    getValueForKey: getValueForKey,
    getJSONForKey: getJSONForKey,
    setValueForKey: setValueForKey,
    setJSONForKey: setJSONForKey
};
