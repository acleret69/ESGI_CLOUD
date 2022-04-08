const { QueueClient, QueueServiceClient } = require("@azure/storage-queue");

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

// Create a unique name for the queue
const queueName = "myqueue-" + Date.now().toString();

console.log("Creating queue: ", queueName);

// Instantiate a QueueServiceClient which will be used
// to create a QueueClient and to list all the queues
const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);

// Get a QueueClient which will be used
// to create and manipulate a queue
const queueClient = queueServiceClient.getQueueClient(queueName);

// Create the queue
await queueClient.create();

var messageText = "Hello, World";
console.log("Adding message to the queue: ", messageText);

// Add a message to the queue
await queueClient.sendMessage(messageText);

const peekedMessages = await queueClient.peekMessages({ numberOfMessages: 5 });

for (i = 0; i < peekedMessages.peekedMessageItems.length; i++) {
    // Display the peeked message
    console.log("Peeked message: ", peekedMessages.peekedMessageItems[i].messageText);
}

var receivedMessages = await queueClient.receiveMessages();
const firstMessage = receivedMessages.receivedMessageItems[0];

// Update the received message
await queueClient.updateMessage(
    firstMessage.messageId,
    firstMessage.popReceipt,
    "This message has been updated"
);

receivedMessages = await queueClient.receiveMessages();
var message = receivedMessages.receivedMessageItems[0];

console.log("Dequeuing message: ", message.messageText);

await queueClient.deleteMessage(message.messageId, message.popReceipt);

// Get up to 5 messages from the queue
const receivedMsgsResp = await queueClient.receiveMessages({ numberOfMessages: 5, visibilityTimeout: 5 * 60 });

for (i = 0; i < receivedMsgsResp.receivedMessageItems.length; i++) {
    message = receivedMsgsResp.receivedMessageItems[i];
    console.log("Dequeuing message: ", message.messageText);
    await queueClient.deleteMessage(message.messageId, message.popReceipt);
}

const properties = await queueClient.getProperties();
console.log("Approximate queue length: ", properties.approximateMessagesCount);

for await (const item of queueServiceClient.listQueues()) {
    console.log("Queue: ", item.name);
}

// Delete the queue
console.log("Deleting queue: ", queueClient.name);
await queueClient.delete();