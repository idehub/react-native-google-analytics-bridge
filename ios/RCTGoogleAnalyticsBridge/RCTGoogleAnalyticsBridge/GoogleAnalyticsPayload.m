#import "GoogleAnalyticsPayload.h"
#import <React/RCTLog.h>
#import <React/RCTConvert.h>
#import "GAI.h"
#import "GAIFields.h"
#import "GAIDictionaryBuilder.h"
#import "GAIEcommerceProduct.h"
#import "GAIEcommerceProductAction.h"
#import "GAIEcommerceFields.h"

@implementation GoogleAnalyticsPayload {
    
}

typedef enum {
    Detail = 1,
    Click = 2,
    Add = 3,
    Remove = 4,
    Checkout = 5,
    CheckoutOption = 6,
    Purchase = 7,
    Refund = 8
} ProductActionEnum;

+ (void)addBuilderPayload:(GAIDictionaryBuilder*)builder payload:(NSDictionary*)payload
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
    
    NSString* utmCampaignUrl = payload[@"utmCampaignUrl"];
    if (utmCampaignUrl) {
        [builder setAll:getUtmCampaignUrlHitParams(utmCampaignUrl)];
    }
    
    NSString* sessionState = payload[@"session"];
    if (sessionState != nil) {
        [builder set:sessionState forKey:kGAISessionControl];
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

static NSDictionary* getUtmCampaignUrlHitParams(NSString* urlString)
{
    GAIDictionaryBuilder *hitParams = [[GAIDictionaryBuilder alloc] init];
    
    // setCampaignParametersFromUrl: parses Google Analytics campaign ("UTM")
    // parameters from a string url into a Map that can be set on a Tracker.
    [hitParams setCampaignParametersFromUrl:urlString];
    
    // kGAICampaignSource is required. Use host if not set by previous call.
    NSURL *url = [NSURL URLWithString:urlString];
    if(![hitParams get:kGAICampaignSource] && [url host].length !=0) {
        [hitParams set:@"referrer" forKey:kGAICampaignMedium];
        [hitParams set:[url host] forKey:kGAICampaignSource];
    }
    
    return [hitParams build];
}

@end
