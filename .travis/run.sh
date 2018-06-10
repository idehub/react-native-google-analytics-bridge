#!/bin/sh
set -e
if [ "$LANE" = "node" ]; then
    yarn install
    npm run test
else
    npm install -g react-native-cli
    react-native -v

    if [ "$LANE" = "ios" ]; then
        npm run test
    else
        npm run test
    fi
fi