#import "RCTBridgeModule.h"
#import "TAGContainer.h"
#import "TagContainerOpener.h"
#import "TAGManager.h"

@interface RCTGoogleTagManager : NSObject <RCTBridgeModule>

@property (nonatomic, strong) TAGManager *tagManager;
@property (nonatomic, strong) TAGContainer *container;

@end
