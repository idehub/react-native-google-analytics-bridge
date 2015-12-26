#import "RCTGoogleAnalyticsBridge.h"
#import "GAI.h"
#import "RCTLog.h"
#import "GAIDictionaryBuilder.h"

@implementation RCTGoogleAnalyticsBridge {

}

- (instancetype)init
{
    if ((self = [super init])) {
        // Optional: automatically send uncaught exceptions to Google Analytics.
        [GAI sharedInstance].trackUncaughtExceptions = YES;

        // Optional: set Google Analytics dispatch interval to e.g. 20 seconds.
        [GAI sharedInstance].dispatchInterval = 20;

        // Optional: set Logger to VERBOSE for debug information.
        [[[GAI sharedInstance] logger] setLogLevel:kGAILogLevelVerbose];

        // Initialize tracker. Replace with your tracking ID.
        [[GAI sharedInstance] trackerWithTrackingId:@"UA-12345-1"];
    }
    return self;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(logEvent:(NSString *)name)
{
  id<GAITracker> tracker = [[GAI sharedInstance] defaultTracker];
  NSString *currentAppVersion = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"];
  [tracker send:[[GAIDictionaryBuilder createEventWithCategory:@"Test"
                                                      action:name
                                                       label:currentAppVersion
                                                       value:[NSNumber numberWithInt:1]] build]];
  RCTLogInfo(@"Logged event with %@", name);
}

@end
