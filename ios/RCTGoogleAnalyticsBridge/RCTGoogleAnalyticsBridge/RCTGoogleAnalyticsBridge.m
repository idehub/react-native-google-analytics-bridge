#import "RCTGoogleAnalyticsBridge.h"
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

NSString *staticTrackerId;

- (instancetype)init
{
    if ((self = [super init])) {
        [GAI sharedInstance].trackUncaughtExceptions = YES;
        [GAI sharedInstance].dispatchInterval = 20;

        staticTrackerId = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"GAITrackingId"];

        NSString *logLevel = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"GAILogLevel"];
        if (logLevel != nil) {
            [[GAI sharedInstance].logger setLogLevel:[logLevel intValue]];
        }
    }
    return self;
}

- (NSDictionary *)constantsToExport
{
    return @{ @"nativeTrackerId": staticTrackerId != nil ? staticTrackerId : [NSNull null] };
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(trackScreenView:(NSString *)trackerId screenName:(NSString *)screenName)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    [tracker set:kGAIScreenName
         value:screenName];
    [tracker send:[[GAIDictionaryBuilder createScreenView] build]];
}

RCT_EXPORT_METHOD(trackEvent:(NSString *)trackerId category:(NSString *)category action:(NSString *)action optionalValues:(NSDictionary *)optionalValues)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    NSString *label = [RCTConvert NSString:optionalValues[@"label"]];
    NSNumber *value = [RCTConvert NSNumber:optionalValues[@"value"]];
    [tracker send:[[GAIDictionaryBuilder createEventWithCategory:category
                                                        action:action
                                                         label:label
                                                         value:value] build]];
}

RCT_EXPORT_METHOD(trackScreenViewWithCustomDimensionValues:(NSString *)trackerId screenName:(NSString *)screenName dimensionIndexValues:(NSDictionary *)dimensionIndexValues)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    [tracker set:kGAIScreenName
         value:screenName];

    GAIDictionaryBuilder *builder = [GAIDictionaryBuilder createScreenView];

    for (NSString *dimensionIndex in dimensionIndexValues)
        [builder set:[dimensionIndexValues objectForKey:dimensionIndex] forKey:[GAIFields customDimensionForIndex:[dimensionIndex intValue]]];

    [tracker send:[builder build]];
}

RCT_EXPORT_METHOD(trackEventWithCustomDimensionValues:(NSString *)trackerId category:(NSString *)category action:(NSString *)action optionalValues:(NSDictionary *)optionalValues dimensionIndexValues:(NSDictionary *)dimensionIndexValues)
{
    [self trackEventWithCustomDimensionAndMetricValues:trackerId category:category action:action optionalValues:optionalValues dimensionIndexValues:dimensionIndexValues metricIndexValues:nil];
}

RCT_EXPORT_METHOD(trackEventWithCustomDimensionAndMetricValues:(NSString *)trackerId category:(NSString *)category action:(NSString *)action optionalValues:(NSDictionary *)optionalValues dimensionIndexValues:(NSDictionary *)dimensionIndexValues metricIndexValues:(NSDictionary *)metricIndexValues)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    NSString *label = [RCTConvert NSString:optionalValues[@"label"]];
    NSNumber *value = [RCTConvert NSNumber:optionalValues[@"value"]];

    GAIDictionaryBuilder *builder = [GAIDictionaryBuilder createEventWithCategory:category
                                                                           action:action
                                                                            label:label
                                                                            value:value];
    for (NSString *dimensionIndex in dimensionIndexValues)
        [builder set:[dimensionIndexValues objectForKey:dimensionIndex] forKey:[GAIFields customDimensionForIndex:[dimensionIndex intValue]]];
    
    if (metricIndexValues !=  nil){
        for (NSString *metricIndex in metricIndexValues)
            [builder set:[metricIndexValues objectForKey:metricIndex] forKey:[GAIFields customMetricForIndex:[metricIndex intValue]]];
    }
    
    [tracker send:[builder build]];
}

