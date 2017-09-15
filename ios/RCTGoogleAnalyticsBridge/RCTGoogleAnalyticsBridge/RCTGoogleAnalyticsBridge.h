#import <React/RCTBridgeModule.h>

@interface RCTGoogleAnalyticsBridge : NSObject <RCTBridgeModule>
- (void) trackEventWithCustomDimensionAndMetricValues:(NSString *)trackerId category:(NSString *)category action:(NSString *)action optionalValues:(NSDictionary *)optionalValues dimensionIndexValues:(NSDictionary *)dimensionIndexValues metricIndexValues:(NSDictionary *)metricIndexValues;
@end
