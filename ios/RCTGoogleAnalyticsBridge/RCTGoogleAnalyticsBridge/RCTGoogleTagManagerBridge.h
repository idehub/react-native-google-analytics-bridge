#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import "TAGContainer.h"
#import "TagContainerOpener.h"
#import "TAGManager.h"
#import <React/RCTUtils.h>

@interface RCTGoogleTagManagerBridge : RCTEventEmitter <RCTBridgeModule>

@property (nonatomic, strong) TAGManager *tagManager;
@property (nonatomic, strong) TAGContainer *container;
@property (nonatomic, copy) RCTPromiseResolveBlock openContainerResolver;

@end
