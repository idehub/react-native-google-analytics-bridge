
#import "RNFunctionCallTagHandler.h"
#import "RNTagEmitterSingleton.h"
//NSString *const RN_TAG_EVENT = @"GTM_FUNCTION_TAG";

@implementation RNFunctionCallTagHandler

@synthesize fn;

/* Initializer */
- (id)initForFunctionName:(NSString *)functionName
{
    if (functionName) {
        fn = [functionName copy];
    }
    return self;
}

/* TAGFunctionCallTagHandler Overrides */

- (void)execute:(NSString *)functionName
     parameters:(NSDictionary *)parameters
{
    if ([functionName isEqualToString:fn]) {
       
        NSDictionary<NSString *, id> *payload = @{@"payload": parameters, @"_fn":fn};
        
        // See https://github.com/facebook/react-native/issues/15407#issuecomment-335346131
        RNTagEmitterSingleton *emitter = [RNTagEmitterSingleton allocWithZone:nil];
        [emitter emitFunctionTag:functionName withPayload:payload];
    }
}

@end
