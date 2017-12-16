const Kafka = require('node-rdkafka');

var consumer = new Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9092',
}, {});

consumer.connect();

consumer
    .on('ready', function () {
        consumer.subscribe(['couchbase-test-topic']);

        // Consume from the topic. This is what determines
        // the mode we are running in. By not specifying a callback (or specifying
        // only a callback) we get messages as soon as they are available.
        consumer.consume();

        console.log('Consumer ready!');
    })
    .on('data', function (data) {
        // Output the actual message contents
        // console.log(data.value.toString());

        var payload = '';
        try {
            payload = JSON.parse(data.value)['payload'];
        }
        catch (e) {
            // invalid couchbase event 
        }
        
        if (!payload) {
            console.log('No payload found!');
            return;
        }
        console.log(payload['event'], payload['key']);
        
        if (payload['content']) {
            var content = Buffer.from(payload['content'], 'base64');
            console.log(content.toString());
        }
    });