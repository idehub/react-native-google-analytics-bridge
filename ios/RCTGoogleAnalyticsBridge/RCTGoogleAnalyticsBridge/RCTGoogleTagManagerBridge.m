#import "RCTGoogleTagManagerBridge.h"
#import "TAGContainer.h"
#import "TagContainerOpener.h"

@interface RCTGoogleTagManagerBridge ()<TAGContainerOpenerNotifier>
@end

@implementation RCTGoogleTagManagerBridge {
    
}

RCT_EXPORT_MODULE();

@synthesize methodQueue = _methodQueue;

RCT_EXPORT_METHOD(openContainerWithId:(NSString *)containerId
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    if (!self.openContainerResolver && !self.openContainerRejecter && self.container == nil) {
        if (self.tagManager == nil) {
            self.tagManager = [TAGManager instance];
        }
        
        self.openContainerResolver = resolve;
        self.openContainerRejecter = reject;
        
        [TAGContainerOpener openContainerWithId:containerId
                                     tagManager:self.tagManager
                                       openType:kTAGOpenTypePreferFresh
                                        timeout:nil
                                       notifier:self];
    } else {
        reject(@10, @"", @"The container is either open, or open-operation is in progress");
    }
}

RCT_EXPORT_METHOD(stringForKey:(NSString *)key
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    if (self.container != nil) {
        resolve([self.container stringForKey:key]);
    } else {
        reject(@20, @"", @"The container has not been opened. You must call openContainerWithId(..)");
    }
}

RCT_EXPORT_METHOD(booleanForKey:(NSString*)key
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
    if (self.container != nil) {
        resolve([NSNumber numberWithBool:[self.container booleanForKey:key]]);
    } else {
        reject(@20, @"", @"The container has not been opened. You must call openContainerWithId(..)");
    }
}

RCT_EXPORT_METHOD(doubleForKey:(NSString*)key
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
    if (self.container != nil) {
        resolve([NSNumber numberWithDouble:[self.container doubleForKey:key]]);
    } else {
        reject(@20, @"", @"The container has not been opened. You must call openContainerWithId(..)");
    }
}

- (void)containerAvailable:(TAGContainer *)container {
    dispatch_async(_methodQueue, ^{
        self.container = container;
        self.openContainerResolver(@YES);
        self.openContainerResolver = NULL;
        self.openContainerRejecter = NULL;
    });
}

@end