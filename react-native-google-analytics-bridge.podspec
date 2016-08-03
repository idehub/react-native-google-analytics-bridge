require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))
ios_root = 'ios/RCTGoogleAnalyticsBridge'
galib_root = ios_root+'/google-analytics-lib'

Pod::Spec.new do |s|
  s.name         = "react-native-google-analytics-bridge"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.author       = "Idéhub AS"

  s.homepage     = package["homepage"]

  s.license      = package["license"]
  s.platform     = :ios, "7.0"

  s.source       = { :git => "https://github.com/idehub/react-native-google-analytics-bridge", :tag => "#{s.version}" }

  s.dependency "React"

  s.frameworks = 'CoreData', 'SystemConfiguration'
  s.libraries = 'z', 'sqlite3.0','GoogleAnalyticsServices','AdIdAccess'

  s.vendored_libraries =
    galib_root+'/libGoogleAnalyticsServices.a',
    galib_root+'/libAdIdAccess.a'

  s.source_files  =
    galib_root+'/*.{h}',
    ios_root+'/RCTGoogleAnalyticsBridge/*.{h,m}'

end
