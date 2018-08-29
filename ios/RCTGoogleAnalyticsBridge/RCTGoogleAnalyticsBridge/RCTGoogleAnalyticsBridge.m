#import "RCTGoogleAnalyticsBridge.h"
#import "GoogleAnalyticsPayload.h"
#import <React/RCTLog.h>
#import <React/RCTConvert.h>
#import <React/RCTUtils.h>
#import "GAI.h"
#import "GAIFields.h"
#import "GAIDictionaryBuilder.h"
#import "GAIEcommerceProduct.h"
#import "GAIEcommerceProductAction.h"
#import "GAIEcommerceFields.h"

@implementation RCTGoogleAnalyticsBridge {
    
}

- (instancetype)init
{
    if ((self = [super init])) {
        [GAI sharedInstance].trackUncaughtExceptions = YES;
        [GAI sharedInstance].dispatchInterval = 20;
        
        NSString *logLevel = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"GAILogLevel"];
        if (logLevel != nil) {
            [[GAI sharedInstance].logger setLogLevel:[logLevel intValue]];
        }
    }
    return self;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(trackScreenView:(nonnull NSString *)trackerId
                  screenName:(nonnull NSString *)screenName
                  payload:(NSDictionary *)payload)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    [tracker set:kGAIScreenName
           value:screenName];
    GAIDictionaryBuilder *builder = [GAIDictionaryBuilder createScreenView];
    
    if (payload) {
        [GoogleAnalyticsPayload addBuilderPayload:builder payload:payload];
    }
    
    [tracker send:[builder build]];
}

RCT_EXPORT_METHOD(trackEvent:(nonnull NSString *)trackerId
                  category:(nonnull NSString *)category
                  action:(nonnull NSString *)action
                  label:(NSString *)label
                  value:(NSString *)value
                  payload:(NSDictionary *)payload)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    
    NSNumber* valueNumber = nil;
    if (value) {
        valueNumber = @([value intValue]);
    }
    
    GAIDictionaryBuilder *builder = [GAIDictionaryBuilder createEventWithCategory:category
                                                                           action:action
                                                                            label:label
                                                                            value:valueNumber];
    
    if (payload) {
        [GoogleAnalyticsPayload addBuilderPayload:builder payload:payload];
    }
    
    // Non-interaction event. Enable sending events without affecting bounce
    NSString* nonInteraction = payload[@"nonInteraction"];
    if (nonInteraction) {
        [builder set:nonInteraction ? @"1" : @"0" forKey:kGAINonInteraction];
    }
    
    [tracker send:[builder build]];
}

RCT_EXPORT_METHOD(trackTiming:(nonnull NSString *)trackerId
                  category:(nonnull NSString *)category
                  interval:(nonnull NSNumber *)interval
                  name:(nonnull NSString *)name
                  label:(NSString *)label
                  payload:(NSDictionary *)payload)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    
    GAIDictionaryBuilder *builder = [GAIDictionaryBuilder createTimingWithCategory:category
                                                                          interval:interval
                                                                              name:name
                                                                             label:label];
    
    if (payload) {
        [GoogleAnalyticsPayload addBuilderPayload:builder payload:payload];
    }
    
    [tracker send:[builder build]];
}

RCT_EXPORT_METHOD(trackException:(nonnull NSString *)trackerId
                  error:(nonnull NSString *)error
                  fatal:(BOOL)fatal
                  payload:(NSDictionary *)payload)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    
    GAIDictionaryBuilder *builder = [GAIDictionaryBuilder createExceptionWithDescription:error
                                                                               withFatal:[NSNumber numberWithBool:fatal]];
    
    if (payload) {
        [GoogleAnalyticsPayload addBuilderPayload:builder payload:payload];
    }
    
    [tracker send:[builder build]];
}

RCT_EXPORT_METHOD(trackSocialInteraction:(nonnull NSString *)trackerId
                  network:(nonnull NSString *)network
                  action:(nonnull NSString *)action
                  targetUrl:(nonnull NSString *)targetUrl
                  payload:(NSDictionary *)payload)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    
    GAIDictionaryBuilder *builder =[GAIDictionaryBuilder createSocialWithNetwork:network
                                                                          action:action
                                                                          target:targetUrl];
    
    if (payload) {
        [GoogleAnalyticsPayload addBuilderPayload:builder payload:payload];
    }
    
    [tracker send:[builder build]];
}

RCT_EXPORT_METHOD(setUser:(nonnull NSString *)trackerId userId:(nonnull NSString *)userId)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    [tracker set:kGAIUserId
           value:userId];
}

RCT_EXPORT_METHOD(setClient:(nonnull NSString *)trackerId clientId:(nonnull NSString *)clientId)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    [tracker set:kGAIClientId
           value:clientId];
}

RCT_EXPORT_METHOD(getClientId:(NSString *)trackerId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    NSString *clientId = [tracker get:kGAIClientId];
    if (clientId != NULL)
        resolve(clientId);
    else
        reject(@"CLIENTID_FAILED", nil, RCTErrorWithMessage(@"Unable to fetch client id"));
}

RCT_EXPORT_METHOD(allowIDFA:(nonnull NSString *)trackerId enabled:(BOOL)enabled)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    tracker.allowIDFACollection = enabled;
}

RCT_EXPORT_METHOD(setSamplingRate:(nonnull NSString *)trackerId sampleRate:(nonnull NSNumber *)sampleRate)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    [tracker set:kGAISampleRate value:[sampleRate stringValue]];
}

RCT_EXPORT_METHOD(setAnonymizeIp:(nonnull NSString *)trackerId enabled:(BOOL)enabled)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    [tracker set:kGAIAnonymizeIp value:enabled ? @"1" : @"0"];
}

RCT_EXPORT_METHOD(setAppName:(nonnull NSString *)trackerId appName:(nonnull NSString *)appName)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    [tracker set:kGAIAppName value:appName];
}

RCT_EXPORT_METHOD(setAppVersion:(nonnull NSString *)trackerId appVersion:(nonnull NSString *)appVersion)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    [tracker set:kGAIAppVersion value:appVersion];
}

RCT_EXPORT_METHOD(setCurrency:(nonnull NSString *)trackerId currencyCode:(nonnull NSString *)currencyCode)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    [tracker set:kGAICurrencyCode
           value:currencyCode];
}

// A special case. For iOS this is set on all trackers. On Android it is on each tracker.
RCT_EXPORT_METHOD(setTrackUncaughtExceptions:(nonnull NSString *)trackerId enabled:(BOOL)enabled)
{
    [GAI sharedInstance].trackUncaughtExceptions = enabled;
}

RCT_EXPORT_METHOD(dispatch:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
    [[GAI sharedInstance] dispatchWithCompletionHandler:^void(GAIDispatchResult result){
        if (result != kGAIDispatchError) {
            resolve(@YES);
        } else {
            reject(@"DISPATCH_FAILED", nil, RCTErrorWithMessage(@"Dispatch failed"));
        }
    }];
}

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

@end