RCT_EXPORT_METHOD(trackTiming:(NSString *)trackerId category:(nonnull NSString *)category value:(nonnull NSNumber *)value optionalValues:(nonnull NSDictionary *)optionalValues)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    NSString *name = [RCTConvert NSString:optionalValues[@"name"]];
    NSString *label = [RCTConvert NSString:optionalValues[@"label"]];
    [tracker send:[[GAIDictionaryBuilder createTimingWithCategory:category
                                                         interval:value
                                                             name:name
                                                            label:label] build]];
}

RCT_EXPORT_METHOD(trackPurchaseEvent:(NSString *)trackerId product:(NSDictionary *)product transaction:(NSDictionary *)transaction eventCategory:(NSString *)eventCategory eventAction:(NSString *)eventAction)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    NSString *productId = [RCTConvert NSString:product[@"id"]];
    NSString *productName = [RCTConvert NSString:product[@"name"]];
    NSString *productCategory = [RCTConvert NSString:product[@"category"]];
    NSString *productBrand = [RCTConvert NSString:product[@"brand"]];
    NSString *productVariant = [RCTConvert NSString:product[@"variant"]];
    NSNumber *productPrice = [RCTConvert NSNumber:product[@"price"]];
    NSString *productCouponCode = [RCTConvert NSString:product[@"couponCode"]];
    NSNumber *productQuantity = [RCTConvert NSNumber:product[@"quantity"]];
    NSString *transactionId = [RCTConvert NSString:transaction[@"id"]];
    NSString *transactionAffiliation = [RCTConvert NSString:transaction[@"affiliation"]];
    NSNumber *transactionRevenue = [RCTConvert NSNumber:transaction[@"revenue"]];
    NSNumber *transactionTax = [RCTConvert NSNumber:transaction[@"tax"]];
    NSNumber *transactionShipping = [RCTConvert NSNumber:transaction[@"shipping"]];
    NSString *transactionCouponCode = [RCTConvert NSString:transaction[@"couponCode"]];
    GAIEcommerceProduct *ecommerceProduct = [[GAIEcommerceProduct alloc] init];
    [ecommerceProduct setId:productId];
    [ecommerceProduct setName:productName];
    [ecommerceProduct setCategory:productCategory];
    [ecommerceProduct setBrand:productBrand];
    [ecommerceProduct setVariant:productVariant];
    [ecommerceProduct setPrice:productPrice];
    [ecommerceProduct setCouponCode:productCouponCode];
    [ecommerceProduct setQuantity:productQuantity];
    GAIDictionaryBuilder *builder = [GAIDictionaryBuilder createEventWithCategory:eventCategory
                                                                           action:eventAction
                                                                            label:nil
                                                                            value:nil];
    GAIEcommerceProductAction *action = [[GAIEcommerceProductAction alloc] init];
    [action setAction:kGAIPAPurchase];
    [action setTransactionId:transactionId];
    [action setAffiliation:transactionAffiliation];
    [action setRevenue:transactionRevenue];
    [action setTax:transactionTax];
    [action setShipping:transactionShipping];
    [action setCouponCode:transactionCouponCode];
    [builder setProductAction:action];
    [builder addProduct:ecommerceProduct];
    [tracker send:[builder build]];
}

