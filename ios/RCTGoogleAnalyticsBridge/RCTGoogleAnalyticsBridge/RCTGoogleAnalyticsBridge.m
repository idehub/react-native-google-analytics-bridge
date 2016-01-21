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

RCT_EXPORT_METHOD(trackPurchaseEnhanced:(NSString *)transactionId transaction:(NSDictionary *)transaction item:(NSDictionary *)item)
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

RCT_EXPORT_METHOD(trackPurchaseEvent:(NSDictionary *)product transaction:(NSDictionary *)transaction eventCategory:(NSString *)eventCategory eventAction:(NSString *)eventAction)
{
    id<GAITracker> tracker = [[GAI sharedInstance] defaultTracker];
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
    GAIEcommerceProduct *product = [[GAIEcommerceProduct alloc] init];
    [product setId:productId];
    [product setName:productName];
    [product setCategory:productCategory];
    [product setBrand:productBrand];
    [product setVariant:productVariant];
    [product setPrice:productPrice];
    [product setCouponCode:productCouponCode];
    [product setQuantity:productQuantity];
    GAIDictionaryBuilder *builder = [GAIDictionaryBuilder createEventWithCategory:eventCategory
                                                                           action:eventAction
                                                                            label:nil
                                                                            value:nil];
    GAIEcommerceProductAction *action = [[GAIEcommerceProductAction alloc] init];
    [action setAction:kGAIPAPurchase];
    [action setTransactionId:transactionId];
    [action setAffiliation:@transactionAffiliation];
    [action setRevenue:transactionRevenue];
    [action setTax:transactionTax];
    [action setShipping:transactionShipping];
    [action setCouponCode:transactionCouponCode];
    [builder setProductAction:action];
    [builder addProduct:product];
    [tracker send:[builder build]];
}

RCT_EXPORT_METHOD(trackException:(NSString *)error fatal:(BOOL)fatal)
{
  id<GAITracker> tracker = [[GAI sharedInstance] defaultTracker];
  [tracker send:[[GAIDictionaryBuilder createExceptionWithDescription:error
                                                            withFatal:fatal] build]];
}

RCT_EXPORT_METHOD(setUser:(NSString *)userId)
{
  id<GAITracker> tracker = [[GAI sharedInstance] defaultTracker];
  [tracker set:kGAIUserId
         value:userId];
}

RCT_EXPORT_METHOD(allowIDFA:(BOOL)enabled)
{
 id<GAITracker> tracker = [[GAI sharedInstance] defaultTracker];
 tracker.allowIDFACollection = enabled;
}

RCT_EXPORT_METHOD(trackSocialInteraction:(NSString *)network action:(NSString *)action targetUrl:(NSString *)targetUrl)
{
  id<GAITracker> tracker = [[GAI sharedInstance] defaultTracker];
  [tracker send:[[GAIDictionaryBuilder createSocialWithNetwork:network
                                                        action:action
                                                        target:targetUrl] build]];
}

RCT_EXPORT_METHOD(setDryRun:(BOOL)enabled)
{
    [GAI sharedInstance].dryRun = enabled;
}

@end
