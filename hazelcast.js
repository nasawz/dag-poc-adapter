'use strict';

const { Client } = require('hazelcast-client');

(async () => {
    try {
        // Start the Hazelcast Client and connect to an already running
        // Hazelcast Cluster on 127.0.0.1
        const hz = await Client.newHazelcastClient();
        // Get the Distributed List from Cluster
        const list = await hz.getList('my-distributed-list');
        // Add elements to the list
        await list.add('item1');
        await list.add('item2');
        //Remove the first element
        const value = await list.removeAt(0);
        console.log('Removed:', value);
        // There is only one element left
        const len = await list.size();
        console.log('Current size is', len);
        // Clear the list
        await list.clear();
        // Shutdown this Hazelcast client
        await hz.shutdown();
    } catch (err) {
        console.error('Error occurred:', err);
    }
})();