#import "RCTGoogleTagManagerBridge.h"
#import "TAGContainer.h"
#import "TagContainerOpener.h"
#import "TAGDataLayer.h"

@interface RCTGoogleTagManagerBridge ()<TAGContainerOpenerNotifier>
@end

@implementation RCTGoogleTagManagerBridge {

}

RCT_EXPORT_MODULE();

@synthesize methodQueue = _methodQueue;

NSString *const E_CONTAINER_ALREADY_OPEN = @"E_CONTAINER_ALREADY_OPEN";
NSString *const E_ONGOING_OPEN_OPERATION = @"E_ONGOING_OPEN_OPERATION";
NSString *const E_CONTAINER_NOT_OPENED = @"E_CONTAINER_NOT_OPENED";
NSString *const E_PUSH_EVENT_FAILED = @"E_PUSH_EVENT_FAILED";


RCT_EXPORT_METHOD(openContainerWithId:(NSString *)containerId
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    if (self.container != nil) {
        reject(E_CONTAINER_ALREADY_OPEN, nil, RCTErrorWithMessage(@"The container is already open."));
        return;
    }

    if (self.openContainerResolver) {
        reject(E_ONGOING_OPEN_OPERATION, nil, RCTErrorWithMessage(@"Container open-operation already in progress."));
        return;
    }

    if (self.tagManager == nil) {
        self.tagManager = [TAGManager instance];
    }

    self.openContainerResolver = resolve;

    [TAGContainerOpener openContainerWithId:containerId
                                 tagManager:self.tagManager
                                 openType:kTAGOpenTypePreferFresh
                                 timeout:nil
                                 notifier:self];
}

RCT_EXPORT_METHOD(stringForKey:(NSString *)key
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    if (self.container != nil) {
        resolve([self.container stringForKey:key]);
    } else {
        reject(E_CONTAINER_NOT_OPENED, nil, RCTErrorWithMessage(@"The container has not been opened. You must call openContainerWithId(..)"));
    }
}

RCT_EXPORT_METHOD(booleanForKey:(NSString*)key
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
    if (self.container != nil) {
        resolve([NSNumber numberWithBool:[self.container booleanForKey:key]]);
    } else {
        reject(E_CONTAINER_NOT_OPENED, nil, RCTErrorWithMessage(@"The container has not been opened. You must call openContainerWithId(..)"));
    }
}

RCT_EXPORT_METHOD(doubleForKey:(NSString*)key
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
    if (self.container != nil) {
        resolve([NSNumber numberWithDouble:[self.container doubleForKey:key]]);
    } else {
        reject(E_CONTAINER_NOT_OPENED, nil, RCTErrorWithMessage(@"The container has not been opened. You must call openContainerWithId(..)"));
    }
}

RCT_EXPORT_METHOD(pushDataLayerEvent:(NSDictionary*)dictionary
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
    if (self.container != nil && [[dictionary allKeys] containsObject:@"event"]) {
        [[TAGManager instance].dataLayer push:dictionary];
        [[TAGManager instance] dispatch];
        resolve(@YES);
    } else {
        if (self.container == nil) {
            reject(E_CONTAINER_NOT_OPENED, nil, RCTErrorWithMessage(@"The container has not been opened. You must call openContainerWithId(..)"));
        } else {
            reject(E_PUSH_EVENT_FAILED, nil, RCTErrorWithMessage(@"Validation error, data must have a key \"event\" with valid event name"));
        }
    }
}

RCT_EXPORT_METHOD(setVerboseLoggingEnabled:(BOOL)enabled
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
    if (enabled) {
        [[TAGManager instance].logger setLogLevel:kTAGLoggerLogLevelVerbose];
    } else {
        [[TAGManager instance].logger setLogLevel:kTAGLoggerLogLevelWarning];
    }
    resolve(@YES);
}

- (void)containerAvailable:(TAGContainer *)container {
    dispatch_async(_methodQueue, ^{
        self.container = container;
        self.openContainerResolver(@YES);
        self.openContainerResolver = nil;
    });
}

@end
