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
        addBuilderPayload(builder, payload);
    }
    
    [tracker send:[builder build]];
}

RCT_EXPORT_METHOD(trackEvent:(NSString *)trackerId
                  category:(NSString *)category
                  action:(NSString *)action
                  label:(NSString *)label
                  value:(NSString *)value
                  payload:(NSDictionary *)payload)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    
    GAIDictionaryBuilder *builder = [GAIDictionaryBuilder createEventWithCategory:category
                                                                           action:action
                                                                            label:label
                                                                            value:value];
    
    if (payload) {
        addBuilderPayload(builder, payload);
    }
    
    [tracker send:[builder build]];
}

RCT_EXPORT_METHOD(trackTiming:(NSString *)trackerId
                  category:(nonnull NSString *)category
                  value:(nonnull NSNumber *)value
                  optionalValues:(nonnull NSDictionary *)optionalValues)
{
    id<GAITracker> tracker = [[GAI sharedInstance] trackerWithTrackingId:trackerId];
    NSString *name = [RCTConvert NSString:optionalValues[@"name"]];
    NSString *label = [RCTConvert NSString:optionalValues[@"label"]];
    [tracker send:[[GAIDictionaryBuilder createTimingWithCategory:category
                                                         interval:value
                                                             name:name
                                                            label:label] build]];
}

static void addBuilderPayload(GAIDictionaryBuilder *builder, NSDictionary *payload)
{
    NSArray<NSDictionary*>* products = payload[@"products"];
    if (products) {
        NSArray<GAIEcommerceProduct*>* ecommerceProducts = getEcommerceProducts(products);
        for (GAIEcommerceProduct* product in ecommerceProducts) {
            [builder addProduct:product];
        }
    }
    
    NSArray<NSDictionary*>* impressionProducts = payload[@"impressionProducts"];
    if (impressionProducts) {
        NSArray<GAIEcommerceProduct*>* ecommerceProducts = getEcommerceProducts(impressionProducts);
        for (GAIEcommerceProduct* product in ecommerceProducts) {
            [builder addProductImpression:product
                           impressionList:payload[@"impressionList"]
                         impressionSource:payload[@"impressionSource"]];
        }
    }
    
    NSDictionary* productActionDict = payload[@"productAction"];
    if (productActionDict) {
        [builder setProductAction:getEcommerceProductAction(productActionDict)];
    }
    
    NSDictionary* customDimensions = payload[@"customDimensions"];
    if (customDimensions) {
        for (NSString *dimensionIndex in customDimensions){
            [builder set:[customDimensions objectForKey:dimensionIndex] forKey:[GAIFields customDimensionForIndex:[dimensionIndex intValue]]];
        }
    }
    
    NSDictionary* customMetrics = payload[@"customMetrics"];
    if (customMetrics) {
        for (NSString *metricIndex in customMetrics) {
            [builder set:[customMetrics objectForKey:metricIndex] forKey:[GAIFields customMetricForIndex:[metricIndex intValue]]];
        }
    }
    
    NSString* nonInteraction = payload[@"nonInteraction"];
    if (nonInteraction) {
        [builder set:nonInteraction ? @"1" : @"0" forKey:kGAINonInteraction];
    }
}

static NSArray<GAIEcommerceProduct*>* getEcommerceProducts(NSArray<NSDictionary*>* products)
{
    NSMutableArray<GAIEcommerceProduct*>* ecommerceProducts = [NSMutableArray new];
    
    for (NSDictionary* product in products)
    {
        GAIEcommerceProduct *ecommerceProduct = [[GAIEcommerceProduct alloc] init];
        
        [ecommerceProduct setId:[RCTConvert NSString:product[@"id"]]];
        [ecommerceProduct setName:[RCTConvert NSString:product[@"name"]]];
        [ecommerceProduct setCategory:[RCTConvert NSString:product[@"category"]]];
        [ecommerceProduct setBrand:[RCTConvert NSString:product[@"brand"]]];
        [ecommerceProduct setVariant:[RCTConvert NSString:product[@"variant"]]];
        [ecommerceProduct setPrice:[RCTConvert NSNumber:product[@"price"]]];
        [ecommerceProduct setCouponCode:[RCTConvert NSString:product[@"couponCode"]]];
        [ecommerceProduct setQuantity:[RCTConvert NSNumber:product[@"quantity"]]];
        
        [ecommerceProducts addObject:ecommerceProduct];
    }
    
    return ecommerceProducts;
}

static GAIEcommerceProductAction* getEcommerceProductAction(NSDictionary* productActionDict)
{
    if (!productActionDict) return NULL;
    
    NSString* action = getProductAction([RCTConvert NSNumber:productActionDict[@"action"]]);
    
    GAIEcommerceProductAction* productAction = [[GAIEcommerceProductAction alloc] init];
    
    [productAction setAction:action];
    
    NSDictionary* transaction = productActionDict[@"transaction"];
    if (transaction) {
        [productAction setTransactionId:[RCTConvert NSString:transaction[@"id"]]];
        [productAction setAffiliation: [RCTConvert NSString:transaction[@"affiliation"]]];
        [productAction setRevenue:[RCTConvert NSNumber:transaction[@"revenue"]]];
        [productAction setTax:[RCTConvert NSNumber:transaction[@"tax"]]];
        [productAction setShipping:[RCTConvert NSNumber:transaction[@"shipping"]]];
        [productAction setCouponCode:[RCTConvert NSString:transaction[@"couponCode"]]];
    }
    
    // Sets the option associated with the checkout. This value is used for kGAICheckout and kGAICheckoutOptions product actions.
    NSNumber* checkoutStep = [RCTConvert NSNumber:productActionDict[@"checkoutStep"]];
    if (checkoutStep)
        [productAction setCheckoutStep:checkoutStep];
    
    // Sets the option associated with the checkout. This value is used for kGAICheckout and kGAICheckoutOptions product actions.
    NSString* checkoutOption = [RCTConvert NSString:productActionDict[@"checkoutOption"]];
    if (checkoutOption)
        [productAction setCheckoutOption:checkoutOption];
    
    // Sets the list name associated with the products in Google Analytics beacons. This value is used in kGAIPADetail and kGAIPAClick product actions.
    NSString* productActionList = [RCTConvert NSString:productActionDict[@"productActionList"]];
    if (productActionList)
        [productAction setProductActionList:productActionList];
    
    // Sets the list source name associated with the products in Google Analytics beacons. This value is used in kGAIPADetail and kGAIPAClick product actions.
    NSString* productListSource = [RCTConvert NSString:productActionDict[@"productListSource"]];
    if (productListSource)
        [productAction setProductListSource:productListSource];
    
    return productAction;
}

static NSString* getProductAction(NSNumber* action)
{
    switch ([action intValue]) {
        case Click:
            return kGAIPAClick;
        case Detail:
            return kGAIPADetail;
        case Add:
            return kGAIPAAdd;
        case Remove:
            return kGAIPARemove;
        case Checkout:
            return kGAIPACheckout;
        case Refund:
            return kGAIPARefund;
        default:
        case Purchase:
            return kGAIPAPurchase;
    }
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
