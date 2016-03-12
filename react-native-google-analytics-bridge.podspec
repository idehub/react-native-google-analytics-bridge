Pod::Spec.new do |s|
  s.name         = "react-native-google-analytics-bridge"
  s.version      = "0.4.0"
  s.source_files  = "ios/RCTGoogleAnalyticsBridge/RCTGoogleAnalyticsBridge/*.{h,m}"
  s.dependency 'React'
  s.dependency 'GoogleTagManager', '3.15.0'
  s.platform = :ios, "8.0"
end
