/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import <Foundation/Foundation.h>

#import "RCTDefines.h"

/**
 * This is the main assert macro that you should use. Asserts should be compiled out
 * in production builds. You can customize the assert behaviour by setting a custom
 * assert handler through `RCTSetAssertFunction`.
 */
#ifndef NS_BLOCK_ASSERTIONS
#define RCTAssert(condition, ...) do { \
if ((condition) == 0) { \
_RCTAssertFormat(#condition, __FILE__, __LINE__, __func__, __VA_ARGS__); \
if (RCT_NSASSERT) { \
[[NSAssertionHandler currentHandler] handleFailureInFunction:@(__func__) \
file:@(__FILE__) lineNumber:__LINE__ description:__VA_ARGS__]; \
} \
} \
} while (false)
#else
#define RCTAssert(condition, ...) do {} while (false)
#endif
RCT_EXTERN void _RCTAssertFormat(
                                 const char *, const char *, int, const char *, NSString *, ...
                                 ) NS_FORMAT_FUNCTION(5,6);

/**
 * Report a fatal condition when executing. These calls will _NOT_ be compiled out
 * in production, and crash the app by default. You can customize the fatal behaviour
 * by setting a custom fatal handler through `RCTSetFatalHandler`.
 */
RCT_EXTERN void RCTFatal(NSError *error);

/**
 * The default error domain to be used for React errors.
 */
RCT_EXTERN NSString *const RCTErrorDomain;

/**
 * JS Stack trace provided as part of an NSError's userInfo
 */
RCT_EXTERN NSString *const RCTJSStackTraceKey;

/**
 * A block signature to be used for custom assertion handling.
 */
typedef void (^RCTAssertFunction)(
                                  NSString *condition,
                                  NSString *fileName,
                                  NSNumber *lineNumber,
                                  NSString *function,
                                  NSString *message
                                  );

typedef void (^RCTFatalHandler)(NSError *error);

/**
 * Convenience macro for asserting that a parameter is non-nil/non-zero.
 */
#define RCTAssertParam(name) RCTAssert(name, @"'%s' is a required parameter", #name)

/**
 * Convenience macro for asserting that we're running on main thread.
 */
#define RCTAssertMainThread() RCTAssert([NSThread isMainThread], \
@"This function must be called on the main thread")

/**
 * These methods get and set the current assert function called by the RCTAssert
 * macros. You can use these to replace the standard behavior with custom assert
 * functionality.
 */
RCT_EXTERN void RCTSetAssertFunction(RCTAssertFunction assertFunction);
RCT_EXTERN RCTAssertFunction RCTGetAssertFunction(void);

/**
 * This appends additional code to the existing assert function, without
 * replacing the existing functionality. Useful if you just want to forward
 * assert info to an extra service without changing the default behavior.
 */
RCT_EXTERN void RCTAddAssertFunction(RCTAssertFunction assertFunction);

/**
 * This method temporarily overrides the assert function while performing the
 * specified block. This is useful for testing purposes (to detect if a given
 * function asserts something) or to suppress or override assertions temporarily.
 */
RCT_EXTERN void RCTPerformBlockWithAssertFunction(void (^block)(void), RCTAssertFunction assertFunction);

/**
 These methods get and set the current fatal handler called by the RCTFatal method.
 */
RCT_EXTERN void RCTSetFatalHandler(RCTFatalHandler fatalHandler);
RCT_EXTERN RCTFatalHandler RCTGetFatalHandler(void);

/**
 * Get the current thread's name (or the current queue, if in debug mode)
 */
RCT_EXTERN NSString *RCTCurrentThreadName(void);

/**
 * Helper to get generate exception message from NSError
 */
RCT_EXTERN NSString *RCTFormatError(NSString *message, NSArray *stacktrace, NSUInteger maxMessageLength);

/**
 * Convenience macro to assert which thread is currently running (DEBUG mode only)
 */
#if DEBUG

#define RCTAssertThread(thread, format...) \
_Pragma("clang diagnostic push") \
_Pragma("clang diagnostic ignored \"-Wdeprecated-declarations\"") \
RCTAssert( \
[(id)thread isKindOfClass:[NSString class]] ? \
[RCTCurrentThreadName() isEqualToString:(NSString *)thread] : \
[(id)thread isKindOfClass:[NSThread class]] ? \
[NSThread currentThread] ==  (NSThread *)thread : \
dispatch_get_current_queue() == (dispatch_queue_t)thread, \
format); \
_Pragma("clang diagnostic pop")

#else

#define RCTAssertThread(thread, format...) do { } while (0)

#endif
