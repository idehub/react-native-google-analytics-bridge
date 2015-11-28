//
//  RCTGoogleAnalyticsBridge.m
//  ios-analytics-bridge
//
//  Created by Nikolai Norman Andersen on 28.11.2015.
//
//
@implementation RCTGoogleAnalyticsBridge

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
    RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}

@end