var couchbase = require('couchbase')
var cluster = new couchbase.Cluster('couchbase://localhost/');

cluster.authenticate('admin', 'admin123');
var bucket = cluster.openBucket('live-updates');

var docId = `doc:${new Date().getTime()}`;
bucket.upsert(docId, {
    type: 'live',
    created: new Date()
}, function (err, result) {
    if (err) throw err;

    bucket.get(docId, function (err, result) {
        if (err) throw err;

        console.log(result.value);
        process.exit();
    });
});