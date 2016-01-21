#import "RCTGoogleAnalyticsBridge.h"
#import "RCTLog.h"
#import "RCTConvert.h"
#import "GAI.h"
#import "GAIFields.h"
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

        // Initialize tracker. Replace with your tracking ID.
        [[GAI sharedInstance] trackerWithTrackingId:[[NSBundle mainBundle] objectForInfoDictionaryKey:@"GAITrackingId"]];
    }
    return self;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(trackScreenView:(NSString *)screenName)
{
  id<GAITracker> tracker = [[GAI sharedInstance] defaultTracker];
  [tracker set:kGAIScreenName
         value:screenName];
  [tracker send:[[GAIDictionaryBuilder createScreenView] build]];
}

RCT_EXPORT_METHOD(trackEvent:(NSString *)category action:(NSString *)action optionalValues:(NSDictionary *)optionalValues)
{
  id<GAITracker> tracker = [[GAI sharedInstance] defaultTracker];
  NSString *label = [RCTConvert NSString:optionalValues[@"label"]];
  NSNumber *value = [RCTConvert NSNumber:optionalValues[@"value"]];
  [tracker send:[[GAIDictionaryBuilder createEventWithCategory:category
                                                        action:action
                                                         label:label
                                                         value:value] build]];
}

RCT_EXPORT_METHOD(trackPurchase:(NSString *)transactionId transaction:(NSDictionary *)transaction item:(NSDictionary *)item)
{
    id<GAITracker> tracker = [[GAI sharedInstance] defaultTracker];
    NSString *affiliation = [RCTConvert NSString:transaction[@"affiliation"]];
    NSNumber *revenue = [RCTConvert NSNumber:transaction[@"revenue"]];
    NSNumber *tax = [RCTConvert NSNumber:transaction[@"tax"]];
    NSNumber *shipping = [RCTConvert NSNumber:transaction[@"shipping"]];
    NSString *currencyCode = [RCTConvert NSString:transaction[@"currencyCode"]];
    NSString *name = [RCTConvert NSString:item[@"name"]];
    NSString *sku = [RCTConvert NSString:item[@"sku"]];
    NSString *category = [RCTConvert NSString:item[@"category"]];
    NSNumber *price = [RCTConvert NSNumber:item[@"price"]];
    NSNumber *quantity = [RCTConvert NSNumber:item[@"quantity"]];
    [tracker send:[[GAIDictionaryBuilder createTransactionWithId:transactionId
                                                     affiliation:affiliation
                                                         revenue:revenue
                                                             tax:tax
                                                        shipping:shipping
                                                    currencyCode:currencyCode] build]];
    [tracker send:[[GAIDictionaryBuilder createItemWithTransactionId:transactionId
                                                                name:name
                                                                 sku:sku
                                                            category:category
                                                               price:price
                                                            quantity:quantity
                                                        currencyCode:currencyCode] build]];
}

RCT_EXPORT_METHOD(trackException:(NSString *)error fatal(BOOL *)fatal)
{
  id<GAITracker> tracker = [[GAI sharedInstance] defaultTracker];
  [tracker send:[[GAIDictionaryBuilder createExceptionWithDescription:error
                                                            withFatal:fatal] build]];
}

RCT_EXPORT_METHOD(setDryRun:(BOOL)enabled)
{
    [GAI sharedInstance].dryRun = enabled;
}

@end
