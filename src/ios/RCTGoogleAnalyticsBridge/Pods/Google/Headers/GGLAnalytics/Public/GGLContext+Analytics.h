#import "GAITracker.h"
#import "GGLContext.h"

/**
 * The Google Analytic dispatch time interval in seconds when using a simulator. Setting it to one
 * second by default means the tracking information will be automatically dispatched every second
 * when using an iPhone simulator.
 *
 * If running on a device, uses the default time interval set by Google
 * Analytics, which is two minutes.
 */
extern const NSTimeInterval kSimulatorDispatchIntervalInSeconds;

/**
 * This category extends |GGLContext| with the analytics service. Import
 * GGLContext+Analytics to use Google Analytics in your app.
 *
 * [GAI sharedInstance] and [[GAI sharedInstance] defaultTracker] should be ready to use after
 * -[[GGLContext sharedInstance] configureWithError:] is called. The defaultTracker can also be
 * fetched here through [GGLContext sharedInstance].tracker. The tracking ID of the tracker is the
 * one defined in GoogleService-Info.plist.
 *
 * @see GGLContext
 */
@interface GGLContext (Analytics)

/**
 * Retrieve a configured GAITracker instance.
 *
 * Note that [[GAI sharedInstance] defaultTracker] is the first initialized tracker. If a developer
 * initializes a tracker before calling -[[GGLContext sharedInstance] configureWithError:],
 * -[[GAI sharedInstance] defaultTracker] is the one initialized first. The one initialized through
 * GGLContext can be accessed by either [[GAI sharedInstance] trackerWithTrackingId:@"UA-XXXX-Y"]
 * or [GGLContext sharedInstance].tracker.
 */
@property(nonatomic, readonly, strong) id<GAITracker> tracker;

@end
