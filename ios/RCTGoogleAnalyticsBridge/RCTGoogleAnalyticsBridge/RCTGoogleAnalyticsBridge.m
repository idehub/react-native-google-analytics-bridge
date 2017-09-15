#import "RCTGoogleAnalyticsBridge.h"
#import "GoogleAnalyticsPayload.h"
#import <React/RCTLog.h>
#import <React/RCTConvert.h>
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

RCT_EXPORT_METHOD(trackScreenView:(NSString *)trackerId
                  screenName:(NSString *)screenName
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

RCT_EXPORT_METHOD(trackEvent:(NSString *)trackerId
                  category:(NSString *)category
                  action:(NSString *)action
                  label:(NSString *)label
                  value:(NSNumber *)value
                  payload:(NSDictionary *)payload)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    
    GAIDictionaryBuilder *builder = [GAIDictionaryBuilder createEventWithCategory:category
                                                                           action:action
                                                                            label:label
                                                                            value:value];
    
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

RCT_EXPORT_METHOD(trackTiming:(NSString *)trackerId
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

RCT_EXPORT_METHOD(trackException:(NSString *)trackerId error:(NSString *)error fatal:(BOOL)fatal)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    [tracker send:[[GAIDictionaryBuilder createExceptionWithDescription:error
                                                              withFatal:[NSNumber numberWithBool:fatal]] build]];
}

RCT_EXPORT_METHOD(setUser:(NSString *)trackerId userId:(NSString *)userId)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    [tracker set:kGAIUserId
           value:userId];
}

RCT_EXPORT_METHOD(setClient:(NSString *)trackerId clientId:(NSString *)clientId)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    [tracker set:kGAIClientId
           value:clientId];
}

RCT_EXPORT_METHOD(allowIDFA:(NSString *)trackerId enabled:(BOOL)enabled)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    tracker.allowIDFACollection = enabled;
}

RCT_EXPORT_METHOD(trackSocialInteraction:(NSString *)trackerId network:(NSString *)network action:(NSString *)action targetUrl:(NSString *)targetUrl)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    [tracker send:[[GAIDictionaryBuilder createSocialWithNetwork:network
                                                          action:action
                                                          target:targetUrl] build]];
}


RCT_EXPORT_METHOD(setSamplingRate:(NSString *)trackerId sampleRate:(nonnull NSNumber *)sampleRate)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    [tracker set:kGAISampleRate value:[sampleRate stringValue]];
}

RCT_EXPORT_METHOD(setAnonymizeIp:(NSString *)trackerId enabled:(BOOL)enabled)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    [tracker set:kGAIAnonymizeIp value:enabled ? @"1" : @"0"];
}

RCT_EXPORT_METHOD(setAppName:(NSString *)trackerId appName:(NSString *)appName)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    [tracker set:kGAIAppName value:appName];
}

RCT_EXPORT_METHOD(setAppVersion:(NSString *)trackerId appVersion:(NSString *)appVersion)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    [tracker set:kGAIAppVersion value:appVersion];
}

RCT_EXPORT_METHOD(setCurrency:(NSString *)trackerId currencyCode:(NSString *)currencyCode)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    [tracker set:kGAICurrencyCode
           value:currencyCode];
}

// A special case. For iOS this is set on all trackers. On Android it is on each tracker.
RCT_EXPORT_METHOD(setTrackUncaughtExceptions:(NSString *)trackerId enabled:(BOOL)enabled)
{
    [GAI sharedInstance].trackUncaughtExceptions = enabled;
}


@end
