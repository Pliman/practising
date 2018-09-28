cluster = require('cluster')
numCPUs = require('os').cpus().length

module.exports = {
    launch: () => {
        console.log('Before the fork')

        if (cluster.isMaster) {
            console.log('I am the master, launching workers!')

            for (let i = 0, length = numCPUs; i < length; i++) {
                cluster.fork()
            }
        } else {
            console.log('I am a worker!')
            console.log('After the fork')
        }
    }
}
