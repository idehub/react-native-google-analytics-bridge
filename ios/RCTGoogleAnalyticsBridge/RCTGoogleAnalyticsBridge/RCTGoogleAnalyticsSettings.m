#import "RCTGoogleAnalyticsSettings.h"
#import "GAI.h"

@implementation RCTGoogleAnalyticsSettings {
    
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(setDryRun:(BOOL)enabled)
{
    [GAI sharedInstance].dryRun = enabled;
}

RCT_EXPORT_METHOD(setDispatchInterval:(NSInteger)intervalInSeconds)
{
    [GAI sharedInstance].dispatchInterval = intervalInSeconds;
}

RCT_EXPORT_METHOD(setOptOut:(BOOL)enabled)
{
    [GAI sharedInstance].optOut = enabled;
}

@end
