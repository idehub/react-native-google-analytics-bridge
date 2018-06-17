
/*
* Class: GenericFunctionCallTagHandler
* This class implements TAGFunctionCallTagHandler protocol required to support Function Call Tags.
* When a tag is matched, 'excute' method is call, which in turn sends an event to Reac-Native evnironment.
* See https://developers.google.com/tag-manager/ios/v3/#function-call-tag
* and https://facebook.github.io/react-native/docs/native-modules-ios.html#sending-events-to-javascript
* for more information on these subjects.
*/

#import "TAGContainer.h"


@interface RNFunctionCallTagHandler : NSObject <TAGFunctionCallTagHandler>

@property (nonatomic, strong) NSString *fn;

- (id)initForFunctionName:(NSString *)functionName;

@end

