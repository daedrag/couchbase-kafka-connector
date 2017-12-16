# couchbase-kafka-connector
Another fun project to try setup Kafka connector with Couchbase for live change feeds.

### Tested environment

couchbase-server-community_5.0.0-ubuntu16.04

kafka-2.11-1.0.0

kafka-connect-couchbase-3.2.1

node v8.9.3

- "couchbase": "^2.4.3"
- "node-rdkafka": "^2.2.1"
  

### How to run
Assume zookeeper, kafka and kafka-connector run as instruction [here](https://developer.couchbase.com/documentation/server/5.0/connectors/kafka-3.2/quickstart.html)

Note: `kafka-connect-couchbase-3.2.1.jar` can be copied directly to `kafka\libs` directory

Setup:
```
topic.name=couchbase-test-topic
connection.bucket=live-updates
```

Run commands:
```
cd ${project dir}
npm install
node couchbase-test.js # push a new document to couchbase server
node kafka-consumer.js # consume couchbase change feeds
```
