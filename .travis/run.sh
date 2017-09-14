#!/bin/sh
set -e
if [ "$LANE" = "node" ]; then
    yarn install
    npm run test
else
    npm install -g react-native-cli
    react-native -v
    yarn install
    yarn run tsc

    cd example
    yarn install
    rm -rf node_modules/react-native-google-analytics-bridge/example

    if [ "$LANE" = "ios" ]; then
        xcodebuild -project ios/example.xcodeproj/ -configuration Debug -sdk iphonesimulator -scheme example CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED=NO
    else
        cd android && ./gradlew assembleRelease
    fi
fi