export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ Ok: number }>
) {
  const { sp, spIdService } = req.cookies;
  /* bumpExpiry is a placeholder method that returns the expiration time you require the network_userid to persist. */
  const expiration = bumpExpiry();
  const networkUserId = sp || spIdService || uuidv4();
  /* In this example the domain will be the eTLD+1 of the website. */
  const domain = "snowplow.io";

  res.setHeader("Set-Cookie", [
    /*
     * The cookie header attributes should have exactly the same values as the ones set on the collector configuration.
     */
    `spIdService=${networkUserId}; Expires=${expiration.toUTCString()}; Domain=${domain}; Path=/; Secure; SameSite=None; httpOnly;`,
    `sp=${networkUserId}; Expires=${expiration.toUTCString()}; Domain=${domain}; Path=/; Secure; SameSite=None; httpOnly;`,
  ]);

  /* The response needs to return a 200 (OK) status code but any response payload is not necessary. */
  res.status(200).json({ Ok: 200 });
}
