//
//  RNTagEmitterSingleton.m
//  RCTGoogleAnalyticsBridge
//
//  Created by Farzad Shafiee on 6/17/18.
//  Copyright © 2018 Idéhub. All rights reserved.
//

#import "RNTagEmitterSingleton.h"

NSString *const RN_TAG_EVENT = @"GTM_FUNCTION_TAG";
NSString *const RN_TAG_NOTIFICATION = @"GTM_FUNCTION_TAG_NOTIF";

static RNTagEmitterSingleton *sharedInstance = nil;

@implementation RNTagEmitterSingleton

RCT_EXPORT_MODULE();

/*
 * Following initializer is adopted from  https://github.com/facebook/react-native/issues/15407#issuecomment-335346131
 * For some uknown reasons, other singleton pattern implementations did not work and we had to override allocWithZone
 * and use dipatcher to resolve bridge instantiation issues.
 *
 * Keep in mind that since RCTEventEmitter does not like supportedEvents to be populated in the runtime, even during
 * object instantiation, we had to introduce this module to handle all Function Tag events over one single known event (namely GTM_FUNCTION_TAG).
 * This subtle difference makes iOS implementation inherently different than that of Android.
 */

+ (id)allocWithZone:(NSZone *)zone {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [super allocWithZone:zone];
        [sharedInstance observe];
    });
    return sharedInstance;
}

/*
 * Expose required constants for JS envrionment
 */

- (NSDictionary *)constantsToExport
{
    return @{ @"TAG_EVENT": RN_TAG_EVENT };
}
/* RCTEventEmitter Overrides */

- (NSArray<NSString *> *)supportedEvents
{
    return @[RN_TAG_EVENT];
}

/* Interface Implementation */

- (void)observe {
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(handleNotification:)
                                                 name:RN_TAG_NOTIFICATION
                                               object:nil];
}

- (void)emitFunctionTag:(NSString *)functionName
            withPayload:(NSDictionary *)payload
{
    /*
     * Due to some issues with the way bridge is being handled in RCTEventEmitter, calling sendEventWithName method directly
     * will throw "bridge is not set" error. One solution is to use Notification Center to bypass the issue.
     * See following links for more information:
     * - GitHub thread on the issue: https://github.com/facebook/react-native/issues/8714
     * - Sample solution with Notification Center: https://gist.github.com/andybangs/c4651a3916ebde0df1c977b220bbec4b
     */
    
    [self postNotification:payload forFunction:functionName];
}

- (void)postNotification:(NSObject *)object
             forFunction:(NSString *)fn
{
    NSDictionary<NSString *, id> *payload = @{@"payload": object, @"_fn":fn};
    [[NSNotificationCenter defaultCenter] postNotificationName:RN_TAG_NOTIFICATION
                                                        object:self
                                                      userInfo:payload];
}

- (void)handleNotification:(NSNotification *)notification {
    [self sendEventWithName:RN_TAG_EVENT body:notification.userInfo];
}

- (NSString *)generateNotificationName:(NSString *)string
{
    
    return [RN_TAG_EVENT stringByAppendingString:[@"_" stringByAppendingString:string]];
}

@end
