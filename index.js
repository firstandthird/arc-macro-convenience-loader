module.exports = (arc, cloudformation, stage) => {
  const params = {};
  Object.keys(arc).forEach(k => {
    // if there's just one entry:
    if (!Array.isArray(arc[k][0])) {
      params[k] = arc[k][0];
    // if it's the list of routes:
    } else if (k === 'http') {
      params.http = {
        get: [],
        post: [],
        put: [],
        delete: []
      };
      // if it's just two entry assume its a mapping:
      arc.http.forEach(entry => {
        params.http[entry[0]].push(entry[1]);
      });
    } else {
      // if it's a list of params:
      params[k] = {};
      arc[k].forEach(entry => {
        // just two entries then make a mapping:
        if (entry.length === 2) {
          params[k][entry[0]] = entry[1];
        } else {
          params[k][entry[0]] = entry.slice(1, entry.length);
        }
      });
    }
  });
  return params;
};