RCT_EXPORT_METHOD(trackMultiProductsPurchaseEvent:(NSString *)trackerId products:(NSArray *)products transaction:(NSDictionary *)transaction eventCategory:(NSString *)eventCategory eventAction:(NSString *)eventAction) {

    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    NSString *transactionId = [RCTConvert NSString:transaction[@"id"]];
    NSString *transactionAffiliation = [RCTConvert NSString:transaction[@"affiliation"]];
    NSNumber *transactionRevenue = [RCTConvert NSNumber:transaction[@"revenue"]];
    NSNumber *transactionTax = [RCTConvert NSNumber:transaction[@"tax"]];
    NSNumber *transactionShipping = [RCTConvert NSNumber:transaction[@"shipping"]];
    NSString *transactionCouponCode = [RCTConvert NSString:transaction[@"couponCode"]];
    GAIDictionaryBuilder *builder = [GAIDictionaryBuilder createEventWithCategory:eventCategory
                                                                           action:eventAction
                                                                            label:nil
                                                                            value:nil];
    GAIEcommerceProductAction *action = [[GAIEcommerceProductAction alloc] init];
    [action setAction:kGAIPAPurchase];
    [action setTransactionId:transactionId];
    [action setAffiliation:transactionAffiliation];
    [action setRevenue:transactionRevenue];
    [action setTax:transactionTax];
    [action setShipping:transactionShipping];
    [action setCouponCode:transactionCouponCode];
    [builder setProductAction:action];
    for (id product in products) {
        NSString *productId = [RCTConvert NSString:product[@"id"]];
        NSString *productName = [RCTConvert NSString:product[@"name"]];
        NSString *productBrand = [RCTConvert NSString:product[@"brand"]];
        NSNumber *productPrice = [RCTConvert NSNumber:product[@"price"]];
        NSString *productVariant = [RCTConvert NSString:product[@"variant"]];
        NSString *productCategory = [RCTConvert NSString:product[@"category"]];
        NSNumber *productQuantity = [RCTConvert NSNumber:product[@"quantity"]];
        GAIEcommerceProduct *ecommerceProduct = [[GAIEcommerceProduct alloc] init];
        [ecommerceProduct setId:productId];
        [ecommerceProduct setName:productName];
        [ecommerceProduct setCategory:productCategory];
        [ecommerceProduct setBrand:productBrand];
        [ecommerceProduct setVariant:productVariant];
        [ecommerceProduct setPrice:productPrice];
        [ecommerceProduct setQuantity:productQuantity];
        if ([product objectForKey:@"couponCode"]) {
            NSString *productCouponCode = [RCTConvert NSString:product[@"couponCode"]];
            [ecommerceProduct setCouponCode:productCouponCode];
        }
        [builder addProduct:ecommerceProduct];
    }
    [tracker send:[builder build]];
}

