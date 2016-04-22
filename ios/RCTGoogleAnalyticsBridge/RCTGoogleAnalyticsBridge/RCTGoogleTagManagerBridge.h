#import "RCTBridgeModule.h"
#import "TAGContainer.h"
#import "TagContainerOpener.h"
#import "TAGManager.h"

@interface RCTGoogleTagManagerBridge : NSObject <RCTBridgeModule>

@property (nonatomic, strong) TAGManager *tagManager;
@property (nonatomic, strong) TAGContainer *container;
@property (nonatomic, strong) RCTPromiseResolveBlock openContainerResolver;

@end
