#import "GAIDictionaryBuilder.h"

@interface GoogleAnalyticsPayload : NSObject
+ (void)addBuilderPayload:(GAIDictionaryBuilder*)builder payload:(NSDictionary *)payload;
@end
