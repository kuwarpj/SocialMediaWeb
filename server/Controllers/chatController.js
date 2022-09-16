import chatModel from "../Models/chatModel.js";

export const createChat = async (req, res) => {
  const { senderId } = req.body;
  const { receiverId } = req.body;

  if (senderId == receiverId) {
    res.status(403).json("You connot message Yourself");
  } else {
    try {
      const chat = await chatModel.findOne({
        members: { $all: [senderId, receiverId] },
      });
      if (chat === null) {
        const newChat = chatModel({ members: [senderId, receiverId] });
        const result = await newChat.save();
        res.status(200).json(result);
      } else {
        res.status(200).json("You already have chat with this person");
      }
    } catch (error) {
      res.status(500).json("Error creating chat");
    }
  }
};

export const deleteChat = async (req, res) => {
  const { senderId } = req.body;
  const { receiverId } = req.body;
  console.log(req.body);
  console.log(senderId);
  console.log(receiverId);

  try {
    const chat = await chatModel.findOne({
      members: { $all: [senderId, receiverId] },
    });
    console.log(chat);
    await chatModel.findById(chat._id);
    await chatModel.deleteOne();
    res.status(200).json("Chat has been deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json("Error deleting chat");
  }
};

export const userChats = async (req, res) => {
  try {
    const chat = await chatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json("Error");
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await chatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json("Error finding chat");
  }
};
