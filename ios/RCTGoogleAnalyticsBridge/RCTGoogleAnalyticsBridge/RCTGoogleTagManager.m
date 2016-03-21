#import "RCTGoogleTagManager.h"
#import "TAGContainer.h"
#import "TagContainerOpener.h"

@interface RCTGoogleTagManager ()<TAGContainerOpenerNotifier>
@end

@implementation RCTGoogleTagManager {
    
}

RCT_EXPORT_MODULE();

NSString* pack;


RCT_EXPORT_METHOD(openContainerWithId:(NSString *)containerId screenName:(NSString *)screenName)
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
    self.container = container;
    pack = [self.container stringForKey:@"pack"];
}

@end