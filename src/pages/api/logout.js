import useMagicLink from '../../lib/magic/use-magic-link';

export default (req, res) => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY;

    const { signOut, isMagicInitialized } = useMagicLink(apiKey);

    if (isMagicInitialized) {
      (async function () {
        await signOut();
      })();
    }

    res.status(200).send({ done: true });
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
};
