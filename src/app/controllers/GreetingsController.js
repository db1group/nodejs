class GreetingsController {
  async greet(req, res) {
    const { name } = req.query;

    if (!name) {
      return res.status(400).send({ message: 'Who should I greet?' });
    }

    const greeting = `Hello, ${name}`;

    return res.status(200).send({ message: greeting });
  }
}

module.exports = new GreetingsController();
