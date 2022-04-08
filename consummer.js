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

nbError=Math.floor(Math.random() * 9)

DeleteMessage();

async function DeleteMessage() {
    // Get the first message in the queue
    receivedMessages = await queueClient.receiveMessages({numberOfMessages : 10});
   

    for (i = 0; i < receivedMessages.receivedMessageItems.length; i++) {
        // Display the peeked message
        var message = receivedMessages.receivedMessageItems[i];   
        if (i == nbError) {
            console.log("error impossible to delete : " + message.messageText)
        }
        else {
            console.log("Dequeuing message: ", message.messageText);
            await queueClient.deleteMessage(message.messageId, message.popReceipt);
        }
    }
}