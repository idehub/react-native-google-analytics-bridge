#import "RCTGoogleTagManager.h"
#import "TAGContainer.h"
#import "TagContainerOpener.h"

@interface RCTGoogleTagManager ()<TAGContainerOpenerNotifier>
@end

@implementation RCTGoogleTagManager {
    
}

RCT_EXPORT_MODULE();

@synthesize methodQueue = _methodQueue;

NSString* pack;


RCT_EXPORT_METHOD(openContainerWithId:(NSString *)containerId)
{
    self.tagManager = [TAGManager instance];
    
    // Optional: Change the LogLevel to Verbose to enable logging at VERBOSE and higher levels.
    [self.tagManager.logger setLogLevel:kTAGLoggerLogLevelVerbose];
    
    [TAGContainerOpener openContainerWithId:containerId
                                 tagManager:self.tagManager
                                   openType:kTAGOpenTypePreferFresh
                                    timeout:nil
                                   notifier:self];
}

- (void)containerAvailable:(TAGContainer *)container {
    dispatch_async(_methodQueue, ^{
        self.container = container;
        pack = [self.container stringForKey:@"pack"];
    });
}

@end