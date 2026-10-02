const subscribers = [];

const subscribeNewsletter = (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.',
    });
  }

  if (subscribers.includes(email)) {
    return res.status(400).json({
      success: false,
      message: 'This email is already subscribed to the atelier correspondence.',
    });
  }

  subscribers.push(email);

  res.status(201).json({
    success: true,
    message: 'Successfully subscribed to the Slow Olfactory Chronicles.',
  });
};

module.exports = { subscribeNewsletter };
