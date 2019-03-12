#!/bin/bash
set -eu

yarn build
BUCKET=s3://www.kiki.rocks
aws s3 sync build $BUCKET --delete --cache-control max-age=31536000,public
aws s3 cp $BUCKET/index.html $BUCKET/index.html --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type text/html --acl public-read
