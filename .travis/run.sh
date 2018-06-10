#!/bin/sh
set -e
if [ "$LANE" = "node" ]; then
    yarn install
    npm run test
else
    npm install -g react-native-cli
    react-native -v

    cd example
    yarn install

    if [ "$LANE" = "ios" ]; then
        npm run test
    else
        cd android && ./gradlew assembleRelease
    fi
fi