RCT_EXPORT_METHOD(trackMultiProductsPurchaseEventWithCustomDimensionValues:(NSString *)trackerId products:(NSArray *)products transaction:(NSDictionary *)transaction eventCategory:(NSString *)eventCategory eventAction:(NSString *)eventAction dimensionIndexValues:(NSDictionary *)dimensionIndexValues) {

    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    NSString *transactionId = [RCTConvert NSString:transaction[@"id"]];
    NSString *transactionAffiliation = [RCTConvert NSString:transaction[@"affiliation"]];
    NSNumber *transactionRevenue = [RCTConvert NSNumber:transaction[@"revenue"]];
    NSNumber *transactionTax = [RCTConvert NSNumber:transaction[@"tax"]];
    NSNumber *transactionShipping = [RCTConvert NSNumber:transaction[@"shipping"]];
    NSString *transactionCouponCode = [RCTConvert NSString:transaction[@"couponCode"]];
    GAIDictionaryBuilder *builder = [GAIDictionaryBuilder createEventWithCategory:eventCategory
                                                                           action:eventAction
                                                                            label:nil
                                                                            value:nil];
    for (NSString *dimensionIndex in dimensionIndexValues)
        [builder set:[dimensionIndexValues objectForKey:dimensionIndex] forKey:[GAIFields customDimensionForIndex:[dimensionIndex intValue]]];

    GAIEcommerceProductAction *action = [[GAIEcommerceProductAction alloc] init];
    [action setAction:kGAIPAPurchase];
    [action setTransactionId:transactionId];
    [action setAffiliation:transactionAffiliation];
    [action setRevenue:transactionRevenue];
    [action setTax:transactionTax];
    [action setShipping:transactionShipping];
    [action setCouponCode:transactionCouponCode];
    [builder setProductAction:action];
    for (id product in products) {
        NSString *productId = [RCTConvert NSString:product[@"id"]];
        NSString *productName = [RCTConvert NSString:product[@"name"]];
        NSString *productBrand = [RCTConvert NSString:product[@"brand"]];
        NSNumber *productPrice = [RCTConvert NSNumber:product[@"price"]];
        NSString *productVariant = [RCTConvert NSString:product[@"variant"]];
        NSString *productCategory = [RCTConvert NSString:product[@"category"]];
        NSNumber *productQuantity = [RCTConvert NSNumber:product[@"quantity"]];
        GAIEcommerceProduct *ecommerceProduct = [[GAIEcommerceProduct alloc] init];
        [ecommerceProduct setId:productId];
        [ecommerceProduct setName:productName];
        [ecommerceProduct setCategory:productCategory];
        [ecommerceProduct setBrand:productBrand];
        [ecommerceProduct setVariant:productVariant];
        [ecommerceProduct setPrice:productPrice];
        [ecommerceProduct setQuantity:productQuantity];
        if ([product objectForKey:@"couponCode"]) {
            NSString *productCouponCode = [RCTConvert NSString:product[@"couponCode"]];
            [ecommerceProduct setCouponCode:productCouponCode];
        }
        [builder addProduct:ecommerceProduct];
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

RCT_EXPORT_METHOD(setDryRun:(BOOL)enabled)
{
    [GAI sharedInstance].dryRun = enabled;
}

RCT_EXPORT_METHOD(setDispatchInterval:(NSInteger)intervalInSeconds)
{
    [GAI sharedInstance].dispatchInterval = intervalInSeconds;
}

RCT_EXPORT_METHOD(setTrackUncaughtExceptions:(NSString *)trackerId enabled:(BOOL)enabled)
{
    [GAI sharedInstance].trackUncaughtExceptions = enabled;
}

RCT_EXPORT_METHOD(setAnonymizeIp:(NSString *)trackerId enabled:(BOOL)enabled)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    [tracker set:kGAIAnonymizeIp value:enabled ? @"1" : @"0"];
}

RCT_EXPORT_METHOD(setOptOut:(BOOL)enabled)
{
    [GAI sharedInstance].optOut = enabled;
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

RCT_EXPORT_METHOD(trackCampaignFromUrl:(NSString *)trackerId urlString:(NSString *)urlString)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    
    // setCampaignParametersFromUrl: parses Google Analytics campaign ("UTM")
    // parameters from a string url into a Map that can be set on a Tracker.
    GAIDictionaryBuilder *hitParams = [[GAIDictionaryBuilder alloc] init];
    
    // Set campaign data on the map, not the tracker directly because it only
    // needs to be sent once.
    [hitParams setCampaignParametersFromUrl:urlString];
    
    // Campaign source is the only required campaign field. If previous call
    // did not set a campaign source, use the hostname as a referrer instead.
    NSURL *url = [NSURL URLWithString:urlString];
    if(![hitParams get:kGAICampaignSource] && [url host].length !=0) {
        // Set campaign data on the map, not the tracker.
        [hitParams set:@"referrer" forKey:kGAICampaignMedium];
        [hitParams set:[url host] forKey:kGAICampaignSource];
    }
    
    NSDictionary *hitParamsDict = [hitParams build];
    
    // A screen name is required for a screen view.
    [tracker set:kGAIScreenName value:@"Init With Campaign"];
    
    // Previous V3 SDK versions.
    // [tracker send:[[[GAIDictionaryBuilder createAppView] setAll:hitParamsDict] build]];
    
    // SDK Version 3.08 and up.
    [tracker send:[[[GAIDictionaryBuilder createScreenView] setAll:hitParamsDict] build]];
}

RCT_EXPORT_METHOD(createNewSession:(NSString *)trackerId screenName:(NSString *)screenName)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    
    GAIDictionaryBuilder *builder = [GAIDictionaryBuilder createScreenView];
    [builder set:@"start" forKey:kGAISessionControl];
    [tracker set:kGAIScreenName value:screenName];
    [tracker send:[builder build]];
}

@end
