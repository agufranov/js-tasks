const http = require('http')

const expensiveCalculation = {
  /**
   * Very expensive calculations, reuslts are valid for 5+ seconds 
   * 
   * @param {string} param some query parameter
   * @returns {Promise<String>} some result
   */
  async calculateData(param) {
    return await (new Promise(resolve => setTimeout(() => {
      resolve(`result for ${param}`)
    }, 1000)))
  }
}

/* ---------- edit below this line ---------------- */

function memoisePromise(promiseFn, timeout) {
	let cache = {};
  
  return function(arg) {
  	if (
    	!cache[arg] ||
      !cache[arg].promise ||
      (Date.now() - cache[arg].lastExecTime) > timeout
    ) {
    	cache[arg] = {
      	lastExecTime: Date.now(),
        promise: promiseFn.call(this, arg)
      }
    }
    return cache[arg].promise;
  }
}

const memoizedCalc = memoisePromise(expensiveCalculation.calculateData).bind(expensiveCalculation);

http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`)
  const param = url.searchParams.get('query_param')

  const result = await memoizedCalc(param)
  res.write(`${result}`)
  res.end()
}).listen(5000)
