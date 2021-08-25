'use strict';

const { Client } = require('hazelcast-client');

(async () => {
    try {
        // Start the Hazelcast Client and connect to an already running
        // Hazelcast Cluster on 127.0.0.1
        const hz = await Client.newHazelcastClient({clusterName:"domain",network:{
            clusterMembers:["192.168.5.177"]
        }});
       
        const map = await hz.getMap('4');
        let v = await map.get('sum')
        console.log(v);
        await hz.shutdown();
    } catch (err) {
        console.error('Error occurred:', err);
    }
})();