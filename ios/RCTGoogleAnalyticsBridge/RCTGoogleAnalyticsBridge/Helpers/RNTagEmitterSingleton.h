//
//  RNTagEmitterSingleton.h
//  RCTGoogleAnalyticsBridge
//
//  Created by Farzad Shafiee on 6/17/18.
//  Copyright © 2018 Idéhub. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RNTagEmitterSingleton : RCTEventEmitter <RCTBridgeModule>

- (void)emitFunctionTag:(NSString *)functionName
            withPayload:(NSDictionary *)payload;

@end
