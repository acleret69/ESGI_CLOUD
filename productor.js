const { QueueClient, QueueServiceClient } = require("@azure/storage-queue");

// Retrieve the connection from an environment
// variable called AZURE_STORAGE_CONNECTION_STRING
const connectionString = "DefaultEndpointsProtocol=https;AccountName=acleretstockage;AccountKey=WY2eaRcxnOi9jJNqxz0pbxkSc3BuTo8nzsfzJOMPwk3eO+NEmwVuI8roCx4v7EaB1XX9+5Vyrjvh+AStsO7mLg==;EndpointSuffix=core.windows.net"

// Create a unique name for the queue
const queueName = "queue1"

console.log("Creating queue: ", queueName);

// Instantiate a QueueServiceClient which will be used
// to create a QueueClient and to list all the queues
const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);

// Get a QueueClient which will be used
// to create and manipulate a queue
const queueClient = queueServiceClient.getQueueClient(queueName);

SendMessage()

async function SendMessage() {

    for (i = 0; i < 10; i++) {
        await sleep(500);
        messageText = "Hello, World " + i;
        console.log("Adding message to the queue: " + i, messageText);
        queueClient.sendMessage(messageText);
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}