"use strict";

const express = require('express');

const router = express.Router(); // var fs = require('fs')
// var path = require('path')
// var pemFile = path.resolve(__dirname, 'ssl/dkim-private.pem')

var sendmail = require('sendmail')({
  silent: true,
  dkim: {
    // privateKey: fs.readFileSync(pemFile, 'utf8'),
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEAw7dPuaUiadGkE8UoAIDPrP1NRIkjYkWmiCmkW+xqoPKo9a8F
qqKM51G/pf7GhsZDruX4G75rna0WfQw6KcIdvvv07CsWAO2qyJ0VhuOpTskEEyZF
gII9vqYVNa+CMou7YiXqaOhDnluqqjV/2azUFm08Tu2KJMs76lLPig657ZK2bRP+
Z5fLPSk1wvSKswpThEQhXovr+Jj6ueZrPIDaTWqJdANZB7mVZDnMnXDvfd7zYbZ+
qGJx6IC7o8jVeZgd1evDzicLeIvmicDQlTudChsolU/GdRi5WJNmf6WeZ4ig8U5x
KwuHRO/E7nacAB+kjNRWGs1EwihVRwufg3/ttQIDAQABAoIBAQCkhIk98rQ044bb
H5X6pkzsi5jSDb1ytD3Co86Hfvo7BQBGVbObtjxfjnZdYQcc77ihYqrnF3B7AK6w
uwCBba13h3Bgve8nJKG1NWaNFv6RPaRxPHCcD987TXzyve/h8Ve4r0qWmPeOPFv/
7Czmm8NEftp9NmwzdauN08KluK9OJddW3sFdP0N5C07FnoAOi8MIBYWw75IQXaTN
uaXiBWEQSFS09nO9sN3UWefy0j+jIVCcgcZslN5xSy3nHhSpj23TdJmeK3gDCWch
9f562gJMxw+TolGcWWulvaP9Ngd1LzA0g1QXQISG5/XDO/RqJiUm0NclxqvuYJYU
nsrEF4MZAoGBAOPOn4kOrsb7CXotvrEIt6J0876XcKr4SAv521p4IelPIJ+tjXcH
OhAUXlLUXrBtqGHPLsJTG5JBajPwmschLX5eiAvI+pJBrfUGuHS3iyISLRX75m2S
DalxK2xZQMJlw5zamJmL9y/vWQ16Gf1UZezVGRVrCEuEIkwEjC+8x2x/AoGBANvv
+vx6+CmNn7N5am1gn5T3JbgOaZ2DSXITXr16Edf1COqdbpC1KxtM3a1OreErjSRx
xtr7kPgRJGs7O66QdUuOnOrts51whQctyK81p1kw26QoJb88wJS6CWdi5aaiw7e4
5mjHpPk8h7j0YIZd57nCBRL8V7KOs40Ddm8HVJvLAoGAfIq402BQkv4pZz9dEkIW
yt0vaJI4iW/lS47UqjglKf0Vc9aZEWrFBodsLdJm1gONW7O994Uh/KqAmla+94Ce
84hQzkiZHJ6FsQB0lXLGwOC4/1zQ1DRV/b2eJMUCz4R9FeK4LLHFeNJcmC6ZyNJ8
SqcR6JC0Xzyk13RhA7QsPpcCgYEAsLkf/4f/p8P4swm4jrK5B8WfNUm/a6V2eoc9
9RoFBHYL+BkQIo6wWHtnFD7IUMnh24rgsky5q9p6XP93cUj6NwAc7liZnsQu4BnV
y5NdKLmtgzYPPp7eT6M8syowRbk7coDMAx2IXgxZMjCK7uy9qfFQinThMsSfWYuS
upw1TAkCgYEAobWF+7hY0T9ApXHDBXMo04mWEFnS/ry8l3fOD12gTPGc/0AAXpDH
x46Vf7sLHxXy3SCiumFzNRdsHCAy47F9GPZvnpQrW49I0akIvQTyn9zBHcvIPDDm
imq5dHRW+M4E3WLO07dmm8cBO/TLOHtq9psOioCsBi6P89GaF3ZxE9E=
-----END RSA PRIVATE KEY-----`,
    keySelector: 'dkim'
  }
});

router.post('/', (req, res, next) => {
  sendmail({
    from: 'no-reply@websiter.dev',
    to: req.body.to,
    replyTo: 'no-reply@websiter.dev',
    subject: 'New message from a contact form on Websiter.dev.',
    html: req.body.html
  }, function (err, reply) {
    if (err) {
      res.send({
        success: false
      });
    } else {
      res.send({
        success: true
      });
    }
  });
});
module.exports = router;