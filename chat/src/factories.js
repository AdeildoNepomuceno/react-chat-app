const uuidv4 = require('uuid/v4');

const createUser = ( { name = "" } = {} ) => (
    {
        id: uuidv4(),
        name
    }
)

const createMessage = ( { message = "", sender = "" } = {} )=>(
    { 
        id: uuidv4(),
        time: new Date(Date.now()),
        message,
        sender
    }
)

const createChat = ( { messages = [], name = "Comunity", users = [] } = {} ) => (

    {
        id: uuidv4(),
        name,
        messages,
        users,
        typingUsers: []
    }

)

module.exports = {
    createChat,
    createMessage,
    createUser
}

