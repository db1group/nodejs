class GreetingsController {
  async greet(req, res) {
    const somebody = req.params.somebody;
    const { looking } = req.query;
    
    let greetingMessage = `Hello, ${somebody}!`;

    if (looking === 'sad') {
      greetingMessage += ' Is everything alright?'
    }

    return res.status(200).send({
      message: greetingMessage
    });
  }
}

module.exports = new GreetingsController();
