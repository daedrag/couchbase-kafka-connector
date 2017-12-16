const Kafka = require('node-rdkafka');

var producer = new Kafka.Producer({
    'metadata.broker.list': 'localhost:9092',
    'dr_cb': true
});

// Connect to the broker manually
producer.connect();

// Wait for the ready event before proceeding
producer.on('ready', function () {
    try {
        producer.produce(
            // Topic to send the message to
            'couchbase-test-topic',
            // optionally we can manually specify a partition for the message
            // this defaults to -1 - which will use librdkafka's default partitioner (consistent random for keyed messages, random for unkeyed messages)
            null,
            // Message to send. Must be a buffer
            new Buffer(`Now is ${new Date()}`),
            // for keyed messages, we also specify the key - note that this field is optional
            undefined,
            // you can send a timestamp here. If your broker version supports it,
            // it will get added. Otherwise, we default to 0
            Date.now(),
            // you can send an opaque token here, which gets passed along
            // to your delivery reports
        );
    } catch (err) {
        console.error('A problem occurred when sending our message');
        console.error(err);
    } finally {
        producer.flush();
        producer.disconnect();
        process.exit();
    }
});

// Any errors we encounter, including connection errors
producer.on('event.error', function (err) {
    console.error('Error from producer');
    console.error(err);
})