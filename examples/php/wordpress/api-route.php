function id_service() {
  $sp = $_COOKIE['sp'] ?? null;
  $spIdService = $_COOKIE['spIdService'] ?? null;
  /* bumpExpiry is a placeholder method that returns the expiration time you require the network_userid to persist. */
  $expiration = bumpExpiry();
  $networkUserId = $sp ?? $spIdService ?? gen_uuid4();
  /* In this example the domain will be the eTLD+1 of the website. */
  $domain = 'snowplow.io';

  /* 
    * The cookie header attributes should have exactly the same values as the ones set on the collector configuration.
  */
  $cookie_options = array(
    'expires' => $expiration,
    'path' => '/',
    'domain' => $domain,
    'secure' => true,
    'httponly' => true,
    'samesite' => 'None',
  );
  setcookie('sp', $networkUserId, $cookie_options);
  setcookie('spIdService', $networkUserId, $cookie_options);

  /* The response needs to return a 200 (OK) status code but any response payload is not necessary. */
  return json_encode(['Ok' => 200]);
}