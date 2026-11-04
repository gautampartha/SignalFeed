#!/bin/zsh
set -e
cd "${0:A:h}"
if [[ ! -d node_modules ]]; then
  npm install
fi
if curl --silent --fail http://localhost:5180/ > /dev/null; then
  open 'http://localhost:5180/?demo'
  exit 0
fi
(
  for attempt in {1..40}; do
    if curl --silent --fail http://localhost:5180/ > /dev/null; then
      open 'http://localhost:5180/?demo'
      exit 0
    fi
    sleep 0.5
  done
) &
npm run dev
