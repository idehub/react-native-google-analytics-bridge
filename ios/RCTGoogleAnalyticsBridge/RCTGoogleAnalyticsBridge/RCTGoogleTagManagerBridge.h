#import <React/RCTBridgeModule.h>
#import "TAGContainer.h"
#import "TagContainerOpener.h"
#import "TAGManager.h"
#import <React/RCTUtils.h>
#import "Helpers/RNFunctionCallTagHandler.h"

@interface RCTGoogleTagManagerBridge : NSObject <RCTBridgeModule>

@property (nonatomic, strong) TAGManager *tagManager;
@property (nonatomic, strong) TAGContainer *container;
@property (nonatomic, copy) RCTPromiseResolveBlock openContainerResolver;
@property (nonatomic, strong) NSMutableArray<RNFunctionCallTagHandler *> *handlers;

@end
