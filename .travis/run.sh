#!/bin/sh
set -e

yarn install
yarn run tsc
cd examples/rn57example
yarn install
rm -rf node_modules/react-native-google-analytics-bridge/examples

if [ "$LANE" = "node" ]; then
    yarn run tsc
else
    npm install -g react-native-cli
    react-native -v

    if [ "$LANE" = "ios" ]; then
        xcodebuild -project ios/example.xcodeproj/ -configuration Debug -sdk iphonesimulator -scheme example CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED=NO
    else
        cd android && ./gradlew assembleRelease
    fi
fi