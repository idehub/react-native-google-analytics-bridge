#import <React/RCTBridgeModule.h>

@interface RCTGoogleAnalyticsBridge : NSObject <RCTBridgeModule>
- (void) trackEventWithCustomDimensionAndMetricValues:(NSString *)trackerId category:(NSString *)category action:(NSString *)action optionalValues:(NSDictionary *)optionalValues dimensionIndexValues:(NSDictionary *)dimensionIndexValues metricIndexValues:(NSDictionary *)metricIndexValues;

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
@end
