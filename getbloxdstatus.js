let cacheStatus = null

const getStatus = async () => {
    if (cacheStatus && cacheStatus.cacheTime && cacheStatus.cacheTime + 1000*60*5 > Date.now()) {
        return cacheStatus
    }
    const start = performance.now()
    const response = await fetch("https://bloxd.io")
    const end = performance.now()
    cacheStatus = {code:response.status,text:response.statusText,ok:response.ok,time:end-start,cacheTime:Date.now()}
    return cacheStatus
}

module.exports = {getStatus}