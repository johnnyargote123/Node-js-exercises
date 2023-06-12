import messagesModel from "../mongo/models/message.model.js";

export default class Message {
  constructor() {}

  createMessage = async function (message) {
    try {
      const createdMessage = await messagesModel.create(message);
      return createdMessage;
    } catch (error) {
      console.log(error);
    }
  };

  getMessages = async function () {
    try {
      const messages = await messagesModel.find();
      return messages;
    } catch (error) {
      console.log(error);
    }
  };
}