let services = {}

function service (constructor) {
    services[constructor.name] = new constructor
}

function dependency (serviceName) {
    return constructor => {
        constructor
    }
}

@service
class AService {
    do() {
        console.log('do')
    }
}

@dependency('AService')
class Consumer {
    constructor(aService: AService) {
        aService.do()
    }
}

// let c = new Consumer()
