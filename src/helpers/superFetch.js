const customHeader = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});

const handleFetchResponse = (response, customHandle) => {
  if (customHandle) {
    let result = customHandle(response);
    if (result) {
      return result;
    }
  }
  if (Number(response.status) >= 400) {
    return new Promise((resolve, reject) => {
      resolve(response.json());
    })
    .then((responseError) => {
      return {
        status: response.status,
        error: responseError
      };
    })
    .catch(error => {
      return {
        status: response.status,
        error: {
          code: 'unexpectedError'
        }
      };
    });
  }

  return response.json();
}

const base = (method, url, data, customHandle, customOptions) => {
  let options = {
    method: String(method).toUpperCase(),
    headers: customHeader()
  };

  options.credentials = 'same-origin';

  // Set body request
  if (data) {
    options.body =  JSON.stringify(data);
  }

  if( String(method).toUpperCase() === 'PATCH' && !options.body) {
    options.body = '{}';
  }

  if( customOptions ) {
    options = {
      ...options,
      ...customOptions
    };
  }

  return fetch(`${url}`, options)
    .then(response => {
      return handleFetchResponse(response, customHandle);
    })
    .catch(error => {
      return {
        status: error.status,
        error: {
          code: 'unexpectedError',
          description: error
        }
      };
    })
};

const SuperFetch = {};

['get', 'post', 'put', 'patch', 'delete'].forEach(method => {
  SuperFetch[method] = base.bind(null, method);
});

export default SuperFetch;